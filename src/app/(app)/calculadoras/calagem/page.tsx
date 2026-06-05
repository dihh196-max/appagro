"use client";

import { useMemo, useState } from "react";
import {
  calcularCalagem,
  V2_POR_CULTURA,
  type CalagemResult,
} from "@/lib/calculadoras/calagem";
import { CalcShell, Field, NumInput, ResultCard } from "@/components/calc/calc-shell";

export default function CalagemPage() {
  const [ctc, setCtc] = useState(""); // cmolc/dm³
  const [v1, setV1] = useState("");
  const [v2, setV2] = useState("70");
  const [prnt, setPrnt] = useState("85");
  const [prof, setProf] = useState("20");

  const resultado: CalagemResult | { erro: string } | null = useMemo(() => {
    const nums = [ctc, v1, v2, prnt, prof].map(Number);
    if (nums.some((n) => !Number.isFinite(n) || (n === 0 && ![1].includes(nums.indexOf(n))))) {
      // permitir v1 = 0
    }
    if (!ctc || !v1 || !v2 || !prnt || !prof) return null;
    try {
      return calcularCalagem({
        ctc: Number(ctc),
        v1: Number(v1),
        v2: Number(v2),
        prnt: Number(prnt),
        profundidadeCm: Number(prof),
      });
    } catch (e) {
      return { erro: (e as Error).message };
    }
  }, [ctc, v1, v2, prnt, prof]);

  return (
    <CalcShell
      title="Calagem"
      subtitle="Necessidade de calcário pelo método da saturação por bases"
    >
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Field label="CTC do solo a pH 7" hint="cmolc/dm³ — do laudo de solo">
          <NumInput value={ctc} onChange={(e) => setCtc(e.target.value)} suffix="cmolc/dm³" />
        </Field>

        <Field label="Saturação por bases atual (V₁)" hint="% — do laudo de solo">
          <NumInput value={v1} onChange={(e) => setV1(e.target.value)} suffix="%" />
        </Field>

        <Field label="Saturação desejada (V₂)" hint="depende da cultura">
          <div className="flex gap-2">
            <NumInput
              value={v2}
              onChange={(e) => setV2(e.target.value)}
              suffix="%"
              className="flex-1"
            />
            <select
              value={v2}
              onChange={(e) => setV2(e.target.value)}
              className="rounded-lg border border-brand-200 px-2 text-sm focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-200"
            >
              {V2_POR_CULTURA.map((c) => (
                <option key={c.cultura} value={c.v2}>
                  {c.cultura} ({c.v2}%)
                </option>
              ))}
            </select>
          </div>
        </Field>

        <Field label="PRNT do calcário" hint="vem do fornecedor">
          <NumInput value={prnt} onChange={(e) => setPrnt(e.target.value)} suffix="%" />
        </Field>

        <Field label="Profundidade de incorporação" hint="padrão 20 cm">
          <NumInput value={prof} onChange={(e) => setProf(e.target.value)} suffix="cm" />
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
              {resultado.ncTonHa.toFixed(2)}{" "}
              <span className="text-base font-normal">t/ha de calcário</span>
            </>
          }
        >
          <p className="mt-2 text-sm text-brand-800">
            ({resultado.ncKgHa.toLocaleString("pt-BR")} kg/ha)
          </p>
          <p className="mt-3 text-sm text-foreground/70">{resultado.observacao}</p>
        </ResultCard>
      )}
    </CalcShell>
  );
}
