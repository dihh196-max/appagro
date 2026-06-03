import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Screen } from './Screen';
import { colors, spacing, font } from '../theme/theme';

type Props = {
  title: string;
  icon: keyof typeof Ionicons.glyphMap;
  description?: string;
};

/** Tela base para módulos ainda não implementados. */
export function Placeholder({ title, icon, description }: Props) {
  return (
    <Screen>
      <View style={styles.wrap}>
        <View style={styles.iconWrap}>
          <Ionicons name={icon} size={40} color={colors.primary} />
        </View>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.desc}>
          {description ?? 'Esta tela será construída a partir dos seus prints.'}
        </Text>
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  wrap: { flex: 1, alignItems: 'center', justifyContent: 'center', padding: spacing.xl, gap: spacing.lg },
  iconWrap: {
    width: 88,
    height: 88,
    borderRadius: 999,
    backgroundColor: colors.card,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: colors.borderStrong,
  },
  title: { color: colors.text, fontSize: font.sizes.xxl, fontWeight: '800' },
  desc: { color: colors.textMuted, fontSize: font.sizes.md, textAlign: 'center', lineHeight: 22 },
});
