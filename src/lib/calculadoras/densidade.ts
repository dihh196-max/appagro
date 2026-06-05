/**
 * Calculadora de Densidade de Sementes
 *
 * Converte população desejada (plantas por hectare) em:
 *  - sementes por metro linear
 *  - kg de sementes por hectare (com PMS — Peso de Mil Sementes)
 *
 * Considera germinação real (% de sementes viáveis).
 */

export type DensidadeInput = {
  /** População final desejada — plantas por hectare */
  populacaoPorHa: number;
  /** Espaçamento entre linhas em metros (ex.: 0.5 = 50 cm) */
  espacamentoLinhasM: number;
  /** Germinação esperada em % (do saco de sementes) */
  germinacaoPct: number;
  /** Peso de Mil Sementes em gramas (do saco) */
  pms: number;
  /** (opcional) Sobreviência de plantas em campo, em % (default 90) */
  sobrevivenciaPct?: number;
};

export type DensidadeResult = {
  sementesPorHa: number;
  sementesPorMetroLinear: number;
  kgPorHa: number;
};

export function calcularDensidade(input: DensidadeInput): DensidadeResult {
  const {
    populacaoPorHa,
    espacamentoLinhasM,
    germinacaoPct,
    pms,
    sobrevivenciaPct = 90,
  } = input;

  if (populacaoPorHa <= 0) throw new Error("População deve ser maior que zero.");
  if (espacamentoLinhasM <= 0) throw new Error("Espaçamento deve ser maior que zero.");
  if (germinacaoPct <= 0 || germinacaoPct > 100)
    throw new Error("Germinação deve estar entre 0 e 100%.");
  if (pms <= 0) throw new Error("PMS deve ser maior que zero.");

  // Sementes/ha = população / (germinação% * sobrevivência%)
  const fatorPerda = (germinacaoPct / 100) * (sobrevivenciaPct / 100);
  const sementesPorHa = Math.ceil(populacaoPorHa / fatorPerda);

  // Linhas por ha = 10000 m² / espaçamento → metros lineares por ha
  const metrosLinearesPorHa = 10000 / espacamentoLinhasM;
  const sementesPorMetro = sementesPorHa / metrosLinearesPorHa;

  // kg/ha = sementes/ha × PMS (g) / 1.000.000 (mil sementes × 1000g)
  const kgPorHa = (sementesPorHa * pms) / 1_000_000;

  return {
    sementesPorHa,
    sementesPorMetroLinear: Math.round(sementesPorMetro * 100) / 100,
    kgPorHa: Math.round(kgPorHa * 100) / 100,
  };
}

/** Populações de referência por cultura (plantas/ha) */
export const POPULACAO_POR_CULTURA = [
  { cultura: "Soja", populacao: 300_000, espacamentoCm: 50, pmsG: 165 },
  { cultura: "Milho", populacao: 65_000, espacamentoCm: 80, pmsG: 320 },
  { cultura: "Trigo", populacao: 3_300_000, espacamentoCm: 17, pmsG: 38 },
  { cultura: "Algodão", populacao: 90_000, espacamentoCm: 90, pmsG: 110 },
  { cultura: "Feijão", populacao: 240_000, espacamentoCm: 50, pmsG: 250 },
  { cultura: "Arroz", populacao: 2_500_000, espacamentoCm: 17, pmsG: 28 },
  { cultura: "Sorgo", populacao: 180_000, espacamentoCm: 50, pmsG: 28 },
] as const;
