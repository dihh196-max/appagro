# 🌱 AppAgro

Plataforma **SaaS** para o agronegócio — calculadoras agrícolas, identificação de pragas com IA, laudos agronômicos, cursos especializados e indicadores em tempo real.

> Status: 🚧 **MVP em desenvolvimento.** Veja o escopo completo dos módulos em [`docs/escopo.md`](./docs/escopo.md).

## Stack

| Camada | Tecnologia |
|---|---|
| Frontend | **Next.js 16** (App Router, Turbopack), **React 19**, **TypeScript 5**, **Tailwind 4** |
| Backend | **Supabase** — Auth, Postgres, Storage, Realtime |
| Multi-tenant | Shared DB com `tenant_id` (RLS) — uma única instância serve todos os clientes |
| Deploy | Vercel (recomendado) + Supabase Cloud |

## Como rodar localmente

### 1. Pré-requisitos
- **Node.js 20.9+** (este projeto foi scaffold em Node 24.16)
- Uma conta no **Supabase** (https://supabase.com) — plano grátis serve

### 2. Instalar dependências
```bash
npm install
```

### 3. Configurar variáveis de ambiente
```bash
cp .env.local.example .env.local
```
Edite `.env.local` com as credenciais do seu projeto Supabase:
- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- `SUPABASE_SERVICE_ROLE_KEY` (uso server-side apenas)

Encontre os valores em **Supabase Studio → Project Settings → API**.

### 4. Aplicar as migrations do banco
Veja [`supabase/README.md`](./supabase/README.md). Versão rápida via Studio:
1. Abra o **SQL Editor** do seu projeto Supabase
2. Cole o conteúdo de `supabase/migrations/0001_init_multitenant.sql`
3. Clique em **Run**

### 5. Rodar em desenvolvimento
```bash
npm run dev
```
Abra http://localhost:3000.

## Estrutura do projeto

```
appagro/
├── src/
│   ├── app/
│   │   ├── (marketing)/       # rotas públicas (landing)
│   │   ├── (auth)/            # /login, /signup
│   │   ├── (app)/             # rotas autenticadas (/dashboard, /calculadoras, ...)
│   │   ├── auth/callback/     # OAuth/magic link callback
│   │   ├── layout.tsx         # root layout
│   │   ├── page.tsx           # landing
│   │   └── globals.css
│   ├── lib/
│   │   └── supabase/          # clients: browser, server, middleware
│   ├── components/            # UI compartilhada
│   └── proxy.ts               # Next 16 — substitui middleware.ts (sessão Supabase)
├── supabase/
│   ├── migrations/            # SQL versionado
│   └── README.md
├── docs/
│   └── escopo.md              # catálogo de módulos do SaaS
└── public/
```

## Decisões de arquitetura

- **App Router + Server Components** por padrão. Client Components só onde houver interatividade.
- **`proxy.ts`** (Next 16) cuida da renovação de sessão Supabase a cada request e protege rotas privadas.
- **RLS sempre habilitada** em todas as tabelas. Helpers como `current_user_org_ids()` filtram automaticamente por tenant.
- **Server Actions** para mutações (login, signup, logout). Sem API routes manuais quando der pra usar action.

## Módulos planejados

Veja [`docs/escopo.md`](./docs/escopo.md). Resumo:

| Módulo | Status |
|---|---|
| Landing + Auth (login, signup) | ✅ scaffold |
| Dashboard com KPIs e alertas | ✅ scaffold (dados mock) |
| Calculadora Agrícola | 🔲 a fazer |
| Processos em Solos | 🔲 a fazer |
| Fertilidade do Solo | 🔲 a fazer |
| Biblioteca Técnica | 🔲 a fazer |
| Cursos (LMS + marketplace) | 🔲 a fazer |
| Agroquímicos | 🔲 a fazer |
| Laudos Agronômicos | 🔲 a fazer |

## Comandos úteis

```bash
npm run dev      # servidor de desenvolvimento (Turbopack)
npm run build    # build de produção
npm run start    # servir build de produção
npm run lint     # ESLint
```

## Licença

Privado — todos os direitos reservados.
