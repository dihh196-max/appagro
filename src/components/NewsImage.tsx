import { useState } from 'react';
import { Image, StyleSheet, View, ViewStyle } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { hexToRgba } from '../utils/color';

type Props = {
  uri: string;
  accent: string;
  icon: keyof typeof Ionicons.glyphMap;
  iconSize?: number;
  style?: ViewStyle;
};

/**
 * Mostra a foto da notícia (via URL). Se a imagem falhar (sem rede, host
 * bloqueado, etc.), cai num fallback bonito: gradiente com a cor da categoria
 * e o ícone — o card continua parecendo intencional, não quebrado.
 */
export function NewsImage({ uri, accent, icon, iconSize = 28, style }: Props) {
  const [failed, setFailed] = useState(false);

  return (
    <View style={[styles.wrap, style]}>
      <LinearGradient
        colors={[hexToRgba(accent, 0.55), hexToRgba(accent, 0.15)]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={StyleSheet.absoluteFill}
      />
      {!failed && (
        <Image
          source={{ uri }}
          style={StyleSheet.absoluteFill}
          resizeMode="cover"
          onError={() => setFailed(true)}
        />
      )}
      {failed && (
        <View style={styles.center} pointerEvents="none">
          <Ionicons name={icon} size={iconSize} color="rgba(255,255,255,0.85)" />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: { overflow: 'hidden', backgroundColor: '#0F2238' },
  center: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
