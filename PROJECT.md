# Moss & Mirth — Project Overview

> Phase 0 setup document · Keep this file in the repo root.

## What This App Is

Moss & Mirth is a solo/small-group tabletop RPG by Verena. This web app is its playtest companion — it tracks all game state, handles card draws, manages harmony points, and lets players write their story journal. Verena (as admin) can edit all game content at any time without touching code.

## Tech Stack

- **React + Vite**
- **Zustand** — all in-memory game state
- **TailwindCSS** — styling
- **Supabase** — Postgres database + Auth + RLS
- **react-konva** — drawable map canvas
- **YouTube IFrame API** — embedded music player

## Two Types of Users

### Players (no login required)
- Start a new game or continue an existing one via game ID
- Draw cards, track harmony, write journal, draw map
- Read-only access to content — cannot edit anything

### Verena (admin, Supabase Auth)
- One admin account, created manually in Supabase dashboard by Miriam
- Can edit all card text, oracle tables, rules text in the Admin panel
- Publishes versioned content snapshots
- NO self-registration UI exists — login form is admin-only

## Content Version Control — Critical Architecture

When Verena edits card text or oracle tables mid-playtest, existing in-progress games must NOT be affected. New games pick up the latest version. Old games stay frozen on the version they started with.

### How it works
- All editable content (cards, tables, rules) lives in `content_snapshots` (Supabase table)
- When a game session is created it stores `snapshot_id` — the version it started on
- Verena edits a draft first (`content_drafts` table, single row)
- She clicks 'Publish Version', enters a label — this writes a new `content_snapshots` row
- Existing game sessions keep their `snapshot_id` forever
- New games always start from the latest snapshot

**Simple rule:** snapshot is taken at game START. After that, the game is frozen to that content version.

## Supabase Database Schema

```sql
-- Auth: handled by Supabase Auth (no custom users table needed)
-- One profiles row per user for role assignment
profiles:
  id          uuid  PK FK auth.users
  role        text  ('admin' | 'player')

-- Content versioning
content_snapshots:
  id                 uuid        PK default gen_random_uuid()
  created_at         timestamptz default now()
  label              text        -- e.g. 'v1.2 — rebalanced swords'
  cards_data         jsonb       -- full 78-card deck
  oracle_tables_data jsonb       -- all inspiration/NPC/sidequest tables
  rules_text_data    jsonb       -- editable rulebook blocks

content_drafts:  (always exactly ONE row)
  id                 uuid        PK
  cards_data         jsonb
  oracle_tables_data jsonb
  rules_text_data    jsonb
  last_edited_at     timestamptz

-- Game sessions
game_sessions:
  id           uuid        PK default gen_random_uuid()
  player_name  text
  snapshot_id  uuid        FK content_snapshots
  game_state   jsonb
  journal      text
  created_at   timestamptz default now()
  updated_at   timestamptz default now()
```

## game_state JSON Structure

```json
{
  "characters": [
    {
      "name": "string",
      "species": "string",
      "role": "string",
      "trait": "string",
      "flaw": "string",
      "flawSuit": "cups|pentacles|wands|swords",
      "modifiers": { "cups": 0, "pentacles": 0, "wands": 0, "swords": 0 }
    }
  ],
  "harmony": { "cups": 0, "pentacles": 0, "wands": 0, "swords": 0 },
  "forestName": "string",
  "abundance": ["string"],
  "scarcity": ["string"],
  "ideas": [
    {
      "id": "uuid",
      "title": "string",
      "size": "small|medium|large",
      "momentsTotal": 0,
      "momentsLeft": 0,
      "resourceCost": "string",
      "completed": false,
      "completedDay": null
    }
  ],
  "cardHistory": [
    {
      "day": 1,
      "cardId": "string",
      "orientation": "upright|reversed",
      "harmonySpent": 0,
      "d20Roll": null,
      "outcomeNote": "string"
    }
  ],
  "dayCount": 1,
  "communityLog": [{ "day": 1, "text": "string" }],
  "mapData": {}
}
```

## Row Level Security (RLS) Policies

| Table | Operation | Policy |
|---|---|---|
| `content_snapshots` | SELECT | public (anyone) |
| `content_snapshots` | INSERT/UPDATE | `profiles.role = 'admin'` |
| `content_drafts` | all | `profiles.role = 'admin'` only |
| `game_sessions` | SELECT/INSERT/UPDATE | public (no auth required for players) |
| `profiles` | SELECT | own row only (`auth.uid() = id`) |

## Environment Variables

```bash
# .env  (never commit to git — use .env.example as template)
VITE_SUPABASE_URL=https://yourproject.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key
```

## Project Folder Structure

```
src/
  components/
    auth/
      LoginModal.jsx
      AdminOnly.jsx          # wrapper: renders children only if admin
    game/
      NewGameSetup.jsx
      GameBoard.jsx          # parent layout for active game
      CardDraw.jsx
      HarmonyTracker.jsx
      IdeasPanel.jsx
      StoryJournal.jsx
      MapCanvas.jsx
      MusicPlayer.jsx
      CommunityUpdate.jsx
    admin/
      AdminDashboard.jsx
      CardEditor.jsx
      OracleTableEditor.jsx
      RulesEditor.jsx
    ui/                      # shared: Button, Modal, Badge, Tabs, etc.
  data/
    defaultCards.js          # seed: all 78 tarot cards
    defaultOracleTables.js   # seed: NPC/sidequest/weather tables
    defaultRules.js          # seed: rulebook text blocks
  hooks/
    useAuth.js
    useGame.js
    useSnapshots.js
  store/
    gameStore.js             # Zustand, syncs to Supabase
  lib/
    supabase.js              # Supabase client init
    tarotEngine.js           # shuffle, draw, d20, apply modifiers
  App.jsx
  main.jsx
PROJECT.md                   # this file (keep in root)
```

## Design Direction

Cozy dark forest aesthetic. Feels like a handmade nature journal / zine, not a corporate app.

| Token | Value | Usage |
|---|---|---|
| Background | `#1C3326` | Page background (deep forest green) |
| Surface | `#F5EDD8` | Cards, panels (parchment cream) |
| Accent | `#C8973A` | Buttons, highlights (amber gold) |
| Text on dark | `#F0E8D0` | Body text on dark bg (warm cream) |
| Text muted | `#7FA085` | Secondary text (sage) |
| Danger/warn | `#8B3A2A` | Errors, warnings (earthy red) |

**Fonts:** Playfair Display (headings) + Lora (body) via Google Fonts  
**Layout:** Mobile-first responsive — game is likely played on phone/tablet  
**Animations:** Card draw uses CSS 3D flip · Harmony bars animate on change

## Build Phases Summary

| Phase | Focus |
|---|---|
| 1 | Foundation — Supabase, auth, seed data, first snapshot |
| 2 | Core Game — new game setup, card draw, harmony tracker, game board |
| 3 | Game Features — ideas panel, journal, d20, music player, continue game |
| 4 | Admin Panel — card editor, oracle table editor, publish workflow |
| 5 | Polish — map canvas, inspiration tables, export, end game screen |

Each Phase document is self-contained. Paste the relevant Phase doc into Claude Code at the start of each new session, together with Phase 0.
