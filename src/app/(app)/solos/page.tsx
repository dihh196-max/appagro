import { CAPITULOS_SOLO } from "@/content/solos";
import { ListRow, PageHeader } from "@/components/page-header";

export const metadata = { title: "Processos em Solos" };

export default function SolosIndex() {
  return (
    <>
      <PageHeader title="Processos em Solos" subtitle="Conhecimento essencial do solo" />

      <div className="px-5 space-y-2.5">
        {CAPITULOS_SOLO.map((c) => (
          <ListRow
            key={c.slug}
            href={`/solos/${c.slug}`}
            icon={c.icone}
            iconBg={c.cor}
            title={c.titulo}
            subtitle={c.subtitulo}
          />
        ))}
      </div>
    </>
  );
}
