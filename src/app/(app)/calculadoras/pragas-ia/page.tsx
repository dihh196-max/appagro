import { CalcShell } from "@/components/calc/calc-shell";

export const metadata = { title: "Identificar Pragas com IA" };

export default function PragasIaStub() {
  return (
    <CalcShell title="Identificar Pragas com IA" subtitle="Fotografe e receba diagnóstico">
      <div className="rounded-2xl border-2 border-dashed border-brand-200 bg-brand-50/40 p-10 text-center">
        <div className="text-5xl mb-4">🐛</div>
        <h2 className="text-lg font-semibold text-brand-800">Em breve</h2>
        <p className="mt-2 text-sm text-foreground/70 max-w-md mx-auto">
          Upload de foto + identificação via modelo de visão (Claude Sonnet Vision /
          equivalente). Logs e cota por organização.
        </p>
      </div>
    </CalcShell>
  );
}
