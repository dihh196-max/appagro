import Link from "next/link";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { getCurrentOrg } from "@/lib/active-org";
import { logout } from "./actions";

const NAV = [
  { href: "/dashboard",    label: "Dashboard",    icon: "📊" },
  { href: "/calculadoras", label: "Calculadoras", icon: "🧮" },
  { href: "/solos",        label: "Solos",        icon: "🌍" },
  { href: "/fertilidade",  label: "Fertilidade",  icon: "🧪" },
  { href: "/biblioteca",   label: "Biblioteca",   icon: "📚" },
  { href: "/cursos",       label: "Cursos",       icon: "🎓" },
  { href: "/agroquimicos", label: "Agroquímicos", icon: "💊" },
  { href: "/laudos",       label: "Laudos",       icon: "📄" },
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

  // Multi-tenant: precisa ter pelo menos uma organização para usar o app
  const org = await getCurrentOrg();
  if (!org) redirect("/onboarding");

  return (
    <div className="min-h-screen flex">
      {/* Sidebar */}
      <aside className="w-64 shrink-0 border-r border-brand-100 bg-brand-50/40 hidden md:flex md:flex-col">
        <div className="p-6">
          <Link href="/dashboard" className="flex items-center gap-2">
            <span className="inline-flex h-9 w-9 items-center justify-center rounded-lg bg-brand-500 text-white font-bold">
              🌱
            </span>
            <span className="font-semibold text-lg tracking-tight">AppAgro</span>
          </Link>
        </div>

        {/* Org ativa */}
        <div className="mx-3 mb-4 rounded-xl border border-brand-100 bg-white p-3">
          <div className="text-xs uppercase tracking-wide text-brand-700/70">
            Organização
          </div>
          <div className="mt-0.5 font-semibold text-sm truncate">{org.name}</div>
          <div className="flex items-center gap-2 mt-1 text-xs text-foreground/60">
            <span className="inline-block rounded-full bg-brand-100 px-1.5 py-0.5 uppercase">
              {org.plan}
            </span>
            <span>·</span>
            <span className="capitalize">{org.role}</span>
          </div>
        </div>

        <nav className="flex-1 px-3 space-y-1">
          {NAV.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium text-brand-800 hover:bg-brand-100"
            >
              <span>{item.icon}</span>
              <span>{item.label}</span>
            </Link>
          ))}
        </nav>

        <div className="border-t border-brand-100 p-4">
          <div className="text-xs text-foreground/60 mb-2 truncate">{user.email}</div>
          <form action={logout}>
            <button
              type="submit"
              className="w-full text-left text-sm font-medium text-brand-700 hover:text-brand-900"
            >
              Sair →
            </button>
          </form>
        </div>
      </aside>

      <main className="flex-1 min-w-0">{children}</main>
    </div>
  );
}
