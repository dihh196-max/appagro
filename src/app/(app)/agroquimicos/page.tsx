import { StubEmBreve } from "@/components/stub-em-breve";
export const metadata = { title: "Agroquímicos" };
export default function Page() {
  return (
    <StubEmBreve
      title="Agroquímicos"
      subtitle="5 produtos cadastrados"
      icone="💊"
      descricao="Catálogo oficial + cadastros da fazenda. Busca por nome ou ingrediente, filtro por categoria (herbicida, inseticida, fungicida) e classes toxicológicas."
      cta={{ label: "Cadastrar", href: "#" }}
    />
  );
}
