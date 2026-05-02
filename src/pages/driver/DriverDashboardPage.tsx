import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

export default function DriverDashboardPage() {
  const { user } = useAuth();

  return (
    <div className="p-8 bg-slate-100 min-h-screen">
      <h1 className="text-3xl font-bold text-slate-800">Driver Dashboard</h1>

      <p className="mt-2 text-slate-600">
        Welcome, {user?.fullName}. You can view assigned deliveries and update
        delivery status.
      </p>

      <div className="bg-white rounded-2xl shadow p-6 mt-6">
        <h2 className="text-xl font-bold text-slate-800">Driver Details</h2>

        <div className="grid md:grid-cols-2 gap-4 mt-4 text-slate-700">
          <p>
            <span className="font-semibold">NIC:</span> {user?.nicNumber}
          </p>

          <p>
            <span className="font-semibold">Gender:</span> {user?.gender}
          </p>

          <p>
            <span className="font-semibold">Phone:</span> {user?.phone}
          </p>

          <p>
            <span className="font-semibold">Vehicle:</span>{" "}
            {user?.vehicleType}
          </p>

          <p>
            <span className="font-semibold">Vehicle Number:</span>{" "}
            {user?.vehicleNumber}
          </p>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-6 mt-8">
        <Link
          to="/driver/orders"
          className="bg-white p-6 rounded-2xl shadow hover:shadow-lg"
        >
          <h2 className="text-xl font-bold text-orange-500">
            Assigned Orders
          </h2>
          <p className="text-slate-600 mt-2">
            View orders assigned by the owner.
          </p>
        </Link>

        <Link
          to="/driver/history"
          className="bg-white p-6 rounded-2xl shadow hover:shadow-lg"
        >
          <h2 className="text-xl font-bold text-orange-500">
            Delivery History
          </h2>
          <p className="text-slate-600 mt-2">View completed deliveries.</p>
        </Link>
      </div>
    </div>
  );
}