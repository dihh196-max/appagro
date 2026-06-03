import { ReactNode } from 'react';
import { View, StyleSheet, Pressable, ViewStyle } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../theme/theme';

type Props = {
  icon: keyof typeof Ionicons.glyphMap;
  /** Diâmetro do círculo. */
  size?: number;
  /** Tamanho do glifo. Padrão: 50% do `size`. */
  iconSize?: number;
  /** Cor da borda e do ícone. Padrão: verde da marca. */
  color?: string;
  /** Estado "selecionado" — preenche o círculo com tint suave. */
  active?: boolean;
  /** Mostra um ponto vermelho de notificação. */
  badge?: boolean;
  onPress?: () => void;
  style?: ViewStyle;
  testID?: string;
};

/**
 * Ícone "branco" envolto por uma borda colorida em círculo — a assinatura
 * visual do app (header, ações do feed, abas inferiores).
 */
export function CircleIconButton({
  icon,
  size = 40,
  iconSize,
  color = colors.primary,
  active = false,
  badge = false,
  onPress,
  style,
  testID,
}: Props) {
  const content: ReactNode = (
    <View
      style={[
        styles.wrap,
        {
          width: size,
          height: size,
          borderRadius: size / 2,
          borderColor: color,
          backgroundColor: active ? 'rgba(46,227,138,0.15)' : 'transparent',
        },
        style,
      ]}
    >
      <Ionicons
        name={icon}
        size={iconSize ?? Math.round(size * 0.5)}
        color={active ? color : '#FFFFFF'}
      />
      {badge && <View style={styles.badge} />}
    </View>
  );

  if (!onPress) return content;
  return (
    <Pressable
      hitSlop={6}
      onPress={onPress}
      testID={testID}
      style={({ pressed }) => pressed && { opacity: 0.7 }}
    >
      {content}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  wrap: {
    borderWidth: 1.5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  badge: {
    position: 'absolute',
    top: 4,
    right: 4,
    width: 9,
    height: 9,
    borderRadius: 999,
    backgroundColor: '#FF6B6B',
  },
});
