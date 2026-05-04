import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

export default function SignInPage() {
  const { signIn } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  function goToCorrectDashboard() {
    const currentUser = JSON.parse(
      localStorage.getItem("food_ordering_current_user") || "null"
    );

    const role = String(currentUser?.role || "").toUpperCase();

    if (role === "ADMIN") {
      navigate("/admin/dashboard");
    } else if (role === "OWNER") {
      navigate("/owner/dashboard");
    } else if (role === "DRIVER") {
      navigate("/driver/dashboard");
    } else if (role === "CUSTOMER") {
      navigate("/customer/dashboard");
    } else {
      navigate("/signin");
    }
  }

function submit(e: React.FormEvent) {
  e.preventDefault();
  setError("");

  if (!email.trim() || !password.trim()) {
    setError("Email and password are required.");
    return;
  }

  try {
    setSubmitting(true);

    const loggedUser = signIn({
      email: email.trim(),
      password: password.trim(),
    });

    const role = String(loggedUser.role || "").toUpperCase();

    if (role === "ADMIN") {
      navigate("/admin/dashboard");
    } else if (role === "OWNER") {
      navigate("/owner/dashboard");
    } else if (role === "DRIVER") {
      navigate("/driver/dashboard");
    } else {
      navigate("/customer/dashboard");
    }
  } catch (err) {
    setError(
      err instanceof Error ? err.message : "Unable to sign in. Try again."
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
          <p className="poster-mini">What is your</p>
          <h1>
            Favorite <span>Food</span>
          </h1>
          <p className="poster-sub">today?</p>
          <p className="poster-description">
            Discover premium meals, fresh flavors and your most loved dishes in
            one place.
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
            <Link to="/signin" className="active">
              Login
            </Link>
            <Link to="/signup">Sign Up</Link>
          </div>

          <div className="premium-card-divider">
            <span></span>
            <b>🍽</b>
            <span></span>
          </div>

          <div className="premium-card-title">
            <h2>Welcome Back!</h2>
            <p>Login to continue your food journey</p>
          </div>

          <form onSubmit={submit} className="premium-form">
            {error && <div className="premium-error">{error}</div>}

            <label className="premium-input">
              <span>👤</span>
              <input
                type="email"
                placeholder="Email or Phone"
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
                autoComplete="current-password"
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

            <div className="premium-forgot">Forgot Password?</div>

            <button
              type="submit"
              className="premium-submit"
              disabled={submitting}
            >
              {submitting ? "Signing In..." : "Login"}
            </button>
          </form>

          <div className="premium-or">
            <span></span>
            <p>or continue with</p>
            <span></span>
          </div>

         <div className="premium-socials">
  <button type="button">
    <span className="google-logo-icon">G</span>
    <span>Google</span>
  </button>

  <button type="button">
    <span className="facebook-logo-icon">f</span>
    <span>Facebook</span>
  </button>
</div>

          <p className="premium-switch">
            Don&apos;t have an account? <Link to="/signup">Sign Up</Link>
          </p>
        </div>
      </section>
    </div>
  );
}