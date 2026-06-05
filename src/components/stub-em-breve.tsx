export function StubEmBreve({
  title,
  subtitle,
  icone,
  descricao,
}: {
  title: string;
  subtitle: string;
  icone: string;
  descricao: string;
}) {
  return (
    <div className="px-6 md:px-8 py-8 max-w-3xl mx-auto">
      <header className="mb-6">
        <h1 className="text-3xl font-bold">{title}</h1>
        <p className="text-sm text-brand-600">{subtitle}</p>
      </header>

      <div className="rounded-2xl border-2 border-dashed border-brand-200 bg-brand-50/40 p-10 text-center">
        <div className="text-6xl mb-4">{icone}</div>
        <h2 className="text-xl font-semibold text-brand-800">Em breve</h2>
        <p className="mt-3 text-sm text-foreground/70 max-w-md mx-auto">{descricao}</p>
      </div>
    </div>
  );
}
