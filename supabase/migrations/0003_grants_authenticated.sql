-- =====================================================================
-- AppAgro — Migration 0003
-- GRANTs para o role `authenticated` (Supabase Auth API)
--
-- A nova arquitetura de API Keys do Supabase (publishable/secret keys) NÃO
-- concede automaticamente privilégios SQL às tabelas no schema `public`.
-- Sem GRANT explícito, o PostgREST retorna `permission denied for table X`
-- mesmo quando as policies RLS permitiriam o acesso.
--
-- Esta migration concede:
--   - USAGE no schema public para authenticated/anon/service_role
--   - SELECT/INSERT/UPDATE/DELETE nas tabelas existentes
--   - Configura DEFAULT PRIVILEGES para tabelas/sequências FUTURAS criadas
--     pelo postgres (admin do projeto), evitando ter que repetir GRANT em
--     toda migration nova
-- =====================================================================

-- Schema usage
grant usage on schema public to anon, authenticated, service_role;

-- Tabelas existentes
grant select, insert, update, delete on
  public.profiles,
  public.organizations,
  public.memberships
to authenticated;

grant all on
  public.profiles,
  public.organizations,
  public.memberships
to service_role;

-- Sequences existentes (se houver) — necessário para colunas serial/identity
grant usage, select on all sequences in schema public to authenticated;
grant all on all sequences in schema public to service_role;

-- Funções helpers (current_user_org_ids etc.) — execute permission
grant execute on all functions in schema public to anon, authenticated, service_role;

-- =====================================================================
-- DEFAULT PRIVILEGES — aplicam-se a tabelas/sequências/funções FUTURAS
-- criadas pelo role postgres (admin). Evita ter que repetir GRANT em cada
-- nova migration.
-- =====================================================================
alter default privileges in schema public
  grant select, insert, update, delete on tables to authenticated;
alter default privileges in schema public
  grant all on tables to service_role;

alter default privileges in schema public
  grant usage, select on sequences to authenticated;
alter default privileges in schema public
  grant all on sequences to service_role;

alter default privileges in schema public
  grant execute on functions to anon, authenticated, service_role;
