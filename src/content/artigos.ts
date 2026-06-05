/**
 * Biblioteca Técnica — artigos agrícolas em markdown.
 *
 * Conteúdo seed pra MVP. Em produção pode migrar pra tabela `articles` no Supabase
 * com editor markdown e busca via tsvector.
 */

export type Topico = {
  slug: string;
  titulo: string;
  icone: string;
};

export const TOPICOS: Topico[] = [
  { slug: "manejo-pragas",     titulo: "Manejo de Pragas",  icone: "🐛" },
  { slug: "doencas-fungicas",  titulo: "Doenças Fúngicas",  icone: "🍄" },
  { slug: "adubacao",          titulo: "Adubação",          icone: "🌿" },
  { slug: "irrigacao",         titulo: "Irrigação",         icone: "💧" },
  { slug: "mecanizacao",       titulo: "Mecanização",       icone: "🚜" },
  { slug: "sustentabilidade",  titulo: "Sustentabilidade",  icone: "🌳" },
  { slug: "boas-praticas",     titulo: "Boas Práticas",     icone: "✅" },
  { slug: "colheita",          titulo: "Colheita",          icone: "🌾" },
];

export type Artigo = {
  slug: string;
  topico: string;
  titulo: string;
  resumo: string;
  autor: string;
  tempoLeitura: number; // minutos
  publicadoEm: string;  // ISO date
  conteudo: string;     // markdown
};

