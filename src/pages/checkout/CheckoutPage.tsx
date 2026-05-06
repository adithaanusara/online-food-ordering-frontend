import { useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useCart } from "../../context/CartContext";


type PaymentMethod = "Cash on Delivery" | "Card Payment" | "Bank Transfer";

export default function CheckoutPage() {
  const navigate = useNavigate();
  const { cartItems, cartCount, cartTotal, clearCart } = useCart();

  const [deliveryAddress, setDeliveryAddress] = useState("");
  const [paymentMethod, setPaymentMethod] =
    useState<PaymentMethod>("Cash on Delivery");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [note, setNote] = useState("");
  const [error, setError] = useState("");
  const [placingOrder, setPlacingOrder] = useState(false);

  const deliveryFee = cartCount > 0 ? 350 : 0;
  const serviceFee = cartCount > 0 ? 120 : 0;

  const grandTotal = useMemo(() => {
    return cartTotal + deliveryFee + serviceFee;
  }, [cartTotal, deliveryFee, serviceFee]);

  async function placeOrder(e: React.FormEvent) {
  e.preventDefault();
  setError("");

  if (cartItems.length === 0) {
    setError("Your cart is empty. Please add food items first.");
    return;
  }

  if (!deliveryAddress.trim()) {
    setError("Delivery address is required.");
    return;
  }

  if (!phoneNumber.trim()) {
    setError("Phone number is required.");
    return;
  }

  try {
    setPlacingOrder(true);

    const newOrder = {
      id: `ORD-${Date.now()}`,
      items: cartItems,
      deliveryAddress: deliveryAddress.trim(),
      address: deliveryAddress.trim(),
      phoneNumber: phoneNumber.trim(),
      paymentMethod,
      note: note.trim(),
      total: grandTotal,
      totalAmount: grandTotal,
      status: "PLACED",
      createdAt: new Date().toISOString(),
    };

    const existingOrders = JSON.parse(
      localStorage.getItem("foodexpress_orders") || "[]"
    );

    localStorage.setItem(
      "foodexpress_orders",
      JSON.stringify([newOrder, ...existingOrders])
    );

    clearCart();

    setTimeout(() => {
      navigate("/orders");
    }, 650);
  } catch {
    setError("Unable to place order. Please try again.");
    setPlacingOrder(false);
  }
}
  if (cartItems.length === 0) {
    return (
      <main className="fx-checkout-page">
        <section className="fx-empty-checkout">
          <div className="fx-empty-icon">🛒</div>

          <h1>Your cart is empty</h1>

          <p>
            Add your favorite foods to the cart before continuing to checkout.
          </p>

          <Link to="/foods" className="fx-checkout-primary-btn">
            Browse Foods
          </Link>
        </section>
      </main>
    );
  }

  return (
    <main className="fx-checkout-page">
      <div className="fx-checkout-glow glow-a"></div>
      <div className="fx-checkout-glow glow-b"></div>

      <section className="fx-checkout-hero">
        <div>
          <span className="fx-checkout-mini">Secure Checkout</span>

          <h1>Complete Your Order</h1>

          <p>
            Confirm your delivery address, choose payment method and place your
            FoodExpress order.
          </p>
        </div>

        <div className="fx-checkout-hero-card">
          <span>🛍</span>
          <strong>{cartCount}</strong>
          <p>Items ready</p>
        </div>
      </section>

      <section className="fx-checkout-layout">
        <form className="fx-checkout-form-card" onSubmit={placeOrder}>
          <div className="fx-form-card-header">
            <span>🚚</span>

            <div>
              <h2>Delivery Details</h2>
              <p>Enter accurate details for fast delivery.</p>
            </div>
          </div>

          {error && <div className="fx-checkout-error">{error}</div>}

          <label className="fx-checkout-field">
            <span>Delivery Address</span>
            <textarea
              placeholder="Enter your delivery address"
              value={deliveryAddress}
              onChange={(e) => setDeliveryAddress(e.target.value)}
            />
          </label>

          <label className="fx-checkout-field">
            <span>Phone Number</span>
            <input
              type="tel"
              placeholder="Enter your phone number"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
            />
          </label>

          <div className="fx-payment-section">
            <span className="fx-field-title">Payment Method</span>

            <div className="fx-payment-grid">
              {(["Cash on Delivery", "Card Payment", "Bank Transfer"] as PaymentMethod[]).map(
                (method) => (
                  <button
                    key={method}
                    type="button"
                    className={
                      paymentMethod === method
                        ? "fx-payment-option active"
                        : "fx-payment-option"
                    }
                    onClick={() => setPaymentMethod(method)}
                  >
                    <span>
                      {method === "Cash on Delivery"
                        ? "💵"
                        : method === "Card Payment"
                        ? "💳"
                        : "🏦"}
                    </span>
                    {method}
                  </button>
                )
              )}
            </div>
          </div>

          <label className="fx-checkout-field">
            <span>Order Note</span>
            <input
              type="text"
              placeholder="Optional note for restaurant or driver"
              value={note}
              onChange={(e) => setNote(e.target.value)}
            />
          </label>

          <button
            type="submit"
            className="fx-place-order-btn"
            disabled={placingOrder}
          >
            {placingOrder ? "Placing Order..." : "Place Order"}
          </button>
        </form>

        <aside className="fx-order-summary-card">
          <div className="fx-summary-header">
            <span>🍔</span>

            <div>
              <h2>Order Summary</h2>
              <p>Review your food items.</p>
            </div>
          </div>

          <div className="fx-summary-items">
            {cartItems.map((item) => (
              <div className="fx-summary-item" key={item.id}>
                <img src={item.image} alt={item.name} />

                <div>
                  <h3>{item.name}</h3>

                  <p>
                    Qty {item.quantity} × LKR {item.price.toLocaleString()}
                  </p>
                </div>

                <strong>
                  LKR {(item.price * item.quantity).toLocaleString()}
                </strong>
              </div>
            ))}
          </div>

          <div className="fx-summary-totals">
            <div>
              <span>Subtotal</span>
              <strong>LKR {cartTotal.toLocaleString()}</strong>
            </div>

            <div>
              <span>Delivery Fee</span>
              <strong>LKR {deliveryFee.toLocaleString()}</strong>
            </div>

            <div>
              <span>Service Fee</span>
              <strong>LKR {serviceFee.toLocaleString()}</strong>
            </div>

            <div className="grand-total">
              <span>Total</span>
              <strong>LKR {grandTotal.toLocaleString()}</strong>
            </div>
          </div>

          <Link to="/cart" className="fx-back-cart-link">
            ← Back to Cart
          </Link>
        </aside>
      </section>
    </main>
  );
}