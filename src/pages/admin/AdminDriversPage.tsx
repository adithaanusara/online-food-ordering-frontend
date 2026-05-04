import { authService } from "../../services/authService";

export default function AdminDriversPage() {
  const drivers = authService.getUsersByRole("DRIVER");

  return (
    <main className="fx-admin-page">
      <div className="fx-admin-glow glow-one"></div>
      <div className="fx-admin-glow glow-two"></div>

      <section className="fx-admin-list-hero">
        <span className="fx-admin-mini">Admin Drivers</span>
        <h1>Registered Drivers</h1>
        <p>
          View driver account details, NIC, gender, phone number and vehicle
          information.
        </p>
      </section>

      {drivers.length === 0 ? (
        <section className="fx-admin-empty-box">
          <span>🏍️</span>
          <h2>No drivers found</h2>
          <p>Driver accounts will appear here after registration.</p>
        </section>
      ) : (
        <section className="fx-admin-user-grid">
          {drivers.map((driver) => (
            <article className="fx-admin-user-card" key={driver.id}>
              <div className="fx-admin-user-avatar">🏍️</div>

              <h2>{driver.fullName || driver.name || "Driver"}</h2>
              <p>{driver.email}</p>

              <div className="fx-admin-user-info">
                <span>
                  <b>NIC:</b> {driver.nicNumber || driver.nic || "N/A"}
                </span>

                <span>
                  <b>Gender:</b> {driver.gender || "N/A"}
                </span>

                <span>
                  <b>Phone:</b> {driver.phone || "N/A"}
                </span>

                <span>
                  <b>Vehicle:</b> {driver.vehicleType || "N/A"}
                </span>

                <span>
                  <b>Vehicle No:</b> {driver.vehicleNumber || "N/A"}
                </span>
              </div>
            </article>
          ))}
        </section>
      )}
    </main>
  );
}