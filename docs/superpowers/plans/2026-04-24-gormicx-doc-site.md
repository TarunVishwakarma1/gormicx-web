# gormicx Documentation Website Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a Nextra-powered documentation website for the gormicx ORM with a custom black/white/amber hero homepage and 12 MDX doc pages covering all features.

**Architecture:** Single Next.js 14 repo. `pages/index.tsx` is a fully custom page (no Nextra shell) for the hero. All `pages/docs/*.mdx` use `nextra-theme-docs` with amber sidebar forced to dark. Tailwind CSS powers homepage components; Nextra's built-in Shiki handles code highlighting in docs.

**Tech Stack:** Next.js 14, Nextra 2, nextra-theme-docs 2, React 18, Tailwind CSS 3, TypeScript

---

## File Map

| File | Responsibility |
|------|----------------|
| `package.json` | Dependencies and scripts |
| `next.config.js` | Nextra + Next.js config |
| `theme.config.jsx` | Nextra docs theme: logo, amber color, forced dark, footer |
| `tailwind.config.js` | Tailwind tokens (amber/black/white) |
| `postcss.config.js` | PostCSS for Tailwind |
| `tsconfig.json` | TypeScript config |
| `styles/globals.css` | CSS variables, Nextra sidebar dark overrides |
| `pages/_app.tsx` | Inject global styles |
| `pages/index.tsx` | Custom homepage — Nav + Hero + sections, no Nextra shell |
| `pages/docs/_meta.json` | Sidebar order and labels for all 12 sections |
| `pages/docs/getting-started.mdx` | Install, quick start, full example |
| `pages/docs/models.mdx` | Model definition, tags reference, naming strategy |
| `pages/docs/query-builder.mdx` | Fluent builder, all clause types, joins, raw |
| `pages/docs/crud.mdx` | Create, Find, Update, Delete with code examples |
| `pages/docs/transactions.mdx` | Tx callback, rollback, panic recovery |
| `pages/docs/batch-operations.mdx` | CreateBatch, DeleteBatch |
| `pages/docs/hooks.mdx` | Engine-level and model-level hooks |
| `pages/docs/schema-migration.mdx` | AutoMigrate, CreateTable, HasTable, DropTable |
| `pages/docs/connection-config.mdx` | All WithXxx options, pool stats |
| `pages/docs/drivers.mdx` | Supported DBs, DSN formats, custom driver interface |
| `pages/docs/logging.mdx` | Log levels, WithLogger, custom logger example |
| `pages/docs/error-reference.mdx` | All sentinel errors table |
| `components/Hero.tsx` | Hero section: amber glow, 3-layer tagline, dual CTA, install command |
| `components/DatabaseBadges.tsx` | 7 DB support pills |
| `components/FeatureGrid.tsx` | 6-card feature grid with amber top-border |
| `components/CodePreview.tsx` | Syntax-highlighted fluent query snippet |

---

### Task 1: Initialize project

**Files:**
- Create: `package.json`
- Create: `.gitignore`
- Create: `tsconfig.json`

- [ ] **Step 1: Create package.json**

```json
{
  "name": "gormicx-web",
  "version": "0.1.0",
  "private": true,
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start"
  },
  "dependencies": {
    "next": "14.2.29",
    "nextra": "2.13.4",
    "nextra-theme-docs": "2.13.4",
    "react": "^18.3.1",
    "react-dom": "^18.3.1"
  },
  "devDependencies": {
    "@types/node": "^20",
    "@types/react": "^18",
    "@types/react-dom": "^18",
    "autoprefixer": "^10.4.19",
    "postcss": "^8.4.38",
    "tailwindcss": "^3.4.4",
    "typescript": "^5"
  }
}
```

- [ ] **Step 2: Create .gitignore**

```
node_modules/
.next/
out/
.superpowers/
```

- [ ] **Step 3: Create tsconfig.json**

```json
{
  "compilerOptions": {
    "target": "ES2017",
    "lib": ["dom", "dom.iterable", "esnext"],
    "allowJs": true,
    "skipLibCheck": true,
    "strict": true,
    "noEmit": true,
    "esModuleInterop": true,
    "module": "esnext",
    "moduleResolution": "bundler",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "jsx": "preserve",
    "incremental": true,
    "paths": { "@/*": ["./*"] }
  },
  "include": ["next-env.d.ts", "**/*.ts", "**/*.tsx"],
  "exclude": ["node_modules"]
}
```

- [ ] **Step 4: Install dependencies**

```bash
npm install
```

Expected: `node_modules/` created, no peer dependency errors.

- [ ] **Step 5: Commit**

```bash
git add package.json .gitignore tsconfig.json package-lock.json
git commit -m "chore: initialize Next.js + Nextra project"
```

---

### Task 2: Build tooling config

**Files:**
- Create: `next.config.js`
- Create: `postcss.config.js`
- Create: `tailwind.config.js`

- [ ] **Step 1: Create next.config.js**

```js
const withNextra = require('nextra')({
  theme: 'nextra-theme-docs',
  themeConfig: './theme.config.jsx',
})

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
}

module.exports = withNextra(nextConfig)
```

- [ ] **Step 2: Create postcss.config.js**

```js
module.exports = {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
}
```

- [ ] **Step 3: Create tailwind.config.js**

```js
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        amber: {
          400: '#fbbf24',
          500: '#f59e0b',
          600: '#d97706',
        },
      },
    },
  },
  plugins: [],
  darkMode: 'class',
}
```

- [ ] **Step 4: Commit**

```bash
git add next.config.js postcss.config.js tailwind.config.js
git commit -m "chore: add Next.js, Nextra, and Tailwind config"
```

---

### Task 3: Global styles + Nextra theme + app wrapper

**Files:**
- Create: `styles/globals.css`
- Create: `theme.config.jsx`
- Create: `pages/_app.tsx`

- [ ] **Step 1: Create styles/globals.css**

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

:root {
  --color-bg:      #0a0a0a;
  --color-surface: #0f0f0f;
  --color-border:  #1a1a1a;
  --color-amber:   #f59e0b;
  --color-text:    #ffffff;
  --color-muted:   #888888;
  --color-dim:     #555555;
}

/* Force dark bg on Nextra shell */
html,
body,
.nextra-nav-container,
.nextra-sidebar-container,
.nextra-content {
  background-color: var(--color-bg) !important;
}

/* Sidebar border */
.nextra-sidebar-container {
  border-right: 1px solid var(--color-border) !important;
}

