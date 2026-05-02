import { useState } from "react";

interface Order {
  id: string;
  customerName: string;
  address: string;
  amount: number;
  status: string;
  driver?: string;
}

export default function OwnerOrdersPage() {
  const [orders, setOrders] = useState<Order[]>([
    {
      id: "ORD-1001",
      customerName: "Kasun Perera",
      address: "Colombo 03",
      amount: 2500,
      status: "PENDING",
    },
    {
      id: "ORD-1002",
      customerName: "Nimal Silva",
      address: "Nugegoda",
      amount: 1800,
      status: "PREPARING",
    },
  ]);

  const updateStatus = (id: string, status: string) => {
    setOrders(
      orders.map((order) =>
        order.id === id
          ? {
              ...order,
              status,
            }
          : order
      )
    );
  };

  const assignDriver = (id: string) => {
    setOrders(
      orders.map((order) =>
        order.id === id
          ? {
              ...order,
              driver: "Assigned Driver",
              status: "ASSIGNED_TO_DRIVER",
            }
          : order
      )
    );
  };

  return (
    <div className="p-8 bg-slate-100 min-h-screen">
      <h1 className="text-3xl font-bold text-slate-800">Manage Orders</h1>

      <div className="grid gap-5 mt-6">
        {orders.map((order) => (
          <div key={order.id} className="bg-white p-6 rounded-2xl shadow">
            <div className="flex justify-between">
              <div>
                <h2 className="text-xl font-bold text-slate-800">
                  {order.id}
                </h2>
                <p className="text-slate-600">Customer: {order.customerName}</p>
                <p className="text-slate-600">Address: {order.address}</p>
                <p className="text-slate-600">Amount: Rs. {order.amount}</p>
                <p className="text-slate-600">
                  Driver: {order.driver || "Not assigned"}
                </p>
              </div>

              <span className="bg-orange-100 text-orange-700 px-4 py-2 rounded-full h-fit">
                {order.status}
              </span>
            </div>

            <div className="flex flex-wrap gap-3 mt-5">
              <button
                onClick={() => updateStatus(order.id, "ACCEPTED")}
                className="bg-blue-500 text-white px-4 py-2 rounded-lg"
              >
                Accept
              </button>

              <button
                onClick={() => updateStatus(order.id, "PREPARING")}
                className="bg-yellow-500 text-white px-4 py-2 rounded-lg"
              >
                Preparing
              </button>

              <button
                onClick={() => updateStatus(order.id, "READY")}
                className="bg-purple-500 text-white px-4 py-2 rounded-lg"
              >
                Ready
              </button>

              <button
                onClick={() => assignDriver(order.id)}
                className="bg-green-500 text-white px-4 py-2 rounded-lg"
              >
                Assign Driver
              </button>

              <button
                onClick={() => updateStatus(order.id, "CANCELLED")}
                className="bg-red-500 text-white px-4 py-2 rounded-lg"
              >
                Cancel
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}