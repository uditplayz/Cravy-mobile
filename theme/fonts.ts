import { useFonts } from "expo-font";

/**
 * Font family names as registered with expo-font. These strings are what NativeWind
 * font-display / font-body / font-serif classes resolve to (see tailwind.config.js).
 *
 * Font binaries are NOT committed yet. When licensed TTF/OTF files are added to
 * assets/fonts/, uncomment the matching entries in fontSources and list them under the
 * expo-font plugin in app.json so they are embedded at build time.
 */
export const fontFamily = {
  display: "Syne-Bold",
  displayAlt: "PlusJakartaSans-Bold",
  body: "Inter-Regular",
  bodyMedium: "Inter-Medium",
  bodySemibold: "Inter-SemiBold",
  serif: "InstrumentSerif-Regular",
} as const;

export type FontFamily = (typeof fontFamily)[keyof typeof fontFamily];

const fontSources: Record<string, number> = {
  // [fontFamily.display]: require("../assets/fonts/Syne-Bold.ttf"),
  // [fontFamily.displayAlt]: require("../assets/fonts/PlusJakartaSans-Bold.ttf"),
  // [fontFamily.body]: require("../assets/fonts/Inter-Regular.ttf"),
  // [fontFamily.bodyMedium]: require("../assets/fonts/Inter-Medium.ttf"),
  // [fontFamily.bodySemibold]: require("../assets/fonts/Inter-SemiBold.ttf"),
  // [fontFamily.serif]: require("../assets/fonts/InstrumentSerif-Regular.ttf"),
};

/**
 * Loads custom fonts. Returns true once fonts are ready (or immediately when no font
 * files are registered, so the app never blocks on missing assets). A load error also
 * resolves to true so the app falls back to system fonts instead of hanging on splash.
 */
export function useAppFonts(): boolean {
  const [loaded, error] = useFonts(fontSources);
  if (Object.keys(fontSources).length === 0) return true;
  return loaded || error !== null;
}
