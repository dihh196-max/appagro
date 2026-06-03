import { useMemo, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Pressable } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { ToolsDrawer } from '../../src/components/ToolsDrawer';
import { NewsImage } from '../../src/components/NewsImage';
import { quotes } from '../../src/data/modules';
import {
  news,
  newsCategories,
  stories,
  timeAgo,
  type NewsCategory,
  type NewsItem,
} from '../../src/data/news';
import { colors, spacing, radius, font } from '../../src/theme/theme';

export default function Home() {
  const insets = useSafeAreaInsets();
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeCat, setActiveCat] = useState<NewsCategory>('Destaques');
  const [liked, setLiked] = useState<Record<string, boolean>>({});
  const [saved, setSaved] = useState<Record<string, boolean>>({});

  const filtered = useMemo(
    () => (activeCat === 'Destaques' ? news : news.filter((n) => n.category === activeCat)),
    [activeCat],
  );
  const hero = filtered[0];
  const rest = filtered.slice(1);

  const toggleLike = (id: string) => setLiked((m) => ({ ...m, [id]: !m[id] }));
  const toggleSave = (id: string) => setSaved((m) => ({ ...m, [id]: !m[id] }));

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
            <Pressable style={styles.iconBtn} hitSlop={6}>
              <Ionicons name="search" size={18} color={colors.text} />
            </Pressable>
            <Pressable style={styles.iconBtn} hitSlop={6}>
              <Ionicons name="notifications" size={18} color={colors.text} />
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

        {/* Stories de tópicos */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.stories}
        >
          {stories.map((s) => (
            <Pressable key={s.id} style={styles.story}>
              <LinearGradient
                colors={[s.color, colors.primaryDark]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={styles.storyRing}
              >
                <View style={styles.storyInner}>
                  <Ionicons name={s.icon} size={22} color={s.color} />
                </View>
              </LinearGradient>
              <Text style={styles.storyLabel} numberOfLines={1}>
                {s.label}
              </Text>
            </Pressable>
          ))}
        </ScrollView>

        {/* Filtros de categoria do feed */}
        <View style={styles.feedHeader}>
          <Text style={styles.feedTitle}>Feed</Text>
          <Pressable hitSlop={6}>
            <Text style={styles.feedLink}>Ver todas</Text>
          </Pressable>
        </View>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.chips}
        >
          {newsCategories.map((c) => {
            const active = c === activeCat;
            return (
              <Pressable key={c} onPress={() => setActiveCat(c)} style={[styles.chip, active && styles.chipActive]}>
                <Text style={[styles.chipText, active && styles.chipTextActive]}>{c}</Text>
              </Pressable>
            );
          })}
        </ScrollView>

        {/* Hero do feed (notícia em destaque) */}
        {hero && (
          <Pressable style={styles.heroCard}>
            <NewsImage
              uri={hero.image}
              accent={hero.accent}
              icon={hero.icon}
              iconSize={56}
              style={styles.heroImg}
            />
            <LinearGradient
              colors={['transparent', 'rgba(8,22,39,0.9)', '#081627']}
              locations={[0, 0.6, 1]}
              style={styles.heroScrim}
            />
            <View style={styles.heroBadges}>
              <View style={[styles.tag, { backgroundColor: 'rgba(46,227,138,0.18)' }]}>
                <Text style={[styles.tagText, { color: colors.primary }]}>{hero.category}</Text>
              </View>
              {hero.hot && (
                <View style={[styles.tag, styles.tagHot]}>
                  <Ionicons name="flame" size={11} color={colors.bg} />
                  <Text style={styles.tagHotText}>Em alta</Text>
                </View>
              )}
            </View>
            <View style={styles.heroBody}>
              <Text style={styles.heroTitle} numberOfLines={3}>
                {hero.title}
              </Text>
              <View style={styles.metaRow}>
                <Text style={styles.metaText}>{hero.source}</Text>
                <View style={styles.dot} />
                <Text style={styles.metaText}>{timeAgo(hero.publishedAt)}</Text>
                <View style={styles.dot} />
                <Text style={styles.metaText}>{hero.readTime} min</Text>
              </View>
              <ArticleActions
                item={hero}
                liked={!!liked[hero.id]}
                saved={!!saved[hero.id]}
                onLike={() => toggleLike(hero.id)}
                onSave={() => toggleSave(hero.id)}
                onDark
              />
            </View>
          </Pressable>
        )}

        {/* Lista do feed */}
        {rest.map((n) => (
          <Pressable key={n.id} style={styles.itemRow}>
            <NewsImage uri={n.image} accent={n.accent} icon={n.icon} style={styles.itemThumb} />
            <View style={{ flex: 1 }}>
              <View style={styles.itemTopRow}>
                <Text style={[styles.itemCat, { color: n.accent }]}>{n.category.toUpperCase()}</Text>
                {n.hot && <Ionicons name="flame" size={12} color={colors.warning} />}
              </View>
              <Text style={styles.itemTitle} numberOfLines={2}>
                {n.title}
              </Text>
              <View style={styles.metaRow}>
                <Text style={styles.metaText}>{n.source}</Text>
                <View style={styles.dot} />
                <Text style={styles.metaText}>{timeAgo(n.publishedAt)}</Text>
              </View>
              <ArticleActions
                item={n}
                liked={!!liked[n.id]}
                saved={!!saved[n.id]}
                onLike={() => toggleLike(n.id)}
                onSave={() => toggleSave(n.id)}
              />
            </View>
          </Pressable>
        ))}

        {/* Comunidade (rodapé) */}
        <Pressable style={styles.communityWrap}>
          <LinearGradient
            colors={[colors.primaryDark, colors.primary]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.community}
          >
            <View style={{ flex: 1 }}>
              <Text style={styles.communityTitle}>Faça parte da comunidade</Text>
              <Text style={styles.communitySub}>Discuta cada notícia com outros produtores.</Text>
            </View>
            <Ionicons name="people" size={28} color={colors.bg} />
          </LinearGradient>
        </Pressable>
      </ScrollView>
    </LinearGradient>
  );
}

