import { notFound } from "next/navigation";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { buscarCapitulo } from "@/content/solos";
import { PageHeader } from "@/components/page-header";

type Props = { params: Promise<{ capitulo: string }> };

export async function generateMetadata({ params }: Props) {
  const { capitulo } = await params;
  const c = buscarCapitulo(capitulo);
  return { title: c?.titulo ?? "Capítulo" };
}

export default async function CapituloPage({ params }: Props) {
  const { capitulo } = await params;
  const c = buscarCapitulo(capitulo);
  if (!c) notFound();

  return (
    <>
      <PageHeader title={c.titulo} subtitle={c.subtitulo} back="/solos" />
      <article className="px-5 prose prose-sm prose-neutral max-w-none">
        <ReactMarkdown remarkPlugins={[remarkGfm]}>{c.conteudo}</ReactMarkdown>
      </article>
    </>
  );
}
