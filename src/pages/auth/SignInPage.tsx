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

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setError("");

    if (!email.trim() || !password.trim()) {
      setError("Email and password are required.");
      return;
    }

    try {
      setSubmitting(true);

      const loggedUser = await signIn({
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

  function handleGoogleLogin() {
    setError("Google login is not connected for this local project demo.");
  }

  function handleFacebookLogin() {
    setError("Facebook login is not connected for this local project demo.");
  }

  return (
    <main className="premium-auth-page">
      <div className="gold-line gold-line-one"></div>
      <div className="gold-line gold-line-two"></div>
      <div className="gold-dot dot-one"></div>
      <div className="gold-dot dot-two"></div>
      <div className="gold-dot dot-three"></div>

      <section className="premium-auth-shell">
        <aside className="premium-auth-poster">
          <div className="poster-food-circle poster-food-one"></div>
          <div className="poster-food-circle poster-food-two"></div>

          <div className="poster-brand">
            <div className="poster-logo-icon">♨</div>
            <h1>FoodExpress</h1>
            <p>FOOD EXPERIENCE</p>
          </div>

          <div className="poster-main-copy">
            <h2>
              GOOD <span>FOOD</span>
              <br />
              GOOD <span>MOOD</span>
            </h2>

            <div className="poster-divider">
              <span></span>
              <b>🍽</b>
              <span></span>
            </div>

            <p>
              Discover delicious foods, quick ordering and a premium delivery
              experience.
            </p>
          </div>

          <div className="poster-features">
            <div>
              <span>⭐</span>
              <strong>BEST QUALITY</strong>
              <small>Premium meals</small>
            </div>

            <div>
              <span>🚚</span>
              <strong>FAST DELIVERY</strong>
              <small>Quick orders</small>
            </div>

            <div>
              <span>🎁</span>
              <strong>EXCLUSIVE</strong>
              <small>Special deals</small>
            </div>
          </div>
        </aside>

        <section className="premium-auth-card">
          <div className="premium-tabs">
            <Link to="/signin" className="active">
              Login
            </Link>

            <Link to="/signup">Sign Up</Link>
          </div>

          <div className="premium-title-divider">
            <span></span>
            <b>🍽</b>
            <span></span>
          </div>

          <div className="premium-form-heading">
            <h2>Welcome Back!</h2>
            <p>Login to continue your food journey</p>
          </div>

          {error && <div className="premium-error">{error}</div>}

          <form onSubmit={submit} className="premium-auth-form">
            <label className="premium-input-wrap">
              <span className="input-icon">👤</span>

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
                autoComplete="current-password"
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

            <div className="premium-forgot-row">
              <button type="button">Forgot Password?</button>
            </div>

            <button
              type="submit"
              className="premium-submit-btn"
              disabled={submitting}
            >
              {submitting ? "Logging in..." : "Login"}
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
            Don&apos;t have an account? <Link to="/signup">Sign Up</Link>
          </p>
        </section>
      </section>
    </main>
  );
}