import { FormEvent, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function CheckoutPage() {
  const navigate = useNavigate();

  const [address, setAddress] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("CASH_ON_DELIVERY");
  const [error, setError] = useState("");

  const handlePlaceOrder = (e: FormEvent) => {
    e.preventDefault();
    setError("");

    const cart = JSON.parse(localStorage.getItem("food_cart") || "[]");

    if (cart.length === 0) {
      setError("Cart is empty");
      return;
    }

    if (!address.trim()) {
      setError("Delivery address is required");
      return;
    }

    const orders = JSON.parse(localStorage.getItem("food_orders") || "[]");

    const newOrder = {
      id: `ORD-${Date.now()}`,
      items: cart,
      address,
      paymentMethod,
      status: "PENDING",
      createdAt: new Date().toLocaleString(),
    };

    localStorage.setItem("food_orders", JSON.stringify([newOrder, ...orders]));
    localStorage.removeItem("food_cart");

    alert("Order placed successfully");
    navigate("/orders/my");
  };

  return (
    <div className="p-8 bg-slate-100 min-h-screen">
      <h1 className="text-3xl font-bold text-slate-800">Checkout</h1>

      <form
        onSubmit={handlePlaceOrder}
        className="bg-white rounded-2xl shadow p-6 mt-6 max-w-xl"
      >
        {error && (
          <div className="bg-red-100 text-red-700 px-4 py-3 rounded-lg mb-5">
            {error}
          </div>
        )}

        <div>
          <label className="block font-semibold text-slate-700">
            Delivery Address
          </label>
          <textarea
            className="mt-2 w-full border rounded-lg px-4 py-3"
            rows={4}
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            placeholder="Enter your delivery address"
          />
        </div>

        <div className="mt-5">
          <label className="block font-semibold text-slate-700">
            Payment Method
          </label>

          <select
            className="mt-2 w-full border rounded-lg px-4 py-3"
            value={paymentMethod}
            onChange={(e) => setPaymentMethod(e.target.value)}
          >
            <option value="CASH_ON_DELIVERY">Cash on Delivery</option>
            <option value="CARD_PAYMENT">Card Payment</option>
          </select>
        </div>

        <button
          type="submit"
          className="mt-6 bg-orange-500 text-white px-6 py-3 rounded-lg font-bold"
        >
          Place Order
        </button>
      </form>
    </div>
  );
}