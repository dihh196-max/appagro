/**
 * Catálogo de nutrientes essenciais para as plantas.
 *
 * Organizado em 4 grupos:
 *  - primarios:    N, P, K
 *  - secundarios:  Ca, Mg, S
 *  - micros:       B, Cl, Cu, Fe, Mn, Mo, Ni, Zn
 *  - calagem:      cobre Ca e Mg do calcário + neutralização de Al
 *
 * Fontes técnicas: IAC Boletim 100, Manual Embrapa, Sousa & Lobato (Cerrado).
 */

export type GrupoNutriente = "primarios" | "secundarios" | "micros" | "calagem";

export type Nutriente = {
  slug: string;
  simbolo: string;
  nome: string;
  grupo: GrupoNutriente;
  /** Cor de destaque (paleta Tailwind brand-* ou outras) */
  cor: "emerald" | "blue" | "purple" | "orange" | "amber" | "pink" | "sky" | "rose";
  /** Papel do nutriente na planta */
  papel: string;
  /** Sintomas visuais de deficiência */
  deficiencia: string[];
  /** Sintomas de excesso / toxicidade */
  excesso: string[];
  /** Fontes mais comuns (adubos comerciais) */
  fontes: { nome: string; teor: string }[];
  /** Faixa adequada em análise foliar / solo */
  faixa?: { tipo: "foliar" | "solo"; valor: string }[];
  /** Mobilidade na planta (móvel = sintomas nas folhas velhas) */
  mobilidade?: "móvel" | "imóvel" | "pouco móvel";
};

export const GRUPOS: { slug: GrupoNutriente; titulo: string; subtitulo: string; icone: string; cor: string }[] = [
  {
    slug: "primarios",
    titulo: "Macronutrientes Primários",
    subtitulo: "Maior absorção pela planta",
    icone: "⚡",
    cor: "bg-emerald-600",
  },
  {
    slug: "secundarios",
    titulo: "Macronutrientes Secundários",
    subtitulo: "Importantes em quantidade média",
    icone: "💧",
    cor: "bg-blue-500",
  },
  {
    slug: "micros",
    titulo: "Micronutrientes",
    subtitulo: "Pequenas doses, alto impacto",
    icone: "🧪",
    cor: "bg-purple-500",
  },
  {
    slug: "calagem",
    titulo: "Correção e Calagem",
    subtitulo: "Cálcio, magnésio e pH",
    icone: "🏔️",
    cor: "bg-orange-500",
  },
];

