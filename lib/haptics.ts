import * as Haptics from "expo-haptics";
import { Platform } from "react-native";

export type HapticPattern =
  "light" | "medium" | "heavy" | "selection" | "success" | "warning" | "error";

/**
 * Fire-and-forget haptic feedback. Silently no-ops on web and swallows device errors so a
 * missing haptic engine never breaks an interaction.
 */
export async function haptic(pattern: HapticPattern): Promise<void> {
  if (Platform.OS === "web") return;
  try {
    switch (pattern) {
      case "light":
        await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
        break;
      case "medium":
        await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
        break;
      case "heavy":
        await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);
        break;
      case "selection":
        await Haptics.selectionAsync();
        break;
      case "success":
        await Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
        break;
      case "warning":
        await Haptics.notificationAsync(Haptics.NotificationFeedbackType.Warning);
        break;
      case "error":
        await Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
        break;
    }
  } catch {
    // Haptics unavailable on this device; ignore.
  }
}
