"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { setActiveOrgIdCookie } from "@/lib/active-org";

function slugify(s: string) {
  return s
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/[^a-z0-9-]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 50);
}

export async function criarOrganizacao(formData: FormData) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) redirect("/login");

  const name = String(formData.get("name") ?? "").trim();
  const slugRaw = String(formData.get("slug") ?? "").trim();
  const stateUf = String(formData.get("state_uf") ?? "").trim() || null;
  const city = String(formData.get("city") ?? "").trim() || null;
  const cnpj = String(formData.get("cnpj") ?? "").trim() || null;

  if (!name || name.length < 2) {
    redirect("/onboarding?error=" + encodeURIComponent("Informe o nome da organização."));
  }

  const slug = slugify(slugRaw || name);
  if (slug.length < 3) {
    redirect("/onboarding?error=" + encodeURIComponent("Identificador muito curto."));
  }

  // 1. Cria organização
  const { data: org, error: orgErr } = await supabase
    .from("organizations")
    .insert({
      name,
      slug,
      created_by: user.id,
      state_uf: stateUf,
      city,
      cnpj,
    })
    .select("id")
    .single();

  if (orgErr || !org) {
    const msg =
      orgErr?.code === "23505"
        ? "Esse identificador já está em uso. Escolha outro."
        : orgErr?.message ?? "Erro ao criar organização.";
    redirect("/onboarding?error=" + encodeURIComponent(msg));
  }

  // 2. Cria membership como owner
  const { error: memErr } = await supabase.from("memberships").insert({
    organization_id: org.id,
    user_id: user.id,
    role: "owner",
  });

  if (memErr) {
    redirect("/onboarding?error=" + encodeURIComponent("Erro ao criar permissão: " + memErr.message));
  }

  // 3. Define como org ativa
  await setActiveOrgIdCookie(org.id);

  revalidatePath("/", "layout");
  redirect("/dashboard?welcome=1");
}
