export default function OrdersPage() {
  const orders = JSON.parse(localStorage.getItem("food_orders") || "[]");

  return (
    <div className="p-8 bg-slate-100 min-h-screen">
      <h1 className="text-3xl font-bold text-slate-800">My Orders</h1>

      <p className="text-slate-600 mt-2">
        View and track your placed food orders.
      </p>

      {orders.length === 0 ? (
        <div className="bg-white rounded-2xl shadow p-8 mt-6 text-center">
          <p className="text-slate-600">No orders placed yet.</p>
        </div>
      ) : (
        <div className="grid gap-5 mt-6">
          {orders.map((order: any) => {
            const total = order.items.reduce(
              (sum: number, item: any) => sum + item.price * item.quantity,
              0
            );

            return (
              <div key={order.id} className="bg-white rounded-2xl shadow p-6">
                <div className="flex justify-between gap-4">
                  <div>
                    <h2 className="text-xl font-bold text-slate-800">
                      {order.id}
                    </h2>

                    <p className="text-slate-600 mt-1">
                      Address: {order.address}
                    </p>

                    <p className="text-slate-600">
                      Payment Method: {order.paymentMethod}
                    </p>

                    <p className="text-slate-600">
                      Order Date: {order.createdAt}
                    </p>

                    <p className="text-orange-500 font-bold mt-2">
                      Total: Rs. {total}
                    </p>
                  </div>

                  <span className="bg-orange-100 text-orange-700 px-4 py-2 rounded-full h-fit font-semibold">
                    {order.status}
                  </span>
                </div>

                <div className="mt-5 border-t pt-4">
                  <h3 className="font-bold text-slate-800 mb-2">
                    Ordered Items
                  </h3>

                  {order.items.map((item: any) => (
                    <div
                      key={item.id}
                      className="flex justify-between py-2 text-slate-700"
                    >
                      <span>
                        {item.name} x {item.quantity}
                      </span>

                      <span>Rs. {item.price * item.quantity}</span>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}