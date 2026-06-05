import Link from "next/link";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { getCurrentOrg } from "@/lib/active-org";
import { logout } from "./actions";

const BOTTOM_NAV = [
  { href: "/dashboard",    label: "Início",      icon: "🏠" },
  { href: "/calculadoras", label: "Calc.",       icon: "🧮" },
  { href: "/biblioteca",   label: "Biblioteca",  icon: "📚" },
  { href: "/fertilidade",  label: "Fertil.",     icon: "🧪" },
  { href: "/dashboard?menu=1", label: "Mais",    icon: "⋯" },
];

export default async function AppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) redirect("/login");

  const org = await getCurrentOrg();
  if (!org) redirect("/onboarding");

  return (
    <div className="min-h-screen bg-background">
      {/* Wrapper centralizado mobile-first */}
      <div className="mx-auto max-w-md min-h-screen bg-background relative pb-20">
        {/* Top bar minimalista — só com avatar e nome da org */}
        <div className="sticky top-0 z-10 bg-background/90 backdrop-blur px-5 py-3 flex items-center justify-between border-b border-black/5">
          <Link href="/dashboard" className="flex items-center gap-2">
            <span className="inline-flex h-7 w-7 items-center justify-center rounded-lg bg-brand-600 text-white text-sm">
              🌱
            </span>
            <span className="text-sm font-semibold text-brand-900 truncate max-w-[180px]">
              {org.name}
            </span>
          </Link>

          <form action={logout}>
            <button
              type="submit"
              className="text-xs text-muted hover:text-brand-700"
              title={`Sair (${user.email})`}
            >
              Sair
            </button>
          </form>
        </div>

        {/* Conteúdo da página */}
        <main>{children}</main>

        {/* Bottom nav fixa */}
        <nav className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-md bg-white border-t border-black/5 px-2 pt-1.5 pb-2 flex items-center justify-around z-10">
          {BOTTOM_NAV.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="flex flex-col items-center justify-center gap-0.5 px-2 py-1 rounded-lg text-[11px] text-muted hover:text-brand-700 transition min-w-[56px]"
            >
              <span className="text-xl leading-none">{item.icon}</span>
              <span>{item.label}</span>
            </Link>
          ))}
        </nav>
      </div>
    </div>
  );
}
