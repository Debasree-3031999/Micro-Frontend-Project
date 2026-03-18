import React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, useNavigate, useParams, Routes, Route } from "react-router-dom";
import App from "./App";

// =============================================================
// STANDALONE MODE
// =============================================================
// When this remote runs on its own (localhost:3001), it needs
// its own BrowserRouter and routing. When loaded inside the Shell
// via Module Federation, the Shell provides routing instead.
// =============================================================

const mockAddToCart = (item: any) => {
  console.log("[Standalone] Added to cart:", item);
  alert(`Added "${item.name}" to cart! (Standalone mode - no real cart)`);
};

const StandaloneApp: React.FC<{ restaurantId?: string }> = ({ restaurantId }) => {
  const navigate = useNavigate();
  return (
    <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "24px" }}>
      <h2 style={{ marginBottom: "16px", color: "#1a1a2e" }}>
        Restaurant App (Standalone Mode)
      </h2>
      <App
        restaurantId={restaurantId}
        onAddToCart={mockAddToCart}
        onNavigate={(path: string) => navigate(path)}
      />
    </div>
  );
};

const StandaloneDetail: React.FC = () => {
  const { id } = useParams();
  return <StandaloneApp restaurantId={id} />;
};

const container = document.getElementById("root")!;
const root = createRoot(container);

root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/restaurants/:id" element={<StandaloneDetail />} />
        <Route path="*" element={<StandaloneApp />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
