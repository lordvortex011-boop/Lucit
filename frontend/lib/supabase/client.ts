import { createBrowserClient } from "@supabase/ssr";

/**
 * Browser-side Supabase client. Use inside client components ("use client")
 * for auth calls: signInWithPassword, signUp, signInWithOAuth, signOut,
 * getSession, onAuthStateChange, etc.
 *
 * Requires NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY
 * in frontend/.env.local — grab the publishable key (sb_publishable_...)
 * from Supabase dashboard > Settings > API Keys, NOT the secret key. See
 * .env.example and /supabase/README.md.
 */
export function createClient() {
  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!,
  );
}
