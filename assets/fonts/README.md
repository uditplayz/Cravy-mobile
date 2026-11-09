# assets/fonts

Place licensed font binaries here, then:

1. Uncomment the matching entries in `theme/fonts.ts` (fontSources).
2. List the files under the `expo-font` plugin in `app.json` so they embed at build time.

Expected files (names must match `theme/fonts.ts`):

- Syne-Bold.ttf (display)
- PlusJakartaSans-Bold.ttf (display alternate)
- Inter-Regular.ttf, Inter-Medium.ttf, Inter-SemiBold.ttf (body)
- InstrumentSerif-Regular.ttf (editorial accent)

All four families are available under the SIL Open Font License on Google Fonts.
