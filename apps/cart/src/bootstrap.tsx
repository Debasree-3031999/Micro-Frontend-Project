import React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";

// Standalone mode — provides mock cart data for independent development
const container = document.getElementById("root")!;
const root = createRoot(container);

const mockItems = [
  { id: "1-1", name: "Margherita Pizza", price: 12.99, quantity: 2, restaurantName: "Pizza Paradise" },
  { id: "2-1", name: "Classic Cheeseburger", price: 10.99, quantity: 1, restaurantName: "Burger Barn" },
];

root.render(
  <React.StrictMode>
    <BrowserRouter>
      <div style={{ maxWidth: "800px", margin: "0 auto", padding: "24px" }}>
        <h2 style={{ marginBottom: "16px", color: "#1a1a2e" }}>
          🛒 Cart App (Standalone Mode)
        </h2>
        <App
          items={mockItems}
          onRemoveItem={(id) => console.log("[Standalone] Remove:", id)}
          onUpdateQuantity={(id, qty) => console.log("[Standalone] Update:", id, qty)}
          onClearCart={() => console.log("[Standalone] Clear cart")}
          totalPrice={mockItems.reduce((sum, i) => sum + i.price * i.quantity, 0)}
          onNavigate={(path) => (window.location.href = path)}
        />
      </div>
    </BrowserRouter>
  </React.StrictMode>
);
