import { Link, NavLink, useNavigate } from "react-router-dom";
import { useCart } from "../../context/CartContext";

export default function Navbar() {
  const navigate = useNavigate();
  const { cartCount } = useCart();

  const currentUser = JSON.parse(
    localStorage.getItem("food_ordering_current_user") || "null"
  );

  const isLoggedIn = Boolean(currentUser);

  function logout() {
    localStorage.removeItem("food_ordering_current_user");
    localStorage.removeItem("food_ordering_token");
    navigate("/signin");
  }

  return (
    <header className="app-navbar">
      <Link to="/" className="app-logo">
        FoodExpress
      </Link>

      <nav className="app-nav-links">
        {isLoggedIn && currentUser?.role === "CUSTOMER" && (
          <>
            <NavLink to="/customer/dashboard">Dashboard</NavLink>
            <NavLink to="/foods">Foods</NavLink>

            <NavLink to="/cart" className="cart-nav-link">
              <span className="cart-nav-icon">🛒</span>
              <span>Cart</span>

              {cartCount > 0 && (
                <span className="cart-notification-badge">{cartCount}</span>
              )}
            </NavLink>

            <NavLink to="/orders">My Orders</NavLink>
          </>
        )}

        {isLoggedIn && currentUser?.role === "DRIVER" && (
          <>
            <NavLink to="/driver/dashboard">Dashboard</NavLink>
            <NavLink to="/driver/orders">Orders</NavLink>
            <NavLink to="/driver/history">History</NavLink>
          </>
        )}

        {isLoggedIn && currentUser?.role === "OWNER" && (
          <>
            <NavLink to="/owner/dashboard">Dashboard</NavLink>
            <NavLink to="/owner/foods">Foods</NavLink>
            <NavLink to="/owner/orders">Orders</NavLink>
            <NavLink to="/owner/drivers">Drivers</NavLink>
            <NavLink to="/owner/customers">Customers</NavLink>
          </>
        )}

        {!isLoggedIn && (
          <>
            <NavLink to="/">Home</NavLink>
            <NavLink to="/signin">Sign In</NavLink>
            <NavLink to="/signup">Sign Up</NavLink>
          </>
        )}

        {isLoggedIn && (
          <button type="button" className="app-logout-btn" onClick={logout}>
            Logout
          </button>
        )}
      </nav>
    </header>
  );
}