/**
 * Supabase client para uso no BROWSER (Client Components).
 * Usa a anon key — sempre respeita as RLS policies do banco.
 */
import { createBrowserClient } from "@supabase/ssr";

export function createClient() {
  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );
}
