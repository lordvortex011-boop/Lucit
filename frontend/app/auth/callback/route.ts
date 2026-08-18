import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

// Handles the redirect back from Supabase after Google OAuth.
// Set this as the redirect URL in Supabase (Authentication > Providers >
// Google) and in your Google Cloud OAuth client's authorized redirect URIs:
//   http://localhost:3000/auth/callback (dev)
//   https://your-domain.com/auth/callback (prod)
export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url);
  const code = searchParams.get("code");
  const next = searchParams.get("next") ?? "/dashboard";

  if (code) {
    const supabase = await createClient();
    const { error } = await supabase.auth.exchangeCodeForSession(code);
    if (!error) {
      return NextResponse.redirect(`${origin}${next}`);
    }
  }

  return NextResponse.redirect(`${origin}/login?error=auth_callback_failed`);
}
