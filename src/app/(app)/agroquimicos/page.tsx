import { StubEmBreve } from "@/components/stub-em-breve";
export const metadata = { title: "Agroquímicos" };
export default function Page() {
  return (
    <StubEmBreve
      title="Agroquímicos"
      subtitle="Catálogo de defensivos e bulas"
      icone="💊"
      descricao="Catálogo oficial + cadastros do tenant. Busca por produto/ingrediente, filtro por classe (herbicida, inseticida, fungicida), classes toxicológicas e culturas aprovadas."
    />
  );
}
