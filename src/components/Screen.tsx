import { ReactNode } from 'react';
import { StyleSheet, ViewStyle } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { SafeAreaView, Edge } from 'react-native-safe-area-context';
import { colors } from '../theme/theme';

type Props = {
  children: ReactNode;
  edges?: Edge[];
  style?: ViewStyle;
};

/** Fundo padrão do app: gradiente azul-marinho + safe area. */
export function Screen({ children, edges = ['top', 'bottom'], style }: Props) {
  return (
    <LinearGradient
      colors={[colors.bgGradientTop, colors.bg, colors.bgGradientBottom]}
      style={styles.gradient}
    >
      <SafeAreaView edges={edges} style={[styles.safe, style]}>
        {children}
      </SafeAreaView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  gradient: { flex: 1 },
  safe: { flex: 1 },
});
