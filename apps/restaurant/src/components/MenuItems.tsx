import React from "react";
import { Button, Card } from "@fooddash/shared";
import type { Restaurant, MenuItem } from "@fooddash/shared";

interface MenuItemsProps {
  restaurant: Restaurant;
  onAddToCart: (item: { id: string; name: string; price: number; restaurantName: string }) => void;
  onBack: () => void;
}

const MenuItems: React.FC<MenuItemsProps> = ({ restaurant, onAddToCart, onBack }) => {
  return (
    <div>
      <button
        onClick={onBack}
        style={{
          background: "none",
          border: "none",
          color: "#ff6b35",
          cursor: "pointer",
          fontSize: "16px",
          marginBottom: "16px",
          padding: 0,
        }}
      >
        ← Back to Restaurants
      </button>

      <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "24px" }}>
        <span style={{ fontSize: "48px" }}>{restaurant.image}</span>
        <div>
          <h2 style={{ fontSize: "28px", color: "#1a1a2e" }}>{restaurant.name}</h2>
          <p style={{ color: "#888" }}>
            {restaurant.cuisine} · ⭐ {restaurant.rating} · 🕐 {restaurant.deliveryTime}
          </p>
        </div>
      </div>

      <h3 style={{ fontSize: "20px", color: "#1a1a2e", marginBottom: "16px" }}>Menu</h3>

      <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
        {restaurant.menu.map((item: MenuItem) => (
          <Card key={item.id} style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
              <span style={{ fontSize: "32px" }}>{item.image}</span>
              <div>
                <h4 style={{ fontSize: "16px", color: "#1a1a2e" }}>{item.name}</h4>
                <p style={{ color: "#888", fontSize: "13px" }}>{item.description}</p>
                <p style={{ color: "#ff6b35", fontWeight: 700, marginTop: "4px" }}>
                  ${item.price.toFixed(2)}
                </p>
              </div>
            </div>
            <Button
              size="small"
              onClick={() =>
                onAddToCart({
                  id: item.id,
                  name: item.name,
                  price: item.price,
                  restaurantName: restaurant.name,
                })
              }
            >
              Add to Cart
            </Button>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default MenuItems;
