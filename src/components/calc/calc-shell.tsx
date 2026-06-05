import Link from "next/link";

export function CalcShell({
  title,
  subtitle,
  children,
}: {
  title: string;
  subtitle?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="px-6 md:px-8 py-8 max-w-3xl mx-auto">
      <header className="mb-6">
        <Link
          href="/calculadoras"
          className="text-sm text-brand-700 hover:underline inline-flex items-center gap-1"
        >
          ← Calculadora Agrícola
        </Link>
        <h1 className="mt-2 text-3xl font-bold">{title}</h1>
        {subtitle && <p className="text-sm text-foreground/60">{subtitle}</p>}
      </header>
      {children}
    </div>
  );
}

export function Field({
  label,
  hint,
  children,
}: {
  label: string;
  hint?: string;
  children: React.ReactNode;
}) {
  return (
    <label className="block">
      <span className="block text-sm font-medium mb-1">{label}</span>
      {children}
      {hint && <span className="block mt-1 text-xs text-foreground/60">{hint}</span>}
    </label>
  );
}

export function NumInput(
  props: React.InputHTMLAttributes<HTMLInputElement> & { suffix?: string }
) {
  const { suffix, className, ...rest } = props;
  return (
    <div className="relative">
      <input
        type="number"
        inputMode="decimal"
        step="any"
        {...rest}
        className={`w-full rounded-lg border border-brand-200 px-3 py-2 focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-200 ${suffix ? "pr-16" : ""} ${className ?? ""}`}
      />
      {suffix && (
        <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-sm text-foreground/50">
          {suffix}
        </span>
      )}
    </div>
  );
}

export function ResultCard({
  highlight,
  children,
}: {
  highlight?: React.ReactNode;
  children?: React.ReactNode;
}) {
  return (
    <div className="mt-6 rounded-2xl border border-brand-200 bg-brand-50 p-6">
      {highlight && (
        <div className="text-3xl md:text-4xl font-bold text-brand-700">{highlight}</div>
      )}
      {children}
    </div>
  );
}
