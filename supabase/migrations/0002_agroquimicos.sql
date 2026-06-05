-- =====================================================================
-- AppAgro — Migration 0002
-- Módulo Agroquímicos: catálogo de defensivos
--
-- Modelo:
--   - `agroquimicos` com `organization_id` (do tenant) OU NULL (oficial/global)
--   - Tenant vê seus próprios produtos + catálogo oficial
--   - Apenas o próprio tenant pode editar/excluir seus produtos
--   - Catálogo oficial é read-only para usuários comuns
-- =====================================================================

-- ENUMS
do $$ begin
  create type public.classe_toxicologica as enum ('I', 'II', 'III', 'IV');
exception when duplicate_object then null; end $$;

do $$ begin
  create type public.categoria_agroquimico as enum (
    'herbicida', 'inseticida', 'fungicida', 'acaricida',
    'nematicida', 'reguladora', 'adjuvante', 'outro'
  );
exception when duplicate_object then null; end $$;

-- Tabela principal
create table if not exists public.agroquimicos (
  id                    uuid primary key default gen_random_uuid(),
  organization_id       uuid references public.organizations(id) on delete cascade,
  -- nome comercial
  nome                  text not null,
  ingrediente_ativo     text not null,
  concentracao          text,                                      -- "480 g/L"
  categoria             public.categoria_agroquimico not null,
  classe_toxicologica   public.classe_toxicologica not null,
  culturas              text[] not null default '{}',              -- array de culturas
  observacoes           text,
  -- flag: produto do catálogo oficial (visível para todos)
  oficial               boolean not null default false,
  created_by            uuid references public.profiles(id),
  created_at            timestamptz not null default now(),
  updated_at            timestamptz not null default now()
);

-- Índices
create index if not exists agroquimicos_org_idx       on public.agroquimicos(organization_id);
create index if not exists agroquimicos_oficial_idx   on public.agroquimicos(oficial) where oficial = true;
create index if not exists agroquimicos_categoria_idx on public.agroquimicos(categoria);
-- Busca por nome/ingrediente (case-insensitive)
create index if not exists agroquimicos_nome_lower_idx
  on public.agroquimicos(lower(nome) text_pattern_ops);
create index if not exists agroquimicos_ia_lower_idx
  on public.agroquimicos(lower(ingrediente_ativo) text_pattern_ops);

-- Trigger de updated_at (set_updated_at já existe da migration 0001)
drop trigger if exists trg_agroquimicos_updated on public.agroquimicos;
create trigger trg_agroquimicos_updated
  before update on public.agroquimicos
  for each row execute function public.set_updated_at();

-- RLS
alter table public.agroquimicos enable row level security;

-- SELECT: vê produtos oficiais OU da própria org
drop policy if exists "agroquimicos_select_visible" on public.agroquimicos;
create policy "agroquimicos_select_visible"
  on public.agroquimicos for select
  using (
    oficial = true
    or organization_id in (select public.current_user_org_ids())
  );

-- INSERT: só pode inserir na própria org, e não pode marcar como oficial
drop policy if exists "agroquimicos_insert_own_org" on public.agroquimicos;
create policy "agroquimicos_insert_own_org"
  on public.agroquimicos for insert
  with check (
    oficial = false
    and organization_id in (select public.current_user_org_ids())
    and created_by = auth.uid()
  );

-- UPDATE: só admin/owner da org pode editar seus produtos
drop policy if exists "agroquimicos_update_own_org" on public.agroquimicos;
create policy "agroquimicos_update_own_org"
  on public.agroquimicos for update
  using (
    oficial = false
    and public.current_user_is_admin_of(organization_id)
  )
  with check (
    oficial = false
    and public.current_user_is_admin_of(organization_id)
  );

-- DELETE: só admin/owner da org pode excluir seus produtos
drop policy if exists "agroquimicos_delete_own_org" on public.agroquimicos;
create policy "agroquimicos_delete_own_org"
  on public.agroquimicos for delete
  using (
    oficial = false
    and public.current_user_is_admin_of(organization_id)
  );

-- =====================================================================
-- SEED — produtos oficiais (catálogo global)
-- =====================================================================
insert into public.agroquimicos
  (nome, ingrediente_ativo, concentracao, categoria, classe_toxicologica, culturas, oficial)
values
  ('Certero',           'Triflumurom',                       '480 g/L', 'inseticida', 'IV', array['Soja','Algodão'], true),
  ('Gramoxone 200',     'Paraquate',                         '200 g/L', 'herbicida',  'I',  array['Soja (dessecação)','Café (dirigido)'], true),
  ('Engeo Pleno S',     'Tiametoxam 141 + Lambda-cialotrina','106 g/L', 'inseticida', 'III',array['Soja','Milho','Algodão','Trigo'], true),
  ('Nativo',            'Trifloxistrobina 100 + Tebuconazol','200 g/L', 'fungicida',  'III',array['Soja','Milho','Algodão','Café','Feijão'], true),
  ('Roundup Original DI','Glifosato',                        '480 g/L', 'herbicida',  'IV', array['Soja RR','Milho RR','Algodão','Café','Citros'], true)
on conflict do nothing;
