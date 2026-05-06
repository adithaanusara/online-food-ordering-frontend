import { useEffect, useMemo, useState } from "react";
import { useCart } from "../../context/CartContext";
import { getFoods } from "../../services/foodService";
import { FoodItem } from "../../types";

export default function FoodsPage() {
  const { addToCart, isInCart } = useCart();

  const [foods, setFoods] = useState<FoodItem[]>([]);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchText, setSearchText] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let active = true;

    async function loadFoods() {
      try {
        setLoading(true);
        setError("");

        const data = await getFoods();

        if (active) {
          setFoods(data);
        }
      } catch {
        if (active) {
          setError("Unable to load foods from backend.");
        }
      } finally {
        if (active) {
          setLoading(false);
        }
      }
    }

    loadFoods();

    return () => {
      active = false;
    };
  }, []);

  const categories = useMemo(() => {
    const names = foods
      .map((food) => String(food.category || "Food"))
      .filter(Boolean);

    return ["All", ...Array.from(new Set(names))];
  }, [foods]);

const filteredFoods = useMemo(() => {
  const keyword = searchText.trim().toLowerCase();

  return foods.filter((food) => {
    const foodName = String(food.name || "").toLowerCase();
    const foodCategory = String(food.category || "").toLowerCase();
    const foodDescription = String(food.description || "").toLowerCase();

    const categoryMatch =
      selectedCategory === "All" ||
      foodCategory === selectedCategory.toLowerCase();

    const searchMatch =
      keyword === "" ||
      foodName.includes(keyword) ||
      foodCategory.includes(keyword) ||
      foodDescription.includes(keyword);

    return categoryMatch && searchMatch;
  });
}, [foods, selectedCategory, searchText]);

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

      {loading && <section className="foods-grid">Loading foods...</section>}

      {error && !loading && <section className="foods-grid">{error}</section>}

      {!loading && !error && (
        <section className="foods-grid">
          {filteredFoods.map((food) => {
            const foodId = String(food.id);
            const added = isInCart(foodId);
            const image = food.image || food.imageUrl || "";
            const category = String(food.category || "Food");

            return (
              <article className="food-card" key={foodId}>
                <div className="food-card-image">
                  <img src={image} alt={food.name} />
                  <span>{category}</span>
                </div>

                <div className="food-card-body">
                  <h3>{food.name}</h3>
                  <p>{food.description}</p>

                  <div className="food-card-bottom">
                    <strong>LKR {food.price.toLocaleString()}</strong>

                    <button
                      type="button"
                      className={added ? "add-cart-btn added" : "add-cart-btn"}
                      disabled={food.available === false}
                      onClick={() =>
                        addToCart({
                          id: foodId,
                          name: food.name,
                          price: food.price,
                          image,
                          category,
                          description: food.description,
                        })
                      }
                    >
                      {food.available === false
                        ? "Out of Stock"
                        : added
                        ? "Add More +"
                        : "Add to Cart"}
                    </button>
                  </div>
                </div>
              </article>
            );
          })}
        </section>
      )}
    </main>
  );
}