import { MouseEvent, useEffect } from "react";
import { Link } from "react-router-dom";

export default function HomePage() {
  useEffect(() => {
    const sections = document.querySelectorAll<HTMLElement>(".steak-section");

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const section = entry.target as HTMLElement;

          if (entry.isIntersecting) {
            section.classList.add("section-visible");

            if (section.id === "menu" || section.id === "more-menu") {
              section.classList.remove("menu-replay");
              void section.offsetWidth;
              section.classList.add("menu-replay");
            }
          }
        });
      },
      {
        threshold: 0.45,
      }
    );

    sections.forEach((section) => observer.observe(section));

    return () => observer.disconnect();
  }, []);

  const smoothScrollTo = (targetPosition: number, duration: number) => {
    const startPosition = window.scrollY;
    const distance = targetPosition - startPosition;
    let startTime: number | null = null;

    const easeInOutCubic = (time: number) => {
      return time < 0.5
        ? 4 * time * time * time
        : 1 - Math.pow(-2 * time + 2, 3) / 2;
    };

    const animation = (currentTime: number) => {
      if (startTime === null) {
        startTime = currentTime;
      }

      const elapsedTime = currentTime - startTime;
      const progress = Math.min(elapsedTime / duration, 1);
      const easedProgress = easeInOutCubic(progress);

      window.scrollTo(0, startPosition + distance * easedProgress);

      if (elapsedTime < duration) {
        requestAnimationFrame(animation);
      }
    };

    requestAnimationFrame(animation);
  };

  const scrollToNextSection = (event: MouseEvent<HTMLDivElement>) => {
    const target = event.target as HTMLElement;

    const clickedInteractiveElement = target.closest(
      "a, button, input, select, textarea"
    );

    if (clickedInteractiveElement) {
      return;
    }

    const sections = Array.from(
      document.querySelectorAll<HTMLElement>(".steak-section")
    );

    const currentScroll = window.scrollY;

    const currentSection =
      [...sections]
        .reverse()
        .find((section) => section.offsetTop <= currentScroll + 120) ||
      sections[0];

    const nextSection = sections.find(
      (section) => section.offsetTop > currentScroll + 120
    );

    if (!nextSection || !currentSection) {
      return;
    }

    currentSection.classList.add("section-exit-spin");

    nextSection.classList.remove("section-visible");
    nextSection.classList.remove("menu-replay");

    nextSection.classList.add("section-visible");

    if (nextSection.id === "menu" || nextSection.id === "more-menu") {
      void nextSection.offsetWidth;
      nextSection.classList.add("menu-replay");
    }

    smoothScrollTo(nextSection.offsetTop, 1700);

    setTimeout(() => {
      currentSection.classList.remove("section-exit-spin");
    }, 1900);
  };

  return (
    <div onClick={scrollToNextSection} className="steak-home">
      {/* Navigation */}
      <header className="steak-navbar">
        <Link to="/" className="steak-logo">
          FoodExpress
        </Link>

        <nav className="steak-nav-links">
          <a href="#home">Home</a>
          <a href="#story">About</a>
          <a href="#menu">Menu</a>
          <a href="#roles">Roles</a>
          <Link to="/signin">Sign In</Link>
          <Link to="/signup" className="nav-reserve-btn">
            Get Started
          </Link>
        </nav>
      </header>

      {/* Section 1 - Hero */}
      <section id="home" className="steak-section hero-section">
        <div className="hero-text reveal-left">
          <p className="small-script">Welcome to</p>
          <h1>
            A Premium <br />
            Online Food <br />
            Ordering System
          </h1>
          <p className="hero-description">
            Browse delicious foods, add items to your cart, place orders, and
            track deliveries through a modern role-based food ordering system.
          </p>

          <div className="hero-actions">
            <Link to="/signup" className="outline-btn">
              Create Account
            </Link>
            <Link to="/signin" className="text-btn">
              Sign In
            </Link>
          </div>
        </div>

        <div className="hero-food-area reveal-right">
          <div className="spice spice-one"></div>
          <div className="spice spice-two"></div>

          <img
            className="main-pan rotate-slow"
            src="https://images.unsplash.com/photo-1544025162-d76694265947?w=900"
            alt="Premium food"
          />

          <img
            className="ingredient tomato-one float-soft"
            src="https://images.unsplash.com/photo-1592924357228-91a4daadcfea?w=300"
            alt="Tomato"
          />

          <img
            className="ingredient herb-one float-soft-delay"
            src="https://images.unsplash.com/photo-1628557044797-f21a177c37ec?w=300"
            alt="Herbs"
          />

          <div className="scroll-hint">
            <span></span>
          </div>
        </div>
      </section>

      {/* Section 2 - Story */}
      <section id="story" className="steak-section split-section">
        <div className="image-stack reveal-left">
          <div className="powder powder-one"></div>
          <img
            src="https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=900"
            alt="Cooking"
          />
        </div>

        <div className="white-story-card reveal-right">
          <p className="small-script dark-script">Discover</p>
          <h2>Our Story</h2>
          <p>
            FoodExpress is designed as a frontend online food ordering system.
            Customers can explore food items, manage cart items, checkout, and
            track their orders.
          </p>
          <Link to="/signup" className="story-link">
            More About Us —
          </Link>
        </div>
      </section>

      {/* Section 3 - Menu */}
      <section id="menu" className="steak-section menu-section">
        <div className="menu-title reveal-left">
          <p className="small-script">Discover</p>
          <h2>Our Menu</h2>
        </div>

        

        <div className="menu-plate plate-one reveal-scale">
          <img
            className="menu-rotate-image"
            src="https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=700"
            alt="Pizza"
          />
          <div>
            <p className="small-script">Pizza</p>
            <h3>Chicken Pizza</h3>
            <p>Hot pizza with extra cheese and chicken toppings.</p>
          </div>
        </div>

        <div className="menu-plate plate-two reveal-scale-delay">
          <img
            className="menu-rotate-image"
            src="https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=700"
            alt="Burger"
          />
          <div>
            <p className="small-script">Burger</p>
            <h3>Cheese Burger</h3>
            <p>Fresh burger with cheese, sauce, and crispy fries.</p>
          </div>
        </div>
      </section>

      {/* Section 4 - More Menu */}
      <section id="more-menu" className="steak-section menu-section">
        <div className="menu-title reveal-left">
          <p className="small-script">Discover</p>
          <h2>More Menu...</h2>
        </div>

        

        <div className="menu-plate plate-one reveal-scale">
          <img
            className="menu-rotate-image"
            src="https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=700"
            alt="Coffee"
          />
          <div>
            <p className="small-script">Coffee</p>
            <h3>Hot Coffee</h3>
            <p>Freshly brewed coffee with a rich aroma and smooth taste.</p>
          </div>
        </div>

        <div className="menu-plate plate-two reveal-scale-delay">
          <img
            className="menu-rotate-image"
            src="https://images.unsplash.com/photo-1512058564366-18510be2db19?w=700"
            alt="Rice Koththu"
          />
          <div>
            <p className="small-script">Rice & Koththu</p>
            <h3>Chicken Rice & Koththu</h3>
            <p>Spicy rice & koththu mixed with vegetables, egg, chicken and sauces.</p>
          </div>
        </div>
      </section>

      {/* Section 5 - Cart and Orders */}
      <section className="steak-section side-dish-section">
        <div className="large-food-card no-entry-animation">
          <img
            src="https://images.unsplash.com/photo-1546793665-c74683f339c1?w=900"
            alt="Fresh salad"
          />
        </div>

        <div className="side-text no-entry-animation">
          <p className="small-script">Customer</p>
          <h2>Cart & Checkout</h2>
          <p>
            Customers can add food items to cart, update quantity, remove items,
            enter delivery address, select payment method, and place orders.
          </p>
        </div>

    
      </section>

      {/* Section 6 - Roles */}
      <section id="roles" className="steak-section roles-section">
        <p className="small-script reveal-up">Discover</p>
        <h2 className="reveal-up">System Roles</h2>

        <div className="roles-grid">
          <div className="role-box reveal-left">
            <span>👤</span>
            <h3>Customer</h3>
            <p>Browse foods, manage cart, checkout, and view orders.</p>
          </div>

          <div className="role-box reveal-up">
            <span>🚚</span>
            <h3>Driver</h3>
            <p>View assigned delivery orders and update delivery status.</p>
          </div>

          <div className="role-box reveal-right">
            <span>🏪</span>
            <h3>Owner</h3>
            <p>Manage foods, customers, drivers, and orders.</p>
          </div>
        </div>
      </section>

      {/* Section 7 - Final CTA */}
      <section className="steak-section reservation-section">
        <div className="reservation-overlay"></div>

        <div className="reservation-content reveal-up">
          <p className="small-script">Start Now</p>
          <h2>Create Your Account</h2>
          <p>
            Register as a customer or driver. Owner can login using the given
            owner credentials.
          </p>

          <div className="final-actions">
            <Link to="/signup" className="outline-btn">
              Create Account
            </Link>
            <Link to="/signin" className="outline-btn">
              Sign In
            </Link>
          </div>
        </div>

        <footer className="steak-footer">
          
        </footer>
      </section>
    </div>
  );
}