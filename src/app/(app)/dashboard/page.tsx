export const metadata = { title: "Dashboard" };

const KPIS = [
  { label: "Preço Soja", value: "R$ 162,40", suffix: "/sc", delta: "+2,8%", positive: true, icon: "🌱" },
  { label: "Preço Milho", value: "R$ 85,20", suffix: "/sc", delta: "+3,5%", positive: true, icon: "🌽" },
  { label: "Dólar", value: "R$ 5,18", delta: "-0,4%", positive: false, icon: "💵" },
  { label: "Umid. Solo", value: "68%", delta: "Ideal", positive: true, icon: "💧" },
];

const ALERTAS = [
  { type: "info" as const, icon: "🌧️", msg: "Chuva prevista para os próximos 3 dias — avaliar janela de pulverização" },
  { type: "success" as const, icon: "📈", msg: "Preço da soja em alta — considerar venda antecipada da safra" },
  { type: "warn" as const, icon: "🌡️", msg: "Temperatura elevada — monitorar estresse hídrico na lavoura" },
];

export default function DashboardPage() {
  return (
    <div className="px-8 py-8 max-w-6xl mx-auto">
      <header className="mb-8">
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <p className="text-sm text-foreground/60">Indicadores em tempo real</p>
      </header>

      {/* KPIs */}
      <section className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
        {KPIS.map((k) => (
          <div key={k.label} className="rounded-xl border border-brand-100 bg-white p-5">
            <div className="flex items-center justify-between text-sm text-foreground/60">
              <span>{k.label}</span>
              <span>{k.icon}</span>
            </div>
            <div className="mt-2 text-2xl font-bold">
              {k.value}
              {k.suffix && <span className="text-base font-normal text-foreground/60">{k.suffix}</span>}
            </div>
            <div className={`mt-1 text-xs font-medium ${k.positive ? "text-brand-700" : "text-red-600"}`}>
              {k.delta}
            </div>
          </div>
        ))}
      </section>

      {/* Alertas */}
      <section className="mb-10">
        <h2 className="text-lg font-semibold mb-3 flex items-center gap-2">
          ⚡ <span>Alertas Ativos</span>
        </h2>
        <div className="space-y-2">
          {ALERTAS.map((a, i) => (
            <div
              key={i}
              className={`rounded-lg border px-4 py-3 text-sm flex items-start gap-3 ${
                a.type === "info"
                  ? "border-blue-200 bg-blue-50 text-blue-900"
                  : a.type === "warn"
                  ? "border-amber-200 bg-amber-50 text-amber-900"
                  : "border-emerald-200 bg-emerald-50 text-emerald-900"
              }`}
            >
              <span className="text-lg shrink-0">{a.icon}</span>
              <span>{a.msg}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Placeholder gráficos */}
      <section className="grid lg:grid-cols-2 gap-4">
        <div className="rounded-xl border border-brand-100 bg-white p-6">
          <h3 className="font-semibold mb-1">📊 Produtividade (sc/ha)</h3>
          <p className="text-xs text-foreground/60 mb-4">Últimos 6 meses</p>
          <div className="h-48 flex items-center justify-center text-foreground/40 border border-dashed border-brand-200 rounded-lg">
            Gráfico — em breve
          </div>
        </div>
        <div className="rounded-xl border border-brand-100 bg-white p-6">
          <h3 className="font-semibold mb-1">💹 Cotação (R$/sc)</h3>
          <p className="text-xs text-foreground/60 mb-4">Tendência semanal</p>
          <div className="h-48 flex items-center justify-center text-foreground/40 border border-dashed border-brand-200 rounded-lg">
            Gráfico — em breve
          </div>
        </div>
      </section>
    </div>
  );
}
