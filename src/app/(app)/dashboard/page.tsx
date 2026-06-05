import { PageHeader } from "@/components/page-header";

export const metadata = { title: "Dashboard" };

const KPIS = [
  { label: "Preço Soja",  value: "R$ 162,40", suffix: "/sc", delta: "+2,8%", positive: true,  icon: "↗" },
  { label: "Preço Milho", value: "R$ 85,20",  suffix: "/sc", delta: "+3,5%", positive: true,  icon: "↗" },
  { label: "Dólar",       value: "R$ 5,18",                  delta: "-0,4%", positive: false, icon: "$" },
  { label: "Umid. Solo",  value: "68%",                      delta: "Ideal",  positive: true,  icon: "💧" },
];

const ALERTAS = [
  { type: "info" as const,    icon: "🌧️", msg: "Chuva prevista para os próximos 3 dias — avaliar janela de pulverização" },
  { type: "success" as const, icon: "📈", msg: "Preço da soja em alta — considerar venda antecipada da safra" },
  { type: "warn" as const,    icon: "🌡️", msg: "Temperatura elevada — monitorar estresse hídrico na lavoura" },
];

export default function DashboardPage() {
  return (
    <>
      <PageHeader title="Dashboard" subtitle="Indicadores em tempo real" back="/dashboard" />

      <div className="px-5 pb-6">
        {/* KPIs em grid 2x2 */}
        <section className="grid grid-cols-2 gap-2.5 mb-6">
          {KPIS.map((k) => (
            <div key={k.label} className="rounded-2xl border border-black/5 bg-white p-4">
              <div className="flex items-center justify-between text-xs text-muted">
                <span>{k.label}</span>
                <span>{k.icon}</span>
              </div>
              <div className="mt-1 text-xl font-bold text-brand-900">
                {k.value}
                {k.suffix && <span className="text-xs font-normal text-muted">{k.suffix}</span>}
              </div>
              <div className={`mt-0.5 text-xs font-medium ${k.positive ? "text-brand-700" : "text-red-600"}`}>
                {k.delta}
              </div>
            </div>
          ))}
        </section>

        {/* Alertas ativos */}
        <h2 className="text-sm font-semibold mb-2 flex items-center gap-1.5 text-brand-900">
          <span>⚡</span> Alertas Ativos
        </h2>
        <div className="space-y-2 mb-6">
          {ALERTAS.map((a, i) => (
            <div
              key={i}
              className={`rounded-xl border px-3 py-2.5 text-sm flex items-start gap-2 ${
                a.type === "info"
                  ? "border-blue-200 bg-blue-50 text-blue-900"
                  : a.type === "warn"
                  ? "border-amber-200 bg-amber-50 text-amber-900"
                  : "border-emerald-200 bg-emerald-50 text-emerald-900"
              }`}
            >
              <span className="shrink-0">{a.icon}</span>
              <span>{a.msg}</span>
            </div>
          ))}
        </div>

        {/* Placeholders de gráficos */}
        <div className="space-y-3">
          <ChartCard title="📊 Produtividade (sc/ha)" />
          <ChartCard title="💹 Cotação (R$/sc)" />
        </div>
      </div>
    </>
  );
}

function ChartCard({ title }: { title: string }) {
  return (
    <div className="rounded-2xl border border-black/5 bg-white p-4">
      <h3 className="font-semibold text-sm text-brand-900 mb-3">{title}</h3>
      <div className="h-32 flex items-center justify-center text-muted text-xs border border-dashed border-brand-200 rounded-lg">
        Gráfico — em breve
      </div>
    </div>
  );
}
