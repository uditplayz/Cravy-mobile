import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

import { REGION_CONFIG, type Region, type RegionConfig } from "@/types";

interface RegionState {
  /** null until detected or chosen during onboarding. */
  region: Region | null;
  setRegion: (region: Region) => void;
  reset: () => void;
}

export const useRegionStore = create<RegionState>()(
  persist(
    (set) => ({
      region: null,
      setRegion: (region) => set({ region }),
      reset: () => set({ region: null }),
    }),
    {
      name: "cravy.region",
      storage: createJSONStorage(() => AsyncStorage),
    },
  ),
);

/** Resolved config for the active region; defaults to ROW (Cook-only) until chosen. */
export function selectRegionConfig(state: RegionState): RegionConfig {
  return REGION_CONFIG[state.region ?? "ROW"];
}

export function selectCanOrderOnline(state: RegionState): boolean {
  return selectRegionConfig(state).canOrderOnline;
}
