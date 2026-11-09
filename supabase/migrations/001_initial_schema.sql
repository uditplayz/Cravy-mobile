-- Cravy initial schema
-- Target: Supabase Postgres, project region ap-southeast-1 (Singapore).
-- Apply with: npx supabase db push

create extension if not exists "pgcrypto";

-- ---------------------------------------------------------------------------
-- Helpers
-- ---------------------------------------------------------------------------

create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

-- ---------------------------------------------------------------------------
-- profiles: one row per auth user
-- ---------------------------------------------------------------------------

create table public.profiles (
  id uuid primary key references auth.users (id) on delete cascade,
  display_name text,
  region text not null default 'ROW' check (region in ('IN', 'ROW')),
  diet_preference text not null default 'any'
    check (diet_preference in ('veg', 'non-veg', 'egg', 'any')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create trigger profiles_set_updated_at
before update on public.profiles
for each row execute function public.set_updated_at();

alter table public.profiles enable row level security;

create policy "profiles: owner can read"
  on public.profiles for select
  using (auth.uid() = id);

create policy "profiles: owner can insert"
  on public.profiles for insert
  with check (auth.uid() = id);

create policy "profiles: owner can update"
  on public.profiles for update
  using (auth.uid() = id)
  with check (auth.uid() = id);

-- Auto-create a profile row when a user signs up.
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  insert into public.profiles (id, display_name)
  values (new.id, coalesce(new.raw_user_meta_data ->> 'display_name', null));
  return new;
end;
$$;

create trigger on_auth_user_created
after insert on auth.users
for each row execute function public.handle_new_user();

-- ---------------------------------------------------------------------------
-- delivery_partners: deep-link targets for the Order Online flow (India only)
-- ---------------------------------------------------------------------------

create table public.delivery_partners (
  id text primary key,
  name text not null,
  scheme text not null,
  android_package text not null,
  ios_app_store_id text not null,
  regions text[] not null default '{IN}',
  is_active boolean not null default true,
  sort_order integer not null default 0
);

alter table public.delivery_partners enable row level security;

create policy "delivery_partners: public read"
  on public.delivery_partners for select
  using (true);

insert into public.delivery_partners
  (id, name, scheme, android_package, ios_app_store_id, regions, is_active, sort_order)
values
  ('swiggy',  'Swiggy',  'swiggy://',  'in.swiggy.android',        '989540920',  '{IN}', true, 10),
  ('zomato',  'Zomato',  'zomato://',  'com.application.zomato',   '434613896',  '{IN}', true, 20),
  ('blinkit', 'Blinkit', 'blinkit://', 'com.grofers.customerapp',  '1131924728', '{IN}', true, 30),
  ('zepto',   'Zepto',   'zepto://',   'com.zeptoconsumerapp',     '1562930549', '{IN}', true, 40);

-- ---------------------------------------------------------------------------
-- recipes: Cook flow content
-- ---------------------------------------------------------------------------

create table public.recipes (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  title text not null,
  description text not null default '',
  cuisine text not null,
  diet_marker text not null check (diet_marker in ('veg', 'non-veg', 'egg')),
  prep_minutes integer not null default 0 check (prep_minutes >= 0),
  cook_minutes integer not null default 0 check (cook_minutes >= 0),
  servings integer not null default 2 check (servings > 0),
  ingredients jsonb not null default '[]'::jsonb,
  steps jsonb not null default '[]'::jsonb,
  tags text[] not null default '{}',
  hero_image_url text,
  is_published boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index recipes_cuisine_idx on public.recipes (cuisine);
create index recipes_diet_marker_idx on public.recipes (diet_marker);
create index recipes_tags_gin_idx on public.recipes using gin (tags);

create trigger recipes_set_updated_at
before update on public.recipes
for each row execute function public.set_updated_at();

alter table public.recipes enable row level security;

create policy "recipes: public read published"
  on public.recipes for select
  using (is_published = true);

-- ---------------------------------------------------------------------------
-- craving_sessions: one row per completed craving quiz
-- ---------------------------------------------------------------------------

create table public.craving_sessions (
  id uuid primary key default gen_random_uuid(),
  -- null for anonymous sessions; owned sessions require a profile
  user_id uuid references public.profiles (id) on delete set null,
  region text not null check (region in ('IN', 'ROW')),
  mood text not null,
  hunger_level smallint not null check (hunger_level between 1 and 5),
  budget_band text not null check (budget_band in ('pocket', 'regular', 'treat')),
  time_available_minutes integer not null check (time_available_minutes >= 0),
  diet_marker text not null check (diet_marker in ('veg', 'non-veg', 'egg', 'any')),
  result_mode text check (result_mode in ('order', 'cook')),
  chosen_recipe_id uuid references public.recipes (id) on delete set null,
  chosen_partner_id text references public.delivery_partners (id) on delete set null,
  created_at timestamptz not null default now()
);

create index craving_sessions_user_created_idx
  on public.craving_sessions (user_id, created_at desc);

alter table public.craving_sessions enable row level security;

create policy "craving_sessions: owner can read"
  on public.craving_sessions for select
  using (auth.uid() = user_id);

create policy "craving_sessions: owner can insert"
  on public.craving_sessions for insert
  with check (auth.uid() = user_id);

create policy "craving_sessions: owner can update"
  on public.craving_sessions for update
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);
