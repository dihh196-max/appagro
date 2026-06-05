import { CalcShell } from "@/components/calc/calc-shell";

export const metadata = { title: "Calendário Agrícola" };

export default function CalendarioStub() {
  return (
    <CalcShell title="Calendário Agrícola" subtitle="Planejar semeadura e adubação">
      <div className="rounded-2xl border-2 border-dashed border-brand-200 bg-brand-50/40 p-10 text-center">
        <div className="text-5xl mb-4">📅</div>
        <h2 className="text-lg font-semibold text-brand-800">Em breve</h2>
        <p className="mt-2 text-sm text-foreground/70 max-w-md mx-auto">
          Calendário por cultura/talhão com eventos de semeadura, adubação, aplicação
          de defensivos e colheita. Integrado ao banco multi-tenant.
        </p>
      </div>
    </CalcShell>
  );
}
