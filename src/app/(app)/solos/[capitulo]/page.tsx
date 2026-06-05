import Link from "next/link";
import { notFound } from "next/navigation";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { buscarCapitulo } from "@/content/solos";

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
    <div className="px-6 md:px-8 py-8 max-w-3xl mx-auto">
      <header className="mb-6">
        <Link href="/solos" className="text-sm text-brand-700 hover:underline">
          ← Processos em Solos
        </Link>
        <h1 className="mt-3 flex items-center gap-3 text-3xl md:text-4xl font-bold">
          <span className="text-3xl">{c.icone}</span>
          {c.titulo}
        </h1>
        <p className="mt-1 text-sm text-brand-600">{c.subtitulo}</p>
      </header>

      <article className="prose prose-brand max-w-none">
        <ReactMarkdown remarkPlugins={[remarkGfm]}>{c.conteudo}</ReactMarkdown>
      </article>
    </div>
  );
}
