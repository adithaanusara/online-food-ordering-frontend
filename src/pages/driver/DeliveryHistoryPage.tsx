export default function DeliveryHistoryPage() {
  const history = [
    {
      id: "ORD-0998",
      customerName: "Amal Fernando",
      address: "Rajagiriya",
      amount: 3200,
      status: "DELIVERED",
    },
    {
      id: "ORD-0999",
      customerName: "Saman Kumara",
      address: "Kollupitiya",
      amount: 1500,
      status: "DELIVERED",
    },
  ];

  return (
    <div className="p-8 bg-slate-100 min-h-screen">
      <h1 className="text-3xl font-bold text-slate-800">Delivery History</h1>

      <div className="mt-6 bg-white rounded-2xl shadow overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-slate-800 text-white">
            <tr>
              <th className="p-4">Order ID</th>
              <th className="p-4">Customer</th>
              <th className="p-4">Address</th>
              <th className="p-4">Amount</th>
              <th className="p-4">Status</th>
            </tr>
          </thead>

          <tbody>
            {history.map((order) => (
              <tr key={order.id} className="border-b">
                <td className="p-4">{order.id}</td>
                <td className="p-4">{order.customerName}</td>
                <td className="p-4">{order.address}</td>
                <td className="p-4">Rs. {order.amount}</td>
                <td className="p-4 text-green-600 font-semibold">
                  {order.status}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}