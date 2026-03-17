import React from "react";
import type { CartItem as CartItemType } from "@fooddash/shared";
import CartItems from "./components/CartItems";
import OrderSummary from "./components/OrderSummary";

interface AppProps {
  items: CartItemType[];
  onRemoveItem: (id: string) => void;
  onUpdateQuantity: (id: string, quantity: number) => void;
  onClearCart: () => void;
  totalPrice: number;
  onNavigate: (path: string) => void;
}

const App: React.FC<AppProps> = ({
  items,
  onRemoveItem,
  onUpdateQuantity,
  onClearCart,
  totalPrice,
  onNavigate,
}) => {
  const handlePlaceOrder = () => {
    if (items.length === 0) return;
    alert("Order placed successfully! 🎉\nYour food is on its way.");
    onClearCart();
  };

  return (
    <div>
      <h2 style={{ fontSize: "28px", color: "#1a1a2e", marginBottom: "24px" }}>
        Your Cart
      </h2>

      {items.length === 0 ? (
        <div style={{ textAlign: "center", padding: "60px 20px", color: "#888" }}>
          <p style={{ fontSize: "48px", marginBottom: "16px" }}>🛒</p>
          <h3 style={{ marginBottom: "8px", color: "#1a1a2e" }}>Your cart is empty</h3>
          <p style={{ marginBottom: "24px" }}>Browse restaurants and add some delicious food!</p>
          <button
            onClick={() => onNavigate("/restaurants")}
            style={{
              padding: "12px 24px",
              backgroundColor: "#ff6b35",
              color: "#fff",
              border: "none",
              borderRadius: "8px",
              cursor: "pointer",
              fontSize: "16px",
              fontWeight: 600,
            }}
          >
            Browse Restaurants
          </button>
        </div>
      ) : (
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 320px",
            gap: "24px",
            alignItems: "start",
          }}
        >
          <CartItems
            items={items}
            onUpdateQuantity={onUpdateQuantity}
            onRemoveItem={onRemoveItem}
          />
          <OrderSummary
            totalPrice={totalPrice}
            itemCount={items.reduce((sum, i) => sum + i.quantity, 0)}
            onPlaceOrder={handlePlaceOrder}
            onClearCart={onClearCart}
          />
        </div>
      )}
    </div>
  );
};

export default App;
