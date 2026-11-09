import { create } from "zustand";

import type { CravingProfile, ResultMode } from "@/types";

interface CravingSessionState {
  /** Partially filled while the user moves through the craving quiz. */
  draft: Partial<CravingProfile>;
  resultMode: ResultMode | null;
  setField: <K extends keyof CravingProfile>(key: K, value: CravingProfile[K]) => void;
  setResultMode: (mode: ResultMode | null) => void;
  reset: () => void;
}

const initialState = {
  draft: {},
  resultMode: null,
} satisfies Pick<CravingSessionState, "draft" | "resultMode">;

export const useCravingSessionStore = create<CravingSessionState>()((set) => ({
  ...initialState,
  setField: (key, value) => set((state) => ({ draft: { ...state.draft, [key]: value } })),
  setResultMode: (mode) => set({ resultMode: mode }),
  reset: () => set(initialState),
}));

const REQUIRED_KEYS: (keyof CravingProfile)[] = [
  "mood",
  "hungerLevel",
  "budgetBand",
  "timeAvailableMinutes",
  "dietMarker",
  "region",
];

/** Returns the complete profile or null while any field is still missing. */
export function selectCompleteProfile(state: CravingSessionState): CravingProfile | null {
  const complete = REQUIRED_KEYS.every((key) => state.draft[key] !== undefined);
  return complete ? (state.draft as CravingProfile) : null;
}
