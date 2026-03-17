import React, { Suspense } from "react";
import { Routes, Route, useNavigate, useParams } from "react-router-dom";
import Header from "./components/Header";
import Layout from "./components/Layout";
import ErrorBoundary from "./components/ErrorBoundary";
import { CartProvider, useCart } from "./context/CartContext";

// =============================================================
// DYNAMIC IMPORTS — Loading remote micro frontends at runtime
// =============================================================
// React.lazy() + import() = the remote app's code is only downloaded
// when the user navigates to that route. This is "code splitting" +
// "Module Federation" working together.
//
// 'restaurant/App' is NOT a file path — it's a Module Federation
// remote reference. Webpack resolves it using the `remotes` config
// in webpack.config.js to fetch from http://localhost:3001/remoteEntry.js
// =============================================================
const RestaurantApp = React.lazy(() => import("restaurant/App"));
const CartApp = React.lazy(() => import("cart/App"));

const LoadingFallback: React.FC<{ name: string }> = ({ name }) => (
  <div
    style={{
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      padding: "60px",
      color: "#888",
      fontSize: "18px",
    }}
  >
    Loading {name}...
  </div>
);

const HomePage: React.FC = () => (
  <div style={{ textAlign: "center", padding: "60px 20px" }}>
    {/* <h1 style={{ fontSize: "48px", marginBottom: "8px" }}>🍽️</h1> */}
    <h1 style={{ fontSize: "36px", color: "#1a1a2e", marginBottom: "12px" }}>
      Welcome to 
    </h1>
    <p style={{ fontSize: "18px", color: "#666", marginBottom: "32px" }}>
      Your favorite restaurants, delivered to your door.
    </p>
    <p
      style={{
        fontSize: "14px",
        color: "#999",
        backgroundColor: "#f0f0f0",
        display: "inline-block",
        padding: "12px 24px",
        borderRadius: "8px",
      }}
    >
      This is a <strong>Micro Frontend POC</strong> — Shell (host) loads
      Restaurant and Cart apps via <strong>Webpack Module Federation</strong>
    </p>
  </div>
);

// Wrapper components that pass Shell's context/props to remote apps
const RestaurantWrapper: React.FC = () => {
  const { addItem } = useCart();
  const navigate = useNavigate();
  return (
    <ErrorBoundary fallback="Restaurant app is unavailable">
      <Suspense fallback={<LoadingFallback name="Restaurant" />}>
        <RestaurantApp
          onAddToCart={addItem}
          onNavigate={(path: string) => navigate(path)}
        />
      </Suspense>
    </ErrorBoundary>
  );
};

const RestaurantDetailWrapper: React.FC = () => {
  const { addItem } = useCart();
  const { id } = useParams();
  const navigate = useNavigate();
  return (
    <ErrorBoundary fallback="Restaurant app is unavailable">
      <Suspense fallback={<LoadingFallback name="Restaurant" />}>
        <RestaurantApp
          restaurantId={id}
          onAddToCart={addItem}
          onNavigate={(path: string) => navigate(path)}
        />
      </Suspense>
    </ErrorBoundary>
  );
};

const CartWrapper: React.FC = () => {
  const { items, removeItem, updateQuantity, clearCart, totalPrice } = useCart();
  const navigate = useNavigate();
  return (
    <ErrorBoundary fallback="Cart app is unavailable">
      <Suspense fallback={<LoadingFallback name="Cart" />}>
        <CartApp
          items={items}
          onRemoveItem={removeItem}
          onUpdateQuantity={updateQuantity}
          onClearCart={clearCart}
          totalPrice={totalPrice}
          onNavigate={(path: string) => navigate(path)}
        />
      </Suspense>
    </ErrorBoundary>
  );
};

const App: React.FC = () => {
  return (
    <CartProvider>
      <Header />
      <Layout>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/restaurants" element={<RestaurantWrapper />} />
          <Route path="/restaurants/:id" element={<RestaurantDetailWrapper />} />
          <Route path="/cart" element={<CartWrapper />} />
        </Routes>
      </Layout>
    </CartProvider>
  );
};

export default App;
