import { useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import FoodLoopCarousel from "../../components/customer/FoodLoopCarousel";

type DashboardCategory =
  | "Pizza"
  | "Burger"
  | "Coffee"
  | "Koththu"
  | "Pasta"
  | "Dessert"
  | "Chicken"
  | "Shakes"
  | "Sandwiches"
  | "Broast";

type DashboardTheme = {
  mini: string;
  title: string;
  description: string;
  badgeOne: string;
  badgeTwo: string;
  badgeThree: string;
  bgImage: string;
};

const dashboardThemes: Record<DashboardCategory, DashboardTheme> = {
  Pizza: {
    mini: "Premium Pizza Ordering",
    title: "Hot Cheesy Pizza Any Time",
    description:
      "Explore cheesy pizzas, crispy crusts and premium toppings made fresh for your cravings.",
    badgeOne: "Cheesy",
    badgeTwo: "Oven Fresh",
    badgeThree: "Best Seller",
    bgImage:
      "https://images.unsplash.com/photo-1513104890138-7c749659a591?w=1600&auto=format&fit=crop",
  },
  Burger: {
    mini: "Premium Burger Ordering",
    title: "Juicy Burgers Made Fresh",
    description:
      "Order grilled burgers with melted cheese, crispy fries and special FoodExpress sauces.",
    badgeOne: "Juicy",
    badgeTwo: "Grilled",
    badgeThree: "Combo",
    bgImage:
      "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=1600&auto=format&fit=crop",
  },
  Coffee: {
    mini: "Premium Coffee Bar",
    title: "Relax With Fresh Coffee",
    description:
      "Enjoy cappuccino, espresso and creamy coffee drinks with a warm café experience.",
    badgeOne: "Fresh Brew",
    badgeTwo: "Aroma",
    badgeThree: "Cafe Mood",
    bgImage:
      "https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=1600&auto=format&fit=crop",
  },
  Koththu: {
    mini: "Sri Lankan Koththu Corner",
    title: "Hot Spicy Koththu Time",
    description:
      "Taste spicy koththu mixed with chicken, egg, vegetables and signature sauces.",
    badgeOne: "Spicy",
    badgeTwo: "Hot Plate",
    badgeThree: "Local Taste",
    bgImage:
      "https://images.unsplash.com/photo-1544025162-d76694265947?w=1600&auto=format&fit=crop",
  },
  Pasta: {
    mini: "Premium Pasta Ordering",
    title: "Creamy Pasta Bowls",
    description:
      "Enjoy creamy, cheesy and spicy pasta dishes prepared with premium ingredients.",
    badgeOne: "Creamy",
    badgeTwo: "Italian",
    badgeThree: "Premium",
    bgImage:
      "https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9?w=1600&auto=format&fit=crop",
  },
  Dessert: {
    mini: "Sweet Dessert Studio",
    title: "Delightful Sweet Moments",
    description:
      "Order cakes, ice cream and sweet desserts to complete your meal perfectly.",
    badgeOne: "Sweet",
    badgeTwo: "Creamy",
    badgeThree: "Treat",
    bgImage:
      "https://images.unsplash.com/photo-1563729784474-d77dbb933a9e?w=1600&auto=format&fit=crop",
  },
  Chicken: {
    mini: "Premium Chicken Meals",
    title: "Crispy Chicken Favorites",
    description:
      "Enjoy crispy chicken, grilled chicken and delicious chicken meals made fresh.",
    badgeOne: "Crispy",
    badgeTwo: "Hot",
    badgeThree: "Fresh",
    bgImage:
      "https://images.unsplash.com/photo-1598515214211-89d3c73ae83b?w=1600&auto=format&fit=crop",
  },
  Shakes: {
    mini: "Fresh Shake Bar",
    title: "Creamy Shakes Anytime",
    description:
      "Enjoy cold milkshakes with chocolate, vanilla and fruity premium flavors.",
    badgeOne: "Cold",
    badgeTwo: "Creamy",
    badgeThree: "Fresh",
    bgImage:
      "https://images.unsplash.com/photo-1572490122747-3968b75cc699?w=1600&auto=format&fit=crop",
  },
  Sandwiches: {
    mini: "Fresh Sandwich Corner",
    title: "Fresh Sandwich Bites",
    description:
      "Order tasty sandwiches packed with fresh vegetables, sauces and premium fillings.",
    badgeOne: "Fresh",
    badgeTwo: "Quick",
    badgeThree: "Healthy",
    bgImage:
      "https://images.unsplash.com/photo-1528735602780-2552fd46c7af?w=1600&auto=format&fit=crop",
  },
  Broast: {
    mini: "Crispy Broast Meals",
    title: "Golden Broast Chicken",
    description:
      "Enjoy crispy golden broast meals with sauces, fries and premium taste.",
    badgeOne: "Crispy",
    badgeTwo: "Golden",
    badgeThree: "Hot",
    bgImage:
      "https://images.unsplash.com/photo-1626645738196-c2a7c87a8f58?w=1600&auto=format&fit=crop",
  },
};

export default function CustomerDashboardPage() {
  const navigate = useNavigate();

  const customerName = "aditha anusara";

  const [searchText, setSearchText] = useState("");
  const [selectedCategory, setSelectedCategory] =
    useState<DashboardCategory>("Pizza");

  const activeTheme = dashboardThemes[selectedCategory];

  function handleFoodSearch(e: React.FormEvent) {
    e.preventDefault();

    const params = new URLSearchParams();

    if (searchText.trim()) {
      params.set("search", searchText.trim());
    }

    if (selectedCategory.trim()) {
      params.set("category", selectedCategory.trim());
    }

    const query = params.toString();

    navigate(query ? `/foods?${query}` : "/foods");
  }

  const categories = useMemo(
    () => [
      {
        name: "Pizza",
        count: "14 Food Items",
        image:
          "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=700&auto=format&fit=crop",
      },
      {
        name: "Broast",
        count: "8 Food Items",
        image:
          "https://images.unsplash.com/photo-1626645738196-c2a7c87a8f58?w=700&auto=format&fit=crop",
      },
      {
        name: "Chicken",
        count: "12 Food Items",
        image:
          "https://images.unsplash.com/photo-1598515214211-89d3c73ae83b?w=700&auto=format&fit=crop",
      },
      {
        name: "Burger",
        count: "19 Food Items",
        image:
          "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=700&auto=format&fit=crop",
      },
      {
        name: "Coffee",
        count: "9 Food Items",
        image:
          "https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=700&auto=format&fit=crop",
      },
      {
        name: "Koththu",
        count: "11 Food Items",
        image:
          "https://images.unsplash.com/photo-1544025162-d76694265947?w=700&auto=format&fit=crop",
      },
      {
        name: "Pasta",
        count: "16 Food Items",
        image:
          "https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9?w=700&auto=format&fit=crop",
      },
      {
        name: "Dessert",
        count: "15 Food Items",
        image:
          "https://images.unsplash.com/photo-1563729784474-d77dbb933a9e?w=700&auto=format&fit=crop",
      },
    ],
    []
  );

  const featuredFoods = [
    {
      name: "Golden Cheese Burger",
      type: "Burger",
      price: "LKR 1,450",
      image:
        "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=900&auto=format&fit=crop",
    },
    {
      name: "Italian Chicken Pizza",
      type: "Pizza",
      price: "LKR 2,200",
      image:
        "https://images.unsplash.com/photo-1513104890138-7c749659a591?w=900&auto=format&fit=crop",
    },
    {
      name: "Creamy Pasta Bowl",
      type: "Pasta",
      price: "LKR 1,750",
      image:
        "https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9?w=900&auto=format&fit=crop",
    },
  ];

  const floatingFoods = [
    {
      id: 1,
      name: "Pizza",
      className: "orbit-food orbit-food--pizza",
      image:
        "https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=600&q=80",
    },
    {
      id: 2,
      name: "Rice & Koththu",
      className: "orbit-food orbit-food--koththu",
      image:
        "https://images.unsplash.com/photo-1512058564366-18510be2db19?auto=format&fit=crop&w=600&q=80",
    },
    {
      id: 3,
      name: "Hot Pasta",
      className: "orbit-food orbit-food--pasta",
      image:
        "https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9?auto=format&fit=crop&w=600&q=80",
    },
  ];

  return (
    <div className="food-template-dashboard">
      <div className="food-template-bg-glow glow-one"></div>
      <div className="food-template-bg-glow glow-two"></div>

      <div className="food-template-container">
        <section
          key={selectedCategory}
          className="food-template-hero dynamic-category-hero"
          style={
            {
              "--category-bg": `url(${activeTheme.bgImage})`,
            } as React.CSSProperties
          }
        >
          <div className="hero-dark-overlay"></div>

          <div className="category-hero-bg"></div>

          <div className="hero-content">
            <span className="hero-mini-label">{activeTheme.mini}</span>

            <h1>
              {activeTheme.title.split(" ").slice(0, 3).join(" ")}
              <br />
              {activeTheme.title.split(" ").slice(3).join(" ")}
            </h1>

            <p>
              Welcome, <strong>{customerName}</strong>.{" "}
              {activeTheme.description}
            </p>

            <div className="dynamic-hero-badges">
              <span>{activeTheme.badgeOne}</span>
              <span>{activeTheme.badgeTwo}</span>
              <span>{activeTheme.badgeThree}</span>
            </div>

            <form className="hero-search-box" onSubmit={handleFoodSearch}>
              <div className="search-field">
                <label>Keyword</label>

                <input
                  type="text"
                  placeholder="What are you looking for?"
                  value={searchText}
                  onChange={(e) => setSearchText(e.target.value)}
                />
              </div>

              <div className="search-field">
                <label>Category</label>

                <select
                  value={selectedCategory}
                  onChange={(e) =>
                    setSelectedCategory(e.target.value as DashboardCategory)
                  }
                >
                  <option value="Pizza">Pizza</option>
                  <option value="Burger">Burger</option>
                  <option value="Coffee">Coffee</option>
                  <option value="Koththu">Koththu</option>
                  <option value="Pasta">Pasta</option>
                  <option value="Dessert">Dessert</option>
                  <option value="Chicken">Chicken</option>
                  <option value="Shakes">Shakes</option>
                  <option value="Sandwiches">Sandwiches</option>
                  <option value="Broast">Broast</option>
                </select>
              </div>

              <button type="submit" className="hero-search-btn">
                Search
              </button>
            </form>
          </div>

          <div className="hero-video-showcase">
            <FoodLoopCarousel />

            <div className="video-dark-gradient"></div>
            <div className="video-gold-glow"></div>

            <div className="video-floating-chip chip-one">
              {activeTheme.badgeOne}
            </div>
            <div className="video-floating-chip chip-two">
              {activeTheme.badgeTwo}
            </div>
            <div className="video-floating-chip chip-three">
              {activeTheme.badgeThree}
            </div>
          </div>

          <div className="hero-orbit-foods">
            {floatingFoods.map((food) => (
              <div key={food.id} className={food.className}>
                <div className="orbit-food__ring"></div>

                <div className="orbit-food__image-wrap">
                  <img
                    src={food.image}
                    alt={food.name}
                    className="orbit-food__image"
                  />
                </div>

                <div className="orbit-food__label">{food.name}</div>
              </div>
            ))}
          </div>
        </section>

        <section className="dashboard-quick-cards">
          <Link to="/foods" className="quick-card">
            <span>🍽</span>
            <h3>Browse Foods</h3>
            <p>View available food items and categories.</p>
          </Link>

          <Link to="/cart" className="quick-card">
            <span>🛒</span>
            <h3>My Cart</h3>
            <p>Check selected food items before checkout.</p>
          </Link>

          <Link to="/orders" className="quick-card">
            <span>📦</span>
            <h3>My Orders</h3>
            <p>Track your order status and history.</p>
          </Link>
        </section>

        <section className="food-template-section">
          <div className="section-heading">
            <span>Top Foods</span>
            <h2>Our Categories</h2>
            <div className="heading-line"></div>
          </div>

          <div className="category-grid">
            {categories.map((category) => (
              <Link
                to={`/foods?category=${encodeURIComponent(category.name)}`}
                className="category-card"
                key={category.name}
              >
                <div className="category-img-wrap">
                  <img src={category.image} alt={category.name} />
                </div>

                <h3>{category.name}</h3>
                <p>{category.count}</p>
              </Link>
            ))}
          </div>
        </section>

        <section className="food-template-section featured-section">
          <div className="section-heading">
            <span>Top Picks</span>
            <h2>Most Featured Foods</h2>
            <div className="heading-line"></div>
          </div>

          <div className="featured-food-grid">
            {featuredFoods.map((food) => (
              <Link
                to={`/foods?category=${encodeURIComponent(food.type)}`}
                className="featured-food-card"
                key={food.name}
              >
                <div className="featured-img">
                  <img src={food.image} alt={food.name} />
                  <span>{food.type}</span>
                </div>

                <div className="featured-info">
                  <h3>{food.name}</h3>
                  <p>Freshly prepared with premium ingredients.</p>

                  <div className="featured-bottom">
                    <strong>{food.price}</strong>
                    <span>Order Now →</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}