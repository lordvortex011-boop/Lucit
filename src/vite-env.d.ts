/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_SUPABASE_URL?: string;
  readonly VITE_SUPABASE_ANON_KEY?: string;
  readonly VITE_STRIPE_PAYMENT_LINK?: string;
  readonly VITE_FOUNDING_TAKEN?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
