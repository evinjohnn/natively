# SEO/GEO Sprint 1 Design

**Date:** 2026-06-09
**Branch:** geo-optimization
**Goal:** Close the biggest keyword gap — meeting assistant, note-taker, sales/lecture, and Fireflies/Otter alternatives — by shipping 10 high-ROI SEO pages.

---

## Context

Natively is a native desktop AI assistant that works as: an AI interview copilot, AI meeting assistant, AI note taker, sales call assistant, lecture note taker, coding interview helper, behavioral interview assistant, and system design assistant. It supports local (Ollama), BYOK (OpenAI/Anthropic/Gemini), and hosted API tiers.

The existing site has 18 SEO pages and 8 blog posts — all interview/coding focused. Zero pages target meeting, note-taking, sales, or lecture use cases. Competitors Fireflies and Otter rank for many of those terms; Natively currently does not.

---

## Architecture

- All new pages use the existing `SEOTemplate` component (bilingual EN/RU, CTA, RelatedLinks)
- New feature pages live in `src/pages/features/` (new directory)
- New comparison/alternative pages live in `src/pages/seo/` (consistent with existing)
- Route additions go in `App.tsx` and `routes.tsx`
- Sitemap gets new entries for all new pages (EN + RU)
- No changes to existing pages or components

---

## URL Structure

Feature pages use `/features/` prefix (new taxonomy).
Comparison/alternative pages use flat URLs (consistent with existing `/natively-vs-cluely` pattern).

---

## Pages

### Feature Pages (`src/pages/features/`)

| Component | URL | Target keyword |
|-----------|-----|----------------|
| `AIMeetingAssistant.tsx` | `/features/ai-meeting-assistant` | AI meeting assistant |
| `AiNoteTaker.tsx` | `/features/ai-note-taker` | AI note taker |
| `SalesCallAssistant.tsx` | `/features/sales-call-assistant` | sales call assistant AI |
| `LectureNoteTaker.tsx` | `/features/lecture-note-taker` | AI lecture note taker |
| `BehavioralInterviewAssistant.tsx` | `/features/behavioral-interview-assistant` | behavioral interview assistant AI |
| `SystemDesignInterviewAssistant.tsx` | `/features/system-design-interview-assistant` | AI system design interview assistant |

### Comparison/Alternative Pages (`src/pages/seo/`)

| Component | URL | Target keyword |
|-----------|-----|----------------|
| `NativelyVsFireflies.tsx` | `/natively-vs-fireflies` | Natively vs Fireflies |
| `NativelyVsOtter.tsx` | `/natively-vs-otter` | Natively vs Otter |
| `FirefliesAlternative.tsx` | `/fireflies-alternative` | Fireflies alternative |
| `OtterAlternative.tsx` | `/otter-alternative` | Otter.ai alternative |

---

## Content Structure

### Feature Pages (8 sections)

1. **H1 + definition** — "Natively is…" statement, 2-3 sentences, quotable for AI citation
2. **What it does / how it works** — mechanism, not marketing
3. **Key features** — 3-4 specific capabilities with concrete detail
4. **Who it's for** — 3 personas (job titles / use cases)
5. **How it compares** — 2-3 row inline comparison vs. standalone tools (not a full table)
6. **FAQ block** — 5-6 questions, 80-150 words each, structured as FAQPage schema
7. **CTA** — inherited from SEOTemplate
8. **RelatedLinks** — inherited from SEOTemplate

### Comparison/Alternative Pages (7 sections)

1. **H1 + TL;DR** — 2-3 paragraph summary, who wins for what use case
2. **Feature comparison table** — 8-10 rows
3. **Pricing comparison** — only verified/current data
4. **Who each tool is best for** — clear persona split
5. **Pros/cons** — 3-4 bullets each, neutral tone
6. **FAQ block** — 4-5 questions
7. **CTA + RelatedLinks** — inherited

---

## Schema Per Page

| Page type | Schema |
|-----------|--------|
| Feature pages | `FAQPage` (inline JSON-LD for AI citation) |
| Comparison/alternative pages | `BreadcrumbList` (inline JSON-LD) |
| All pages | Canonical, OG, Twitter via `SEOHead` |
| Site-level (index.html) | `SoftwareApplication`, `Organization`, `WebSite`, `FAQPage` — already in place |

---

## Bilingual Support

All pages include `ru` prop on `SEOTemplate` with:
- Russian `title`, `description`, `h1`
- Russian `children` (full page content translation)

---

## Internal Linking

- Feature pages link to each other and to relevant existing pages (`/interview-copilot`, `/ai-interview-assistant`)
- Comparison pages link to the relevant feature pages and to each other
- Sitemap updated with all new EN + RU URLs

---

## Out of Scope (Sprint 2)

- `/interview-questions/*` programmatic pages
- `/system-design/*` programmatic pages
- `/behavioral-questions/*` programmatic pages
- Homepage copy rewrite
- Blog expansion
- Technical SEO audit fixes

---

## Success Criteria

- All 10 new pages render without build errors
- All 10 pages appear in sitemap.xml (EN + RU = 20 entries)
- No broken internal links
- Schema validates on each page
- Typecheck passes
