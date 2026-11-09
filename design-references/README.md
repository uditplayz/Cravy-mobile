# design-references

Drop exported screen PNGs from Google Stitch or Figma here. No feature screen may be built
without its reference image in this folder first (CLAUDE.md rule 3).

## Naming

`NN-area-screen[-state][-region].png`, zero-padded, kebab-case:

- `01-onboarding-welcome.png`
- `02-onboarding-region-select.png`
- `10-home-india.png`
- `10-home-row-cook-only.png`
- `20-craving-quiz-mood.png`
- `30-result-order-partners.png`
- `31-result-cook-recipe.png`
- `31-result-cook-recipe-step-active.png`

One PNG per visual state. Export at 2x (iPhone 15 Pro frame, 393 x 852 pt) so spacing can be measured directly.

## Companion notes

Optional `NN-area-screen.md` next to a PNG for interaction notes, motion intent, haptic cues, and copy. Keep copy free of emojis.

## Implementation handshake

When a screen is built, add a line to `IMPLEMENTED.md` in this folder:

`10-home-india.png -> app/(tabs)/index.tsx (2026-11-20)`
