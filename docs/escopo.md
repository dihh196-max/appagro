# AppAgro — Escopo Funcional

> Documento vivo. Cada lote de prints/funcionalidades enviado pelo Diego é catalogado aqui antes de virar código.
> Stack alvo: Next.js 15 (App Router) + Supabase (auth/DB/storage) + multi-tenant via `tenant_id`.

---

## Lote 1 — recebido em 2026-06-04

### 1. Calculadora Agrícola
**Subtítulo:** "Cálculos essenciais para o campo"

Cálculos principais:
- **Calagem** — Necessidade de calcário
- **Gessagem** — Necessidade de gesso agrícola
- **Adubação NPK** — Quantidade de adubo por formulação
- **Densidade de Sementes** — Quantidade de sementes por hectare
- **Área e Conversões** — Conversão de unidades agrárias

Ferramentas especializadas:
- **Calculadora de Irrigação** — Necessidade hídrica por cultura
- **Identificar Pragas com IA** — Fotografe e receba diagnóstico  *(integração com modelo de visão — definir provider: Anthropic Claude Vision / OpenAI / modelo próprio)*
- **Calendário Agrícola** — Planejar semeadura e adubação

### 2. Processos em Solos
**Subtítulo:** "Conhecimento essencial do solo" (conteúdo educacional)

- Tipos de Solo
- Física do Solo
- Química do Solo
- Biologia do Solo
- Manejo e Conservação

### 3. Fertilidade do Solo
**Subtítulo:** "Nutrientes, correção e adubação" (conteúdo educacional + dados)

- **Macronutrientes Primários** (3 nutrientes — N, P, K)
- **Macronutrientes Secundários** (3 nutrientes — Ca, Mg, S)
- **Micronutrientes** (3 nutrientes — *confirmar quais: B, Cu, Fe, Mn, Mo, Zn, Cl, Ni*)
- **Correção e Calagem** (2 nutrientes)

### 4. Biblioteca Técnica
**Subtítulo:** "Guias e artigos agrícolas"

- Busca por tema (campo de pesquisa)
- **Tópicos em destaque:**
  - Manejo de Pragas
  - Doenças Fúngicas
  - Adubação
  - Irrigação
  - Mecanização
  - Sustentabilidade
  - Boas Práticas
  - Colheita

---

## Lote 2 — recebido em 2026-06-04

### 5. Cursos
**Subtítulo:** "Capacitação para o agronegócio"

- **KPIs no topo:** Cursos cadastrados, Alunos, Certificados emitidos
- **CTA "Anunciar":** parceiros podem anunciar cursos — modelo **15% de comissão por venda, sem mensalidade**
- **Tabs:** Catálogo Oficial / Cursos Parceiros
- **Filtros por categoria:** Todos, Agronomia, Solos, Irrigação, Fitossanidade, Tecnologia, …
- **Card de curso contém:** nível (Básico/Intermediário/Avançado/Gratuito), título, descrição curta, autor/instrutor, duração (h), nº de alunos matriculados, rating (estrelas), botão **Iniciar**
- **Exemplos vistos:** Manejo Integrado de Pragas (MIP), Agricultura de Precisão Básico, Análise e Interpretação de Solo

**Implicações técnicas:**
- Plataforma LMS leve (módulos, aulas, progresso por aluno)
- Marketplace de cursos parceiros → necessita cadastro de instrutor, fluxo de aprovação, **billing com split (Stripe Connect)**
- Certificados emitidos em PDF (com QR de validação?)
- Avaliações/rating por aluno

### 6. Agroquímicos
**Subtítulo:** "5 produtos cadastrados" *(catálogo cresce por tenant)*

- **CTA "Cadastrar":** tenant pode cadastrar seu próprio produto
- **Busca:** por nome do produto ou ingrediente ativo
- **Tabs:** Todos, Herbicidas, Inseticidas, Fungicidas *(provavelmente também Acaricidas, Nematicidas, etc.)*
- **Campos do produto:** nome comercial, ingrediente ativo + concentração (g/L), classe toxicológica (I a IV com cores), culturas aprovadas
- **Exemplos:** Certero, Gramoxone 200, Engeo Pleno S, Nativo, Roundup Original DI

