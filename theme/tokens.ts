import type { ViewStyle } from "react-native";

import palette from "./palette.json";

/**
 * Cravy design tokens. Colour values live in palette.json so tailwind.config.js and this
 * file share one source. See DESIGN_SYSTEM.md for usage rules.
 */
export const colors = {
  cream: palette.cream,
  ink: palette.ink,
  chili: palette.chili,
  marigold: palette.marigold,
  curry: palette.curry,
  white: palette.white,
} as const;

export type ColorToken = keyof typeof colors;

export const borders = {
  /** Neo-brutalist card outline. */
  hairline: 1.5,
} as const;

export const radii = {
  sm: 8,
  md: 12,
  lg: 16,
  pill: 999,
} as const;

export const spacing = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 24,
  xxl: 32,
} as const;

export const shadowOffsets = {
  sm: 2,
  md: 4,
} as const;

export type ShadowOffset = keyof typeof shadowOffsets;

/**
 * Hard offset shadow (zero blur). On iOS this maps to native shadow props.
 * On Android, elevation always blurs, so neo-brutalist cards should render a second
 * offset View behind the card instead; this helper therefore sets elevation to 0.
 */
export function hardShadow(offset: ShadowOffset = "md", color: string = colors.ink): ViewStyle {
  const px = shadowOffsets[offset];
  return {
    shadowColor: color,
    shadowOffset: { width: px, height: px },
    shadowOpacity: 1,
    shadowRadius: 0,
    elevation: 0,
  };
}

/** Standard neo-brutalist card frame. Combine with hardShadow(). */
export const cardFrame: ViewStyle = {
  borderWidth: borders.hairline,
  borderColor: colors.ink,
  borderRadius: radii.md,
  backgroundColor: colors.white,
};

export const typeScale = {
  xs: 12,
  sm: 14,
  base: 16,
  lg: 18,
  xl: 20,
  "2xl": 24,
  "3xl": 30,
  "4xl": 36,
} as const;

/** Icon sizes for lucide-react-native. Stroke width is always 2. */
export const iconSizes = {
  sm: 16,
  md: 20,
  lg: 24,
} as const;

export const ICON_STROKE_WIDTH = 2;
