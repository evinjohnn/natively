# Natively — SEO & GEO Improvement Report

**Site:** https://natively.software
**Branch:** `geo-optimization`
**Last updated:** 2026-06-09

This report documents the SEO/GEO work on the Natively marketing site: what was
audited, how Natively compares to competitors, what changed in this round, and a
prioritized 30/60/90-day roadmap. It builds on prior commits in this branch
(`d1ec6a3`, `2fe40f0`) that delivered the technical/GEO foundation.

A guiding constraint throughout: **no fabricated claims, no keyword stuffing, no
black-hat tactics.** Every product capability stated on the new pages traces to
`public/llms.txt` (the product source of truth), and every competitor figure
traces to that competitor's own public pricing page, with a "verify current
details" note where pricing is cited.

---

## 1. What was audited

The audit covered the live site and its build pipeline:

- **Technical SEO** — crawlability, indexability, canonical tags, robots.txt, sitemap, hreflang, JS rendering/prerendering.
- **Metadata** — titles, descriptions, Open Graph, Twitter cards, per-route uniqueness.
- **Structured data** — Organization, WebSite, SoftwareApplication, BreadcrumbList, FAQPage, Article, VideoObject.
- **Content** — existing interview-focused page library, thin-content risk, duplicate-content risk.
- **Internal linking** — orphan pages, link equity flow, footer/related-links coverage.
- **GEO / AI-search readiness** — `llms.txt`, AI-crawler access in robots.txt, citable facts, entity clarity.
- **Architecture** — how pages are built (React + Vite + react-router + puppeteer prerender) and the cost of adding pages correctly.

### Starting state (already strong from prior work in this branch)

The prior session had already completed the heavy technical lifting:

- Full-body puppeteer prerender for all routes (fixed previously-empty `#root`).
- Corrected Organization/author schema; removed self-serving `aggregateRating`/`Review` and an invalid `SearchAction`.
- Accurate pricing across schema + pages (Free/BYOK + Natively API $8–$35).
- `llms.txt` rewritten from real product data; robots.txt extended for AI crawlers.
- A curated internal-linking network (`RelatedLinks`) eliminating orphan pages.
- 31 bilingual (EN/RU) pages: 18 SEO landing + 8 blog + 5 comparison/alternative.

### Key gap identified in this audit

The existing library was **entirely interview-focused**, but `llms.txt` documents
that Natively genuinely ships meeting, note-taking, sales-call, and lecture
capabilities (persona system, dual-channel transcription, local RAG, dashboard
export). The site had **zero pages** for that vertical and **zero Fireflies/Otter**
comparison pages — the two dominant meeting/note-taker competitors. That product-true,
non-duplicative gap is the focus of this round.

---

## 2. Competitor findings

Analysis drew on the saved competitor HTML in `competitors/` and each competitor's
public pricing page (fetched 2026; verify before re-citing).

| Competitor | Positioning (their own title) | Category | Pricing (public, 2026) | Natively's angle |
|---|---|---|---|---|
| **Cluely** | "Live AI Meeting Assistant — Real-Time Meeting Notes and AI Insights" | Cloud meeting/interview assistant | Paid (App Store) | Local-first, free, open-source, invisible overlay (not a bot) |
| **Final Round AI** | "#1 AI Interview Assistant & Prep Tool (10M+ Users)" | Cloud interview prep + copilot | ~$25–50/mo | Free/BYOK, on-device privacy, offline, <500ms |
| **Interview Coder** | "AI Interview Assistant for Technical Interviews" | Paid coding-interview tool | Paid | Free, local, covers behavioral + system design + RAG, not coding-only |
| **LockedIn AI** | Real-time interview copilot | Cloud copilot | ~$55–70/mo | Free or fully offline; any LLM, not vendor-locked |
| **Fireflies.ai** | Cloud meeting notetaker | Team meeting intelligence | Free (400 min/team); Pro $10/seat/mo, Business $19/seat/mo, Enterprise $39 (annual) | Local-first, no bot in call, real-time help, interview-capable, free |
| **Otter.ai** | "Otter Meeting Agent — AI Notetaker, Transcription, Insights" | Cloud transcription/notes | Free 300 min/mo; Pro $8.33–16.99/user, Business $19.99–30/user | On-device, no minute cap (local), real-time help, also does interviews |

### Where competitors are genuinely stronger (stated fairly on-page)

- **Fireflies/Otter:** mature CRM/workflow integrations, team-wide shared meeting databases, polished mobile apps (Otter), conversation-intelligence dashboards, a bot that captures meetings you don't attend.
- **Final Round AI:** large library of structured practice/mock scenarios; strong brand.

### Where Natively wins (the consistent differentiators)

