"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { ChevronLeft, Mail, Lock, User } from "lucide-react";
import { Shell } from "@/components/Shell";

export default function Register() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: trocar por supabase.auth.signUp({ email, password, options: { data: { name } } })
    router.replace("/home");
  };

  return (
    <Shell>
      <form onSubmit={onSubmit} className="flex flex-col h-dvh md:h-full p-6 pt-12 gap-5">
        <Link href="/login" aria-label="Voltar" className="absolute top-6 left-4 inline-flex items-center justify-center w-10 h-10 text-fg">
          <ChevronLeft size={26} />
        </Link>

        <header className="space-y-1 mt-4">
          <h1 className="text-3xl font-extrabold">Criar conta</h1>
          <p className="text-fg-muted">Junte-se ao ecossistema do agronegócio.</p>
        </header>

        <Field label="Nome completo" icon={<User size={18} className="text-fg-muted" />} placeholder="Como podemos te chamar?" value={name} onChange={(e) => setName(e.target.value)} />
        <Field label="E-mail" icon={<Mail size={18} className="text-fg-muted" />} type="email" placeholder="seu@email.com" value={email} onChange={(e) => setEmail(e.target.value)} />
        <Field label="Senha" icon={<Lock size={18} className="text-fg-muted" />} type="password" placeholder="Crie uma senha" value={password} onChange={(e) => setPassword(e.target.value)} />

        <button type="submit" className="w-full rounded-full bg-brand text-bg text-lg font-extrabold py-4 active:opacity-90 mt-2">
          Criar conta
        </button>

        <p className="text-xs text-fg-muted text-center leading-relaxed">
          Ao se cadastrar, você concorda com os Termos de Uso e a Política de Privacidade.
        </p>

        <p className="text-center mt-auto">
          <span className="text-fg-muted">Já tem conta? </span>
          <Link href="/login" className="text-brand font-bold">Acesse</Link>
        </p>
      </form>
    </Shell>
  );
}

function Field({ label, icon, ...rest }: React.InputHTMLAttributes<HTMLInputElement> & { label: string; icon: React.ReactNode }) {
  return (
    <label className="block space-y-2">
      <span className="block text-fg-muted font-semibold text-sm">{label}</span>
      <span className="focus-ring flex items-center gap-3 rounded-[14px] bg-card border border-border px-4 py-3.5">
        {icon}
        <input {...rest} className="flex-1 bg-transparent text-fg placeholder:text-fg-faint outline-none" />
      </span>
    </label>
  );
}
