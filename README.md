# EcoShop

A premium e-commerce single page application built with Next.js, TypeScript, and Tailwind CSS. A clean, dependency-light storefront with product browsing, cart management, authentication, and a complete checkout flow.

## Features

- **Curated product catalog** with categories and deals
- **Product detail views** with rich descriptions
- **Shopping cart** with quantity management
- **Login / signup** flows with client-side validation
- **Multi-step checkout** ending in an order confirmation
- **Deals & About pages** for a complete storefront feel
- **Responsive design** that works across devices
- **Zero heavy dependencies** — just React, Next.js, and Tailwind

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 14 (Pages Router) |
| Language | TypeScript |
| Styling | Tailwind CSS |
| State | React hooks |

## Getting Started

### Prerequisites

- Node.js 18+
- npm

### Installation

```bash
git clone https://github.com/iabhishek18/ecoshop.git
cd ecoshop
npm install
```

### Development

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Production Build

```bash
npm run build
npm start
```

## Project Structure

```
├── pages/
│   ├── _app.tsx        # App wrapper, global styles
│   ├── _document.tsx   # HTML document shell
│   └── index.tsx       # EcoShop application (all pages + state)
├── public/             # Static assets
├── styles/
│   └── globals.css     # Tailwind directives
├── next.config.mjs
├── tailwind.config.ts
└── tsconfig.json
```

## How It Works

EcoShop renders every page — home, product, cart, login, signup, checkout, confirmation, deals, and about — from a single component driven by a typed `Page` union. This keeps navigation instant and the mental model simple: one state value decides what the user sees.

## License

MIT
