"use client";
import Link from "next/link";
import { useState } from "react";
import { Leaf, TrendingUp } from "lucide-react";
import { Shell } from "@/components/Shell";

const SLIDES = [
  {
    title: "Tudo que você precisa para simplificar e conectar o seu trabalho",
    subtitle: "O AgroNet é um ecossistema simples, interativo e inteligente.",
  },
  {
    title: "Clima, cotações e mercado em tempo real",
    subtitle: "Acompanhe o que move a sua lavoura sem sair do app.",
  },
  {
    title: "Inteligência artificial a serviço do agro",
    subtitle: "Identifique pragas, tire dúvidas e otimize a produção com a AgroIA.",
  },
];

export default function Onboarding() {
  const [idx, setIdx] = useState(0);
  const slide = SLIDES[idx];

  return (
    <Shell>
      <div className="flex h-dvh md:h-full flex-col px-6 pb-8 pt-12">
        <h1 className="text-center text-xl font-extrabold tracking-widest">
          Agro<span className="text-brand">Net</span>
        </h1>

        {/* Hero: ecosystem look (logo central com glow). */}
        <div className="flex-1 flex items-center justify-center">
          <div className="relative w-64 h-64">
            <div className="absolute inset-0 rounded-full border border-dashed border-brand/20" />
            <div className="absolute inset-8 rounded-full border border-dashed border-brand/30" />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-24 h-24 rounded-full bg-card border-2 border-brand flex items-center justify-center shadow-[0_0_60px_-10px_rgba(46,227,138,0.6)]">
                <TrendingUp className="text-brand" size={42} />
              </div>
            </div>
            {Array.from({ length: 6 }).map((_, i) => {
              const ang = (i / 6) * Math.PI * 2;
              const r = 110;
              const x = Math.cos(ang) * r;
              const y = Math.sin(ang) * r;
              return (
                <div
                  key={i}
                  className="absolute top-1/2 left-1/2 w-10 h-10 rounded-full bg-card border border-brand/40 flex items-center justify-center"
                  style={{ transform: `translate(${x - 20}px, ${y - 20}px)` }}
                >
                  <Leaf className="text-brand" size={18} />
                </div>
              );
            })}
          </div>
        </div>

        <div className="text-center space-y-3">
          <p className="text-brand text-lg font-bold">Tudo em um só lugar!</p>
          <h2 className="text-2xl font-extrabold leading-snug">{slide.title}</h2>
          <p className="text-fg-muted leading-relaxed">{slide.subtitle}</p>
        </div>

        <div className="flex justify-center gap-2 my-6">
          {SLIDES.map((_, i) => (
            <button
              key={i}
              onClick={() => setIdx(i)}
              className={`h-2 rounded-full transition-all ${
                i === idx ? "w-6 bg-brand" : "w-2 bg-white/20"
              }`}
            />
          ))}
        </div>

        <div className="space-y-4">
          <Link
            href="/login"
            className="block w-full rounded-full bg-brand text-bg text-center text-lg font-extrabold py-4 active:opacity-90"
          >
            Acesse
          </Link>
          <Link
            href="/register"
            className="block text-center text-fg font-semibold"
          >
            Cadastre-se
          </Link>
        </div>
      </div>
    </Shell>
  );
}
