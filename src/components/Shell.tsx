import { ReactNode } from "react";
import clsx from "clsx";

/**
 * Shell mobile-first com layout responsivo:
 * - No celular: ocupa a tela toda (full-bleed).
 * - No desktop: mostra um cartão centralizado simulando um celular.
 */
export function Shell({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className="min-h-dvh w-full bg-bg flex justify-center md:py-8">
      <div
        className={clsx(
          "relative w-full max-w-md md:max-w-[420px] min-h-dvh md:min-h-[820px]",
          "md:rounded-[36px] md:overflow-hidden md:shadow-[0_30px_120px_-30px_rgba(0,0,0,0.7)]",
          "md:ring-1 md:ring-white/5 bg-bg",
          className,
        )}
      >
        {children}
      </div>
    </div>
  );
}
