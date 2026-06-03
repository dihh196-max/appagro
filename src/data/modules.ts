import type { ComponentProps } from 'react';
import { Ionicons } from '@expo/vector-icons';

type IoniconName = ComponentProps<typeof Ionicons>['name'];

export type AgroModule = {
  key: string;
  label: string;
  icon: IoniconName;
  color: string;
  route?: string;
};

/**
 * Módulos principais do app (grade da Home), baseados no escopo do AgroNet.
 */
export const modules: AgroModule[] = [
  { key: 'clima', label: 'Clima', icon: 'partly-sunny', color: '#36B6F0' },
  { key: 'calculadoras', label: 'Calculadoras', icon: 'calculator', color: '#3B82F6' },
  { key: 'solos', label: 'Solos', icon: 'location', color: '#C2410C' },
  { key: 'fertilidade', label: 'Fertilidade', icon: 'leaf', color: '#16A34A' },
  { key: 'biblioteca', label: 'Biblioteca', icon: 'book', color: '#7C3AED' },
  { key: 'noticias', label: 'Notícias', icon: 'newspaper', color: '#F97316' },
  { key: 'cursos', label: 'Cursos', icon: 'school', color: '#DB2777' },
  { key: 'empregos', label: 'Empregos', icon: 'briefcase', color: '#9333EA' },
  { key: 'defensivos', label: 'Defensivos', icon: 'flask', color: '#DC2626' },
  { key: 'laudos', label: 'Laudos', icon: 'document-text', color: '#0D9488' },
  { key: 'dashboard', label: 'Dashboard', icon: 'bar-chart', color: '#4F46E5' },
  { key: 'agroia', label: 'AgroIA', icon: 'sparkles', color: '#22C55E' },
  { key: 'financas', label: 'Finanças', icon: 'wallet', color: '#0891B2' },
  { key: 'relatorios', label: 'Relatórios', icon: 'clipboard', color: '#E11D48' },
  { key: 'diario', label: 'Diário', icon: 'create', color: '#65A30D' },
  { key: 'inventario', label: 'Inventário', icon: 'cube', color: '#CA8A04' },
  { key: 'calendario', label: 'Calendário', icon: 'calendar', color: '#9333EA' },
  { key: 'pragas', label: 'Pragas IA', icon: 'bug', color: '#BE123C' },
  { key: 'irrigacao', label: 'Irrigação', icon: 'water', color: '#0EA5E9' },
];

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
