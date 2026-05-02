export default function MyOrdersPage() {
  const orders = JSON.parse(localStorage.getItem("food_orders") || "[]");

  return (
    <div className="p-8 bg-slate-100 min-h-screen">
      <h1 className="text-3xl font-bold text-slate-800">My Orders</h1>

      {orders.length === 0 ? (
        <div className="bg-white rounded-2xl shadow p-8 mt-6 text-center text-slate-600">
          No orders placed yet.
        </div>
      ) : (
        <div className="grid gap-5 mt-6">
          {orders.map((order: any) => (
            <div key={order.id} className="bg-white rounded-2xl shadow p-6">
              <div className="flex justify-between">
                <div>
                  <h2 className="text-xl font-bold text-slate-800">
                    {order.id}
                  </h2>
                  <p className="text-slate-600 mt-1">
                    Address: {order.address}
                  </p>
                  <p className="text-slate-600">
                    Payment: {order.paymentMethod}
                  </p>
                  <p className="text-slate-600">Date: {order.createdAt}</p>
                </div>

                <span className="bg-orange-100 text-orange-700 px-4 py-2 rounded-full h-fit">
                  {order.status}
                </span>
              </div>

              <div className="mt-5 border-t pt-4">
                {order.items.map((item: any) => (
                  <div key={item.id} className="flex justify-between py-2">
                    <span>
                      {item.name} x {item.quantity}
                    </span>
                    <span>Rs. {item.price * item.quantity}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
