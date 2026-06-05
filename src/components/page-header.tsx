import Link from "next/link";

/**
 * Header padrão das telas internas — fiel ao padrão dos prints:
 *   ← Título grande
 *      subtítulo verde
 *                                      [+ CTA opcional]
 */
export function PageHeader({
  title,
  subtitle,
  back = "/dashboard",
  cta,
}: {
  title: string;
  subtitle?: string;
  back?: string;
  cta?: { label: string; href: string };
}) {
  return (
    <header className="px-5 pt-6 pb-4 flex items-start gap-3">
      <Link
        href={back}
        aria-label="Voltar"
        className="-ml-2 inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-foreground/80 hover:bg-black/5"
      >
        <ArrowLeft />
      </Link>

      <div className="flex-1 min-w-0">
        <h1 className="text-2xl font-bold text-brand-900 leading-tight">
          {title}
        </h1>
        {subtitle && (
          <p className="text-sm text-brand-700 mt-0.5">{subtitle}</p>
        )}
      </div>

      {cta && (
        <Link
          href={cta.href}
          className="inline-flex items-center gap-1 rounded-xl bg-brand-600 px-3 py-2 text-sm font-medium text-white hover:bg-brand-700 shadow-sm"
        >
          <Plus /> {cta.label}
        </Link>
      )}
    </header>
  );
}

/** Linha-padrão dos cards das telas (ícone colorido + texto + seta). */
export function ListRow({
  href,
  icon,
  iconBg,
  title,
  subtitle,
  right,
}: {
  href: string;
  icon: React.ReactNode;
  iconBg: string;
  title: string;
  subtitle?: string;
  right?: React.ReactNode;
}) {
  return (
    <Link
      href={href}
      className="flex items-center gap-4 p-4 rounded-2xl bg-white border border-black/5 hover:border-brand-200 hover:shadow-sm transition"
    >
      <span
        className={`inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-xl text-2xl text-white ${iconBg}`}
      >
        {icon}
      </span>
      <span className="min-w-0 flex-1">
        <span className="block font-semibold text-brand-900">{title}</span>
        {subtitle && (
          <span className="block text-sm text-muted truncate">{subtitle}</span>
        )}
      </span>
      {right ?? <ChevronRight className="text-muted" />}
    </Link>
  );
}

/** Seção rotulada (ex.: "FERRAMENTAS ESPECIALIZADAS") como nos prints. */
export function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="mt-7 mb-2 px-1 text-[11px] font-semibold tracking-[0.12em] text-brand-800/70">
      {children}
    </h2>
  );
}

/* Ícones inline pra não puxar lib externa */
function ArrowLeft() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
      <path d="M19 12H5M12 5l-7 7 7 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
function ChevronRight({ className = "" }: { className?: string }) {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" className={className}>
      <path d="M9 6l6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
function Plus() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
      <path d="M12 5v14M5 12h14" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
    </svg>
  );
}
