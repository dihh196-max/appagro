import { useState } from 'react';
import { View, Text, StyleSheet, Pressable, ScrollView } from 'react-native';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { AgroBackground } from '../../src/components/AgroBackground';
import { Field } from '../../src/components/Field';
import { colors, spacing, radius, font } from '../../src/theme/theme';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    // TODO: integrar autenticação real (Supabase/Firebase/API)
    router.replace('/(tabs)');
  };

  return (
    <AgroBackground>
      <SafeAreaView style={{ flex: 1 }}>
        <ScrollView contentContainerStyle={styles.content} keyboardShouldPersistTaps="handled">
          <Pressable onPress={() => router.back()} hitSlop={12} style={styles.back}>
            <Ionicons name="chevron-back" size={26} color={colors.text} />
          </Pressable>

          <View style={styles.brandBlock}>
            <View style={styles.logo}>
              <Ionicons name="leaf" size={28} color={colors.primary} />
            </View>
            <Text style={styles.brand}>
              Agro<Text style={{ color: colors.primary }}>Net</Text>
            </Text>
          </View>

          <Text style={styles.title}>Bem-vindo de volta</Text>
          <Text style={styles.subtitle}>Acesse sua conta para continuar no campo.</Text>

          <View style={styles.form}>
            <Field
              label="E-mail"
              icon="mail"
              placeholder="seu@email.com"
              keyboardType="email-address"
              autoCapitalize="none"
              value={email}
              onChangeText={setEmail}
            />
            <Field
              label="Senha"
              icon="lock-closed"
              placeholder="••••••••"
              secureTextEntry
              value={password}
              onChangeText={setPassword}
            />
            <Pressable hitSlop={8} style={styles.forgot}>
              <Text style={styles.forgotText}>Esqueci minha senha</Text>
            </Pressable>
          </View>

          <Pressable
            style={({ pressed }) => [styles.primaryBtn, pressed && { opacity: 0.85 }]}
            onPress={handleLogin}
          >
            <Text style={styles.primaryBtnText}>Acessar</Text>
          </Pressable>

          <View style={styles.dividerRow}>
            <View style={styles.divider} />
            <Text style={styles.dividerText}>ou</Text>
            <View style={styles.divider} />
          </View>

          <Pressable style={styles.socialBtn}>
            <Ionicons name="logo-google" size={18} color={colors.text} />
            <Text style={styles.socialText}>Continuar com Google</Text>
          </Pressable>

          <View style={styles.footerRow}>
            <Text style={styles.footerText}>Não tem conta? </Text>
            <Pressable onPress={() => router.push('/(auth)/register')} hitSlop={8}>
              <Text style={styles.footerLink}>Cadastre-se</Text>
            </Pressable>
          </View>
        </ScrollView>
      </SafeAreaView>
    </AgroBackground>
  );
}

const styles = StyleSheet.create({
  content: { padding: spacing.xl, gap: spacing.lg, flexGrow: 1, justifyContent: 'center' },
  back: { width: 40, height: 40, justifyContent: 'center', position: 'absolute', top: spacing.sm, left: spacing.lg },
  brandBlock: { alignItems: 'center', gap: spacing.md, marginBottom: spacing.sm },
  logo: {
    width: 64,
    height: 64,
    borderRadius: 999,
    backgroundColor: colors.card,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1.5,
    borderColor: colors.borderStrong,
  },
  brand: { color: colors.text, fontSize: font.sizes.xl, fontWeight: '800', letterSpacing: 0.5 },
  title: { color: colors.text, fontSize: font.sizes.xxl, fontWeight: '800', textAlign: 'center' },
  subtitle: { color: colors.textMuted, fontSize: font.sizes.md, textAlign: 'center', marginTop: -spacing.sm },
  form: { gap: spacing.lg, marginTop: spacing.md },
  forgot: { alignSelf: 'flex-end' },
  forgotText: { color: colors.primary, fontSize: font.sizes.sm, fontWeight: '600' },
  primaryBtn: {
    backgroundColor: colors.primary,
    borderRadius: radius.pill,
    paddingVertical: spacing.lg,
    alignItems: 'center',
    marginTop: spacing.sm,
  },
  primaryBtnText: { color: colors.bg, fontSize: font.sizes.lg, fontWeight: '800' },
  dividerRow: { flexDirection: 'row', alignItems: 'center', gap: spacing.md },
  divider: { flex: 1, height: 1, backgroundColor: colors.border },
  dividerText: { color: colors.textMuted, fontSize: font.sizes.sm },
  socialBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: spacing.md,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radius.pill,
    paddingVertical: spacing.lg,
    backgroundColor: 'rgba(15,34,56,0.6)',
  },
  socialText: { color: colors.text, fontSize: font.sizes.md, fontWeight: '600' },
  footerRow: { flexDirection: 'row', justifyContent: 'center', marginTop: spacing.sm },
  footerText: { color: colors.textMuted, fontSize: font.sizes.md },
  footerLink: { color: colors.primary, fontSize: font.sizes.md, fontWeight: '700' },
});
