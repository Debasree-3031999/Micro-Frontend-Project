import React from "react";
import type { CartItem as CartItemType } from "@fooddash/shared";
import CartItem from "./CartItem";

interface CartItemsProps {
  items: CartItemType[];
  onUpdateQuantity: (id: string, quantity: number) => void;
  onRemoveItem: (id: string) => void;
}

const CartItems: React.FC<CartItemsProps> = ({ items, onUpdateQuantity, onRemoveItem }) => {
  if (items.length === 0) {
    return (
      <div style={{ textAlign: "center", padding: "60px 20px", color: "#888" }}>
        <p style={{ fontSize: "48px", marginBottom: "16px" }}>🛒</p>
        <h3 style={{ marginBottom: "8px", color: "#1a1a2e" }}>Your cart is empty</h3>
        <p>Browse restaurants and add some delicious food!</p>
      </div>
    );
  }

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
      {items.map((item) => (
        <CartItem
          key={item.id}
          item={item}
          onUpdateQuantity={onUpdateQuantity}
          onRemove={onRemoveItem}
        />
      ))}
    </div>
  );
};

export default CartItems;
