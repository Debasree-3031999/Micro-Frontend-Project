# Foodie — Micro Frontend POC

> A hands-on learning project that breaks a monolithic food delivery app into independently deployable micro frontends using **Webpack Module Federation**, **Turborepo**, **pnpm Workspaces**, and **React 18**.

## Why I Built This

I wanted to understand how companies like **Spotify, Amazon, and IKEA** break their massive frontend into smaller, independently deployable apps. Instead of just reading docs, I built a real food delivery app using micro frontend architecture from scratch.

**This repo is beginner-friendly.** If you've never worked with micro frontends before — this is the place to start.

---

## What is Micro Frontend?

In a traditional React project, everything lives in **one codebase**:

```
Monolithic App (Traditional)
┌──────────────────────────────────────────┐
│  Header + Navigation                     │
│  Restaurant Listing                      │
│  Shopping Cart                           │
│  Checkout                                │
│  ─────────────────────────────────────── │
│  ONE codebase, ONE build, ONE deploy     │
│  If cart breaks → EVERYTHING breaks      │
│  If 5 teams work here → merge conflicts  │
└──────────────────────────────────────────┘
```

With micro frontends, each feature becomes its **own independent project**:

```
Micro Frontend Architecture
┌──────────────┐  ┌──────────────┐  ┌──────────────┐
│  Shell App   │  │  Restaurant  │  │  Cart App    │
│  (Container) │  │  App         │  │              │
│              │  │              │  │              │
│  Own build   │  │  Own build   │  │  Own build   │
│  Own deploy  │  │  Own deploy  │  │  Own deploy  │
│  Own team    │  │  Own team    │  │  Own team    │
└──────┬───────┘  └──────┬───────┘  └──────┬───────┘
       │                 │                 │
       └─────── Loaded at RUNTIME ─────────┘

  Cart team deploys a fix → Only cart redeploys
  Restaurant & Shell are NOT affected!
```

---

## Live Demo

