import type { Cuisine, DietMarker } from "./dish";

export interface Ingredient {
  name: string;
  quantity: number | null;
  unit: string | null;
  /** True when the item is a pantry staple the user likely already has. */
  isStaple?: boolean;
}

export interface RecipeStep {
  order: number;
  instruction: string;
  durationMinutes?: number;
  /** Optional Lottie animation key for the step card. */
  animationKey?: string;
}

export interface Recipe {
  id: string;
  slug: string;
  title: string;
  description: string;
  cuisine: Cuisine;
  dietMarker: DietMarker;
  prepMinutes: number;
  cookMinutes: number;
  servings: number;
  ingredients: Ingredient[];
  steps: RecipeStep[];
  tags: string[];
  heroImageUrl?: string;
  isPublished: boolean;
  createdAt: string;
}
