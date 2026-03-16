# FoodDash — Micro Frontend POC Design Spec

## Problem

The user needs to learn micro frontend architecture hands-on and build a presentable POC that demonstrates the 5 core concepts: Webpack Module Federation, Monorepos (Turborepo), Dynamic Imports, CI/CD per app, and Shared Dependency Management. They have no prior micro frontend experience.

## Solution

Build a food delivery app ("FoodDash") as a Turborepo monorepo with 3 React apps connected via Webpack 5 Module Federation:

- **Shell (host, port 3000)** — main layout, routing, shared cart state
- **Restaurant (remote, port 3001)** — restaurant listing and menu browsing
- **Cart (remote, port 3002)** — cart management and order placement

Plus a shared package (`packages/shared`) with reusable components, mock data, and TypeScript types.

## Architecture

### Project Structure

```
Micro-Frontend-Project/
├── turbo.json                   (Turborepo pipeline config)
├── package.json                 (pnpm workspace root)
├── pnpm-workspace.yaml          (workspace definition)
├── packages/
│   └── shared/                  (shared components, data, types)
└── apps/
    ├── shell/                   (HOST app — port 3000)
    ├── restaurant/              (REMOTE app — port 3001)
    └── cart/                    (REMOTE app — port 3002)
```

### Module Federation Flow

1. Shell (host) declares remotes in its webpack config
2. Restaurant and Cart (remotes) expose their App components via `remoteEntry.js`
3. Shell lazy-loads remotes at runtime using `React.lazy(() => import('restaurant/App'))`
4. Shared dependencies (React, React-DOM, React Router) are declared as singletons — loaded once

### Cross-App Communication

Shell owns a `CartContext` (React Context) that provides:
- `items: CartItem[]` — current cart items
- `addItem(item)` — adds item to cart
- `removeItem(id)` — removes item from cart
- `updateQuantity(id, qty)` — updates item quantity
- `totalItems: number` — cart count for header badge
- `totalPrice: number` — total for order summary

Shell passes callbacks/state as props to loaded remotes. No direct communication between remotes.

## App Details

### Shell (Host)
- Header with "FoodDash" branding and nav links (Home, Restaurants, Cart)
- Cart count badge in header (from CartContext)
- React Router routes: `/` (home), `/restaurants` (lazy-loads restaurant remote), `/cart` (lazy-loads cart remote)
- Suspense fallback while loading remotes
- CartProvider wrapping entire app

### Restaurant (Remote)
- Restaurant list page: grid of 6-8 restaurant cards (name, cuisine, rating, image placeholder)
- Restaurant detail view: menu items for selected restaurant
- "Add to Cart" buttons on menu items — calls `addItem()` prop
- Can run standalone for independent development

### Cart (Remote)
- Cart items list with quantity +/- controls
- Remove item functionality
- Order summary: subtotal, delivery fee, total
- "Place Order" button (shows success alert)
- Empty cart state when no items
- Can run standalone for independent development

### Shared Package
- `Button` component — styled, reusable button
- `Card` component — card container
- Mock restaurant data — 6-8 restaurants with menus
- TypeScript interfaces: `Restaurant`, `MenuItem`, `CartItem`

## Tech Stack

- React 18, TypeScript, Webpack 5, Turborepo, pnpm, React Router 6, CSS Modules

## What This POC Teaches

| Concept | Implementation |
|---------|---------------|
| Module Federation | Each app's `webpack.config.js` with `ModuleFederationPlugin` |
| Monorepo | Turborepo + pnpm workspaces, shared packages |
| Dynamic imports | `React.lazy()` + `Suspense` in Shell |
| CI/CD per app | `turbo build --filter=<app>` for independent builds |
| Shared deps | `shared: { react: { singleton: true } }` in webpack config |

## Success Criteria

1. All 3 apps start with a single `pnpm dev` command
2. Each app can also run standalone
3. Adding items in Restaurant app reflects in Cart app (through Shell's context)
4. Cart count updates in Shell's header
5. React loads only once across all apps (verified via Network tab)
6. Individual app builds work: `pnpm build --filter=cart`
