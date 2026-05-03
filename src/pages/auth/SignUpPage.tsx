import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Gender } from "../../types";
import { useAuth } from "../../context/AuthContext";

export default function SignUpPage() {
  const { signUp } = useAuth();
  const navigate = useNavigate();

  const [role, setRole] = useState<"CUSTOMER" | "DRIVER">("CUSTOMER");

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [nicNumber, setNicNumber] = useState("");
  const [gender, setGender] = useState<Gender>("MALE");
  const [phone, setPhone] = useState("");
  const [vehicleType, setVehicleType] = useState("");
  const [vehicleNumber, setVehicleNumber] = useState("");

  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  function submit(e: React.FormEvent) {
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

      signUp({
        fullName,
        email,
        password,
        role,
        nicNumber: role === "DRIVER" ? nicNumber : undefined,
        gender: role === "DRIVER" ? gender : undefined,
        phone: role === "DRIVER" ? phone : undefined,
        vehicleType: role === "DRIVER" ? vehicleType : undefined,
        vehicleNumber: role === "DRIVER" ? vehicleNumber : undefined,
      });

      if (role === "DRIVER") {
        navigate("/driver/dashboard");
      } else {
        navigate("/customer/dashboard");
      }
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Unable to create account."
      );
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="auth-screen">
      <div className="auth-top-image auth-top-image-signup"></div>
      <div className="auth-image-overlay"></div>

      <div className="smoke smoke-1"></div>
      <div className="smoke smoke-2"></div>
      <div className="smoke smoke-3"></div>
      <div className="smoke smoke-4"></div>

      <div className="auth-panel">
        <div className="auth-brand-row">
          <Link to="/" className="auth-brand">
            FoodExpress
          </Link>
        </div>

        <div className="auth-content auth-content-signup">
          <div className="auth-title-wrap">
            <h1 className="auth-title auth-title-small">Sign Up</h1>
            <p className="auth-subtitle">Join us and start ordering today!</p>
          </div>

          <form onSubmit={submit} className="auth-form">
            {error && <div className="auth-error">{error}</div>}

            <div className="auth-role-select">
              <button
                type="button"
                onClick={() => setRole("CUSTOMER")}
                className={role === "CUSTOMER" ? "active" : ""}
              >
                Customer
              </button>

              <button
                type="button"
                onClick={() => setRole("DRIVER")}
                className={role === "DRIVER" ? "active" : ""}
              >
                Driver
              </button>
            </div>

            <div className="auth-field">
              <span className="auth-icon">👤</span>
              <input
                type="text"
                placeholder="Full Name"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                autoComplete="name"
              />
            </div>

            <div className="auth-field">
              <span className="auth-icon">✉️</span>
              <input
                type="email"
                placeholder="Email Address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                autoComplete="email"
              />
            </div>

            <div className="auth-field">
              <span className="auth-icon">🔒</span>
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                autoComplete="new-password"
              />
            </div>

            {role === "DRIVER" && (
              <>
                <div className="auth-field">
                  <span className="auth-icon">🪪</span>
                  <input
                    type="text"
                    placeholder="NIC Number"
                    value={nicNumber}
                    onChange={(e) => setNicNumber(e.target.value)}
                  />
                </div>

                <div className="auth-field">
                  <span className="auth-icon">⚧</span>
                  <select
                    value={gender}
                    onChange={(e) => setGender(e.target.value as Gender)}
                  >
                    <option value="MALE">Male</option>
                    <option value="FEMALE">Female</option>
                    <option value="OTHER">Other</option>
                  </select>
                </div>

                <div className="auth-field">
                  <span className="auth-icon">📞</span>
                  <input
                    type="text"
                    placeholder="Phone Number"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                  />
                </div>

                <div className="auth-field">
                  <span className="auth-icon">🏍️</span>
                  <input
                    type="text"
                    placeholder="Vehicle Type"
                    value={vehicleType}
                    onChange={(e) => setVehicleType(e.target.value)}
                  />
                </div>

                <div className="auth-field">
                  <span className="auth-icon">🔢</span>
                  <input
                    type="text"
                    placeholder="Vehicle Number"
                    value={vehicleNumber}
                    onChange={(e) => setVehicleNumber(e.target.value)}
                  />
                </div>
              </>
            )}

            <button
              type="submit"
              className="auth-submit-btn"
              disabled={submitting}
            >
              {submitting ? "Creating..." : "Create Account"}
            </button>
          </form>

          <p className="auth-switch-text">
            Already have an account?{" "}
            <Link to="/signin" className="auth-switch-link">
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}