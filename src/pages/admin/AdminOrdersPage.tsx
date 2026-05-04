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

function getAddress(order: Order) {
  return order.deliveryAddress || order.address || "No address provided";
}

function formatDate(value?: string) {
  if (!value) return "N/A";

  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return value;
  }

  return date.toLocaleString();
}

function getDeliveryLabel(status?: string) {
  if (status === "Delivered" || status === "Completed") {
    return "Delivered";
  }

  return "Not Delivered";
}

function getStatusClass(status?: string) {
  if (status === "Delivered" || status === "Completed") {
    return "delivered";
  }

  if (status === "Picked Up" || status === "On The Way") {
    return "progress";
  }

  return "pending";
}

export default function AdminOrdersPage() {
  const orders = readOrders();

  return (
    <main className="fx-admin-page">
      <div className="fx-admin-glow glow-one"></div>
      <div className="fx-admin-glow glow-two"></div>

      <section className="fx-admin-list-hero">
        <span className="fx-admin-mini">Admin Orders</span>
        <h1>All Customer Orders</h1>
        <p>
          Admin can monitor all orders and check whether drivers delivered them
          or not.
        </p>
      </section>

      {orders.length === 0 ? (
        <section className="fx-admin-empty-box">
          <span>📦</span>
          <h2>No orders found</h2>
          <p>Customer orders will appear here after checkout.</p>
        </section>
      ) : (
        <section className="fx-admin-orders-list">
          {orders.map((order) => {
            const status = order.status || "Pending";
            const total = getOrderTotal(order);

            return (
              <article className="fx-admin-order-card" key={order.id}>
                <div className="fx-admin-order-head">
                  <div>
                    <span>{order.id}</span>
                    <h2>{status}</h2>
                  </div>

                  <div className={`fx-admin-status-pill ${getStatusClass(status)}`}>
                    {getDeliveryLabel(status)}
                  </div>
                </div>

                <div className="fx-admin-order-info-grid">
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

                  <p>
                    <b>Total:</b> LKR {total.toLocaleString()}
                  </p>
                </div>

                <div className="fx-admin-order-items">
                  {order.items.map((item) => (
                    <div className="fx-admin-order-item" key={item.id}>
                      {item.image ? (
                        <img src={item.image} alt={item.name} />
                      ) : (
                        <div className="fx-admin-food-placeholder">🍽</div>
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