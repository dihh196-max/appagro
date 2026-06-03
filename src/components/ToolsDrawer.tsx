import { useEffect, useRef } from 'react';
import {
  Modal,
  View,
  Text,
  StyleSheet,
  Pressable,
  ScrollView,
  Animated,
  useWindowDimensions,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { modules, moduleCategories } from '../data/modules';
import { colors, spacing, radius, font } from '../theme/theme';

type Props = {
  open: boolean;
  onClose: () => void;
  onSelect?: (key: string) => void;
};

/** Menu lateral (hambúrguer) com o catálogo de ferramentas por categoria. */
export function ToolsDrawer({ open, onClose, onSelect }: Props) {
  const { width } = useWindowDimensions();
  const insets = useSafeAreaInsets();
  const panelWidth = Math.min(width * 0.82, 360);

  const translateX = useRef(new Animated.Value(-panelWidth)).current;
  const backdrop = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(translateX, {
        toValue: open ? 0 : -panelWidth,
        duration: 240,
        useNativeDriver: true,
      }),
      Animated.timing(backdrop, {
        toValue: open ? 1 : 0,
        duration: 240,
        useNativeDriver: true,
      }),
    ]).start();
  }, [open, panelWidth, translateX, backdrop]);

  return (
    <Modal visible={open} transparent animationType="none" onRequestClose={onClose}>
      <View style={styles.root}>
        <Animated.View style={[styles.backdrop, { opacity: backdrop }]}>
          <Pressable style={{ flex: 1 }} onPress={onClose} />
        </Animated.View>

        <Animated.View
          style={[
            styles.panel,
            { width: panelWidth, paddingTop: insets.top + spacing.lg, transform: [{ translateX }] },
          ]}
        >
          <View style={styles.header}>
            <Text style={styles.brand}>
              Agro<Text style={{ color: colors.primary }}>Net</Text>
            </Text>
            <Pressable onPress={onClose} hitSlop={10} style={styles.closeBtn}>
              <Ionicons name="close" size={22} color={colors.text} />
            </Pressable>
          </View>
          <Text style={styles.subtitle}>Ferramentas</Text>

          <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.list}>
            {moduleCategories.map((cat) => (
              <View key={cat} style={styles.group}>
                <Text style={styles.groupTitle}>{cat}</Text>
                {modules
                  .filter((m) => m.category === cat)
                  .map((m) => (
                    <Pressable
                      key={m.key}
                      style={({ pressed }) => [styles.item, pressed && styles.itemPressed]}
                      onPress={() => {
                        onSelect?.(m.key);
                        onClose();
                      }}
                    >
                      <View style={[styles.itemIcon, { backgroundColor: m.color }]}>
                        <Ionicons name={m.icon} size={16} color="#fff" />
                      </View>
                      <Text style={styles.itemLabel}>{m.label}</Text>
                      <Ionicons name="chevron-forward" size={16} color={colors.textMuted} />
                    </Pressable>
                  ))}
              </View>
            ))}
          </ScrollView>
        </Animated.View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, flexDirection: 'row' },
  backdrop: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.55)',
  },
  panel: {
    backgroundColor: colors.bgGradientBottom,
    borderRightWidth: 1,
    borderRightColor: colors.border,
    paddingHorizontal: spacing.lg,
  },
  header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  brand: { color: colors.text, fontSize: font.sizes.xl, fontWeight: '800' },
  closeBtn: {
    width: 36,
    height: 36,
    borderRadius: 999,
    backgroundColor: colors.card,
    alignItems: 'center',
    justifyContent: 'center',
  },
  subtitle: { color: colors.textMuted, fontSize: font.sizes.sm, marginTop: spacing.xs },
  list: { paddingTop: spacing.lg, paddingBottom: spacing.xxl },
  group: { marginBottom: spacing.lg },
  groupTitle: {
    color: colors.primary,
    fontSize: font.sizes.xs,
    fontWeight: '800',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    marginBottom: spacing.sm,
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
    paddingVertical: spacing.sm,
  },
  itemPressed: { opacity: 0.6 },
  itemIcon: {
    width: 34,
    height: 34,
    borderRadius: radius.sm,
    alignItems: 'center',
    justifyContent: 'center',
  },
  itemLabel: { flex: 1, color: colors.text, fontSize: font.sizes.md, fontWeight: '600' },
});
