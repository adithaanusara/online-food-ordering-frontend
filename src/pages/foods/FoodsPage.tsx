import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { useCart } from "../../context/CartContext";
import { getFoods } from "../../services/foodService";

type FoodItemView = {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  imageUrl?: string;
  category: string;
  available?: boolean;
};

type CategoryTheme = {
  mini: string;
  title: string;
  subtitle: string;
  bgImage: string;
  badge1: string;
  badge2: string;
  badge3: string;
};

const categoryThemes: Record<string, CategoryTheme> = {
  Pizza: {
    mini: "FOODEXPRESS PIZZA MENU",
    title: "Cheesy Pizza Moments",
    subtitle:
      "Hot, cheesy and premium pizzas made fresh for your cravings with crispy crusts and rich toppings.",
    bgImage:
      "https://images.unsplash.com/photo-1513104890138-7c749659a591?w=1600&auto=format&fit=crop",
    badge1: "Cheesy",
    badge2: "Oven Fresh",
    badge3: "Best Seller",
  },
  Burger: {
    mini: "FOODEXPRESS BURGER MENU",
    title: "Juicy Burger Experience",
    subtitle:
      "Fresh grilled burgers with cheese, crispy fries and special sauces for a premium bite.",
    bgImage:
      "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=1600&auto=format&fit=crop",
    badge1: "Juicy",
    badge2: "Grilled",
    badge3: "Combo",
  },
  Coffee: {
    mini: "FOODEXPRESS COFFEE BAR",
    title: "Relax With Premium Coffee",
    subtitle:
      "Enjoy espresso, cappuccino and smooth coffee drinks with a warm café style experience.",
    bgImage:
      "https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=1600&auto=format&fit=crop",
    badge1: "Fresh Brew",
    badge2: "Aroma",
    badge3: "Cafe Mood",
  },
  Koththu: {
    mini: "FOODEXPRESS KOTHTHU CORNER",
    title: "Hot Spicy Koththu Time",
    subtitle:
      "Freshly chopped koththu with chicken, egg, vegetables and signature spicy sauces.",
    bgImage:
      "https://images.unsplash.com/photo-1544025162-d76694265947?w=1600&auto=format&fit=crop",
    badge1: "Spicy",
    badge2: "Hot Plate",
    badge3: "Local Taste",
  },
  "Rice & Koththu": {
    mini: "FOODEXPRESS RICE MENU",
    title: "Sri Lankan Rice Specials",
    subtitle:
      "Enjoy rice and koththu meals with spicy Sri Lankan taste, fresh ingredients and rich flavor.",
    bgImage:
      "https://images.unsplash.com/photo-1603133872878-684f208fb84b?w=1600&auto=format&fit=crop",
    badge1: "Spicy",
    badge2: "Local",
    badge3: "Fresh",
  },
  Pasta: {
    mini: "FOODEXPRESS PASTA MENU",
    title: "Creamy Pasta Bowls",
    subtitle:
      "Premium pasta dishes with creamy sauces, rich cheese and delicious Italian style flavor.",
    bgImage:
      "https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9?w=1600&auto=format&fit=crop",
    badge1: "Creamy",
    badge2: "Italian",
    badge3: "Premium",
  },
  Dessert: {
    mini: "FOODEXPRESS DESSERT STUDIO",
    title: "Sweet Dessert Moments",
    subtitle:
      "Creamy cakes, sweet treats and premium desserts to complete your meal perfectly.",
    bgImage:
      "https://images.unsplash.com/photo-1563729784474-d77dbb933a9e?w=1600&auto=format&fit=crop",
    badge1: "Sweet",
    badge2: "Creamy",
    badge3: "Treat",
  },
  Chicken: {
    mini: "FOODEXPRESS CHICKEN MENU",
    title: "Crispy Chicken Favorites",
    subtitle:
      "Hot crispy chicken meals with fresh sauces, fries and premium FoodExpress flavor.",
    bgImage:
      "https://images.unsplash.com/photo-1598515214211-89d3c73ae83b?w=1600&auto=format&fit=crop",
    badge1: "Crispy",
    badge2: "Hot",
    badge3: "Fresh",
  },
  All: {
    mini: "FOODEXPRESS MENU",
    title: "Browse Premium Foods",
    subtitle:
      "Choose your favorite food items and add them to your cart. Your cart count will update instantly.",
    bgImage:
      "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=1600&auto=format&fit=crop",
    badge1: "Fresh",
    badge2: "Premium",
    badge3: "Fast",
  },
};

function getTheme(category: string) {
  return categoryThemes[category] || categoryThemes.All;
}

