import { Link } from "react-router-dom";

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
  const newOrders: Order[] = JSON.parse(
    localStorage.getItem("foodexpress_orders") || "[]"
  );

  const oldOrders: Order[] = JSON.parse(
    localStorage.getItem("food_orders") || "[]"
  );

  const orderMap = new Map<string, Order>();

  [...oldOrders, ...newOrders].forEach((order) => {
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

function getAddress(order: Order) {
  return order.deliveryAddress || order.address || "No address provided";
}

function formatDate(dateValue?: string) {
  if (!dateValue) return "N/A";

  const date = new Date(dateValue);

  if (Number.isNaN(date.getTime())) {
    return dateValue;
  }

  return date.toLocaleString();
}

export default function DeliveryHistoryPage() {
  const orders = readOrders();

  const deliveredOrders = orders.filter((order) => {
    const status = order.status || "Pending";
    return status === "Delivered" || status === "Completed";
  });

  return (
    <main className="fx-driver-orders-page">
      <div className="fx-driver-orders-glow glow-one"></div>
      <div className="fx-driver-orders-glow glow-two"></div>

      <section className="fx-driver-orders-hero">
        <div>
          <span className="fx-driver-mini">Completed Deliveries</span>
          <h1>Delivery History</h1>
          <p>
            View completed deliveries, customer details and previous order
            records.
          </p>
        </div>

        <div className="fx-driver-orders-count-card">
          <span>✅</span>
          <strong>{deliveredOrders.length}</strong>
          <p>Completed</p>
        </div>
      </section>

      {deliveredOrders.length === 0 ? (
        <section className="fx-driver-empty-box">
          <span>🧾</span>
          <h2>No delivery history yet</h2>
          <p>
            Delivered orders will appear here after you mark assigned orders as
            delivered.
          </p>

          <Link to="/driver/orders" className="fx-driver-orders-btn primary">
            View Assigned Orders
          </Link>
        </section>
      ) : (
        <section className="fx-driver-history-list">
          {deliveredOrders.map((order) => {
            const total = getOrderTotal(order);

            return (
              <article className="fx-driver-history-card" key={order.id}>
                <div className="fx-driver-history-main">
                  <div className="fx-driver-history-icon">✅</div>

                  <div>
                    <span className="fx-driver-order-id">{order.id}</span>
                    <h2>Delivered Successfully</h2>

                    <div className="fx-driver-order-meta">
                      <p>
                        <b>Address:</b> {getAddress(order)}
                      </p>
                      <p>
                        <b>Phone:</b> {order.phoneNumber || "N/A"}
                      </p>
                      <p>
                        <b>Payment:</b> {order.paymentMethod || "N/A"}
                      </p>
                      <p>
                        <b>Placed:</b> {formatDate(order.createdAt)}
                      </p>
                      <p>
                        <b>Delivered:</b> {formatDate(order.deliveredAt)}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="fx-driver-history-total">
                  <span>Total</span>
                  <strong>LKR {total.toLocaleString()}</strong>
                </div>

                <div className="fx-driver-order-items history-items">
                  {order.items.map((item) => (
                    <div className="fx-driver-order-item" key={item.id}>
                      {item.image ? (
                        <img src={item.image} alt={item.name} />
                      ) : (
                        <div className="fx-driver-order-placeholder">🍽</div>
                      )}

                      <div>
                        <h3>{item.name}</h3>
                        <p>
                          Qty {item.quantity} × LKR{" "}
                          {item.price.toLocaleString()}
                        </p>
                      </div>

                      <strong>
                        LKR {(item.price * item.quantity).toLocaleString()}
                      </strong>
                    </div>
                  ))}
                </div>
              </article>
            );
          })}
        </section>
      )}
    </main>
  );
}