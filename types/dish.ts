/**
 * FSSAI food-labelling marker. Rendered with custom SVG markers in components/stickers,
 * never with emoji or coloured text.
 */
export type DietMarker = "veg" | "non-veg" | "egg";

export type Cuisine =
  | "north-indian"
  | "south-indian"
  | "street-food"
  | "indo-chinese"
  | "mughlai"
  | "bengali"
  | "gujarati"
  | "maharashtrian"
  | "continental"
  | "other";

export interface Dish {
  id: string;
  name: string;
  cuisine: Cuisine;
  dietMarker: DietMarker;
  /** Short descriptor shown on cards, e.g. "crispy, tangy, late-night". */
  tagline?: string;
  tags: string[];
  imageUrl?: string;
  /** Approximate price band in the user's region currency. */
  budgetBand?: BudgetBand;
}

export type BudgetBand = "pocket" | "regular" | "treat";
