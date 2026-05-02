import { User } from "../../types";

export default function DriversPage() {
  const users: Array<User & { password?: string }> = JSON.parse(
    localStorage.getItem("food_ordering_users") || "[]"
  );

  const drivers = users.filter((user) => user.role === "DRIVER");

  return (
    <div className="p-8 bg-slate-100 min-h-screen">
      <h1 className="text-3xl font-bold text-slate-800">Registered Drivers</h1>

      <div className="mt-6 bg-white rounded-2xl shadow overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-slate-800 text-white">
            <tr>
              <th className="p-4">Name</th>
              <th className="p-4">Email</th>
              <th className="p-4">NIC</th>
              <th className="p-4">Phone</th>
              <th className="p-4">Vehicle</th>
              <th className="p-4">Vehicle No</th>
            </tr>
          </thead>

          <tbody>
            {drivers.length === 0 && (
              <tr>
                <td colSpan={6} className="p-4 text-center text-slate-500">
                  No drivers registered yet.
                </td>
              </tr>
            )}

            {drivers.map((driver) => (
              <tr key={driver.id} className="border-b">
                <td className="p-4">{driver.fullName}</td>
                <td className="p-4">{driver.email}</td>
                <td className="p-4">{driver.nicNumber}</td>
                <td className="p-4">{driver.phone}</td>
                <td className="p-4">{driver.vehicleType}</td>
                <td className="p-4">{driver.vehicleNumber}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}