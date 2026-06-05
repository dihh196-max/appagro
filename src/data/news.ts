import type { LucideIcon } from "lucide-react";
import {
  TrendingUp, CloudRain, Leaf, PawPrint, Cpu, DollarSign,
} from "lucide-react";

export type NewsCategory =
  | "Destaques"
  | "Mercado"
  | "Clima"
  | "Lavoura"
  | "Pecuária"
  | "Tecnologia";

export type NewsItem = {
  id: string;
  title: string;
  summary: string;
  category: NewsCategory;
  source: string;
  publishedAt: string;
  readTime: number;
  image: string;
  accent: string;
  icon: LucideIcon;
  likes: number;
  comments: number;
  hot?: boolean;
};

export const news: NewsItem[] = [
  { id: "n1", title: "Soja em Chicago dispara +50 pontos e bate maior alta semanal em 18 anos", summary: "Movimento foi puxado por quebra de safra na Argentina e demanda chinesa aquecida. Analistas projetam suporte forte no curto prazo.", category: "Mercado", source: "AgroNet Mercado", publishedAt: "2026-06-04T08:15:00Z", readTime: 4, image: "https://images.unsplash.com/photo-1625246333195-78d9c38ad449?auto=format&fit=crop&w=1200&q=80", accent: "#22C55E", icon: TrendingUp, likes: 184, comments: 23, hot: true },
  { id: "n2", title: "Alerta: chuvas intensas devem atingir Centro-Oeste nos próximos 3 dias", summary: "Inmet emite aviso laranja para soja em fase final. Pulverizações devem ser revistas e drenagem reforçada.", category: "Clima", source: "Clima AgroNet", publishedAt: "2026-06-04T06:30:00Z", readTime: 3, image: "https://images.unsplash.com/photo-1561553873-e8491a564fd0?auto=format&fit=crop&w=1200&q=80", accent: "#36B6F0", icon: CloudRain, likes: 92, comments: 11 },
  { id: "n3", title: "Ferrugem asiática avança em MS: como ajustar o manejo de fungicidas", summary: "Especialistas indicam rotação de princípios ativos e janela curta de reaplicação para conter perdas de até 80%.", category: "Lavoura", source: "Embrapa Soja", publishedAt: "2026-06-03T18:00:00Z", readTime: 6, image: "https://images.unsplash.com/photo-1530267981375-f0de937f5f13?auto=format&fit=crop&w=1200&q=80", accent: "#16A34A", icon: Leaf, likes: 312, comments: 47, hot: true },
  { id: "n4", title: "Boi gordo recua 0,4% com oferta firme; arroba opera estável em SP", summary: "Frigoríficos seguem com escalas curtas e pressionam o pecuarista. Exportação para China segue como sustentáculo.", category: "Pecuária", source: "Scot Consultoria", publishedAt: "2026-06-03T15:20:00Z", readTime: 3, image: "https://images.unsplash.com/photo-1605479861017-7f7a76b39b4b?auto=format&fit=crop&w=1200&q=80", accent: "#CA8A04", icon: PawPrint, likes: 67, comments: 8 },
  { id: "n5", title: "Drones autônomos cortam em 40% o tempo de pulverização em soja", summary: "Tecnologia ganha tração no Mato Grosso com integração à AgroIA: rota gerada por satélite e operação sem piloto.", category: "Tecnologia", source: "AgriTech Brasil", publishedAt: "2026-06-03T11:45:00Z", readTime: 5, image: "https://images.unsplash.com/photo-1508614589041-895b88991e3e?auto=format&fit=crop&w=1200&q=80", accent: "#7C3AED", icon: Cpu, likes: 421, comments: 73, hot: true },
  { id: "n6", title: "Dólar cai 1,75% e mexe com o caixa do produtor exportador", summary: "Câmbio mais baixo aperta margem da soja e do café. Veja como travar parte da safra no módulo Finanças.", category: "Mercado", source: "AgroNet Finanças", publishedAt: "2026-06-03T09:10:00Z", readTime: 4, image: "https://images.unsplash.com/photo-1565728744382-61accd4aa148?auto=format&fit=crop&w=1200&q=80", accent: "#0891B2", icon: DollarSign, likes: 138, comments: 19 },
];

export function timeAgo(iso: string, now = Date.now()): string {
  const diff = Math.max(0, now - new Date(iso).getTime());
  const min = Math.floor(diff / 60_000);
  if (min < 60) return `${min} min`;
  const h = Math.floor(min / 60);
  if (h < 24) return `${h} h`;
  const d = Math.floor(h / 24);
  return `${d} d`;
}
