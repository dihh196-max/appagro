# Supabase — AppAgro

Estrutura do banco e instruções de setup.

## Como aplicar as migrations

Você tem duas opções:

### Opção 1 — Supabase Studio (interface web, mais simples)
1. Acesse seu projeto em https://app.supabase.com
2. Vá em **SQL Editor → New query**
3. Cole o conteúdo do arquivo em `migrations/` (em ordem crescente: 0001, 0002, ...)
4. Clique em **Run**

### Opção 2 — Supabase CLI (recomendado para projetos reais)
```bash
# Instalar CLI (uma vez)
npm install -g supabase

# Linkar ao projeto (uma vez)
supabase link --project-ref SEU-REF

# Aplicar todas as migrations
supabase db push
```

## Estrutura

| Migration | Conteúdo |
|---|---|
| `0001_init_multitenant.sql` | Tabelas base: `profiles`, `organizations`, `memberships`. Helpers RLS. Triggers de `updated_at` e `handle_new_user`. |

## Convenções

- **Tenant key:** toda tabela de negócio terá `organization_id uuid not null references public.organizations(id) on delete cascade`
- **RLS:** sempre habilitada. Toda tabela de negócio terá policy `using (organization_id in (select public.current_user_org_ids()))`
- **Soft delete:** evitar — preferir `archived_at timestamptz` quando precisar manter histórico
- **Naming:** snake_case em tudo (tabelas, colunas, funções)
