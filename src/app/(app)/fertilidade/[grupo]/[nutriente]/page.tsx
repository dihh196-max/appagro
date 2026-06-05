import { notFound } from "next/navigation";
import { buscarGrupo, buscarNutriente } from "@/content/nutrientes";
import { PageHeader } from "@/components/page-header";

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
    <>
      <PageHeader
        title={`${n.simbolo} · ${n.nome}`}
        subtitle={g.titulo}
        back={`/fertilidade/${g.slug}`}
      />

      <div className="px-5 pb-6 space-y-4">
        {n.mobilidade && (
          <span className="inline-block rounded-full bg-brand-50 px-3 py-1 text-xs font-medium text-brand-700">
            {n.mobilidade} na planta
          </span>
        )}

        <div className={`text-7xl font-bold ${COR_TEXTO[n.cor]} text-center py-4`}>
          {n.simbolo}
        </div>

        <Section title="Papel na planta">
          <p className="text-foreground/80 leading-relaxed text-sm">{n.papel}</p>
        </Section>

        <Section title="Sintomas de deficiência" icon="⚠️">
          <ul className="space-y-1.5">
            {n.deficiencia.map((s, i) => (
              <li key={i} className="flex gap-2 text-sm text-foreground/80">
                <span className="text-amber-600">•</span>
                <span>{s}</span>
              </li>
            ))}
          </ul>
        </Section>

        <Section title="Sintomas de excesso" icon="⛔">
          <ul className="space-y-1.5">
            {n.excesso.map((s, i) => (
              <li key={i} className="flex gap-2 text-sm text-foreground/80">
                <span className="text-red-600">•</span>
                <span>{s}</span>
              </li>
            ))}
          </ul>
        </Section>

        <Section title="Fontes" icon="💼">
          <div className="grid grid-cols-1 gap-2">
            {n.fontes.map((f, i) => (
              <div
                key={i}
                className="rounded-xl border border-black/5 bg-white p-3 text-sm flex items-baseline justify-between gap-3"
              >
                <span className="font-medium text-brand-900">{f.nome}</span>
                <span className="text-xs text-brand-700 shrink-0">{f.teor}</span>
              </div>
            ))}
          </div>
        </Section>

        {n.faixa && (
          <Section title="Faixa adequada" icon="📏">
            <ul className="space-y-1">
              {n.faixa.map((f, i) => (
                <li key={i} className="text-sm text-foreground/80">
                  <span className="font-medium uppercase text-brand-700 mr-2">
                    {f.tipo}:
                  </span>
                  {f.valor}
                </li>
              ))}
            </ul>
          </Section>
        )}
      </div>
    </>
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
    <section className="rounded-2xl border border-black/5 bg-white p-5">
      <h2 className="text-[11px] font-semibold uppercase tracking-[0.12em] text-brand-800/70 mb-3">
        {icon && <span className="mr-2">{icon}</span>}
        {title}
      </h2>
      {children}
    </section>
  );
}
