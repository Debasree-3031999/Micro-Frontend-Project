import React from "react";
import { Button } from "@fooddash/shared";

interface OrderSummaryProps {
  totalPrice: number;
  itemCount: number;
  onPlaceOrder: () => void;
  onClearCart: () => void;
}

const DELIVERY_FEE = 2.99;

const OrderSummary: React.FC<OrderSummaryProps> = ({
  totalPrice,
  itemCount,
  onPlaceOrder,
  onClearCart,
}) => {
  const total = totalPrice + DELIVERY_FEE;

  return (
    <div
      style={{
        backgroundColor: "#fff",
        borderRadius: "12px",
        padding: "24px",
        boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
      }}
    >
      <h3 style={{ fontSize: "20px", color: "#1a1a2e", marginBottom: "16px" }}>
        Order Summary
      </h3>

      <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <span style={{ color: "#666" }}>Subtotal ({itemCount} items)</span>
          <span style={{ fontWeight: 600 }}>${totalPrice.toFixed(2)}</span>
        </div>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <span style={{ color: "#666" }}>Delivery Fee</span>
          <span style={{ fontWeight: 600 }}>${DELIVERY_FEE.toFixed(2)}</span>
        </div>
        <hr style={{ border: "none", borderTop: "1px solid #eee" }} />
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <span style={{ fontSize: "18px", fontWeight: 700, color: "#1a1a2e" }}>Total</span>
          <span style={{ fontSize: "18px", fontWeight: 700, color: "#ff6b35" }}>
            ${total.toFixed(2)}
          </span>
        </div>
      </div>

      <div style={{ marginTop: "24px", display: "flex", flexDirection: "column", gap: "8px" }}>
        <Button onClick={onPlaceOrder}>Place Order</Button>
        <Button variant="secondary" onClick={onClearCart}>
          Clear Cart
        </Button>
      </div>
    </div>
  );
};

export default OrderSummary;