- **Privacy:** local-first; zero outbound traffic in local mode; AGPL-3.0 auditable.
- **Real-time:** sub-500ms in-call assistance, not just post-call notes.
- **Cost:** genuinely free via Ollama/BYOK; no per-seat subscription, no minute caps in local mode.
- **Breadth:** one app spans interviews, meetings, sales calls, and lectures.
- **Invisibility:** native overlay, not a visible meeting bot.

### What Natively was missing vs the field (now addressed)

- No meeting/note-taker/sales/lecture landing pages → **added (4).**
- No Fireflies/Otter comparison or alternative pages → **added (4).**
- Missing high-intent interview pages (system design, behavioral, answer generator, live) → **added (4).**
- No programmatic-SEO foundation → **added template + 6 sample pages.**

---

## 3. What changed this round

### Pages created (18 net-new, English-first)

All use the existing `SEOTemplate` (bilingual-ready, schema-injected, internally
linked) and bare-path URLs matching site convention. URLs were deliberately **not**
placed under `/features/`, `/compare/`, `/alternatives/` because ~10 such pages
already exist at bare paths — prefixed duplicates would create duplicate-content
problems.

**Meeting / notes vertical (4):**
`/ai-meeting-assistant`, `/ai-note-taker`, `/sales-call-assistant`, `/lecture-note-taker`

**Fireflies / Otter comparison + alternative (4):**
`/natively-vs-fireflies`, `/natively-vs-otter`, `/fireflies-alternative`, `/otter-alternative`

**Missing interview pages (4):**
`/system-design-interview-assistant`, `/behavioral-interview-assistant`, `/interview-answer-generator`, `/live-interview-assistant`

**Programmatic (template + 6 samples):**
`/interview-questions/{software-engineer,product-manager,data-scientist,ai-engineer}`,
`/system-design/{uber,whatsapp}`
— driven by typed data (`src/data/interviewQuestions.ts`, `src/data/systemDesign.ts`)
rendered through shared templates (`src/pages/programmatic/`), so future pages scale
without copy-paste. Each sample is hand-written and substantial (≥400 words, 8–12
real Q&A or a full design walk-through) to satisfy the quality gate.

### Metadata added

- Unique `<title>` + meta description for all 18 pages (verified no duplicates site-wide except the intentional shared-canonical T&C routes).
- Open Graph + Twitter tags via `SEOHead`/Helmet, deduplicated against the base template by the prerender's head-normalization.
- hreflang `en` + `x-default` per new page (RU deferred — see roadmap).

### Schema added (per page, injected at prerender)

- **BreadcrumbList** on every new page (verified present and valid JSON-LD).
- **FAQPage** on the 12 pages that declare inline FAQs (retained for AI/LLM citation value; not claimed for Google rich results on a commercial site).
- Pages declare `schemaType: 'SoftwareApplication'` consistent with existing pages; site-wide SoftwareApplication identity is carried by the homepage `index.html`.
- Homepage: **VideoObject** schema for the YouTube product demo, plus YouTube/Telegram added to Organization `sameAs` (committed from the pending changes).

### Internal linking

- `RelatedLinks` map extended with curated entries for all 12 new SEO pages (4 contextual links each).
- Inbound links woven from high-value existing pages (`/ai-interview-assistant`, `/interview-copilot`, `/cluely-alternative`, `/natively-vs-cluely`) into the new pages — **no orphans.**
- New **"Meeting AI"** footer column site-wide (6 links) with EN+RU i18n keys.
- New homepage **"One assistant for every conversation"** band linking the four use-case verticals (in-content homepage inbound links).

### Technical fixes / housekeeping

- `public/sitemap.xml`: 18 new `<loc>` entries.
- `public/llms.txt`: demo-video section + YouTube link (committed from pending).
- Prerender now emits **77 pages** (was 59), all passing the content/H1 assertion that fails the build on an empty render.

---

## 4. Verification performed

- `npx tsc --noEmit` — **clean** (zero type errors).
- `npm run lint` — no new issues in added files (only a pre-existing error in a `.remember/tmp` scratch file, unrelated).
- `npm run build` + `postbuild` prerender — **77/77 pages** rendered with full body content; all 18 new pages present in `dist/`.
- Broken-link scan — no stale `/natively-alternative` references.
- Duplicate `<title>` scan — none (besides intentional shared-canonical T&C).
- JSON-LD validity — every `ld+json` block on sampled new pages parses (9/9, 8/8, 8/8).
- Prerendered-HTML spot checks — H1, canonical, hreflang, breadcrumb/FAQ schema, internal links, homepage use-cases band, and footer column all confirmed in `dist/`.

> Note: the local prerender step is known to be intermittently flaky against system
> Chrome (`ERR_CONNECTION_REFUSED` on a random route); it has built-in retries and a
> re-run produces a clean 77/77. This affects local builds only, not page quality.

---

## 5. Remaining tasks / known limitations