/** Linha de ações: curtir, comentários, salvar, compartilhar. */
function ArticleActions({
  item,
  liked,
  saved,
  onLike,
  onSave,
  onDark,
}: {
  item: NewsItem;
  liked: boolean;
  saved: boolean;
  onLike: () => void;
  onSave: () => void;
  onDark?: boolean;
}) {
  const muted = onDark ? 'rgba(255,255,255,0.7)' : colors.textMuted;
  return (
    <View style={styles.actions}>
      <Pressable onPress={onLike} hitSlop={6} style={styles.actionBtn}>
        <Ionicons
          name={liked ? 'heart' : 'heart-outline'}
          size={18}
          color={liked ? colors.down : muted}
        />
        <Text style={[styles.actionText, { color: muted }]}>{item.likes + (liked ? 1 : 0)}</Text>
      </Pressable>
      <Pressable hitSlop={6} style={styles.actionBtn}>
        <Ionicons name="chatbubble-outline" size={16} color={muted} />
        <Text style={[styles.actionText, { color: muted }]}>{item.comments}</Text>
      </Pressable>
      <View style={{ flex: 1 }} />
      <Pressable onPress={onSave} hitSlop={6} style={styles.actionBtn}>
        <Ionicons
          name={saved ? 'bookmark' : 'bookmark-outline'}
          size={16}
          color={saved ? colors.primary : muted}
        />
      </Pressable>
      <Pressable hitSlop={6} style={styles.actionBtn}>
        <Ionicons name="share-social-outline" size={16} color={muted} />
      </Pressable>
    </View>
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
    width: 40,
    height: 40,
    borderRadius: 999,
    backgroundColor: colors.card,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: colors.borderStrong,
  },
  greeting: { color: colors.textMuted, fontSize: font.sizes.sm },
  userName: { color: colors.text, fontSize: font.sizes.md, fontWeight: '800' },
  headerActions: { flexDirection: 'row', alignItems: 'center', gap: spacing.sm },
  iconBtn: {
    width: 38,
    height: 38,
    borderRadius: 999,
    backgroundColor: colors.card,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: colors.border,
  },
  badge: {
    position: 'absolute',
    top: 8,
    right: 9,
    width: 8,
    height: 8,
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
  alert: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
    marginHorizontal: spacing.lg,
    backgroundColor: 'rgba(255,200,87,0.08)',
    borderWidth: 1,
    borderColor: 'rgba(255,200,87,0.3)',
    borderRadius: radius.md,
    padding: spacing.md,
  },
  alertIcon: {
    width: 32,
    height: 32,
    borderRadius: 999,
    backgroundColor: 'rgba(255,200,87,0.15)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  alertTitle: { color: colors.text, fontSize: font.sizes.sm, fontWeight: '700' },
  alertText: { color: colors.textMuted, fontSize: font.sizes.xs, marginTop: 2 },
  stories: { paddingHorizontal: spacing.lg, paddingVertical: spacing.lg, gap: spacing.lg },
  story: { alignItems: 'center', width: 64 },
  storyRing: {
    width: 60,
    height: 60,
    borderRadius: 999,
    padding: 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  storyInner: {
    width: '100%',
    height: '100%',
    borderRadius: 999,
    backgroundColor: colors.bgGradientBottom,
    alignItems: 'center',
    justifyContent: 'center',
  },
  storyLabel: { color: colors.textMuted, fontSize: font.sizes.xs, marginTop: 6, fontWeight: '600' },
  feedHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: spacing.lg,
    marginTop: spacing.sm,
  },
  feedTitle: { color: colors.text, fontSize: font.sizes.xl, fontWeight: '800' },
  feedLink: { color: colors.primary, fontSize: font.sizes.sm, fontWeight: '700' },
  chips: { paddingHorizontal: spacing.lg, paddingVertical: spacing.md, gap: spacing.sm },
  chip: {
    paddingHorizontal: spacing.md,
    paddingVertical: 8,
    borderRadius: radius.pill,
    backgroundColor: colors.card,
    borderWidth: 1,
    borderColor: colors.border,
  },
  chipActive: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  chipText: { color: colors.textMuted, fontSize: font.sizes.sm, fontWeight: '600' },
  chipTextActive: { color: colors.bg, fontWeight: '800' },

  heroCard: {
    marginHorizontal: spacing.lg,
    marginTop: spacing.sm,
    borderRadius: radius.lg,
    overflow: 'hidden',
    backgroundColor: colors.card,
    borderWidth: 1,
    borderColor: colors.border,
  },
  heroImg: { width: '100%', height: 220 },
  heroScrim: { position: 'absolute', left: 0, right: 0, top: 60, bottom: 0 },
  heroBadges: {
    position: 'absolute',
    top: spacing.md,
    left: spacing.md,
    flexDirection: 'row',
    gap: spacing.sm,
  },
  tag: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: radius.pill,
  },
  tagText: { fontSize: 11, fontWeight: '800', letterSpacing: 0.4 },
  tagHot: {
    backgroundColor: colors.warning,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  tagHotText: { color: colors.bg, fontSize: 11, fontWeight: '800' },
  heroBody: { padding: spacing.lg, gap: spacing.sm },
  heroTitle: { color: colors.text, fontSize: font.sizes.lg, fontWeight: '800', lineHeight: 24 },

  itemRow: {
    flexDirection: 'row',
    gap: spacing.md,
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.lg,
    paddingBottom: spacing.md,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: colors.border,
  },
  itemThumb: { width: 96, height: 96, borderRadius: radius.md },
  itemTopRow: { flexDirection: 'row', alignItems: 'center', gap: spacing.sm },
  itemCat: { fontSize: 10, fontWeight: '800', letterSpacing: 0.5 },
  itemTitle: { color: colors.text, fontSize: font.sizes.md, fontWeight: '700', marginTop: 4, lineHeight: 20 },

  metaRow: { flexDirection: 'row', alignItems: 'center', gap: 6, marginTop: spacing.sm },
  metaText: { color: colors.textMuted, fontSize: font.sizes.xs },
  dot: { width: 3, height: 3, borderRadius: 999, backgroundColor: colors.textMuted },

  actions: { flexDirection: 'row', alignItems: 'center', gap: spacing.lg, marginTop: spacing.md },
  actionBtn: { flexDirection: 'row', alignItems: 'center', gap: 4 },
  actionText: { fontSize: font.sizes.xs, fontWeight: '700' },

  communityWrap: { paddingHorizontal: spacing.lg, marginTop: spacing.xl },
  community: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
    borderRadius: radius.lg,
    padding: spacing.lg,
  },
  communityTitle: { color: colors.bg, fontSize: font.sizes.md, fontWeight: '800' },
  communitySub: { color: 'rgba(10,26,47,0.85)', fontSize: font.sizes.xs, marginTop: 2 },
});
