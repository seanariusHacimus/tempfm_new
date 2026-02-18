# TempFM 88.4 — Backend & Admin Dashboard Plan

## Context

TempFM 88.4 is a radio station website (Next.js 16, React 19, TypeScript, Tailwind CSS 4) hosted on Vercel with **zero backend**. All content — news articles, show schedules, team members, advertising packages, about page text, contact info, SEO metadata — is hardcoded in two TypeScript locale dictionaries (`uz.ts` and `ru.ts`). Non-technical radio employees cannot update anything without a developer. This plan adds a database, API layer, admin dashboard, and media storage so that editors can manage all site content independently.

---

## 1. Recommended Tech Stack

| Layer | Choice | Why |
|---|---|---|
| **Database** | **Neon** (serverless Postgres) | Native Vercel integration, serverless-compatible (no cold-start connection issues), generous free tier (0.5 GB), branching for dev/preview, scales to zero |
| **ORM** | **Drizzle ORM** | Lightweight, TypeScript-native, edge-compatible, no code generation step (unlike Prisma), great migration tooling via `drizzle-kit` |
| **Auth** | **NextAuth.js v5** (Auth.js) | Built for Next.js App Router, supports credentials + OAuth, session via JWT (no extra DB queries), simple for small team |
| **File Storage** | **Vercel Blob** | Zero-config on Vercel, simple put/delete API, CDN-backed, pay-per-use, good for images & small media |
| **Future Podcasts** | **Cloudflare R2** | Zero egress fees for large audio files (1-2h podcasts), S3-compatible API, cheap storage |
| **Dashboard** | **Custom** (built into the same Next.js app at `/admin`) | No extra service, full control over UX, bilingual side-by-side editing, no CMS learning curve for devs |
| **API** | **Next.js Server Actions + API Routes** | Server Actions for dashboard mutations, API routes for any external integrations |

**New production dependencies**: `@neondatabase/serverless`, `drizzle-orm`, `next-auth`, `@vercel/blob`, `bcryptjs` (password hashing)

---

## 2. Database Schema

### 2.1 Auth & Users

```
users
├── id              UUID PK DEFAULT gen_random_uuid()
├── name            VARCHAR(100) NOT NULL
├── email           VARCHAR(255) UNIQUE NOT NULL
├── password_hash   TEXT NOT NULL
├── role            ENUM('admin', 'editor') DEFAULT 'editor'
├── created_at      TIMESTAMPTZ DEFAULT now()
└── updated_at      TIMESTAMPTZ DEFAULT now()
```

### 2.2 Shows & Schedule

```
shows
├── id              UUID PK DEFAULT gen_random_uuid()
├── title_uz        VARCHAR(200) NOT NULL
├── title_ru        VARCHAR(200) NOT NULL
├── description_uz  TEXT
├── description_ru  TEXT
├── host_name       VARCHAR(100) NOT NULL        -- host name (shared across languages)
├── genre           VARCHAR(50)                  -- e.g. "Tonggi Shou", "Yangiliklar"
├── tag_uz          VARCHAR(100)                 -- e.g. "Dushanba - Juma"
├── tag_ru          VARCHAR(100)
├── image_url       TEXT                         -- optional show cover image
├── is_featured     BOOLEAN DEFAULT false        -- shown on homepage
├── sort_order      INTEGER DEFAULT 0            -- ordering on homepage
├── is_active       BOOLEAN DEFAULT true
├── created_at      TIMESTAMPTZ DEFAULT now()
└── updated_at      TIMESTAMPTZ DEFAULT now()

schedule_slots
├── id              UUID PK DEFAULT gen_random_uuid()
├── show_id         UUID FK → shows.id ON DELETE CASCADE
├── day_of_week     SMALLINT NOT NULL CHECK (0-6)  -- 0=Mon, 6=Sun
├── start_time      TIME NOT NULL                  -- e.g. '08:00'
├── end_time        TIME NOT NULL                  -- e.g. '10:00'
├── override_desc_uz TEXT                          -- optional per-slot description override
├── override_desc_ru TEXT
├── sort_order       INTEGER DEFAULT 0
├── is_active       BOOLEAN DEFAULT true
└── created_at      TIMESTAMPTZ DEFAULT now()

UNIQUE(show_id, day_of_week, start_time)
```

### 2.3 News

