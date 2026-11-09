# CLAUDE.md - Cravy

Cravy is an Expo (React Native, TypeScript) + Supabase mobile app for iOS and Android that
answers "what should I eat right now" and routes the user to either Order Online (India only)
or Cook (everywhere).

- Primary market: India. Flows: Order Online + Cook.
- Secondary market: Rest of World (ROW). Flow: Cook only. The Order tile renders a
  "coming soon" state, never hidden silently.
- Development machine: Windows. There is NO macOS. Everything runs through Expo Managed
  Workflow, Expo Go, and EAS cloud builds.

Also read `AGENTS.md` (Expo's own guidance) and `DESIGN_SYSTEM.md`.

## Hard rules

### 1. Zero emojis

Never use unicode emojis anywhere: source code, comments, UI strings, button labels, test
data, SQL seeds, commit messages, docs, or AI prompts and AI-generated copy.

Use instead:

- `lucide-react-native` icons with `strokeWidth={2}` (sizes 16 / 20 / 24 from `theme/tokens.ts`).
- FSSAI veg / non-veg / egg markers as custom SVG components in `components/stickers/`.
- `<VinylSticker />` die-cut stickers for expressive accents.

`npm run check:emoji` scans tracked files and must pass before every commit.

### 2. Aesthetic

Palette (single source: `theme/palette.json`):

| Token    | Hex       | Name                  |
| -------- | --------- | --------------------- |
| cream    | `#FAF5EE` | Warm unbleached cream |
| ink      | `#1A1615` | Espresso Ink          |
| chili    | `#E63926` | Kashmiri Chili Red    |
| marigold | `#F4A900` | Marigold Turmeric     |
| curry    | `#1F7A4C` | Curry Leaf Green      |

Neo-brutalist tactile cards: 1.5px solid ink border, hard offset shadow (zero blur), pressed
state translates the card onto its shadow. Helpers: `cardFrame` and `hardShadow()` in
`theme/tokens.ts`. Full rules in `DESIGN_SYSTEM.md`.

### 3. Design-first

No feature screen, component, or mock UI is built until its reference PNG exists in
`design-references/`. Check that folder before starting any UI task. If the PNG is missing,
stop and ask for it. `app/index.tsx` stays a blank "Cravy Ready" placeholder until then.

### 4. No macOS, ever

- Never run `expo prebuild`, never commit `ios/` or `android/` folders, never edit native files.
- Native behaviour is configured only through `app.json` and config plugins (`plugins/`).
- iOS builds, signing and submission happen on EAS cloud (`eas build`, `eas submit`).
- Anything that cannot run in Expo Go must be reachable through the EAS `development`
  profile (dev client) first.

## Stack and versions

| Area          | Choice                                                       | Notes                                                        |
| ------------- | ------------------------------------------------------------ | ------------------------------------------------------------ |
| Runtime       | Expo SDK 56, React Native 0.85, React 19.2                   | Expo Go in stores supports this line                         |
| Routing       | Expo Router (file-based, typed routes on)                    | Routes in `app/`, nothing else lives there                   |
| Styling       | NativeWind 4.2 + Tailwind CSS 3.4                            | NativeWind v4 requires Tailwind 3, not 4. v5 is RC, not used |
| Animation     | Reanimated 4 + react-native-worklets                         | Babel plugin is auto-added by babel-preset-expo              |
| Motion assets | lottie-react-native, react-native-svg                        |                                                              |
| Icons         | lucide-react-native                                          | 2px stroke only                                              |
| State         | zustand (`stores/*.store.ts`)                                | persist via AsyncStorage where needed                        |
| Backend       | Supabase (`@supabase/supabase-js` v2)                        | Project region ap-southeast-1 (Singapore), set at creation   |
| Fonts         | expo-font: Syne / Plus Jakarta Sans, Inter, Instrument Serif | binaries not committed yet, see `assets/fonts/README.md`     |
| Monetization  | Not installed. Adapters in `lib/monetization/`               | See "Moving off Expo Go"                                     |

## Project layout

```
app/                 Expo Router routes only (_layout.tsx, index.tsx, ...)
components/ui/       Primitives (empty until designs exist)
components/stickers/ VinylSticker, FSSAI DietMarker (empty until designs exist)
design-references/   Stitch / Figma PNG exports, naming rules in its README
lib/                 supabase client, haptics wrapper, deep links, env, monetization adapters
stores/              zustand stores
types/               Domain types: CravingProfile, Recipe, Dish, Region
theme/               palette.json, tokens.ts, fonts.ts
plugins/             Expo config plugins (Android <queries> for partner deep links)
scripts/             Repo tooling (emoji check)
supabase/            migrations/, functions/, README
```

## Conventions

- Files: kebab-case (`craving-session.store.ts`). Components: PascalCase named exports.
  Default exports only for route files in `app/`.
- Import alias `@/` maps to the repo root (`@/theme/tokens`, `@/types`).
- Types are domain-first in `types/` and re-exported from `types/index.ts`.
- Styling: NativeWind `className` for layout and colour; `theme/tokens.ts` for values that
  need to be computed in JS (shadows, animations).
- Env: only `EXPO_PUBLIC_*` variables, read as literal `process.env.EXPO_PUBLIC_X`.
  Never commit `.env`.
- Haptics always go through `lib/haptics.ts`. Partner deep links always through
  `lib/deep-links.ts`.
- Region gating always reads `useRegionStore` + `selectCanOrderOnline`; never hardcode "IN".
- Copy and AI prompts: plain language, no emojis, Indian English spelling is fine.

## Commands

```bash
npm start                 # Expo dev server (Expo Go)
npm run typecheck         # tsc --noEmit (strict)
npm run lint              # expo lint
npm run format            # prettier
npm run check:emoji       # fails on any emoji in tracked files
npm run doctor            # expo-doctor
npm run build:dev         # eas build --profile development (dev client, internal)
npm run build:preview     # eas build --profile preview (internal APK / ad-hoc IPA)
npm run build:prod        # eas build --profile production (AAB / App Store)
```

Before declaring any task done: `npm run typecheck`, `npm run lint`, `npm run check:emoji`.

## Moving off Expo Go (AdMob and RevenueCat)

The baseline is Expo Go compatible on purpose. When monetization work starts:

1. `npx expo install react-native-google-mobile-ads react-native-purchases`
2. Put the `react-native-google-mobile-ads` block at the TOP LEVEL of `app.json`, as a
   sibling of `"expo"`, not inside it. Add the RevenueCat plugin if its docs require one.
3. `npx eas-cli@latest login`, `npx eas-cli@latest init` (fills `extra.eas.projectId`).
4. `npm run build:dev` for Android (APK) and iOS (register device UDIDs first with
   `eas device:create`). Install the dev client; use `npx expo start --dev-client`.
5. Implement `AdsAdapter` and `PurchasesAdapter` from `lib/monetization/index.ts` in
   `lib/monetization/admob.ts` and `lib/monetization/revenuecat.ts`, then switch the exports.
   Set `isNativeMonetizationAvailable` to true.
6. From then on Expo Go is no longer a valid target for this repo; update this section.

## Supabase

- Project region: Southeast Asia (Singapore), `ap-southeast-1`. Chosen at project creation
  in the dashboard; cannot be changed later.
- Client: `lib/supabase.ts`. It boots with placeholder credentials when `.env` is missing so
  the app still starts; gate features on `isSupabaseConfigured` from `lib/env.ts`.
- Migrations: `supabase/migrations/NNN_description.sql`, applied in order with
  `npx supabase db push`. Never edit an applied migration; add a new one.
- Generated DB types go to `types/supabase.ts` (not yet generated).

## Compatibility notes

- NativeWind v4 pins Tailwind 3. Do not upgrade to Tailwind 4 or NativeWind 5 without a
  dedicated migration task.
- Reanimated 4 needs `react-native-worklets`; both are SDK-pinned. Do not add
  `react-native-reanimated/plugin` or `react-native-worklets/plugin` to `babel.config.js`.
- Always install packages with `npx expo install <pkg>` so SDK-compatible versions are
  chosen. Run `npx expo install --fix` after any manual `npm install`.
- Expo Go only runs the current SDK line. Plan an SDK upgrade each Expo release cycle.
