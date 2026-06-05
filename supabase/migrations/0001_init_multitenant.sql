-- =====================================================================
-- AppAgro — Migration 0001
-- Estrutura multi-tenant base: organizations, memberships, profiles
-- Modelo: Shared DB com tenant_id + Row Level Security (RLS)
-- =====================================================================

-- ---------------------------------------------------------------------
-- Extensões necessárias
-- ---------------------------------------------------------------------
create extension if not exists "pgcrypto";   -- gen_random_uuid()
create extension if not exists "citext";     -- email case-insensitive

-- ---------------------------------------------------------------------
-- ENUMS
-- ---------------------------------------------------------------------
do $$ begin
  create type public.org_role as enum ('owner', 'admin', 'member', 'viewer');
exception when duplicate_object then null; end $$;

do $$ begin
  create type public.subscription_plan as enum ('free', 'pro', 'business', 'enterprise');
exception when duplicate_object then null; end $$;

-- ---------------------------------------------------------------------
-- profiles — 1:1 com auth.users (perfil pessoal do usuário)
-- ---------------------------------------------------------------------
create table if not exists public.profiles (
  id            uuid primary key references auth.users(id) on delete cascade,
  email         citext not null unique,
  full_name     text,
  avatar_url    text,
  phone         text,
  created_at    timestamptz not null default now(),
  updated_at    timestamptz not null default now()
);

-- Trigger: cria perfil automaticamente quando usuário se cadastra no auth
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer set search_path = public
as $$
begin
  insert into public.profiles (id, email, full_name, avatar_url)
  values (
    new.id,
    new.email,
    coalesce(new.raw_user_meta_data->>'full_name', new.raw_user_meta_data->>'name'),
    new.raw_user_meta_data->>'avatar_url'
  )
  on conflict (id) do nothing;
  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();

-- ---------------------------------------------------------------------
-- organizations — o "tenant" do SaaS (cada cliente)
-- ---------------------------------------------------------------------
create table if not exists public.organizations (
  id                 uuid primary key default gen_random_uuid(),
  slug               text not null unique check (slug ~ '^[a-z0-9-]{3,50}$'),
  name               text not null,
  logo_url           text,
  plan               public.subscription_plan not null default 'free',
  trial_ends_at      timestamptz,
  -- dados do negócio agro
  cnpj               text,
  state_uf           char(2),
  city               text,
  created_by         uuid not null references public.profiles(id),
  created_at         timestamptz not null default now(),
  updated_at         timestamptz not null default now()
);

create index if not exists organizations_created_by_idx
  on public.organizations(created_by);

-- ---------------------------------------------------------------------
-- memberships — usuário X organização (N:N com papel)
-- ---------------------------------------------------------------------
create table if not exists public.memberships (
  id              uuid primary key default gen_random_uuid(),
  organization_id uuid not null references public.organizations(id) on delete cascade,
  user_id         uuid not null references public.profiles(id) on delete cascade,
  role            public.org_role not null default 'member',
  invited_by      uuid references public.profiles(id),
  joined_at       timestamptz not null default now(),
  unique (organization_id, user_id)
);

create index if not exists memberships_user_idx        on public.memberships(user_id);
create index if not exists memberships_org_idx         on public.memberships(organization_id);

-- ---------------------------------------------------------------------
-- HELPERS — funções para usar nas policies RLS
-- ---------------------------------------------------------------------

-- IDs de organizações às quais o usuário atual pertence
create or replace function public.current_user_org_ids()
returns setof uuid
language sql
stable
security definer set search_path = public
as $$
  select organization_id from public.memberships where user_id = auth.uid();
$$;

-- Papel do usuário atual em uma organização específica
create or replace function public.current_user_role_in(org uuid)
returns public.org_role
language sql
stable
security definer set search_path = public
as $$
  select role from public.memberships
   where user_id = auth.uid() and organization_id = org
   limit 1;
$$;

-- Usuário atual é admin/owner em uma organização?
create or replace function public.current_user_is_admin_of(org uuid)
returns boolean
language sql
stable
security definer set search_path = public
as $$
  select exists(
    select 1 from public.memberships
     where user_id = auth.uid()
       and organization_id = org
       and role in ('owner', 'admin')
  );
$$;

-- ---------------------------------------------------------------------
-- RLS — habilitar e criar policies
-- ---------------------------------------------------------------------

alter table public.profiles      enable row level security;
alter table public.organizations enable row level security;
alter table public.memberships   enable row level security;

-- profiles: usuário vê e edita o próprio perfil
drop policy if exists "profiles_select_own" on public.profiles;
create policy "profiles_select_own"
  on public.profiles for select
  using (id = auth.uid());

drop policy if exists "profiles_update_own" on public.profiles;
create policy "profiles_update_own"
  on public.profiles for update
  using (id = auth.uid())
  with check (id = auth.uid());

-- organizations: membros veem suas orgs; criador/admin podem editar
drop policy if exists "orgs_select_member" on public.organizations;
create policy "orgs_select_member"
  on public.organizations for select
  using (id in (select public.current_user_org_ids()));

drop policy if exists "orgs_insert_authenticated" on public.organizations;
create policy "orgs_insert_authenticated"
  on public.organizations for insert
  with check (auth.uid() is not null and created_by = auth.uid());

drop policy if exists "orgs_update_admin" on public.organizations;
create policy "orgs_update_admin"
  on public.organizations for update
  using (public.current_user_is_admin_of(id))
  with check (public.current_user_is_admin_of(id));

-- memberships: membros veem quem está na própria org; admins gerenciam
drop policy if exists "memberships_select_same_org" on public.memberships;
create policy "memberships_select_same_org"
  on public.memberships for select
  using (organization_id in (select public.current_user_org_ids()));

drop policy if exists "memberships_admin_manage" on public.memberships;
create policy "memberships_admin_manage"
  on public.memberships for all
  using (public.current_user_is_admin_of(organization_id))
  with check (public.current_user_is_admin_of(organization_id));

-- Bootstrap: quando o usuário cria a primeira org, precisa conseguir
-- inserir o próprio membership de owner. Policy adicional permite isso.
drop policy if exists "memberships_insert_self_owner" on public.memberships;
create policy "memberships_insert_self_owner"
  on public.memberships for insert
  with check (
    user_id = auth.uid()
    and role = 'owner'
    and organization_id in (
      select id from public.organizations where created_by = auth.uid()
    )
  );

-- ---------------------------------------------------------------------
-- updated_at — trigger genérico
-- ---------------------------------------------------------------------
create or replace function public.set_updated_at()
returns trigger language plpgsql as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists trg_profiles_updated      on public.profiles;
create trigger trg_profiles_updated      before update on public.profiles      for each row execute function public.set_updated_at();

drop trigger if exists trg_organizations_updated on public.organizations;
create trigger trg_organizations_updated before update on public.organizations for each row execute function public.set_updated_at();