/* Inactive sidebar links */
.nextra-sidebar-container a {
  color: var(--color-muted) !important;
}
.nextra-sidebar-container a:hover {
  color: var(--color-text) !important;
}

/* Active sidebar item */
.nextra-sidebar-container li a[aria-current='page'] {
  color: #fff !important;
  background: #111 !important;
  border-left: 2px solid var(--color-amber);
}

/* Code blocks */
.nextra-code-block pre {
  background: #111 !important;
  border: 1px solid var(--color-border) !important;
}

/* Thin scrollbar */
::-webkit-scrollbar        { width: 4px; }
::-webkit-scrollbar-track  { background: var(--color-bg); }
::-webkit-scrollbar-thumb  { background: #333; border-radius: 2px; }
```

- [ ] **Step 2: Create theme.config.jsx**

```jsx
/** @type {import('nextra-theme-docs').DocsThemeConfig} */
const config = {
  logo: (
    <span style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
      <span style={{ color: '#f59e0b', fontSize: 18, fontWeight: 900, lineHeight: 1 }}>
        ◆
      </span>
      <span style={{ fontWeight: 800, fontSize: 15, color: '#fff', letterSpacing: '-0.3px' }}>
        gormicx
      </span>
    </span>
  ),
  project: {
    link: 'https://github.com/tarunvishwakarma1/gormicx',
  },
  docsRepositoryBase: 'https://github.com/tarunvishwakarma1/gormicx',
  useNextSeoProps() {
    return { titleTemplate: '%s – gormicx' }
  },
  head: (
    <>
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta
        name="description"
        content="gormicx — blazingly fast, minimal-footprint ORM for Go"
      />
    </>
  ),
  primaryHue: 38,
  primarySaturation: 96,
  nextThemes: {
    defaultTheme: 'dark',
    forcedTheme: 'dark',
  },
  footer: {
    text: 'MIT License · Tarun Vishwakarma · github.com/tarunvishwakarma1/gormicx',
  },
  editLink: { component: null },
  feedback: { content: null },
  sidebar: {
    defaultMenuCollapseLevel: 1,
    toggleButton: true,
  },
  toc: { backToTop: true },
}

export default config
```

- [ ] **Step 3: Create pages/_app.tsx**

```tsx
import type { AppProps } from 'next/app'
import '../styles/globals.css'

export default function App({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />
}
```

- [ ] **Step 4: Commit**

```bash
git add styles/globals.css theme.config.jsx pages/_app.tsx
git commit -m "feat: add Nextra theme config, global styles, and app wrapper"
```

---

### Task 4: Hero component

**Files:**
- Create: `components/Hero.tsx`

- [ ] **Step 1: Create components/Hero.tsx**

```tsx
export default function Hero() {
  function copyInstall() {
    navigator.clipboard.writeText('go get github.com/tarunvishwakarma1/gormicx')
  }

  return (
    <section className="relative overflow-hidden px-6 pt-20 pb-16 text-center">
      {/* Amber radial glow */}
      <div
        className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-2/3"
        style={{
          width: 700,
          height: 350,
          background:
            'radial-gradient(ellipse, rgba(245,158,11,0.18) 0%, transparent 70%)',
        }}
      />

      {/* Badge */}
      <div className="mb-7 inline-flex items-center gap-2 rounded-full border px-4 py-1.5"
        style={{ borderColor: 'rgba(245,158,11,0.3)', background: 'rgba(245,158,11,0.05)' }}>
        <span className="h-1.5 w-1.5 rounded-full bg-amber-500" />
        <span className="text-[11px] font-semibold tracking-widest text-amber-500">
          OPEN SOURCE · MIT LICENSE
        </span>
      </div>

      {/* Headline */}
      <h1 className="mb-4 text-5xl font-black leading-[1.05] tracking-[-2px] text-white md:text-6xl">
        One ORM.<br />Every Database.
      </h1>

      {/* Sub-headlines */}
      <p className="mb-2 text-lg font-semibold text-amber-500">
        SQL and NoSQL, unified.
      </p>
      <p className="mb-9 text-sm" style={{ color: '#555' }}>
        Blazingly fast. Minimal footprint.
      </p>

      {/* CTAs */}
      <div className="mb-10 flex justify-center gap-3">
        <a
          href="/docs/getting-started"
          className="rounded-md bg-amber-500 px-7 py-3 text-[13px] font-extrabold tracking-wide text-black transition hover:bg-amber-400"
        >
          Documentation →
        </a>
        <a
          href="https://github.com/tarunvishwakarma1/gormicx"
          target="_blank"
          rel="noopener noreferrer"
          className="rounded-md border px-7 py-3 text-[13px] transition hover:text-white"
          style={{ borderColor: '#2a2a2a', color: '#aaa' }}
        >
          View on GitHub ↗
        </a>
      </div>

      {/* Install command */}
      <div
        className="inline-flex items-center gap-3 rounded-md border bg-[#111] px-5 py-3 font-mono text-[12px]"
        style={{ borderColor: '#222', borderLeftColor: '#f59e0b', borderLeftWidth: 3 }}
      >
        <span style={{ color: '#555' }}>$</span>
        <span className="text-amber-500">go get</span>
        <span style={{ color: '#e2e8f0' }}>github.com/tarunvishwakarma1/gormicx</span>
        <button onClick={copyInstall} title="Copy" style={{ color: '#444' }}
          className="ml-1 transition hover:text-[#888]">
          ⎘
        </button>
      </div>
    </section>
  )
}
```

- [ ] **Step 2: Commit**

```bash
git add components/Hero.tsx
git commit -m "feat: add Hero component"
```

---

### Task 5: DatabaseBadges component

**Files:**
- Create: `components/DatabaseBadges.tsx`

- [ ] **Step 1: Create components/DatabaseBadges.tsx**

```tsx
const DBS = [
  'PostgreSQL',
  'MySQL',
  'MongoDB',
  'CockroachDB',
  'MariaDB',
  'Cassandra',
  'Snowflake',
]

export default function DatabaseBadges() {
  return (
    <div className="px-6 pb-14 text-center">
      <p className="mb-4 text-[11px] uppercase tracking-[3px]" style={{ color: '#444' }}>
        Supported Databases
      </p>
      <div className="flex flex-wrap justify-center gap-2">
        {DBS.map((db) => (
          <span
            key={db}
            className="rounded border bg-[#111] px-3 py-1.5 text-[11px] font-semibold"
            style={{ borderColor: '#222', color: '#888' }}
          >
            {db}
          </span>
        ))}
      </div>
    </div>
  )
}
```

- [ ] **Step 2: Commit**

```bash
git add components/DatabaseBadges.tsx
git commit -m "feat: add DatabaseBadges component"
```

---

### Task 6: FeatureGrid component

**Files:**
- Create: `components/FeatureGrid.tsx`

- [ ] **Step 1: Create components/FeatureGrid.tsx**

```tsx
const FEATURES = [
  {
    icon: '⚡',
    title: 'Unified API',
    desc: 'Single interface for SQL and NoSQL. No context switching.',
  },
  {
    icon: '🔒',
    title: 'Goroutine-Safe',
    desc: 'Engine and query builder safe for concurrent use out of the box.',
  },
  {
    icon: '🔌',
    title: 'Pluggable Drivers',
    desc: 'Blank-import a driver. It self-registers. Zero boilerplate.',
  },
  {
    icon: '🔗',
    title: 'Fluent Query Builder',
    desc: 'Immutable chain. No hidden mutation. Safe to share across goroutines.',
  },
  {
    icon: '🪝',
    title: 'Lifecycle Hooks',
    desc: 'BeforeCreate, AfterUpdate, and more — engine or model level.',
  },
  {
    icon: '💾',
    title: 'Schema Caching',
    desc: 'Structs parsed once via reflection. Cached in sync.Map.',
  },
]

export default function FeatureGrid() {
  return (
    <div className="px-6 pb-16">
      <p className="mb-7 text-center text-[11px] uppercase tracking-[3px]" style={{ color: '#444' }}>
        Why gormicx
      </p>
      <div className="mx-auto grid max-w-4xl grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {FEATURES.map((f) => (
          <div
            key={f.title}
            className="rounded-md border bg-[#0f0f0f] p-5"
            style={{
              borderColor: '#1a1a1a',
              borderTopWidth: 2,
              borderTopColor: '#f59e0b',
            }}
          >
            <div className="mb-2.5 text-xl">{f.icon}</div>
            <h3 className="mb-1.5 text-[13px] font-bold text-white">{f.title}</h3>
            <p className="text-[11px] leading-relaxed" style={{ color: '#555' }}>
              {f.desc}
            </p>
          </div>
        ))}
      </div>
    </div>
  )
}
```

- [ ] **Step 2: Commit**

```bash
git add components/FeatureGrid.tsx
git commit -m "feat: add FeatureGrid component"
```

---

### Task 7: CodePreview component

**Files:**
- Create: `components/CodePreview.tsx`

- [ ] **Step 1: Create components/CodePreview.tsx**

```tsx
// Token colors match the VS Code dark+ / GitHub Dark palette
const lines = [
  [
    { c: '#555', t: '// Open a connection' },
  ],
  [
    { c: '#7dd3fc', t: 'db' },
    { c: '#fff', t: ', ' },
    { c: '#7dd3fc', t: 'err' },
    { c: '#fff', t: ' := ' },
    { c: '#f59e0b', t: 'gormicx' },
    { c: '#fff', t: '.' },
    { c: '#86efac', t: 'Open' },
    { c: '#fff', t: '(' },
    { c: '#a78bfa', t: '"postgres"' },
    { c: '#fff', t: ', dsn,' },
  ],
  [
    { c: '#fff', t: '    ' },
    { c: '#f59e0b', t: 'gormicx' },
    { c: '#fff', t: '.' },
    { c: '#86efac', t: 'WithMaxOpenConns' },
    { c: '#fff', t: '(' },
    { c: '#fb923c', t: '25' },
    { c: '#fff', t: '),' },
  ],
  [{ c: '#fff', t: ')' }],
  [{ c: '#fff', t: '' }],
  [{ c: '#555', t: '// Fluent query builder' }],
  [
    { c: '#7dd3fc', t: 'err' },
    { c: '#fff', t: ' = ' },
    { c: '#7dd3fc', t: 'db' },
    { c: '#fff', t: '.' },
    { c: '#86efac', t: 'Find' },
    { c: '#fff', t: '(ctx, &' },
    { c: '#7dd3fc', t: 'User' },
    { c: '#fff', t: '{}).' },
  ],
  [
    { c: '#fff', t: '    ' },
    { c: '#86efac', t: 'Where' },
    { c: '#fff', t: '(' },
    { c: '#f59e0b', t: 'clause' },
    { c: '#fff', t: '.' },
    { c: '#86efac', t: 'Gt' },
    { c: '#fff', t: '(' },
    { c: '#a78bfa', t: '"age"' },
    { c: '#fff', t: ', ' },
    { c: '#fb923c', t: '18' },
    { c: '#fff', t: ')).' },
  ],
  [
    { c: '#fff', t: '    ' },
    { c: '#86efac', t: 'OrderBy' },
    { c: '#fff', t: '(' },
    { c: '#f59e0b', t: 'clause' },
    { c: '#fff', t: '.' },
    { c: '#86efac', t: 'AscCol' },
    { c: '#fff', t: '(' },
    { c: '#a78bfa', t: '"name"' },
    { c: '#fff', t: ')).' },
  ],
  [
    { c: '#fff', t: '    ' },
    { c: '#86efac', t: 'Limit' },
    { c: '#fff', t: '(' },
    { c: '#fb923c', t: '20' },
    { c: '#fff', t: ').' },
  ],
  [
    { c: '#fff', t: '    ' },
    { c: '#86efac', t: 'Find' },
    { c: '#fff', t: '(&' },
    { c: '#7dd3fc', t: 'users' },
    { c: '#fff', t: ')' },
  ],
]