**Implicações técnicas:**
- Tabela `agroquimicos` com tenant_id (cadastros próprios) + flag `oficial` para catálogo global
- Enum de classe toxicológica (I extremamente / II altamente / III medianamente / IV pouco)
- Array de culturas aprovadas (relação muitos-pra-muitos com `culturas`)
- Histórico de aplicação (futuro?) → integrar com calendário/talhão

### 7. Laudos Agronômicos
**Subtítulo:** "Relatórios e pareceres técnicos"

- **KPIs:** Total, Finalizados, Em andamento
- **CTA "Novo":** criar laudo
- **Card do laudo:** título, tipo (Solo / Fitossanidade / Irrigação / …), cliente/fazenda, data, **status** (Finalizado / Em análise), ações: **Baixar PDF** + **Compartilhar**
- **Exemplos:** Análise de Solo - Fazenda São João, Vistoria Fitossanitária - Talhão 3, Laudo Hídrico - Pivô Central

**Implicações técnicas:**
- Tabela `laudos` (tenant_id, tipo, cliente_id, autor_id, status, arquivo_pdf_url, payload_json com dados estruturados)
- Geração de PDF: server-side (Puppeteer / react-pdf / pdfme)
- Compartilhamento: link público com token + opcional senha
- Status workflow: rascunho → em análise → finalizado → arquivado

### 8. Dashboard
**Subtítulo:** "Indicadores em tempo real"

- **KPIs (4 cards):** Preço Soja (R$/sc + variação %), Preço Milho, Dólar, Umidade do Solo (%) com status (Ideal/Baixa/Alta)
- **Alertas Ativos:** notificações contextualizadas (clima, mercado, condições da lavoura)
  - Exemplo clima: "Chuva prevista para os próximos 3 dias — avaliar janela de pulverização"
  - Exemplo mercado: "Preço da soja em alta — considerar venda antecipada da safra"
  - Exemplo lavoura: "Temperatura elevada — monitorar estresse hídrico na lavoura"
- **Gráficos:** Produtividade (sc/ha) por mês, Cotação (R$/sc) ao longo do tempo

**Implicações técnicas:**
- Integração com APIs externas:
  - **Cotações agrícolas:** CEPEA/Esalq, B3, ou scraping autorizado
  - **Câmbio:** API do BCB ou exchangerate.host
  - **Clima:** OpenWeather, INMET, Climatempo
  - **Sensores de solo:** se houver IoT, MQTT/HTTP webhook
- Engine de alertas: cron jobs que cruzam dados externos + dados do tenant (cultura plantada, fase do ciclo, localização da fazenda)
- Cache agressivo (cotações não mudam a cada segundo) — Supabase + revalidate ou Redis

---

## Lotes futuros
*(adicionar à medida que o Diego enviar mais prints)*

---

## Observações de arquitetura — primeira leitura

| Tipo de módulo | Implementação | Notas |
|---|---|---|
| Calculadoras (Calagem, NPK, Irrigação...) | Componente client-side com formulário + função pura de cálculo | Fórmulas vão num módulo `lib/calculadoras/` testável. Resultados podem ser salvos no histórico por tenant. |
| Conteúdo educacional (Processos em Solos, Fertilidade) | Tabela `articles` no Supabase + render via MDX/Markdown | Pode começar como conteúdo estático em `content/` e migrar pra DB depois. |
| IA — Identificar pragas | API route `/api/ai/identificar-praga` chamando Claude Vision (ou outro) | Upload via Supabase Storage. Logs/cota por tenant. |
| Calendário Agrícola | Tabela `eventos_agricolas` com tenant_id + cultura/talhão | UI com calendário (FullCalendar ou rolar próprio). |
| Biblioteca Técnica | Tabela `articles` com tags + full-text search (Postgres `tsvector`) | Reaproveita conteúdo dos módulos educacionais. |

### Decisões pendentes
- [ ] Qual provedor de IA pra identificação de pragas? (Claude Sonnet Vision é forte aqui)
- [ ] Conteúdo educacional: estático (MDX) ou editável via admin (DB)?
- [ ] Calendário: por cultura padrão (BR) + customizável por tenant?
- [ ] Modelo de assinatura/billing — Stripe? quantos planos?
- [ ] Identidade visual definitiva (já temos o story de Instagram como referência verde)
