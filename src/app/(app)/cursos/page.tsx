import { StubEmBreve } from "@/components/stub-em-breve";
export const metadata = { title: "Cursos" };
export default function Page() {
  return (
    <StubEmBreve
      title="Cursos"
      subtitle="Capacitação para o agronegócio"
      icone="🎓"
      descricao="Catálogo oficial + cursos parceiros (15% de comissão). LMS leve com módulos, aulas, progresso e emissão de certificados."
      cta={{ label: "Anunciar", href: "#" }}
    />
  );
}
