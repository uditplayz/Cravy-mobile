import { Text, View } from "react-native";

/**
 * Placeholder boot screen. Replace once the first reference PNG lands in design-references/.
 * No feature UI is allowed here before that (CLAUDE.md rule 3).
 */
export default function Index() {
  return (
    <View className="flex-1 items-center justify-center bg-cream">
      <Text className="text-base text-ink">Cravy Ready</Text>
    </View>
  );
}
