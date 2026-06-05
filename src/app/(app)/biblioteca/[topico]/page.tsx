import Link from "next/link";
import { notFound } from "next/navigation";
import { artigosPorTopico, buscarTopico } from "@/content/artigos";

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
    <div className="px-6 md:px-8 py-8 max-w-3xl mx-auto">
      <header className="mb-6">
        <Link href="/biblioteca" className="text-sm text-brand-700 hover:underline">
          ← Biblioteca Técnica
        </Link>
        <h1 className="mt-2 text-3xl font-bold flex items-center gap-3">
          <span className="text-3xl">{t.icone}</span>
          {t.titulo}
        </h1>
      </header>

      <div className="space-y-3">
        {artigos.length === 0 && (
          <p className="text-sm text-foreground/60 italic">
            Ainda não temos artigos publicados neste tópico. Em breve!
          </p>
        )}
        {artigos.map((a) => (
          <Link
            key={a.slug}
            href={`/biblioteca/${a.topico}/${a.slug}`}
            className="block p-4 rounded-2xl border border-brand-100 bg-white hover:shadow-md hover:border-brand-200 transition"
          >
            <h3 className="font-semibold">{a.titulo}</h3>
            <p className="mt-1 text-sm text-foreground/70 line-clamp-2">{a.resumo}</p>
            <div className="mt-2 text-xs text-foreground/50">
              {a.autor} · {a.tempoLeitura} min de leitura ·{" "}
              {new Date(a.publicadoEm).toLocaleDateString("pt-BR")}
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
