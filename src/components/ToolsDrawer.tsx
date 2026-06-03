import { useEffect, useRef, useState } from 'react';
import {
  Modal,
  View,
  Text,
  StyleSheet,
  Pressable,
  ScrollView,
  Animated,
  useWindowDimensions,
  LayoutAnimation,
  Platform,
  UIManager,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import {
  modules,
  moduleCategories,
  categoryMeta,
  type ModuleCategory,
} from '../data/modules';
import { ModuleIcon } from './ModuleIcon';
import { colors, spacing, radius, font } from '../theme/theme';

if (
  Platform.OS === 'android' &&
  UIManager.setLayoutAnimationEnabledExperimental
) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

type Props = {
  open: boolean;
  onClose: () => void;
  onSelect?: (key: string) => void;
};

/** Menu lateral com categorias em accordion — clique na categoria para expandir. */
export function ToolsDrawer({ open, onClose, onSelect }: Props) {
  const { width } = useWindowDimensions();
  const insets = useSafeAreaInsets();
  const panelWidth = Math.min(width * 0.82, 360);

  const [expanded, setExpanded] = useState<ModuleCategory | null>(null);

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
    // Colapsa categorias toda vez que o menu fecha.
    if (!open) setExpanded(null);
  }, [open, panelWidth, translateX, backdrop]);

  const toggle = (cat: ModuleCategory) => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setExpanded((curr) => (curr === cat ? null : cat));
  };

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
            {moduleCategories.map((cat) => {
              const isOpen = expanded === cat;
              const items = modules.filter((m) => m.category === cat);
              const meta = categoryMeta[cat];
              return (
                <View key={cat} style={styles.group}>
                  <Pressable
                    style={({ pressed }) => [styles.catRow, pressed && styles.pressed]}
                    onPress={() => toggle(cat)}
                  >
                    <View style={styles.catIcon}>
                      <Ionicons name={meta.icon} size={20} color={colors.primary} />
                    </View>
                    <View style={{ flex: 1 }}>
                      <Text style={styles.catTitle}>{cat}</Text>
                      <Text style={styles.catDesc}>{meta.description}</Text>
                    </View>
                    <Ionicons
                      name={isOpen ? 'chevron-up' : 'chevron-down'}
                      size={18}
                      color={colors.textMuted}
                    />
                  </Pressable>

                  {isOpen && (
                    <View style={styles.itemsWrap}>
                      {items.map((m) => (
                        <Pressable
                          key={m.key}
                          style={({ pressed }) => [styles.item, pressed && styles.pressed]}
                          onPress={() => {
                            onSelect?.(m.key);
                            onClose();
                          }}
                        >
                          <View style={styles.itemIconWrap}>
                            <ModuleIcon icon={m.icon} size={20} />
                          </View>
                          <Text style={styles.itemLabel}>{m.label}</Text>
                          <Ionicons name="chevron-forward" size={14} color={colors.textMuted} />
                        </Pressable>
                      ))}
                    </View>
                  )}
                </View>
              );
            })}
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
  group: { marginBottom: spacing.sm },
  catRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.md,
    borderRadius: radius.md,
    backgroundColor: colors.card,
    borderWidth: 1,
    borderColor: colors.border,
  },
  pressed: { opacity: 0.7 },
  catIcon: {
    width: 36,
    height: 36,
    borderRadius: radius.sm,
    backgroundColor: colors.primarySoft,
    alignItems: 'center',
    justifyContent: 'center',
  },
  catTitle: { color: colors.text, fontSize: font.sizes.md, fontWeight: '800' },
  catDesc: { color: colors.textMuted, fontSize: font.sizes.xs, marginTop: 2 },
  itemsWrap: { paddingLeft: spacing.xl, paddingTop: spacing.sm, paddingBottom: spacing.sm },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
    paddingVertical: spacing.sm,
  },
  itemIconWrap: { width: 26, alignItems: 'center' },
  itemLabel: { flex: 1, color: colors.text, fontSize: font.sizes.md, fontWeight: '500' },
});
