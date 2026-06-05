/**
 * Helpers para descobrir/setar a organização "ativa" do usuário.
 *
 * Multi-tenant: um usuário pode pertencer a várias organizações (memberships).
 * Salvamos a org escolhida em cookie para persistir entre requests.
 */
import { cookies } from "next/headers";
import { createClient } from "@/lib/supabase/server";

const COOKIE = "appagro_active_org";

export type ActiveOrg = {
  id: string;
  slug: string;
  name: string;
  plan: string;
  role: string;
};

/** Lê o cookie da org ativa. */
export async function getActiveOrgIdFromCookie(): Promise<string | null> {
  const c = await cookies();
  return c.get(COOKIE)?.value ?? null;
}

/** Seta o cookie da org ativa. */
export async function setActiveOrgIdCookie(id: string) {
  const c = await cookies();
  c.set(COOKIE, id, {
    path: "/",
    sameSite: "lax",
    httpOnly: false, // visível ao client para UI
    maxAge: 60 * 60 * 24 * 30, // 30 dias
  });
}

/**
 * Resolve a organização "atual" para a request:
 *   1. Se houver cookie e o usuário ainda for membro → usa essa
 *   2. Senão, usa a primeira org da lista de memberships
 *   3. Se não houver nenhuma → null (caller redireciona para /onboarding)
 */
export async function getCurrentOrg(): Promise<ActiveOrg | null> {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return null;

  const cookieId = await getActiveOrgIdFromCookie();

  // Lista as memberships do usuário com dados da org
  const { data: memberships, error } = await supabase
    .from("memberships")
    .select("role, organization:organizations(id, slug, name, plan)")
    .eq("user_id", user.id)
    .order("joined_at", { ascending: true });

  if (error || !memberships || memberships.length === 0) return null;

  // Tenta usar a do cookie
  if (cookieId) {
    const found = memberships.find(
      // @ts-expect-error — supabase types do select join são dinâmicos
      (m) => m.organization?.id === cookieId
    );
    if (found) {
      // @ts-expect-error — idem
      return formatOrg(found.organization, found.role);
    }
  }

  // Fallback: primeira
  const first = memberships[0];
  // @ts-expect-error — idem
  return formatOrg(first.organization, first.role);
}

function formatOrg(
  org: { id: string; slug: string; name: string; plan: string },
  role: string
): ActiveOrg {
  return {
    id: org.id,
    slug: org.slug,
    name: org.name,
    plan: org.plan,
    role,
  };
}

/** Lista todas as orgs do usuário (útil para um seletor). */
export async function listMyOrgs(): Promise<ActiveOrg[]> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("memberships")
    .select("role, organization:organizations(id, slug, name, plan)")
    .order("joined_at", { ascending: true });
  if (error || !data) return [];

  type Row = { role: string; organization: ActiveOrg | null };
  return (data as unknown as Row[])
    .filter((m): m is Row & { organization: ActiveOrg } => m.organization !== null)
    .map((m) => formatOrg(m.organization, m.role));
}
