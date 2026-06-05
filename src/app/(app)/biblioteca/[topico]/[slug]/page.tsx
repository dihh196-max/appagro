import { notFound } from "next/navigation";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { buscarArtigo, buscarTopico } from "@/content/artigos";
import { PageHeader } from "@/components/page-header";

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
    <>
      <PageHeader
        title={a.titulo}
        subtitle={`${t.icone} ${t.titulo} · ${a.tempoLeitura} min`}
        back={`/biblioteca/${t.slug}`}
      />

      <article className="px-5 prose prose-sm prose-neutral max-w-none">
        <ReactMarkdown remarkPlugins={[remarkGfm]}>{a.conteudo}</ReactMarkdown>
      </article>
    </>
  );
}
