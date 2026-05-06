import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
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

const categories = [
  "All",
  "Pizza",
  "Burger",
  "Coffee",
  "Koththu",
  "Pasta",
  "Dessert",
];

export default function FoodsPage() {
  const { addToCart, isInCart } = useCart();
  const [searchParams] = useSearchParams();

  const [selectedCategory, setSelectedCategory] = useState(
    searchParams.get("category") || "All"
  );

  const [searchText, setSearchText] = useState(
    searchParams.get("search") || ""
  );

  useEffect(() => {
    setSelectedCategory(searchParams.get("category") || "All");
    setSearchText(searchParams.get("search") || "");
  }, [searchParams]);

  const filteredFoods = useMemo(() => {
    const keyword = searchText.trim().toLowerCase();
    const selected = selectedCategory.trim().toLowerCase();

    return foods.filter((food) => {
      const foodName = food.name.toLowerCase();
      const foodCategory = food.category.toLowerCase();
      const foodDescription = food.description.toLowerCase();

      const categoryMatch =
        selected === "all" || selected === "" || foodCategory === selected;

      const searchMatch =
        keyword === "" ||
        foodName.includes(keyword) ||
        foodCategory.includes(keyword) ||
        foodDescription.includes(keyword);

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
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>
      </section>

      <section className="foods-grid">
        {filteredFoods.length === 0 ? (
          <div className="no-food-results">
            <h2>No foods found</h2>
            <p>Try another keyword or category.</p>
          </div>
        ) : (
          filteredFoods.map((food) => {
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
          })
        )}
      </section>
    </main>
  );
}