import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import FoodLoopCarousel from "../../components/customer/FoodLoopCarousel";

export default function CustomerDashboardPage() {
  const navigate = useNavigate();

  const customerName = "aditha anusara";

  const [searchText, setSearchText] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");

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

  const categories = [
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
      name: "Shakes",
      count: "10 Food Items",
      image:
        "https://images.unsplash.com/photo-1572490122747-3968b75cc699?w=700&auto=format&fit=crop",
    },
    {
      name: "Sandwiches",
      count: "9 Food Items",
      image:
        "https://images.unsplash.com/photo-1528735602780-2552fd46c7af?w=700&auto=format&fit=crop",
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
  ];

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
        <section className="food-template-hero">
          <div className="hero-dark-overlay"></div>

          <div className="hero-content">
            <span className="hero-mini-label">Premium Food Ordering</span>

            <h1>
              Order Healthy and Fresh <br />
              Food Any Time
            </h1>

            <p>
              Welcome, <strong>{customerName}</strong>. Browse delicious foods,
              add items to your cart and track your orders with a premium
              FoodExpress experience.
            </p>

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
                  onChange={(e) => setSelectedCategory(e.target.value)}
                >
                  <option value="">Select Category</option>
                  <option value="Pizza">Pizza</option>
                  <option value="Burger">Burger</option>
                  <option value="Koththu">Koththu</option>
                  <option value="Pasta">Pasta</option>
                  <option value="Dessert">Dessert</option>
                  <option value="Coffee">Coffee</option>
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

            <div className="video-floating-chip chip-one">Fresh</div>
            <div className="video-floating-chip chip-two">Premium</div>
            <div className="video-floating-chip chip-three">Hot</div>
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