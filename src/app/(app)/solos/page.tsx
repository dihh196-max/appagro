import Link from "next/link";
import { CAPITULOS_SOLO } from "@/content/solos";

export const metadata = { title: "Processos em Solos" };

export default function SolosIndex() {
  return (
    <div className="px-6 md:px-8 py-8 max-w-3xl mx-auto">
      <header className="mb-6">
        <h1 className="text-3xl font-bold">Processos em Solos</h1>
        <p className="text-sm text-brand-600">Conhecimento essencial do solo</p>
      </header>

      <div className="space-y-3">
        {CAPITULOS_SOLO.map((c) => (
          <Link
            key={c.slug}
            href={`/solos/${c.slug}`}
            className="flex items-center gap-4 p-4 rounded-2xl border border-brand-100 bg-white hover:shadow-md hover:border-brand-200 transition"
          >
            <span
              className={`inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-xl text-2xl text-white ${c.cor}`}
            >
              {c.icone}
            </span>
            <span className="min-w-0 flex-1">
              <span className="block font-semibold text-foreground">{c.titulo}</span>
              <span className="block text-sm text-foreground/60">{c.subtitulo}</span>
            </span>
            <span className="text-foreground/40">›</span>
          </Link>
        ))}
      </div>
    </div>
  );
}
