# Natively — GEO / AI-Search Analysis

**Site:** https://natively.software/
**Audited:** 2026-06-20
**Scope:** Entire site (80 indexable URLs, EN + RU)
**Constraint honored:** Homepage `<title>` and meta `description` left unchanged, as requested.

> **Framing (per Google's AI optimization guide, May 2026):** "Optimizing for
> generative AI search is *still SEO*." This report treats GEO findings as SEO
> fundamentals applied to AI-search surfaces (AI Overviews, ChatGPT Search,
> Perplexity, Copilot) — not as a separate discipline. Where a community GEO
> tactic contradicts Google's primary source (e.g. `llms.txt` as a ranking
> lever, AI-specific rephrasing, mention-farming), this report defers to Google
> and flags the contradiction.

---

## 1. GEO Readiness Score: 91 / 100

Natively is already in the **top decile** for AI-search readiness. The technical
and structural foundation is essentially complete; the remaining points are
content-coverage and off-site authority, not engineering defects.

| Category | Weight | Score | Notes |
|---|---|---|---|
| Citability | 25% | 21 / 25 | Strong factual blocks, tables, FAQ. Gap: few round-up/listicle passages for "best X" queries. |
| Structural readability | 20% | 19 / 20 | Clean H1→H2→H3, question-headings, tables, lists site-wide. |
| Multi-modal | 15% | 11 / 15 | YouTube demo + `VideoObject`. Gap: no comparison infographics/charts; most interior pages are text-only. |
| Authority & brand | 20% | 16 / 20 | Named author (Evin John) + `sameAs`, real dates, GitHub. Gap: no Wikipedia/Wikidata entity; thin Reddit/YouTube mention footprint. |
| Technical accessibility | 20% | 19 / 20 | Full SSR prerender, all AI crawlers allowed. Gap: `llms-full.txt` soft-404. |

---

## 2. Platform Breakdown

| Platform | Est. readiness | Primary citation source it favors | Natively's standing |
|---|---|---|---|
| **Google AI Overviews** | High (92/100) | Top-10 ranking pages + passage extraction | Excellent — SSR, schema, passage-structured content. Now needs ranking depth on the meeting vertical. |
| **ChatGPT Search** | Medium-High (88/100) | Wikipedia (47.9%), Reddit (11.3%) | Strong on-site facts; weak off-site entity (no Wikipedia). |
| **Perplexity** | Medium (84/100) | Reddit (46.7%), Wikipedia | Best lever is community validation (Reddit threads, GitHub stars) — currently thin. |
| **Bing Copilot** | High (90/100) | Bing index + authoritative sites | `BingSiteAuth.xml` present; bingbot allowed. Submit IndexNow for new URLs. |

> Only ~11% of domains are cited by *both* ChatGPT and Google AIO for the same
> query. The on-site work below lifts Google AIO; the off-site work (§5) is what
> moves ChatGPT/Perplexity.

---

## 3. AI Crawler Access Status

Verified live at `https://natively.software/robots.txt`. **All major inference-time
AI-search crawlers are explicitly allowed** — this is correctly configured.

| Crawler | Owner | Status |
|---|---|---|
| GPTBot, OAI-SearchBot, ChatGPT-User | OpenAI | ✅ Allow |
| ClaudeBot, Claude-Web, Anthropic-AI | Anthropic | ✅ Allow |
| Google-Extended | Google (Gemini/AIO) | ✅ Allow |
| PerplexityBot, Perplexity-User | Perplexity | ✅ Allow |
| bingbot | Microsoft/Copilot | ✅ Allow |
| Applebot, Applebot-Extended | Apple Intelligence | ✅ Allow |
| meta-externalagent | Meta AI | ✅ Allow |
| CCBot | Common Crawl | ⛔ Disallow (deliberate training opt-out; does **not** affect AI-search citation) |

**No action required.** This is a model configuration.

---

## 4. llms.txt Status

