import { redirect } from "next/navigation";

// Ponto de entrada: por enquanto sempre leva ao onboarding.
// Futuro: checar sessão Supabase e redirecionar para /home se logado.
export default function Index() {
  redirect("/onboarding");
}
