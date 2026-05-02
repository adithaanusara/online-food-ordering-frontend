import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

export default function OwnerDashboardPage() {
  const { user } = useAuth();

  return (
    <div className="p-8 bg-slate-100 min-h-screen">
      <h1 className="text-3xl font-bold text-slate-800">Owner Dashboard</h1>

      <p className="mt-2 text-slate-600">
        Welcome, {user?.fullName}. You can manage foods, orders and drivers.
      </p>

      <div className="grid md:grid-cols-4 gap-6 mt-8">
        <Link
          to="/owner/foods"
          className="bg-white p-6 rounded-2xl shadow hover:shadow-lg"
        >
          <h2 className="text-xl font-bold text-orange-500">Manage Foods</h2>
          <p className="text-slate-600 mt-2">Add, edit and remove foods.</p>
        </Link>

        <Link
          to="/owner/orders"
          className="bg-white p-6 rounded-2xl shadow hover:shadow-lg"
        >
          <h2 className="text-xl font-bold text-orange-500">Manage Orders</h2>
          <p className="text-slate-600 mt-2">Accept and update orders.</p>
        </Link>

        <Link
          to="/owner/drivers"
          className="bg-white p-6 rounded-2xl shadow hover:shadow-lg"
        >
          <h2 className="text-xl font-bold text-orange-500">Drivers</h2>
          <p className="text-slate-600 mt-2">View registered drivers.</p>
        </Link>

        <Link
          to="/owner/customers"
          className="bg-white p-6 rounded-2xl shadow hover:shadow-lg"
        >
          <h2 className="text-xl font-bold text-orange-500">Customers</h2>
          <p className="text-slate-600 mt-2">View registered customers.</p>
        </Link>
      </div>
    </div>
  );
}