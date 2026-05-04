import { Link } from "react-router-dom";
import { authService } from "../../services/authService";

type OrderItem = {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image?: string;
};

type Order = {
  id: string;
  items: OrderItem[];
  deliveryAddress?: string;
  address?: string;
  phoneNumber?: string;
  paymentMethod?: string;
  total?: number;
  status?: string;
  createdAt?: string;
  deliveredAt?: string;
};

function readOrders(): Order[] {
  const foodExpressOrders: Order[] = JSON.parse(
    localStorage.getItem("foodexpress_orders") || "[]"
  );

  const oldOrders: Order[] = JSON.parse(
    localStorage.getItem("food_orders") || "[]"
  );

  const orderMap = new Map<string, Order>();

  [...oldOrders, ...foodExpressOrders].forEach((order) => {
    if (order?.id) {
      orderMap.set(order.id, order);
    }
  });

  return Array.from(orderMap.values());
}

function getOrderTotal(order: Order) {
  if (typeof order.total === "number") {
    return order.total;
  }

  return order.items.reduce((total, item) => {
    return total + item.price * item.quantity;
  }, 0);
}

export default function AdminDashboardPage() {
  const orders = readOrders();
  const users = authService.getAllUsers();

  const drivers = users.filter((user) => user.role === "DRIVER");
  const customers = users.filter((user) => user.role === "CUSTOMER");

  const deliveredOrders = orders.filter(
    (order) => order.status === "Delivered" || order.status === "Completed"
  );

  const activeOrders = orders.filter(
    (order) => order.status !== "Delivered" && order.status !== "Completed"
  );

  const totalRevenue = orders.reduce((total, order) => {
    return total + getOrderTotal(order);
  }, 0);

  return (
    <main className="fx-admin-page">
      <div className="fx-admin-glow glow-one"></div>
      <div className="fx-admin-glow glow-two"></div>

      <section className="fx-admin-hero">
        <div>
          <span className="fx-admin-mini">Admin Control Panel</span>

          <h1>
            FoodExpress <span>Admin Dashboard</span>
          </h1>

          <p>
            Manage customer orders, monitor driver delivery status, view drivers
            and customers from one admin panel.
          </p>

          <div className="fx-admin-hero-actions">
            <Link to="/admin/orders" className="fx-admin-btn primary">
              View Orders
            </Link>

            <Link to="/admin/drivers" className="fx-admin-btn secondary">
              View Drivers
            </Link>
          </div>
        </div>

        <div className="fx-admin-revenue-card">
          <span>💰</span>
          <p>Total Revenue</p>
          <strong>LKR {totalRevenue.toLocaleString()}</strong>
        </div>
      </section>

      <section className="fx-admin-stats-grid">
        <article className="fx-admin-stat-card">
          <span>📦</span>
          <div>
            <strong>{orders.length}</strong>
            <h3>Total Orders</h3>
            <p>All customer orders</p>
          </div>
        </article>

        <article className="fx-admin-stat-card">
          <span>🚚</span>
          <div>
            <strong>{activeOrders.length}</strong>
            <h3>Active Orders</h3>
            <p>Not delivered yet</p>
          </div>
        </article>

        <article className="fx-admin-stat-card">
          <span>✅</span>
          <div>
            <strong>{deliveredOrders.length}</strong>
            <h3>Delivered</h3>
            <p>Completed deliveries</p>
          </div>
        </article>

        <article className="fx-admin-stat-card">
          <span>🏍️</span>
          <div>
            <strong>{drivers.length}</strong>
            <h3>Drivers</h3>
            <p>Registered drivers</p>
          </div>
        </article>

        <article className="fx-admin-stat-card">
          <span>👥</span>
          <div>
            <strong>{customers.length}</strong>
            <h3>Customers</h3>
            <p>Registered customers</p>
          </div>
        </article>
      </section>

      <section className="fx-admin-quick-grid">
        <Link to="/admin/orders" className="fx-admin-quick-card">
          <span>📦</span>
          <h3>All Orders</h3>
          <p>Check whether each order is delivered or not delivered.</p>
          <strong>Open Orders →</strong>
        </Link>

        <Link to="/admin/drivers" className="fx-admin-quick-card">
          <span>🏍️</span>
          <h3>Drivers</h3>
          <p>View driver NIC, phone, vehicle and registration details.</p>
          <strong>Open Drivers →</strong>
        </Link>

        <Link to="/admin/customers" className="fx-admin-quick-card">
          <span>👥</span>
          <h3>Customers</h3>
          <p>View all registered customer accounts.</p>
          <strong>Open Customers →</strong>
        </Link>
      </section>
    </main>
  );
}