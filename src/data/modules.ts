import type { LucideIcon } from "lucide-react";
import {
  CloudSun, MapPin, Leaf, FlaskConical, Droplets, Calculator,
  FileText, BarChart3, Wallet, Clipboard, PenSquare, Box, Calendar,
  Sparkles, Bug, BookOpen, Newspaper, GraduationCap, Briefcase,
  Library, Brain,
} from "lucide-react";

export type ModuleCategory =
  | "Campo"
  | "Gestão"
  | "Inteligência"
  | "Conteúdo";

export type AgroModule = {
  key: string;
  label: string;
  icon: LucideIcon;
  color: string;
  category: ModuleCategory;
};

export const modules: AgroModule[] = [
  { key: "clima", label: "Clima", icon: CloudSun, color: "#36B6F0", category: "Campo" },
  { key: "solos", label: "Solos", icon: MapPin, color: "#C2410C", category: "Campo" },
  { key: "fertilidade", label: "Fertilidade", icon: Leaf, color: "#16A34A", category: "Campo" },
  { key: "defensivos", label: "Defensivos", icon: FlaskConical, color: "#DC2626", category: "Campo" },
  { key: "irrigacao", label: "Irrigação", icon: Droplets, color: "#0EA5E9", category: "Campo" },
  { key: "calculadoras", label: "Calculadoras", icon: Calculator, color: "#3B82F6", category: "Gestão" },
  { key: "laudos", label: "Laudos", icon: FileText, color: "#0D9488", category: "Gestão" },
  { key: "dashboard", label: "Dashboard", icon: BarChart3, color: "#4F46E5", category: "Gestão" },
  { key: "financas", label: "Finanças", icon: Wallet, color: "#0891B2", category: "Gestão" },
  { key: "relatorios", label: "Relatórios", icon: Clipboard, color: "#E11D48", category: "Gestão" },
  { key: "diario", label: "Diário", icon: PenSquare, color: "#65A30D", category: "Gestão" },
  { key: "inventario", label: "Inventário", icon: Box, color: "#CA8A04", category: "Gestão" },
  { key: "calendario", label: "Calendário", icon: Calendar, color: "#9333EA", category: "Gestão" },
  { key: "agroia", label: "AgroIA", icon: Sparkles, color: "#22C55E", category: "Inteligência" },
  { key: "pragas", label: "Pragas IA", icon: Bug, color: "#BE123C", category: "Inteligência" },
  { key: "biblioteca", label: "Biblioteca", icon: BookOpen, color: "#7C3AED", category: "Conteúdo" },
  { key: "noticias", label: "Notícias", icon: Newspaper, color: "#F97316", category: "Conteúdo" },
  { key: "cursos", label: "Cursos", icon: GraduationCap, color: "#DB2777", category: "Conteúdo" },
  { key: "empregos", label: "Empregos", icon: Briefcase, color: "#9333EA", category: "Conteúdo" },
];

export const moduleCategories: ModuleCategory[] = [
  "Campo", "Gestão", "Inteligência", "Conteúdo",
];

export const categoryMeta: Record<
  ModuleCategory,
  { icon: LucideIcon; description: string }
> = {
  Campo: { icon: Leaf, description: "Lavoura, solo, clima e insumos" },
  "Gestão": { icon: Briefcase, description: "Finanças, laudos e operação" },
  "Inteligência": { icon: Brain, description: "IA aplicada ao campo" },
  "Conteúdo": { icon: Library, description: "Notícias, cursos e biblioteca" },
};
