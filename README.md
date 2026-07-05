# VyaparData

Landing page for VyaparData — India's B2B business data marketplace.

## Stack

- [Next.js 15](https://nextjs.org/) (App Router)
- React 19
- TypeScript

## Project structure

```
app/                    # Next.js routes and global styles
components/
  layout/               # Nav, Footer
  sections/             # Hero, Categories, Pricing, etc.
  ui/                   # Logo, ScrollReveal
data/                   # Static content (categories, FAQs, pricing)
hooks/                  # useScrollReveal
lib/                    # Shared utilities
```

The original single-file prototype is kept as `LeadForge.jsx` for reference.

## Development

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Production build

```bash
npm run build
npm start
```
