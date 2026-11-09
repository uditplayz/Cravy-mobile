# Cravy Design System

Warm, tactile, slightly mischievous. Think a street-food stall's hand-lettered menu board
rendered as a modern app: unbleached cream paper, espresso ink outlines, bursts of chili,
turmeric and curry-leaf colour, and die-cut vinyl stickers slapped on at a slight angle.

Zero emojis. All expression comes from type, colour, stickers, icons and motion.

## 1. Colour

Values live in `theme/palette.json` and are exposed as NativeWind classes
(`bg-cream`, `text-ink`, `border-ink`, `bg-chili`, ...) and as `colors` in `theme/tokens.ts`.

| Token    | Hex       | Role                                               | On cream contrast                     |
| -------- | --------- | -------------------------------------------------- | ------------------------------------- |
| cream    | `#FAF5EE` | App background, card surfaces                      | n/a                                   |
| ink      | `#1A1615` | Text, borders, shadows, primary buttons            | 15.8 : 1                              |
| chili    | `#E63926` | Primary action, "hungry now", Order Online, errors | 3.9 : 1 (large text / fills only)     |
| marigold | `#F4A900` | Highlights, sticker fills, warnings, streaks       | 1.9 : 1 (fills only, ink text on top) |
| curry    | `#1F7A4C` | Veg marker, success, Cook flow accent              | 5.2 : 1                               |
| white    | `#FFFFFF` | Card interiors when they must lift off cream       | n/a                                   |

Rules:

- Text is ink on cream or white, or cream on ink. Never chili or marigold text smaller than 20pt.
- Coloured fills always carry an ink border so they read as stickers, not flat UI.
- One accent colour per card. Chili and marigold never touch without ink between them.

## 2. Typography

Loaded via `expo-font` (`theme/fonts.ts`). Families map to NativeWind classes
`font-display`, `font-display-alt`, `font-body`, `font-body-medium`, `font-body-semibold`,
`font-serif`.

| Role              | Family                            | Use                                                |
| ----------------- | --------------------------------- | -------------------------------------------------- |
| Display           | Syne Bold                         | Screen titles, big numbers, sticker text           |
| Display alternate | Plus Jakarta Sans Bold            | When Syne feels too loud (settings, long headings) |
| Body              | Inter Regular / Medium / SemiBold | Everything else                                    |
| Editorial accent  | Instrument Serif Regular          | Pull quotes, recipe intros, "coming soon" notes    |

Scale (pt): 12 / 14 / 16 / 18 / 20 / 24 / 30 / 36. Line height 1.3 for display, 1.5 for body.
Display headings are tight (letter-spacing -0.5) and may be set in uppercase for stickers only.

## 3. Shape and tactility (neo-brutalist cards)

- Border: 1.5px solid ink on every card, chip, button and input (`border-hairline border-ink`).
- Radius: 8 (chips), 12 (cards, buttons), 16 (stickers, sheets), pill for tags.
- Shadow: hard offset, zero blur, ink coloured. Small = 2pt, default = 4pt, both axes.
  Use `hardShadow("sm" | "md")` from `theme/tokens.ts`.
  Android cannot render zero-blur shadows with `elevation`; render a second ink-filled View
  offset behind the card. The future `Card` primitive owns this.
- Pressed state: translate the card by the shadow offset (so it sits on its shadow) and
  pair with `haptic("light")`. Duration 90ms, no opacity change.
- Disabled: 40 percent opacity, no shadow.

## 4. Iconography

- `lucide-react-native` only. `strokeWidth={2}`, colour ink unless on an ink surface.
- Sizes 16 (inline), 20 (buttons, list rows), 24 (headers, empty states).
- No filled icon variants. No emoji, no unicode symbols as icons.

### FSSAI diet markers (`components/stickers/DietMarker`)

| Marker  | Outline square | Inner glyph            |
| ------- | -------------- | ---------------------- |
| veg     | curry          | curry filled circle    |
| non-veg | chili          | chili filled triangle  |
| egg     | marigold       | marigold filled circle |

Sizes 12 / 16 / 20. Always shown next to a dish or recipe title; never implied by colour alone.

## 5. Stickers (`components/stickers/VinylSticker`)

A die-cut vinyl sticker: 3pt white "cut edge" around the shape, then the 1.5px ink outline,
then the fill (cream, marigold, chili or curry). Rotated between -6 and +6 degrees. Carries a
2pt hard shadow. Content is display type or a lucide icon. Used for badges ("20 min",
"Veg", "Late night", "Coming soon"), never for primary actions.

## 6. Motion and haptics

Reanimated 4 springs; prefer `withSpring({ damping: 18, stiffness: 220 })` for card entry
and `withTiming(90ms)` for press. Lottie only for hero moments (result reveal, cooking
timer). Every tactile interaction pairs with a haptic from `lib/haptics.ts`:

| Interaction               | Haptic    |
| ------------------------- | --------- |
| Card / button press       | light     |
| Chip select, slider step  | selection |
| Quiz step advance         | medium    |
| Result revealed           | success   |
| Partner app not installed | warning   |
| Network / auth failure    | error     |

## 7. Region behaviour

- IN: Home shows Order Online and Cook tiles. Order results list the four delivery partners
  (Swiggy, Zomato, Blinkit, Zepto) as stickers; tapping opens the app or its store page.
- ROW: Home shows Cook. The Order Online tile stays visible in a "Coming soon" state
  (cream fill, dashed ink border, Instrument Serif note). It is never removed, so the
  layout matches IN screens.
- Gate with `selectCanOrderOnline(useRegionStore.getState())`, never a hardcoded region check.

## 8. Reference workflow

1. Design in Google Stitch or Figma using this document.
2. Export each screen state as PNG into `design-references/` following its README naming.
3. Build the screen only after the PNG exists; match spacing to the export at 2x.
4. Log the mapping in `design-references/IMPLEMENTED.md`.
