/**
 * Calculadora de Calagem — Necessidade de Calcário (NC)
 *
 * Método pela saturação por bases (Cetiñas & Ouvirando — método mais usado no Brasil):
 *
 *     NC (t/ha) = T × (V₂ - V₁) / (PRNT × 10)
 *
 * onde:
 *   T    = CTC do solo a pH 7 (cmolc/dm³)
 *   V₂   = saturação por bases desejada (%)  — varia por cultura
 *   V₁   = saturação por bases atual (%)
 *   PRNT = Poder Relativo de Neutralização Total do calcário (%)
 *
 * Profundidade padrão: 0–20 cm. Para outras, multiplicar por (prof/20).
 *
 * Referências:
 *  - Raij et al. (1996), IAC Boletim 100
 *  - Sousa & Lobato (2004), Cerrado
 */

export type CalagemInput = {
  /** CTC do solo a pH 7,0 em cmolc/dm³ (do laudo de solo) */
  ctc: number;
  /** Saturação por bases atual (%) — do laudo de solo */
  v1: number;
  /** Saturação por bases desejada (%) — depende da cultura */
  v2: number;
  /** PRNT do calcário (%) — vem do fornecedor */
  prnt: number;
  /** Profundidade de incorporação em cm (padrão 20) */
  profundidadeCm?: number;
};

export type CalagemResult = {
  /** Necessidade de calcário em toneladas por hectare */
  ncTonHa: number;
  /** Equivalente em kg por hectare */
  ncKgHa: number;
  /** Avaliação textual */
  observacao: string;
};

export function calcularCalagem(input: CalagemInput): CalagemResult {
  const { ctc, v1, v2, prnt, profundidadeCm = 20 } = input;

  if (ctc <= 0) throw new Error("CTC deve ser maior que zero.");
  if (prnt <= 0 || prnt > 100) throw new Error("PRNT deve estar entre 0 e 100.");
  if (v1 < 0 || v1 > 100) throw new Error("V₁ deve estar entre 0 e 100%.");
  if (v2 < 0 || v2 > 100) throw new Error("V₂ deve estar entre 0 e 100%.");
  if (profundidadeCm <= 0) throw new Error("Profundidade deve ser maior que zero.");

  // Fórmula base (profundidade 20 cm)
  let nc = (ctc * (v2 - v1)) / (prnt * 10);

  // Ajuste de profundidade
  nc *= profundidadeCm / 20;

  // Não recomendar calagem se V₁ já estiver acima de V₂
  if (nc <= 0) {
    return {
      ncTonHa: 0,
      ncKgHa: 0,
      observacao:
        "Saturação por bases atual já atende ou supera a desejada. Calagem desnecessária.",
    };
  }

  const ncRound = Math.round(nc * 100) / 100;
  return {
    ncTonHa: ncRound,
    ncKgHa: Math.round(ncRound * 1000),
    observacao:
      ncRound < 0.5
        ? "Dose baixa — aplicar a lanço."
        : ncRound > 5
        ? "Dose alta — parcelar em duas aplicações (60/40) com 3–6 meses de intervalo."
        : "Aplicar a lanço com 60–90 dias de antecedência ao plantio.",
  };
}

/** Saturação por bases desejada por cultura (referências comuns, conferir com agrônomo) */
export const V2_POR_CULTURA = [
  { cultura: "Soja", v2: 70 },
  { cultura: "Milho", v2: 70 },
  { cultura: "Trigo", v2: 70 },
  { cultura: "Algodão", v2: 70 },
  { cultura: "Café", v2: 60 },
  { cultura: "Cana-de-açúcar", v2: 60 },
  { cultura: "Pastagem", v2: 50 },
  { cultura: "Hortaliças", v2: 80 },
  { cultura: "Citros", v2: 70 },
  { cultura: "Feijão", v2: 70 },
] as const;
