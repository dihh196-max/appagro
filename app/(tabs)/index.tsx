import { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Pressable } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Card } from '../../src/components/Card';
import { ToolsDrawer } from '../../src/components/ToolsDrawer';
import { quotes } from '../../src/data/modules';
import { colors, spacing, radius, font } from '../../src/theme/theme';

const ARTICLES = [
  {
    tag: 'Artigos',
    title: 'Os principais indicadores econômicos observados pelos bancos',
    author: 'Robinson Perego',
  },
  {
    tag: 'Análises',
    title: 'Consultoria de Planejamento de Custeio Agrícola',
    author: 'Flávio Mesquita',
  },
];

export default function Home() {
  const insets = useSafeAreaInsets();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <LinearGradient
      colors={[colors.bgGradientTop, colors.bg, colors.bgGradientBottom]}
      style={{ flex: 1 }}
    >
      <ToolsDrawer open={menuOpen} onClose={() => setMenuOpen(false)} />
      <ScrollView
        contentContainerStyle={{ paddingTop: insets.top + spacing.md, paddingBottom: spacing.xxl }}
        showsVerticalScrollIndicator={false}
      >
        {/* Cabeçalho */}
        <View style={styles.header}>
          <View style={styles.userRow}>
            <Pressable
              testID="open-menu"
              onPress={() => setMenuOpen(true)}
              hitSlop={10}
              style={styles.menuBtn}
            >
              <Ionicons name="menu" size={24} color={colors.text} />
            </Pressable>
            <View style={styles.avatar}>
              <Ionicons name="person" size={20} color={colors.primary} />
            </View>
            <View>
              <Text style={styles.greeting}>Bom dia,</Text>
              <Text style={styles.userName}>Francisco</Text>
            </View>
          </View>
          <View style={styles.headerActions}>
            <Pressable style={styles.subsPill}>
              <Text style={styles.subsText}>Assinaturas</Text>
            </Pressable>
            <Pressable style={styles.bell}>
              <Ionicons name="notifications" size={20} color={colors.text} />
              <View style={styles.badge} />
            </Pressable>
          </View>
        </View>

        {/* Cotações */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.ticker}
        >
          {quotes.map((q) => {
            const up = q.change >= 0;
            return (
              <View key={q.symbol} style={styles.tickerItem}>
                <Text style={styles.tickerLabel}>{q.symbol}</Text>
                <Text style={styles.tickerValue}>{q.value}</Text>
                <Text style={[styles.tickerChange, { color: up ? colors.up : colors.down }]}>
                  {up ? '▲' : '▼'} {Math.abs(q.change).toFixed(2)}%
                </Text>
              </View>
            );
          })}
        </ScrollView>

        {/* Cards destaque: notícia + clima + dólar */}
        <View style={styles.heroRow}>
          <Card style={styles.heroNews}>
            <Text style={styles.heroNewsTag}>Mercado</Text>
            <Text style={styles.heroNewsText}>
              Soja em Chicago (CBOT) sobe +50 pontos e consolida maior alta semanal em 18 anos.
            </Text>
          </Card>
          <View style={styles.heroSide}>
            <Card style={styles.weatherCard}>
              <Text style={styles.weatherCity}>Vilhena</Text>
              <View style={styles.weatherTempRow}>
                <Text style={styles.weatherTemp}>16°</Text>
                <Ionicons name="rainy" size={22} color={colors.primary} />
              </View>
              <Text style={styles.weatherDate}>Sex, 09 Dez</Text>
            </Card>
            <Card style={styles.usdCard}>
              <Text style={styles.usdLabel}>USD/BRL</Text>
              <Text style={styles.usdValue}>5,3011</Text>
              <Text style={[styles.usdChange, { color: colors.down }]}>-1,75%</Text>
            </Card>
          </View>
        </View>

        {/* Alerta climático */}
        <Pressable style={styles.alert}>
          <View style={styles.alertIcon}>
            <Ionicons name="warning" size={18} color={colors.warning} />
          </View>
          <View style={{ flex: 1 }}>
            <Text style={styles.alertTitle}>Alerta Climático</Text>
            <Text style={styles.alertText}>
              Chuvas previstas nos próximos 3 dias. Evite pulverizações.
            </Text>
          </View>
          <Ionicons name="chevron-forward" size={18} color={colors.textMuted} />
        </Pressable>

        {/* Comunidade */}
        <Pressable style={styles.communityWrap}>
          <LinearGradient
            colors={[colors.primaryDark, colors.primary]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.community}
          >
            <View style={{ flex: 1 }}>
              <Text style={styles.communityTitle}>Faça parte da nossa comunidade!</Text>
              <Text style={styles.communitySub}>Conecte-se com outros produtores e técnicos.</Text>
            </View>
            <Ionicons name="people" size={32} color={colors.bg} />
          </LinearGradient>
        </Pressable>

        {/* Feed de conteúdo */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Para você</Text>
        </View>
        {ARTICLES.map((a, i) => (
          <Pressable key={i} style={styles.articleRow}>
            <View style={styles.articleThumb}>
              <Ionicons name="image" size={22} color={colors.textMuted} />
            </View>
            <View style={{ flex: 1 }}>
              <Text style={styles.articleTag}>{a.tag}</Text>
              <Text style={styles.articleTitle} numberOfLines={2}>
                {a.title}
              </Text>
              <Text style={styles.articleAuthor}>{a.author}</Text>
            </View>
          </Pressable>
        ))}

        {/* Dica do dia */}
        <View style={styles.tip}>
          <Text style={styles.tipTitle}>💡 DICA DO DIA</Text>
          <Text style={styles.tipText}>
            A ferrugem asiática da soja pode causar perdas de até 80% sem o manejo adequado de
            fungicidas.
          </Text>
        </View>
      </ScrollView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: spacing.lg,
    marginBottom: spacing.lg,
  },
  userRow: { flexDirection: 'row', alignItems: 'center', gap: spacing.md },
  menuBtn: {
    width: 40,
    height: 40,
    borderRadius: radius.md,
    backgroundColor: colors.card,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: colors.border,
  },
  avatar: {
    width: 44,
    height: 44,
    borderRadius: 999,
    backgroundColor: colors.card,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: colors.borderStrong,
  },
  greeting: { color: colors.textMuted, fontSize: font.sizes.sm },
  userName: { color: colors.text, fontSize: font.sizes.lg, fontWeight: '800' },
  headerActions: { flexDirection: 'row', alignItems: 'center', gap: spacing.md },
  subsPill: {
    backgroundColor: colors.primarySoft,
    borderRadius: radius.pill,
    paddingHorizontal: spacing.md,
    paddingVertical: 6,
    borderWidth: 1,
    borderColor: colors.borderStrong,
  },
  subsText: { color: colors.primary, fontSize: font.sizes.sm, fontWeight: '700' },
  bell: {
    width: 40,
    height: 40,
    borderRadius: 999,
    backgroundColor: colors.card,
    alignItems: 'center',
    justifyContent: 'center',
  },
  badge: {
    position: 'absolute',
    top: 8,
    right: 9,
    width: 9,
    height: 9,
    borderRadius: 999,
    backgroundColor: colors.down,
  },
  ticker: { paddingHorizontal: spacing.lg, gap: spacing.md, paddingBottom: spacing.lg },
  tickerItem: {
    backgroundColor: colors.card,
    borderRadius: radius.md,
    borderWidth: 1,
    borderColor: colors.border,
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
    minWidth: 110,
  },
  tickerLabel: { color: colors.textMuted, fontSize: font.sizes.xs, fontWeight: '700' },
  tickerValue: { color: colors.text, fontSize: font.sizes.lg, fontWeight: '800', marginTop: 2 },
  tickerChange: { fontSize: font.sizes.xs, fontWeight: '700', marginTop: 2 },
  heroRow: { flexDirection: 'row', gap: spacing.md, paddingHorizontal: spacing.lg },
  heroNews: { flex: 1.3, justifyContent: 'space-between' },
  heroNewsTag: { color: colors.primary, fontSize: font.sizes.xs, fontWeight: '800' },
  heroNewsText: {
    color: colors.text,
    fontSize: font.sizes.md,
    fontWeight: '600',
    lineHeight: 20,
    marginTop: spacing.sm,
  },
  heroSide: { flex: 1, gap: spacing.md },
  weatherCard: { paddingVertical: spacing.md },
  weatherCity: { color: colors.textMuted, fontSize: font.sizes.sm, fontWeight: '600' },
  weatherTempRow: { flexDirection: 'row', alignItems: 'center', gap: spacing.sm },
  weatherTemp: { color: colors.text, fontSize: font.sizes.xxl, fontWeight: '800' },
  weatherDate: { color: colors.textMuted, fontSize: font.sizes.xs },
  usdCard: { paddingVertical: spacing.md },
  usdLabel: { color: colors.textMuted, fontSize: font.sizes.sm, fontWeight: '600' },
  usdValue: { color: colors.text, fontSize: font.sizes.lg, fontWeight: '800' },
  usdChange: { fontSize: font.sizes.xs, fontWeight: '700' },
  alert: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
    marginHorizontal: spacing.lg,
    marginTop: spacing.lg,
    backgroundColor: 'rgba(255,200,87,0.08)',
    borderWidth: 1,
    borderColor: 'rgba(255,200,87,0.3)',
    borderRadius: radius.md,
    padding: spacing.lg,
  },
  alertIcon: {
    width: 34,
    height: 34,
    borderRadius: 999,
    backgroundColor: 'rgba(255,200,87,0.15)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  alertTitle: { color: colors.text, fontSize: font.sizes.md, fontWeight: '700' },
  alertText: { color: colors.textMuted, fontSize: font.sizes.sm, marginTop: 2 },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: spacing.lg,
    marginTop: spacing.xl,
    marginBottom: spacing.md,
  },
  sectionTitle: { color: colors.text, fontSize: font.sizes.lg, fontWeight: '800' },
  communityWrap: { paddingHorizontal: spacing.lg, marginTop: spacing.xl },
  community: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
    borderRadius: radius.lg,
    padding: spacing.lg,
  },
  communityTitle: { color: colors.bg, fontSize: font.sizes.lg, fontWeight: '800' },
  communitySub: { color: 'rgba(10,26,47,0.8)', fontSize: font.sizes.sm, marginTop: 2 },
  articleRow: {
    flexDirection: 'row',
    gap: spacing.md,
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
  },
  articleThumb: {
    width: 64,
    height: 64,
    borderRadius: radius.md,
    backgroundColor: colors.card,
    alignItems: 'center',
    justifyContent: 'center',
  },
  articleTag: { color: colors.primary, fontSize: font.sizes.xs, fontWeight: '800' },
  articleTitle: { color: colors.text, fontSize: font.sizes.md, fontWeight: '600', marginTop: 2 },
  articleAuthor: { color: colors.textMuted, fontSize: font.sizes.xs, marginTop: 4 },
  tip: {
    marginHorizontal: spacing.lg,
    marginTop: spacing.xl,
    backgroundColor: colors.primarySoft,
    borderRadius: radius.md,
    padding: spacing.lg,
    borderWidth: 1,
    borderColor: colors.border,
  },
  tipTitle: { color: colors.primary, fontSize: font.sizes.sm, fontWeight: '800' },
  tipText: { color: colors.textMuted, fontSize: font.sizes.sm, marginTop: spacing.sm, lineHeight: 20 },
});