```
news_articles
├── id              UUID PK DEFAULT gen_random_uuid()
├── slug            VARCHAR(200) UNIQUE NOT NULL
├── category_uz     VARCHAR(100) NOT NULL
├── category_ru     VARCHAR(100) NOT NULL
├── title_uz        TEXT NOT NULL
├── title_ru        TEXT NOT NULL
├── excerpt_uz      TEXT NOT NULL
├── excerpt_ru      TEXT NOT NULL
├── content_uz      TEXT                         -- full article body (future)
├── content_ru      TEXT
├── image_url       TEXT                         -- article cover image
├── date_label_uz   VARCHAR(100)                 -- e.g. "Har kuni", "Haftalik"
├── date_label_ru   VARCHAR(100)
├── is_featured     BOOLEAN DEFAULT false        -- only 1 should be true
├── is_published    BOOLEAN DEFAULT true
├── published_at    TIMESTAMPTZ DEFAULT now()
├── sort_order      INTEGER DEFAULT 0
├── created_at      TIMESTAMPTZ DEFAULT now()
└── updated_at      TIMESTAMPTZ DEFAULT now()
```

### 2.4 Team Members

```
team_members
├── id              UUID PK DEFAULT gen_random_uuid()
├── name            VARCHAR(100) NOT NULL
├── role_uz         VARCHAR(100) NOT NULL
├── role_ru         VARCHAR(100) NOT NULL
├── bio_uz          TEXT NOT NULL
├── bio_ru          TEXT NOT NULL
├── photo_url       TEXT                         -- uploaded via Vercel Blob
├── sort_order      INTEGER DEFAULT 0
├── is_active       BOOLEAN DEFAULT true
├── created_at      TIMESTAMPTZ DEFAULT now()
└── updated_at      TIMESTAMPTZ DEFAULT now()
```

### 2.5 About Page

```
about_content
├── id              UUID PK DEFAULT gen_random_uuid()
├── section         VARCHAR(50) NOT NULL UNIQUE  -- 'history', 'values', 'header'
├── data_uz         JSONB NOT NULL               -- flexible structured content
├── data_ru         JSONB NOT NULL
└── updated_at      TIMESTAMPTZ DEFAULT now()
```

`data_uz`/`data_ru` example for `section = 'history'`:
```json
{
  "paragraphs": ["...", "...", "..."],
  "timeline": [{ "year": "2021", "event": "..." }, ...]
}
```

### 2.6 Advertising Page

```
ad_packages
├── id              UUID PK DEFAULT gen_random_uuid()
├── section         VARCHAR(50) NOT NULL          -- 'benefits', 'formats', 'pricing'
├── data_uz         JSONB NOT NULL
├── data_ru         JSONB NOT NULL
├── sort_order      INTEGER DEFAULT 0
└── updated_at      TIMESTAMPTZ DEFAULT now()
```

### 2.7 Site Settings (Global)

```
site_settings
├── id              UUID PK DEFAULT gen_random_uuid()
├── key             VARCHAR(100) UNIQUE NOT NULL
├── value_uz        TEXT
├── value_ru        TEXT
├── value_shared    TEXT                          -- for non-translatable values (URLs, phones)
└── updated_at      TIMESTAMPTZ DEFAULT now()
```

Pre-seeded keys:
- `phone_live` → `+998 55 515 88 40`
- `phone_advertising` → `+998 95 560 22 22`
- `email` → `info@temp.fm`
- `address_uz` / `address_ru`
- `social_instagram` → URL
- `social_telegram` → URL
- `stream_url_default` → `https://tempradio-live.uz/live`
- `stream_url_apple` → `https://tempradio-live.uz/streamaac`
- `footer_tagline_uz` / `footer_tagline_ru`
- `stat_frequency`, `stat_listeners`, `stat_years`, `stat_team_size`

### 2.8 SEO Metadata

```
seo_metadata
├── id              UUID PK DEFAULT gen_random_uuid()
├── page_slug       VARCHAR(50) UNIQUE NOT NULL   -- 'home', 'about', 'news', etc.
├── title_uz        VARCHAR(200)
├── title_ru        VARCHAR(200)
├── description_uz  TEXT
├── description_ru  TEXT
├── keywords_uz     TEXT
├── keywords_ru     TEXT
└── updated_at      TIMESTAMPTZ DEFAULT now()
```

### 2.9 Future: Podcasts & Media

```
podcasts
├── id              UUID PK DEFAULT gen_random_uuid()
├── title_uz        VARCHAR(200) NOT NULL
├── title_ru        VARCHAR(200) NOT NULL
├── description_uz  TEXT
├── description_ru  TEXT
├── audio_url       TEXT                         -- Cloudflare R2 URL
├── video_url       TEXT                         -- YouTube/external embed URL
├── thumbnail_url   TEXT
├── duration_seconds INTEGER
├── show_id         UUID FK → shows.id           -- optional link to show
├── is_published    BOOLEAN DEFAULT true
├── published_at    TIMESTAMPTZ
├── created_at      TIMESTAMPTZ DEFAULT now()
└── updated_at      TIMESTAMPTZ DEFAULT now()
```

