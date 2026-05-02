export default function DriverOrdersPage() {
  const assignedOrders = [
    {
      id: "ORD-1001",
      customerName: "Kasun Perera",
      address: "Colombo 03",
      amount: 2500,
      status: "ASSIGNED",
    },
    {
      id: "ORD-1002",
      customerName: "Nimal Silva",
      address: "Nugegoda",
      amount: 1800,
      status: "OUT_FOR_DELIVERY",
    },
  ];

  return (
    <div className="p-8 bg-slate-100 min-h-screen">
      <h1 className="text-3xl font-bold text-slate-800">Assigned Orders</h1>

      <div className="grid gap-5 mt-6">
        {assignedOrders.map((order) => (
          <div key={order.id} className="bg-white p-6 rounded-2xl shadow">
            <div className="flex justify-between">
              <div>
                <h2 className="text-xl font-bold text-slate-800">
                  {order.id}
                </h2>
                <p className="text-slate-600 mt-1">
                  Customer: {order.customerName}
                </p>
                <p className="text-slate-600">Address: {order.address}</p>
                <p className="text-slate-600">Amount: Rs. {order.amount}</p>
              </div>

              <span className="bg-orange-100 text-orange-700 px-4 py-2 rounded-full h-fit">
                {order.status}
              </span>
            </div>

            <div className="flex gap-3 mt-5">
              <button className="bg-blue-500 text-white px-4 py-2 rounded-lg">
                Mark Out for Delivery
              </button>

              <button className="bg-green-500 text-white px-4 py-2 rounded-lg">
                Mark Delivered
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}