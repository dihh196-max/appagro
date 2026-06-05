import { Search } from "lucide-react";
import { Placeholder } from "@/components/Placeholder";

export default function Buscar() {
  return (
    <Placeholder
      title="Buscar"
      description="Encontre notícias, ferramentas e produtores na rede AgroNet."
      Icon={Search}
    />
  );
}
