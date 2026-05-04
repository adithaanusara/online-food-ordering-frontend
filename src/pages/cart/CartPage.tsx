import { Link } from "react-router-dom";
import { useCart } from "../../context/CartContext";

export default function CartPage() {
  const { cartItems, cartTotal, updateQuantity, removeFromCart, clearCart } =
    useCart();

  if (cartItems.length === 0) {
    return (
      <main className="cart-page">
        <section className="empty-cart-box">
          <span>🛒</span>
          <h1>Your cart is empty</h1>
          <p>Add food items to your cart and come back to checkout.</p>
          <Link to="/foods" className="customer-dashboard-btn primary">
            Browse Foods
          </Link>
        </section>
      </main>
    );
  }

  return (
    <main className="cart-page">
      <section className="cart-header">
        <span className="foods-mini-title">FoodExpress Cart</span>
        <h1>My Cart</h1>
        <p>Update quantities, remove items and continue your order process.</p>
      </section>

      <section className="cart-layout">
        <div className="cart-items-list">
          {cartItems.map((item) => (
            <article className="cart-item-card" key={item.id}>
              <img src={item.image} alt={item.name} />

              <div className="cart-item-info">
                <span>{item.category}</span>
                <h3>{item.name}</h3>
                <p>LKR {item.price.toLocaleString()}</p>
              </div>

              <div className="cart-quantity-control">
                <button
                  type="button"
                  onClick={() => updateQuantity(item.id, item.quantity - 1)}
                >
                  −
                </button>

                <strong>{item.quantity}</strong>

                <button
                  type="button"
                  onClick={() => updateQuantity(item.id, item.quantity + 1)}
                >
                  +
                </button>
              </div>

              <div className="cart-item-total">
                <strong>LKR {(item.price * item.quantity).toLocaleString()}</strong>

                <button type="button" onClick={() => removeFromCart(item.id)}>
                  Remove
                </button>
              </div>
            </article>
          ))}
        </div>

        <aside className="cart-summary-card">
          <h2>Order Summary</h2>

          <div className="summary-row">
            <span>Items</span>
            <strong>{cartItems.length}</strong>
          </div>

          <div className="summary-row">
            <span>Total Quantity</span>
            <strong>
              {cartItems.reduce((total, item) => total + item.quantity, 0)}
            </strong>
          </div>

          <div className="summary-row total">
            <span>Total</span>
            <strong>LKR {cartTotal.toLocaleString()}</strong>
          </div>

          <Link to="/checkout" className="checkout-btn">
            Continue Checkout
          </Link>

          <button type="button" className="clear-cart-btn" onClick={clearCart}>
            Clear Cart
          </button>
        </aside>
      </section>
    </main>
  );
}