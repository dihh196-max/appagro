"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { ChevronLeft, Mail, Lock, Leaf } from "lucide-react";
import { Shell } from "@/components/Shell";

const BG_URL =
  "https://raw.githubusercontent.com/dihh196-max/appagro/main/Story%20do%20instagram%20agroneg%C3%B3cio%20e%20tecnologia%20verde%20e%20moderno.png";

export default function Login() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: trocar por supabase.auth.signInWithPassword({ email, password })
    router.replace("/home");
  };

  return (
    <Shell className="relative overflow-hidden">
      <div
        className="absolute inset-0 bg-bg"
        style={{
          backgroundImage: `url("${BG_URL}")`,
          backgroundSize: "contain",
          backgroundPosition: "top center",
          backgroundRepeat: "no-repeat",
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-bg-bottom/95" />

      <form
        onSubmit={onSubmit}
        className="relative flex flex-col h-dvh md:h-full px-6 pt-12 pb-8 justify-end gap-5"
      >
        <Link
          href="/onboarding"
          aria-label="Voltar"
          className="absolute top-6 left-4 inline-flex items-center justify-center w-10 h-10 text-fg"
        >
          <ChevronLeft size={26} />
        </Link>

        <div className="flex flex-col items-center gap-3 mb-2">
          <div className="w-16 h-16 rounded-full bg-card border-2 border-border-strong flex items-center justify-center">
            <Leaf className="text-brand" size={28} />
          </div>
          <p className="text-xl font-extrabold tracking-wide [text-shadow:0_1px_6px_rgba(0,0,0,0.6)]">
            Agro<span className="text-brand">Net</span>
          </p>
        </div>

        <div className="text-center space-y-1 mb-2">
          <h1 className="text-3xl font-extrabold [text-shadow:0_1px_8px_rgba(0,0,0,0.7)]">
            Bem-vindo de volta
          </h1>
          <p className="text-[#E6EEF7] [text-shadow:0_1px_6px_rgba(0,0,0,0.7)]">
            Acesse sua conta para continuar no campo.
          </p>
        </div>

        <GlassField label="E-mail" icon={<Mail size={18} className="text-brand" />} type="email" placeholder="seu@email.com" value={email} onChange={(e) => setEmail(e.target.value)} />
        <GlassField label="Senha" icon={<Lock size={18} className="text-brand" />} type="password" placeholder="••••••••" value={password} onChange={(e) => setPassword(e.target.value)} />

        <button type="button" className="self-end text-brand text-sm font-semibold">
          Esqueci minha senha
        </button>

        <button type="submit" className="w-full rounded-full bg-brand text-bg text-lg font-extrabold py-4 active:opacity-90">
          Acessar
        </button>

        <div className="flex items-center gap-3 text-[#E6EEF7] text-sm">
          <div className="flex-1 h-px bg-white/25" />
          ou
          <div className="flex-1 h-px bg-white/25" />
        </div>

        <button type="button" className="w-full rounded-full border border-white/25 bg-bg-bottom/55 py-4 font-semibold">
          Continuar com Google
        </button>

        <p className="text-center text-[#E6EEF7]">
          Não tem conta?{" "}
          <Link href="/register" className="text-brand font-bold">Cadastre-se</Link>
        </p>
      </form>
    </Shell>
  );
}

function GlassField({
  label, icon, ...rest
}: React.InputHTMLAttributes<HTMLInputElement> & { label: string; icon: React.ReactNode }) {
  return (
    <label className="block space-y-2">
      <span className="block text-white font-semibold text-sm">{label}</span>
      <span className="focus-ring flex items-center gap-3 rounded-[14px] bg-bg-bottom/55 border-[1.5px] border-brand/60 px-4 py-3.5">
        {icon}
        <input {...rest} className="flex-1 bg-transparent text-fg placeholder:text-white/55 outline-none" />
      </span>
    </label>
  );
}
