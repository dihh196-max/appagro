"use client";
import { ReactNode, createContext, useContext, useState } from "react";
import { ToolsDrawer } from "./ToolsDrawer";
import { BottomTabs } from "./BottomTabs";
import { Shell } from "./Shell";

const DrawerCtx = createContext<{ open: () => void }>({ open: () => {} });

export function useToolsDrawer() {
  return useContext(DrawerCtx);
}

/**
 * Shell das telas autenticadas: ícone-frame mobile, drawer lateral com o
 * catálogo de ferramentas e tab bar inferior com 5 botões em círculo.
 */
export function AppShell({ children }: { children: ReactNode }) {
  const [drawerOpen, setDrawerOpen] = useState(false);

  return (
    <Shell>
      <DrawerCtx.Provider value={{ open: () => setDrawerOpen(true) }}>
        <div className="flex flex-col h-dvh md:h-[820px]">
          <div className="flex-1 overflow-y-auto pb-2">{children}</div>
          <BottomTabs />
        </div>
        <ToolsDrawer open={drawerOpen} onClose={() => setDrawerOpen(false)} />
      </DrawerCtx.Provider>
    </Shell>
  );
}
