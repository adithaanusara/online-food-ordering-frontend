import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getMyOrders } from "../../services/orderService";
import { Order } from "../../types";

function getOrderTotal(order: Order) {
  if (typeof order.total === "number") return order.total;
  if (typeof order.totalAmount === "number") return order.totalAmount;

  return (order.items || []).reduce((total: number, item: any) => {
    return total + Number(item.price || 0) * Number(item.quantity || 0);
  }, 0);
}

function formatDate(dateValue?: string) {
  if (!dateValue) return "N/A";

  const date = new Date(dateValue);

  if (Number.isNaN(date.getTime())) {
    return dateValue;
  }

  return date.toLocaleString();
}

export default function OrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;

    async function loadOrders() {
      try {
        const backendOrders = await getMyOrders();

        const localOrders: Order[] = JSON.parse(
          localStorage.getItem("foodexpress_orders") || "[]"
        );

        const merged = [...backendOrders, ...localOrders];

        const unique = Array.from(
          new Map(merged.map((order) => [String(order.id), order])).values()
        );

        if (active) {
          setOrders(unique);
        }
      } finally {
        if (active) {
          setLoading(false);
        }
      }
    }

    loadOrders();

    return () => {
      active = false;
    };
  }, []);

  if (loading) {
    return (
      <main className="fx-orders-page">
        <section className="fx-empty-orders">
          <span>⏳</span>
          <h1>Loading orders...</h1>
        </section>
      </main>
    );
  }

  if (orders.length === 0) {
    return (
      <main className="fx-orders-page">
        <section className="fx-empty-orders">
          <span>📦</span>

          <h1>No orders yet</h1>

          <p>
            You have not placed any orders yet. Browse foods and place your first
            order.
          </p>

          <Link to="/foods" className="fx-checkout-primary-btn">
            Browse Foods
          </Link>
        </section>
      </main>
    );
  }

  return (
    <main className="fx-orders-page">
      <section className="fx-orders-hero">
        <span className="fx-checkout-mini">Order Tracking</span>

        <h1>My Orders</h1>

        <p>Track your placed orders and view your order history.</p>
      </section>

      <section className="fx-orders-list">
        {orders.map((order) => {
          const address = order.deliveryAddress || order.address || "N/A";
          const total = getOrderTotal(order);

          return (
            <article className="fx-order-card" key={order.id}>
              <div className="fx-order-card-header">
                <div>
                  <span>ORD-{order.id}</span>
                  <h2>{order.status || "Pending"}</h2>
                </div>

                <strong>LKR {total.toLocaleString()}</strong>
              </div>

              <div className="fx-order-meta">
                <p>
                  <b>Payment:</b> {order.paymentMethod || "N/A"}
                </p>

                <p>
                  <b>Phone:</b> {order.phoneNumber || "N/A"}
                </p>

                <p>
                  <b>Address:</b> {address}
                </p>

                <p>
                  <b>Date:</b> {formatDate(order.createdAt)}
                </p>
              </div>

              <div className="fx-order-items">
                {(order.items || []).map((item: any) => (
                  <div className="fx-order-item" key={`${order.id}-${item.id}`}>
                    {item.image ? (
                      <img src={item.image} alt={item.name} />
                    ) : (
                      <div className="fx-order-item-placeholder">🍽</div>
                    )}

                    <div>
                      <h3>{item.name}</h3>

                      <p>
                        Qty {item.quantity} × LKR{" "}
                        {Number(item.price || 0).toLocaleString()}
                      </p>
                    </div>

                    <strong>
                      LKR{" "}
                      {(
                        Number(item.price || 0) * Number(item.quantity || 0)
                      ).toLocaleString()}
                    </strong>
                  </div>
                ))}
              </div>
            </article>
          );
        })}
      </section>
    </main>
  );
}