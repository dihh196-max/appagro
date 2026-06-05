import Link from "next/link";
import { GRUPOS, listarPorGrupo } from "@/content/nutrientes";

export const metadata = { title: "Fertilidade do Solo" };

export default function FertilidadeIndex() {
  return (
    <div className="px-6 md:px-8 py-8 max-w-3xl mx-auto">
      <header className="mb-6">
        <h1 className="text-3xl font-bold">Fertilidade do Solo</h1>
        <p className="text-sm text-brand-600">Nutrientes, correção e adubação</p>
      </header>

      <div className="space-y-3">
        {GRUPOS.map((g) => {
          const itens = listarPorGrupo(g.slug);
          return (
            <Link
              key={g.slug}
              href={`/fertilidade/${g.slug}`}
              className="flex items-center gap-4 p-4 rounded-2xl border border-brand-100 bg-white hover:shadow-md hover:border-brand-200 transition"
            >
              <span
                className={`inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-xl text-2xl text-white ${g.cor}`}
              >
                {g.icone}
              </span>
              <span className="min-w-0 flex-1">
                <span className="block font-semibold text-foreground">{g.titulo}</span>
                <span className="block text-sm text-foreground/60">
                  {itens.length} {itens.length === 1 ? "nutriente" : "nutrientes"}
                </span>
              </span>
              <span className="text-foreground/40">›</span>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
