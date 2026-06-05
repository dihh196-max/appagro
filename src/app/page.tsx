import Link from "next/link";

export default function LandingPage() {
  return (
    <main className="flex-1">
      {/* Header */}
      <header className="border-b border-brand-100/60 bg-white/70 backdrop-blur sticky top-0 z-10">
        <div className="mx-auto max-w-6xl px-6 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <span className="inline-flex h-9 w-9 items-center justify-center rounded-lg bg-brand-500 text-white font-bold">
              🌱
            </span>
            <span className="font-semibold text-lg tracking-tight">AppAgro</span>
          </Link>
          <nav className="flex items-center gap-2">
            <Link
              href="/login"
              className="px-4 py-2 text-sm font-medium text-brand-700 hover:text-brand-900"
            >
              Entrar
            </Link>
            <Link
              href="/signup"
              className="px-4 py-2 text-sm font-medium rounded-lg bg-brand-600 text-white hover:bg-brand-700"
            >
              Criar conta
            </Link>
          </nav>
        </div>
      </header>

      {/* Hero */}
      <section className="mx-auto max-w-6xl px-6 py-20 text-center">
        <span className="inline-block rounded-full bg-brand-100 px-3 py-1 text-xs font-medium text-brand-700">
          Tecnologia para o agronegócio
        </span>
        <h1 className="mt-6 text-4xl md:text-6xl font-bold tracking-tight">
          Sua fazenda mais{" "}
          <span className="text-brand-600">produtiva</span> e{" "}
          <span className="text-brand-600">conectada</span>
        </h1>
        <p className="mt-6 mx-auto max-w-2xl text-lg text-foreground/70">
          Calculadoras agrícolas, identificação de pragas com IA, laudos
          agronômicos, cursos especializados e indicadores em tempo real — tudo
          em uma plataforma única.
        </p>
        <div className="mt-10 flex items-center justify-center gap-3">
          <Link
            href="/signup"
            className="px-6 py-3 rounded-lg bg-brand-600 text-white font-medium hover:bg-brand-700"
          >
            Começar grátis
          </Link>
          <Link
            href="/login"
            className="px-6 py-3 rounded-lg border border-brand-200 text-brand-700 font-medium hover:bg-brand-50"
          >
            Já tenho conta
          </Link>
        </div>
      </section>

      {/* Módulos */}
      <section className="mx-auto max-w-6xl px-6 py-16">
        <h2 className="text-2xl md:text-3xl font-bold text-center mb-12">
          Tudo o que você precisa em um só lugar
        </h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {modules.map((m) => (
            <div
              key={m.title}
              className="rounded-xl border border-brand-100 bg-white p-5 hover:shadow-md transition"
            >
              <div className="text-3xl mb-3">{m.icon}</div>
              <h3 className="font-semibold text-brand-800">{m.title}</h3>
              <p className="mt-1 text-sm text-foreground/70">{m.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <footer className="border-t border-brand-100 mt-20">
        <div className="mx-auto max-w-6xl px-6 py-8 text-sm text-foreground/60 flex items-center justify-between">
          <span>© {new Date().getFullYear()} AppAgro</span>
          <span>Feito com 🌱 para o campo</span>
        </div>
      </footer>
    </main>
  );
}

const modules = [
  { icon: "🧮", title: "Calculadora Agrícola", desc: "Calagem, NPK, irrigação e mais" },
  { icon: "🌍", title: "Processos em Solos", desc: "Conhecimento essencial do solo" },
  { icon: "🧪", title: "Fertilidade do Solo", desc: "Nutrientes, correção e adubação" },
  { icon: "📚", title: "Biblioteca Técnica", desc: "Guias e artigos agrícolas" },
  { icon: "🎓", title: "Cursos", desc: "Capacitação para o agronegócio" },
  { icon: "💊", title: "Agroquímicos", desc: "Catálogo de defensivos e bulas" },
  { icon: "📄", title: "Laudos Agronômicos", desc: "Relatórios e pareceres técnicos" },
  { icon: "📊", title: "Dashboard", desc: "Indicadores em tempo real" },
];
