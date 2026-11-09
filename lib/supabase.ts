import "react-native-url-polyfill/auto";

import AsyncStorage from "@react-native-async-storage/async-storage";
import { createClient } from "@supabase/supabase-js";
import { AppState, Platform } from "react-native";

import { env, isSupabaseConfigured } from "./env";

/**
 * Supabase client.
 *
 * Region: the project MUST be created in Southeast Asia (Singapore, ap-southeast-1) from
 * the Supabase dashboard. Region is a project-level setting and cannot be set here.
 *
 * Falls back to placeholder credentials so the app still boots in Expo Go before .env
 * exists; any real call will fail with a network error until env is configured. Use
 * isSupabaseConfigured to gate features.
 *
 * TODO(step 3+): replace the untyped client with createClient<Database> once
 * `supabase gen types typescript` output lands in types/supabase.ts.
 */
export const supabase = createClient(
  isSupabaseConfigured ? env.supabaseUrl : "https://placeholder.supabase.co",
  isSupabaseConfigured ? env.supabaseAnonKey : "placeholder-anon-key",
  {
    auth: {
      storage: AsyncStorage,
      autoRefreshToken: true,
      persistSession: true,
      detectSessionInUrl: false,
    },
  },
);

// Keep the auth token refreshed only while the app is foregrounded (Supabase guidance).
if (Platform.OS !== "web") {
  AppState.addEventListener("change", (state) => {
    if (state === "active") {
      void supabase.auth.startAutoRefresh();
    } else {
      void supabase.auth.stopAutoRefresh();
    }
  });
}
