# gormicx Homepage — Magazine Hero Redesign

**Date:** 2026-04-24
**Author:** Tarun Vishwakarma
**Scope:** `pages/index.tsx` full replacement + `components/` additions
**Goal:** Portfolio-quality screenshot — magazine editorial hero viewport

---

## 1. Context

The existing homepage uses a centered SaaS hero layout. This redesign replaces it with an editorial split-column layout inspired by Awwwards / Wallpaper* magazine. The primary deliverable is a single viewport screenshot for a portfolio. The doc pages (`pages/docs/*`) and all other files are untouched.

---

## 2. Layout — Hero Viewport

### Nav (sticky, full-width)

- Background: `#0a0a0a`, bottom border `#111`
- Left: amber `◆` diamond (7×7px, rotated 45°) + "gormicx" wordmark (800 weight, 14px, `#fff`)
- Right: "DOCS" · "DRIVERS" · "GITHUB ↗" — all uppercase, `letter-spacing: 1.5px`, 11px, `#444`
- No "Get Started" button — too SaaS

### Hero Body — Two-Column Grid (`grid-template-columns: 1.1fr 0.9fr`)

#### Left Column

| Element | Spec |
|---------|------|
| Top label | 16px amber horizontal rule + "OPEN SOURCE · MIT LICENSE" in amber, 9px, `letter-spacing: 3px` |
| Headline | "One ORM." / "Every" / "Database." — 58px, weight 900, `letter-spacing: -3.5px`, `line-height: 0.92`. "Database." in `#f59e0b`, rest in `#fff` |
| Amber rule | 40px wide, 2px tall, `#f59e0b`, margin 20px vertical |
| Descriptor | "SQL and NoSQL through a single, pluggable driver interface. Goroutine-safe. Minimal footprint." — 12px, `#555`, `line-height: 1.8` |
| CTAs | "Documentation →" (amber fill, black text, 800 weight) + "View on GitHub ↗" (bordered, `#888`) |
| Install command | `$ go get github.com/tarunvishwakarma1/gormicx` — dark bg `#0f0f0f`, amber left-border (2px), monospace 10px |

#### Right Column

**Stat Grid (2×2):**

| Stat | Value | Color |
|------|-------|-------|
| Databases | 7 | `#fff` |
| Boilerplate | 0 | `#fff` |
| Goroutines | ∞ | `#f59e0b` |
| License | MIT | `#fff` |

- First stat (7 Databases): amber top-border `1px solid #f59e0b`
- Others: `1px solid #222` top-border
- Values: 30px, weight 900, `letter-spacing: -1px`
- Labels: 8px, `letter-spacing: 2.5px`, uppercase, `#444`

**Code Block:**
- Background `#0f0f0f`, border `#1e1e1e`, macOS window chrome dots
- Syntax-highlighted gormicx.Open + fluent query builder (same tokens as existing `CodePreview.tsx`)
- 9.5px monospace, `line-height: 1.85`

### Bottom Editorial Strip

Full-width, border-top `#111`, padding `10px 40px`. DB names in dim uppercase (`#222`, `letter-spacing: 2px`) left. GitHub URL right. Like a magazine masthead footer.

---

## 3. Animations

### 3.1 Custom Amber Cursor

- Hide default cursor globally (`cursor: none` on `body`)
- Fixed `div` element: 14px circle, `rgba(245,158,11,0.25)` fill + `1px solid rgba(245,158,11,0.6)` border, `box-shadow: 0 0 12px rgba(245,158,11,0.3)`
- Follows mouse via `mousemove` listener with `transform: translate(x, y)` — use `requestAnimationFrame` for smooth lerp (lerp factor 0.12)
- On hover over `a`, `button`: scale down to 0.4 + invert fill to solid amber (`transition: transform 0.2s, background 0.2s`)
- Implementation: `components/CursorGlow.tsx` — renders fixed div, mounts listener in `useEffect`

### 3.2 Headline Word Reveal

- Each word of the headline ("One ORM." / "Every" / "Database.") wrapped in a `span.word-wrapper` with `overflow: hidden`
- Inner `span.word` starts at `transform: translateY(110%)`, animates to `translateY(0)`
- CSS keyframe `wordReveal` — `cubic-bezier(0.16, 1, 0.3, 1)` (snappy ease-out)
- Stagger: word 1 at `0.2s`, word 2 at `0.38s`, word 3 at `0.56s`
- Duration: `0.75s` each
- `animation-fill-mode: forwards`

### 3.3 Stats Counter Roll

- On mount, each numeric stat counts from `0` to its target value
- Duration: `600ms`, `easeOutQuart` curve (`t => 1 - Math.pow(1-t, 4)`)
- `∞` symbol: no counter, fades in at `300ms` delay
- `MIT`: no counter, fades in at `300ms` delay
- Implementation: `useCountUp(target, duration)` custom hook — uses `requestAnimationFrame`

### 3.4 Animated Film Grain

- Fixed full-screen `div`, `pointer-events: none`, `z-index: 9998` (below cursor overlay)
- SVG `<feTurbulence>` noise filter applied via CSS `filter: url(#grain)`
- Inline SVG `<defs>` with `<animate>` on `seed` attribute — cycles 0→10 at `0.5s` interval, creates animated grain
- Opacity: `0.035` (very subtle — texture not distraction)
- Implementation: `components/FilmGrain.tsx`

### 3.5 Ambient Glow Pulse

- The radial amber glow `div` in the left column uses a CSS keyframe `glowPulse`
- Animates `opacity` from `0.12` → `0.22` → `0.12`
- Duration: `4s`, `ease-in-out`, `infinite`
- `will-change: opacity` for GPU compositing

---

## 4. Component Map

| File | Role |
|------|------|
| `pages/index.tsx` | Full replacement — split layout, all sections |
| `components/CursorGlow.tsx` | Custom amber cursor with lerp tracking |
| `components/FilmGrain.tsx` | Fixed grain overlay with animated SVG noise |
| `styles/globals.css` | Add `cursor: none` on body, `wordReveal` keyframe, `glowPulse` keyframe |

Existing components (`Hero.tsx`, `DatabaseBadges.tsx`, `FeatureGrid.tsx`, `CodePreview.tsx`) are **retired** — their content is inlined into the new `pages/index.tsx` for full design control.

---

## 5. Design Tokens (unchanged)

```
--color-bg:      #0a0a0a
--color-surface: #0f0f0f
--color-border:  #1a1a1a
--color-amber:   #f59e0b
--color-text:    #ffffff
--color-muted:   #888888
--color-dim:     #555555
```

---

## 6. Out of Scope

- Sections below the hero (DB badges section, feature grid, code preview section, footer CTA) — not redesigned, not shown in portfolio screenshot
- Mobile responsiveness — portfolio screenshot is desktop only
- Magnetic buttons (option 5) — excluded by user preference
- Dark/light toggle, i18n, analytics
