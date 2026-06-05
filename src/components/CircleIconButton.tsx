import { ButtonHTMLAttributes, ReactNode } from "react";
import clsx from "clsx";

type Props = ButtonHTMLAttributes<HTMLButtonElement> & {
  children: ReactNode;
  size?: number;
  active?: boolean;
  badge?: boolean;
};

export function CircleIconButton({
  children,
  size = 42,
  active = false,
  badge = false,
  className,
  ...rest
}: Props) {
  return (
    <button
      {...rest}
      style={{ width: size, height: size }}
      className={clsx(
        "relative inline-flex items-center justify-center rounded-full border-[1.5px] border-brand transition",
        active ? "bg-brand/15 text-brand" : "bg-transparent text-fg",
        "hover:bg-brand/10 active:scale-95",
        className,
      )}
    >
      {children}
      {badge && (
        <span className="absolute top-1 right-1 w-2.5 h-2.5 rounded-full bg-down" />
      )}
    </button>
  );
}
