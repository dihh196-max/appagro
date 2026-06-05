import Link from "next/link";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-brand-50 via-white to-brand-100 px-6 py-12">
      <div className="w-full max-w-md">
        <Link href="/" className="flex items-center justify-center gap-2 mb-8">
          <span className="inline-flex h-10 w-10 items-center justify-center rounded-lg bg-brand-500 text-white font-bold">
            🌱
          </span>
          <span className="font-semibold text-xl tracking-tight">AppAgro</span>
        </Link>
        <div className="bg-white rounded-2xl shadow-sm border border-brand-100 p-8">
          {children}
        </div>
      </div>
    </div>
  );
}
