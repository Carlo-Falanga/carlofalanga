# Carlo Falanga — Portfolio

Personal portfolio, designed and built from scratch. One page, scroll driven: a full-bleed
wordmark, a horizontal track of principles that scrolls while the section is pinned, and a
sticky index that lights up the entry you are reading.

Live at [carlofalanga.dev](https://carlofalanga.dev/)

## Stack

- **React 19** + **Vite**
- **Tailwind CSS v4** — theme, breakpoints and type scale defined in `src/main.css`
- **GSAP** + **ScrollTrigger** for the scroll driven sequences
- **Lenis** for smooth scrolling
- **react-icons**

## Structure

```
src/
├── App.jsx              # section order
├── main.css             # custom properties, type scale, breakpoints, easing tokens
├── components/
│   ├── layout/          # SiteHeader, SmoothScroll
│   ├── sections/        # Hero, About, Skills, Approach, Statement,
│   │                    # Projects, Background, FooterCTA and their parts
│   └── ui/              # GlowText, the shared mustard lettering
└── lib/
    ├── gsap.js          # plugin registration and the named easing curves
    └── media.js         # breakpoint and reduced motion helpers
```

## Responsive

Four tiers driven by custom properties, on Bootstrap breakpoints: mobile as the base, then
`tablet:` (576px), `laptop:` (992px) and `desktop:` (1400px). Tailwind's default breakpoints
are disabled so every size goes through the named ones.

## Motion

Every animated section has a `prefers-reduced-motion` branch that renders the same final
state without movement, including the horizontal track, which becomes a scrollable list.

## Running it

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
npm run preview
```
