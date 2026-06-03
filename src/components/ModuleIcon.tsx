import { View, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { hexToRgba } from '../utils/color';
import { radius } from '../theme/theme';

type Props = {
  icon: keyof typeof Ionicons.glyphMap;
  color: string;
  size?: number;
};

/**
 * Ícone de módulo com estética clean: fundo com leve tint da cor do módulo
 * e o glifo na própria cor — mais leve e elegante que os blocos saturados.
 */
export function ModuleIcon({ icon, color, size = 44 }: Props) {
  return (
    <View
      style={[
        styles.wrap,
        {
          width: size,
          height: size,
          borderRadius: size * 0.32,
          backgroundColor: hexToRgba(color, 0.14),
          borderColor: hexToRgba(color, 0.28),
        },
      ]}
    >
      <Ionicons name={icon} size={size * 0.5} color={color} />
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderRadius: radius.md,
  },
});
