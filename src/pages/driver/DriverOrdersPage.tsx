import { useMemo, useState } from "react";
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

const ACTIVE_STATUSES = ["Pending", "Preparing", "Picked Up", "On The Way"];

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

function saveOrders(orders: Order[]) {
  localStorage.setItem("foodexpress_orders", JSON.stringify(orders));
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

function getNextStatus(currentStatus?: string) {
  const status = currentStatus || "Pending";

  if (status === "Pending") return "Preparing";
  if (status === "Preparing") return "Picked Up";
  if (status === "Picked Up") return "On The Way";
  if (status === "On The Way") return "Delivered";

  return "Delivered";
}

function getActionLabel(currentStatus?: string) {
  const status = currentStatus || "Pending";

  if (status === "Pending") return "Accept Order";
  if (status === "Preparing") return "Mark Picked Up";
  if (status === "Picked Up") return "Start Delivery";
  if (status === "On The Way") return "Mark Delivered";

  return "Completed";
}

export default function DriverOrdersPage() {
  const [orders, setOrders] = useState<Order[]>(() => readOrders());

  const assignedOrders = useMemo(() => {
    return orders.filter((order) => {
      const status = order.status || "Pending";
      return ACTIVE_STATUSES.includes(status);
    });
  }, [orders]);

  function updateOrderStatus(orderId: string) {
    const updatedOrders = orders.map((order) => {
      if (order.id !== orderId) {
        return order;
      }

      const nextStatus = getNextStatus(order.status);

      return {
        ...order,
        status: nextStatus,
        deliveredAt:
          nextStatus === "Delivered" ? new Date().toISOString() : order.deliveredAt,
      };
    });

    setOrders(updatedOrders);
    saveOrders(updatedOrders);
  }

  return (
    <main className="fx-driver-orders-page">
      <div className="fx-driver-orders-glow glow-one"></div>
      <div className="fx-driver-orders-glow glow-two"></div>

      <section className="fx-driver-orders-hero">
        <div>
          <span className="fx-driver-mini">Delivery Tasks</span>
          <h1>Assigned Orders</h1>
          <p>
            View active customer orders, check delivery details and update the
            delivery status step by step.
          </p>
        </div>

        <div className="fx-driver-orders-count-card">
          <span>📦</span>
          <strong>{assignedOrders.length}</strong>
          <p>Active Orders</p>
        </div>
      </section>

      {assignedOrders.length === 0 ? (
        <section className="fx-driver-empty-box">
          <span>🏍️</span>
          <h2>No assigned orders</h2>
          <p>
            There are no active delivery orders right now. Delivered orders will
            appear in your delivery history.
          </p>

          <Link to="/driver/history" className="fx-driver-orders-btn primary">
            View Delivery History
          </Link>
        </section>
      ) : (
        <section className="fx-driver-orders-grid">
          {assignedOrders.map((order) => {
            const total = getOrderTotal(order);
            const status = order.status || "Pending";

            return (
              <article className="fx-driver-order-card" key={order.id}>
                <div className="fx-driver-order-card-header">
                  <div>
                    <span className="fx-driver-order-id">{order.id}</span>
                    <h2>{status}</h2>
                  </div>

                  <strong>LKR {total.toLocaleString()}</strong>
                </div>

                <div className="fx-driver-status-line">
                  <span className={status === "Pending" ? "active" : ""}>
                    Pending
                  </span>
                  <span className={status === "Preparing" ? "active" : ""}>
                    Preparing
                  </span>
                  <span className={status === "Picked Up" ? "active" : ""}>
                    Picked Up
                  </span>
                  <span className={status === "On The Way" ? "active" : ""}>
                    On The Way
                  </span>
                </div>

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
                </div>

                <div className="fx-driver-order-items">
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

                <div className="fx-driver-order-actions">
                  <button
                    type="button"
                    className="fx-driver-orders-btn primary"
                    onClick={() => updateOrderStatus(order.id)}
                  >
                    {getActionLabel(status)}
                  </button>

                  <Link
                    to="/driver/history"
                    className="fx-driver-orders-btn secondary"
                  >
                    History
                  </Link>
                </div>
              </article>
            );
          })}
        </section>
      )}
    </main>
  );
}