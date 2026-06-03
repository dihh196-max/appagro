import { useRef, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Pressable,
  useWindowDimensions,
  NativeSyntheticEvent,
  NativeScrollEvent,
} from 'react-native';
import { router } from 'expo-router';
import { Screen } from '../src/components/Screen';
import { EcosystemHero } from '../src/components/EcosystemHero';
import { colors, spacing, radius, font } from '../src/theme/theme';

const SLIDES = [
  {
    title: 'Tudo que você precisa para simplificar e conectar o seu trabalho',
    subtitle: 'O AgroNet é um ecossistema simples, interativo e inteligente.',
  },
  {
    title: 'Clima, cotações e mercado em tempo real',
    subtitle: 'Acompanhe o que move a sua lavoura sem sair do app.',
  },
  {
    title: 'Calculadoras, laudos e gestão da fazenda',
    subtitle: 'Ferramentas técnicas para decisões mais precisas no campo.',
  },
  {
    title: 'Inteligência artificial a serviço do agro',
    subtitle: 'Identifique pragas, tire dúvidas e otimize a produção com a AgroIA.',
  },
];

export default function Onboarding() {
  const { width } = useWindowDimensions();
  const [index, setIndex] = useState(0);
  const scrollRef = useRef<ScrollView>(null);

  const onScroll = (e: NativeSyntheticEvent<NativeScrollEvent>) => {
    const i = Math.round(e.nativeEvent.contentOffset.x / width);
    if (i !== index) setIndex(i);
  };

  return (
    <Screen>
      <View style={styles.brandRow}>
        <Text style={styles.brand}>
          Agro<Text style={{ color: colors.primary }}>Net</Text>
        </Text>
      </View>

      <ScrollView
        ref={scrollRef}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onScroll={onScroll}
        scrollEventThrottle={16}
        style={{ flexGrow: 0 }}
      >
        {SLIDES.map((slide, i) => (
          <View key={i} style={[styles.slide, { width }]}>
            <View style={styles.heroWrap}>
              <EcosystemHero />
            </View>
            <Text style={styles.tagline}>Tudo em um só lugar!</Text>
            <Text style={styles.title}>{slide.title}</Text>
            <Text style={styles.subtitle}>{slide.subtitle}</Text>
          </View>
        ))}
      </ScrollView>

      <View style={styles.dots}>
        {SLIDES.map((_, i) => (
          <View key={i} style={[styles.dot, i === index && styles.dotActive]} />
        ))}
      </View>

      <View style={styles.footer}>
        <Pressable
          style={({ pressed }) => [styles.primaryBtn, pressed && styles.pressed]}
          onPress={() => router.push('/(auth)/login')}
        >
          <Text style={styles.primaryBtnText}>Acesse</Text>
        </Pressable>
        <Pressable onPress={() => router.push('/(auth)/register')} hitSlop={12}>
          <Text style={styles.secondaryLink}>Cadastre-se</Text>
        </Pressable>
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  brandRow: { alignItems: 'center', paddingTop: spacing.lg },
  brand: { color: colors.text, fontSize: font.sizes.xl, fontWeight: '800', letterSpacing: 0.5 },
  slide: { alignItems: 'center', paddingHorizontal: spacing.xl, paddingTop: spacing.xl },
  heroWrap: { marginVertical: spacing.xl },
  tagline: {
    color: colors.primary,
    fontSize: font.sizes.lg,
    fontWeight: '700',
    marginBottom: spacing.md,
  },
  title: {
    color: colors.text,
    fontSize: font.sizes.xl,
    fontWeight: '800',
    textAlign: 'center',
    lineHeight: 30,
  },
  subtitle: {
    color: colors.textMuted,
    fontSize: font.sizes.md,
    textAlign: 'center',
    marginTop: spacing.md,
    lineHeight: 22,
  },
  dots: { flexDirection: 'row', justifyContent: 'center', gap: 8, paddingVertical: spacing.lg },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 999,
    backgroundColor: 'rgba(255,255,255,0.2)',
  },
  dotActive: { backgroundColor: colors.primary, width: 22 },
  footer: { paddingHorizontal: spacing.xl, paddingBottom: spacing.lg, gap: spacing.lg },
  primaryBtn: {
    backgroundColor: colors.primary,
    borderRadius: radius.pill,
    paddingVertical: spacing.lg,
    alignItems: 'center',
  },
  primaryBtnText: { color: colors.bg, fontSize: font.sizes.lg, fontWeight: '800' },
  pressed: { opacity: 0.85 },
  secondaryLink: {
    color: colors.text,
    fontSize: font.sizes.md,
    fontWeight: '600',
    textAlign: 'center',
  },
});
