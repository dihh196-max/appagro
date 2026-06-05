import { PageHeader } from "@/components/page-header";

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
    <>
      <PageHeader title={title} subtitle={subtitle} back="/calculadoras" />
      <div className="px-5 pb-6">{children}</div>
    </>
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
      <span className="block text-sm font-medium mb-1 text-brand-900">{label}</span>
      {children}
      {hint && <span className="block mt-1 text-xs text-muted">{hint}</span>}
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
        className={`w-full rounded-xl bg-white border border-black/10 px-3 py-2.5 text-sm focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-200 ${suffix ? "pr-16" : ""} ${className ?? ""}`}
      />
      {suffix && (
        <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-xs text-muted">
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
    <div className="mt-6 rounded-2xl bg-brand-600 text-white p-6 shadow-sm">
      {highlight && (
        <div className="text-3xl md:text-4xl font-bold">{highlight}</div>
      )}
      {children}
    </div>
  );
}
