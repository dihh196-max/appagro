/**
 * Calculadora de Adubação NPK
 *
 * Dois modos:
 *  1. Direto: dada a formulação (ex.: 20-05-20) e a quantidade do adubo (kg/ha),
 *     calcular kg de N, P₂O₅ e K₂O entregues.
 *  2. Inverso: dada a necessidade da cultura (N, P₂O₅, K₂O em kg/ha) e a
 *     formulação, calcular quanto do adubo aplicar (limitado pelo menor nutriente).
 */

export type FormulacaoNPK = {
  /** % de N na formulação (ex.: 20 para um 20-05-20) */
  n: number;
  /** % de P₂O₅ na formulação */
  p: number;
  /** % de K₂O na formulação */
  k: number;
};

function validar({ n, p, k }: FormulacaoNPK) {
  if (n < 0 || p < 0 || k < 0) throw new Error("Percentuais não podem ser negativos.");
  if (n + p + k > 100)
    throw new Error("Soma de N + P₂O₅ + K₂O não pode passar de 100%.");
}

/**
 * Modo direto: dada a quantidade aplicada do adubo, retorna nutrientes entregues.
 */
export function calcularNutrientesPorAdubo(formula: FormulacaoNPK, qtdKgHa: number) {
  validar(formula);
  if (qtdKgHa < 0) throw new Error("Quantidade não pode ser negativa.");
  return {
    n: Math.round((qtdKgHa * formula.n) / 100 * 100) / 100,
    p: Math.round((qtdKgHa * formula.p) / 100 * 100) / 100,
    k: Math.round((qtdKgHa * formula.k) / 100 * 100) / 100,
  };
}

/**
 * Modo inverso: dada a necessidade da cultura, retorna quantidade do adubo
 * suficiente para atender o nutriente "mais limitante" (que satura primeiro).
 */
export type NecessidadeNPK = {
  /** Necessidade de N em kg/ha */
  n: number;
  /** Necessidade de P₂O₅ em kg/ha */
  p: number;
  /** Necessidade de K₂O em kg/ha */
  k: number;
};

export type AdubacaoResult = {
  /** Quantidade do adubo a aplicar (kg/ha) — limitada pelo nutriente mais necessário */
  qtdKgHa: number;
  /** Nutrientes que serão entregues nessa quantidade */
  entregue: { n: number; p: number; k: number };
  /** Déficit que ainda precisa ser complementado por outra fonte */
  deficit: { n: number; p: number; k: number };
  /** Qual nutriente foi o limitante */
  nutrienteLimitante: "N" | "P" | "K";
};

export function calcularAdubacao(
  formula: FormulacaoNPK,
  necessidade: NecessidadeNPK
): AdubacaoResult {
  validar(formula);
  const { n, p, k } = formula;

  // Para cada nutriente: kg de adubo necessário pra entregar a necessidade
  const qtdParaN = n > 0 ? (necessidade.n * 100) / n : Infinity;
  const qtdParaP = p > 0 ? (necessidade.p * 100) / p : Infinity;
  const qtdParaK = k > 0 ? (necessidade.k * 100) / k : Infinity;

  const qtdMax = Math.max(qtdParaN, qtdParaP, qtdParaK);
  if (!isFinite(qtdMax)) {
    return {
      qtdKgHa: 0,
      entregue: { n: 0, p: 0, k: 0 },
      deficit: necessidade,
      nutrienteLimitante: "N",
    };
  }

  const limitante: "N" | "P" | "K" =
    qtdMax === qtdParaN ? "N" : qtdMax === qtdParaP ? "P" : "K";

  const entregue = calcularNutrientesPorAdubo(formula, qtdMax);

  return {
    qtdKgHa: Math.round(qtdMax),
    entregue,
    deficit: {
      n: Math.max(0, Math.round((necessidade.n - entregue.n) * 100) / 100),
      p: Math.max(0, Math.round((necessidade.p - entregue.p) * 100) / 100),
      k: Math.max(0, Math.round((necessidade.k - entregue.k) * 100) / 100),
    },
    nutrienteLimitante: limitante,
  };
}

/** Formulações comerciais comuns no mercado BR */
export const FORMULACOES_COMUNS: { rotulo: string; formula: FormulacaoNPK }[] = [
  { rotulo: "04-14-08", formula: { n: 4, p: 14, k: 8 } },
  { rotulo: "08-28-16", formula: { n: 8, p: 28, k: 16 } },
  { rotulo: "10-10-10", formula: { n: 10, p: 10, k: 10 } },
  { rotulo: "20-05-20", formula: { n: 20, p: 5, k: 20 } },
  { rotulo: "20-00-20", formula: { n: 20, p: 0, k: 20 } },
  { rotulo: "02-20-20", formula: { n: 2, p: 20, k: 20 } },
  { rotulo: "Ureia (45-00-00)", formula: { n: 45, p: 0, k: 0 } },
  { rotulo: "MAP (11-52-00)", formula: { n: 11, p: 52, k: 0 } },
  { rotulo: "KCl (00-00-60)", formula: { n: 0, p: 0, k: 60 } },
];
