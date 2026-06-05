import Link from "next/link";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { getCurrentOrg } from "@/lib/active-org";
import { criarOrganizacao } from "./actions";

export const metadata = { title: "Crie sua organização" };

const UFS = [
  "AC","AL","AM","AP","BA","CE","DF","ES","GO","MA","MG","MS","MT",
  "PA","PB","PE","PI","PR","RJ","RN","RO","RR","RS","SC","SE","SP","TO",
];

type Props = { searchParams: Promise<{ error?: string }> };

export default async function OnboardingPage({ searchParams }: Props) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect("/login");

  // Se já tem org, não precisa onboarding — vai pro dashboard
  const org = await getCurrentOrg();
  if (org) redirect("/dashboard");

  const { error } = await searchParams;

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-brand-50 via-white to-brand-100 px-6 py-12">
      <div className="w-full max-w-lg">
        <Link href="/" className="flex items-center justify-center gap-2 mb-8">
          <span className="inline-flex h-10 w-10 items-center justify-center rounded-lg bg-brand-500 text-white font-bold">
            🌱
          </span>
          <span className="font-semibold text-xl tracking-tight">AppAgro</span>
        </Link>

        <div className="bg-white rounded-2xl shadow-sm border border-brand-100 p-8">
          <h1 className="text-2xl font-bold">Crie sua fazenda ou empresa</h1>
          <p className="mt-2 text-sm text-foreground/60">
            Para começar a usar o AppAgro, você precisa de uma organização. Ela é o
            espaço onde seus dados ficam separados — você pode convidar membros
            depois.
          </p>

          {error && (
            <div className="mt-4 rounded-lg border border-red-200 bg-red-50 p-3 text-sm text-red-800">
              {error}
            </div>
          )}

          <form action={criarOrganizacao} className="mt-6 space-y-4">
            <div>
              <label htmlFor="name" className="block text-sm font-medium mb-1">
                Nome da fazenda / empresa
              </label>
              <input
                id="name"
                name="name"
                type="text"
                required
                placeholder="Ex.: Fazenda São João"
                className="w-full rounded-lg border border-brand-200 px-3 py-2 focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-200"
              />
            </div>

            <div>
              <label htmlFor="slug" className="block text-sm font-medium mb-1">
                Identificador único
              </label>
              <input
                id="slug"
                name="slug"
                type="text"
                required
                pattern="[a-z0-9-]{3,50}"
                placeholder="fazenda-sao-joao"
                className="w-full rounded-lg border border-brand-200 px-3 py-2 focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-200 font-mono text-sm"
              />
              <p className="mt-1 text-xs text-foreground/60">
                Apenas letras minúsculas, números e hífens. Mínimo 3 caracteres.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label htmlFor="state_uf" className="block text-sm font-medium mb-1">
                  UF
                </label>
                <select
                  id="state_uf"
                  name="state_uf"
                  className="w-full rounded-lg border border-brand-200 px-3 py-2 focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-200"
                  defaultValue=""
                >
                  <option value="">—</option>
                  {UFS.map((uf) => (
                    <option key={uf} value={uf}>{uf}</option>
                  ))}
                </select>
              </div>
              <div>
                <label htmlFor="city" className="block text-sm font-medium mb-1">
                  Cidade
                </label>
                <input
                  id="city"
                  name="city"
                  type="text"
                  placeholder="Ex.: Sorriso"
                  className="w-full rounded-lg border border-brand-200 px-3 py-2 focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-200"
                />
              </div>
            </div>

            <div>
              <label htmlFor="cnpj" className="block text-sm font-medium mb-1">
                CNPJ <span className="text-foreground/40 font-normal">(opcional)</span>
              </label>
              <input
                id="cnpj"
                name="cnpj"
                type="text"
                placeholder="00.000.000/0000-00"
                className="w-full rounded-lg border border-brand-200 px-3 py-2 focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-200"
              />
            </div>

            <button
              type="submit"
              className="w-full rounded-lg bg-brand-600 px-4 py-2.5 font-medium text-white hover:bg-brand-700"
            >
              Criar organização
            </button>
          </form>
        </div>

        <p className="mt-6 text-center text-xs text-foreground/50">
          Logado como {user.email}
        </p>
      </div>
    </div>
  );
}
