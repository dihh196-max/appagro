import { GRUPOS, listarPorGrupo } from "@/content/nutrientes";
import { ListRow, PageHeader } from "@/components/page-header";

export const metadata = { title: "Fertilidade do Solo" };

export default function FertilidadeIndex() {
  return (
    <>
      <PageHeader title="Fertilidade do Solo" subtitle="Nutrientes, correção e adubação" />

      <div className="px-5 space-y-2.5">
        {GRUPOS.map((g) => {
          const n = listarPorGrupo(g.slug).length;
          return (
            <ListRow
              key={g.slug}
              href={`/fertilidade/${g.slug}`}
              icon={g.icone}
              iconBg={g.cor}
              title={g.titulo}
              subtitle={`${n} ${n === 1 ? "nutriente" : "nutrientes"}`}
            />
          );
        })}
      </div>
    </>
  );
}
