import { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Pressable } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { CircleIconButton } from '../../src/components/CircleIconButton';
import { ToolsDrawer } from '../../src/components/ToolsDrawer';
import { NewsImage } from '../../src/components/NewsImage';
import { news, timeAgo, type NewsItem } from '../../src/data/news';
import { colors, spacing, font } from '../../src/theme/theme';

export default function Home() {
  const insets = useSafeAreaInsets();
  const [menuOpen, setMenuOpen] = useState(false);
  const [liked, setLiked] = useState<Record<string, boolean>>({});
  const [saved, setSaved] = useState<Record<string, boolean>>({});
  const [following, setFollowing] = useState<Record<string, boolean>>({});

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
        {/* Header: menu (esq) · marca centralizada · sino + chat (dir) */}
        <View style={styles.header}>
          <CircleIconButton
            testID="open-menu"
            icon="menu"
            onPress={() => setMenuOpen(true)}
            size={42}
          />
          <Text style={styles.brand}>
            Agro<Text style={{ color: colors.primary }}>Net</Text>
          </Text>
          <View style={styles.headerActions}>
            <CircleIconButton icon="notifications-outline" size={42} badge />
            <CircleIconButton icon="chatbubble-ellipses-outline" size={42} />
          </View>
        </View>

        {/* Feed de posts */}
        {news.map((item) => (
          <Post
            key={item.id}
            item={item}
            liked={!!liked[item.id]}
            saved={!!saved[item.id]}
            following={!!following[item.id]}
            onLike={() => setLiked((m) => ({ ...m, [item.id]: !m[item.id] }))}
            onSave={() => setSaved((m) => ({ ...m, [item.id]: !m[item.id] }))}
            onFollow={() => setFollowing((m) => ({ ...m, [item.id]: !m[item.id] }))}
          />
        ))}
      </ScrollView>
    </LinearGradient>
  );
}

type PostProps = {
  item: NewsItem;
  liked: boolean;
  saved: boolean;
  following: boolean;
  onLike: () => void;
  onSave: () => void;
  onFollow: () => void;
};

function Post({ item, liked, saved, following, onLike, onSave, onFollow }: PostProps) {
  const likeCount = item.likes + (liked ? 1 : 0);
  return (
    <View style={styles.post}>
      {/* Cabeçalho do post */}
      <View style={styles.postHeader}>
        <View style={styles.avatar}>
          <Ionicons name="person" size={20} color={colors.primary} />
        </View>
        <View style={{ flex: 1 }}>
          <Text style={styles.author} numberOfLines={1}>
            {item.source.toUpperCase()}
          </Text>
          <Text style={styles.postTime}>Há {timeAgo(item.publishedAt)}</Text>
        </View>
        <Pressable hitSlop={8}>
          <Ionicons name="ellipsis-horizontal" size={20} color={colors.textMuted} />
        </Pressable>
        <Pressable hitSlop={8} onPress={onFollow} style={{ marginLeft: spacing.md }}>
          <Text style={styles.followBtn}>
            {following ? '✓ Seguindo' : '+ Seguir'}
          </Text>
        </Pressable>
      </View>

      {/* Texto */}
      <View style={styles.postBody}>
        <Text style={styles.postText}>
          <Text style={{ fontWeight: '800' }}>{item.title}</Text>
          {'\n\n'}
          {item.summary}
        </Text>
        <Pressable hitSlop={6}>
          <Text style={styles.readMore}>ver mais</Text>
        </Pressable>
      </View>

      {/* Imagem edge-to-edge */}
      <NewsImage
        uri={item.image}
        accent={item.accent}
        icon={item.icon}
        iconSize={56}
        style={styles.postImg}
      />

      {/* Ações: ícones verdes com contagem */}
      <View style={styles.postActions}>
        <PostAction
          icon={liked ? 'heart' : 'heart-outline'}
          count={likeCount}
          color={liked ? colors.down : colors.primary}
          onPress={onLike}
        />
        <PostAction icon="chatbubble-outline" count={item.comments} />
        <PostAction icon="arrow-redo-outline" count={0} />
        <View style={{ flex: 1 }} />
        <PostAction
          icon={saved ? 'bookmark' : 'bookmark-outline'}
          count={Math.max(1, Math.floor(item.likes / 12))}
          color={saved ? colors.primary : colors.primary}
          onPress={onSave}
        />
      </View>

      {/* Curtido por... */}
      <Text style={styles.likedBy}>
        Curtido por <Text style={styles.likedByName}>Felipe Vieira</Text> e outros
      </Text>
    </View>
  );
}

function PostAction({
  icon,
  count,
  color = colors.primary,
  onPress,
}: {
  icon: keyof typeof Ionicons.glyphMap;
  count: number;
  color?: string;
  onPress?: () => void;
}) {
  return (
    <Pressable
      hitSlop={6}
      onPress={onPress}
      style={({ pressed }) => [styles.actionBtn, pressed && { opacity: 0.6 }]}
    >
      <Ionicons name={icon} size={22} color={color} />
      <Text style={styles.actionCount}>{count}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: spacing.lg,
    paddingBottom: spacing.lg,
  },
  brand: {
    color: colors.text,
    fontSize: 24,
    fontWeight: '900',
    letterSpacing: 2,
  },
  headerActions: { flexDirection: 'row', alignItems: 'center', gap: spacing.sm },

  post: {
    marginBottom: spacing.lg,
    paddingBottom: spacing.lg,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: colors.border,
  },
  postHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
    paddingHorizontal: spacing.lg,
    paddingBottom: spacing.md,
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
  author: { color: colors.text, fontSize: 14, fontWeight: '800', letterSpacing: 0.4 },
  postTime: { color: colors.textMuted, fontSize: 12, marginTop: 2 },
  followBtn: { color: colors.primary, fontSize: 14, fontWeight: '700' },

  postBody: { paddingHorizontal: spacing.lg, paddingBottom: spacing.md },
  postText: { color: colors.text, fontSize: font.sizes.md, lineHeight: 22 },
  readMore: {
    color: colors.textMuted,
    fontSize: font.sizes.sm,
    fontWeight: '600',
    marginTop: spacing.sm,
  },

  postImg: { width: '100%', height: 320 },

  postActions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xl,
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.lg,
  },
  actionBtn: { flexDirection: 'row', alignItems: 'center', gap: 6 },
  actionCount: { color: colors.text, fontSize: font.sizes.md, fontWeight: '600' },

  likedBy: {
    color: colors.textMuted,
    fontSize: font.sizes.sm,
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.md,
  },
  likedByName: { color: colors.text, fontWeight: '700' },
});
