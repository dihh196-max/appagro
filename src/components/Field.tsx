import { View, Text, TextInput, StyleSheet, TextInputProps } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors, radius, spacing, font } from '../theme/theme';

type Props = TextInputProps & {
  label: string;
  icon?: keyof typeof Ionicons.glyphMap;
  /** 'solid' (padrão) usa o card escuro; 'glass' fica translúcido com borda
   *  verde — combina por cima de uma foto de fundo. */
  variant?: 'solid' | 'glass';
};

export function Field({ label, icon, style, variant = 'solid', ...rest }: Props) {
  const glass = variant === 'glass';
  return (
    <View style={styles.wrap}>
      <Text style={[styles.label, glass && styles.labelGlass]}>{label}</Text>
      <View style={[styles.inputRow, glass && styles.inputRowGlass]}>
        {icon && (
          <Ionicons
            name={icon}
            size={18}
            color={glass ? colors.primary : colors.textMuted}
            style={styles.icon}
          />
        )}
        <TextInput
          placeholderTextColor={glass ? 'rgba(255,255,255,0.55)' : colors.textFaint}
          style={[styles.input, style]}
          {...rest}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: { gap: spacing.sm },
  label: { color: colors.textMuted, fontSize: font.sizes.sm, fontWeight: '600' },
  labelGlass: { color: '#FFFFFF' },
  inputRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.card,
    borderRadius: radius.md,
    borderWidth: 1,
    borderColor: colors.border,
    paddingHorizontal: spacing.lg,
  },
  inputRowGlass: {
    backgroundColor: 'rgba(8,22,39,0.55)',
    borderColor: 'rgba(46,227,138,0.6)',
    borderWidth: 1.5,
  },
  icon: { marginRight: spacing.md },
  input: {
    flex: 1,
    color: colors.text,
    fontSize: font.sizes.md,
    paddingVertical: spacing.lg,
  },
});
