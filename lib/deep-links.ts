import * as Linking from "expo-linking";
import { Platform } from "react-native";

import type { DeliveryPartnerId } from "@/types";

/** The app's own URL scheme, matching "scheme" in app.json. */
export const APP_SCHEME = "cravy";

export interface DeliveryPartnerLink {
  id: DeliveryPartnerId;
  name: string;
  /** Custom URL scheme used to open the installed app. */
  scheme: string;
  androidPackage: string;
  /** App Store URL (India storefront). Verify IDs before release. */
  iosStoreUrl: string;
}

export const DELIVERY_PARTNERS: Record<DeliveryPartnerId, DeliveryPartnerLink> = {
  swiggy: {
    id: "swiggy",
    name: "Swiggy",
    scheme: "swiggy://",
    androidPackage: "in.swiggy.android",
    iosStoreUrl: "https://apps.apple.com/in/app/id989540920",
  },
  zomato: {
    id: "zomato",
    name: "Zomato",
    scheme: "zomato://",
    androidPackage: "com.application.zomato",
    iosStoreUrl: "https://apps.apple.com/in/app/id434613896",
  },
  blinkit: {
    id: "blinkit",
    name: "Blinkit",
    scheme: "blinkit://",
    androidPackage: "com.grofers.customerapp",
    iosStoreUrl: "https://apps.apple.com/in/app/id1131924728",
  },
  zepto: {
    id: "zepto",
    name: "Zepto",
    scheme: "zepto://",
    androidPackage: "com.zeptoconsumerapp",
    iosStoreUrl: "https://apps.apple.com/in/app/id1562930549",
  },
};

export type OpenPartnerResult = "app" | "store" | "failed";

export function playStoreUrl(androidPackage: string): string {
  return `https://play.google.com/store/apps/details?id=${androidPackage}`;
}

/**
 * Opens a delivery partner app, falling back to its store listing when not installed.
 *
 * Android 11+ requires <queries> entries for canOpenURL to return true; these are added by
 * plugins/with-partner-queries.js. In Expo Go that plugin does not apply, so canOpenURL may
 * report false even when the app is installed; openURL still works there.
 */
export async function openPartner(id: DeliveryPartnerId): Promise<OpenPartnerResult> {
  const partner = DELIVERY_PARTNERS[id];

  const canOpen = await Linking.canOpenURL(partner.scheme).catch(() => false);
  if (canOpen) {
    try {
      await Linking.openURL(partner.scheme);
      return "app";
    } catch {
      // fall through to store
    }
  }

  const storeUrl =
    Platform.OS === "ios" ? partner.iosStoreUrl : playStoreUrl(partner.androidPackage);
  try {
    await Linking.openURL(storeUrl);
    return "store";
  } catch {
    return "failed";
  }
}

/** Builds a cravy:// URL for in-app deep links, e.g. createAppUrl("recipe/dal-makhani"). */
export function createAppUrl(path: string, params?: Linking.QueryParams): string {
  return Linking.createURL(path, { scheme: APP_SCHEME, queryParams: params });
}