| App | Role | URL |
|-----|------|-----|
| Shell | Host (container) | https://foodie-shell.vercel.app |
| Restaurant | Remote (micro frontend #1) | https://foodie-restaurent.vercel.app |
| Cart | Remote (micro frontend #2) | https://foodie-cart-orcin.vercel.app |

The user only visits the **Shell URL**. Restaurant and Cart are loaded **automatically at runtime** inside the Shell.

---

## Architecture

```
┌──────────────────────────────────────────────────────────────┐
│  Shell (Host) — http://localhost:3000                        │
│  ┌─────────────────────────────────────────────────────────┐ │
│  │  Header  │  Home  │  Restaurants  │  Cart               │ │
│  └─────────────────────────────────────────────────────────┘ │
│                                                              │
│  ┌─────────────────────────┐  ┌────────────────────────────┐ │
│  │  Restaurant App         │  │  Cart App                  │ │
│  │  (Remote — port 3001)   │  │  (Remote — port 3002)      │ │
│  │                         │  │                            │ │
│  │  Fetched at runtime     │  │  Fetched at runtime        │ │
│  │  via remoteEntry.js     │  │  via remoteEntry.js        │ │
│  │                         │  │                            │ │
│  │  ┌───────────────────┐  │  │  ┌──────────────────────┐  │ │
│  │  │ Restaurant List   │  │  │  │ Cart Items           │  │ │
│  │  │ Menu Items        │  │  │  │ Order Summary        │  │ │
│  │  │ Add to Cart btn   │  │  │  │ Place Order btn      │  │ │
│  │  └───────────────────┘  │  │  └──────────────────────┘  │ │
│  └─────────────────────────┘  └────────────────────────────┘ │
│                                                              │
│  ┌──────────────────────────────────────────────────────┐    │
│  │  CartContext (Shared State via React Context)         │    │
│  │  Restaurant adds items → Cart reads items             │    │
│  └──────────────────────────────────────────────────────┘    │
└──────────────────────────────────────────────────────────────┘
```

---

## The 5 Key Concepts I Learned

### 1. Webpack Module Federation

**The Problem:** How do you load one React app inside another at runtime — without bundling them together?

**The Solution:** Webpack 5's `ModuleFederationPlugin`. Each app builds separately and produces a `remoteEntry.js` file. The Shell (host) downloads this file at runtime and loads the remote app's components.

```js
// Shell says: "I want to load these apps"
remotes: {
  restaurant: "restaurant@http://localhost:3001/remoteEntry.js",
  cart: "cart@http://localhost:3002/remoteEntry.js",
}

// Restaurant says: "I expose my App component"
exposes: { "./App": "./src/App" }
filename: "remoteEntry.js"
```

**Where in this project:** `webpack.config.js` in each app under `apps/`

---

### 2. Monorepo with Turborepo

**The Problem:** 3 separate apps = 3 separate repos? That's painful to manage.

**The Solution:** Keep all apps in ONE repo (monorepo), but let each app build and deploy independently. Turborepo orchestrates everything — runs all dev servers in parallel, caches builds, knows the dependency order.

```bash
pnpm dev    # Starts all 3 apps simultaneously
pnpm build  # Builds all apps (shared packages first, then apps)
```

**Where in this project:** `turbo.json` at root

---

### 3. Why pnpm Instead of npm?

| Feature | npm | pnpm |
|---------|-----|------|
| **Workspace support** | Basic | First-class — designed for monorepos |
| **Disk usage** | Duplicates packages per app | Symlinks shared packages — saves space |
| **Speed** | Slower | 2-3x faster installs |
| **Dependency isolation** | Hoists everything (can cause phantom deps) | Strict isolation — each app sees only its own deps |
| **Cross-app linking** | Manual `npm link` (fragile) | `workspace:*` protocol — automatic and reliable |

```yaml
# pnpm-workspace.yaml — tells pnpm where apps live
packages:
  - "apps/*"
  - "packages/*"
```

**Where in this project:** `pnpm-workspace.yaml` at root

---

### 4. Shared Dependency Management

**The Problem:** If Shell, Restaurant, and Cart each bundle their own React, the user downloads React **3 times** (126KB wasted). Worse — React hooks **crash** if two React instances exist on the same page.

**The Solution:** Module Federation's `shared` config with `singleton: true`:

```js
shared: {
  react: { singleton: true },      // Only ONE React on the page
  "react-dom": { singleton: true },
}
```

Result: React is loaded once by Shell. Restaurant and Cart reuse Shell's copy.

**Where in this project:** `shared` config in each `webpack.config.js`

---

### 5. Independent Deployment

**The Problem:** In a monolith, changing the cart means redeploying the ENTIRE app.

**The Solution:** Each micro frontend deploys independently. The Shell fetches `remoteEntry.js` at runtime, so it always gets the latest version of each remote.

```
Cart team pushes a fix:
  1. Build cart:  cd apps/cart && pnpm build
  2. Deploy cart: vercel deploy --prod
  3. Done! Shell automatically loads the new cart.
     No Shell redeploy needed.
```

**Where in this project:** `deploy.sh` at root, `vercel.json` in each app

---

## Industry Alternatives

This POC uses Webpack Module Federation + Turborepo. Here's how it compares to other approaches:

| Approach | Used By | Pros | Cons |
|----------|---------|------|------|
| **Webpack Module Federation** (this project) | Walmart, SAP | Industry standard, runtime integration, shared deps | Webpack config can be verbose |
| **Nx** | Google, Microsoft teams | Powerful dep graph, code generators, built-in CI | Steeper learning curve, more opinionated |
| **Single-SPA** | Canopy, some banks | Framework-agnostic (mix React + Vue + Angular) | Extra framework to learn, more boilerplate |
| **Vite Module Federation** | Early adopters | Faster dev server | Plugin less mature, smaller community |
| **Import Maps / Native ESM** | Shopify, IKEA | No bundler needed, browser-native | No shared dep optimization, less tooling |

---

## Project Structure

```
Micro-Frontend-Project/
├── package.json              ← Root workspace config (Turborepo + scripts)
├── pnpm-workspace.yaml       ← Defines which folders are workspace packages
├── turbo.json                ← Task orchestration (dev, build pipelines)
├── setup.sh                  ← First-time setup script
├── deploy.sh                 ← Build & deploy script
│
├── apps/
│   ├── shell/                ← HOST — loads other apps, owns layout & routing
│   │   ├── webpack.config.js ← Module Federation HOST config
│   │   ├── vercel.json       ← CORS headers for Vercel deployment
│   │   └── src/
│   │       ├── index.ts      ← Async entry: import("./bootstrap")
│   │       ├── bootstrap.tsx ← React render (runs after shared deps load)
│   │       ├── App.tsx       ← Routes + lazy loading of remotes
│   │       └── context/      ← CartContext (shared state)
│   │
│   ├── restaurant/           ← REMOTE #1 — restaurant listing & menu
│   │   ├── webpack.config.js ← Module Federation REMOTE config
│   │   ├── vercel.json       ← CORS headers
│   │   └── src/
│   │       ├── index.ts      ← Async entry
│   │       ├── bootstrap.tsx ← Standalone render
│   │       └── App.tsx       ← Exposed to Shell via Module Federation
│   │
│   └── cart/                 ← REMOTE #2 — shopping cart & checkout
│       ├── webpack.config.js ← Module Federation REMOTE config
│       ├── vercel.json       ← CORS headers
│       └── src/
│           ├── index.ts      ← Async entry
│           ├── bootstrap.tsx ← Standalone render
│           └── App.tsx       ← Exposed to Shell via Module Federation
│
└── packages/
    └── shared/               ← Shared UI components, types, mock data
        └── src/
            ├── index.ts      ← Barrel export (single import point)
            ├── components/   ← Button, Card (used by all apps)
            ├── types/        ← TypeScript interfaces (Restaurant, CartItem)
            └── data/         ← Mock restaurant data
```

---

## How Data Flows Between Apps

```
User clicks "Add to Cart" in Restaurant App
        │
        ▼
Restaurant App calls addItem() from CartContext
        │
        ▼
CartContext (owned by Shell) updates state
        │
        ▼
Cart App re-renders with new item (reads same CartContext)

Key: Restaurant and Cart NEVER talk directly.
     They communicate through Shell's CartContext.
```

---

## Getting Started

### Prerequisites

- **Node.js** v18+ → [Download](https://nodejs.org)
- **pnpm** → `npm install -g pnpm`

### Quick Start

```bash
# Clone
git clone <repo-url>
cd Micro-Frontend-Project

# Install all dependencies (or run ./setup.sh)
pnpm install

# Start all 3 apps
pnpm dev
```

Open http://localhost:3000 — you'll see the Shell with Restaurant and Cart loaded inside.

### Common Commands

```bash
# Development
pnpm dev                              # Start all apps
pnpm --filter @fooddash/shell dev     # Start only shell
pnpm --filter @fooddash/restaurant dev # Start only restaurant
pnpm --filter @fooddash/cart dev       # Start only cart

# Building
pnpm build                            # Build all
pnpm --filter @fooddash/cart build     # Build only cart

# Deployment
./deploy.sh all                        # Deploy everything
./deploy.sh cart                       # Deploy only cart
./deploy.sh restaurant                 # Deploy only restaurant
./deploy.sh shell                      # Deploy only shell
```

---

## What I Learned Building This

1. **Micro frontends solve team scaling, not code problems.** A 3-person team doesn't need micro frontends. A 30-person team with 5 squads absolutely does.

2. **The async bootstrap pattern (`index.ts` → `bootstrap.tsx`) is mandatory.** Module Federation needs an async boundary to negotiate shared dependencies before React loads. Without it, everything crashes.

3. **`singleton: true` for React is non-negotiable.** Two React instances on one page = hooks break, context breaks, everything breaks.

4. **Deploy remotes before the host.** The Shell bakes remote URLs into its bundle at build time. If remotes aren't live yet, Shell has nowhere to fetch from.

5. **pnpm workspaces + Turborepo is the sweet spot** for managing multiple apps. pnpm handles dependency linking, Turborepo handles task orchestration and caching.

---

## Tech Stack

| Technology | Version | Purpose |
|-----------|---------|---------|
| React | 18.3.1 | UI framework |
| TypeScript | 5.x | Type safety |
| Webpack | 5.x | Bundler + Module Federation |
| Turborepo | 2.x | Monorepo task orchestration |
| pnpm | 10.x | Package manager with workspace support |
| React Router | 6.x | Client-side routing |
| Vercel | - | Hosting (3 separate deployments) |

---

## License

MIT
