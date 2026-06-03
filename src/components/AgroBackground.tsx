import { ReactNode } from 'react';
import { View, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { colors } from '../theme/theme';

/**
 * Fundo vetorial que remete ao agro: céu ao entardecer, sol, colinas em
 * camadas e linhas de plantio. Desenhado em código (sem asset binário),
 * funciona offline e blenda para o fundo escuro na área do formulário.
 */
export function AgroBackground({ children }: { children: ReactNode }) {
  return (
    <View style={styles.root}>
      {/* Céu */}
      <LinearGradient
        colors={['#0A1A2F', '#102A3E', '#1C4744']}
        locations={[0, 0.45, 1]}
        style={StyleSheet.absoluteFill}
      />

      {/* Sol com brilho */}
      <View style={styles.sunGlow} />
      <View style={styles.sun} />

      {/* Colinas (camadas) */}
      <LinearGradient colors={['#1B5E52', '#16493F']} style={[styles.hill, styles.hillBack]} />
      <LinearGradient colors={['#14513D', '#0F3D2D']} style={[styles.hill, styles.hillMid]} />
      <View style={[styles.hill, styles.hillFront]}>
        <LinearGradient colors={['#10402F', '#0B2E22']} style={StyleSheet.absoluteFill} />
        {/* Linhas de plantio (perspectiva) */}
        {[-40, -20, 0, 20, 40].map((rot, i) => (
          <View
            key={i}
            style={[
              styles.row,
              { transform: [{ translateX: rot * 3 }, { rotate: `${rot}deg` }] },
            ]}
          />
        ))}
      </View>

      {/* Scrim que escurece a parte de baixo até o fundo do app */}
      <LinearGradient
        colors={['transparent', 'rgba(10,26,47,0.65)', colors.bg]}
        locations={[0, 0.55, 1]}
        style={styles.scrim}
      />

      <View style={styles.content}>{children}</View>
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: colors.bg, overflow: 'hidden' },
  content: { flex: 1 },
  sunGlow: {
    position: 'absolute',
    top: '8%',
    alignSelf: 'center',
    width: 320,
    height: 320,
    borderRadius: 999,
    backgroundColor: 'rgba(232,180,92,0.18)',
  },
  sun: {
    position: 'absolute',
    top: '15%',
    alignSelf: 'center',
    width: 120,
    height: 120,
    borderRadius: 999,
    backgroundColor: '#E8B45C',
    shadowColor: '#E8B45C',
    shadowOpacity: 0.8,
    shadowRadius: 50,
    shadowOffset: { width: 0, height: 0 },
  },
  hill: {
    position: 'absolute',
    left: '-15%',
    right: '-15%',
    borderTopLeftRadius: 600,
    borderTopRightRadius: 600,
  },
  hillBack: { bottom: '34%', height: 220 },
  hillMid: { bottom: '22%', height: 240 },
  hillFront: { bottom: 0, height: 320, overflow: 'hidden' },
  row: {
    position: 'absolute',
    top: 40,
    alignSelf: 'center',
    width: 2,
    height: 260,
    backgroundColor: 'rgba(255,255,255,0.06)',
  },
  scrim: { position: 'absolute', left: 0, right: 0, bottom: 0, height: '70%' },
});
