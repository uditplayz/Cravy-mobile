# Cravy

Cravy is a mobile app for iOS and Android that answers one question: what should I eat right
now? You tell it your mood, hunger level, budget, available time and diet preference. It
recommends a dish and then routes you to the fastest way to get it: order it from a delivery
partner (India) or cook it yourself with a guided, step-by-step recipe (everywhere).

Built with Expo (React Native, TypeScript) and Supabase. Developed entirely on Windows with
cloud builds, without a Mac.

## Status

Early development. The repository currently contains the production-ready project
scaffold: routing shell, design tokens, data model, backend schema, build configuration and
engineering guidelines. Feature screens are built design-first, one by one, from exported
references in `design-references/`.

## The problem

Deciding what to eat is a daily, low-stakes but surprisingly draining decision. Delivery apps
show thousands of options with no guidance, and recipe sites assume you already know what you
want. Cravy flips the order: it starts from how you feel, narrows to one good answer, and only
then sends you to the right tool for the job.

## Core flows

**Craving quiz.** A short, tactile questionnaire: mood (comfort, spicy, light, indulgent,
nostalgic, adventurous, hangover, late night), hunger level, budget band, time available,
and diet marker (veg, non-veg, egg, any).

**Order Online (India).** The recommended dish is matched to delivery partners. Tapping a
partner deep-links straight into Swiggy, Zomato, Blinkit or Zepto. If the app is not
installed, Cravy opens its store listing instead.

**Cook (all regions).** A guided recipe with ingredient list, pantry-staple hints and timed
steps, paired with haptic cues and short animations.

**Region awareness.** India is the primary market and gets both flows. Everywhere else,
Cook is live and Order Online is shown in a visible "coming soon" state, so the layout stays
consistent and the intent is clear.

## Design language

Cravy avoids generic app styling. The visual system is a warm, tactile, slightly mischievous
take on a street-food menu board:

- Unbleached cream background with espresso ink outlines.
- Accent colours drawn from Indian cooking: Kashmiri chili red, marigold turmeric, curry leaf
  green.
- Neo-brutalist cards: 1.5px solid borders and hard offset shadows with no blur.
- Die-cut vinyl stickers for badges and expressive accents.
- FSSAI-style veg and non-veg markers rendered as proper SVG, as used on Indian food
  packaging.
- Icons only from a single stroke-based icon set. No emojis anywhere in the product.

The full specification lives in `DESIGN_SYSTEM.md`.

## Technology

| Area          | Choice                                               |
| ------------- | ---------------------------------------------------- |
| App framework | Expo SDK 56, React Native 0.85, React 19, TypeScript |
| Navigation    | Expo Router (file-based, typed routes)               |
| Styling       | NativeWind 4 (Tailwind CSS for React Native)         |
| Animation     | React Native Reanimated 4, Lottie, react-native-svg  |
| Icons         | lucide-react-native                                  |
| State         | zustand with AsyncStorage persistence                |
| Backend       | Supabase (Postgres, Auth, Row Level Security)        |
| Deep links    | expo-linking with Android package-visibility plugin  |
| Builds        | EAS Build cloud profiles for iOS and Android         |
| Quality gates | TypeScript strict, ESLint, Prettier, emoji scanner   |

## Architecture overview

```
app/                 Screens and layouts (Expo Router)
components/ui/       Reusable primitives
components/stickers/ Vinyl stickers and FSSAI diet markers
lib/                 Supabase client, haptics, deep links, env, monetization adapters
stores/              zustand stores (craving session, region)
types/               Domain model: CravingProfile, Recipe, Dish, Region
theme/               Palette, design tokens, font loading
plugins/             Expo config plugins (native config without native code)
supabase/            SQL migrations and edge functions
design-references/   Exported screen designs that drive implementation
```

Key engineering decisions:

- **Managed workflow only.** No native project folders are committed. Native behaviour is
  configured through `app.json` and small config plugins, and iOS binaries are produced by
  EAS in the cloud. This keeps the project buildable from any operating system.
- **Expo Go compatible baseline.** Libraries that require custom native code (ads, in-app
  purchases) sit behind adapter interfaces in `lib/monetization/` and are not installed until
  the project moves to a development build.
- **Single source of truth for design.** Colour values live in one JSON file consumed by both
  Tailwind and the TypeScript token module.
- **Data model first.** Domain types in `types/` mirror the Supabase schema in
  `supabase/migrations/`, with Row Level Security on every table.

## Data model

- `profiles`: one row per authenticated user, with region and diet preference.
- `craving_sessions`: each completed quiz, the chosen result mode, and the recipe or partner
  selected.
- `recipes`: published cooking content with ingredients and steps as structured JSON.
- `delivery_partners`: deep-link metadata for Swiggy, Zomato, Blinkit and Zepto.

## Running locally

Prerequisites: Node 24, npm 11, and the Expo Go app on a phone (or an Android emulator).
No macOS is required.

```bash
npm install
cp .env.example .env     # Supabase URL and anon key, once a project exists
npm start                # scan the QR code with Expo Go
```

You should see a cream screen reading "Cravy Ready".

Quality checks:

```bash
npm run typecheck
npm run lint
npm run check:emoji
npm run doctor
```

## Roadmap

1. Onboarding and region selection.
2. Craving quiz with sticker-based answers and haptic feedback.
3. Result screen: dish reveal, Order Online partners (India), Cook recipe.
4. Guided cooking mode with step timers.
5. Accounts, saved cravings and history via Supabase Auth.
6. Development build with ads and an optional premium tier.

## Project documents

- `CLAUDE.md`: engineering rules and conventions for contributors and AI assistants.
- `DESIGN_SYSTEM.md`: colour, type, shape, motion and region behaviour.
- `design-references/README.md`: how screen designs are named and handed to implementation.
- `supabase/README.md`: backend setup and migration workflow.

## Author

Udit. Built as a personal product and internship project, 2026.