### Summary: 10 Tables Total
`users`, `shows`, `schedule_slots`, `news_articles`, `team_members`, `about_content`, `ad_packages`, `site_settings`, `seo_metadata`, `podcasts`

---

## 3. Project Structure (New Files)

```
src/
├── db/
│   ├── index.ts                    -- Neon client + Drizzle instance
│   ├── schema.ts                   -- All Drizzle table definitions
│   ├── seed.ts                     -- Seed script (imports from current uz.ts/ru.ts)
│   └── migrations/                 -- Generated by drizzle-kit
│
├── lib/
│   ├── auth.ts                     -- NextAuth.js v5 config
│   └── blob.ts                     -- Vercel Blob upload helpers
│
├── app/
│   ├── api/
│   │   ├── auth/[...nextauth]/route.ts
│   │   └── upload/route.ts         -- Image upload endpoint
│   │
│   ├── admin/                      -- Dashboard (protected)
│   │   ├── layout.tsx              -- Admin shell: sidebar nav, auth guard
│   │   ├── page.tsx                -- Dashboard overview
│   │   ├── login/page.tsx          -- Login form
│   │   ├── shows/
│   │   │   ├── page.tsx            -- List all shows
│   │   │   └── [id]/page.tsx       -- Edit show
│   │   ├── schedule/page.tsx       -- Visual schedule editor (drag time slots)
│   │   ├── news/
│   │   │   ├── page.tsx            -- List articles
│   │   │   └── [id]/page.tsx       -- Edit article
│   │   ├── team/page.tsx           -- Manage team members
│   │   ├── about/page.tsx          -- Edit about page sections
│   │   ├── advertising/page.tsx    -- Edit ad packages/pricing
│   │   ├── settings/page.tsx       -- Site settings (phones, socials, SEO, streams)
│   │   └── podcasts/               -- Future: podcast management
│   │       ├── page.tsx
│   │       └── [id]/page.tsx
│   │
│   ├── actions/                    -- Server Actions for dashboard mutations
│   │   ├── shows.ts
│   │   ├── schedule.ts
│   │   ├── news.ts
│   │   ├── team.ts
│   │   ├── about.ts
│   │   ├── advertising.ts
│   │   ├── settings.ts
│   │   └── auth.ts
│   ...existing pages (unchanged initially)
```

---

## 4. Admin Dashboard Pages

Each page has a bilingual editing interface — Uzbek and Russian fields side-by-side.

| Dashboard Page | What It Controls | Key Features |
|---|---|---|
| `/admin` | Overview | Quick stats, recent changes, shortcuts |
| `/admin/shows` | Shows/Programs | CRUD shows, toggle featured, reorder |
| `/admin/schedule` | Weekly Schedule | Assign shows to day+time slots, per-day view |
| `/admin/news` | News Articles | CRUD articles, set featured, publish/unpublish |
| `/admin/team` | Team Members | CRUD members, photo upload, reorder |
| `/admin/about` | About Page | Edit history, timeline, values, stats |
| `/admin/advertising` | Advertising | Edit benefits, formats, pricing tiers |
| `/admin/settings` | Site Settings | Contact info, social links, SEO, stream URLs |
| `/admin/podcasts` | Podcasts (future) | Upload audio, link video, manage episodes |

### Dashboard UX Principles
- Side-by-side UZ/RU fields for every translatable field
- Auto-save with "Saved" indicator (or explicit Save button)
- Image upload via drag-and-drop
- Sortable lists via drag handles
- Confirmation dialogs for destructive actions
- Mobile-responsive (editors may use phones)

---

## 5. Migration Strategy (Hardcoded → Database)

### Phase 1: Foundation (Week 1)
1. Set up Neon database + Drizzle ORM + schema
2. Run `drizzle-kit generate` and `drizzle-kit migrate`
3. Write seed script that reads current `uz.ts` and `ru.ts` dictionaries and inserts into all tables
4. Set up NextAuth.js with credentials provider
5. Create first admin user via seed script

### Phase 2: Admin Dashboard (Weeks 2-3)
1. Build admin layout (sidebar, auth guard middleware)
2. Build CRUD pages for each content type, one at a time:
   - Shows → Schedule → News → Team → About → Advertising → Settings
3. Add Vercel Blob image upload
4. Test with real editors