- `/llms.txt` — ✅ **present, well-formed** (v2.7.0, Mintlify-style markdown, 10.7 KB). Comprehensive: product modes, pricing, feature inventory, competitor table, key URLs, `sameAs` links.
- `/llms-full.txt` — ⚠️ **soft-404.** The URL returns the SPA HTML shell with HTTP 200 (it falls through the Vercel catch-all rewrite). It is not referenced anywhere, so impact is low, but a 200-that-serves-HTML is untidy. **Fix:** either add a real `public/llms-full.txt` and an allow-rule in `vercel.json`, or leave it 404 (don't link it).

> **Evidence-based caveat (do not overweight):** No major AI search system
> currently consumes third-party `llms.txt` (Mueller & Illyes 2025; SE Ranking
> 300k-domain study; OtterlyAI server-log audit found 0.1% of AI-bot traffic
> hits the file). For a *developer-tooling* site like Natively it is still a net
> win — AI **coding agents** (Cursor, Cline, Claude Code) do read it — so keep
> it. Just don't present it as a citation-ranking lever.

---

## 5. Brand Mention Analysis (highest-leverage remaining work)

Ahrefs (Dec 2025, 75k brands): **brand mentions correlate ~3× more strongly with
AI visibility than backlinks.** This is Natively's biggest opportunity — the
on-site work is largely done; the off-site footprint is thin.

| Signal | Correlation w/ AI citations | Natively today | Action |
|---|---|---|---|
| YouTube mentions | ~0.737 (strongest) | One demo video (`@evinjohn`) | Publish 3–5 short feature/comparison clips; embed on matching pages. |
| Reddit mentions | High (drives Perplexity 46.7%, ChatGPT 11.3%) | Minimal | Authentic participation in r/cscareerquestions, r/leetcode, r/LocalLLaMA, r/ollama — **answer questions, don't spam** (Google explicitly rejects mention-farming). |
| Wikipedia / Wikidata | High (ChatGPT 47.9%) | None | Create a **Wikidata** item for "Natively (software)" (lower bar than Wikipedia); cite independent coverage. |
| LinkedIn | Moderate | Company page exists | Post launch notes / comparisons that earn reshares. |
| GitHub | High for dev tools | AGPL repo live | Keep README current; star growth is itself a cit(able signal. |

**These are off-codebase actions** — they belong in the owner's growth backlog,
not this repo. Flagged here because they now outweigh any further on-page tuning.

---

## 6. Passage-Level Citability

Sampled homepage + interior pages. Existing content already hits the citability
playbook well: "X is…" definitions, self-contained answer blocks, comparison
tables with specific figures (`<500ms`, `$8–$35`, `AGPL-3.0`), and a 23-question
`FAQPage` with `SpeakableSpecification` on the homepage.

**Strongest existing citable asset:** the homepage competitor comparison table
and the per-page FAQ blocks — these are the exact 134–167-word self-contained
units AI engines extract.

**Gap → opportunity:** AI engines disproportionately cite **round-up / "best X"
listicles** for commercial-intent queries ("best AI meeting assistant", "best
Fireflies alternative"). Natively has *landing pages* for the meeting vertical
but **no blog-format round-ups** for it, where the interview vertical has several
(`/blog/best-ai-interview-assistants`, etc.). Closing this is the §8 content plan.

---

## 7. Server-Side Rendering Check

✅ **Pass.** Verified by fetching raw HTML (no JS execution) for homepage,
`/cluely-alternative`, and `/interview-questions/software-engineer`: each returns
fully-rendered `#root` content, the correct single `<h1>`, unique `<title>`, and
page-scoped JSON-LD. The Puppeteer postbuild prerender (`scripts/prerender.js`)
emits static HTML for all routes, so **AI crawlers that don't run JS see the full
content.** This is the single most important GEO technical requirement and it is
correctly solved.

---

## 8. Top 5 Highest-Impact Changes

Ranked by impact ÷ effort. Items 1–4 are in this repo; item 5 is off-site.

1. **Add meeting-vertical round-up blog posts** (the missing listicle format AI
   cites for "best X" queries). Mirrors the proven interview-vertical pattern.
   → *§9 content plan; this is the core of the requested "add blogs/materials".*
2. **Add a "Best AI Meeting Assistants 2026" + "Best Fireflies/Otter
   Alternatives" round-up** — directly targets the highest commercial-intent
   meeting queries Natively currently has no blog ranking for.
3. **Fix `llms-full.txt` soft-404** — ship a real file or stop implying one.
4. **Add comparison-table images / simple charts** to 2–3 top comparison pages
   (multi-modal content sees +156% AI-selection). Low effort, uses existing data.
5. **Off-site (owner backlog): Wikidata entity + authentic Reddit/YouTube
   presence** — the 3× brand-mention lever; moves ChatGPT/Perplexity specifically.

---

## 9. Content Plan — New Blogs (SHIPPED this round)

> **Status: built, verified, and prerendered.** All four posts below now exist in
> EN + RU, wired through the 5-location sync convention, with `Article` + `FAQPage`
> schema, comparison tables, and curated internal links. Build emits **93 pages**
> (was 79); sitemap is **88 URLs** (was 80). `llms-full.txt` soft-404 is fixed
> (real 13.5 KB file + `vercel.json` allow-rule). Verification: `tsc` clean, lint
> clean, 0 broken internal links, no orphans (each post linked from 2–3 pages),
> single H1 per page, no new duplicate titles, RU bodies served under `lang="ru"`.

Posts shipped:

1. `/blog/best-ai-meeting-assistants` — "7 Best AI Meeting Assistants in 2026
   (Tested & Ranked)" — round-up: Otter, Fireflies, Cluely, Natively, Fathom,
   tl;dv, Granola.
2. `/blog/best-fireflies-alternatives` — "6 Best Fireflies & Otter Alternatives
   in 2026" — funnels to `/fireflies-alternative` + `/otter-alternative` +
   comparison pages.
3. `/blog/local-meeting-notes-without-bot` — "How to Take Private Meeting Notes
   Without a Bot in the Call" — unique local-first explainer.
4. `/blog/ai-note-taker-privacy-guide` — "Are AI Note-Takers Private? What Otter,
   Fireflies & Cluely Do With Your Audio (2026)" — privacy explainer mirroring
   the high-performing `/blog/is-cluely-safe` pattern.

---

### Original plan (for reference)

Each new post uses the existing `SEOTemplate` (bilingual-ready, schema-injected,
internally linked), follows the site's 5-location sync convention (routes,
App.tsx, prerender, sitemap, RelatedLinks), and ships `schemaType: 'Article'`
with a named author + real date. All claims trace to `public/llms.txt`; every
competitor figure is attributed with a "verify current pricing" note.

**Proposed posts (meeting/notes vertical — the documented gap):**

1. `/blog/best-ai-meeting-assistants` — "7 Best AI Meeting Assistants in 2026
   (Tested & Ranked)" — round-up; ranks Otter, Fireflies, Cluely, Natively,
   Fathom, tl;dv, Granola by privacy / cost / real-time / local.
2. `/blog/best-fireflies-alternatives` — "6 Best Fireflies.ai Alternatives in
   2026" — round-up funneling to `/fireflies-alternative` + `/natively-vs-fireflies`.
3. `/blog/local-meeting-notes-without-bot` — "How to Take Private Meeting Notes
   Without a Bot in the Call" — problem/solution explainer; unique angle
   (local-first, no visible participant) competitors can't write.
4. `/blog/ai-note-taker-privacy-guide` — "Are AI Note-Takers Private? What
   Otter, Fireflies & Cluely Do With Your Audio (2026)" — privacy explainer,
   mirrors the high-performing `/blog/is-cluely-safe` pattern for the meeting side.

Each is ≥600 words, with a comparison table, a 4–6 item FAQ block (→ `FAQPage`
schema), question-based H2s, and 4 curated `RelatedLinks`. These are the
listicle/explainer formats AI engines cite — and they fill the one genuine
content gap in an otherwise complete library.

---

## 10. Schema Recommendations

The schema stack is already strong (Organization, WebSite, SoftwareApplication,
BreadcrumbList, FAQPage, Article, VideoObject, SpeakableSpecification, Person).
Recommendations:

- **New blog posts:** emit `Article` (author = Evin John, `sameAs` X) + `FAQPage`
  — already automatic via `buildSchemaTags` when the route declares
  `schemaType: 'Article'` and `faqs`.
- **Round-up posts:** the body comparison table is the citable asset; no
  `Product`/`Review` schema (correctly avoided — self-serving `aggregateRating`
  was already removed in prior work and should stay removed).
- **Off-site:** add a **Wikidata** item and link it from Organization `sameAs`
  once it exists (strengthens the entity for ChatGPT).

---

## 11. Content Reformatting Suggestions

The existing pages need **no rewriting** — they already follow passage-citability
best practice. The work is *additive* (§9), not corrective. The one homepage note,
kept per the "don't change title/description" constraint: title and meta are
untouched. No reformatting of existing copy is recommended.

---

## Appendix — What was verified live

- `robots.txt`, `llms.txt` fetched and parsed (AI crawlers, sitemap directive).
- Homepage raw HTML: 1× H1, 12× H2, 7 JSON-LD blocks, unique title/desc, SSR `#root`.
- Interior SSR spot-checks: `/cluely-alternative` (5 JSON-LD), `/interview-questions/software-engineer` (rendered H1).
- `sitemap.xml`: 80 `<loc>` entries (EN + RU), all valid.
- `llms-full.txt`: confirmed soft-404 (HTML shell, HTTP 200).
</content>
