import { Link } from "react-router-dom";

type DriverUser = {
  fullName?: string;
  name?: string;
  email?: string;
  nicNumber?: string;
  nic?: string;
  gender?: string;
  phone?: string;
  vehicleType?: string;
  vehicleNumber?: string;
};

export default function DriverDashboardPage() {
  const currentUser: DriverUser = JSON.parse(
    localStorage.getItem("food_ordering_current_user") || "null"
  );

  const driverName =
    currentUser?.fullName || currentUser?.name || currentUser?.email || "Driver";

  const driverDetails = [
    {
      label: "NIC",
      value: currentUser?.nicNumber || currentUser?.nic || "Not provided",
      icon: "🪪",
    },
    {
      label: "Gender",
      value: currentUser?.gender || "Not provided",
      icon: "⚧",
    },
    {
      label: "Phone",
      value: currentUser?.phone || "Not provided",
      icon: "📞",
    },
    {
      label: "Vehicle",
      value: currentUser?.vehicleType || "Not provided",
      icon: "🏍️",
    },
    {
      label: "Vehicle Number",
      value: currentUser?.vehicleNumber || "Not provided",
      icon: "🔢",
    },
    {
      label: "Status",
      value: "Available",
      icon: "🟢",
    },
  ];

  const stats = [
    {
      label: "Assigned Orders",
      value: "08",
      icon: "📦",
    },
    {
      label: "Completed",
      value: "24",
      icon: "✅",
    },
    {
      label: "Pending",
      value: "03",
      icon: "⏳",
    },
    {
      label: "Rating",
      value: "4.8",
      icon: "⭐",
    },
  ];

  return (
    <main className="fx-driver-page">
      <div className="fx-driver-glow fx-driver-glow-one"></div>
      <div className="fx-driver-glow fx-driver-glow-two"></div>

      <section className="fx-driver-hero">
        <div className="fx-driver-hero-content">
          <span className="fx-driver-mini">Driver Control Center</span>

          <h1>
            Welcome back, <span>{driverName}</span>
          </h1>

          <p>
            View assigned deliveries, update delivery status and manage your
            delivery history in one premium FoodExpress driver space.
          </p>

          <div className="fx-driver-actions">
            <Link to="/driver/orders" className="fx-driver-btn primary">
              View Assigned Orders
            </Link>

            <Link to="/driver/history" className="fx-driver-btn secondary">
              Delivery History
            </Link>
          </div>
        </div>

        <div className="fx-driver-visual">
          <div className="fx-driver-bike-orbit">
            <span className="fx-orbit-dot dot-one"></span>
            <span className="fx-orbit-dot dot-two"></span>
            <span className="fx-orbit-dot dot-three"></span>

            <div className="fx-driver-bike-card">
              <span className="fx-driver-bike-icon">🏍️</span>
              <h3>Fast Delivery</h3>
              <p>Assigned route ready</p>
            </div>
          </div>
        </div>
      </section>

      <section className="fx-driver-stats-grid">
        {stats.map((stat) => (
          <article className="fx-driver-stat-card" key={stat.label}>
            <span>{stat.icon}</span>
            <div>
              <strong>{stat.value}</strong>
              <p>{stat.label}</p>
            </div>
          </article>
        ))}
      </section>

      <section className="fx-driver-details-card">
        <div className="fx-driver-section-head">
          <div>
            <span className="fx-driver-mini">Profile Details</span>
            <h2>Driver Details</h2>
          </div>

          <p>Your registered driver and vehicle information.</p>
        </div>

        <div className="fx-driver-details-grid">
          {driverDetails.map((detail) => (
            <article className="fx-driver-detail-item" key={detail.label}>
              <span className="fx-driver-detail-icon">{detail.icon}</span>

              <div>
                <p>{detail.label}</p>
                <strong>{detail.value}</strong>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="fx-driver-quick-grid">
        <Link to="/driver/orders" className="fx-driver-quick-card">
          <div className="fx-driver-quick-top">
            <span>📦</span>
            <small>Assigned</small>
          </div>

          <h3>Assigned Orders</h3>
          <p>View orders assigned by the owner and update delivery progress.</p>

          <strong>Open Orders →</strong>
        </Link>

        <Link to="/driver/history" className="fx-driver-quick-card">
          <div className="fx-driver-quick-top">
            <span>🧾</span>
            <small>Completed</small>
          </div>

          <h3>Delivery History</h3>
          <p>View completed deliveries and track your previous delivery records.</p>

          <strong>View History →</strong>
        </Link>
      </section>
    </main>
  );
}