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

    if (password.trim().length < 6) {
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
      } else if (userRole === "ADMIN") {
        navigate("/admin/dashboard");
      } else if (userRole === "OWNER") {
        navigate("/owner/dashboard");
      } else {
        navigate("/customer/dashboard");
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unable to create account.");
    } finally {
      setSubmitting(false);
    }
  }

  function handleGoogleSignup() {
    setError("Google signup is not connected for this local project demo.");
  }

  function handleFacebookSignup() {
    setError("Facebook signup is not connected for this local project demo.");
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
            Sign up now and enjoy premium meals, quick ordering and a stylish
            FoodExpress experience.
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
        <div className="premium-auth-card">
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

          <form onSubmit={submit} className="premium-form">
            {error && <div className="premium-error">{error}</div>}

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
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                autoComplete="new-password"
              />

              <button
                type="button"
                className="password-eye-btn"
                onClick={() => setShowPassword((prev) => !prev)}
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? "🙈" : "👁"}
              </button>
            </label>

            {role === "DRIVER" && (
              <div className="driver-fields">
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
                  <span>⚥</span>

                  <select
                    value={gender}
                    onChange={(e) => setGender(e.target.value)}
                  >
                    <option value="MALE">Male</option>
                    <option value="FEMALE">Female</option>
                  </select>
                </label>

                <label className="premium-input">
                  <span>📞</span>

                  <input
                    type="tel"
                    placeholder="Phone Number"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                  />
                </label>

                <label className="premium-input">
                  <span>🏍</span>

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
              </div>
            )}

            <button
              type="submit"
              className="premium-submit"
              disabled={submitting}
            >
              {submitting ? "Creating Account..." : "Create Account"}
            </button>
          </form>

          <div className="premium-or">
            <span></span>
            <p>or continue with</p>
            <span></span>
          </div>

          <div className="premium-socials">
            <button type="button" onClick={handleGoogleSignup}>
              <span className="google-logo-icon">G</span>
              <span>Google</span>
            </button>

            <button type="button" onClick={handleFacebookSignup}>
              <span className="facebook-logo-icon">f</span>
              <span>Facebook</span>
            </button>
          </div>

          <p className="premium-switch">
            Already have an account? <Link to="/signin">Sign In</Link>
          </p>
        </div>
      </section>
    </div>
  );
}