import { authService } from "../../services/authService";

export default function AdminCustomersPage() {
  const customers = authService.getUsersByRole("CUSTOMER");

  return (
    <main className="fx-admin-page">
      <div className="fx-admin-glow glow-one"></div>
      <div className="fx-admin-glow glow-two"></div>

      <section className="fx-admin-list-hero">
        <span className="fx-admin-mini">Admin Customers</span>
        <h1>Registered Customers</h1>
        <p>View all registered customer accounts in FoodExpress.</p>
      </section>

      {customers.length === 0 ? (
        <section className="fx-admin-empty-box">
          <span>👥</span>
          <h2>No customers found</h2>
          <p>Customer accounts will appear here after registration.</p>
        </section>
      ) : (
        <section className="fx-admin-user-grid">
          {customers.map((customer) => (
            <article className="fx-admin-user-card" key={customer.id}>
              <div className="fx-admin-user-avatar">👤</div>

              <h2>{customer.fullName || customer.name || "Customer"}</h2>
              <p>{customer.email}</p>

              <div className="fx-admin-user-info">
                <span>
                  <b>Phone:</b> {customer.phone || "N/A"}
                </span>

                <span>
                  <b>Role:</b> {customer.role}
                </span>
              </div>
            </article>
          ))}
        </section>
      )}
    </main>
  );
}