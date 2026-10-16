# Carlo Falanga: portfolio

Personal portfolio, one page and scroll driven. The dark hero shrinks into a side rail that
follows the page, the bio lights up word by word, the stack section stays pinned while its
layers light up one at a time.

Live at [carlofalanga.dev](https://carlofalanga.dev/)

## Stack

- **React 19** + **Vite**
- **Tailwind CSS v4** for the reset and the theme; the page styles live in `src/main.css`
- **GSAP** + **ScrollTrigger** for everything tied to the scroll
- **Lenis** for smooth scrolling
- **Archivo** as a self-hosted variable font (width and weight axes) through Fontsource
- **react-icons** for the stack logos

## Structure

```
src/
├── App.jsx              # page layout, which section and project the rail shows
├── main.css             # custom properties and the styles of every section
├── components/
│   ├── content.js       # band, bio and contact texts
│   ├── layout/          # Band (top band and its drawer), Rail (hero, name, side rail), SmoothScroll
│   ├── sections/        # Bio, Works, Stack, Contact and their data
│   └── ui/              # Chars, one span per letter
└── lib/
    ├── gsap.js          # plugin registration and the named easing curves
    ├── media.js         # breakpoint and reduced motion helpers
    ├── scroll.js        # the shared Lenis instance
    ├── scramble.js      # letters that shuffle before settling
    ├── swell.js         # letters that widen under the cursor
    └── time.js          # local time in Naples
```

## Responsive

Below 992px there is no side rail: the hero folds into a top bar, the band becomes five
labels you tap, and the stack is a plain list instead of a pinned section.

## Motion

With `prefers-reduced-motion` the smooth scrolling, the entrances and the transitions are off,
and every section renders in its final state.

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
