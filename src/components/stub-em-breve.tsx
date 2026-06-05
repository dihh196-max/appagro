import { PageHeader } from "@/components/page-header";

export function StubEmBreve({
  title,
  subtitle,
  icone,
  descricao,
  cta,
}: {
  title: string;
  subtitle: string;
  icone: string;
  descricao: string;
  cta?: { label: string; href: string };
}) {
  return (
    <>
      <PageHeader title={title} subtitle={subtitle} cta={cta} />
      <div className="px-5 pb-6">
        <div className="rounded-2xl border-2 border-dashed border-brand-200 bg-white/60 p-8 text-center">
          <div className="text-5xl mb-3">{icone}</div>
          <h2 className="text-base font-semibold text-brand-900">Em breve</h2>
          <p className="mt-2 text-xs text-muted max-w-xs mx-auto">{descricao}</p>
        </div>
      </div>
    </>
  );
}
