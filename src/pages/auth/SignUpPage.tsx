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
    <div className="premium-auth-page">
      <div className="premium-gold-lines">
        <span className="gold-line gold-line-one"></span>
        <span className="gold-line gold-line-two"></span>
        <span className="gold-line gold-line-three"></span>
      </div>

      <div className="premium-particles">
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
      </div>

      <section className="premium-auth-showcase premium-food-poster">
  <Link to="/" className="premium-auth-logo premium-poster-logo">
    <span className="chef-icon">♨</span>
    <strong>FoodExpress</strong>
    <small>FOOD EXPERIENCE</small>
  </Link>

  <div className="premium-poster-text">
    <p className="poster-mini">Create your</p>
    <h1>
      Favorite <span>Food</span>
    </h1>
    <p className="poster-sub">account today</p>
    <p className="poster-description">
      Sign up now and enjoy premium meals, quick ordering, and a stylish food
      experience.
    </p>
  </div>

  <div className="poster-orbit-system">
    <div className="poster-orbit orbit-1">
      <div className="poster-plate poster-plate-1"></div>
    </div>

    <div className="poster-orbit orbit-2">
      <div className="poster-plate poster-plate-2"></div>
    </div>

    <div className="poster-orbit orbit-3">
      <div className="poster-plate poster-plate-3"></div>
    </div>

    <div className="poster-orbit orbit-4">
      <div className="poster-plate poster-plate-4"></div>
    </div>

    <div className="poster-orbit orbit-5">
      <div className="poster-plate poster-plate-5"></div>
    </div>
  </div>
</section>

      <section className="premium-auth-card-wrap">
        <div className="premium-auth-card premium-signup-card">
          <div className="premium-tabs">
            <Link to="/signin">Login</Link>
            <Link to="/signup" className="active">
              Sign Up
            </Link>
          </div>

          <div className="premium-card-divider">
            <span></span>
            <b>🍽</b>
            <span></span>
          </div>

          <div className="premium-card-title">
            <h2>Create Account</h2>
            <p>Join us and start your food journey</p>
          </div>

          <form onSubmit={submit} className="premium-form">
            {error && <div className="premium-error">{error}</div>}

            <div className="premium-role-select">
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

            <label className="premium-input">
              <span>👤</span>
              <input
                type="text"
                placeholder="Full Name"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                autoComplete="name"
              />
            </label>

            <label className="premium-input">
              <span>✉️</span>
              <input
                type="email"
                placeholder="Email Address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                autoComplete="email"
              />
            </label>

            <label className="premium-input">
              <span>🔒</span>
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                autoComplete="new-password"
              />
            </label>

            {role === "DRIVER" && (
              <>
                <label className="premium-input">
                  <span>🪪</span>
                  <input
                    type="text"
                    placeholder="NIC Number"
                    value={nicNumber}
                    onChange={(e) => setNicNumber(e.target.value)}
                  />
                </label>

                <label className="premium-input">
                  <span>⚧</span>
                  <select
                    value={gender}
                    onChange={(e) => setGender(e.target.value as Gender)}
                  >
                    <option value="MALE">Male</option>
                    <option value="FEMALE">Female</option>
                    <option value="OTHER">Other</option>
                  </select>
                </label>

                <label className="premium-input">
                  <span>📞</span>
                  <input
                    type="text"
                    placeholder="Phone Number"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                  />
                </label>

                <label className="premium-input">
                  <span>🏍️</span>
                  <input
                    type="text"
                    placeholder="Vehicle Type"
                    value={vehicleType}
                    onChange={(e) => setVehicleType(e.target.value)}
                  />
                </label>

                <label className="premium-input">
                  <span>🔢</span>
                  <input
                    type="text"
                    placeholder="Vehicle Number"
                    value={vehicleNumber}
                    onChange={(e) => setVehicleNumber(e.target.value)}
                  />
                </label>
              </>
            )}

            <button
              type="submit"
              className="premium-submit"
              disabled={submitting}
            >
              {submitting ? "Creating..." : "Create Account"}
            </button>
          </form>

          <p className="premium-switch">
            Already have an account? <Link to="/signin">Sign In</Link>
          </p>
        </div>
      </section>
    </div>
  );
}