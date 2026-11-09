# supabase

- `migrations/` - SQL migrations, applied in filename order. `001_initial_schema.sql` is the starting schema.
- `functions/` - Edge Functions (Deno). Empty until needed. Excluded from the app tsconfig.

## Project setup (once)

1. Create the project in the Supabase dashboard. Region: Southeast Asia (Singapore), `ap-southeast-1`. Region cannot be changed later.
2. Copy the project URL and anon key into `.env` (see `.env.example`).
3. Install the CLI and link: `npx supabase login`, `npx supabase init`, `npx supabase link --project-ref <ref>`.
   `supabase init` generates `config.toml`; commit it once generated.
4. Apply migrations: `npx supabase db push`.
5. Generate types: `npx supabase gen types typescript --linked > types/supabase.ts`.