export default function FoodsPage() {
  const { addToCart, isInCart } = useCart();
  const [searchParams, setSearchParams] = useSearchParams();

  const categoryFromUrl = searchParams.get("category") || "All";
  const searchFromUrl = searchParams.get("search") || "";

  const [foods, setFoods] = useState<FoodItemView[]>([]);
  const [selectedCategory, setSelectedCategory] = useState(categoryFromUrl);
  const [searchText, setSearchText] = useState(searchFromUrl);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setSelectedCategory(categoryFromUrl);
    setSearchText(searchFromUrl);
  }, [categoryFromUrl, searchFromUrl]);

  useEffect(() => {
    let active = true;

    async function loadFoods() {
      try {
        setLoading(true);

        const data = await getFoods();

        const mappedFoods: FoodItemView[] = data.map((food: any) => {
          const category =
            typeof food.category === "string"
              ? food.category
              : food.category?.name || "Food";

          const image = food.image || food.imageUrl || "";

          return {
            id: String(food.id),
            name: food.name,
            description: food.description,
            price: Number(food.price || 0),
            image,
            imageUrl: image,
            category,
            available: food.available !== false,
          };
        });

        if (active) {
          setFoods(mappedFoods);
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
    const backendCategories = foods.map((food) => food.category).filter(Boolean);

    return [
      "All",
      ...Array.from(
        new Set([
          ...backendCategories,
          "Pizza",
          "Burger",
          "Coffee",
          "Koththu",
          "Rice & Koththu",
          "Pasta",
          "Dessert",
          "Chicken",
        ])
      ),
    ];
  }, [foods]);

  const activeTheme = getTheme(selectedCategory);

  const filteredFoods = useMemo(() => {
    return foods.filter((food) => {
      const categoryMatch =
        selectedCategory === "All" || food.category === selectedCategory;

      const searchMatch =
        !searchText.trim() ||
        food.name.toLowerCase().includes(searchText.toLowerCase()) ||
        food.description.toLowerCase().includes(searchText.toLowerCase()) ||
        food.category.toLowerCase().includes(searchText.toLowerCase());

      return categoryMatch && searchMatch;
    });
  }, [foods, selectedCategory, searchText]);

  function updateCategory(category: string) {
    setSelectedCategory(category);

    const params = new URLSearchParams();

    if (searchText.trim()) {
      params.set("search", searchText.trim());
    }

    if (category !== "All") {
      params.set("category", category);
    }

    setSearchParams(params);
  }

  function updateSearch(value: string) {
    setSearchText(value);

    const params = new URLSearchParams();

    if (value.trim()) {
      params.set("search", value.trim());
    }

    if (selectedCategory !== "All") {
      params.set("category", selectedCategory);
    }

    setSearchParams(params);
  }

  return (
    <main className="foods-page">
      <section
        key={selectedCategory}
        className="foods-dynamic-hero"
        style={
          {
            "--foods-bg": `url(${activeTheme.bgImage})`,
          } as React.CSSProperties
        }
      >
        <div className="foods-dynamic-overlay"></div>

        <div className="foods-dynamic-content">
          <span className="foods-mini-title">{activeTheme.mini}</span>

          <h1>{activeTheme.title}</h1>

          <p>{activeTheme.subtitle}</p>

          <div className="foods-dynamic-badges">
            <span>{activeTheme.badge1}</span>
            <span>{activeTheme.badge2}</span>
            <span>{activeTheme.badge3}</span>
          </div>

          <div className="foods-filter-bar">
            <input
              type="text"
              placeholder={`Search ${selectedCategory === "All" ? "foods" : selectedCategory.toLowerCase()}...`}
              value={searchText}
              onChange={(e) => updateSearch(e.target.value)}
            />

            <select
              value={selectedCategory}
              onChange={(e) => updateCategory(e.target.value)}
            >
              {categories.map((category) => (
                <option key={category}>{category}</option>
              ))}
            </select>
          </div>
        </div>
      </section>

      <section className="foods-result-head">
        <div>
          <span>{selectedCategory} Collection</span>
          <h2>
            {selectedCategory === "All"
              ? "All Premium Foods"
              : `Premium ${selectedCategory} Items`}
          </h2>
        </div>

        <p>{filteredFoods.length} items found</p>
      </section>

      {loading ? (
        <section className="foods-grid">Loading foods...</section>
      ) : (
        <section className="foods-grid">
          {filteredFoods.length === 0 ? (
            <div className="foods-empty-message">
              No food items found for this category.
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
                        disabled={food.available === false}
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
            })
          )}
        </section>
      )}
    </main>
  );
}