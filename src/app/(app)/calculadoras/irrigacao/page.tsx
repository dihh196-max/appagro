"use client";

import { useMemo, useState } from "react";
import {
  calcularIrrigacao,
  EFICIENCIA_SISTEMA,
  KC_POR_CULTURA,
  type IrrigacaoResult,
} from "@/lib/calculadoras/irrigacao";
import { CalcShell, Field, NumInput, ResultCard } from "@/components/calc/calc-shell";

export default function IrrigacaoPage() {
  const [et0, setEt0] = useState("5");
  const [kc, setKc] = useState("1");
  const [chuva, setChuva] = useState("0");
  const [efic, setEfic] = useState("0.85");
  const [intervalo, setIntervalo] = useState("3");
  const [area, setArea] = useState("");
  const [vazao, setVazao] = useState("");

  const resultado: IrrigacaoResult | { erro: string } | null = useMemo(() => {
    if (!et0 || !kc || !efic || !intervalo || !area) return null;
    try {
      return calcularIrrigacao({
        et0: Number(et0),
        kc: Number(kc),
        chuvaMmDia: Number(chuva || 0),
        eficiencia: Number(efic),
        intervaloDias: Number(intervalo),
        areaHa: Number(area),
        vazaoM3h: vazao ? Number(vazao) : undefined,
      });
    } catch (e) {
      return { erro: (e as Error).message };
    }
  }, [et0, kc, chuva, efic, intervalo, area, vazao]);

  return (
    <CalcShell
      title="Calculadora de Irrigação"
      subtitle="Necessidade hídrica por cultura — modelo FAO 56"
    >
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Field label="ET₀ (evapotranspiração de referência)" hint="mm/dia — da estação meteorológica">
          <NumInput value={et0} onChange={(e) => setEt0(e.target.value)} suffix="mm/dia" />
        </Field>

        <Field label="Kc — coeficiente da cultura">
          <div className="flex gap-2">
            <NumInput value={kc} onChange={(e) => setKc(e.target.value)} className="flex-1" />
            <select
              value={kc}
              onChange={(e) => setKc(e.target.value)}
              className="rounded-lg border border-brand-200 px-2 text-sm focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-200"
            >
              {KC_POR_CULTURA.map((c) => (
                <option key={c.cultura} value={c.kc}>
                  {c.cultura} ({c.kc})
                </option>
              ))}
            </select>
          </div>
        </Field>

        <Field label="Chuva efetiva" hint="mm/dia (média do período)">
          <NumInput value={chuva} onChange={(e) => setChuva(e.target.value)} suffix="mm/dia" />
        </Field>

        <Field label="Eficiência do sistema">
          <div className="flex gap-2">
            <NumInput value={efic} onChange={(e) => setEfic(e.target.value)} className="flex-1" />
            <select
              value={efic}
              onChange={(e) => setEfic(e.target.value)}
              className="rounded-lg border border-brand-200 px-2 text-sm focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-200"
            >
              {EFICIENCIA_SISTEMA.map((s) => (
                <option key={s.sistema} value={s.eficiencia}>
                  {s.sistema} ({Math.round(s.eficiencia * 100)}%)
                </option>
              ))}
            </select>
          </div>
        </Field>

        <Field label="Intervalo entre irrigações" hint="dias">
          <NumInput value={intervalo} onChange={(e) => setIntervalo(e.target.value)} suffix="dias" />
        </Field>

        <Field label="Área irrigada">
          <NumInput value={area} onChange={(e) => setArea(e.target.value)} suffix="ha" />
        </Field>

        <Field label="Vazão do sistema (opcional)" hint="m³/h — pra calcular tempo">
          <NumInput value={vazao} onChange={(e) => setVazao(e.target.value)} suffix="m³/h" />
        </Field>
      </div>

      {resultado && "erro" in resultado && (
        <div className="mt-4 rounded-lg border border-red-200 bg-red-50 p-4 text-sm text-red-800">
          {resultado.erro}
        </div>
      )}

      {resultado && !("erro" in resultado) && (
        <ResultCard
          highlight={
            <>
              {resultado.laminaBrutaMm.toFixed(1)}{" "}
              <span className="text-base font-normal">mm de lâmina bruta</span>
            </>
          }
        >
          <div className="mt-4 grid grid-cols-2 sm:grid-cols-3 gap-3 text-sm">
            <Stat label="ETc" value={`${resultado.etcMmDia} mm/dia`} />
            <Stat label="Lâmina líquida" value={`${resultado.laminaLiquidaMm} mm`} />
            <Stat label="Volume / ha" value={`${resultado.volumeM3Ha} m³`} />
            <Stat
              label="Volume total"
              value={`${resultado.volumeTotalM3.toLocaleString("pt-BR")} m³`}
            />
            {resultado.tempoHoras !== undefined && (
              <Stat label="Tempo" value={`${resultado.tempoHoras} h`} />
            )}
          </div>
        </ResultCard>
      )}
    </CalcShell>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-lg bg-white p-2">
      <div className="text-xs uppercase text-brand-700">{label}</div>
      <div className="font-semibold text-brand-800">{value}</div>
    </div>
  );
}
