import { useState } from 'react';
import { View, Text, StyleSheet, Pressable, ScrollView } from 'react-native';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { Screen } from '../../src/components/Screen';
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
    <Screen>
      <ScrollView contentContainerStyle={styles.content} keyboardShouldPersistTaps="handled">
        <Pressable onPress={() => router.back()} hitSlop={12} style={styles.back}>
          <Ionicons name="chevron-back" size={26} color={colors.text} />
        </Pressable>

        <Text style={styles.title}>Bem-vindo de volta</Text>
        <Text style={styles.subtitle}>Acesse sua conta para continuar no AgroNet.</Text>

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
    </Screen>
  );
}

const styles = StyleSheet.create({
  content: { padding: spacing.xl, gap: spacing.lg },
  back: { width: 40, height: 40, justifyContent: 'center' },
  title: { color: colors.text, fontSize: font.sizes.xxl, fontWeight: '800' },
  subtitle: { color: colors.textMuted, fontSize: font.sizes.md, marginTop: -spacing.sm },
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
  },
  socialText: { color: colors.text, fontSize: font.sizes.md, fontWeight: '600' },
  footerRow: { flexDirection: 'row', justifyContent: 'center', marginTop: spacing.sm },
  footerText: { color: colors.textMuted, fontSize: font.sizes.md },
  footerLink: { color: colors.primary, fontSize: font.sizes.md, fontWeight: '700' },
});