### Phase 3: Public Site Migration (Week 4)
1. Create data-fetching functions in `src/db/queries/` for each content type
2. Replace `dict.*` lookups in public pages with database queries
3. Use Next.js ISR (Incremental Static Regeneration) with `revalidate: 60` for performance
4. Add `revalidatePath()` calls in Server Actions so edits appear within seconds
5. Keep locale files (`uz.ts`/`ru.ts`) for UI-only strings (nav labels, button text, player labels)

### Phase 4: Polish & Future (Weeks 5-6)
1. Add podcast management (Cloudflare R2 integration)
2. Add a `/podcasts` public page
3. Audit and remove unused content from locale files
4. Add activity log (who changed what, when)

---

## 6. Public Page Data Loading Pattern

```typescript
// Example: News page
// src/db/queries/news.ts
export async function getPublishedArticles(locale: 'uz' | 'ru') {
  return db.select({
    id: newsArticles.id,
    slug: newsArticles.slug,
    category: locale === 'uz' ? newsArticles.category_uz : newsArticles.category_ru,
    title: locale === 'uz' ? newsArticles.title_uz : newsArticles.title_ru,
    excerpt: locale === 'uz' ? newsArticles.excerpt_uz : newsArticles.excerpt_ru,
    dateLabel: locale === 'uz' ? newsArticles.date_label_uz : newsArticles.date_label_ru,
    imageUrl: newsArticles.image_url,
    isFeatured: newsArticles.is_featured,
    publishedAt: newsArticles.published_at,
  })
  .from(newsArticles)
  .where(eq(newsArticles.is_published, true))
  .orderBy(desc(newsArticles.sort_order), desc(newsArticles.published_at));
}
```

Public pages become Server Components that call these query functions directly — no API layer needed for reads.

---

## 7. Caching & Performance Strategy

- **ISR**: Public pages use `revalidate = 60` (rebuild every 60 seconds max)
- **On-demand revalidation**: Server Actions call `revalidatePath('/news')` after edits for near-instant updates
- **Database queries**: Neon serverless driver with connection pooling (HTTP-based, no TCP connections to manage)
- **Images**: Vercel Blob serves via CDN automatically
- **No impact on streaming**: Audio streaming remains external (tempradio-live.uz), completely independent of this backend

---

## 8. Environment Variables (Vercel)

```
DATABASE_URL=              # Neon connection string (pooled)
DATABASE_URL_UNPOOLED=     # Neon direct connection (for migrations)
NEXTAUTH_SECRET=           # Random secret for JWT signing
NEXTAUTH_URL=              # Site URL
BLOB_READ_WRITE_TOKEN=     # Vercel Blob token
```

---

## 9. Files to Modify (Existing)

| File | Change |
|---|---|
| `src/app/layout.tsx` | Add SessionProvider wrapper for admin routes |
| `src/app/page.tsx` | Replace `dict.home.shows.items` with DB query for featured shows |
| `src/app/news/page.tsx` | Replace `dict.news.*` with DB query |
| `src/app/schedule/page.tsx` | Replace `dict.schedule.shows.*` with DB query |
| `src/app/about/page.tsx` | Replace `dict.about.*` with DB queries |
| `src/app/advertising/page.tsx` | Replace `dict.advertising.*` with DB query |
| `src/components/Footer.tsx` | Fetch social links & contact from site_settings |
| `src/components/ContactsModal.tsx` | Fetch phone numbers from site_settings |
| `src/components/Navigation.tsx` | No change (nav labels stay in locale files) |
| `src/components/AudioProvider.tsx` | Optionally fetch stream URLs from site_settings |
| `src/i18n/locales/uz.ts` | Remove content data, keep only UI strings |
| `src/i18n/locales/ru.ts` | Remove content data, keep only UI strings |
| `package.json` | Add new dependencies |
| `next.config.ts` | Add Vercel Blob image domain if needed |

---

## 10. Verification & Testing

1. **Database**: Run `drizzle-kit studio` to visually inspect all tables and seeded data
2. **Seed verification**: Compare seeded DB content against current `uz.ts`/`ru.ts` — every piece of content must match
3. **Admin dashboard**: Log in, edit a show title in both languages, verify it appears on the public schedule page
4. **News flow**: Create a new article in admin → verify it shows on `/news` page
5. **Image upload**: Upload a team member photo → verify it renders on `/about`
6. **ISR check**: Edit content in admin → verify public page updates within ~60 seconds (or instantly with revalidation)
7. **Auth**: Verify non-admin users cannot access `/admin/*` routes
8. **Mobile**: Test admin dashboard on phone screen
9. **Locale switching**: Verify UZ/RU toggle still works correctly with DB-sourced content
10. **Existing features preserved**: Radio player, 3D background, animations, stream metadata — all must continue working unchanged
