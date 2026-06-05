import Link from "next/link";
import { login } from "./actions";

export const metadata = { title: "Entrar" };

export default function LoginPage() {
  return (
    <>
      <h1 className="text-2xl font-bold text-center">Bem-vindo de volta</h1>
      <p className="mt-2 text-center text-sm text-foreground/60">
        Entre com seu e-mail e senha
      </p>

      <form action={login} className="mt-8 space-y-4">
        <div>
          <label htmlFor="email" className="block text-sm font-medium mb-1">
            E-mail
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            autoComplete="email"
            className="w-full rounded-lg border border-brand-200 px-3 py-2 focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-200"
          />
        </div>

        <div>
          <label htmlFor="password" className="block text-sm font-medium mb-1">
            Senha
          </label>
          <input
            id="password"
            name="password"
            type="password"
            required
            autoComplete="current-password"
            minLength={6}
            className="w-full rounded-lg border border-brand-200 px-3 py-2 focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-200"
          />
        </div>

        <button
          type="submit"
          className="w-full rounded-lg bg-brand-600 px-4 py-2.5 font-medium text-white hover:bg-brand-700"
        >
          Entrar
        </button>
      </form>

      <p className="mt-6 text-center text-sm text-foreground/60">
        Não tem uma conta?{" "}
        <Link href="/signup" className="font-medium text-brand-700 hover:underline">
          Criar conta grátis
        </Link>
      </p>
    </>
  );
}
