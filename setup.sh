#!/bin/bash

# ============================================
# FoodDash - First Time Setup
# Run this when cloning the project fresh
# ============================================

echo "Installing pnpm globally..."
npm install -g pnpm

echo "Installing all workspace dependencies..."
pnpm install

echo "Setup complete! Run 'pnpm dev' to start all apps."