export default function CodePreview() {
  return (
    <div className="px-6 pb-16">
      <p className="mb-7 text-center text-[11px] uppercase tracking-[3px]" style={{ color: '#444' }}>
        Looks Like This
      </p>
      <div
        className="mx-auto max-w-2xl overflow-hidden rounded-lg border"
        style={{ borderColor: '#1e1e1e' }}
      >
        {/* Window chrome */}
        <div
          className="flex items-center gap-2 border-b px-4 py-2.5"
          style={{ background: '#111', borderColor: '#1e1e1e' }}
        >
          <span className="h-2.5 w-2.5 rounded-full" style={{ background: '#ff5f57' }} />
          <span className="h-2.5 w-2.5 rounded-full" style={{ background: '#ffbd2e' }} />
          <span className="h-2.5 w-2.5 rounded-full" style={{ background: '#28c840' }} />
          <span className="ml-2 text-[11px]" style={{ color: '#444' }}>main.go</span>
        </div>
        {/* Code */}
        <pre
          className="overflow-x-auto p-5 font-mono text-[11px] leading-[1.85]"
          style={{ background: '#0f0f0f' }}
        >
          <code>
            {lines.map((tokens, i) => (
              <div key={i}>
                {tokens.map((tok, j) => (
                  <span key={j} style={{ color: tok.c }}>{tok.t}</span>
                ))}
              </div>
            ))}
          </code>
        </pre>
      </div>
    </div>
  )
}
```

- [ ] **Step 2: Commit**

```bash
git add components/CodePreview.tsx
git commit -m "feat: add CodePreview component"
```

---

### Task 8: Homepage

**Files:**
- Create: `pages/index.tsx`

- [ ] **Step 1: Create pages/index.tsx**

```tsx
import Head from 'next/head'
import Link from 'next/link'
import Hero from '../components/Hero'
import DatabaseBadges from '../components/DatabaseBadges'
import FeatureGrid from '../components/FeatureGrid'
import CodePreview from '../components/CodePreview'

