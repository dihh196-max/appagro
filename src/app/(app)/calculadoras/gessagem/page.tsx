"use client";

import { useMemo, useState } from "react";
import { calcularGessagem, type GessagemResult } from "@/lib/calculadoras/gessagem";
import { CalcShell, Field, NumInput, ResultCard } from "@/components/calc/calc-shell";

export default function GessagemPage() {
  const [argila, setArgila] = useState("");
  const [m, setM] = useState("");
  const [ca, setCa] = useState("");

  const resultado: GessagemResult | { erro: string } | null = useMemo(() => {
    if (!argila) return null;
    try {
      return calcularGessagem({
        argilaPct: Number(argila),
        m: m ? Number(m) : undefined,
        caPct: ca ? Number(ca) : undefined,
      });
    } catch (e) {
      return { erro: (e as Error).message };
    }
  }, [argila, m, ca]);

  return (
    <CalcShell title="Gessagem" subtitle="Necessidade de gesso agrícola (subsolo)">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Field
          label="Argila do subsolo"
          hint="% — do laudo (camada 20–40 cm)"
        >
          <NumInput
            value={argila}
            onChange={(e) => setArgila(e.target.value)}
            suffix="%"
          />
        </Field>

        <Field
          label="Saturação por Al (m%)"
          hint="opcional — se > 20%, gessagem é indicada"
        >
          <NumInput value={m} onChange={(e) => setM(e.target.value)} suffix="%" />
        </Field>

        <Field
          label="Saturação por Ca²⁺"
          hint="opcional — se < 60%, gessagem é indicada"
        >
          <NumInput value={ca} onChange={(e) => setCa(e.target.value)} suffix="%" />
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
              {resultado.ngTonHa.toFixed(2)}{" "}
              <span className="text-base font-normal">t/ha de gesso</span>
            </>
          }
        >
          <p className="mt-2 text-sm text-brand-800">
            ({resultado.ngKgHa.toLocaleString("pt-BR")} kg/ha)
          </p>
          <p className="mt-3 text-sm text-foreground/70">
            {resultado.recomendado ? "✅ " : "⚠️ "}
            {resultado.observacao}
          </p>
        </ResultCard>
      )}
    </CalcShell>
  );
}
