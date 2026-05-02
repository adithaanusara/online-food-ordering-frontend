import { MouseEvent } from "react";
import { Link } from "react-router-dom";

export default function HomePage() {
  const handlePageClick = (event: MouseEvent<HTMLDivElement>) => {
    const target = event.target as HTMLElement;

    const clickedInteractiveElement = target.closest(
      "a, button, input, select, textarea"
    );

    if (clickedInteractiveElement) {
      return;
    }

    const nextSection = document.getElementById("features");

    if (nextSection) {
      nextSection.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  };

  return (
    <div
      onClick={handlePageClick}
      className="relative min-h-screen cursor-pointer overflow-hidden bg-[#fff7ed]"
    >
      {/* Background animated circles */}
      <div className="absolute -top-24 -left-24 h-80 w-80 rounded-full bg-orange-300 opacity-40 blur-3xl animate-blob"></div>
      <div className="absolute top-40 -right-24 h-96 w-96 rounded-full bg-yellow-300 opacity-40 blur-3xl animate-blob animation-delay-2000"></div>
      <div className="absolute bottom-0 left-1/3 h-80 w-80 rounded-full bg-red-300 opacity-30 blur-3xl animate-blob animation-delay-4000"></div>

      {/* Floating food emojis */}
      <div className="pointer-events-none absolute inset-0">
        <span className="floating-food left-[8%] top-[22%]">🍕</span>
        <span className="floating-food left-[16%] top-[70%] animation-delay-2000">
          🍔
        </span>
        <span className="floating-food right-[12%] top-[18%] animation-delay-4000">
          🍟
        </span>
        <span className="floating-food right-[18%] bottom-[16%] animation-delay-2000">
          🥤
        </span>
      </div>

      {/* Header */}
      <header className="relative z-10 mx-auto flex max-w-7xl items-center justify-between px-8 py-6">
        <Link
          to="/"
          className="cursor-pointer text-3xl font-black tracking-tight text-orange-600"
        >
          FoodExpress
        </Link>

        <div className="hidden items-center gap-8 md:flex">
          <a href="#features" className="cursor-pointer font-semibold text-slate-700">
            Features
          </a>

          <a href="#roles" className="cursor-pointer font-semibold text-slate-700">
            Roles
          </a>

          <Link to="/signin" className="cursor-pointer font-semibold text-slate-700">
            Sign In
          </Link>

          <Link
            to="/signup"
            className="cursor-pointer rounded-full bg-orange-500 px-6 py-3 font-bold text-white shadow-lg shadow-orange-300 transition hover:-translate-y-1 hover:bg-orange-600"
          >
            Get Started
          </Link>
        </div>
      </header>

      {/* Hero */}
      <main className="relative z-10 mx-auto grid max-w-7xl items-center gap-14 px-8 pb-16 pt-10 lg:grid-cols-2">
        <section className="animate-slide-up">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-white px-5 py-3 shadow-md">
            <span className="h-3 w-3 rounded-full bg-green-500"></span>
            <span className="font-bold text-slate-700">
              Fast food delivery system
            </span>
          </div>

          <h1 className="max-w-2xl text-5xl font-black leading-tight text-slate-900 md:text-7xl">
            Delicious food
            <span className="block text-orange-500">delivered fast</span>
            to your door
          </h1>

          <p className="mt-6 max-w-xl text-lg leading-8 text-slate-600">
            Order food online, manage your cart, place orders, and track
            deliveries easily with customer, driver, and owner dashboards.
          </p>

          <p className="mt-5 inline-block rounded-full bg-white px-5 py-3 text-sm font-bold text-orange-600 shadow-md animate-pulse-soft">
            Click anywhere to explore ↓
          </p>

          <div className="mt-9 flex flex-wrap gap-4">
            <Link
              to="/signup"
              className="cursor-pointer rounded-full bg-orange-500 px-9 py-4 text-lg font-black text-white shadow-xl shadow-orange-300 transition hover:-translate-y-1 hover:bg-orange-600"
            >
              Create Account
            </Link>

            <Link
              to="/signin"
              className="cursor-pointer rounded-full border-2 border-orange-300 bg-white px-9 py-4 text-lg font-black text-orange-600 shadow-md transition hover:-translate-y-1 hover:bg-orange-50"
            >
              Sign In
            </Link>
          </div>

          <div className="mt-12 grid max-w-lg grid-cols-3 gap-5">
            <div className="rounded-2xl bg-white p-5 shadow-md transition hover:-translate-y-2">
              <h3 className="text-3xl font-black text-slate-900">50+</h3>
              <p className="mt-1 text-sm font-semibold text-slate-500">
                Food Items
              </p>
            </div>

            <div className="rounded-2xl bg-white p-5 shadow-md transition hover:-translate-y-2">
              <h3 className="text-3xl font-black text-slate-900">3</h3>
              <p className="mt-1 text-sm font-semibold text-slate-500">
                User Roles
              </p>
            </div>

            <div className="rounded-2xl bg-white p-5 shadow-md transition hover:-translate-y-2">
              <h3 className="text-3xl font-black text-slate-900">24/7</h3>
              <p className="mt-1 text-sm font-semibold text-slate-500">
                Ordering
              </p>
            </div>
          </div>
        </section>

        {/* Animated food card area */}
        <section className="relative h-[560px] animate-fade-in">
          <div className="absolute left-1/2 top-1/2 h-[430px] w-[430px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-orange-200"></div>

          <div className="absolute left-1/2 top-1/2 h-[380px] w-[380px] -translate-x-1/2 -translate-y-1/2 rounded-full border-[28px] border-white shadow-2xl animate-spin-slow"></div>

          <img
            src="https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=900"
            alt="Pizza"
            className="absolute left-1/2 top-[42%] h-72 w-72 -translate-x-1/2 -translate-y-1/2 rounded-full object-cover shadow-2xl animate-float-main"
          />

          <div className="absolute left-4 top-20 rounded-3xl bg-white p-4 shadow-xl animate-float-card">
            <img
              src="https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=500"
              alt="Burger"
              className="h-24 w-24 rounded-2xl object-cover"
            />
            <p className="mt-3 text-center font-black text-slate-800">
              Burger
            </p>
            <p className="text-center text-sm font-bold text-orange-500">
              Rs. 950
            </p>
          </div>

          <div className="absolute right-4 top-28 rounded-3xl bg-white p-4 shadow-xl animate-float-card animation-delay-2000">
            <img
              src="https://images.unsplash.com/photo-1603133872878-684f208fb84b?w=500"
              alt="Rice"
              className="h-24 w-24 rounded-2xl object-cover"
            />
            <p className="mt-3 text-center font-black text-slate-800">
              Fried Rice
            </p>
            <p className="text-center text-sm font-bold text-orange-500">
              Rs. 1200
            </p>
          </div>

          <div className="absolute bottom-20 left-10 rounded-3xl bg-white p-4 shadow-xl animate-float-card animation-delay-4000">
            <img
              src="https://images.unsplash.com/photo-1621506289937-a8e4df240d0b?w=500"
              alt="Juice"
              className="h-24 w-24 rounded-2xl object-cover"
            />
            <p className="mt-3 text-center font-black text-slate-800">
              Juice
            </p>
            <p className="text-center text-sm font-bold text-orange-500">
              Rs. 450
            </p>
          </div>

          <div className="absolute bottom-16 right-8 rounded-3xl bg-white p-5 shadow-xl animate-float-card">
            <p className="text-sm font-bold text-slate-500">Order Status</p>
            <p className="mt-1 text-xl font-black text-green-600">
              On Delivery 🚚
            </p>
          </div>
        </section>
      </main>

      {/* Scroll Down Indicator */}
      <div className="relative z-10 mb-16 flex justify-center">
        <div className="scroll-indicator">
          <span></span>
        </div>
      </div>

      {/* Features */}
      <section
        id="features"
        className="relative z-10 mx-auto min-h-screen max-w-7xl px-8 py-24 animate-section"
      >
        <p className="text-center font-bold uppercase tracking-[0.3em] text-orange-500">
          System Features
        </p>

        <h2 className="mt-3 text-center text-4xl font-black text-slate-900 md:text-5xl">
          What you can do
        </h2>

        <div className="mt-14 grid gap-6 md:grid-cols-3">
          <div className="feature-card">
            <div className="feature-icon">🍽️</div>
            <h3>Browse Foods</h3>
            <p>Customers can view foods and filter them by category.</p>
          </div>

          <div className="feature-card">
            <div className="feature-icon">🛒</div>
            <h3>Cart & Checkout</h3>
            <p>Add foods to cart, update quantity, and place orders.</p>
          </div>

          <div className="feature-card">
            <div className="feature-icon">📦</div>
            <h3>Track Orders</h3>
            <p>Customers can track order status after placing orders.</p>
          </div>
        </div>

        <div className="mt-14 rounded-[2rem] bg-white p-8 shadow-xl">
          <h3 className="text-2xl font-black text-slate-900">
            Online Food Ordering Flow
          </h3>

          <div className="mt-6 grid gap-4 md:grid-cols-5">
            <div className="flow-card">Sign Up</div>
            <div className="flow-card">Browse Foods</div>
            <div className="flow-card">Add Cart</div>
            <div className="flow-card">Checkout</div>
            <div className="flow-card">Track Order</div>
          </div>
        </div>
      </section>

      {/* Roles */}
      <section
        id="roles"
        className="relative z-10 mx-auto min-h-screen max-w-7xl px-8 py-24"
      >
        <p className="text-center font-bold uppercase tracking-[0.3em] text-orange-500">
          User Access
        </p>

        <h2 className="mt-3 text-center text-4xl font-black text-slate-900 md:text-5xl">
          System Roles
        </h2>

        <div className="mt-14 grid gap-6 md:grid-cols-3">
          <div className="role-card">
            <span>👤</span>
            <h3>Customer</h3>
            <p>Browse foods, manage cart, checkout, and view orders.</p>
          </div>

          <div className="role-card">
            <span>🚚</span>
            <h3>Driver</h3>
            <p>View assigned deliveries and update delivery status.</p>
          </div>

          <div className="role-card">
            <span>🏪</span>
            <h3>Owner</h3>
            <p>Manage foods, customers, drivers, and customer orders.</p>
          </div>
        </div>

        <div className="mt-14 text-center">
          <Link
            to="/signup"
            className="cursor-pointer rounded-full bg-orange-500 px-9 py-4 text-lg font-black text-white shadow-xl shadow-orange-300 transition hover:-translate-y-1 hover:bg-orange-600"
          >
            Start Ordering Now
          </Link>
        </div>
      </section>
    </div>
  );
}