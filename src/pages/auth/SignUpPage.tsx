import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

type SignUpRole = "CUSTOMER" | "DRIVER";

export default function SignUpPage() {
  const { signUp } = useAuth();
  const navigate = useNavigate();

  const [role, setRole] = useState<SignUpRole>("CUSTOMER");

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [nicNumber, setNicNumber] = useState("");
  const [gender, setGender] = useState("MALE");
  const [phone, setPhone] = useState("");
  const [vehicleType, setVehicleType] = useState("");
  const [vehicleNumber, setVehicleNumber] = useState("");

  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setError("");

    if (!fullName.trim() || !email.trim() || !password.trim()) {
      setError("Full name, email and password are required.");
      return;
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }

    if (role === "DRIVER") {
      if (
        !nicNumber.trim() ||
        !phone.trim() ||
        !vehicleType.trim() ||
        !vehicleNumber.trim()
      ) {
        setError("Driver details are required.");
        return;
      }
    }

    try {
      setSubmitting(true);

      const createdUser = await signUp({
        fullName: fullName.trim(),
        email: email.trim(),
        password: password.trim(),
        role,
        nicNumber: role === "DRIVER" ? nicNumber.trim() : undefined,
        gender: role === "DRIVER" ? gender : undefined,
        phone: role === "DRIVER" ? phone.trim() : undefined,
        vehicleType: role === "DRIVER" ? vehicleType.trim() : undefined,
        vehicleNumber: role === "DRIVER" ? vehicleNumber.trim() : undefined,
      });

      const userRole = String(createdUser.role || role).toUpperCase();

      if (userRole === "DRIVER") {
        navigate("/driver/dashboard");
      } else {
        navigate("/customer/dashboard");
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unable to create account.");
    } finally {
      setSubmitting(false);
    }
  }

  function handleGoogleLogin() {
    setError("Google signup is not connected for this local project demo.");
  }

  function handleFacebookLogin() {
    setError("Facebook signup is not connected for this local project demo.");
  }

  return (
    <main className="premium-auth-page">
      <div className="gold-line gold-line-one"></div>
      <div className="gold-line gold-line-two"></div>
      <div className="gold-dot dot-one"></div>
      <div className="gold-dot dot-two"></div>
      <div className="gold-dot dot-three"></div>

      <section className="premium-auth-shell">
        <aside className="premium-auth-poster signup-poster">
          <div className="poster-food-circle poster-food-one"></div>
          <div className="poster-food-circle poster-food-two"></div>

          <div className="poster-brand">
            <div className="poster-logo-icon">♨</div>
            <h1>FoodExpress</h1>
            <p>FOOD EXPERIENCE</p>
          </div>

          <div className="poster-main-copy signup-copy">
            <h2>
              JOIN <span>FOOD</span>
              <br />
              START
              <br />
              <span>ORDERING</span>
            </h2>

            <div className="poster-divider">
              <span></span>
              <b>🍽</b>
              <span></span>
            </div>

            <p>
              Create your account as a customer or driver and enjoy a premium
              FoodExpress experience.
            </p>
          </div>

          <div className="poster-features">
            <div>
              <span>👤</span>
              <strong>CUSTOMER</strong>
              <small>Browse foods and place orders</small>
            </div>

            <div>
              <span>🚚</span>
              <strong>DRIVER</strong>
              <small>View assigned deliveries</small>
            </div>

            <div>
              <span>🏪</span>
              <strong>OWNER</strong>
              <small>Manage food and orders</small>
            </div>
          </div>
        </aside>

        <section className="premium-auth-card">
          <div className="premium-tabs">
            <Link to="/signin">Login</Link>

            <Link to="/signup" className="active">
              Sign Up
            </Link>
          </div>

          <div className="premium-title-divider">
            <span></span>
            <b>🍽</b>
            <span></span>
          </div>

          <div className="premium-form-heading">
            <h2>Create Account</h2>
            <p>Join us and start your food journey</p>
          </div>

          {error && <div className="premium-error">{error}</div>}

          <div className="premium-role-toggle">
            <button
              type="button"
              className={role === "CUSTOMER" ? "active" : ""}
              onClick={() => setRole("CUSTOMER")}
            >
              Customer
            </button>

            <button
              type="button"
              className={role === "DRIVER" ? "active" : ""}
              onClick={() => setRole("DRIVER")}
            >
              Driver
            </button>
          </div>

          <form onSubmit={submit} className="premium-auth-form">
            <label className="premium-input-wrap">
              <span className="input-icon">👤</span>

              <input
                type="text"
                placeholder="Full Name"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                autoComplete="name"
              />
            </label>

            <label className="premium-input-wrap">
              <span className="input-icon">✉️</span>

              <input
                type="email"
                placeholder="Email Address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                autoComplete="email"
              />
            </label>

            <label className="premium-input-wrap">
              <span className="input-icon">🔒</span>

              <input
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                autoComplete="new-password"
              />

              <button
                type="button"
                className="password-eye-btn"
                onClick={() => setShowPassword((value) => !value)}
                aria-label="Toggle password visibility"
              >
                {showPassword ? "🙈" : "👁"}
              </button>
            </label>

            {role === "DRIVER" && (
              <div className="driver-fields">
                <label className="premium-input-wrap">
                  <span className="input-icon">🪪</span>

                  <input
                    type="text"
                    placeholder="NIC Number"
                    value={nicNumber}
                    onChange={(e) => setNicNumber(e.target.value)}
                  />
                </label>

                <label className="premium-input-wrap">
                  <span className="input-icon">⚥</span>

                  <select value={gender} onChange={(e) => setGender(e.target.value)}>
                    <option value="MALE">Male</option>
                    <option value="FEMALE">Female</option>
                  </select>
                </label>

                <label className="premium-input-wrap">
                  <span className="input-icon">📞</span>

                  <input
                    type="tel"
                    placeholder="Phone Number"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                  />
                </label>

                <label className="premium-input-wrap">
                  <span className="input-icon">🏍</span>

                  <input
                    type="text"
                    placeholder="Vehicle Type"
                    value={vehicleType}
                    onChange={(e) => setVehicleType(e.target.value)}
                  />
                </label>

                <label className="premium-input-wrap">
                  <span className="input-icon">🔢</span>

                  <input
                    type="text"
                    placeholder="Vehicle Number"
                    value={vehicleNumber}
                    onChange={(e) => setVehicleNumber(e.target.value)}
                  />
                </label>
              </div>
            )}

            <button
              type="submit"
              className="premium-submit-btn"
              disabled={submitting}
            >
              {submitting ? "Creating Account..." : "Create Account"}
            </button>
          </form>

          <div className="premium-social-divider">
            <span></span>
            <p>or continue with</p>
            <span></span>
          </div>

          <div className="premium-socials">
            <button type="button" onClick={handleGoogleLogin}>
              <span className="google-logo">G</span>
              Google
            </button>

            <button type="button" onClick={handleFacebookLogin}>
              <span className="facebook-logo">f</span>
              Facebook
            </button>
          </div>

          <p className="premium-switch">
            Already have an account? <Link to="/signin">Sign In</Link>
          </p>
        </section>
      </section>
    </main>
  );
}