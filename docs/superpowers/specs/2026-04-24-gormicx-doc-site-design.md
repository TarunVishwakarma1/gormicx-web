# gormicx Documentation Website — Design Spec

**Date:** 2026-04-24  
**Author:** Tarun Vishwakarma  
**Stack:** Next.js + Nextra + Tailwind CSS  
**Theme:** Black / White / Amber (`#f59e0b`)

---

## 1. Overview

A documentation website for the gormicx ORM (`github.com/tarunvishwakarma1/gormicx`). Built with Nextra using approach B: a custom full-bleed homepage (`pages/index.tsx`) paired with Nextra's docs theme for all 12 documentation sections.

---

## 2. Architecture

**Approach:** Nextra Docs Theme + Custom Homepage (single repo, single `next.config.js`).

- `pages/index.tsx` — standalone Next.js page, no Nextra docs shell, full design control
- `pages/docs/*.mdx` — all doc pages rendered by `nextra-theme-docs` with amber sidebar
- `theme.config.jsx` — Nextra configuration (logo, colors, footer, search)
- `tailwind.config.js` — amber/black/white design tokens

---

## 3. File Structure

```
gormicx-web/
├── next.config.js
├── theme.config.jsx
├── tailwind.config.js
├── package.json
│
├── pages/
│   ├── _app.tsx
│   ├── index.tsx                  ← custom hero homepage
│   └── docs/
│       ├── _meta.json             ← sidebar order & labels
│       ├── getting-started.mdx
│       ├── models.mdx
│       ├── query-builder.mdx
│       ├── crud.mdx
│       ├── transactions.mdx
│       ├── batch-operations.mdx
│       ├── hooks.mdx
│       ├── schema-migration.mdx
│       ├── connection-config.mdx
│       ├── drivers.mdx
│       ├── logging.mdx
│       └── error-reference.mdx
│
├── components/
│   ├── Hero.tsx
│   ├── FeatureGrid.tsx
│   ├── CodePreview.tsx
│   └── DatabaseBadges.tsx
│
└── styles/
    └── globals.css
```

---

## 4. Homepage (`pages/index.tsx`)

### Section order

1. **Nav** — sticky, `#0a0a0a` bg, amber diamond logo + "gormicx" wordmark, links: Docs / Drivers / GitHub, amber "Get Started" CTA button
2. **Hero** — amber radial glow, release badge pill, 3-layer tagline, dual CTA, install command
3. **Database Badges** — 7 supported DB pills
4. **Feature Grid** — 6 cards, amber top-border
5. **Code Preview** — syntax-highlighted fluent query builder example
6. **Footer CTA** — "Ready to build?" + "Read the Docs →" button

### Hero copy

```
[badge] OPEN SOURCE · MIT LICENSE

One ORM.
Every Database.               ← white, 52px, 900 weight
SQL and NoSQL, unified.       ← amber, 18px, 600 weight
Blazingly fast. Minimal footprint.  ← gray, 14px

[Documentation →]  [View on GitHub ↗]

$ go get github.com/tarunvishwakarma1/gormicx
```

### Feature Grid (6 cards)

| Icon | Title | Description |
|------|-------|-------------|
| ⚡ | Unified API | Single interface for SQL and NoSQL. No context switching. |
| 🔒 | Goroutine-Safe | Engine and query builder safe for concurrent use out of the box. |
| 🔌 | Pluggable Drivers | Blank-import a driver. It self-registers. Zero boilerplate. |
| 🔗 | Fluent Query Builder | Immutable chain. No hidden mutation. Safe to share. |
| 🪝 | Lifecycle Hooks | BeforeCreate, AfterUpdate, and more — engine or model level. |
| 💾 | Schema Caching | Structs parsed once via reflection. Cached in sync.Map. |

### Code Preview snippet

```go
db, err := gormicx.Open("postgres", dsn,
    gormicx.WithMaxOpenConns(25),
)

err = db.Find(ctx, &User{}).
    Where(clause.Gt("age", 18)).
    OrderBy(clause.AscCol("name")).
    Limit(20).
    Find(&users)
```

---

## 5. Docs Pages (`pages/docs/*.mdx`)

### Sidebar order (`_meta.json`)

```json
{
  "getting-started": "Getting Started",
  "models": "Models",
  "query-builder": "Query Builder",
  "crud": "CRUD",
  "transactions": "Transactions",
  "batch-operations": "Batch Operations",
  "hooks": "Hooks",
  "schema-migration": "Schema Migration",
  "connection-config": "Connection & Config",
  "drivers": "Drivers",
  "logging": "Logging",
  "error-reference": "Error Reference"
}
```

### Per-page content

All content sourced from README.md — no invented content.

| Page | Key sections |
|------|-------------|
| `getting-started` | Install, blank-import driver, Open connection, define model, AutoMigrate, CRUD quickstart |
| `models` | Embedding Model, field table (ID/CreatedAt/UpdatedAt/DeletedAt), custom PK, TableName(), struct tag reference table |
| `query-builder` | Fluent chain, Where conditions (all clause types), JOINs, Count, Raw queries |
| `crud` | Create, Find many, First, Update (Set), Delete — each with code example |
| `transactions` | Tx callback pattern, rollback on error, panic recovery note |
| `batch-operations` | CreateBatch, DeleteBatch, batch size guidance |
| `hooks` | Engine-level RegisterHook, model-level interface, all 8 hook types, execution order |
| `schema-migration` | AutoMigrate, CreateTable, HasTable, DropTable (warning callout) |
| `connection-config` | All WithXxx options table, Pool Stats |
| `drivers` | Supported DB table, all DSN formats, Writing Custom Driver interface |
| `logging` | Log levels, WithLogger option, custom logger interface example (zap) |
| `error-reference` | All sentinel errors table with conditions |

### MDX page conventions

- H1 = page title
- Short italicised description under H1
- Fenced Go code blocks (Shiki syntax highlighting)
- `<Callout type="warning">` for destructive ops (DropTable)
- Tables for reference data (tags, errors, DSN formats)
- No content invented — all sourced from README

---

## 6. Theme Configuration (`theme.config.jsx`)

| Setting | Value |
|---------|-------|
| Logo | Amber `◆` diamond + "gormicx" 800-weight wordmark |
| Primary color | `#f59e0b` (amber-500) |
| Sidebar background | `#0a0a0a` |
| Sidebar text (inactive) | `#888888` |
| Sidebar text (active) | `#ffffff` with amber left border |
| Search | Enabled (Nextra FlexSearch default) |
| TOC | Enabled |
| Footer | "MIT License · Tarun Vishwakarma · github.com/tarunvishwakarma1/gormicx" |
| Edit link | Disabled |
| Dark mode toggle | Disabled (fixed dark theme) |

---

## 7. Design Tokens (`styles/globals.css`)

```css
:root {
  --color-bg:       #0a0a0a;
  --color-surface:  #0f0f0f;
  --color-border:   #1a1a1a;
  --color-amber:    #f59e0b;
  --color-text:     #ffffff;
  --color-muted:    #888888;
  --color-dim:      #555555;
}
```

Code blocks: dark background `#111`, amber top-border accent on active items.

---

## 8. Dependencies

```json
{
  "next": "^14",
  "nextra": "^2",
  "nextra-theme-docs": "^2",
  "react": "^18",
  "react-dom": "^18",
  "tailwindcss": "^3",
  "autoprefixer": "^10",
  "postcss": "^8"
}
```

---

## 9. Out of Scope

- Dark/light mode toggle (fixed dark theme)
- Versioned docs
- i18n
- API auto-generation from Go source
- Analytics
