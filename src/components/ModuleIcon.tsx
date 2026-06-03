import { Ionicons } from '@expo/vector-icons';

type Props = {
  icon: keyof typeof Ionicons.glyphMap;
  /** Cor mantida no tipo para compatibilidade com chamadas existentes (ignorada). */
  color?: string;
  size?: number;
};

/**
 * Ícone de módulo "solto": apenas o glifo branco, sem fundo nem borda.
 * Estética minimalista e clean, alinhada com o tema escuro do app.
 */
export function ModuleIcon({ icon, size = 24 }: Props) {
  return <Ionicons name={icon} size={size} color="#FFFFFF" />;
}
