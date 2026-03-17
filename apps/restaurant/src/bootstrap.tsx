import React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";

// =============================================================
// STANDALONE MODE
// =============================================================
// When this remote runs on its own (localhost:3001), it needs
// its own BrowserRouter and mock callbacks. When loaded inside
// the Shell via Module Federation, the Shell provides these instead.
// =============================================================
const container = document.getElementById("root")!;
const root = createRoot(container);

const mockAddToCart = (item: any) => {
  console.log("[Standalone] Added to cart:", item);
  alert(`Added "${item.name}" to cart! (Standalone mode — no real cart)`);
};

root.render(
  <React.StrictMode>
    <BrowserRouter>
      <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "24px" }}>
        <h2 style={{ marginBottom: "16px", color: "#1a1a2e" }}>
          🍽️ Restaurant App (Standalone Mode)
        </h2>
        <App onAddToCart={mockAddToCart} onNavigate={(path: string) => window.location.href = path} />
      </div>
    </BrowserRouter>
  </React.StrictMode>
);
