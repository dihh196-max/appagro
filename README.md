# AgroNet 🌱

Super app do agronegócio — **SaaS web responsivo (PWA)** com foco mobile-first.
Construído com **Next.js 16 (App Router) + Tailwind v4 + TypeScript + Supabase**.

## Stack

- **Next.js 16** — React Server Components + App Router
- **Tailwind v4** — design system AgroNet (tema escuro + verde-menta)
- **Supabase** — autenticação, banco Postgres e storage *(plugue em `.env.local`)*
- **lucide-react** — ícones
- **PWA** — instalável no celular (manifest + ícones)

## Rodando o projeto

```bash
npm install
npm run dev          # desenvolvimento (http://localhost:3000)
npm run build        # build de produção
npm run start        # servir build
```

Para habilitar o Supabase, copie `.env.local.example` para `.env.local` e
preencha com as chaves do seu projeto.

## Rotas

| Rota | Descrição |
|------|-----------|
| `/onboarding` | Apresentação do app |
| `/login` | Acesso (campos glass sobre foto do agro) |
| `/register` | Cadastro |
| `/home` | Feed social de notícias |
| `/buscar` `/criar` `/agroia` `/perfil` | Abas do app |

## Estrutura

```
src/
├─ app/                       # rotas Next.js
│  ├─ layout.tsx              # html/body raiz, fontes, PWA
│  ├─ page.tsx                # → /onboarding
│  ├─ onboarding/
│  ├─ login/
│  ├─ register/
│  └─ (app)/                  # grupo de rotas autenticadas
│     ├─ layout.tsx           # AppShell (drawer + tabs)
│     ├─ home/
│     ├─ buscar/
│     ├─ criar/
│     ├─ agroia/
│     └─ perfil/
├─ components/                # Shell, AppShell, BottomTabs, ToolsDrawer,
│                             # CircleIconButton, NewsImage, Placeholder
├─ data/                      # modules.ts, news.ts (mocks por enquanto)
└─ lib/supabase/              # cliente Supabase
```

## Próximos passos

- [ ] Plugar `signInWithPassword` / `signUp` reais no Supabase
- [ ] Salvar likes/saves/follows no banco (com RLS por usuário)
- [ ] Layout dedicado pra desktop em telões (sidebar + multi-coluna)
- [ ] Deploy no Vercel com domínio próprio
- [ ] Stripe / Mercado Pago para assinaturas
