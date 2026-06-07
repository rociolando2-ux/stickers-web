# CLAUDE.md — Project guide for AI agents

> Read this first. It captures everything a new agent needs to work on this repo
> without re-discovering it. Site is **live** at
> https://rociolando2-ux.github.io/stickers-web/

## What this is

A single-page marketing site for **Stick Your Life**, a custom waterproof-sticker
shop in Bahía Blanca, Argentina. Orders happen via **WhatsApp** and **Instagram**
(there is no backend / database / payments). UI copy is in **Spanish (es-AR)**.

**Stack:** plain HTML + CSS + vanilla JS. **No build step, no framework, no npm
deps.** Hosted on **GitHub Pages**, auto-deployed on push to `main`.

## File map

```
index.html              All markup. Sections in order: brand loader, header/nav,
                        hero, perks marquee, catalog (#catalogo), custom-order
                        wizard (#personalizados), game (#juego), reels (#reels),
                        gallery (#galeria), about (#nosotras), contact (#contacto),
                        FAQ (#faq), footer, WhatsApp float, lightbox, burst layer.
css/styles.css          All styles. Brand palette + tokens in :root.
js/data.js              ⭐ ALL EDITABLE CONTENT lives here (object `SYL`). This is
                        the only file the shop owner should need to touch.
js/main.js              All behavior. Renders the page from `SYL` and wires every
                        interaction. IIFE, "use strict". No external libs.
assets/stickers/        Real product photos (*.webp) + 2 reels (*.mp4) + loguito.jpg.
assets/stickers/cut/    Transparent die-cut cut-outs (balloon-dog, david, flores,
                        locura, snoopy, tortuga, watermelon). Used in catalog & game.
assets/logo.png         Hero logo: loguito.jpg with the white background removed.
favicon.svg             David sticker inside a pastel rounded badge (a base64 PNG
                        is embedded inline, ~67 KB).
version.json            Stamped by the deploy workflow with the published commit.
                        The page polls it to auto-refresh open tabs after a deploy.
.github/workflows/deploy.yml   Builds & publishes to GitHub Pages on push to main.
.nojekyll               Serve files as-is (no Jekyll processing).
```

## Deploy & workflow

- **Deploy = push/merge to `main`.** `deploy.yml` publishes to GitHub Pages in
  ~1–2 min. It also regenerates `version.json` with the new commit; the live page
  polls it (every 60s + on tab refocus) and reloads visitors to the new version —
  but it holds off while a form field is focused or the order form has text, so it
  never wipes an in-progress order.
- **No CI runs on pull requests** — `deploy.yml` only triggers on `push` to `main`
  (and `workflow_dispatch`). So a PR shows no checks; that's expected.
- **The owner prefers auto-deploy without being asked.** When a change is ready:
  open a PR, mark ready, **squash-merge to `main`**, then confirm the deploy run is
  green. Dev-branch convention used so far: `claude/<name>`. PRs are squash-merged.
- To confirm a deploy: list `deploy.yml` runs on `main` and check the newest run's
  `conclusion == success` for your merge commit's `head_sha`. (That MCP list call
  returns a large payload that gets saved to a file — parse it with python.)

## Editing content (everything is in `js/data.js → SYL`)

- **`config.waEnc` — the WhatsApp number, OBFUSCATED.**
  🔒 The number is **never** written in plain text anywhere (HTML/JS/comments/commit
  messages/PR bodies) — that's a deliberate anti-scraping feature. It is stored as
  base64, split into parts, and only decoded + opened **on click** (see
  `waNumber()` / `openWa()` in `main.js`). Currently set to a **test number**.
  To change it, run in the browser console and paste the result into `waEnc`:
  ```js
  const n = "INTLNUMBERNOPLUS"; [btoa(n.slice(0,7)), btoa(n.slice(7))]
  ```
  (Argentina would be `54` + `9` + area + number; the test number is a NL number.)
  **Never commit the plaintext digits.**
- `config.instagram`, `config.email`, `config.location`, `config.shipping`, `config.tagline`, `config.subtitle`.
- **`products`** — catalog cards. `{ name, cat, price, img | emoji, badge?, from? }`.
  `cat` must be an id from `categories`. Transparent cut-outs in
  `assets/stickers/cut/` look best (rendered `object-fit: contain` on a pastel tile).
