import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

export default function Navbar() {
  const { user, isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/signin");
  };

  return (
    <nav className="bg-white shadow-md px-6 py-4 flex items-center justify-between">
      <Link to="/" className="text-2xl font-bold text-orange-500">
        FoodExpress
      </Link>

      <div className="flex items-center gap-5">
        {!isAuthenticated && (
          <>
            <Link to="/signin" className="text-slate-700 hover:text-orange-500">
              Sign In
            </Link>
            <Link
              to="/signup"
              className="bg-orange-500 text-white px-4 py-2 rounded-lg"
            >
              Sign Up
            </Link>
          </>
        )}

        {isAuthenticated && user?.role === "CUSTOMER" && (
          <>
            <Link to="/customer/dashboard">Dashboard</Link>
            <Link to="/foods">Foods</Link>
            <Link to="/cart">Cart</Link>
            <Link to="/orders/my">My Orders</Link>
          </>
        )}

        {isAuthenticated && user?.role === "DRIVER" && (
          <>
            <Link to="/driver/dashboard">Driver Dashboard</Link>
            <Link to="/driver/orders">Assigned Orders</Link>
            <Link to="/driver/history">Delivery History</Link>
          </>
        )}

        {isAuthenticated && user?.role === "OWNER" && (
          <>
            <Link to="/owner/dashboard">Owner Dashboard</Link>
            <Link to="/owner/foods">Manage Foods</Link>
            <Link to="/owner/orders">Manage Orders</Link>
            <Link to="/owner/drivers">Drivers</Link>
          </>
        )}

        {isAuthenticated && (
          <button
            onClick={handleLogout}
            className="bg-slate-800 text-white px-4 py-2 rounded-lg"
          >
            Logout
          </button>
        )}
      </div>
    </nav>
  );
}