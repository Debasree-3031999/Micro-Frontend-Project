import React from "react";
import { Card } from "@fooddash/shared";
import type { Restaurant } from "@fooddash/shared";

interface RestaurantCardProps {
  restaurant: Restaurant;
  onClick: () => void;
}

const RestaurantCard: React.FC<RestaurantCardProps> = ({ restaurant, onClick }) => {
  return (
    <Card onClick={onClick}>
      <div style={{ fontSize: "48px", textAlign: "center", marginBottom: "12px" }}>
        {restaurant.image}
      </div>
      <h3 style={{ fontSize: "18px", color: "#1a1a2e", marginBottom: "4px" }}>
        {restaurant.name}
      </h3>
      <p style={{ color: "#888", fontSize: "14px", marginBottom: "8px" }}>
        {restaurant.cuisine}
      </p>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <span style={{ color: "#f5a623", fontWeight: 600 }}>
          ⭐ {restaurant.rating}
        </span>
        <span style={{ color: "#888", fontSize: "13px" }}>
          🕐 {restaurant.deliveryTime}
        </span>
      </div>
    </Card>
  );
};

export default RestaurantCard;
