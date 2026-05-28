# Carlo Falanga — Portfolio

Sito portfolio personale progettato e sviluppato da zero. Layout editoriale, griglia a 12 colonne, dark/light mode.

## Tech stack

- **React 19** + **Vite**
- **Tailwind CSS v4**
- **react-icons** (Lucide)

## Struttura

```
src/
├── components/
│   ├── hero/          # Sezione hero con tabella info e link
│   ├── about/         # Chi sono
│   ├── skills/        # Competenze e toolbox
│   ├── projects/      # Lavori selezionati
│   ├── contact/       # Contatti
│   ├── footer/        # CTA footer
│   ├── specStrip/     # Striscia decorativa
│   ├── SiteHeader.jsx # Header con nav, dark mode toggle e menu mobile
│   └── SiteFooter.jsx # Footer con CTA e barra copyright
├── hooks/
│   └── useTheme.js    # Hook per la gestione del tema dark/light
└── main.css           # Variabili CSS, tema, utility globali
```

## Avvio in locale

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
npm run preview
```