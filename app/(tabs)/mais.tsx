import { View, Text, StyleSheet, ScrollView, Pressable } from 'react-native';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { modules } from '../../src/data/modules';
import { colors, spacing, radius, font } from '../../src/theme/theme';

export default function Mais() {
  const insets = useSafeAreaInsets();

  return (
    <LinearGradient
      colors={[colors.bgGradientTop, colors.bg, colors.bgGradientBottom]}
      style={{ flex: 1 }}
    >
      <ScrollView
        contentContainerStyle={{ paddingTop: insets.top + spacing.lg, paddingBottom: spacing.xxl }}
        showsVerticalScrollIndicator={false}
      >
        <Text style={styles.title}>Mais</Text>
        <Text style={styles.subtitle}>Todos os módulos do AgroNet.</Text>

        <View style={styles.list}>
          {modules.map((m) => (
            <Pressable key={m.key} style={styles.row}>
              <View style={[styles.icon, { backgroundColor: m.color }]}>
                <Ionicons name={m.icon} size={18} color="#fff" />
              </View>
              <Text style={styles.rowLabel}>{m.label}</Text>
              <Ionicons name="chevron-forward" size={18} color={colors.textMuted} />
            </Pressable>
          ))}
        </View>

        <Pressable style={styles.logout} onPress={() => router.replace('/onboarding')}>
          <Ionicons name="log-out-outline" size={18} color={colors.down} />
          <Text style={styles.logoutText}>Sair da conta</Text>
        </Pressable>
      </ScrollView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  title: { color: colors.text, fontSize: font.sizes.xxl, fontWeight: '800', paddingHorizontal: spacing.lg },
  subtitle: { color: colors.textMuted, fontSize: font.sizes.md, paddingHorizontal: spacing.lg, marginTop: 2 },
  list: { marginTop: spacing.xl, paddingHorizontal: spacing.lg, gap: spacing.sm },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
    backgroundColor: colors.card,
    borderRadius: radius.md,
    borderWidth: 1,
    borderColor: colors.border,
    padding: spacing.md,
  },
  icon: { width: 36, height: 36, borderRadius: radius.sm, alignItems: 'center', justifyContent: 'center' },
  rowLabel: { flex: 1, color: colors.text, fontSize: font.sizes.md, fontWeight: '600' },
  logout: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: spacing.sm,
    marginTop: spacing.xl,
    marginHorizontal: spacing.lg,
    paddingVertical: spacing.lg,
  },
  logoutText: { color: colors.down, fontSize: font.sizes.md, fontWeight: '700' },
});
