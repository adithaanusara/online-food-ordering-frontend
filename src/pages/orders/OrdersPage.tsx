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
  paymentMethod: string;
  total?: number;
  status: string;
  createdAt: string;
};

function getOrderTotal(order: Order) {
  if (typeof order.total === "number") {
    return order.total;
  }

  return order.items.reduce((total, item) => {
    return total + item.price * item.quantity;
  }, 0);
}

function formatDate(dateValue: string) {
  if (!dateValue) return "N/A";

  const date = new Date(dateValue);

  if (Number.isNaN(date.getTime())) {
    return dateValue;
  }

  return date.toLocaleString();
}

export default function OrdersPage() {
  /*
    foodexpress_orders = new checkout page key
    food_orders = old key from your previous code

    මේ දෙකම read කරනවා.
    එතකොට old orders තිබ්බත් show වෙනවා.
  */
  const newOrders: Order[] = JSON.parse(
    localStorage.getItem("foodexpress_orders") || "[]"
  );

  const oldOrders: Order[] = JSON.parse(
    localStorage.getItem("food_orders") || "[]"
  );

  const orders = [...newOrders, ...oldOrders];

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
                  <span>{order.id}</span>
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
                {order.items.map((item) => (
                  <div className="fx-order-item" key={item.id}>
                    {item.image ? (
                      <img src={item.image} alt={item.name} />
                    ) : (
                      <div className="fx-order-item-placeholder">🍽</div>
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
    </main>
  );
}