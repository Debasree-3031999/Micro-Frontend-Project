export interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
}

export interface Restaurant {
  id: string;
  name: string;
  cuisine: string;
  rating: number;
  deliveryTime: string;
  image: string;
  menu: MenuItem[];
}

export interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  restaurantName: string;
}
