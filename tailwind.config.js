// Single source of truth for colour values is theme/palette.json (shared with theme/tokens.ts).
const palette = require("./theme/palette.json");

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./theme/**/*.{ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        cream: palette.cream,
        ink: palette.ink,
        chili: palette.chili,
        marigold: palette.marigold,
        curry: palette.curry,
      },
      fontFamily: {
        display: ["Syne-Bold"],
        "display-alt": ["PlusJakartaSans-Bold"],
        body: ["Inter-Regular"],
        "body-medium": ["Inter-Medium"],
        "body-semibold": ["Inter-SemiBold"],
        serif: ["InstrumentSerif-Regular"],
      },
      borderWidth: {
        hairline: "1.5px",
      },
      borderRadius: {
        card: "12px",
        sticker: "16px",
      },
    },
  },
  plugins: [],
};
