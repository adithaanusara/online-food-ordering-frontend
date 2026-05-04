import { useMemo, useState } from "react";
import { useCart } from "../../context/CartContext";

type Food = {
  id: string;
  name: string;
  category: string;
  price: number;
  description: string;
  image: string;
};

const foods: Food[] = [
  {
    id: "food-1",
    name: "Chicken Pizza",
    category: "Pizza",
    price: 2200,
    description: "Hot pizza with extra cheese and chicken toppings.",
    image:
      "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=800&auto=format&fit=crop",
  },
  {
    id: "food-2",
    name: "Cheese Burger",
    category: "Burger",
    price: 1450,
    description: "Fresh burger with cheese, sauce, and crispy fries.",
    image:
      "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=800&auto=format&fit=crop",
  },
  {
    id: "food-3",
    name: "Hot Coffee",
    category: "Coffee",
    price: 650,
    description: "Freshly brewed coffee with rich aroma and smooth taste.",
    image:
      "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=800&auto=format&fit=crop",
  },
  {
    id: "food-4",
    name: "Chicken Rice & Koththu",
    category: "Koththu",
    price: 1800,
    description: "Spicy rice and koththu mixed with chicken and sauces.",
    image:
      "https://images.unsplash.com/photo-1512058564366-18510be2db19?w=800&auto=format&fit=crop",
  },
  {
    id: "food-5",
    name: "Creamy Pasta",
    category: "Pasta",
    price: 1750,
    description: "Creamy pasta with fresh herbs and premium ingredients.",
    image:
      "https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9?w=800&auto=format&fit=crop",
  },
  {
    id: "food-6",
    name: "Chocolate Dessert",
    category: "Dessert",
    price: 950,
    description: "Sweet chocolate dessert for your premium food experience.",
    image:
      "https://images.unsplash.com/photo-1563729784474-d77dbb933a9e?w=800&auto=format&fit=crop",
  },
];

const categories = ["All", "Pizza", "Burger", "Coffee", "Koththu", "Pasta", "Dessert"];

export default function FoodsPage() {
  const { addToCart, isInCart } = useCart();
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchText, setSearchText] = useState("");

  const filteredFoods = useMemo(() => {
    return foods.filter((food) => {
      const categoryMatch =
        selectedCategory === "All" || food.category === selectedCategory;

      const searchMatch =
        food.name.toLowerCase().includes(searchText.toLowerCase()) ||
        food.category.toLowerCase().includes(searchText.toLowerCase());

      return categoryMatch && searchMatch;
    });
  }, [selectedCategory, searchText]);

  return (
    <main className="foods-page">
      <section className="foods-hero">
        <span className="foods-mini-title">FoodExpress Menu</span>
        <h1>Browse Premium Foods</h1>
        <p>
          Choose your favorite food items and add them to your cart. Your cart
          count will update instantly.
        </p>

        <div className="foods-filter-bar">
          <input
            type="text"
            placeholder="Search foods..."
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
          />

          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
          >
            {categories.map((category) => (
              <option key={category}>{category}</option>
            ))}
          </select>
        </div>
      </section>

      <section className="foods-grid">
        {filteredFoods.map((food) => {
          const added = isInCart(food.id);

          return (
            <article className="food-card" key={food.id}>
              <div className="food-card-image">
                <img src={food.image} alt={food.name} />
                <span>{food.category}</span>
              </div>

              <div className="food-card-body">
                <h3>{food.name}</h3>
                <p>{food.description}</p>

                <div className="food-card-bottom">
                  <strong>LKR {food.price.toLocaleString()}</strong>

                  <button
                    type="button"
                    className={added ? "add-cart-btn added" : "add-cart-btn"}
                    onClick={() =>
                      addToCart({
                        id: food.id,
                        name: food.name,
                        price: food.price,
                        image: food.image,
                        category: food.category,
                        description: food.description,
                      })
                    }
                  >
                    {added ? "Add More +" : "Add to Cart"}
                  </button>
                </div>
              </div>
            </article>
          );
        })}
      </section>
    </main>
  );
}