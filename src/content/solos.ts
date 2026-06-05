/**
 * Processos em Solos — conteúdo educacional.
 *
 * 5 capítulos cobrindo o essencial: tipos, física, química, biologia, manejo.
 * Conteúdo em markdown para renderização rica.
 */

export type CapituloSolo = {
  slug: string;
  titulo: string;
  subtitulo: string;
  icone: string;
  cor: string;
  conteudo: string;
};

export const CAPITULOS_SOLO: CapituloSolo[] = [
  {
    slug: "tipos-de-solo",
    titulo: "Tipos de Solo",
    subtitulo: "Classificação e características",
    icone: "🗂️",
    cor: "bg-orange-500",
    conteudo: `
## Sistema Brasileiro de Classificação de Solos (SiBCS)

O Brasil tem **13 ordens de solos** definidas pela Embrapa. As mais comuns nas áreas agrícolas são:

### Latossolos

- ⅓ do território brasileiro
- Solos **profundos, bem drenados** e altamente intemperizados
- Estrutura granular forte, baixa fertilidade natural
- **Acidez alta** (Al³⁺ tóxico) — precisam de calagem
- Maioria das lavouras de soja, milho e cana
- Cores: amarelos, vermelhos, vermelho-amarelos

### Argissolos

- 24% do território
- Camada superficial arenosa com **subsuperficial argilosa** (gradiente textural)
- Suscetíveis à erosão (pedoforma)
- Comuns na faixa litorânea e em relevo movimentado
- Demandam práticas conservacionistas (terraços, plantio em nível)

### Neossolos

- Solos jovens, **pouco desenvolvidos**
- Subtipos: Litólicos (sobre rocha), Quartzarênicos (areia), Flúvicos (sedimentos)
- Baixa retenção de água e nutrientes
- Limitações para mecanização em áreas pedregosas

### Cambissolos

- Solos em formação intermediária
- Comum em regiões de relevo ondulado (Sul, Sudeste)
- Fertilidade variável dependendo do material de origem

### Vertissolos

- Argila expansiva (montmorilonita)
- Racha quando seca, fica plástico molhado
- Difícil manejo mecânico
- Naturalmente férteis

### Como saber o tipo do seu solo?

1. **Análise textural** no laboratório (% areia, silte, argila)
2. **Trincheira** de 1–1,5 m para observar horizontes
3. **Laudo pedológico** de empresa especializada

> 💡 O tipo de solo define **escolha de cultura**, **manejo de água**, **adubação** e até **maquinário** que faz sentido.
`,
  },
  {
    slug: "fisica-do-solo",
    titulo: "Física do Solo",
    subtitulo: "Estrutura, água, ar",
    icone: "💨",
    cor: "bg-blue-500",
    conteudo: `
## Os 3 componentes físicos

O solo é composto, em volume, de:
- **50% sólidos** (mineral + matéria orgânica)
- **25% água** (em capacidade de campo)
- **25% ar** (poros)

A **densidade e a porosidade** determinam o quanto de cada.

### Textura vs Estrutura

| Conceito | O que é | Como medir |
|---|---|---|
| **Textura** | Proporção de areia/silte/argila | Análise granulométrica |
| **Estrutura** | Como as partículas se agregam | Diagnóstico visual (DRES, VESS) |

Você não muda textura, mas pode **melhorar muito a estrutura** com matéria orgânica e plantio direto.

### Capacidade de retenção de água

- **Capacidade de campo (CC):** água retida 1-2 dias após chuva
- **Ponto de murcha permanente (PMP):** ponto em que planta não consegue mais extrair
- **Água disponível (AD):** AD = CC − PMP

Solos argilosos têm mais AD que arenosos.

### Compactação

Indicadores:
- Densidade > 1,5 g/cm³ (argiloso) ou > 1,7 (arenoso)
- Resistência à penetração > 2 MPa
- Raízes deformadas, em "L" ou "cotovelo"
- Encharcamento superficial após chuvas leves

**Soluções:**
- Curto prazo: **escarificação** (subsolagem) até 30–35 cm
- Médio prazo: **plantas de cobertura com raízes pivotantes** (nabo, crotalária)
- Longo prazo: **sistema plantio direto** com palhada constante

### Infiltração

Capacidade do solo de absorver água. Reduzida por:
- Compactação superficial
- Selamento (chuva forte em solo descoberto)
- Falta de cobertura morta

> ⚠️ Quando a infiltração cai abaixo da intensidade da chuva → escorrimento superficial → **erosão**.
`,
  },
  {
    slug: "quimica-do-solo",
    titulo: "Química do Solo",
    subtitulo: "pH, CTC, reações",
    icone: "🧪",
    cor: "bg-emerald-600",
    conteudo: `
## pH — o indicador-chave

A escala vai de 0 a 14. Para a maioria das culturas, o **pH ideal é 6,0 a 6,5**.

| pH | Característica |
|---|---|
| < 5,0 | Muito ácido — Al³⁺ tóxico, deficiência de P, Ca, Mg |
| 5,0–5,5 | Ácido — limita produtividade |
| **5,5–6,5** | ⭐ **Ideal para grãos** |
| 6,5–7,0 | Levemente alcalino |
| > 7,0 | Alcalino — pode imobilizar Fe, Zn, Mn, B |

### CTC — Capacidade de Troca Catiônica

Quantidade de cátions (Ca²⁺, Mg²⁺, K⁺, etc.) que o solo pode reter e fornecer às plantas.

- **CTC baixa** (< 5 cmolc/dm³): solos arenosos, baixa fertilidade, perda fácil de nutrientes
- **CTC média** (5–15): solos médios
- **CTC alta** (> 15): solos argilosos ou com muita matéria orgânica — armazenam mais

**Componentes da CTC:**
- Argila (parte inorgânica)
- **Matéria orgânica** (a maior contribuição em solos tropicais!)

### V% — Saturação por Bases

V% = (Ca + Mg + K) / CTC × 100

- **V > 50%:** solo eutrófico (bem suprido)
- **V < 50%:** solo distrófico (precisa correção)

Por isso a calagem usa V₂ desejado por cultura (70% para grãos, 50% para pastagem).

### m% — Saturação por Alumínio

m% = Al / (Al + Ca + Mg + K) × 100

- **m > 30%:** toxidez severa, raízes não se desenvolvem
- **m < 10%:** solo corrigido

### Matéria Orgânica (MO)

O componente mais importante da química do solo tropical:
- Aumenta CTC
- Melhora estrutura física
- Alimenta microbiota
- Estoca carbono

Cada **1% de MO ≈ 17 t/ha de C no perfil 0-20 cm**. SPD acumula 0,1–0,3% MO/ano.
`,
  },
  {
    slug: "biologia-do-solo",
    titulo: "Biologia do Solo",
    subtitulo: "Microrganismos e bioindicadores",
    icone: "🐛",
    cor: "bg-purple-500",
    conteudo: `
## O solo está vivo

Um grama de solo agrícola contém:
- 🦠 **1–10 bilhões** de bactérias
- 🍄 **1–10 milhões** de fungos
- 🪱 **alguns milhares** de nematoides e protozoários
- 🐜 **dezenas** de microartrópodes

### Funções da biota

1. **Decomposição** da matéria orgânica
2. **Ciclagem de nutrientes** (N, P, S)
3. **Fixação biológica de N** (rizóbio em leguminosas)
4. **Solubilização de fósforo**
5. **Bioproteção** contra patógenos
6. **Formação de agregados** (estrutura)

### Bactérias

- Mais abundantes
- Decompositoras rápidas (material lábil)
- **Rhizobium**: fixam N atmosférico em soja, feijão, ervilhaca → economizam até 200 kg N/ha
- **Azospirillum**: fixam N em milho, trigo, pastagens

### Fungos

- **Fungos micorrízicos arbusculares (FMAs)** — simbiose com 90% das plantas, ampliam absorção de P
- **Decompositores** — quebram lignina e celulose
- Mais sensíveis a revolvimento do solo (preferem SPD)

### Bioindicadores

| Indicador | O que mede |
|---|---|
| **Respiração basal** | Atividade microbiana total |
| **Biomassa microbiana C/N** | Quantidade de microrganismos |
| **Densidade de minhocas** | > 50/m² indica solo saudável |
| **Atividade enzimática** | β-glicosidase, fosfatase, urease |

### Como aumentar a vida do solo?

- ✅ **Plantio direto** (não revolver)
- ✅ **Rotação de culturas** (diversifica resíduos)
- ✅ **Plantas de cobertura** (alimenta a biota o ano todo)
- ✅ **Adubação verde** com leguminosas
- ✅ **Reduzir defensivos** ou usar produtos seletivos
- ❌ Queimadas
- ❌ Aração/gradagem repetida
- ❌ Solo descoberto entre safras
`,
  },
  {
    slug: "manejo-conservacao",
    titulo: "Manejo e Conservação",
    subtitulo: "Práticas sustentáveis",
    icone: "🛡️",
    cor: "bg-rose-500",
    conteudo: `
## A pirâmide do manejo conservacionista

\`\`\`
              [Plantio Direto]
            /        |        \\
   [Cobertura morta] [Rotação] [Mínimo revolvimento]
       /                  |                \\
[Plantas de cobertura] [Diversidade] [Maquinário leve]
\`\`\`

### Princípios

1. **Solo sempre coberto** — palhada, plantas vivas ou cobertura morta
2. **Mínimo revolvimento** — apenas o sulco de semeadura
3. **Rotação de culturas** — sucessão que melhora a fertilidade

### Práticas mecânicas (curva de nível)

- **Plantio em nível** — linhas perpendiculares ao maior declive
- **Terraços** — barreiras que reduzem velocidade da enxurrada
- **Bacias de captação** — pequenas represas para infiltração
- **Cordões em contorno** — vegetação permanente na curva

### Conservação química

- **Calagem** mantém pH ideal e reduz Al³⁺
- **Gessagem** descompacta quimicamente o subsolo
- **Adubação balanceada** evita acúmulo de um nutriente e deficiência de outro

### Conservação biológica

- **Rotação:** Soja → Milho safrinha + Braquiária → Trigo → Soja
- **Adubação verde:** Crotalária, milheto, nabo forrageiro
- **Pastagem perene** em áreas declivosas
- **Integração lavoura-pecuária-floresta (ILPF)** — sistema mais sustentável

### Manejo de palhada

| Cultura | Palhada (t MS/ha) | Persistência |
|---|---|---|
| Milho | 8–12 | Alta (C:N alto) |
| Sorgo | 10–14 | Alta |
| Braquiária | 10–20 | Muito alta |
| Milheto | 6–10 | Média |
| Soja | 4–6 | Baixa (C:N baixo) |
| Crotalária | 6–10 | Média |

**Mínimo recomendado** para SPD eficiente: **6 t/ha de matéria seca** anual.

### Quando alguma prática falha

Sinais de degradação:
- Encharcamento superficial após chuvas
- Aparição de erosão em sulcos
- Compactação subsuperficial (pé-de-arado)
- Queda de produtividade
- Perda de palhada (consumida sem repor)

> ⚠️ Solo é um recurso **não renovável** na escala humana. 1 cm de solo leva séculos para se formar. **Proteger é mais barato que recuperar.**
`,
  },
];

export function buscarCapitulo(slug: string): CapituloSolo | undefined {
  return CAPITULOS_SOLO.find((c) => c.slug === slug);
}
