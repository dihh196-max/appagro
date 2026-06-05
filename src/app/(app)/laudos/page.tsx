import { StubEmBreve } from "@/components/stub-em-breve";
export const metadata = { title: "Laudos Agronômicos" };
export default function Page() {
  return (
    <StubEmBreve
      title="Laudos Agronômicos"
      subtitle="Relatórios e pareceres técnicos"
      icone="📄"
      descricao="CRUD multi-tenant + geração de PDF. Tipos: Solo, Fitossanidade, Irrigação. Status: rascunho → em análise → finalizado. Link compartilhável com token."
      cta={{ label: "Novo", href: "#" }}
    />
  );
}
