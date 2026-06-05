"use client";
import { useEffect, useState } from "react";
import { X, ChevronDown, ChevronRight, ChevronUp } from "lucide-react";
import clsx from "clsx";
import {
  modules,
  moduleCategories,
  categoryMeta,
  type ModuleCategory,
} from "@/data/modules";

type Props = { open: boolean; onClose: () => void };

/** Menu lateral com categorias em accordion (apenas categorias expostas). */
export function ToolsDrawer({ open, onClose }: Props) {
  const [expanded, setExpanded] = useState<ModuleCategory | null>(null);

  useEffect(() => {
    if (!open) setExpanded(null);
  }, [open]);

  return (
    <>
      <button
        type="button"
        aria-label="Fechar menu"
        onClick={onClose}
        className={clsx(
          "fixed inset-0 z-40 bg-black/55 transition-opacity",
          open ? "opacity-100" : "opacity-0 pointer-events-none",
        )}
      />
      <aside
        aria-hidden={!open}
        className={clsx(
          "fixed top-0 bottom-0 left-0 z-50 w-[82%] max-w-[360px] bg-bg-bottom",
          "border-r border-border px-4 py-6 overflow-y-auto",
          "transition-transform duration-200 ease-out",
          open ? "translate-x-0" : "-translate-x-full",
        )}
      >
        <div className="flex items-center justify-between mb-2">
          <p className="text-xl font-extrabold">
            Agro<span className="text-brand">Net</span>
          </p>
          <button type="button" aria-label="Fechar" onClick={onClose} className="w-9 h-9 rounded-full bg-card flex items-center justify-center">
            <X size={20} />
          </button>
        </div>
        <p className="text-fg-muted text-sm mb-6">Ferramentas</p>

        <div className="space-y-2">
          {moduleCategories.map((cat) => {
            const isOpen = expanded === cat;
            const items = modules.filter((m) => m.category === cat);
            const Meta = categoryMeta[cat];
            return (
              <div key={cat}>
                <button type="button" onClick={() => setExpanded(isOpen ? null : cat)} className="w-full rounded-[14px] bg-card border border-border px-3 py-3 flex items-center gap-3 hover:bg-card-elev transition">
                  <span className="w-9 h-9 rounded-[8px] bg-brand/15 flex items-center justify-center">
                    <Meta.icon size={20} className="text-brand" />
                  </span>
                  <span className="flex-1 text-left">
                    <span className="block font-extrabold">{cat}</span>
                    <span className="block text-xs text-fg-muted">{Meta.description}</span>
                  </span>
                  {isOpen ? <ChevronUp size={18} className="text-fg-muted" /> : <ChevronDown size={18} className="text-fg-muted" />}
                </button>

                {isOpen && (
                  <ul className="pl-6 pt-2 pb-1 space-y-1">
                    {items.map((m) => (
                      <li key={m.key}>
                        <button type="button" onClick={onClose} className="w-full flex items-center gap-3 py-2 hover:opacity-70 transition">
                          <span className="w-7 text-center">
                            <m.icon size={18} className="text-white" />
                          </span>
                          <span className="flex-1 text-left font-medium">{m.label}</span>
                          <ChevronRight size={14} className="text-fg-muted" />
                        </button>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            );
          })}
        </div>
      </aside>
    </>
  );
}
