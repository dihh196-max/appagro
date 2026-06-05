import { StubEmBreve } from "@/components/stub-em-breve";
export const metadata = { title: "Cursos" };
export default function Page() {
  return (
    <StubEmBreve
      title="Cursos"
      subtitle="Capacitação para o agronegócio"
      icone="🎓"
      descricao="Catálogo oficial + cursos parceiros, com 15% de comissão por venda. LMS leve (módulos, aulas, progresso) e emissão de certificados."
    />
  );
}
