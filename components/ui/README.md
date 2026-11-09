# components/ui

Reusable primitives (Button, Card, Chip, Input, Sheet, etc.) live here.

Rules:

- Nothing is added until a reference PNG for a screen that needs it exists in `design-references/`.
- Every primitive follows DESIGN_SYSTEM.md: 1.5px Espresso Ink border, hard offset shadow, palette tokens from `theme/tokens.ts`.
- Icons come from `lucide-react-native` with `strokeWidth={2}`. No emojis, ever.
- Named exports only (`export function Button`). Route files in `app/` are the only default exports.
