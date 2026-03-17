import React from "react";
import { Button } from "@fooddash/shared";
import type { CartItem as CartItemType } from "@fooddash/shared";

interface CartItemProps {
  item: CartItemType;
  onUpdateQuantity: (id: string, quantity: number) => void;
  onRemove: (id: string) => void;
}

const CartItem: React.FC<CartItemProps> = ({ item, onUpdateQuantity, onRemove }) => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "16px",
        backgroundColor: "#fff",
        borderRadius: "12px",
        boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
      }}
    >
      <div>
        <h4 style={{ fontSize: "16px", color: "#1a1a2e" }}>{item.name}</h4>
        <p style={{ color: "#888", fontSize: "13px" }}>{item.restaurantName}</p>
        <p style={{ color: "#ff6b35", fontWeight: 700, marginTop: "4px" }}>
          ${item.price.toFixed(2)}
        </p>
      </div>

      <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
        <Button
          size="small"
          variant="secondary"
          onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
        >
          -
        </Button>
        <span
          style={{
            minWidth: "32px",
            textAlign: "center",
            fontWeight: 700,
            fontSize: "16px",
          }}
        >
          {item.quantity}
        </span>
        <Button
          size="small"
          variant="secondary"
          onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
        >
          +
        </Button>
        <Button size="small" variant="danger" onClick={() => onRemove(item.id)}>
          Remove
        </Button>
      </div>
    </div>
  );
};

export default CartItem;
