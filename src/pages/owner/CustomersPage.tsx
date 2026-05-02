import { User } from "../../types";

export default function CustomersPage() {
  const users: Array<User & { password?: string }> = JSON.parse(
    localStorage.getItem("food_ordering_users") || "[]"
  );

  const customers = users.filter((user) => user.role === "CUSTOMER");

  return (
    <div className="p-8 bg-slate-100 min-h-screen">
      <h1 className="text-3xl font-bold text-slate-800">
        Registered Customers
      </h1>

      <div className="mt-6 bg-white rounded-2xl shadow overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-slate-800 text-white">
            <tr>
              <th className="p-4">Name</th>
              <th className="p-4">Email</th>
              <th className="p-4">Role</th>
            </tr>
          </thead>

          <tbody>
            {customers.length === 0 && (
              <tr>
                <td colSpan={3} className="p-4 text-center text-slate-500">
                  No customers registered yet.
                </td>
              </tr>
            )}

            {customers.map((customer) => (
              <tr key={customer.id} className="border-b">
                <td className="p-4">{customer.fullName}</td>
                <td className="p-4">{customer.email}</td>
                <td className="p-4">{customer.role}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}