import type { LucideIcon } from "lucide-react";

export function Placeholder({
  title,
  description,
  Icon,
}: {
  title: string;
  description: string;
  Icon: LucideIcon;
}) {
  return (
    <div className="flex flex-col items-center justify-center h-full px-6 text-center gap-5 py-16">
      <div className="w-20 h-20 rounded-full bg-card border border-border-strong flex items-center justify-center">
        <Icon size={36} className="text-brand" />
      </div>
      <h1 className="text-2xl font-extrabold">{title}</h1>
      <p className="text-fg-muted leading-relaxed max-w-xs">{description}</p>
    </div>
  );
}
