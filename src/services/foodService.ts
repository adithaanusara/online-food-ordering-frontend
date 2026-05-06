import api from "./api";
import { FoodItem } from "../types";

type BackendFoodItem = {
  id: number;
  name: string;
  description: string;
  price: number;
  imageUrl: string;
  status: "AVAILABLE" | "OUT_OF_STOCK";
  category?: {
    id: number;
    name: string;
    description?: string;
  };
};

const mockFoods: FoodItem[] = [
  {
    id: 1,
    name: "Chicken Pizza",
    description: "Hot pizza with extra cheese and chicken toppings.",
    price: 1800,
    imageUrl:
      "https://images.unsplash.com/photo-1513104890138-7c749659a591?w=800&auto=format&fit=crop",
    image:
      "https://images.unsplash.com/photo-1513104890138-7c749659a591?w=800&auto=format&fit=crop",
    categoryId: 1,
    category: "Pizza",
    available: true,
  },
  {
    id: 2,
    name: "Cheese Burger",
    description: "Fresh burger with cheese, sauce, and crispy fries.",
    price: 1200,
    imageUrl:
      "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=800&auto=format&fit=crop",
    image:
      "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=800&auto=format&fit=crop",
    categoryId: 2,
    category: "Burger",
    available: true,
  },
  {
    id: 3,
    name: "Chicken Rice & Koththu",
    description:
      "Spicy rice and koththu mixed with vegetables, egg, chicken and sauces.",
    price: 950,
    imageUrl:
      "https://images.unsplash.com/photo-1603133872878-684f208fb84b?w=800&auto=format&fit=crop",
    image:
      "https://images.unsplash.com/photo-1603133872878-684f208fb84b?w=800&auto=format&fit=crop",
    categoryId: 3,
    category: "Rice & Koththu",
    available: true,
  },
];

function mapBackendFood(food: BackendFoodItem): FoodItem {
  const imageUrl = food.imageUrl.includes("?")
    ? food.imageUrl
    : `${food.imageUrl}?w=800&auto=format&fit=crop`;

  return {
    id: food.id,
    name: food.name,
    description: food.description,
    price: food.price,
    imageUrl,
    image: imageUrl,
    categoryId: food.category?.id,
    category: food.category?.name || "Food",
    available: food.status === "AVAILABLE",
  };
}

export async function getFoods(search = "", categoryId = "") {
  try {
    const response = await api.get<BackendFoodItem[]>("/foods", {
      params: categoryId ? { categoryId } : {},
    });

    const foods = response.data.map(mapBackendFood);

    return foods.filter((food) => {
      const keyword = search.trim().toLowerCase();

      if (!keyword) return true;

      return (
        food.name.toLowerCase().includes(keyword) ||
        String(food.category || "").toLowerCase().includes(keyword)
      );
    });
  } catch {
    return mockFoods.filter(
      (food) =>
        (!search ||
          food.name.toLowerCase().includes(search.toLowerCase()) ||
          String(food.category || "")
            .toLowerCase()
            .includes(search.toLowerCase())) &&
        (!categoryId || String(food.categoryId) === categoryId)
    );
  }
}