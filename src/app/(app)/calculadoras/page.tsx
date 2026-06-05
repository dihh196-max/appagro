import Link from "next/link";

export const metadata = { title: "Calculadora Agrícola" };

type Item = {
  slug: string;
  title: string;
  desc: string;
  icon: string;
  bg: string;
};

const PRINCIPAIS: Item[] = [
  { slug: "calagem",   title: "Calagem",              desc: "Necessidade de calcário",            icon: "🏔️", bg: "bg-orange-500" },
  { slug: "gessagem",  title: "Gessagem",             desc: "Necessidade de gesso agrícola",      icon: "💧", bg: "bg-blue-500" },
  { slug: "npk",       title: "Adubação NPK",         desc: "Quantidade de adubo por formulação", icon: "🧪", bg: "bg-emerald-600" },
  { slug: "densidade", title: "Densidade de Sementes", desc: "Quantidade de sementes por hectare", icon: "🌱", bg: "bg-purple-500" },
  { slug: "area",      title: "Área e Conversões",     desc: "Conversão de unidades agrárias",     icon: "📐", bg: "bg-rose-500" },
];

const ESPECIALIZADAS: Item[] = [
  { slug: "irrigacao",   title: "Calculadora de Irrigação", desc: "Necessidade hídrica por cultura", icon: "💦", bg: "bg-sky-500" },
  { slug: "pragas-ia",   title: "Identificar Pragas com IA", desc: "Fotografe e receba diagnóstico",  icon: "🐛", bg: "bg-red-500" },
  { slug: "calendario",  title: "Calendário Agrícola",      desc: "Planejar semeadura e adubação",   icon: "📅", bg: "bg-pink-500" },
];

export default function CalculadoraPage() {
  return (
    <div className="px-6 md:px-8 py-8 max-w-3xl mx-auto">
      <header className="mb-6">
        <h1 className="text-3xl font-bold">Calculadora Agrícola</h1>
        <p className="text-sm text-brand-600">Cálculos essenciais para o campo</p>
      </header>

      <div className="space-y-3">
        {PRINCIPAIS.map((item) => (
          <CalcRow key={item.slug} item={item} />
        ))}
      </div>

      <h2 className="mt-10 mb-3 text-xs font-semibold tracking-widest text-brand-700/70">
        FERRAMENTAS ESPECIALIZADAS
      </h2>

      <div className="space-y-3">
        {ESPECIALIZADAS.map((item) => (
          <CalcRow key={item.slug} item={item} />
        ))}
      </div>
    </div>
  );
}

function CalcRow({ item }: { item: Item }) {
  return (
    <Link
      href={`/calculadoras/${item.slug}`}
      className="flex items-center gap-4 p-4 rounded-2xl border border-brand-100 bg-white hover:shadow-md hover:border-brand-200 transition"
    >
      <span
        className={`inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-xl text-2xl text-white ${item.bg}`}
      >
        {item.icon}
      </span>
      <span className="min-w-0 flex-1">
        <span className="block font-semibold text-foreground">{item.title}</span>
        <span className="block text-sm text-foreground/60 truncate">{item.desc}</span>
      </span>
      <span className="text-foreground/40">›</span>
    </Link>
  );
}