export const NUTRIENTES: Nutriente[] = [
  // ----- PRIMÁRIOS -----
  {
    slug: "nitrogenio",
    simbolo: "N",
    nome: "Nitrogênio",
    grupo: "primarios",
    cor: "emerald",
    mobilidade: "móvel",
    papel:
      "Componente fundamental de proteínas, ácidos nucleicos e clorofila. Responsável pelo crescimento vegetativo, perfilhamento e cor verde intensa da folha.",
    deficiencia: [
      "Amarelecimento (clorose) começando pelas folhas velhas",
      "Crescimento lento e plantas pequenas",
      "Caule fino e ramificação reduzida",
      "Senescência precoce das folhas inferiores",
    ],
    excesso: [
      "Vegetação excessiva em detrimento da produção (acamamento)",
      "Atraso na floração e maturação",
      "Tecidos suculentos mais suscetíveis a pragas e doenças fúngicas",
      "Lixiviação de nitrato — risco ambiental",
    ],
    fontes: [
      { nome: "Ureia", teor: "45% N" },
      { nome: "Sulfato de amônio", teor: "21% N + 24% S" },
      { nome: "Nitrato de amônio", teor: "32% N" },
      { nome: "MAP (Fosfato Monoamônico)", teor: "11% N + 52% P₂O₅" },
      { nome: "DAP (Fosfato Diamônico)", teor: "18% N + 46% P₂O₅" },
    ],
    faixa: [
      { tipo: "foliar", valor: "Soja: 45–55 g/kg · Milho: 27–35 g/kg" },
    ],
  },
  {
    slug: "fosforo",
    simbolo: "P",
    nome: "Fósforo",
    grupo: "primarios",
    cor: "emerald",
    mobilidade: "móvel",
    papel:
      "Componente de ATP, ADP, ácidos nucleicos e fosfolipídios. Essencial para enraizamento inicial, frutificação, formação de sementes e transferência de energia.",
    deficiencia: [
      "Folhas com coloração arroxeada (acúmulo de antocianina) nas folhas velhas",
      "Sistema radicular pobre e curto",
      "Atraso na floração e baixo pegamento de frutos",
      "Plantas pequenas e produção reduzida",
    ],
    excesso: [
      "Imobilização de micronutrientes (Zn, Fe, Cu) — deficiências induzidas",
      "Eutrofização de corpos d'água por escorrimento",
    ],
    fontes: [
      { nome: "Superfosfato simples", teor: "18% P₂O₅ + 10% S + 18% Ca" },
      { nome: "Superfosfato triplo", teor: "41% P₂O₅" },
      { nome: "MAP", teor: "52% P₂O₅ + 11% N" },
      { nome: "DAP", teor: "46% P₂O₅ + 18% N" },
      { nome: "Fosfato natural", teor: "20–30% P₂O₅ (liberação lenta)" },
    ],
    faixa: [
      { tipo: "solo", valor: "P-resina: > 30 mg/dm³ (alto)" },
    ],
  },
  {
    slug: "potassio",
    simbolo: "K",
    nome: "Potássio",
    grupo: "primarios",
    cor: "emerald",
    mobilidade: "móvel",
    papel:
      "Ativador enzimático, regulação osmótica, abertura de estômatos, tolerância a seca e geada. Melhora qualidade de frutos e resistência a doenças.",
    deficiencia: [
      "Queima nas bordas das folhas velhas (clorose marginal)",
      "Caules fracos e acamamento",
      "Frutos pequenos e de baixa qualidade",
      "Maior incidência de doenças",
    ],
    excesso: [
      "Compete com Ca²⁺ e Mg²⁺ (deficiência induzida)",
      "Salinização do solo em doses muito altas",
    ],
    fontes: [
      { nome: "Cloreto de potássio (KCl)", teor: "60% K₂O" },
      { nome: "Sulfato de potássio", teor: "48–52% K₂O + 17% S" },
      { nome: "Sulfato duplo de K e Mg", teor: "22% K₂O + 18% Mg" },
    ],
    faixa: [
      { tipo: "solo", valor: "K trocável: > 0,30 cmolc/dm³" },
    ],
  },
  // ----- SECUNDÁRIOS -----
  {
    slug: "calcio",
    simbolo: "Ca",
    nome: "Cálcio",
    grupo: "secundarios",
    cor: "blue",
    mobilidade: "imóvel",
    papel:
      "Estrutural — compõe a parede celular (pectato de cálcio). Essencial para crescimento de raízes, qualidade de frutos e firmeza dos tecidos.",
    deficiencia: [
      "Morte de gemas apicais (folhas e raízes novas)",
      "Podridão apical em tomate, pimentão (\"fundo preto\")",
      "Bitter pit em maçã",
      "Raízes curtas e atrofiadas",
    ],
    excesso: [
      "Eleva pH excessivamente",
      "Imobiliza P, Fe, Mn, Zn e B",
    ],
    fontes: [
      { nome: "Calcário calcítico", teor: "40–48% CaO" },
      { nome: "Calcário dolomítico", teor: "26–30% CaO + 15–20% MgO" },
      { nome: "Gesso agrícola", teor: "26% CaO + 15% S" },
      { nome: "Nitrato de cálcio", teor: "19% CaO + 14% N" },
    ],
  },
  {
    slug: "magnesio",
    simbolo: "Mg",
    nome: "Magnésio",
    grupo: "secundarios",
    cor: "blue",
    mobilidade: "móvel",
    papel:
      "Átomo central da molécula de clorofila. Ativador de muitas enzimas, transporte de fósforo e síntese de proteínas.",
    deficiencia: [
      "Clorose internerval nas folhas velhas (nervuras verdes, espaço amarelo)",
      "Avermelhamento das folhas em algumas culturas (algodão)",
      "Necrose foliar em estágios avançados",
    ],
    excesso: ["Geralmente sem sintoma direto, mas compete com Ca²⁺ e K⁺"],
    fontes: [
      { nome: "Calcário dolomítico", teor: "15–20% MgO" },
      { nome: "Sulfato de magnésio (sal de Epsom)", teor: "16% MgO + 13% S" },
      { nome: "Óxido de magnésio", teor: "55–60% MgO" },
    ],
  },
  {
    slug: "enxofre",
    simbolo: "S",
    nome: "Enxofre",
    grupo: "secundarios",
    cor: "blue",
    mobilidade: "imóvel",
    papel:
      "Componente de aminoácidos (cisteína, metionina), proteínas e vitaminas. Fundamental em leguminosas (fixação simbiótica de N) e oleaginosas.",
    deficiencia: [
      "Clorose generalizada — folhas novas amarelas (diferente de N, que começa nas velhas)",
      "Plantas menores e menos vigorosas",
      "Atraso na maturação",
    ],
    excesso: ["Acidificação do solo", "Toxicidade em culturas sensíveis"],
    fontes: [
      { nome: "Gesso agrícola", teor: "15% S" },
      { nome: "Sulfato de amônio", teor: "24% S + 21% N" },
      { nome: "Superfosfato simples", teor: "10% S" },
      { nome: "Enxofre elementar", teor: "90–98% S (liberação lenta)" },
    ],
  },
  // ----- MICRONUTRIENTES -----
  {
    slug: "boro",
    simbolo: "B",
    nome: "Boro",
    grupo: "micros",
    cor: "purple",
    mobilidade: "imóvel",
    papel:
      "Formação da parede celular, transporte de açúcares, germinação do grão de pólen e desenvolvimento de tecidos meristemáticos.",
    deficiencia: [
      "Morte da gema apical (\"coração oco\" em beterraba)",
      "Frutos rachados e deformados",
      "Aborto de flores e baixo pegamento",
      "Brotações múltiplas anormais",
    ],
    excesso: [
      "Queima nas bordas e ponta de folhas velhas",
      "Necrose foliar — faixa estreita entre deficiência e toxicidade",
    ],
    fontes: [
      { nome: "Bórax", teor: "11% B" },
      { nome: "Ácido bórico", teor: "17% B" },
      { nome: "Ulexita", teor: "10–13% B" },
    ],
  },
  {
    slug: "cobre",
    simbolo: "Cu",
    nome: "Cobre",
    grupo: "micros",
    cor: "purple",
    mobilidade: "pouco móvel",
    papel:
      "Componente de enzimas (oxidases), fotossíntese, formação de lignina e fertilidade do pólen.",
    deficiencia: [
      "Clorose e enrolamento de folhas novas",
      "Morte de ponteiros e exudação de goma em citros",
      "Espigas pequenas em milho",
    ],
    excesso: [
      "Sintomas semelhantes à deficiência de Fe (clorose)",
      "Acúmulo em solos com longo histórico de fungicidas cúpricos",
    ],
    fontes: [
      { nome: "Sulfato de cobre", teor: "25% Cu" },
      { nome: "Oxicloreto de cobre", teor: "50% Cu" },
    ],
  },
  {
    slug: "ferro",
    simbolo: "Fe",
    nome: "Ferro",
    grupo: "micros",
    cor: "purple",
    mobilidade: "imóvel",
    papel:
      "Síntese de clorofila, fotossíntese e respiração. Componente de citocromos e enzimas oxidativas.",
    deficiencia: [
      "Clorose internerval nas folhas novas (nervuras permanecem verdes)",
      "Em casos severos, folhas inteiramente amarelas",
    ],
    excesso: ["Toxicidade em arroz inundado — bronzeamento de folhas"],
    fontes: [
      { nome: "Sulfato ferroso", teor: "20% Fe" },
      { nome: "Quelato de Fe (FeEDDHA)", teor: "6% Fe (mais eficiente)" },
    ],
  },
  {
    slug: "manganes",
    simbolo: "Mn",
    nome: "Manganês",
    grupo: "micros",
    cor: "purple",
    mobilidade: "imóvel",
    papel:
      "Ativador de enzimas, fotossíntese (fotólise da água) e síntese de clorofila.",
    deficiencia: [
      "Clorose internerval em folhas novas (parecido com Fe, mas com pontos cinza/marrom)",
      "Em soja: \"crinkle leaf\"",
    ],
    excesso: ["Manchas necróticas em folhas velhas", "Toxicidade comum em solos ácidos"],
    fontes: [{ nome: "Sulfato de manganês", teor: "31% Mn" }],
  },
  {
    slug: "molibdenio",
    simbolo: "Mo",
    nome: "Molibdênio",
    grupo: "micros",
    cor: "purple",
    mobilidade: "móvel",
    papel:
      "Componente da nitrogenase (fixação biológica de N em leguminosas) e da redutase do nitrato.",
    deficiencia: [
      "Folhas amareladas e enroladas",
      "Em leguminosas: nodulação pobre, sintomas de deficiência de N",
    ],
    excesso: ["Raríssimo no campo"],
    fontes: [
      { nome: "Molibdato de sódio", teor: "39% Mo" },
      { nome: "Molibdato de amônio", teor: "54% Mo" },
    ],
  },
  {
    slug: "zinco",
    simbolo: "Zn",
    nome: "Zinco",
    grupo: "micros",
    cor: "purple",
    mobilidade: "pouco móvel",
    papel:
      "Síntese de auxina (hormônio de crescimento), formação de proteínas e ativador de enzimas.",
    deficiencia: [
      "Entrenós curtos (\"rosetagem\")",
      "Folhas pequenas e estreitas (\"folha estreita\" em milho)",
      "Clorose internerval",
    ],
    excesso: ["Clorose por deficiência induzida de Fe"],
    fontes: [
      { nome: "Sulfato de zinco", teor: "23% Zn" },
      { nome: "Óxido de zinco", teor: "70–80% Zn" },
    ],
  },
  // ----- CORREÇÃO E CALAGEM -----
  {
    slug: "calcario",
    simbolo: "CaCO₃",
    nome: "Calcário",
    grupo: "calagem",
    cor: "orange",
    papel:
      "Corretivo de acidez. Eleva o pH do solo, neutraliza Al³⁺ tóxico, fornece Ca e Mg (no dolomítico) e melhora a CTC efetiva.",
    deficiencia: [
      "(Não se aplica — é um corretivo, não nutriente)",
      "Sintomas de acidez do solo: baixo desenvolvimento radicular, toxicidade por Al e Mn",
    ],
    excesso: [
      "Elevação excessiva do pH (> 7) → deficiência induzida de Fe, Zn, Mn e B",
      "Compactação por uso de calcário muito fino sem incorporação",
    ],
    fontes: [
      { nome: "Calcário calcítico", teor: "40–48% CaO · até 5% MgO" },
      { nome: "Calcário dolomítico", teor: "26–30% CaO + 15–20% MgO" },
      { nome: "Calcário magnesiano", teor: "5–12% MgO" },
    ],
    faixa: [{ tipo: "solo", valor: "V% desejada por cultura (50% pastagem, 70% grãos, 80% hortaliças)" }],
  },
  {
    slug: "gesso",
    simbolo: "CaSO₄",
    nome: "Gesso Agrícola",
    grupo: "calagem",
    cor: "orange",
    papel:
      "Condicionador de subsolo. Reduz toxidez de Al³⁺ em profundidade, fornece Ca e S, e melhora o aprofundamento radicular em solos ácidos. NÃO altera pH.",
    deficiencia: [
      "(Não se aplica — usado quando há acidez subsuperficial)",
      "Sintomas indicadores: m% > 20 no subsolo ou Ca²⁺ < 0,5 cmolc/dm³",
    ],
    excesso: [
      "Lixiviação de Mg²⁺ e K⁺ junto com SO₄²⁻ — repor depois",
      "Aumento da salinidade temporária",
    ],
    fontes: [{ nome: "Gesso agrícola (subproduto da indústria do fosfato)", teor: "26% CaO + 15% S" }],
  },
];

export function listarPorGrupo(grupo: GrupoNutriente): Nutriente[] {
  return NUTRIENTES.filter((n) => n.grupo === grupo);
}

export function buscarNutriente(grupo: string, slug: string): Nutriente | undefined {
  return NUTRIENTES.find((n) => n.grupo === grupo && n.slug === slug);
}

export function buscarGrupo(slug: string): (typeof GRUPOS)[number] | undefined {
  return GRUPOS.find((g) => g.slug === slug);
}
