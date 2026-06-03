/**
 * Tema visual do AgroNet — inspirado no estilo "super app do agronegócio":
 * fundo azul-marinho profundo com verde-menta neon de destaque.
 */

export const colors = {
  // Fundos
  bg: '#0A1A2F',
  bgGradientTop: '#0C2440',
  bgGradientBottom: '#081627',
  card: '#0F2238',
  cardElevated: '#13294A',
  surface: '#16304F',

  // Marca
  primary: '#2EE38A', // verde-menta neon
  primaryDark: '#1FB870',
  primarySoft: 'rgba(46, 227, 138, 0.14)',

  // Texto
  text: '#FFFFFF',
  textMuted: '#9FB2C8',
  textFaint: '#5F77A0',

  // Estados
  up: '#2EE38A',
  down: '#FF6B6B',
  warning: '#FFC857',

  // Bordas
  border: 'rgba(255,255,255,0.08)',
  borderStrong: 'rgba(46,227,138,0.35)',
} as const;

export const spacing = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 24,
  xxl: 32,
} as const;

export const radius = {
  sm: 8,
  md: 14,
  lg: 20,
  xl: 28,
  pill: 999,
} as const;

export const font = {
  sizes: {
    xs: 11,
    sm: 13,
    md: 15,
    lg: 18,
    xl: 22,
    xxl: 28,
    hero: 34,
  },
} as const;
