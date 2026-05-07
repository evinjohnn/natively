# Build Refund Policy + Terms &amp; Conditions pages on natively.software

You're working in the **natively.software website repo** — not the desktop app repo. Your job is to add three new public pages that the desktop app links to from inside Settings.

## What to build

Three URL routes, all served by this website:

| Route | Purpose | Source file |
|---|---|---|
| `/refundpolicy` | Combined refund policy for Natively Pro + Natively API | `refund.md` |
| `/nativelypro/t&c` | Terms &amp; Conditions (referenced from Pro activation flow) | `termsandcondition.md` |
| `/nativelyapi/t&c` | Terms &amp; Conditions (referenced from API key save flow) | `termsandcondition.md` |

Both `t&c` routes serve **the same** Terms &amp; Conditions document — there is one combined T&amp;C with sections for both products. Render the same content at both routes (either via shared component, alias, or rewrite — your call based on the framework).

## Source content

I'll be pasting two markdown files into this repo alongside this prompt:

- `refund.md` — full refund policy (~140 lines)
- `termsandcondition.md` — full T&amp;C (~180 lines)

**Treat these as the source of truth.** The text has been carefully written and reviewed — don't paraphrase, restructure, or "improve" the prose. Render it faithfully.

If the website needs the content as JSX/MDX/React components instead of raw markdown, convert mechanically — don't reword.

## Step 1 — orient yourself before writing anything

Don't guess at the stack. Run these first:

1. List the repo root and `package.json` to identify the framework (Next.js / Astro / Remix / SvelteKit / plain Vite / etc.).
2. Find an existing legal/content page on the site (e.g. `/privacy`, `/terms`, `/about`, an existing markdown-rendered page) — use that as your template for routing convention, layout wrapper, typography, and metadata.
3. Identify the existing markdown rendering pipeline. There's almost certainly one already — `next-mdx-remote`, `remark`, `@mdx-js/react`, Astro content collections, etc. Reuse it. Don't add a new markdown library.
4. Check `tailwind.config.{js,ts}` / global styles for the design tokens (font families, colors, prose styling). Match those exactly.
5. Look at the site's existing nav/footer. The new pages should fit into that frame, not float standalone.

Only after you've done this should you start adding files.

## Step 2 — implementation requirements

### Routing

- Whatever the routing convention is (`pages/`, `app/`, `src/routes/`, `content/`), follow it. Don't introduce a new pattern.
- The literal `&` character in `t&c` is **intentional** — it's a valid path sub-delim per RFC 3986. Keep it as-is in the URL. If your framework's file-based router can't represent `&` in a filename, use a catch-all or rewrite rule to map the URL `/nativelypro/t&c` → the same component, and same for `/nativelyapi/t&c`. Do **not** silently rename to `/terms` or `/tnc`.
- All three pages must return HTTP 200, not be behind any auth or feature flag.

### Layout &amp; design

- **Match the existing site.** Same nav, footer, font, max content width, vertical rhythm.
- Use the site's existing prose / typography styles. If there's a `prose` Tailwind class or a `<MarkdownContent>` component in use elsewhere, reuse it.
- Pages should be readable on mobile — single column, comfortable line length (≤ 70ch), generous bottom padding.
- Heading hierarchy: the markdown files start with `# Title`, then `## Section`, then `### Subsection`. Map these to `h1`, `h2`, `h3` styled by the site's prose styles.
- The "_Last updated: …_" italic line at the top should be visually de-emphasised but visible.
- Internal cross-references (e.g. T&amp;C section 7 links to `/refundpolicy`) should resolve to absolute paths on this same site. `mailto:natively.contact@gmail.com` should remain a `mailto:` link.
- Add a small "Back to home" link at the top or in the footer. Don't add a sidebar TOC unless every other page on the site has one.

### Metadata / SEO

- `<title>` for `/refundpolicy`: `Refund Policy — Natively`
- `<title>` for both T&amp;C routes: `Terms & Conditions — Natively`
- `meta description`: a short, plain-language one-liner (e.g. "Refund policy for Natively Pro and the Natively API.").
- `og:title`, `og:description`, and `og:url` set per page. Reuse the site's existing OG image.
- Canonical URL set correctly per route.
- For the two T&amp;C routes pointing at the same content, pick **one** canonical (`/nativelypro/t&c`) and have the other declare it as canonical to avoid duplicate-content SEO penalties — OR rewrite one URL to the other server-side. Either is fine; don't do both.

### What NOT to do

- **No statutory-rights / EU / UK / Australian / consumer-law boilerplate.** This was a deliberate decision. The provided text already handles refund commitments without invoking jurisdictional rights language. Do not "helpfully" add a "Your statutory rights are not affected" line — it was explicitly removed.
- **No fabricated content.** If the markdown source doesn't have a section, don't invent one. Specifically: don't add a Privacy Policy, Cookie Policy, Acceptable Use Policy as a separate page unless the user already has one in the repo.
- **No tone shift.** The voice is intentionally human, polite, slightly self-deprecating ("we're a small team", "we'd much rather earn your trust by shipping a fix"). Keep it. Don't lawyer it up. Don't corporate-speak it.
- **No emojis** in the rendered content unless the source markdown has them.
- **No client-side fetch** of the markdown at runtime. Render it at build time / on the server.

## Step 3 — verify

Before reporting done:

1. Run the dev server and open all three routes in a browser. Confirm 200, content renders, layout matches the rest of the site.
2. Click every cross-reference link (the T&amp;C → `/refundpolicy` link, and both `mailto:` links). Confirm they resolve.
3. Check mobile width (≤ 375 px). Confirm no horizontal scroll, headings don't overflow, line length is comfortable.
4. Build the site (`npm run build` or equivalent). Confirm it builds clean — no broken-link warnings, no MDX/markdown parse errors.
5. View source / inspect head — confirm `<title>`, `meta description`, canonical, and og:* tags are present and correct on all three routes.
6. Run the project's typecheck and linter if they exist. Fix any issues you introduced.

## Step 4 — report back

Return:

- The exact paths of files you added/modified.
- The framework + markdown pipeline you used (so the user knows what's now in the dependency tree, if anything).
- Whether you used a rewrite, alias, or duplicate component for the two `t&c` routes.
- Any choices you had to make about styling fallback (e.g. "site has no prose class, I added one matching the existing typography").
- Anything you noticed that's worth fixing later but you didn't touch (don't fix it without asking).

## Background context (in case it helps you make judgment calls)

- Natively is a desktop AI assistant (Electron app) sold via two paid products: a per-user Pro license, and a managed-API subscription called Natively API. There's also a Free Trial.
- Maintained by a single developer. The voice across the product is intentionally personal, not corporate.
- Payments go through Dodo Payments.
- The desktop app links to these pages from inside Settings → Natively Pro and Settings → Natively API. The links open in the system browser (`shell.openExternal`).
- The desktop app already shows a short "by activating you agree to our Terms &amp; Conditions" line under each activation button — this site is where those links land.

Good luck. Lean on the existing site's patterns, keep the voice, and ship it.
