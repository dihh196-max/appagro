"use client";

import { useMemo, useState } from "react";
import {
  calcularDensidade,
  POPULACAO_POR_CULTURA,
  type DensidadeResult,
} from "@/lib/calculadoras/densidade";
import { CalcShell, Field, NumInput, ResultCard } from "@/components/calc/calc-shell";

export default function DensidadePage() {
  const [pop, setPop] = useState("");
  const [esp, setEsp] = useState("0.5");
  const [germ, setGerm] = useState("85");
  const [pms, setPms] = useState("");
  const [sobr, setSobr] = useState("90");

  const aplicarCultura = (cultura: string) => {
    const c = POPULACAO_POR_CULTURA.find((x) => x.cultura === cultura);
    if (c) {
      setPop(String(c.populacao));
      setEsp(String(c.espacamentoCm / 100));
      setPms(String(c.pmsG));
    }
  };

  const resultado: DensidadeResult | { erro: string } | null = useMemo(() => {
    if (!pop || !esp || !germ || !pms || !sobr) return null;
    try {
      return calcularDensidade({
        populacaoPorHa: Number(pop),
        espacamentoLinhasM: Number(esp),
        germinacaoPct: Number(germ),
        pms: Number(pms),
        sobrevivenciaPct: Number(sobr),
      });
    } catch (e) {
      return { erro: (e as Error).message };
    }
  }, [pop, esp, germ, pms, sobr]);

  return (
    <CalcShell
      title="Densidade de Sementes"
      subtitle="Quantidade de sementes por hectare"
    >
      <Field label="Preset por cultura">
        <select
          onChange={(e) => aplicarCultura(e.target.value)}
          defaultValue=""
          className="w-full rounded-lg border border-brand-200 px-3 py-2 text-sm focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-200"
        >
          <option value="">— Escolher cultura —</option>
          {POPULACAO_POR_CULTURA.map((c) => (
            <option key={c.cultura} value={c.cultura}>
              {c.cultura} ({c.populacao.toLocaleString("pt-BR")} pl/ha)
            </option>
          ))}
        </select>
      </Field>

      <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Field label="População desejada" hint="plantas por hectare">
          <NumInput value={pop} onChange={(e) => setPop(e.target.value)} suffix="pl/ha" />
        </Field>

        <Field label="Espaçamento entre linhas">
          <NumInput value={esp} onChange={(e) => setEsp(e.target.value)} suffix="m" />
        </Field>

        <Field label="Germinação esperada">
          <NumInput value={germ} onChange={(e) => setGerm(e.target.value)} suffix="%" />
        </Field>

        <Field label="Sobrevivência em campo">
          <NumInput value={sobr} onChange={(e) => setSobr(e.target.value)} suffix="%" />
        </Field>

        <Field label="Peso de Mil Sementes (PMS)" hint="g — vem no saco">
          <NumInput value={pms} onChange={(e) => setPms(e.target.value)} suffix="g" />
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
              {resultado.kgPorHa.toFixed(2)}{" "}
              <span className="text-base font-normal">kg/ha de sementes</span>
            </>
          }
        >
          <div className="mt-4 grid grid-cols-2 gap-4 text-sm">
            <div>
              <div className="text-xs uppercase text-brand-700">Sementes/ha</div>
              <div className="font-semibold text-brand-800">
                {resultado.sementesPorHa.toLocaleString("pt-BR")}
              </div>
            </div>
            <div>
              <div className="text-xs uppercase text-brand-700">Sementes/m linear</div>
              <div className="font-semibold text-brand-800">
                {resultado.sementesPorMetroLinear}
              </div>
            </div>
          </div>
        </ResultCard>
      )}
    </CalcShell>
  );
}
