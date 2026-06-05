"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import clsx from "clsx";
import { Home, Search, Plus, Sparkles, User } from "lucide-react";

const TABS = [
  { href: "/home", icon: Home, label: "Início" },
  { href: "/buscar", icon: Search, label: "Buscar" },
  { href: "/criar", icon: Plus, label: "Criar" },
  { href: "/agroia", icon: Sparkles, label: "AgroIA" },
  { href: "/perfil", icon: User, label: "Perfil" },
];

export function BottomTabs() {
  const pathname = usePathname();
  return (
    <nav
      aria-label="Navegação principal"
      className="border-t border-border bg-bg-bottom px-3 py-3 flex items-center justify-around"
    >
      {TABS.map(({ href, icon: Icon, label }) => {
        const active = pathname === href;
        return (
          <Link
            key={href}
            href={href}
            aria-label={label}
            className={clsx(
              "inline-flex items-center justify-center rounded-full border-[1.5px] border-brand transition w-[42px] h-[42px]",
              active ? "bg-brand/15 text-brand" : "text-fg hover:bg-brand/10",
            )}
          >
            <Icon size={20} />
          </Link>
        );
      })}
    </nav>
  );
}
