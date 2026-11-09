# Mahdieh Kargar — Portfolio

A bilingual (English / Persian) personal portfolio for a front-end developer, built with Next.js 16, React 19, TypeScript and Tailwind CSS 4.

**Live:** [mahdiehkargar.ir](https://mahdiehkargar.ir)

## Features

- **Bilingual UI (EN / FA)** with full RTL support and a language toggle
- **Light / dark theme** with saved preference and no flash before hydration
- **Editorial design** — cream & burgundy palette, Playfair Display + Estedad/Vazirmatn
- **Hero portrait** with a soft mask in both themes
- **Scroll animations** — staggered reveals, parallax, animated section rules
- **Skills grid** with individual floating motion
- **Projects** — cover images, tags, GitHub links and a "Coming Soon" teaser
- **Bilingual résumé page** (`/resume`) with a print-to-PDF button
- **Working contact form** — sends email through Resend (server route with validation, honeypot and rate limiting)
- **Rule-based chat assistant** that answers questions about the owner
- **Fully responsive**, respects `prefers-reduced-motion`

## Tech stack

| Layer | Choice |
| --- | --- |
| Framework | Next.js 16 (App Router, Turbopack, Cache Components) |
| UI | React 19, TypeScript |
| Styling | Tailwind CSS 4 |
| Fonts | `next/font` — Playfair Display, Estedad, Vazirmatn, Geist Mono |
| Email | Resend via `src/app/api/contact/route.ts` |
| Hosting | Vercel |

## Getting started

```bash
npm install
npm run dev
```

Open http://localhost:3000.

## Environment variables

Create `.env.local` (see `.env.example`):

```env
CONTACT_TO_EMAIL=you@example.com
RESEND_API_KEY=re_xxxxxxxx
CONTACT_FROM_EMAIL=Portfolio <onboarding@resend.dev>
```

> Without `RESEND_API_KEY`, the form falls back to FormSubmit and finally reports the
> address so visitors can email directly.

## Project structure

```
src/
  app/
    api/contact/route.ts   # contact form handler (validation + email)
    resume/page.tsx        # bilingual printable résumé
    layout.tsx             # fonts, metadata, theme script
    page.tsx               # single-page portfolio
  components/              # hero, about, skills, projects, contact, …
  data/profile.ts          # ALL site content lives here (bilingual)
  lib/                     # site context, chat logic
public/                    # images, résumé assets
```

Content is centralised in `src/data/profile.ts` — edit that file to change any text.

## Deploy

```bash
npx vercel --prod
```

Set `CONTACT_TO_EMAIL` and `RESEND_API_KEY` in the Vercel project settings.
