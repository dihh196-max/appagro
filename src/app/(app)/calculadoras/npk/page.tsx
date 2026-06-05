"use client";

import { useMemo, useState } from "react";
import {
  calcularAdubacao,
  calcularNutrientesPorAdubo,
  FORMULACOES_COMUNS,
} from "@/lib/calculadoras/npk";
import { CalcShell, Field, NumInput, ResultCard } from "@/components/calc/calc-shell";

export default function NpkPage() {
  const [modo, setModo] = useState<"direto" | "inverso">("direto");
  const [n, setN] = useState("20");
  const [p, setP] = useState("5");
  const [k, setK] = useState("20");

  // direto
  const [qtd, setQtd] = useState("");

  // inverso
  const [necN, setNecN] = useState("");
  const [necP, setNecP] = useState("");
  const [necK, setNecK] = useState("");

  const resultadoDireto = useMemo(() => {
    if (modo !== "direto" || !qtd) return null;
    try {
      return calcularNutrientesPorAdubo(
        { n: Number(n), p: Number(p), k: Number(k) },
        Number(qtd)
      );
    } catch (e) {
      return { erro: (e as Error).message };
    }
  }, [modo, n, p, k, qtd]);

  const resultadoInverso = useMemo(() => {
    if (modo !== "inverso" || (!necN && !necP && !necK)) return null;
    try {
      return calcularAdubacao(
        { n: Number(n), p: Number(p), k: Number(k) },
        { n: Number(necN || 0), p: Number(necP || 0), k: Number(necK || 0) }
      );
    } catch (e) {
      return { erro: (e as Error).message };
    }
  }, [modo, n, p, k, necN, necP, necK]);

  return (
    <CalcShell title="Adubação NPK" subtitle="Quantidade de adubo por formulação">
      <div className="mb-4 inline-flex rounded-lg border border-brand-200 p-1 bg-brand-50">
        {(["direto", "inverso"] as const).map((m) => (
          <button
            key={m}
            type="button"
            onClick={() => setModo(m)}
            className={`px-4 py-1.5 text-sm font-medium rounded-md transition ${
              modo === m ? "bg-white shadow-sm" : "text-brand-700"
            }`}
          >
            {m === "direto" ? "Adubo → Nutrientes" : "Nutrientes → Adubo"}
          </button>
        ))}
      </div>

      <p className="text-xs text-foreground/60 mb-4">
        {modo === "direto"
          ? "Informe a formulação e a quantidade aplicada para ver os nutrientes entregues."
          : "Informe a necessidade da cultura e a formulação para descobrir quanto aplicar."}
      </p>

      <Field label="Formulação NPK">
        <div className="flex gap-2">
          <NumInput value={n} onChange={(e) => setN(e.target.value)} suffix="%N" className="flex-1" />
          <NumInput value={p} onChange={(e) => setP(e.target.value)} suffix="%P₂O₅" className="flex-1" />
          <NumInput value={k} onChange={(e) => setK(e.target.value)} suffix="%K₂O" className="flex-1" />
        </div>
        <select
          onChange={(e) => {
            const f = FORMULACOES_COMUNS.find((x) => x.rotulo === e.target.value);
            if (f) { setN(String(f.formula.n)); setP(String(f.formula.p)); setK(String(f.formula.k)); }
          }}
          className="mt-2 w-full rounded-lg border border-brand-200 px-3 py-2 text-sm focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-200"
          defaultValue=""
        >
          <option value="">— Escolher formulação comercial —</option>
          {FORMULACOES_COMUNS.map((f) => (
            <option key={f.rotulo} value={f.rotulo}>{f.rotulo}</option>
          ))}
        </select>
      </Field>

      {modo === "direto" ? (
        <Field label="Quantidade aplicada" hint="kg de adubo por hectare">
          <NumInput value={qtd} onChange={(e) => setQtd(e.target.value)} suffix="kg/ha" />
        </Field>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <Field label="N necessário"><NumInput value={necN} onChange={(e) => setNecN(e.target.value)} suffix="kg/ha" /></Field>
          <Field label="P₂O₅ necessário"><NumInput value={necP} onChange={(e) => setNecP(e.target.value)} suffix="kg/ha" /></Field>
          <Field label="K₂O necessário"><NumInput value={necK} onChange={(e) => setNecK(e.target.value)} suffix="kg/ha" /></Field>
        </div>
      )}

      {resultadoDireto && "erro" in resultadoDireto && (
        <div className="mt-4 rounded-lg border border-red-200 bg-red-50 p-4 text-sm text-red-800">
          {resultadoDireto.erro}
        </div>
      )}

      {resultadoDireto && !("erro" in resultadoDireto) && (
        <ResultCard>
          <div className="grid grid-cols-3 gap-4 text-center">
            {[
              { l: "N", v: resultadoDireto.n },
              { l: "P₂O₅", v: resultadoDireto.p },
              { l: "K₂O", v: resultadoDireto.k },
            ].map((nut) => (
              <div key={nut.l}>
                <div className="text-xs uppercase text-brand-700">{nut.l}</div>
                <div className="text-2xl font-bold text-brand-800">{nut.v}</div>
                <div className="text-xs text-foreground/60">kg/ha</div>
              </div>
            ))}
          </div>
        </ResultCard>
      )}

      {resultadoInverso && "erro" in resultadoInverso && (
        <div className="mt-4 rounded-lg border border-red-200 bg-red-50 p-4 text-sm text-red-800">
          {resultadoInverso.erro}
        </div>
      )}

      {resultadoInverso && !("erro" in resultadoInverso) && (
        <ResultCard
          highlight={
            <>
              {resultadoInverso.qtdKgHa.toLocaleString("pt-BR")}{" "}
              <span className="text-base font-normal">kg/ha do adubo</span>
            </>
          }
        >
          <p className="mt-2 text-sm text-brand-800">
            Limitado pelo nutriente <strong>{resultadoInverso.nutrienteLimitante}</strong>.
          </p>
          <div className="mt-4 grid grid-cols-3 gap-4 text-center text-sm">
            {[
              { l: "N", e: resultadoInverso.entregue.n, d: resultadoInverso.deficit.n },
              { l: "P₂O₅", e: resultadoInverso.entregue.p, d: resultadoInverso.deficit.p },
              { l: "K₂O", e: resultadoInverso.entregue.k, d: resultadoInverso.deficit.k },
            ].map((nut) => (
              <div key={nut.l} className="rounded-lg bg-white p-2">
                <div className="text-xs uppercase text-brand-700">{nut.l}</div>
                <div className="font-semibold text-brand-800">{nut.e} kg</div>
                {nut.d > 0 && (
                  <div className="text-xs text-amber-700 mt-1">faltam {nut.d} kg</div>
                )}
              </div>
            ))}
          </div>
        </ResultCard>
      )}
    </CalcShell>
  );
}
