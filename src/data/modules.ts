import type { ComponentProps } from 'react';
import { Ionicons } from '@expo/vector-icons';

type IoniconName = ComponentProps<typeof Ionicons>['name'];

export type ModuleCategory = 'Campo' | 'Gestão' | 'Inteligência' | 'Conteúdo';

export type AgroModule = {
  key: string;
  label: string;
  icon: IoniconName;
  color: string;
  category: ModuleCategory;
  route?: string;
};

/**
 * Módulos principais do app, catalogados por categoria (menu lateral).
 */
export const modules: AgroModule[] = [
  { key: 'clima', label: 'Clima', icon: 'partly-sunny', color: '#36B6F0', category: 'Campo' },
  { key: 'solos', label: 'Solos', icon: 'location', color: '#C2410C', category: 'Campo' },
  { key: 'fertilidade', label: 'Fertilidade', icon: 'leaf', color: '#16A34A', category: 'Campo' },
  { key: 'defensivos', label: 'Defensivos', icon: 'flask', color: '#DC2626', category: 'Campo' },
  { key: 'irrigacao', label: 'Irrigação', icon: 'water', color: '#0EA5E9', category: 'Campo' },
  { key: 'calculadoras', label: 'Calculadoras', icon: 'calculator', color: '#3B82F6', category: 'Gestão' },
  { key: 'laudos', label: 'Laudos', icon: 'document-text', color: '#0D9488', category: 'Gestão' },
  { key: 'dashboard', label: 'Dashboard', icon: 'bar-chart', color: '#4F46E5', category: 'Gestão' },
  { key: 'financas', label: 'Finanças', icon: 'wallet', color: '#0891B2', category: 'Gestão' },
  { key: 'relatorios', label: 'Relatórios', icon: 'clipboard', color: '#E11D48', category: 'Gestão' },
  { key: 'diario', label: 'Diário', icon: 'create', color: '#65A30D', category: 'Gestão' },
  { key: 'inventario', label: 'Inventário', icon: 'cube', color: '#CA8A04', category: 'Gestão' },
  { key: 'calendario', label: 'Calendário', icon: 'calendar', color: '#9333EA', category: 'Gestão' },
  { key: 'agroia', label: 'AgroIA', icon: 'sparkles', color: '#22C55E', category: 'Inteligência' },
  { key: 'pragas', label: 'Pragas IA', icon: 'bug', color: '#BE123C', category: 'Inteligência' },
  { key: 'biblioteca', label: 'Biblioteca', icon: 'book', color: '#7C3AED', category: 'Conteúdo' },
  { key: 'noticias', label: 'Notícias', icon: 'newspaper', color: '#F97316', category: 'Conteúdo' },
  { key: 'cursos', label: 'Cursos', icon: 'school', color: '#DB2777', category: 'Conteúdo' },
  { key: 'empregos', label: 'Empregos', icon: 'briefcase', color: '#9333EA', category: 'Conteúdo' },
];

export const moduleCategories: ModuleCategory[] = ['Campo', 'Gestão', 'Inteligência', 'Conteúdo'];

export const categoryMeta: Record<ModuleCategory, { icon: IoniconName; description: string }> = {
  Campo: { icon: 'leaf', description: 'Lavoura, solo, clima e insumos' },
  'Gestão': { icon: 'briefcase', description: 'Finanças, laudos e operação' },
  'Inteligência': { icon: 'sparkles', description: 'IA aplicada ao campo' },
  'Conteúdo': { icon: 'library', description: 'Notícias, cursos e biblioteca' },
};

export type Quote = {
  symbol: string;
  label: string;
  value: string;
  change: number; // % variação
};

export const quotes: Quote[] = [
  { symbol: 'USDBRL', label: 'Dólar', value: '5,031', change: -1.75 },
  { symbol: 'SOJA', label: 'Soja CBOT', value: '1.449', change: 0.85 },
  { symbol: 'MILHO', label: 'Milho', value: '672', change: 0.32 },
  { symbol: 'BOI', label: 'Boi Gordo', value: '312', change: -0.41 },
  { symbol: 'CAFE', label: 'Café', value: '1.287', change: 1.12 },
];
