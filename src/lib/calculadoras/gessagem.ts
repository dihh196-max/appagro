/**
 * Calculadora de Gessagem — Necessidade de Gesso Agrícola (NG)
 *
 * Fórmula prática (Sousa & Lobato, baseada em argila do subsolo):
 *
 *     NG (kg/ha) = 50 × argila (%)
 *
 * onde "argila" é o teor médio de argila do subsolo (camada 20–40 ou 40–60 cm).
 *
 * Indicado quando:
 *  - Saturação por alumínio > 20% no subsolo, OU
 *  - Saturação por cálcio < 60% (Ca²⁺/CTC < 0,6)
 *
 * O gesso NÃO substitui calcário. Aplicar APÓS calagem.
 */

export type GessagemInput = {
  /** Teor de argila do subsolo em % (do laudo, camada 20-40 cm) */
  argilaPct: number;
  /** (opcional) Saturação por alumínio do subsolo em % */
  m?: number;
  /** (opcional) Saturação por cálcio em % */
  caPct?: number;
};

export type GessagemResult = {
  ngKgHa: number;
  ngTonHa: number;
  recomendado: boolean;
  observacao: string;
};

export function calcularGessagem(input: GessagemInput): GessagemResult {
  const { argilaPct, m, caPct } = input;

  if (argilaPct < 0 || argilaPct > 100)
    throw new Error("Argila deve estar entre 0 e 100%.");

  const ngKgHa = Math.round(50 * argilaPct);
  const ngTonHa = Math.round((ngKgHa / 1000) * 100) / 100;

  // Avaliar se é recomendado
  let recomendado = true;
  let motivo = "";

  if (typeof m === "number" && typeof caPct === "number") {
    if (m <= 20 && caPct >= 60) {
      recomendado = false;
      motivo =
        "Não há indicativo de toxicidade por alumínio nem deficiência de cálcio no subsolo.";
    }
  }

  return {
    ngKgHa,
    ngTonHa,
    recomendado,
    observacao: recomendado
      ? motivo ||
        "Aplicar a lanço sem incorporação. Atua em profundidade reduzindo Al³⁺ e fornecendo Ca²⁺ e S."
      : motivo,
  };
}
