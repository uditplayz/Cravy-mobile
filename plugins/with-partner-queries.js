// Expo config plugin: declares <queries> entries so Linking.canOpenURL() can detect the
// delivery partner apps on Android 11+ (package visibility). No-op in Expo Go; applies to
// EAS / prebuild output only.
const { withAndroidManifest } = require("expo/config-plugins");

const PARTNER_SCHEMES = ["swiggy", "zomato", "blinkit", "zepto"];

function withPartnerQueries(config) {
  return withAndroidManifest(config, (mod) => {
    const manifest = mod.modResults.manifest;
    manifest.queries = manifest.queries ?? [];
    const existing = manifest.queries[0] ?? {};
    existing.intent = existing.intent ?? [];

    for (const scheme of PARTNER_SCHEMES) {
      const alreadyPresent = existing.intent.some((intent) =>
        (intent.data ?? []).some((d) => d.$ && d.$["android:scheme"] === scheme),
      );
      if (alreadyPresent) continue;
      existing.intent.push({
        action: [{ $: { "android:name": "android.intent.action.VIEW" } }],
        data: [{ $: { "android:scheme": scheme } }],
      });
    }

    manifest.queries[0] = existing;
    return mod;
  });
}

module.exports = withPartnerQueries;
