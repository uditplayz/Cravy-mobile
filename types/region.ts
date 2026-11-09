/** Primary market is India. Everything else is grouped as Rest of World. */
export type Region = "IN" | "ROW";

export type DeliveryPartnerId = "swiggy" | "zomato" | "blinkit" | "zepto";

export interface RegionConfig {
  region: Region;
  /** Order Online flow is only live in India. ROW shows a "coming soon" state. */
  canOrderOnline: boolean;
  currency: "INR" | "USD";
  partners: DeliveryPartnerId[];
}

export const REGION_CONFIG: Record<Region, RegionConfig> = {
  IN: {
    region: "IN",
    canOrderOnline: true,
    currency: "INR",
    partners: ["swiggy", "zomato", "blinkit", "zepto"],
  },
  ROW: {
    region: "ROW",
    canOrderOnline: false,
    currency: "USD",
    partners: [],
  },
};
