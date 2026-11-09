/**
 * Monetization boundary.
 *
 * react-native-google-mobile-ads and react-native-purchases need native code and cannot run
 * in Expo Go. They are intentionally NOT installed in this baseline. The app only ever talks
 * to these adapter interfaces, so swapping in the real SDKs later is a local change.
 *
 * To enable (see CLAUDE.md, "Moving off Expo Go"):
 *   1. npx expo install react-native-google-mobile-ads react-native-purchases
 *   2. Add the ads config at the TOP LEVEL of app.json (sibling of "expo", not inside it).
 *   3. eas build --profile development, install the dev client.
 *   4. Implement AdsAdapter / PurchasesAdapter in ./admob.ts and ./revenuecat.ts and
 *      export them from here in place of the no-op adapters.
 */

export const isNativeMonetizationAvailable = false as const;

export type AdPlacement = "result-banner" | "recipe-interstitial";

export interface AdsAdapter {
  initialize(): Promise<void>;
  showInterstitial(placement: AdPlacement): Promise<boolean>;
}

export type EntitlementId = "cravy_plus";

export interface PurchasesAdapter {
  initialize(appUserId?: string): Promise<void>;
  hasEntitlement(id: EntitlementId): Promise<boolean>;
  purchase(productId: string): Promise<boolean>;
  restore(): Promise<boolean>;
}

const noopAds: AdsAdapter = {
  async initialize() {},
  async showInterstitial() {
    return false;
  },
};

const noopPurchases: PurchasesAdapter = {
  async initialize() {},
  async hasEntitlement() {
    return false;
  },
  async purchase() {
    return false;
  },
  async restore() {
    return false;
  },
};

export const ads: AdsAdapter = noopAds;
export const purchases: PurchasesAdapter = noopPurchases;
