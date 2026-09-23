# BT-144p: Portfolio

A single-page developer portfolio: a hero with animated meteors, an About section (education and experience timelines), coding statistics (language radar, OS donut, contribution calendar), a project grid, and a footer with contact links and a view count. Content is loaded from the companion backend (port-server).

## Tech stack

- [Next.js](https://nextjs.org) 16 (App Router) + React 19 + TypeScript
- [Ant Design](https://ant.design) 5 + styled-components + SCSS
- [TanStack Query](https://tanstack.com/query) for data fetching and caching
- [ECharts](https://echarts.apache.org) and react-github-contribution-calendar for the statistics

## Getting started

The app renders its content from port-server, so run that first.

1. Install dependencies:

   ```bash
   pnpm install
   ```

2. Copy the env file and point it at the backend:

   ```bash
   cp .env.example .env.local
   ```

   | Variable | Where it's used |
   | --- | --- |
   | `API_URL` | Required, server-only (startup fails without it). The backend base URL used by `src/lib/backend.ts`. Never prefix it with `NEXT_PUBLIC_`. |
   | `PROXY_SHARED_SECRET` | Server-only. Must match port-server's, so `app/api/*` can forward the visitor's real IP for view counting. Leave unset locally if port-server's is unset. |
   | `TRUST_FORWARDED_FOR` | Optional. The visitor IP comes from `X-Forwarded-For`, trusted automatically on Vercel (which overwrites it). Set `true` only behind another proxy that sets it; otherwise it's ignored because a visitor could spoof it. |
   | `NEXT_PUBLIC_FRONTEND_VERSION_KEY` | This site's `FrontendVersion.key` in port-server (default `bt144p-portfolio`). |

3. Run the dev server (port-server also defaults to 3000, so pick another port):

   ```bash
   pnpm dev -p 3100
   ```

Other scripts: `pnpm build`, `pnpm start`, `pnpm lint`.

## How data flows

The browser never calls port-server directly.

- **First render:** `src/app/layout.tsx` prefetches every resource on the server (cached for 60s) and hydrates it into React Query, so the HTML already contains the content.
- **In the browser:** hooks in `src/features/<name>/client` read that cache. If a server prefetch failed, they fetch this app's own `/api/<name>` route handler, which proxies to port-server.
- **View counting:** `frontend-version` is refetched once per visit through `/api/frontend-version`, which forwards the visitor's IP and the shared secret so port-server counts one view per visitor. The server prefetch never counts as a view.

## Project structure

```
src/
  app/
    layout.tsx          # root layout: style registries, prefetch + hydration
    page.tsx            # landing page
    api/<name>/route.ts # BFF route handlers proxying port-server
  features/<name>/
    keys.ts types.ts    # client-safe query keys and types
    server/             # server-only fetch + prefetch
    client/             # query options + useX() hook
  lib/
    backend.ts          # server-only port-server client (backendGet, proxyGet)
    query-client.ts     # per-request (server) / singleton (browser) QueryClient
    registry.tsx        # styled-components SSR registry
  layouts/BaseLayout.tsx
  views/app/landingPage/
  components/ utils/ assets/
```
