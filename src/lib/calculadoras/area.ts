/**
 * Conversor de Área — unidades agrárias brasileiras
 *
 * Todas as conversões usam metro quadrado como unidade canônica.
 */

export type UnidadeArea =
  | "m2"
  | "ha"
  | "km2"
  | "acre"
  | "alqueire_paulista"
  | "alqueire_mineiro"
  | "alqueire_norte" // Pará/AM
  | "alqueire_goiano"
  | "tarefa_nordeste"
  | "tarefa_bahia"
  | "quadra_gaucha"
  | "colonia_gaucha";

/** Quantos m² em 1 unidade */
const M2_POR_UNIDADE: Record<UnidadeArea, number> = {
  m2: 1,
  ha: 10_000,
  km2: 1_000_000,
  acre: 4046.8564224,
  alqueire_paulista: 24_200, // 2,42 ha
  alqueire_mineiro: 48_400, // 4,84 ha (mesmo de "alqueirão")
  alqueire_norte: 27_225, // PA, AM
  alqueire_goiano: 48_400, // GO, MT — varia regionalmente
  tarefa_nordeste: 3_025, // 1 tarefa = 30 braças × 30 braças (~3.025 m²)
  tarefa_bahia: 4_356,
  quadra_gaucha: 17_424, // 1 quadra = 87,12m × 200m = 17.424 m²
  colonia_gaucha: 250_000, // 25 ha
};

export const ROTULOS: Record<UnidadeArea, string> = {
  m2: "Metro² (m²)",
  ha: "Hectare (ha)",
  km2: "Quilômetro² (km²)",
  acre: "Acre",
  alqueire_paulista: "Alqueire paulista (SP)",
  alqueire_mineiro: "Alqueire mineiro / alqueirão (MG, RJ, GO)",
  alqueire_norte: "Alqueire do Norte (PA, AM)",
  alqueire_goiano: "Alqueire goiano (GO, MT)",
  tarefa_nordeste: "Tarefa (Nordeste — geral)",
  tarefa_bahia: "Tarefa baiana (BA)",
  quadra_gaucha: "Quadra (RS, SC)",
  colonia_gaucha: "Colônia (RS — colonização alemã/italiana)",
};

export function converterArea(valor: number, de: UnidadeArea, para: UnidadeArea): number {
  if (valor < 0) throw new Error("Valor não pode ser negativo.");
  const m2 = valor * M2_POR_UNIDADE[de];
  return m2 / M2_POR_UNIDADE[para];
}

/** Converte para todas as unidades de uma vez (útil pra UI). */
export function converterParaTodas(
  valor: number,
  de: UnidadeArea
): Record<UnidadeArea, number> {
  const m2 = valor * M2_POR_UNIDADE[de];
  const resultado = {} as Record<UnidadeArea, number>;
  (Object.keys(M2_POR_UNIDADE) as UnidadeArea[]).forEach((u) => {
    resultado[u] = m2 / M2_POR_UNIDADE[u];
  });
  return resultado;
}