export const ARTIGOS: Artigo[] = [
  {
    slug: "mip-introducao",
    topico: "manejo-pragas",
    titulo: "Manejo Integrado de Pragas (MIP): introdução prática",
    resumo:
      "Como combinar monitoramento, controle biológico, cultural e químico para reduzir custos e impacto ambiental.",
    autor: "Equipe AppAgro",
    tempoLeitura: 7,
    publicadoEm: "2026-05-20",
    conteudo: `
## O que é MIP?

O **Manejo Integrado de Pragas** é uma estratégia que combina diferentes táticas para manter populações de pragas abaixo do nível de dano econômico, priorizando métodos que tenham menor impacto ambiental e econômico.

### Os 4 pilares

1. **Monitoramento sistemático** — amostragem regular da lavoura com armadilhas e contagem de insetos
2. **Nível de ação** — só intervir quando a praga ultrapassa o limiar econômico
3. **Controle biológico** — uso de inimigos naturais (predadores, parasitoides, microrganismos)
4. **Controle químico seletivo** — defensivos como último recurso, escolhendo produtos seletivos

### Por que usar MIP?

- **Redução de custo** — em média 20–35% menos defensivo
- **Menos resistência** — pragas demoram mais a desenvolver resistência aos químicos
- **Sustentabilidade** — preservação de polinizadores e inimigos naturais
- **Menor impacto ambiental** — menos contaminação de solo e água

### Como começar?

1. Defina **pontos de amostragem** representativos do talhão
2. Faça **vistorias semanais** durante o ciclo crítico
3. Mantenha um **caderno de campo** com contagens e fenologia
4. Cruze os dados com **níveis de ação** publicados (Embrapa, IAC)
5. Quando precisar intervir, prefira produtos do grupo verde/azul (Classe IV/III)

> 💡 **Dica:** integre os dados de monitoramento ao calendário da lavoura para tomadas de decisão mais rápidas.
`,
  },
  {
    slug: "ferrugem-soja",
    topico: "doencas-fungicas",
    titulo: "Ferrugem asiática da soja: prevenção e controle",
    resumo:
      "Causada pelo fungo Phakopsora pachyrhizi, a ferrugem é o maior risco fitossanitário da cultura. Como reduzir perdas?",
    autor: "Equipe AppAgro",
    tempoLeitura: 6,
    publicadoEm: "2026-05-15",
    conteudo: `
## Sobre a ferrugem asiática

A ferrugem asiática (*Phakopsora pachyrhizi*) chegou ao Brasil em 2001 e hoje é a principal doença da soja, com potencial de causar perdas de **até 80%** se não controlada.

### Sintomas

- Pequenas lesões marrons e angulosas na face inferior das folhas
- Pústulas urediniais (estruturas reprodutivas do fungo)
- Amarelecimento e desfolha precoce
- Redução do enchimento de grãos

### Vazio sanitário

Período obrigatório entre **junho e setembro** (varia por estado) em que nenhuma planta de soja pode estar viva no campo — quebra o ciclo do fungo.

### Manejo

| Estratégia | Descrição |
|---|---|
| **Cultivares resistentes** | Usar variedades com genes Rpp |
| **Semeadura cedo** | Plantas escapam do período de maior pressão do inóculo |
| **Monitoramento** | Inspeções semanais a partir de V4 |
| **Fungicida preventivo** | Aplicar antes do aparecimento (R1 ou início de R3) |
| **Rotação de modos de ação** | Triazol + estrobilurina + carboxamida — nunca repetir o mesmo MoA |

### Quando aplicar fungicida?

A primeira aplicação **preventiva** geralmente acontece em **R1 (início de florescimento)** ou logo após primeiros sintomas em região de alta pressão. Reaplicações a cada 14–21 dias dependendo do produto.

> ⚠️ Resistência: já existem isolados resistentes a triazóis e estrobilurinas isolados. **Sempre misture modos de ação diferentes.**
`,
  },
  {
    slug: "adubacao-cobertura",
    topico: "adubacao",
    titulo: "Adubação de cobertura em milho: quando e como fazer",
    resumo:
      "A adubação nitrogenada de cobertura é o que define produtividade no milho. Aprenda a parcelar corretamente.",
    autor: "Equipe AppAgro",
    tempoLeitura: 5,
    publicadoEm: "2026-05-10",
    conteudo: `
## Por que adubar em cobertura?

O milho exige **150–250 kg/ha de N** num ciclo. Aplicar tudo no plantio causa **lixiviação** (perda) e **toxidez salina**. O melhor é parcelar.

### Esquema recomendado

| Momento | Dose | Forma |
|---|---|---|
| Plantio | 20–40 kg/ha N | Junto com formulação (ex.: 08-28-16) |
| **V4–V6** (4 a 6 folhas) | 60–100 kg/ha N | Cobertura, antes da abertura do cartucho |
| **V8–V10** (opcional) | 50–80 kg/ha N | Em lavouras de alta produtividade |

### Quais fontes usar?

- **Ureia** (45% N) — mais barata, mas perde por volatilização se não incorporada
- **Sulfato de amônio** (21% N + 24% S) — não volatiliza, agrega enxofre
- **Nitrato de amônio** (32% N) — pronta absorção, sem perdas
- **Ureia + inibidor de urease** (NBPT) — combina custo de ureia com menos perda

### Erros comuns

1. Aplicar ureia sem chuva ou irrigação em até 48 h → perda de **20–40% por volatilização**
2. Aplicar muito tarde (depois de V10) → planta já definiu produtividade
3. Não considerar nitrogênio fornecido pela cobertura morta de leguminosa (ervilhaca, crotalária)
`,
  },
  {
    slug: "manejo-pivot",
    topico: "irrigacao",
    titulo: "Operação e manutenção de pivô central",
    resumo:
      "Boas práticas para manter eficiência do sistema de irrigação por pivô central e prolongar vida útil.",
    autor: "Equipe AppAgro",
    tempoLeitura: 4,
    publicadoEm: "2026-05-05",
    conteudo: `
## Eficiência típica do pivô

Um pivô bem operado atinge **85% de eficiência**. Mal mantido, pode cair para **65%** — desperdício enorme de água e energia.

### Checklist de manutenção

- ✅ **Bicos:** trocar a cada 3–4 safras; medir vazão real anualmente
- ✅ **Cabo elétrico:** inspecionar isolamento; reapertar conexões
- ✅ **Pneus:** pressão recomendada; alinhamento
- ✅ **Sistema de fim de curso** funcionando
- ✅ **Aspersores:** sem entupimento; jato limpo
- ✅ **Painel:** programação de lâmina, velocidade, setores

### Lâmina x velocidade

A velocidade do pivô define quanta água é aplicada:
- Velocidade **alta** (>100%) → lâmina **pequena** (4–6 mm) — para irrigações frequentes em fases sensíveis
- Velocidade **baixa** (30–50%) → lâmina **maior** (15–25 mm) — para preparo de solo, irrigação de salvamento

### Como calcular tempo de operação

Use a **Calculadora de Irrigação** do AppAgro: ela informa a vazão necessária e o tempo total a partir da área, ET₀ e Kc da cultura.
`,
  },
  {
    slug: "regulagem-plantadeira",
    topico: "mecanizacao",
    titulo: "Regulagem de plantadeira: o passo a passo",
    resumo:
      "Como regular discos, dosadores e profundidade para garantir uniformidade de plantio.",
    autor: "Equipe AppAgro",
    tempoLeitura: 6,
    publicadoEm: "2026-04-28",
    conteudo: `
## Por que a regulagem importa?

Uma plantadeira mal regulada pode causar perdas de **15–25% na produtividade**, principalmente em milho (cultura muito sensível a espaçamento).

### Etapas

1. **Verificar nivelamento** do chassi com a barra de tração
2. **Discos de corte:** afiar; profundidade 3–5 cm
3. **Sulcadores:** desgaste uniforme; profundidade conforme cultura
4. **Dosadores:** calibrar com a semente real (PMS varia por lote)
5. **Discos perfurados:** trocar se houver desgaste
6. **Pressão de compactação:** 80–120 N por linha

### Teste no campo

Sempre fazer **teste de bandeja** com 50 m de plantio:
- Conferir **número de sementes por metro**
- Medir **profundidade média** com 10 amostras
- Verificar **uniformidade de distribuição** (CV < 30% é ideal)

### Velocidade de trabalho

| Cultura | Velocidade máxima |
|---|---|
| Milho | 5–6 km/h |
| Soja | 6–7 km/h |
| Trigo / linhas finas | 8–10 km/h |

Acima dessas velocidades a precisão de espaçamento cai drasticamente.
`,
  },
  {
    slug: "plantio-direto",
    topico: "sustentabilidade",
    titulo: "Sistema Plantio Direto: princípios e benefícios",
    resumo:
      "SPD é o pilar da agricultura sustentável no Brasil. Cobertura permanente, rotação e mínimo revolvimento.",
    autor: "Equipe AppAgro",
    tempoLeitura: 5,
    publicadoEm: "2026-04-20",
    conteudo: `
## Os 3 pilares do SPD

1. **Mínimo revolvimento do solo** — apenas o sulco de semeadura
2. **Cobertura permanente** — palhada de cultura anterior ou planta de cobertura
3. **Rotação de culturas** — diversificação para quebrar ciclos de pragas e doenças

### Benefícios mensuráveis

- 🌱 Aumento de **matéria orgânica** em 0,1 a 0,3% ao ano
- 💧 Redução de **30–50% na perda de água** por evaporação
- 🛡️ Redução de **70–90% na erosão** do solo
- 💨 **Sequestro de carbono** — solos em SPD acumulam 0,5 a 1 t C/ha/ano
- 💰 Economia de **20–40% em combustível** (menos operações)

### Plantas de cobertura ideais

| Cultura | Função | Quando plantar |
|---|---|---|
| **Aveia preta** | Cobertura no inverno | abr–mai |
| **Nabo forrageiro** | Descompactação biológica | mar–abr |
| **Crotalária** | Fixação de N | nov–dez (verão) |
| **Milheto** | Palhada para verão | set–nov |
| **Braquiária** | Cobertura intensa | conforme região |

### Cuidados iniciais

Solos vindo de preparo convencional levam **3–5 anos** para se estabilizar em SPD. Nesse período, é normal ver:
- Compactação subsuperficial residual
- Distribuição irregular de nutrientes
- População de plantas daninhas mudando

Persista — depois desse período os ganhos se consolidam.
`,
  },
  {
    slug: "epi-aplicacao",
    topico: "boas-praticas",
    titulo: "EPI na aplicação de defensivos: o que é obrigatório",
    resumo:
      "Equipamentos de Proteção Individual são obrigatórios por lei e indispensáveis para a saúde do operador.",
    autor: "Equipe AppAgro",
    tempoLeitura: 4,
    publicadoEm: "2026-04-15",
    conteudo: `
## EPI obrigatório

A NR-31 e a Lei 7.802/89 tornam obrigatório o uso de EPI durante manuseio, preparo e aplicação de agrotóxicos:

### Equipamentos mínimos

1. **Macacão impermeável** com capuz (manga longa, perna longa)
2. **Touca árabe** ou capuz integrado
3. **Viseira facial** para proteção dos olhos
4. **Respirador** com filtro adequado ao produto
5. **Luvas de nitrila ou neoprene** (não látex!)
6. **Botas impermeáveis de cano alto** (PVC)
7. **Avental impermeável** durante a preparação da calda

### Cuidados ao vestir e despir

1. Sempre **vestir antes** de manusear o produto
2. Trocar EPI sujo antes de comer, beber ou ir ao banheiro
3. Despir **na ordem inversa** de calçar (boots → avental → macacão → luvas por último)
4. **Lavar o EPI** separado da roupa pessoal
5. **Banho** completo logo após a aplicação

### Onde armazenar

EPI deve ficar em local **arejado, separado dos defensivos**, e nunca em casa.

> ⚠️ EPI rasgado, gasto ou com furos NÃO protege. Inspecione antes de cada uso.
`,
  },
  {
    slug: "ponto-colheita-soja",
    topico: "colheita",
    titulo: "Ponto ideal de colheita da soja",
    resumo:
      "Como identificar o momento certo da colheita para maximizar produtividade e qualidade dos grãos.",
    autor: "Equipe AppAgro",
    tempoLeitura: 4,
    publicadoEm: "2026-04-10",
    conteudo: `
## Quando colher?

A soja deve ser colhida quando atinge o estágio **R8 — maturação completa**:
- 95% das vagens com coloração madura (palha/marrom)
- Grãos soltos dentro das vagens (chacoalhando)
- **Umidade entre 13 e 15%**

### Por que esses números?

| Umidade | Consequência |
|---|---|
| **> 18%** | Grãos verdes/passados, perdas no transporte |
| **15–18%** | Precisa secagem cara, mas qualidade ok |
| **13–15%** | ⭐ Ideal — menor perda em campo, sem necessidade de secagem |
| **< 13%** | Risco alto de quebra mecânica, perdas por debulha natural |

### Perdas comuns

- **Plataforma:** vagens não cortadas (1–2 sc/ha facilmente perdidos)
- **Trilha:** grãos passando pela peneira (regulagem do cilindro)
- **Saída:** grãos saindo com a palha (regulagem do ventilador)

### Como medir perdas

1. Marque uma área de **2 m × 2 m** atrás da colhedora
2. Colete todos os grãos no chão
3. Pese e calcule: **se >60 g em 4 m², está acima do aceitável (1 sc/ha)**

### Velocidade ideal

- Colheita em soja: **5–7 km/h**
- Velocidade alta aumenta perdas; baixa reduz produtividade horária

> 💡 Tabela rápida: 60 grãos/m² = 1 sc/ha de perda. Conte!
`,
  },
];

export function artigosPorTopico(slug: string): Artigo[] {
  return ARTIGOS.filter((a) => a.topico === slug);
}

export function buscarArtigo(topico: string, slug: string): Artigo | undefined {
  return ARTIGOS.find((a) => a.topico === topico && a.slug === slug);
}

export function buscarTopico(slug: string): Topico | undefined {
  return TOPICOS.find((t) => t.slug === slug);
}

export function pesquisarArtigos(query: string): Artigo[] {
  const q = query.toLowerCase().trim();
  if (!q) return [];
  return ARTIGOS.filter(
    (a) =>
      a.titulo.toLowerCase().includes(q) ||
      a.resumo.toLowerCase().includes(q) ||
      a.conteudo.toLowerCase().includes(q)
  );
}
