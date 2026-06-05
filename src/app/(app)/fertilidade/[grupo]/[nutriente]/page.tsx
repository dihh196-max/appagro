import Link from "next/link";
import { notFound } from "next/navigation";
import { buscarGrupo, buscarNutriente } from "@/content/nutrientes";

const COR_TEXTO: Record<string, string> = {
  emerald: "text-emerald-600",
  blue: "text-blue-600",
  purple: "text-purple-600",
  orange: "text-orange-600",
  amber: "text-amber-600",
  pink: "text-pink-600",
  sky: "text-sky-600",
  rose: "text-rose-600",
};

type Props = { params: Promise<{ grupo: string; nutriente: string }> };

export async function generateMetadata({ params }: Props) {
  const { grupo, nutriente } = await params;
  const n = buscarNutriente(grupo, nutriente);
  return { title: n ? `${n.nome} (${n.simbolo})` : "Nutriente" };
}

export default async function NutrientePage({ params }: Props) {
  const { grupo, nutriente } = await params;
  const n = buscarNutriente(grupo, nutriente);
  const g = buscarGrupo(grupo);
  if (!n || !g) notFound();

  return (
    <div className="px-6 md:px-8 py-8 max-w-3xl mx-auto">
      <header className="mb-6">
        <Link
          href={`/fertilidade/${g.slug}`}
          className="text-sm text-brand-700 hover:underline"
        >
          ← {g.titulo}
        </Link>
        <div className="mt-3 flex items-baseline gap-4">
          <span className={`text-5xl font-bold ${COR_TEXTO[n.cor]}`}>{n.simbolo}</span>
          <h1 className="text-3xl font-bold">{n.nome}</h1>
        </div>
        {n.mobilidade && (
          <span className="mt-3 inline-block rounded-full bg-brand-50 px-3 py-1 text-xs font-medium text-brand-700">
            {n.mobilidade} na planta
          </span>
        )}
      </header>

      <Section title="Papel na planta">
        <p className="text-foreground/80 leading-relaxed">{n.papel}</p>
      </Section>

      <Section title="Sintomas de deficiência" icon="⚠️">
        <ul className="space-y-2">
          {n.deficiencia.map((s, i) => (
            <li key={i} className="flex gap-2 text-sm text-foreground/80">
              <span className="text-amber-600">•</span>
              <span>{s}</span>
            </li>
          ))}
        </ul>
      </Section>

      <Section title="Sintomas de excesso" icon="⛔">
        <ul className="space-y-2">
          {n.excesso.map((s, i) => (
            <li key={i} className="flex gap-2 text-sm text-foreground/80">
              <span className="text-red-600">•</span>
              <span>{s}</span>
            </li>
          ))}
        </ul>
      </Section>

      <Section title="Fontes" icon="💼">
        <div className="grid sm:grid-cols-2 gap-2">
          {n.fontes.map((f, i) => (
            <div key={i} className="rounded-lg border border-brand-100 bg-white p-3 text-sm">
              <div className="font-medium">{f.nome}</div>
              <div className="text-xs text-brand-700">{f.teor}</div>
            </div>
          ))}
        </div>
      </Section>

      {n.faixa && (
        <Section title="Faixa adequada" icon="📏">
          <ul className="space-y-1">
            {n.faixa.map((f, i) => (
              <li key={i} className="text-sm text-foreground/80">
                <span className="font-medium uppercase text-brand-700 mr-2">{f.tipo}:</span>
                {f.valor}
              </li>
            ))}
          </ul>
        </Section>
      )}
    </div>
  );
}

function Section({
  title,
  icon,
  children,
}: {
  title: string;
  icon?: string;
  children: React.ReactNode;
}) {
  return (
    <section className="mt-6 rounded-2xl border border-brand-100 bg-white p-5">
      <h2 className="text-sm font-semibold uppercase tracking-wide text-brand-700 mb-3">
        {icon && <span className="mr-2">{icon}</span>}
        {title}
      </h2>
      {children}
    </section>
  );
}