- `categories` — filter chips (`todos` is required and shows all).
- **`custom.tipos / cantidades / tamanos`** — options for the multi-step order
  **wizard** (`#personalizados`). The wizard has 5 gated steps
  (tipo → cantidad → tamaño → idea → nombre); each step must be completed before
  "Siguiente" enables; the last step sends the assembled message to WhatsApp.
  Logic: `initWizard()` in `main.js`.
- **`reels`** — `{ video }` entries. Autoplay muted while in view (IntersectionObserver),
  tap to open large with sound. Section `#reels` sits above the gallery.
- **`game.pieces`** — `{ id, label, img }`. The drag-the-sticker-to-its-silhouette
  mini-game (`#juego`). Works with pointer (mouse/touch) and keyboard. `initGame()`.
- **`gallery`** — `{ img }` photos. Opens in the shared lightbox (reels + gallery).
- **`faq`** — `{ q, a }` accordion items.
- `perks` — the scrolling marquee strip.

## Brand & design

- **Palette:** `css/styles.css :root` — `--mint #A6E3C6`, `--mint-deep #79CDA6`,
  `--peach #ffd5a8`, `--pink #ffb8d2`, `--espresso #4a3a33`, plus soft variants,
  `--cream`, `--whatsapp`. Radii/shadow tokens too.
- **Fonts (Google Fonts):** `Bagel Fat One` (display, `--font-display`) + `Fredoka`
  (UI, `--font-ui`).
- **Header logo** (`.brand-logo`, upper-left): Bagel Fat One, uppercase, 3D espresso
  extrusion, multicolor — Stick = `--mint`, Your = `--peach`, Life = `--pink`.
- **Hero logo**: `assets/logo.png` (the real logo) inside a **morphing blob**
  (`.logo-blob` + `.logo-blob-shape`, animated `border-radius` + slow tilt, brand
  gradient). A CSS recreation `.wordmark` also exists (kept, currently unused).
- **"die-cut"** white sticker outline = layered `drop-shadow` filters (`.die-cut`).
- Everything heavy is gated by `prefers-reduced-motion`.

## Gotchas / things that bit us

- **Never expose the WhatsApp number in plaintext.** Keep it in `waEnc` only.
- **Google Fonts is blocked in sandboxed/headless envs** (cert errors). Headless
  screenshots therefore show a fallback font for the logos — the **live site is
  fine**. Don't "fix" the font based on a sandbox screenshot.
- The owner's original logo arrived two ways: a vector SVG trace (came out
  incomplete & monochrome — not used) and `assets/stickers/loguito.jpg` (1080² JPEG,
  the real logo — **this is the source of truth**). `assets/logo.png` is loguito with
  the white background keyed out. To regenerate it (Pillow): convert to RGBA, set
  `alpha = clip(distance_from_white * 2, 0, 255)`, zero out `alpha < 60`, crop to
  `getbbox()`, cap width ~640.
- `git add a b` aborts entirely if any pathspec doesn't match — it staged nothing
  once and almost shipped a broken image reference. Verify `git diff` after staging.
- The MCP `actions_list` for workflow runs returns a huge payload (saved to a temp
  file); slice/parse it rather than reading inline.

## Run locally

```bash
python3 -m http.server 8000   # then open http://localhost:8000
```
(Fonts and the WhatsApp link need network; the rest works offline.)

## Feature history (high level)

v1: hero + catalog + simple custom-order form + gallery + FAQ + contact, WhatsApp/IG
deep links, GitHub Pages auto-deploy, brand loader, draggable hero stickers.
Later: real photos in hero/gallery, menu closes on outside-click/Esc, auto-refresh
on deploy. Then: **multi-step order wizard**, **Reels** section (autoplay),
**David favicon**, **drag-to-silhouette game**, **real logo** in a **morphing blob**,
**WhatsApp number hardened** against scrapers, **catalog photos mapped to
categories**, header logo restyled to the Bagel Fat One 3D multicolor wordmark, and
the test WhatsApp number configured.
