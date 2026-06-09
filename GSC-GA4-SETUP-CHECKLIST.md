# Search Console, GA4 & Sitemap — Owner Setup Checklist

These steps require login to your Google accounts, so they can't be done from the
codebase. The code side is ready: GA4 is wired, a GSC verification placeholder is
in `index.html`, and the sitemap is valid with all 80 URLs.

---

## 1. Google Search Console — verify the property

You already have **Bing** verified (`msvalidate.01` in `index.html`). Do the Google equivalent:

1. Go to https://search.google.com/search-console
2. Click **Add property** → choose **URL prefix** → enter `https://natively.software`
3. Pick a verification method:
   - **Easiest (HTML tag):** GSC shows a `<meta name="google-site-verification" content="...">` tag. Copy the token, then in `index.html` uncomment the placeholder (lines ~16-19) and paste the token:
     ```html
     <meta name="google-site-verification" content="YOUR_TOKEN_HERE" />
     ```
     Redeploy, then click **Verify** in GSC.
   - **Alternative (DNS):** add the TXT record GSC gives you to your domain's DNS. Survives redeploys and verifies the whole domain.
4. Once verified, also add the `https://natively.software/` property as a **Domain** property if you want `/ru/` and all subpaths covered under one roof.

---

## 2. Submit the sitemap

1. In GSC → left sidebar → **Sitemaps**
2. Enter `sitemap.xml` and click **Submit**
3. Confirm it reads **Success** with ~80 discovered URLs (it may take a few hours)
4. Over the next 1–2 weeks, check **Pages** (Indexing) to confirm the new pages move from "Discovered" → "Indexed"

> The sitemap is at `https://natively.software/sitemap.xml` and is valid XML (verified).

---

## 3. Request indexing for the highest-priority new pages

GSC → **URL Inspection** (top search bar) → paste a URL → **Request Indexing**.
Prioritize the commercial-intent pages first:

- `https://natively.software/ai-meeting-assistant`
- `https://natively.software/ai-note-taker`
- `https://natively.software/fireflies-alternative`
- `https://natively.software/otter-alternative`
- `https://natively.software/natively-vs-fireflies`
- `https://natively.software/natively-vs-otter`
- `https://natively.software/live-interview-assistant`
- `https://natively.software/system-design-interview-assistant`

(Indexing is rate-limited to ~10–12 manual requests/day; the sitemap covers the rest automatically.)

---

## 4. GA4 — confirm tracking & add conversions

GA4 is already installed (`G-6MX6YCGYGH` in `index.html`; `src/utils/analytics.ts` has a `trackEvent` helper).

1. Open https://analytics.google.com → confirm Realtime shows traffic when you load the site.
2. Mark key actions as **conversions** (Admin → Events → toggle "Mark as key event"):
   - Download / "Get Started" click
   - Pro / API checkout start
   - Pricing page view
3. If any primary CTA doesn't fire an event yet, wire it through `trackEvent('cta_download', {...})` from `src/utils/analytics.ts`.

---

## 5. Bing Webmaster Tools (optional, low effort, high value for a small site)

Bing is already verified (`msvalidate.01`). Log in at https://www.bing.com/webmasters,
confirm the property, and submit the same `sitemap.xml`. Bing also powers DuckDuckGo
and feeds some AI answer engines.

---

## 6. PageSpeed / Core Web Vitals baseline

Once deployed, run https://pagespeed.web.dev on:
- `https://natively.software/` (homepage)
- one feature page (e.g. `/ai-meeting-assistant`)
- one comparison page (e.g. `/natively-vs-fireflies`)

Record LCP, INP, CLS so you have a baseline to track regressions against. CrUX field
data appears in GSC → **Core Web Vitals** after enough real traffic accrues.

---

## 7. Ongoing — monthly review loop

- GSC **Performance**: which queries show impressions? Tune titles/meta for pages with impressions but low CTR.
- GSC **Pages**: indexed count trending up; investigate any "Crawled - not indexed".
- GA4: SEO-source traffic → conversion rate per landing page.
- Spot-check AI citation: search your target questions in ChatGPT / Perplexity and see whether Natively is cited.

---

*Companion to `SEO-GEO-IMPROVEMENT-REPORT.md`. Code side (GA4, verification placeholder, sitemap) is deploy-ready as of 2026-06-09.*
