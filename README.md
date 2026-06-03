# AgroNet 🌱

Super app do agronegócio — **"Tudo do agro, em um só lugar"**.
Aplicativo multiplataforma (iOS, Android e Web) construído com **Expo + expo-router + TypeScript**.

## Telas já implementadas

- **Onboarding** — carrossel com o ecossistema de ícones dos módulos.
- **Login / Cadastro** — autenticação (UI; integração de backend pendente).
- **Home** — saudação, cotações de grãos, clima, alerta climático, grade de
  19 módulos, comunidade e feed de conteúdo.
- **Abas** — Início, Clima, Cálculos, AgroIA e Mais.

## Módulos previstos

Clima · Calculadoras · Solos · Fertilidade · Biblioteca · Notícias · Cursos ·
Empregos · Defensivos · Laudos · Dashboard · AgroIA · Finanças · Relatórios ·
Diário · Inventário · Calendário · Pragas IA · Irrigação.

## Rodando o projeto

```bash
npm install        # instala as dependências (gera o package-lock.json)
npm run web        # abre no navegador
npm run android    # abre no Android (emulador/dispositivo)
npm run ios        # abre no iOS (requer macOS)
```

## Estrutura

```
app/                 # rotas (expo-router)
  _layout.tsx        # navegação raiz
  index.tsx          # entrada → onboarding
  onboarding.tsx
  (auth)/            # login e cadastro
  (tabs)/            # abas principais (Home, Clima, Cálculos, AgroIA, Mais)
src/
  components/        # componentes reutilizáveis (Screen, Card, Field, ...)
  data/              # dados (módulos, cotações)
  theme/             # tema (cores, espaçamentos, tipografia)
```

## Observações

- Os **ícones do app** (`assets/*.png`) usam os placeholders padrão do Expo e
  ainda serão substituídos pela identidade visual definitiva do AgroNet.
- Dados de cotações, clima e feed estão **mockados** — a integração com APIs e
  backend (autenticação, banco, assinaturas) é o próximo passo.