export default function Home() {
  return (
    <>
      <Head>
        <title>gormicx — One ORM. Every Database.</title>
        <meta
          name="description"
          content="gormicx is a blazingly fast, minimal-footprint ORM for Go supporting SQL and NoSQL through a unified pluggable driver interface."
        />
      </Head>

      <div className="min-h-screen" style={{ background: '#0a0a0a', color: '#fff' }}>
        {/* Navbar */}
        <nav
          className="sticky top-0 z-50 flex items-center justify-between border-b px-8 py-3.5"
          style={{ background: '#0a0a0a', borderColor: '#1a1a1a' }}
        >
          <Link href="/" className="flex items-center gap-2 no-underline">
            <span className="text-lg font-black text-amber-500" style={{ lineHeight: 1 }}>◆</span>
            <span className="text-[15px] font-extrabold text-white" style={{ letterSpacing: '-0.3px' }}>
              gormicx
            </span>
          </Link>
          <div className="flex items-center gap-6">
            <Link href="/docs/getting-started"
              className="text-[13px] transition hover:text-white" style={{ color: '#666' }}>
              Docs
            </Link>
            <Link href="/docs/drivers"
              className="text-[13px] transition hover:text-white" style={{ color: '#666' }}>
              Drivers
            </Link>
            <a
              href="https://github.com/tarunvishwakarma1/gormicx"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[13px] transition hover:text-white"
              style={{ color: '#666' }}
            >
              GitHub ↗
            </a>
            <Link
              href="/docs/getting-started"
              className="rounded-md bg-amber-500 px-4 py-1.5 text-[12px] font-bold text-black transition hover:bg-amber-400"
            >
              Get Started
            </Link>
          </div>
        </nav>

        <main>
          <Hero />
          <DatabaseBadges />
          <FeatureGrid />
          <CodePreview />
        </main>

        {/* Footer CTA */}
        <div className="border-t px-6 py-14 text-center" style={{ borderColor: '#111' }}>
          <h2 className="mb-2 text-[22px] font-extrabold text-white">Ready to build?</h2>
          <p className="mb-6 text-[13px]" style={{ color: '#555' }}>
            Full docs. Real examples. Every database.
          </p>
          <Link
            href="/docs/getting-started"
            className="inline-block rounded-md bg-amber-500 px-8 py-3 text-[13px] font-extrabold text-black transition hover:bg-amber-400"
          >
            Read the Docs →
          </Link>
        </div>

        {/* Footer */}
        <footer className="border-t px-8 py-6 text-center text-[11px]"
          style={{ borderColor: '#111', color: '#444' }}>
          MIT License · Tarun Vishwakarma ·{' '}
          <a
            href="https://github.com/tarunvishwakarma1/gormicx"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-[#888]"
          >
            github.com/tarunvishwakarma1/gormicx
          </a>
        </footer>
      </div>
    </>
  )
}
```

- [ ] **Step 2: Run dev and verify homepage**

```bash
npm run dev
```

Open `http://localhost:3000`. Verify:
- Black background, sticky nav with amber `◆` logo
- Amber glow behind headline, 3-layer tagline
- DB badges row, 6 feature cards with amber top-border
- Code preview with window chrome
- Footer CTA

Stop with `Ctrl+C`.

- [ ] **Step 3: Commit**

```bash
git add pages/index.tsx
git commit -m "feat: add custom homepage"
```

---

### Task 9: Docs sidebar config

**Files:**
- Create: `pages/docs/_meta.json`

- [ ] **Step 1: Create pages/docs/_meta.json**

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

- [ ] **Step 2: Commit**

```bash
git add pages/docs/_meta.json
git commit -m "feat: add Nextra docs sidebar config"
```

---

### Task 10: Getting Started doc page

**Files:**
- Create: `pages/docs/getting-started.mdx`

- [ ] **Step 1: Create pages/docs/getting-started.mdx**

````mdx
# Getting Started

*Install gormicx, connect to a database, define a model, and run your first queries in minutes.*

## Installation

Install the core library:

```bash
go get github.com/tarunvishwakarma1/gormicx
```

Then install the driver for your database:

```bash
# PostgreSQL / CockroachDB
go get github.com/jackc/pgx/v5

# MySQL / MariaDB
go get github.com/go-sql-driver/mysql

# MongoDB
go get go.mongodb.org/mongo-driver/mongo

# Cassandra
go get github.com/gocql/gocql

# Snowflake
go get github.com/snowflakedb/gosnowflake
```

## 1. Import the library and a driver

```go
import (
    "github.com/tarunvishwakarma1/gormicx"
    _ "github.com/tarunvishwakarma1/gormicx/drivers/postgres" // blank import registers driver
)
```

The blank import (`_`) triggers the driver's `init()` which registers it under its name. No explicit setup needed.

## 2. Open a connection

```go
db, err := gormicx.Open("postgres", "postgres://user:password@localhost:5432/mydb",
    gormicx.WithMaxOpenConns(25),
    gormicx.WithMaxIdleConns(10),
    gormicx.WithLogLevel(logger.Info),
)
if err != nil {
    log.Fatal(err)
}
defer db.Close()
```

## 3. Define a model

```go
type User struct {
    gormicx.Model                                    // Embeds ID, CreatedAt, UpdatedAt, DeletedAt
    Name     string `gx:"column:name;index"`
    Email    string `gx:"column:email;unique;not_null;size:255"`
    Age      int    `gx:"column:age"`
    Role     string `gx:"column:role;size:50;default"`
}
```

## 4. Migrate schema

```go
if err := db.AutoMigrate(ctx, &User{}); err != nil {
    log.Fatal(err)
}
```

## 5. CRUD

```go
ctx := context.Background()

// Create
user := &User{Name: "Alice", Email: "alice@example.com", Age: 30}
if err := db.Create(ctx, user); err != nil {
    log.Fatal(err)
}

// Find many
var users []User
err = db.Find(ctx, &User{}).
    Where(clause.Gt("age", 18)).
    OrderBy(clause.AscCol("name")).
    Limit(20).
    Offset(0).
    Find(&users)

// Find one
var u User
err = db.Find(ctx, &User{}).
    Where(clause.Eq("email", "alice@example.com")).
    First(&u)

// Update
n, err := db.Find(ctx, &User{}).
    Where(clause.Eq("id", user.ID)).
    Set(map[string]any{"name": "Alice Smith", "age": 31})

// Delete
n, err = db.Find(ctx, &User{}).
    Where(clause.Eq("id", user.ID)).
    Delete()
```

## Full Example

```go
package main

import (
    "context"
    "fmt"
    "log"

    "github.com/tarunvishwakarma1/gormicx"
    "github.com/tarunvishwakarma1/gormicx/clause"
    "github.com/tarunvishwakarma1/gormicx/logger"
    _ "github.com/tarunvishwakarma1/gormicx/drivers/postgres"
)

type User struct {
    gormicx.Model
    Name  string `gx:"column:name;not_null;size:100"`
    Email string `gx:"column:email;unique;not_null;size:255"`
    Age   int    `gx:"column:age"`
}

func main() {
    ctx := context.Background()

    db, err := gormicx.Open(
        "postgres",
        "postgres://user:pass@localhost:5432/mydb?sslmode=disable",
        gormicx.WithMaxOpenConns(20),
        gormicx.WithLogLevel(logger.Info),
    )
    if err != nil {
        log.Fatal(err)
    }
    defer db.Close()

    if err := db.AutoMigrate(ctx, &User{}); err != nil {
        log.Fatal(err)
    }

    alice := &User{Name: "Alice", Email: "alice@example.com", Age: 30}
    if err := db.Create(ctx, alice); err != nil {
        log.Fatal(err)
    }
    log.Printf("created user id=%d", alice.ID)

    var adults []User
    if err := db.Find(ctx, &User{}).
        Where(clause.Gte("age", 18)).
        OrderBy(clause.AscCol("name")).
        Limit(50).
        Find(&adults); err != nil {
        log.Fatal(err)
    }

    var count int64
    if err := db.Raw(ctx, "SELECT COUNT(*) FROM users WHERE age > $1", 18).Scan(&count); err != nil {
        log.Fatal(err)
    }
    fmt.Printf("adult users: %d\n", count)
}
```
````

- [ ] **Step 2: Verify page**

```bash
npm run dev
```

Open `http://localhost:3000/docs/getting-started`. Expected: Nextra sidebar shows all 12 sections, content renders with code blocks, amber primary color visible.

Stop with `Ctrl+C`.

- [ ] **Step 3: Commit**

```bash
git add pages/docs/getting-started.mdx
git commit -m "docs: add Getting Started page"
```

---

### Task 11: Models doc page

**Files:**
- Create: `pages/docs/models.mdx`

- [ ] **Step 1: Create pages/docs/models.mdx**

````mdx
# Models

*Define your data structures using Go structs with `gx` struct tags.*

## Embedding `gormicx.Model`

```go
type Post struct {
    gormicx.Model          // provides: ID, CreatedAt, UpdatedAt, DeletedAt
    Title   string `gx:"column:title;not_null;size:500"`
    Body    string `gx:"column:body"`
    UserID  uint   `gx:"column:user_id;index"`
}
```

`gormicx.Model` provides:

| Field       | Type         | Description                            |
|-------------|--------------|----------------------------------------|
| `ID`        | `uint`       | Auto-increment primary key             |
| `CreatedAt` | `time.Time`  | Set on first insert                    |
| `UpdatedAt` | `time.Time`  | Updated on every save                  |
| `DeletedAt` | `*time.Time` | `nil` = active, non-nil = soft-deleted |

## Custom Primary Key

```go
type Product struct {
    SKU   string  `gx:"primaryKey;column:sku"`
    Name  string  `gx:"column:name;not_null"`
    Price float64 `gx:"column:price"`
}
```

## Custom Table Name

Implement `TableName() string` on your model:

```go
func (*User) TableName() string { return "app_users" }
```

## Struct Tag Reference (`gx:"..."`)

Tags are semicolon-separated key or `key:value` pairs.

| Tag                      | Effect                          |
|--------------------------|---------------------------------|
| `column:name`            | Override database column name   |
| `primaryKey` / `pk`      | Mark as primary key             |
| `autoIncrement` / `auto` | Auto-increment primary key      |
| `not_null` / `notnull`   | NOT NULL constraint             |
| `unique`                 | UNIQUE constraint               |
| `index`                  | Create an index on this column  |
| `size:N`                 | Column size e.g. `VARCHAR(255)` |
| `precision:N`            | Decimal precision               |
| `default`                | Column has a default value      |
| `-`                      | Ignore this field entirely      |

## Naming Strategy

By default gormicx converts Go struct names to `snake_case` table names (pluralised) and field names to `snake_case` column names.

| Go struct  | Default table |
|------------|---------------|
| `User`     | `users`       |
| `BlogPost` | `blog_posts`  |
| `HTTPLog`  | `http_logs`   |

Customise with options:

```go
gormicx.WithTablePrefix("app_")   // → app_users
gormicx.WithSingularTable(true)   // → user (not users)
```
````

- [ ] **Step 2: Commit**

```bash
git add pages/docs/models.mdx
git commit -m "docs: add Models page"
```

---

### Task 12: Query Builder doc page

**Files:**
- Create: `pages/docs/query-builder.mdx`

- [ ] **Step 1: Create pages/docs/query-builder.mdx**

````mdx
# Query Builder

*Fluent, immutable query construction. Each method returns a new `*Query` — safe to share across goroutines.*

## Basic Usage

```go
var users []User
err := db.Find(ctx, &User{}).
    Where(clause.And(
        clause.Gt("age", 18),
        clause.Like("name", "A%"),
    )).
    OrderBy(clause.AscCol("name"), clause.DescCol("age")).
    Select("id", "name", "email").
    GroupBy("role").
    Limit(10).
    Offset(20).
    Find(&users)
```

## Where Conditions

```go
clause.Eq("col", val)         // col = val
clause.Ne("col", val)         // col != val
clause.Gt("col", val)         // col > val
clause.Gte("col", val)        // col >= val
clause.Lt("col", val)         // col < val
clause.Lte("col", val)        // col <= val
clause.In("col", 1, 2, 3)     // col IN (1, 2, 3)
clause.NotIn("col", 1, 2)     // col NOT IN (1, 2)
clause.Like("col", "%foo%")   // col LIKE '%foo%'
clause.IsNull("col")          // col IS NULL
clause.IsNotNull("col")       // col IS NOT NULL
clause.Between("col", lo, hi) // col BETWEEN lo AND hi
```

## Logical Grouping

```go
clause.And(cond1, cond2)     // (cond1 AND cond2)
clause.Or(cond1, cond2)      // (cond1 OR cond2)
clause.Not(clause.And(...))  // NOT (...)
```

## SQL JOINs

```go
type OrderWithUser struct {
    OrderID int
    Name    string
    Total   float64
}

var results []OrderWithUser
err := db.Find(ctx, &Order{}).
    Join(clause.InnerJoin, "users", clause.And(
        clause.Eq("orders.user_id", "users.id"),
    ), "u").
    Select("orders.id", "u.name", "orders.total").
    Find(&results)
```

## Count

```go
count, err := db.Find(ctx, &User{}).
    Where(clause.Gt("age", 18)).
    Count()
```

## Raw Queries

```go
// Scan into struct
var u User
err := db.Raw(ctx, "SELECT * FROM users WHERE id = $1", 42).Scan(&u)

// Scan scalar
var count int64
err = db.Raw(ctx, "SELECT COUNT(*) FROM users").Scan(&count)
```
````

- [ ] **Step 2: Commit**

```bash
git add pages/docs/query-builder.mdx
git commit -m "docs: add Query Builder page"
```

---

### Task 13: CRUD doc page

**Files:**
- Create: `pages/docs/crud.mdx`

- [ ] **Step 1: Create pages/docs/crud.mdx**

````mdx
# CRUD

*Create, read, update, and delete records.*

## Create

```go
user := &User{Name: "Alice", Email: "alice@example.com", Age: 30}
if err := db.Create(ctx, user); err != nil {
    log.Fatal(err)
}
// user.ID is populated after insert
```

## Find Many

```go
var users []User
err := db.Find(ctx, &User{}).
    Where(clause.Gt("age", 18)).
    OrderBy(clause.AscCol("name")).
    Limit(20).
    Offset(0).
    Find(&users)
```

## Find One

```go
var u User
err := db.Find(ctx, &User{}).
    Where(clause.Eq("email", "alice@example.com")).
    First(&u)

if errors.Is(err, gormicx.ErrRecordNotFound) {
    // no record matched
}
```

## Update

```go
n, err := db.Find(ctx, &User{}).
    Where(clause.Eq("id", user.ID)).
    Set(map[string]any{"name": "Alice Smith", "age": 31})
// n = rows affected
```

## Delete

```go
n, err := db.Find(ctx, &User{}).
    Where(clause.Eq("id", user.ID)).
    Delete()
// Models embedding gormicx.Model are soft-deleted (DeletedAt set, row not removed)
```
````

- [ ] **Step 2: Commit**

```bash
git add pages/docs/crud.mdx
git commit -m "docs: add CRUD page"
```

---

### Task 14: Transactions doc page

**Files:**
- Create: `pages/docs/transactions.mdx`

- [ ] **Step 1: Create pages/docs/transactions.mdx**

````mdx
# Transactions

*ACID transactions for SQL drivers: PostgreSQL, MySQL, CockroachDB, Snowflake. MongoDB and Cassandra return `ErrUnsupported`.*

## Basic Transaction

```go
err := db.Tx(ctx, func(tx *gormicx.Tx) error {
    if err := tx.Create(ctx, &Order{UserID: 1, Total: 99.99}); err != nil {
        return err // automatic ROLLBACK
    }
    if _, err := tx.Find(ctx, &Inventory{}).
        Where(clause.Eq("id", 1)).
        Set(map[string]any{"stock": gormicx.Expr("stock - 1")}); err != nil {
        return err // automatic ROLLBACK
    }
    return nil // COMMIT
})
```

Returning any non-nil error triggers `ROLLBACK`. Returning `nil` triggers `COMMIT`.

## Panic Recovery

Panics inside the callback are caught, `ROLLBACK` is called, then the panic is re-raised:

```go
err := db.Tx(ctx, func(tx *gormicx.Tx) error {
    tx.Create(ctx, &Order{UserID: 1})
    panic("something went wrong") // rollback called before re-panic
    return nil
})
```

## Unsupported Drivers

```go
err := db.Tx(ctx, func(tx *gormicx.Tx) error {
    return nil
})
if errors.Is(err, gormicx.ErrUnsupported) {
    // driver does not support transactions
}
```
````

- [ ] **Step 2: Commit**

```bash
git add pages/docs/transactions.mdx
git commit -m "docs: add Transactions page"
```

---

### Task 15: Batch Operations doc page

**Files:**
- Create: `pages/docs/batch-operations.mdx`

- [ ] **Step 1: Create pages/docs/batch-operations.mdx**

````mdx
# Batch Operations

*Insert or delete large datasets with minimal round-trips.*

## CreateBatch

```go
users := []User{
    {Name: "Alice", Email: "alice@example.com"},
    {Name: "Bob",   Email: "bob@example.com"},
    // ... thousands more
}

// 100 records per round-trip
err := db.CreateBatch(ctx, &users, 100)
```

Tune the batch size to your database's limits (e.g. MySQL `max_allowed_packet`).

## DeleteBatch

```go
ids := []any{1, 2, 3, 4, 5}

// delete in batches of 500
err := db.DeleteBatch(ctx, &User{}, ids, 500)
```

## Error Handling

```go
err := db.CreateBatch(ctx, &[]User{}, 100)
if errors.Is(err, gormicx.ErrEmptyBatch) {
    // empty slice — nothing to insert
}
```
````

- [ ] **Step 2: Commit**

```bash
git add pages/docs/batch-operations.mdx
git commit -m "docs: add Batch Operations page"
```

---

### Task 16: Hooks doc page

**Files:**
- Create: `pages/docs/hooks.mdx`

- [ ] **Step 1: Create pages/docs/hooks.mdx**

````mdx
# Hooks

*Run logic before or after database operations. Two levels: engine-wide (all models) and model-level (per struct).*

## Available Hook Types

`BeforeCreate` · `AfterCreate` · `BeforeUpdate` · `AfterUpdate` · `BeforeDelete` · `AfterDelete` · `BeforeFind` · `AfterFind`

## Engine-Level Hooks

Applied to all operations across all models:

```go
db.RegisterHook(gormicx.BeforeCreate, func(ctx context.Context, model any) error {
    if u, ok := model.(*User); ok {
        u.CreatedAt = time.Now()
    }
    return nil
})

db.RegisterHook(gormicx.AfterCreate, func(ctx context.Context, model any) error {
    log.Printf("created: %+v", model)
    return nil
})
```

## Model-Level Hooks

Implement hook methods directly on your struct:

```go
func (u *User) BeforeCreate(ctx context.Context) error {
    u.Email = strings.ToLower(u.Email)
    return nil
}

func (u *User) AfterCreate(ctx context.Context) error {
    log.Printf("user %d created", u.ID)
    return nil
}
```

## Execution Order

Model-level hooks run **before** engine-level hooks. A non-nil error return aborts the operation.
````

- [ ] **Step 2: Commit**

```bash
git add pages/docs/hooks.mdx
git commit -m "docs: add Hooks page"
```

---

### Task 17: Schema Migration doc page

**Files:**
- Create: `pages/docs/schema-migration.mdx`

- [ ] **Step 1: Create pages/docs/schema-migration.mdx**

````mdx
# Schema Migration

*Generate and manage database tables from Go struct definitions.*

## AutoMigrate

Creates tables for one or more models. Safe to call on startup — only creates tables that don't exist:

```go
err := db.AutoMigrate(ctx, &User{}, &Post{}, &Comment{})
```

## CreateTable

Creates a single table:

```go
err := db.CreateTable(ctx, &User{})
```

## HasTable

Check if a table exists:

```go
exists, err := db.HasTable(ctx, &User{})
if exists {
    // table is present
}
```

## DropTable

import { Callout } from 'nextra/components'

<Callout type="warning">
  `DropTable` permanently deletes the table and all its data. This cannot be undone.
</Callout>

```go
err := db.DropTable(ctx, &OldModel{})
```
````

- [ ] **Step 2: Commit**

```bash
git add pages/docs/schema-migration.mdx
git commit -m "docs: add Schema Migration page"
```

---

### Task 18: Connection & Config doc page

**Files:**
- Create: `pages/docs/connection-config.mdx`

- [ ] **Step 1: Create pages/docs/connection-config.mdx**

````mdx
# Connection & Config

*Configure the connection pool, logging, and query behavior.*

## Options Reference

```go
db, err := gormicx.Open("postgres", dsn,
    gormicx.WithMaxOpenConns(50),              // max total connections
    gormicx.WithMaxIdleConns(10),              // max idle connections
    gormicx.WithConnMaxLifetime(30*time.Minute), // max connection age
    gormicx.WithConnMaxIdleTime(5*time.Minute),  // max idle time
    gormicx.WithLogLevel(logger.Debug),        // log level
    gormicx.WithLogger(myLogger),              // custom logger
    gormicx.WithPrepareStmt(true),             // prepared statement cache
    gormicx.WithDryRun(true),                  // log queries, don't execute
    gormicx.WithTablePrefix("app_"),           // prefix all table names
    gormicx.WithSingularTable(true),           // disable pluralisation
)
```

| Option | Default | Description |
|--------|---------|-------------|
| `WithMaxOpenConns(n)` | driver default | Max open connections in pool |
| `WithMaxIdleConns(n)` | driver default | Max idle connections in pool |
| `WithConnMaxLifetime(d)` | 0 (no limit) | Max age of a connection |
| `WithConnMaxIdleTime(d)` | 0 (no limit) | Max idle time before close |
| `WithLogLevel(l)` | `logger.Warn` | Minimum log level |
| `WithLogger(l)` | built-in | Custom logger implementation |
| `WithPrepareStmt(b)` | `false` | Cache prepared statements |
| `WithDryRun(b)` | `false` | Log queries without executing |
| `WithTablePrefix(s)` | `""` | Prefix added to all table names |
| `WithSingularTable(b)` | `false` | Use singular table names |

## MustOpen

Panics on error — useful in `main()` init:

```go
db := gormicx.MustOpen("postgres", dsn, gormicx.WithMaxOpenConns(20))
```

## Connection Pool Stats

```go
stats := db.Stats()
fmt.Printf(
    "open=%d idle=%d in_use=%d wait_count=%d\n",
    stats.OpenConns,
    stats.IdleConns,
    stats.InUseConns,
    stats.WaitCount,
)
```
````

- [ ] **Step 2: Commit**

```bash
git add pages/docs/connection-config.mdx
git commit -m "docs: add Connection & Config page"
```

---

### Task 19: Drivers doc page

**Files:**
- Create: `pages/docs/drivers.mdx`

- [ ] **Step 1: Create pages/docs/drivers.mdx**

````mdx
# Drivers

*Supported databases, DSN formats, and how to write a custom driver.*

## Supported Databases

| Database    | Driver package                                            | Identifier    |
|-------------|-----------------------------------------------------------|---------------|
| PostgreSQL  | `github.com/tarunvishwakarma1/gormicx/drivers/postgres`  | `"postgres"`  |
| CockroachDB | `github.com/tarunvishwakarma1/gormicx/drivers/postgres`  | `"cockroach"` |
| MySQL       | `github.com/tarunvishwakarma1/gormicx/drivers/mysql`     | `"mysql"`     |
| MariaDB     | `github.com/tarunvishwakarma1/gormicx/drivers/mysql`     | `"mariadb"`   |
| MongoDB     | `github.com/tarunvishwakarma1/gormicx/drivers/mongo`     | `"mongo"`     |
| Cassandra   | `github.com/tarunvishwakarma1/gormicx/drivers/cassandra` | `"cassandra"` |
| Snowflake   | `github.com/tarunvishwakarma1/gormicx/drivers/snowflake` | `"snowflake"` |

## DSN Formats

### PostgreSQL

```
postgres://user:password@localhost:5432/dbname?sslmode=disable
```

### CockroachDB

```
postgres://user:password@localhost:26257/dbname?sslmode=require
```

Use identifier `"cockroach"`:

```go
db, err := gormicx.Open("cockroach", dsn)
```

### MySQL / MariaDB

```
user:password@tcp(localhost:3306)/dbname?charset=utf8mb4&parseTime=True&loc=Local
```

### MongoDB

```
mongodb://user:password@localhost:27017/dbname
```

### Cassandra

```
host1,host2/keyspace?consistency=quorum
```

### Snowflake

```
user:password@account/dbname/schema?warehouse=WH&role=ROLE
```

## Writing a Custom Driver

Implement the `driver.Driver` interface and register in `init()`:

```go
package mydriver

import (
    "context"
    "github.com/tarunvishwakarma1/gormicx/clause"
    "github.com/tarunvishwakarma1/gormicx/driver"
    "github.com/tarunvishwakarma1/gormicx/schema"
)

type myDriver struct{}

func (d *myDriver) Name() string                      { return "mydb" }
func (d *myDriver) Open(dsn string) error             { return nil }
func (d *myDriver) Close() error                      { return nil }
func (d *myDriver) Ping(ctx context.Context) error    { return nil }
func (d *myDriver) Stats() driver.Stats               { return driver.Stats{} }

func (d *myDriver) Create(ctx context.Context, s *schema.Schema, records []any) error { return nil }
func (d *myDriver) Find(ctx context.Context, s *schema.Schema, dest any, clauses clause.Clauses) error { return nil }
func (d *myDriver) Update(ctx context.Context, s *schema.Schema, values map[string]any, clauses clause.Clauses) (int64, error) { return 0, nil }
func (d *myDriver) Delete(ctx context.Context, s *schema.Schema, clauses clause.Clauses) (int64, error) { return 0, nil }
func (d *myDriver) Raw(ctx context.Context, query string, args ...any) (driver.RawResult, error) { return nil, nil }
func (d *myDriver) Migrate(ctx context.Context, models []any, ns schema.NamingStrategy) error { return nil }

func init() {
    driver.Register("mydb", func() driver.Driver { return &myDriver{} })
}
```

Add transaction support by also implementing `driver.Transactor`.
````

- [ ] **Step 2: Commit**

```bash
git add pages/docs/drivers.mdx
git commit -m "docs: add Drivers page"
```

---

### Task 20: Logging doc page

**Files:**
- Create: `pages/docs/logging.mdx`

- [ ] **Step 1: Create pages/docs/logging.mdx**

````mdx
# Logging

*Configure log verbosity and plug in a custom logger.*

## Log Levels

```go
import "github.com/tarunvishwakarma1/gormicx/logger"

gormicx.WithLogLevel(logger.Silent) // no output
gormicx.WithLogLevel(logger.Error)  // errors only
gormicx.WithLogLevel(logger.Warn)   // warnings + errors (default)
gormicx.WithLogLevel(logger.Info)   // all queries
gormicx.WithLogLevel(logger.Debug)  // all queries + args
```

## Custom Logger

Implement the `logger.Logger` interface:

```go
type zapLogger struct{ z *zap.Logger }

func (l *zapLogger) Log(ctx context.Context, level logger.Level, msg string, args ...any) {
    l.z.Sugar().Infof(msg, args...)
}

func (l *zapLogger) LogQuery(ctx context.Context, query string, args []any, elapsed time.Duration, err error) {
    if err != nil {
        l.z.Error("query failed", zap.String("sql", query), zap.Error(err))
        return
    }
    l.z.Debug("query", zap.String("sql", query), zap.Duration("elapsed", elapsed))
}

func (l *zapLogger) SetLevel(level logger.Level) {}
func (l *zapLogger) GetLevel() logger.Level       { return logger.Debug }
```

Pass it via `WithLogger`:

```go
db, err := gormicx.Open("postgres", dsn,
    gormicx.WithLogger(&zapLogger{z: zap.NewNop()}),
)
```

## Dry-Run Mode

Log queries without executing them — useful for auditing generated SQL:

```go
db, err := gormicx.Open("postgres", dsn,
    gormicx.WithDryRun(true),
)
```
````

- [ ] **Step 2: Commit**

```bash
git add pages/docs/logging.mdx
git commit -m "docs: add Logging page"
```

---

### Task 21: Error Reference doc page

**Files:**
- Create: `pages/docs/error-reference.mdx`

- [ ] **Step 1: Create pages/docs/error-reference.mdx**

````mdx
# Error Reference

*All sentinel errors exported by gormicx. Use `errors.Is` for comparison.*

```go
import "errors"

err := db.Find(ctx, &User{}).First(&user)
if errors.Is(err, gormicx.ErrRecordNotFound) {
    // handle not found
}
```

## Sentinel Errors

| Error | When raised |
|-------|-------------|
| `ErrRecordNotFound` | `First()` finds no matching rows |
| `ErrDuplicateKey` | Unique constraint violation |
| `ErrInvalidModel` | Non-pointer or non-struct passed as model |
| `ErrMissingPK` | Operation requires a primary key but none is defined |
| `ErrAlreadyClosed` | `db.Close()` called more than once |
| `ErrTxAlreadyDone` | Transaction used after commit or rollback |
| `ErrNilContext` | `nil` context passed to any operation |
| `ErrEmptyBatch` | Empty slice passed to `CreateBatch` or `DeleteBatch` |
| `ErrUnsupported` | Operation not supported by the driver (e.g. transactions on MongoDB) |
| `ErrPoolExhausted` | Connection pool full and request timed out |
````

- [ ] **Step 2: Commit**

```bash
git add pages/docs/error-reference.mdx
git commit -m "docs: add Error Reference page"
```

---

### Task 22: Final build verification

**Files:** none — verification only

- [ ] **Step 1: Run production build**

```bash
npm run build
```

Expected: exits with `✓ Compiled successfully`. No TypeScript errors, no missing module errors.

- [ ] **Step 2: Spot-check all 12 doc pages in dev**

```bash
npm run dev
```

Visit each URL and confirm sidebar, content, and code blocks render:

- `http://localhost:3000` — homepage
- `http://localhost:3000/docs/getting-started`
- `http://localhost:3000/docs/models`
- `http://localhost:3000/docs/query-builder`
- `http://localhost:3000/docs/crud`
- `http://localhost:3000/docs/transactions`
- `http://localhost:3000/docs/batch-operations`
- `http://localhost:3000/docs/hooks`
- `http://localhost:3000/docs/schema-migration`
- `http://localhost:3000/docs/connection-config`
- `http://localhost:3000/docs/drivers`
- `http://localhost:3000/docs/logging`
- `http://localhost:3000/docs/error-reference`

Stop with `Ctrl+C`.

- [ ] **Step 3: Final commit**

```bash
git add .
git commit -m "chore: verify full build passes"
```
