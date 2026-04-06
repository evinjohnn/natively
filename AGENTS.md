# AGENTS.md

## Commands

| Command | Description |
|---------|-------------|
| `npm run dev` | Start dev server (port 8080, host `::`) |
| `npm run build` | Production build + SEO prerendering |
| `npm run lint` | Run ESLint |
| `npm run test` | Run Vitest (jsdom) |
| `npm run preview` | Preview production build |

## Build Pipeline

`npm run build` → Vite builds to `dist/` → `postbuild` runs `scripts/prerender.js` which injects SEO meta tags into static HTML for each route.

## Architecture

- **Entry**: `src/main.tsx` → `src/App.tsx`
- **Pages**: `src/pages/` (SEO pages in `seo/` and `blog/` subdirs)
- **Components**: `src/components/` (shadcn/ui in `components/ui/`)
- **Path alias**: `@/` maps to `src/`

## Tech Stack

- Vite + React 18 + TypeScript
- shadcn/ui (Radix UI + Tailwind)
- React Router DOM
- Vitest (jsdom environment, setup: `src/test/setup.ts`)
- ESLint with react-hooks + react-refresh plugins

## Vercel Deploy

Build output goes to `dist/` (not `build/`). The prerendered HTML files in `dist/` handle SEO routes.