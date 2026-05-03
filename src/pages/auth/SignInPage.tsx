import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

export default function SignInPage() {
  const { signIn } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  function goToCorrectDashboard() {
    const currentUser = JSON.parse(
      localStorage.getItem("food_ordering_current_user") || "null"
    );

    if (currentUser?.role === "OWNER") {
      navigate("/owner/dashboard");
    } else if (currentUser?.role === "DRIVER") {
      navigate("/driver/dashboard");
    } else {
      navigate("/customer/dashboard");
    }
  }

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setError("");

    if (!email.trim() || !password.trim()) {
      setError("Email and password are required.");
      return;
    }

    try {
      setSubmitting(true);

      signIn({
        email,
        password,
      });

      goToCorrectDashboard();
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Unable to sign in. Try again."
      );
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="auth-screen">
      <div className="auth-top-image auth-top-image-signin"></div>
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

        <div className="auth-content">
          <div className="auth-title-wrap">
            <h1 className="auth-title">Delicious</h1>
            <p className="auth-subtitle">Recipes for every day!</p>
          </div>

          <form onSubmit={submit} className="auth-form">
            {error && <div className="auth-error">{error}</div>}

            <div className="auth-field">
              <span className="auth-icon">👤</span>
              <input
                type="email"
                placeholder="Login"
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
                autoComplete="current-password"
              />
            </div>

            <button
              type="submit"
              className="auth-submit-btn"
              disabled={submitting}
            >
              {submitting ? "Signing In..." : "Sign In"}
            </button>
          </form>

          <div className="auth-demo-box">
            <p>Owner Login</p>
            <span>Email: owner@food.com</span>
            <span>Password: owner123</span>
          </div>

          <p className="auth-switch-text">
            Don&apos;t have an account?{" "}
            <Link to="/signup" className="auth-switch-link">
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}