# Cravy

Mobile app (iOS + Android) that answers "what should I eat right now" and routes you to
Order Online (India) or Cook (everywhere). Expo SDK 56, TypeScript, NativeWind, Supabase.

Status: scaffold only. No feature UI yet; designs are in progress.

## Prerequisites

- Node 24 (`.nvmrc`), npm 11
- Expo Go on a phone, or an Android emulator
- No macOS required. iOS builds run on EAS cloud.

## Run

```bash
npm install
cp .env.example .env        # fill in Supabase values when the project exists
npm start                   # scan the QR code with Expo Go
```

Expected: a cream screen reading "Cravy Ready".

## Checks

```bash
npm run typecheck
npm run lint
npm run check:emoji
npm run doctor
```

## Where things live

See `CLAUDE.md` for the project rules and layout, `DESIGN_SYSTEM.md` for the visual
language, and `design-references/README.md` for how to drop in Stitch / Figma exports.
