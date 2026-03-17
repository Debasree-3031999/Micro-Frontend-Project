import React from "react";
import { restaurants } from "@fooddash/shared";
import RestaurantCard from "./RestaurantCard";

interface RestaurantListProps {
  onSelectRestaurant: (id: string) => void;
}

const RestaurantList: React.FC<RestaurantListProps> = ({ onSelectRestaurant }) => {
  return (
    <div>
      <h2 style={{ fontSize: "28px", color: "#1a1a2e", marginBottom: "8px" }}>
        Restaurants Near You
      </h2>
      <p style={{ color: "#888", marginBottom: "24px" }}>
        Choose from {restaurants.length} restaurants and order your favorite food
      </p>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))",
          gap: "20px",
        }}
      >
        {restaurants.map((restaurant) => (
          <RestaurantCard
            key={restaurant.id}
            restaurant={restaurant}
            onClick={() => onSelectRestaurant(restaurant.id)}
          />
        ))}
      </div>
    </div>
  );
};

export default RestaurantList;
