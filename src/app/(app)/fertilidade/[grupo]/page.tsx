import Link from "next/link";
import { notFound } from "next/navigation";
import { buscarGrupo, listarPorGrupo, type GrupoNutriente } from "@/content/nutrientes";
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

type Props = { params: Promise<{ grupo: string }> };

export async function generateMetadata({ params }: Props) {
  const { grupo } = await params;
  const g = buscarGrupo(grupo);
  return { title: g?.titulo ?? "Grupo" };
}

export default async function GrupoPage({ params }: Props) {
  const { grupo } = await params;
  const g = buscarGrupo(grupo);
  if (!g) notFound();

  const nutrientes = listarPorGrupo(g.slug as GrupoNutriente);

  return (
    <>
      <PageHeader title={g.titulo} subtitle={g.subtitulo} back="/fertilidade" />

      <div className="px-5 grid grid-cols-2 gap-2.5">
        {nutrientes.map((n) => (
          <Link
            key={n.slug}
            href={`/fertilidade/${g.slug}/${n.slug}`}
            className="p-4 rounded-2xl border border-black/5 bg-white hover:border-brand-200 hover:shadow-sm transition"
          >
            <div className={`text-3xl font-bold ${COR_TEXTO[n.cor]}`}>{n.simbolo}</div>
            <div className="mt-1 font-semibold text-brand-900 text-sm">{n.nome}</div>
            {n.mobilidade && (
              <span className="mt-2 inline-block rounded-full bg-brand-50 px-2 py-0.5 text-[10px] text-brand-700">
                {n.mobilidade}
              </span>
            )}
          </Link>
        ))}
      </div>
    </>
  );
}
