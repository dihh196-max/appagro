"use client";

import { useMemo, useState } from "react";
import {
  converterParaTodas,
  ROTULOS,
  type UnidadeArea,
} from "@/lib/calculadoras/area";
import { CalcShell, Field, NumInput } from "@/components/calc/calc-shell";

const UNIDADES = Object.keys(ROTULOS) as UnidadeArea[];

export default function AreaPage() {
  const [valor, setValor] = useState("1");
  const [de, setDe] = useState<UnidadeArea>("ha");

  const resultados = useMemo(() => {
    const num = Number(valor);
    if (!Number.isFinite(num) || num < 0) return null;
    return converterParaTodas(num, de);
  }, [valor, de]);

  return (
    <CalcShell title="Área e Conversões" subtitle="Conversão de unidades agrárias">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Field label="Valor">
          <NumInput value={valor} onChange={(e) => setValor(e.target.value)} />
        </Field>
        <Field label="Unidade de origem">
          <select
            value={de}
            onChange={(e) => setDe(e.target.value as UnidadeArea)}
            className="w-full rounded-lg border border-brand-200 px-3 py-2 focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-200"
          >
            {UNIDADES.map((u) => (
              <option key={u} value={u}>
                {ROTULOS[u]}
              </option>
            ))}
          </select>
        </Field>
      </div>

      {resultados && (
        <div className="mt-6 rounded-2xl border border-brand-200 bg-white overflow-hidden">
          <table className="w-full text-sm">
            <tbody>
              {UNIDADES.filter((u) => u !== de).map((u) => (
                <tr key={u} className="border-t border-brand-100 first:border-t-0">
                  <td className="px-4 py-3 text-foreground/70">{ROTULOS[u]}</td>
                  <td className="px-4 py-3 text-right font-mono font-semibold text-brand-800">
                    {formatNumber(resultados[u])}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </CalcShell>
  );
}

function formatNumber(n: number) {
  if (n === 0) return "0";
  if (n < 0.001) return n.toExponential(3);
  if (n < 1) return n.toFixed(4);
  if (n < 100) return n.toFixed(3);
  return n.toLocaleString("pt-BR", { maximumFractionDigits: 2 });
}
