# Notes

A glassmorphism pastel notes app built with **Expo (React Native) + TypeScript**.
Two screens — **Your Notes** (home) and **Thought of the day** (note detail) — with
liquid-glass surfaces, a masonry grid, voice recording, and a swipeable card stack.

The app runs out of the box on **bundled mock data**. Add Supabase credentials to
switch to a real backend with email auth, Postgres, and Storage.

## Stack

| Concern            | Library |
| ------------------ | ------- |
| Framework / router | Expo SDK 58, Expo Router (file-based, typed routes) |
| Glass              | `expo-glass-effect` (iOS 26+) with an `expo-blur` fallback |
| Backgrounds        | `expo-linear-gradient` + `react-native-svg` radial blobs |
| Animation / gesture| `react-native-reanimated` v4, `react-native-gesture-handler` |
| Lists              | `@shopify/flash-list` (masonry) |
| Media              | `expo-image`, `expo-audio`, `expo-haptics` |
| Fonts              | `@expo-google-fonts` — Quicksand, DotGothic16, Fraunces |
| Server state       | TanStack Query |
| Local state        | Zustand |
| Backend            | Supabase (auth + Postgres + Storage) |

## Getting started

> **Requires Node ≥ 22.13** (React Native 0.88 / Metro). An `.nvmrc` is included,
> so `nvm use` selects the right version. On older Node the Metro bundler fails
> with a `transformFile` error.

```bash
# 0. Use the right Node version (or install Node 22+ yourself)
nvm use

# 1. Install dependencies
npm install

# 2. (optional) configure Supabase — see below. Without it, mock data is used.
cp .env.example .env

# 3. Start the dev server
npx expo start
```

Then press `i` (iOS simulator), `a` (Android emulator), or scan the QR code with
Expo Go / a dev client.

> **Liquid Glass** requires iOS 26+ with a development build. In Expo Go, on
> Android, and on older iOS versions the app automatically falls back to
> `expo-blur`. With "Reduce Transparency" enabled it uses an opaque 85% white
> fill. You never configure this — the `<Glass>` component detects it at runtime.

### Type checking

```bash
npm run typecheck
```

## Supabase setup

1. Create a project at [supabase.com](https://supabase.com).
2. In **Project Settings → API**, copy the **Project URL** and **anon public key**
   into `.env`:

   ```env
   EXPO_PUBLIC_SUPABASE_URL=https://xxxx.supabase.co
   EXPO_PUBLIC_SUPABASE_ANON_KEY=eyJ...
   ```

3. Open the **SQL editor** and run [`supabase/schema.sql`](./supabase/schema.sql).
   This creates the `notes` table, the `updated_at` trigger, **Row Level Security**
   policies (each user sees only their own notes), and three private Storage
   buckets (`note-images`, `note-audio`, `note-files`) with per-user policies.
4. Create a user (**Authentication → Users**, or sign up in-app via `useAuth`).
5. (optional) Seed the design's example notes: open
   [`supabase/seed.sql`](./supabase/seed.sql), replace the placeholder user id with
   your user's id, and run it.
6. Restart the dev server. `lib/supabase.ts` detects the env vars and the data
   hooks start reading from Postgres instead of mock data.

## Project structure

```
app/                     Expo Router routes
  _layout.tsx            Providers (gesture root, query client, fonts, safe area)
  (tabs)/index.tsx       "Your Notes" home screen
  note/[id].tsx          "Thought of the day" note detail

components/
  glass/                 <Glass> + <GlassContainer> (native glass / blur fallback)
  cards/                 One component per note type (+ NoteCard dispatcher)
  ui/                    Primitives: PressableScale, Chip, CircleButton, Logo, icons…
  home/                  Home header, floating action capsule, note-type sheet
  detail/                Detail header, reflection card, swipeable stack, create pill

theme/                   Design tokens, font map, useTheme hook
lib/                     supabase client, row→Note mapper, formatters, filters
hooks/                   Data (TanStack Query), auth, voice recorder, UI store, a11y
types/                   Note domain types (discriminated union)
mock/                    Example notes used when Supabase is not configured
supabase/                schema.sql + seed.sql
```

## Design tokens

All colors, gradients, glass recipes, spacing (4pt scale), radii and typography
live in [`theme/tokens.ts`](./theme/tokens.ts) and are consumed through
`useTheme()`. A **dark theme** is defined alongside light; flip `FORCE_SCHEME` in
[`theme/useTheme.ts`](./theme/useTheme.ts) (or wire it to `useColorScheme()`) to
enable it — no component changes required.

## Accessibility

- Every button exposes an `accessibilityLabel` and `button` role.
- Touch targets are ≥ 44px; the standard circular button is 52px.
- Text over glass meets WCAG AA (dark tint layer where needed).
- `<Glass>` honors **Reduce Transparency** (opaque fallback).

## Notes on the data flow

- **Server state** (notes) is owned by TanStack Query in `hooks/useNotes.ts`. The
  query functions branch on `isSupabaseConfigured`, returning mock data or a
  Supabase query — the UI is identical either way.
- **Local UI state** (active filter, detail card index, optimistic checklist
  toggles) lives in the Zustand store `hooks/useUIStore.ts`.
- Supabase rows (snake_case, nullable) are normalized into the typed `Note`
  discriminated union by `lib/mapNote.ts`.
