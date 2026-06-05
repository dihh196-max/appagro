import Link from "next/link";
import { notFound } from "next/navigation";
import { buscarGrupo, listarPorGrupo, type GrupoNutriente } from "@/content/nutrientes";

// Tailwind 4 faz purge das classes — mapa estático evita classes dinâmicas
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
    <div className="px-6 md:px-8 py-8 max-w-3xl mx-auto">
      <header className="mb-6">
        <Link href="/fertilidade" className="text-sm text-brand-700 hover:underline">
          ← Fertilidade do Solo
        </Link>
        <h1 className="mt-2 text-3xl font-bold">{g.titulo}</h1>
        <p className="text-sm text-brand-600">{g.subtitulo}</p>
      </header>

      <div className="grid sm:grid-cols-2 gap-3">
        {nutrientes.map((n) => (
          <Link
            key={n.slug}
            href={`/fertilidade/${g.slug}/${n.slug}`}
            className="p-5 rounded-2xl border border-brand-100 bg-white hover:shadow-md hover:border-brand-200 transition"
          >
            <div className="flex items-baseline gap-3">
              <span className={`text-3xl font-bold ${COR_TEXTO[n.cor]}`}>{n.simbolo}</span>
              <span className="font-semibold text-foreground">{n.nome}</span>
            </div>
            <p className="mt-2 text-sm text-foreground/70 line-clamp-2">{n.papel}</p>
            {n.mobilidade && (
              <span className="mt-3 inline-block rounded-full bg-brand-50 px-2 py-0.5 text-xs text-brand-700">
                {n.mobilidade} na planta
              </span>
            )}
          </Link>
        ))}
      </div>
    </div>
  );
}
