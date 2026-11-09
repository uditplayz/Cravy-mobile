import type { BudgetBand, DietMarker } from "./dish";
import type { Region } from "./region";

export type Mood =
  | "comfort"
  | "spicy"
  | "light"
  | "indulgent"
  | "nostalgic"
  | "adventurous"
  | "hangover"
  | "late-night";

export type HungerLevel = 1 | 2 | 3 | 4 | 5;

export type ResultMode = "order" | "cook";

/** Everything the craving quiz collects before Cravy makes a recommendation. */
export interface CravingProfile {
  mood: Mood;
  hungerLevel: HungerLevel;
  budgetBand: BudgetBand;
  timeAvailableMinutes: number;
  dietMarker: DietMarker | "any";
  region: Region;
}

export interface CravingSession {
  id: string;
  userId: string | null;
  profile: CravingProfile;
  resultMode: ResultMode | null;
  chosenRecipeId: string | null;
  chosenPartnerId: string | null;
  createdAt: string;
}
