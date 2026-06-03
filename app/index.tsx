import { Redirect } from 'expo-router';

// Ponto de entrada: por enquanto sempre leva ao onboarding.
// Futuramente: checar sessão/auth e redirecionar para (tabs) se logado.
export default function Index() {
  return <Redirect href="/onboarding" />;
}
