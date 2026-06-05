import Link from "next/link";
import { ARTIGOS, TOPICOS, pesquisarArtigos } from "@/content/artigos";
import { PageHeader } from "@/components/page-header";

export const metadata = { title: "Biblioteca Técnica" };

type Props = { searchParams: Promise<{ q?: string }> };

export default async function BibliotecaIndex({ searchParams }: Props) {
  const { q } = await searchParams;
  const resultados = q ? pesquisarArtigos(q) : [];

  return (
    <>
      <PageHeader title="Biblioteca Técnica" subtitle="Guias e artigos agrícolas" />

      <div className="px-5">
        {/* Busca — fiel ao print: input cinza + botão verde */}
        <form action="/biblioteca" method="get" className="flex gap-2 mb-5">
          <div className="flex-1 relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted">
              <SearchIcon />
            </span>
            <input
              name="q"
              type="search"
              defaultValue={q}
              placeholder="Pesquisar tema..."
              className="w-full rounded-xl bg-white border border-black/10 pl-10 pr-3 py-2.5 text-sm focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-200"
            />
          </div>
          <button
            type="submit"
            className="rounded-xl bg-brand-600 px-4 text-sm font-medium text-white hover:bg-brand-700"
          >
            Buscar
          </button>
        </form>

        {q ? (
          <section>
            <p className="text-xs text-muted mb-3">
              {resultados.length} resultado{resultados.length === 1 ? "" : "s"} para “{q}”
            </p>
            <div className="space-y-2.5">
              {resultados.map((a) => <ArtigoCard key={a.slug} artigo={a} />)}
              {resultados.length === 0 && (
                <p className="text-sm text-muted italic">Nada encontrado.</p>
              )}
            </div>
          </section>
        ) : (
          <>
            <h2 className="text-[11px] font-semibold tracking-[0.12em] text-brand-800/70 mb-2 px-1">
              TÓPICOS EM DESTAQUE
            </h2>
            <div className="grid grid-cols-2 gap-2.5 mb-7">
              {TOPICOS.map((t) => (
                <Link
                  key={t.slug}
                  href={`/biblioteca/${t.slug}`}
                  className="flex items-center gap-2 p-3 rounded-2xl border border-black/5 bg-white hover:border-brand-200 hover:shadow-sm transition"
                >
                  <span className="text-xl">{t.icone}</span>
                  <span className="font-medium text-brand-900 text-sm">{t.titulo}</span>
                </Link>
              ))}
            </div>

            <h2 className="text-[11px] font-semibold tracking-[0.12em] text-brand-800/70 mb-2 px-1">
              ARTIGOS RECENTES
            </h2>
            <div className="space-y-2.5">
              {ARTIGOS
                .slice()
                .sort((a, b) => +new Date(b.publicadoEm) - +new Date(a.publicadoEm))
                .slice(0, 4)
                .map((a) => <ArtigoCard key={a.slug} artigo={a} />)}
            </div>
          </>
        )}
      </div>
    </>
  );
}

function ArtigoCard({ artigo }: { artigo: (typeof ARTIGOS)[number] }) {
  const topico = TOPICOS.find((t) => t.slug === artigo.topico);
  return (
    <Link
      href={`/biblioteca/${artigo.topico}/${artigo.slug}`}
      className="block p-4 rounded-2xl border border-black/5 bg-white hover:border-brand-200 hover:shadow-sm transition"
    >
      <div className="flex items-center gap-2 text-xs text-brand-700 mb-1">
        <span>{topico?.icone}</span>
        <span>{topico?.titulo}</span>
        <span>·</span>
        <span className="text-muted">{artigo.tempoLeitura} min</span>
      </div>
      <h3 className="font-semibold text-brand-900 leading-snug">{artigo.titulo}</h3>
      <p className="mt-1 text-sm text-muted line-clamp-2">{artigo.resumo}</p>
    </Link>
  );
}

function SearchIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
      <circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="2" />
      <path d="M20 20l-3.5-3.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}
