import Link from "next/link";
import { notFound } from "next/navigation";
import { artigosPorTopico, buscarTopico } from "@/content/artigos";
import { PageHeader } from "@/components/page-header";

type Props = { params: Promise<{ topico: string }> };

export async function generateMetadata({ params }: Props) {
  const { topico } = await params;
  const t = buscarTopico(topico);
  return { title: t?.titulo ?? "Tópico" };
}

export default async function TopicoPage({ params }: Props) {
  const { topico } = await params;
  const t = buscarTopico(topico);
  if (!t) notFound();

  const artigos = artigosPorTopico(topico);

  return (
    <>
      <PageHeader title={`${t.icone} ${t.titulo}`} subtitle="Artigos do tópico" back="/biblioteca" />

      <div className="px-5 space-y-2.5">
        {artigos.length === 0 && (
          <p className="text-sm text-muted italic">Ainda sem artigos.</p>
        )}
        {artigos.map((a) => (
          <Link
            key={a.slug}
            href={`/biblioteca/${a.topico}/${a.slug}`}
            className="block p-4 rounded-2xl border border-black/5 bg-white hover:border-brand-200 hover:shadow-sm transition"
          >
            <h3 className="font-semibold text-brand-900 leading-snug">{a.titulo}</h3>
            <p className="mt-1 text-sm text-muted line-clamp-2">{a.resumo}</p>
            <div className="mt-2 text-xs text-muted">
              {a.autor} · {a.tempoLeitura} min · {new Date(a.publicadoEm).toLocaleDateString("pt-BR")}
            </div>
          </Link>
        ))}
      </div>
    </>
  );
}
