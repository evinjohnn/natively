# Natively SEO — Owner's Guide

This guide covers three things the automated SEO work could **not** finish on its own,
with exact, step-by-step instructions for each:

1. [Google Search Console + GA4 setup](#1-google-search-console--ga4-setup) — *your action, ~15 min*
2. [Continuing programmatic page generation](#2-continuing-programmatic-page-generation) — *when & how to add the next batch*
3. [The "swept up parallel work" situation explained](#3-the-swept-up-parallel-work-situation) — *what happened, why, what to check*

---

## 1. Google Search Console + GA4 setup

**Why this is your job, not the automation's:** verifying a property and submitting a
sitemap require logging into *your* Google account. There is no file or API key that
can be dropped into the repo to bypass Google's account-ownership check. Everything on
the code side is already prepared — you just paste one token and click a few buttons.

### What's already done in the code
- **GA4 is live**: tracking ID `G-6MX6YCGYGH` is wired into `index.html` (loads on every page).
- **Bing is already verified**: `msvalidate.01` tag at `index.html` line 15.
- **A Google verification placeholder is waiting**: `index.html` line 19 (currently commented out).
- **The sitemap is valid**: `public/sitemap.xml`, 80 URLs, well-formed XML, served at `https://natively.software/sitemap.xml`.

### Step 1 — Verify the property in Google Search Console

1. Open **https://search.google.com/search-console** and sign in with the Google account that should own the site's search data.
2. Click **Add property** (top-left dropdown).
3. Choose the **URL prefix** box (the right-hand option), type exactly:
   ```
   https://natively.software
   ```
   and click **Continue**.
4. A verification dialog appears. Expand **HTML tag**. It shows something like:
   ```html
   <meta name="google-site-verification" content="AbCdEf123456_yourTokenHere" />
   ```
   Copy **only the token** — the `content="..."` value (e.g. `AbCdEf123456_yourTokenHere`).

### Step 2 — Paste the token into the code

1. Open `index.html` in the repo. Find line ~19:
   ```html
   <!-- <meta name="google-site-verification" content="REPLACE_WITH_GSC_TOKEN" /> -->
   ```
2. **Uncomment it and paste your token**, so it becomes:
   ```html
   <meta name="google-site-verification" content="AbCdEf123456_yourTokenHere" />
   ```
   (Delete the `<!--` at the start and the `-->` at the end, and replace `REPLACE_WITH_GSC_TOKEN`.)
3. Commit and push so it deploys:
   ```bash
   git add index.html
   git commit -m "chore(seo): add Google Search Console verification token"
   git push origin main
   ```
4. Wait for Vercel to finish deploying (usually 1–2 min). Confirm the tag is live:
   ```bash
   curl -s https://natively.software/ | grep google-site-verification
   ```
   You should see your token in the output.

### Step 3 — Click Verify

Back in the GSC dialog from Step 1, click **Verify**. It should say *"Ownership verified."*
If it fails, the deploy probably hasn't finished — wait a minute and retry.

> **Alternative (no redeploy needed):** instead of the HTML tag, pick the **DNS** method in
> the GSC dialog. It gives you a `TXT` record to add at your domain registrar (where you
> manage `natively.software` DNS). This verifies the whole domain and survives every future
> deploy, but takes longer to propagate (minutes to a few hours).

### Step 4 — Submit the sitemap

1. In GSC, left sidebar → **Sitemaps**.
2. Under "Add a new sitemap", type:
   ```
   sitemap.xml
   ```
   (just the filename — GSC prepends your domain) and click **Submit**.
3. Within a few hours the status should read **Success** with ~80 discovered URLs.

### Step 5 — Request indexing for the money pages

GSC indexes the whole sitemap automatically, but you can fast-track the highest-value pages.
For each URL below: GSC top search bar → paste the URL → press Enter → **Request Indexing**.
(Limited to ~10–12 per day.)

```
https://natively.software/ai-meeting-assistant
https://natively.software/ai-note-taker
https://natively.software/fireflies-alternative
https://natively.software/otter-alternative
https://natively.software/natively-vs-fireflies
https://natively.software/natively-vs-otter
https://natively.software/live-interview-assistant
https://natively.software/system-design-interview-assistant
https://natively.software/behavioral-interview-assistant
https://natively.software/interview-answer-generator
```

### Step 6 — GA4: mark your conversions

GA4 already collects pageviews. To track *conversions* (downloads, signups):

1. Open **https://analytics.google.com** → select the Natively property.
2. Check **Reports → Realtime** while loading the site in another tab — you should see yourself as an active user (confirms tracking works).
3. Go to **Admin (gear, bottom-left) → Events**. After a day of traffic, your event names appear here.
4. Toggle **Mark as key event** on the actions that matter: the download click, the Pro/API checkout, the pricing page view.
5. If a button you care about doesn't fire an event yet, it can be wired through the existing helper in `src/utils/analytics.ts` (`trackEvent('cta_download', { ... })`). Ask a developer to add the call to that button's `onClick`.

### Step 7 — Bing (optional, 5 min, worth it)

Bing is already verified. Log in at **https://www.bing.com/webmasters**, open the
`natively.software` property, go to **Sitemaps**, and submit the same
`https://natively.software/sitemap.xml`. Bing also feeds DuckDuckGo and some AI answer engines.

### Ongoing — the monthly 10-minute check
- **GSC → Performance**: which search queries show impressions? If a page gets impressions but few clicks, improve its `<title>` / meta description.
- **GSC → Pages**: the indexed-page count should trend up. Investigate anything stuck in "Crawled – currently not indexed."
- **GA4**: which landing pages convert? Double down on what works.
- **Spot-check AI**: ask ChatGPT / Perplexity "best Cluely alternative" or "best local AI meeting assistant" and see whether Natively is cited.

---

## 2. Continuing programmatic page generation

**The principle (from your original brief):** *"Do not generate hundreds of pages
immediately unless templates and quality gates are ready. First build the template
system and 5–10 high-quality sample pages."*

That's exactly what was done. The template system exists and **12 high-quality
programmatic pages** are live. The next tier is **intentionally on hold** — not because
it's hard, but because adding 50 more pages before the first ones rank just dilutes the
site and risks a "thin content" signal from Google.

### What already exists
**Template engine** (don't regenerate — reuse):
- `src/data/interviewQuestions.ts` — typed data for `/interview-questions/<role>` pages
- `src/data/systemDesign.ts` — typed data for `/system-design/<product>` pages
- `src/pages/programmatic/InterviewQuestionsPage.tsx` + `SystemDesignPage.tsx` — render one entry each

**Live pages (12):**
- Roles: software-engineer, product-manager, data-scientist, ai-engineer
- Company SWE: google, meta, amazon, microsoft
- System design: uber, whatsapp, netflix, twitter

### The quality gate — the rule that keeps this from becoming spam
Before adding **any** new programmatic page, it must pass all of these:
- **Genuinely unique content** — a real, hand-written intro (2–3 paragraphs) and 8+ real questions with real "approach" notes, OR a full design walk-through. Never a template string with the company name swapped in.
- **≥ ~400 words of substance** that a human would find useful on its own.
- **Real internal links** in and out (so it's not an orphan).
- **No fabricated facts** — no made-up statistics, salaries, or claims.

If a page can't clear that bar, **don't add it.** Ten great pages beat a hundred thin ones.

### When to add the next batch
Wait until the current 12 pages show **traction in GSC** (impressions and a few ranking
keywords — check ~4–8 weeks after indexing). If `/interview-questions/software-engineer`
and the company pages are getting impressions, that's your signal the format works and
it's safe to scale. If they're flat after two months, fix *those* before adding more.

### How to add one new page (the 5 sync points)
Every programmatic page touches **5 files** plus internal links. Miss one and the build
breaks or the page 404s. Using a new role page as the example:

**1. Add the data entry** — `src/data/interviewQuestions.ts`, append to the `ROLE_QUESTION_SETS` array:
```ts
{
  path: "/interview-questions/netflix-software-engineer",
  role: "Netflix Software Engineer",
  title: "Netflix Software Engineer Interview Questions (2026) | Natively",
  description: "…155–165 char meta description, keyword front-loaded…",
  h1: "Netflix Software Engineer Interview Questions (2026)",
  intro: [ "para 1…", "para 2…", "para 3…" ],
  nativelyAngle: "One sentence on how Natively helps for this role…",
  questions: [
    { q: "…", approach: "…" },
    // …8+ total, each genuinely useful…
  ],
  related: [
    { to: "/interview-questions/software-engineer", label: "Software Engineer Interview Questions" },
    // …3–4 contextual links…
  ],
},
```
*(The `ROLE_BY_PATH` lookup at the bottom of the file is auto-derived — no edit needed.)*

**2. Create the route wrapper** — `src/pages/programmatic/routes/InterviewQuestionsNetflixSWE.tsx`:
```tsx
import InterviewQuestionsPage from "../InterviewQuestionsPage";
export default function InterviewQuestionsNetflixSWE() {
  return <InterviewQuestionsPage canonicalPath="/interview-questions/netflix-software-engineer" />;
}
```

**3. Register in** `src/routes.tsx` — add to **both** the `pages` map and `pathToKey`:
```ts
// in pages = { … }
InterviewQuestionsNetflixSWE: lazyWithPreload(() => import("./pages/programmatic/routes/InterviewQuestionsNetflixSWE")),

// in pathToKey = { … }
"/interview-questions/netflix-software-engineer": "InterviewQuestionsNetflixSWE",
```

**4. Register in** `src/App.tsx` — three edits: the destructured import, the EN `<Route>`, and the `/ru` `<Route>`:
```tsx
// destructure (top of file, with the other programmatic imports)
InterviewQuestionsNetflixSWE,

// EN routes block
<Route path="/interview-questions/netflix-software-engineer" element={<InterviewQuestionsNetflixSWE />} />

// /ru routes block
<Route path="/ru/interview-questions/netflix-software-engineer" element={<InterviewQuestionsNetflixSWE />} />
```

**5. Register in** `scripts/prerender.js` — add an entry to the `seoRoutes` array (programmatic section). Use `skipRu: true` while the page is English-only:
```js
{
  path: '/interview-questions/netflix-software-engineer',
  title: 'Netflix Software Engineer Interview Questions (2026) | Natively',
  desc: '…same 155–165 char description as the data file…',
  skipRu: true
},
```

**6. Add to the sitemap** — `public/sitemap.xml`, copy an existing `<url>` block:
```xml
<url>
  <loc>https://natively.software/interview-questions/netflix-software-engineer</loc>
  <lastmod>2026-06-09</lastmod>
  <changefreq>monthly</changefreq>
  <priority>0.80</priority>
</url>
```

**7. Wire internal links** — in the **existing** base page's `related` array (e.g. the
`/interview-questions/software-engineer` entry), add a link to the new page so it isn't an
orphan. The new page already links out via its own `related` array.

**8. Verify before committing:**
```bash
npx tsc --noEmit          # must be clean
npm run build             # must prerender the new page (look for its line in the output)
xmllint --noout public/sitemap.xml   # sitemap still valid
```
Then commit. (System-design pages follow the identical pattern using `systemDesign.ts`,
`SystemDesignPage.tsx`, and `SYSTEM_DESIGN_CASES`.)

### Good candidates for the next batch (once the current 12 rank)
- More company roles: `/interview-questions/{netflix,apple,nvidia}-software-engineer`
- A new page type — behavioral questions: `/behavioral-questions/tell-me-about-yourself`, `…/why-should-we-hire-you`, `…/strengths-and-weaknesses` (would need a small new template + data file, same pattern).
- More system designs: `/system-design/{instagram,dropbox,youtube}`

Each one, hand-written, through the quality gate. Never bulk-generated.

---

## 3. The "swept up parallel work" situation

**This is already resolved — nothing for you to do. Here's what happened so it makes sense.**

While the SEO pages were being built, a **second editing session was running at the same
time**, working on unrelated UI files: `PricingSection.tsx`, `ProComparison.tsx`,
`UseCasesSection.tsx` (and later `Navbar.tsx`, `Pro.tsx`).

### What "swept up" means
When you commit in git, the default (`git add -A` / `git commit -a`) stages **every**
changed file in the working tree — not just the ones related to your task. So when the
SEO commit was about to be made, git was about to include those half-finished UI files
**in the same commit**, under an SEO commit message. That would have:
- mislabeled the UI work as part of the SEO change, and
- potentially committed someone else's *incomplete* edits before they were ready.

### What was done about it
The UI files were **unstaged** before committing — `git restore --staged <file>` — which
takes a file *out* of the pending commit **without touching or deleting the actual changes**.
The result: the SEO commit contained only SEO files, and the UI changes stayed safely in
the working tree for the other session to commit on its own terms.

### How it ended
The other session **did** commit its work shortly after (commits like
`feat: enhance UseCasesSection preview components…`), and everything is now merged into
`main` and pushed. Nothing was lost, nothing was misattributed, and the working tree is clean.

### The takeaway for you
- **Nothing is broken or pending** from this — it's fully settled.
- **The lesson** (useful if you ever run two AI sessions on one repo again): prefer
  committing **specific files** rather than everything —
  ```bash
  git add src/specific-file.tsx another-file.tsx   # name the files
  git commit -m "…"
  ```
  rather than `git commit -am "…"`, which sweeps up whatever else is in flight. When two
  sessions share one working directory, "commit everything" is how one session accidentally
  commits the other's unfinished work.

---

## Quick reference

| Thing | Where |
|---|---|
| GA4 tracking ID | `G-6MX6YCGYGH` (in `index.html`) |
| Google verification placeholder | `index.html` line ~19 (commented) |
| Bing verification | `index.html` line ~15 (active) |
| Sitemap | `public/sitemap.xml` — 80 URLs |
| Programmatic data | `src/data/interviewQuestions.ts`, `src/data/systemDesign.ts` |
| Full SEO report | `SEO-GEO-IMPROVEMENT-REPORT.md` |
| GSC/GA4 short checklist | `GSC-GA4-SETUP-CHECKLIST.md` |
| Deploy | Vercel (auto-deploys on push to `main`) |

**One open item to verify after the next deploy:** React hydration warnings (#418/#423)
were observed when serving the built site locally. They appear on *every* page (including
ones untouched by this work), so they're likely a local-serving artifact rather than a
production bug — but confirm by loading 2–3 live pages with browser DevTools open after a
Vercel deploy. Details in `SEO-GEO-IMPROVEMENT-REPORT.md`.
