import { View, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../theme/theme';

const ORBIT_ICONS: Array<{ name: keyof typeof Ionicons.glyphMap; ring: 0 | 1 }> = [
  { name: 'partly-sunny', ring: 0 },
  { name: 'leaf', ring: 0 },
  { name: 'water', ring: 0 },
  { name: 'bar-chart', ring: 0 },
  { name: 'bug', ring: 0 },
  { name: 'calculator', ring: 0 },
  { name: 'newspaper', ring: 1 },
  { name: 'wallet', ring: 1 },
  { name: 'school', ring: 1 },
  { name: 'flask', ring: 1 },
  { name: 'cube', ring: 1 },
  { name: 'calendar', ring: 1 },
];

const SIZE = 260;
const CENTER = SIZE / 2;

/** Logo central com ícones dos módulos orbitando — identidade visual do app. */
export function EcosystemHero() {
  const inner = ORBIT_ICONS.filter((i) => i.ring === 0);
  const outer = ORBIT_ICONS.filter((i) => i.ring === 1);

  const renderRing = (
    items: typeof ORBIT_ICONS,
    radius: number,
    offset: number,
    iconSize: number,
  ) =>
    items.map((item, idx) => {
      const angle = (idx / items.length) * Math.PI * 2 + offset;
      const x = CENTER + radius * Math.cos(angle) - iconSize / 2;
      const y = CENTER + radius * Math.sin(angle) - iconSize / 2;
      return (
        <View
          key={`${String(item.name)}-${idx}`}
          style={[styles.orbitIcon, { left: x, top: y, width: iconSize, height: iconSize }]}
        >
          <Ionicons name={item.name} size={iconSize * 0.5} color={colors.primary} />
        </View>
      );
    });

  return (
    <View style={styles.wrap}>
      <View style={[styles.ring, styles.ringOuter]} />
      <View style={[styles.ring, styles.ringInner]} />
      {renderRing(outer, 118, -0.4, 40)}
      {renderRing(inner, 74, 0.3, 44)}
      <View style={styles.logo}>
        <Ionicons name="trending-up" size={48} color={colors.primary} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: { width: SIZE, height: SIZE, alignItems: 'center', justifyContent: 'center' },
  ring: {
    position: 'absolute',
    borderRadius: 999,
    borderWidth: 1,
    borderColor: 'rgba(46,227,138,0.18)',
    borderStyle: 'dashed',
  },
  ringOuter: { width: 236, height: 236 },
  ringInner: { width: 148, height: 148 },
  orbitIcon: {
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 999,
    backgroundColor: colors.card,
    borderWidth: 1,
    borderColor: colors.borderStrong,
  },
  logo: {
    width: 92,
    height: 92,
    borderRadius: 999,
    backgroundColor: colors.card,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1.5,
    borderColor: colors.primary,
    shadowColor: colors.primary,
    shadowOpacity: 0.6,
    shadowRadius: 24,
    shadowOffset: { width: 0, height: 0 },
  },
});
