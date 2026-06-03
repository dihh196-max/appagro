import { useState } from 'react';
import { View, Text, StyleSheet, Pressable, ScrollView } from 'react-native';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { Screen } from '../../src/components/Screen';
import { Field } from '../../src/components/Field';
import { colors, spacing, radius, font } from '../../src/theme/theme';

export default function Register() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleRegister = () => {
    // TODO: integrar cadastro real (Supabase/Firebase/API)
    router.replace('/(tabs)');
  };

  return (
    <Screen>
      <ScrollView contentContainerStyle={styles.content} keyboardShouldPersistTaps="handled">
        <Pressable onPress={() => router.back()} hitSlop={12} style={styles.back}>
          <Ionicons name="chevron-back" size={26} color={colors.text} />
        </Pressable>

        <Text style={styles.title}>Criar conta</Text>
        <Text style={styles.subtitle}>Junte-se ao ecossistema do agronegócio.</Text>

        <View style={styles.form}>
          <Field
            label="Nome completo"
            icon="person"
            placeholder="Como podemos te chamar?"
            value={name}
            onChangeText={setName}
          />
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
            placeholder="Crie uma senha"
            secureTextEntry
            value={password}
            onChangeText={setPassword}
          />
        </View>

        <Pressable
          style={({ pressed }) => [styles.primaryBtn, pressed && { opacity: 0.85 }]}
          onPress={handleRegister}
        >
          <Text style={styles.primaryBtnText}>Criar conta</Text>
        </Pressable>

        <Text style={styles.terms}>
          Ao se cadastrar, você concorda com os Termos de Uso e a Política de Privacidade.
        </Text>

        <View style={styles.footerRow}>
          <Text style={styles.footerText}>Já tem conta? </Text>
          <Pressable onPress={() => router.replace('/(auth)/login')} hitSlop={8}>
            <Text style={styles.footerLink}>Acesse</Text>
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
  primaryBtn: {
    backgroundColor: colors.primary,
    borderRadius: radius.pill,
    paddingVertical: spacing.lg,
    alignItems: 'center',
    marginTop: spacing.sm,
  },
  primaryBtnText: { color: colors.bg, fontSize: font.sizes.lg, fontWeight: '800' },
  terms: { color: colors.textMuted, fontSize: font.sizes.xs, textAlign: 'center', lineHeight: 18 },
  footerRow: { flexDirection: 'row', justifyContent: 'center', marginTop: spacing.sm },
  footerText: { color: colors.textMuted, fontSize: font.sizes.md },
  footerLink: { color: colors.primary, fontSize: font.sizes.md, fontWeight: '700' },
});
