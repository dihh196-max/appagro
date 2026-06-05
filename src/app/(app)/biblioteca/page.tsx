import Link from "next/link";
import { ARTIGOS, TOPICOS, pesquisarArtigos } from "@/content/artigos";

export const metadata = { title: "Biblioteca Técnica" };

type Props = { searchParams: Promise<{ q?: string }> };

export default async function BibliotecaIndex({ searchParams }: Props) {
  const { q } = await searchParams;
  const resultados = q ? pesquisarArtigos(q) : [];

  return (
    <div className="px-6 md:px-8 py-8 max-w-3xl mx-auto">
      <header className="mb-6">
        <h1 className="text-3xl font-bold">Biblioteca Técnica</h1>
        <p className="text-sm text-brand-600">Guias e artigos agrícolas</p>
      </header>

      <form action="/biblioteca" method="get" className="mb-6 flex gap-2">
        <input
          name="q"
          type="search"
          defaultValue={q}
          placeholder="Pesquisar tema..."
          className="flex-1 rounded-lg border border-brand-200 px-4 py-2 focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-200"
        />
        <button
          type="submit"
          className="rounded-lg bg-brand-600 px-4 py-2 text-sm font-medium text-white hover:bg-brand-700"
        >
          Buscar
        </button>
      </form>

      {q ? (
        <section>
          <p className="text-sm text-foreground/60 mb-3">
            {resultados.length} resultado{resultados.length === 1 ? "" : "s"} para “{q}”
          </p>
          <div className="space-y-3">
            {resultados.map((a) => (
              <ArtigoCard key={a.slug} artigo={a} />
            ))}
            {resultados.length === 0 && (
              <p className="text-sm text-foreground/60 italic">
                Nada encontrado. Tente outro termo.
              </p>
            )}
          </div>
        </section>
      ) : (
        <>
          <h2 className="mb-3 text-xs font-semibold tracking-widest text-brand-700/70">
            TÓPICOS EM DESTAQUE
          </h2>
          <div className="grid grid-cols-2 gap-3 mb-8">
            {TOPICOS.map((t) => (
              <Link
                key={t.slug}
                href={`/biblioteca/${t.slug}`}
                className="flex items-center gap-3 p-4 rounded-2xl border border-brand-100 bg-white hover:shadow-md hover:border-brand-200 transition"
              >
                <span className="text-2xl">{t.icone}</span>
                <span className="font-medium text-foreground">{t.titulo}</span>
              </Link>
            ))}
          </div>

          <h2 className="mb-3 text-xs font-semibold tracking-widest text-brand-700/70">
            ARTIGOS RECENTES
          </h2>
          <div className="space-y-3">
            {ARTIGOS.slice()
              .sort(
                (a, b) =>
                  new Date(b.publicadoEm).getTime() - new Date(a.publicadoEm).getTime()
              )
              .slice(0, 4)
              .map((a) => (
                <ArtigoCard key={a.slug} artigo={a} />
              ))}
          </div>
        </>
      )}
    </div>
  );
}

function ArtigoCard({ artigo }: { artigo: (typeof ARTIGOS)[number] }) {
  const topico = TOPICOS.find((t) => t.slug === artigo.topico);
  return (
    <Link
      href={`/biblioteca/${artigo.topico}/${artigo.slug}`}
      className="block p-4 rounded-2xl border border-brand-100 bg-white hover:shadow-md hover:border-brand-200 transition"
    >
      <div className="flex items-center gap-2 text-xs text-brand-700 mb-1">
        <span>{topico?.icone}</span>
        <span>{topico?.titulo}</span>
        <span>·</span>
        <span>{artigo.tempoLeitura} min de leitura</span>
      </div>
      <h3 className="font-semibold">{artigo.titulo}</h3>
      <p className="mt-1 text-sm text-foreground/70 line-clamp-2">{artigo.resumo}</p>
    </Link>
  );
}
