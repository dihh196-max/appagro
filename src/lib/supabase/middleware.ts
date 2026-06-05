/**
 * Helper de middleware: renova a sessão do Supabase a cada request
 * e redireciona para /login quando rota privada exige auth.
 */
import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";

const PUBLIC_PATHS = [
  "/",
  "/login",
  "/signup",
  "/auth/callback",
  "/api/health",
];

/** Rotas que exigem usuário logado, mas funcionam sem organização. */
const AUTH_NO_ORG_PATHS = ["/onboarding"];

function isPublicPath(pathname: string) {
  return PUBLIC_PATHS.some(
    (p) => pathname === p || pathname.startsWith(`${p}/`)
  );
}

function isAuthNoOrgPath(pathname: string) {
  return AUTH_NO_ORG_PATHS.some(
    (p) => pathname === p || pathname.startsWith(`${p}/`)
  );
}

function isSupabaseConfigured() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL ?? "";
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? "";
  return (
    url.startsWith("https://") &&
    !url.includes("placeholder") &&
    key.length > 0 &&
    !key.includes("placeholder")
  );
}

export async function updateSession(request: NextRequest) {
  let supabaseResponse = NextResponse.next({ request });

  // Se o Supabase ainda não foi configurado (dev local sem .env.local real),
  // o proxy deixa passar — assim a landing renderiza sem 500.
  // Rotas privadas vão exibir tela de erro do Supabase quando acessadas, mas
  // o app inteiro não fica inacessível.
  if (!isSupabaseConfigured()) {
    return supabaseResponse;
  }

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) =>
            request.cookies.set(name, value)
          );
          supabaseResponse = NextResponse.next({ request });
          cookiesToSet.forEach(({ name, value, options }) =>
            supabaseResponse.cookies.set(name, value, options)
          );
        },
      },
    }
  );

  // IMPORTANTE: getUser() valida o JWT — não trocar por getSession()
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { pathname } = request.nextUrl;

  // Bloqueia rotas privadas sem usuário
  if (!user && !isPublicPath(pathname)) {
    const loginUrl = request.nextUrl.clone();
    loginUrl.pathname = "/login";
    loginUrl.searchParams.set("next", pathname);
    return NextResponse.redirect(loginUrl);
  }

  // Já logado tentando acessar /login ou /signup → joga pro dashboard
  // (o /dashboard depois pode redirecionar pra /onboarding se faltar org)
  if (user && (pathname === "/login" || pathname === "/signup")) {
    const dashUrl = request.nextUrl.clone();
    dashUrl.pathname = "/dashboard";
    return NextResponse.redirect(dashUrl);
  }

  // Silencia o lint não usado quando o helper for útil no futuro
  void isAuthNoOrgPath;

  return supabaseResponse;
}
