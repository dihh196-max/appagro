/**
 * Calculadora de Irrigação — Necessidade Hídrica
 *
 * Modelo simplificado FAO 56:
 *
 *     ETc = ET₀ × Kc        (evapotranspiração da cultura, mm/dia)
 *
 *     Lâmina líquida (mm) = (ETc − chuva_efetiva) × dias_intervalo
 *     Lâmina bruta (mm)   = Lâmina líquida / eficiência_sistema
 *
 *     Volume (m³/ha) = Lâmina bruta (mm) × 10           (1 mm em 1 ha = 10 m³)
 *     Tempo (h)      = Volume / vazão_setor (m³/h)
 *
 * Kc varia por estágio fenológico — usamos média ponderada na UI.
 */

export type IrrigacaoInput = {
  /** ET₀ - Evapotranspiração de referência (mm/dia) — varia por região/estação */
  et0: number;
  /** Coeficiente da cultura (Kc) — depende da cultura e fase */
  kc: number;
  /** Chuva efetiva no período (mm/dia) */
  chuvaMmDia: number;
  /** Eficiência do sistema de irrigação (decimal, ex.: 0.85 = 85%) */
  eficiencia: number;
  /** Dias entre irrigações */
  intervaloDias: number;
  /** Área irrigada em hectares */
  areaHa: number;
  /** (opcional) Vazão do sistema em m³/h — se informado, calcula tempo */
  vazaoM3h?: number;
};

export type IrrigacaoResult = {
  etcMmDia: number;
  laminaLiquidaMm: number;
  laminaBrutaMm: number;
  volumeM3Ha: number;
  volumeTotalM3: number;
  tempoHoras?: number;
};

export function calcularIrrigacao(input: IrrigacaoInput): IrrigacaoResult {
  const { et0, kc, chuvaMmDia, eficiencia, intervaloDias, areaHa, vazaoM3h } = input;

  if (et0 <= 0) throw new Error("ET₀ deve ser maior que zero.");
  if (kc <= 0 || kc > 1.5) throw new Error("Kc deve estar entre 0 e 1,5.");
  if (eficiencia <= 0 || eficiencia > 1)
    throw new Error("Eficiência deve estar entre 0 e 1.");
  if (intervaloDias <= 0) throw new Error("Intervalo deve ser maior que zero.");
  if (areaHa <= 0) throw new Error("Área deve ser maior que zero.");

  const etcMmDia = et0 * kc;
  const consumoLiquido = Math.max(0, etcMmDia - chuvaMmDia);
  const laminaLiquidaMm = consumoLiquido * intervaloDias;
  const laminaBrutaMm = laminaLiquidaMm / eficiencia;
  const volumeM3Ha = laminaBrutaMm * 10; // 1 mm em 1 ha = 10 m³
  const volumeTotalM3 = volumeM3Ha * areaHa;

  const result: IrrigacaoResult = {
    etcMmDia: Math.round(etcMmDia * 100) / 100,
    laminaLiquidaMm: Math.round(laminaLiquidaMm * 100) / 100,
    laminaBrutaMm: Math.round(laminaBrutaMm * 100) / 100,
    volumeM3Ha: Math.round(volumeM3Ha * 100) / 100,
    volumeTotalM3: Math.round(volumeTotalM3 * 100) / 100,
  };

  if (vazaoM3h && vazaoM3h > 0) {
    result.tempoHoras = Math.round((volumeTotalM3 / vazaoM3h) * 100) / 100;
  }

  return result;
}

/** Kc médio aproximado por cultura (FAO 56, ciclo completo) */
export const KC_POR_CULTURA = [
  { cultura: "Soja", kc: 1.0 },
  { cultura: "Milho", kc: 1.05 },
  { cultura: "Trigo", kc: 0.9 },
  { cultura: "Algodão", kc: 1.05 },
  { cultura: "Café", kc: 1.05 },
  { cultura: "Feijão", kc: 0.95 },
  { cultura: "Arroz", kc: 1.1 },
  { cultura: "Pastagem", kc: 0.85 },
  { cultura: "Tomate", kc: 1.05 },
  { cultura: "Citros", kc: 0.75 },
] as const;

/** Eficiência típica por sistema de irrigação */
export const EFICIENCIA_SISTEMA = [
  { sistema: "Gotejamento", eficiencia: 0.9 },
  { sistema: "Microaspersão", eficiencia: 0.85 },
  { sistema: "Pivô central", eficiencia: 0.85 },
  { sistema: "Aspersão convencional", eficiencia: 0.75 },
  { sistema: "Sulcos", eficiencia: 0.6 },
  { sistema: "Inundação", eficiencia: 0.5 },
] as const;
