import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

export default function CustomerDashboardPage() {
  const { user } = useAuth();

  return (
    <div className="p-8 bg-slate-100 min-h-screen">
      <h1 className="text-3xl font-bold text-slate-800">
        Customer Dashboard
      </h1>

      <p className="mt-2 text-slate-600">
        Welcome, {user?.fullName}. You can browse foods, add items to cart and
        place orders.
      </p>

      <div className="grid md:grid-cols-3 gap-6 mt-8">
        <Link
          to="/foods"
          className="bg-white p-6 rounded-2xl shadow hover:shadow-lg"
        >
          <h2 className="text-xl font-bold text-orange-500">Browse Foods</h2>
          <p className="text-slate-600 mt-2">View available food items.</p>
        </Link>

        <Link
          to="/cart"
          className="bg-white p-6 rounded-2xl shadow hover:shadow-lg"
        >
          <h2 className="text-xl font-bold text-orange-500">My Cart</h2>
          <p className="text-slate-600 mt-2">Check selected food items.</p>
        </Link>

        <Link
          to="/orders/my"
          className="bg-white p-6 rounded-2xl shadow hover:shadow-lg"
        >
          <h2 className="text-xl font-bold text-orange-500">My Orders</h2>
          <p className="text-slate-600 mt-2">Track your order status.</p>
        </Link>
      </div>
    </div>
  );
}