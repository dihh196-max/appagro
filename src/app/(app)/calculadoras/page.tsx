import { ListRow, PageHeader, SectionLabel } from "@/components/page-header";

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
    <>
      <PageHeader
        title="Calculadora Agrícola"
        subtitle="Cálculos essenciais para o campo"
      />

      <div className="px-5 space-y-2.5">
        {PRINCIPAIS.map((item) => (
          <ListRow
            key={item.slug}
            href={`/calculadoras/${item.slug}`}
            icon={item.icon}
            iconBg={item.bg}
            title={item.title}
            subtitle={item.desc}
          />
        ))}
      </div>

      <div className="px-5">
        <SectionLabel>FERRAMENTAS ESPECIALIZADAS</SectionLabel>

        <div className="space-y-2.5">
          {ESPECIALIZADAS.map((item) => (
            <ListRow
              key={item.slug}
              href={`/calculadoras/${item.slug}`}
              icon={item.icon}
              iconBg={item.bg}
              title={item.title}
              subtitle={item.desc}
            />
          ))}
        </div>
      </div>
    </>
  );
}
