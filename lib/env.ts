/**
 * Expo inlines EXPO_PUBLIC_* variables only when accessed as literal
 * `process.env.EXPO_PUBLIC_NAME` expressions, so no dynamic lookups here.
 */
export const env = {
  supabaseUrl: process.env.EXPO_PUBLIC_SUPABASE_URL ?? "",
  supabaseAnonKey: process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY ?? "",
} as const;

export const isSupabaseConfigured: boolean =
  env.supabaseUrl.length > 0 && env.supabaseAnonKey.length > 0;

/** Throws a readable error when a feature that needs Supabase runs without config. */
export function assertSupabaseEnv(): void {
  if (!isSupabaseConfigured) {
    throw new Error(
      "Supabase is not configured. Copy .env.example to .env and set EXPO_PUBLIC_SUPABASE_URL and EXPO_PUBLIC_SUPABASE_ANON_KEY.",
    );
  }
}
