#!/bin/bash

# ============================================
# FoodDash - Build & Deploy to Vercel
# Usage:
#   ./deploy.sh all         → Build & deploy all 3 apps
#   ./deploy.sh restaurant  → Build & deploy only restaurant
#   ./deploy.sh cart        → Build & deploy only cart
#   ./deploy.sh shell       → Build & deploy only shell
# ============================================

ROOT_DIR="$(cd "$(dirname "$0")" && pwd)"

deploy_restaurant() {
  echo "========== Building Restaurant =========="
  cd "$ROOT_DIR/apps/restaurant"
  pnpm build
  echo "========== Deploying Restaurant =========="
  vercel deploy --prod
}

deploy_cart() {
  echo "========== Building Cart =========="
  cd "$ROOT_DIR/apps/cart"
  pnpm build
  echo "========== Deploying Cart =========="
  vercel deploy --prod
}

deploy_shell() {
  echo "========== Building Shell =========="
  cd "$ROOT_DIR/apps/shell"
  pnpm build
  echo "========== Deploying Shell =========="
  vercel deploy --prod
}

case "$1" in
  restaurant)
    deploy_restaurant
    ;;
  cart)
    deploy_cart
    ;;
  shell)
    deploy_shell
    ;;
  all)
    echo "Deploying REMOTES first, then SHELL..."
    deploy_restaurant
    deploy_cart
    deploy_shell
    ;;
  *)
    echo "Usage: ./deploy.sh [restaurant|cart|shell|all]"
    echo ""
    echo "  restaurant  → Build & deploy restaurant app only"
    echo "  cart         → Build & deploy cart app only"
    echo "  shell        → Build & deploy shell app only"
    echo "  all          → Build & deploy all (remotes first, then shell)"
    exit 1
    ;;
esac

echo ""
echo "Done! Deployed successfully."