- **RU body content for the 18 new pages.** They ship with RU title/description meta but English body, and are marked `skipRu` in the prerender so no English body is served under `lang="ru"` and no RU URL is indexed. Backfilling full RU bodies (matching existing pages) is the largest follow-up.
- **SoftwareApplication JSON-LD is now emitted per-page.** `buildSchemaTags` appends a page-scoped SoftwareApplication block (page URL + locale-correct description, lean single free offer) for every route that declares `schemaType: 'SoftwareApplication'`, and the homepage's full multi-tier block is stripped from interior pages so each page carries exactly one, page-accurate entity. Non-product pages (blog posts, programmatic question lists) correctly carry none. The homepage retains its complete offers entity.
- **Base-template JSON-LD leak is fixed.** The base `index.html` ships 7 static (non-Helmet) JSON-LD blocks that the prerender captures onto every interior page. The prerender now strips the 5 homepage-specific types (`SoftwareApplication`, `WebPage`, `VideoObject`, `FAQPage`, `BreadcrumbList`) from interior pages while preserving the 2 genuinely site-level types (`Organization`, `WebSite`) everywhere. Interior pages re-emit their own page-scoped `BreadcrumbList`/`FAQPage`/`SoftwareApplication` via `buildSchemaTags`. Net result per interior page: Organization + WebSite + its own Breadcrumb (+ its own SoftwareApplication/FAQ/Article where applicable) — no duplicate breadcrumbs, no homepage WebPage/VideoObject/FAQ bleeding through. The homepage retains all 7 blocks.
- **Programmatic scale-up is intentionally gated** — only 6 high-quality samples shipped. Do not mass-generate company/role pages until each passes the quality gate.
- **Measurement is not code-configurable** — GSC/GA4/PageSpeed/sitemap submission must be done in those consoles (checklist below).

---

## 6. Measurement checklist (manual, outside the codebase)

- [ ] Google Search Console: confirm property verified (BingSiteAuth.xml present for Bing); submit `https://natively.software/sitemap.xml`.
- [ ] GA4: confirm install tracking; add conversion events for Download / Pro checkout / API signup CTAs.
- [ ] PageSpeed Insights / CrUX: baseline LCP, INP, CLS for homepage + 2 new pages.
- [ ] Request indexing for the 18 new URLs; monitor "indexed" count weekly.
- [ ] Keyword tracking: set up rank monitoring for the priority terms in §7.

---

## 7. 30 / 60 / 90-day roadmap

### Next 30 days — capture intent, confirm indexing
- Submit updated sitemap; request indexing for all 18 new pages.
- Track ranking for high-intent, lower-competition terms now covered:
  *Fireflies alternative, Otter alternative, AI meeting assistant (local), AI note taker offline, sales call assistant, system design interview assistant, behavioral interview assistant, live interview assistant.*
- Add 2–3 internal links from the homepage/blog into the new meeting pages as content allows.
- Verify GA4 conversion events fire on all primary CTAs.

### 60 days — localization parity + depth
- Backfill full **RU body content** for the 18 new pages (remove `skipRu`, add `/ru` sitemap entries + hreflang), matching the existing bilingual standard.
- Add 2–3 supporting **blog posts** targeting the meeting vertical (e.g. "How to take private meeting notes without a bot", "Best local meeting assistants 2026") linking to the new feature pages.
- Expand `RelatedLinks` further so every meeting page has 4+ inbound links from blog content.

### 90 days — programmatic scale-up (gated) + measurement loop
- If the 6 samples perform, scale the programmatic system **behind the quality gate**:
  add company interview pages (`/interview-questions/google-software-engineer`, `…meta…`, `…amazon-sde…`) and more `/system-design/*` (Netflix, Twitter) — each hand-reviewed for ≥60% unique content, never auto-generated in bulk.
- Build out remaining behavioral question pages (`/behavioral-questions/*`) using the same data-driven template if early role pages rank.
- Establish a monthly review: indexed-page count, ranking movement on priority terms, AI-citation appearances (ChatGPT/Perplexity), and CTA conversion — feeding the next content cycle.

---

## 8. Architecture note (for whoever continues this)

Adding a page touches **5 synchronized locations** — keep them in sync:
1. `src/pages/seo/<Name>.tsx` (or `src/pages/programmatic/`) — the component.
2. `src/routes.tsx` — `pages` map **and** `pathToKey`.
3. `src/App.tsx` — EN route, `/ru` route, and the destructured import.
4. `scripts/prerender.js` — `seoRoutes` entry (title/desc/schema/faqs; `skipRu` while English-only).
5. `public/sitemap.xml` — `<loc>` (bare path; add `/ru` once RU body exists).

Then add the page to `src/components/RelatedLinks.tsx` (and, for a vertical,
`Footer.tsx` + i18n keys). The prerender's `assertRendered` is the safety net: an
empty or H1-less page fails the build.
