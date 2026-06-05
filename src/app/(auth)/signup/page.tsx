import Link from "next/link";
import { signup } from "./actions";

export const metadata = { title: "Criar conta" };

export default function SignupPage() {
  return (
    <>
      <h1 className="text-2xl font-bold text-center">Criar sua conta</h1>
      <p className="mt-2 text-center text-sm text-foreground/60">
        Comece a usar o AppAgro em segundos
      </p>

      <form action={signup} className="mt-8 space-y-4">
        <div>
          <label htmlFor="full_name" className="block text-sm font-medium mb-1">
            Nome completo
          </label>
          <input
            id="full_name"
            name="full_name"
            type="text"
            required
            autoComplete="name"
            className="w-full rounded-lg border border-brand-200 px-3 py-2 focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-200"
          />
        </div>

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
            autoComplete="new-password"
            minLength={8}
            className="w-full rounded-lg border border-brand-200 px-3 py-2 focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-200"
          />
          <p className="mt-1 text-xs text-foreground/60">Mínimo 8 caracteres</p>
        </div>

        <button
          type="submit"
          className="w-full rounded-lg bg-brand-600 px-4 py-2.5 font-medium text-white hover:bg-brand-700"
        >
          Criar conta
        </button>
      </form>

      <p className="mt-6 text-center text-sm text-foreground/60">
        Já tem conta?{" "}
        <Link href="/login" className="font-medium text-brand-700 hover:underline">
          Entrar
        </Link>
      </p>
    </>
  );
}
