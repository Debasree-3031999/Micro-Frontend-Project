import React, { useState } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import type { CartItem } from "@fooddash/shared";
import App from "./App";

// =============================================================
// STANDALONE MODE
// =============================================================
// When running independently, the Cart app manages its own state.
// When loaded inside the Shell via Module Federation, the Shell
// provides state and callbacks via props instead.
// =============================================================

const initialItems: CartItem[] = [
  { id: "1-1", name: "Margherita Pizza", price: 12.99, quantity: 2, restaurantName: "Pizza Paradise" },
  { id: "2-1", name: "Classic Cheeseburger", price: 10.99, quantity: 1, restaurantName: "Burger Barn" },
];

const StandaloneCart: React.FC = () => {
  const [items, setItems] = useState<CartItem[]>(initialItems);

  const removeItem = (id: string) => {
    setItems((prev) => prev.filter((item) => item.id !== id));
  };

  const updateQuantity = (id: string, quantity: number) => {
    if (quantity <= 0) {
      removeItem(id);
      return;
    }
    setItems((prev) =>
      prev.map((item) => (item.id === id ? { ...item, quantity } : item))
    );
  };

  const clearCart = () => {
    setItems([]);
  };

  const totalPrice = items.reduce((sum, i) => sum + i.price * i.quantity, 0);

  return (
    <div style={{ maxWidth: "800px", margin: "0 auto", padding: "24px" }}>
      <h2 style={{ marginBottom: "16px", color: "#1a1a2e" }}>
        Cart App (Standalone Mode)
      </h2>
      <App
        items={items}
        onRemoveItem={removeItem}
        onUpdateQuantity={updateQuantity}
        onClearCart={clearCart}
        totalPrice={totalPrice}
        onNavigate={(path) => (window.location.href = path)}
      />
    </div>
  );
};

const container = document.getElementById("root")!;
const root = createRoot(container);

root.render(
  <React.StrictMode>
    <BrowserRouter>
      <StandaloneCart />
    </BrowserRouter>
  </React.StrictMode>
);
