export interface Food {
  id: number;
  name: string;
  category: string;
  price: number;
  image: string;
  description: string;
}

export const foods: Food[] = [
  {
    id: 1,
    name: "Chicken Fried Rice",
    category: "Rice",
    price: 1200,
    image:
      "https://images.unsplash.com/photo-1603133872878-684f208fb84b?w=600",
    description: "Delicious chicken fried rice with vegetables.",
  },
  {
    id: 2,
    name: "Cheese Burger",
    category: "Burger",
    price: 950,
    image:
      "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=600",
    description: "Juicy cheese burger with fresh salad.",
  },
  {
    id: 3,
    name: "Chicken Pizza",
    category: "Pizza",
    price: 1800,
    image:
      "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=600",
    description: "Hot chicken pizza with extra cheese.",
  },
  {
    id: 4,
    name: "Kottu",
    category: "Sri Lankan",
    price: 1000,
    image:
      "https://images.unsplash.com/photo-1604908176997-125f25cc6f3d?w=600",
    description: "Spicy Sri Lankan chicken kottu.",
  },
  {
    id: 5,
    name: "Fresh Orange Juice",
    category: "Drinks",
    price: 450,
    image:
      "https://images.unsplash.com/photo-1621506289937-a8e4df240d0b?w=600",
    description: "Freshly made orange juice.",
  },
  {
    id: 6,
    name: "Chocolate Cake",
    category: "Dessert",
    price: 650,
    image:
      "https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=600",
    description: "Soft chocolate cake slice.",
  },
];