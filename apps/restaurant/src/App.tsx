import React, { useState } from "react";
import { restaurants } from "@fooddash/shared";
import RestaurantList from "./components/RestaurantList";
import MenuItems from "./components/MenuItems";

interface AppProps {
  restaurantId?: string;
  onAddToCart: (item: { id: string; name: string; price: number; restaurantName: string }) => void;
  onNavigate: (path: string) => void;
}

const App: React.FC<AppProps> = ({ restaurantId, onAddToCart, onNavigate }) => {
  // If restaurantId is passed from Shell's route params, show that restaurant's menu
  // Otherwise show the restaurant list
  const [selectedId, setSelectedId] = useState<string | null>(restaurantId || null);

  const selectedRestaurant = selectedId
    ? restaurants.find((r) => r.id === selectedId)
    : null;

  if (selectedRestaurant) {
    return (
      <MenuItems
        restaurant={selectedRestaurant}
        onAddToCart={onAddToCart}
        onBack={() => {
          setSelectedId(null);
          onNavigate("/restaurants");
        }}
      />
    );
  }

  return (
    <RestaurantList
      onSelectRestaurant={(id) => {
        setSelectedId(id);
        onNavigate(`/restaurants/${id}`);
      }}
    />
  );
};

export default App;
