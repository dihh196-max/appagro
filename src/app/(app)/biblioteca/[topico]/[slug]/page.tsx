import Link from "next/link";
import { notFound } from "next/navigation";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { buscarArtigo, buscarTopico } from "@/content/artigos";

type Props = { params: Promise<{ topico: string; slug: string }> };

export async function generateMetadata({ params }: Props) {
  const { topico, slug } = await params;
  const a = buscarArtigo(topico, slug);
  return { title: a?.titulo ?? "Artigo" };
}

export default async function ArtigoPage({ params }: Props) {
  const { topico, slug } = await params;
  const a = buscarArtigo(topico, slug);
  const t = buscarTopico(topico);
  if (!a || !t) notFound();

  return (
    <div className="px-6 md:px-8 py-8 max-w-3xl mx-auto">
      <header className="mb-6">
        <Link
          href={`/biblioteca/${t.slug}`}
          className="text-sm text-brand-700 hover:underline"
        >
          ← {t.icone} {t.titulo}
        </Link>
        <h1 className="mt-3 text-3xl md:text-4xl font-bold">{a.titulo}</h1>
        <p className="mt-2 text-foreground/70">{a.resumo}</p>
        <div className="mt-3 text-xs text-foreground/50">
          {a.autor} · {a.tempoLeitura} min de leitura ·{" "}
          {new Date(a.publicadoEm).toLocaleDateString("pt-BR")}
        </div>
      </header>

      <article className="prose prose-brand max-w-none">
        <ReactMarkdown remarkPlugins={[remarkGfm]}>{a.conteudo}</ReactMarkdown>
      </article>
    </div>
  );
}
