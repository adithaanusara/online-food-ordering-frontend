import { FormEvent, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

export default function SignInPage() {
  const navigate = useNavigate();
  const { signIn } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [error, setError] = useState("");

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setError("");

    if (!email.trim() || !password.trim()) {
      setError("Email and password are required");
      return;
    }

    try {
      const loggedUser = signIn({ email, password });

      /**
       * signIn context function void return නම්,
       * authService use කරන method එක direct return කරන විදිහට
       * AuthContext update කරන්න ඕන.
       */
    } catch (err) {
      setError(err instanceof Error ? err.message : "Sign in failed");
    }
  };

  const handleLogin = (e: FormEvent) => {
    e.preventDefault();
    setError("");

    try {
      signIn({ email, password });

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
    } catch (err) {
      setError(err instanceof Error ? err.message : "Sign in failed");
    }
  };

  return (
    <div className="min-h-screen bg-slate-100 flex items-center justify-center px-4">
      <div className="bg-white w-full max-w-md rounded-2xl shadow-lg p-8">
        <h1 className="text-3xl font-bold text-center text-slate-800">
          Sign In
        </h1>

        <p className="text-center text-slate-500 mt-2">
          Login to your food ordering account
        </p>

        {error && (
          <div className="mt-5 bg-red-100 text-red-700 px-4 py-3 rounded-lg">
            {error}
          </div>
        )}

        <form onSubmit={handleLogin} className="mt-6 space-y-5">
          <div>
            <label className="block text-sm font-medium text-slate-700">
              Email
            </label>
            <input
              type="email"
              className="mt-1 w-full border rounded-lg px-4 py-3"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="example@email.com"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700">
              Password
            </label>
            <input
              type="password"
              className="mt-1 w-full border rounded-lg px-4 py-3"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter password"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-orange-500 hover:bg-orange-600 text-white font-bold py-3 rounded-lg"
          >
            Sign In
          </button>
        </form>

        <div className="mt-5 bg-slate-100 rounded-lg p-4 text-sm text-slate-600">
          <p className="font-semibold text-slate-800">Owner Login:</p>
          <p>Email: owner@food.com</p>
          <p>Password: owner123</p>
        </div>

        <p className="text-center text-slate-600 mt-5">
          Don't have an account?{" "}
          <Link to="/signup" className="text-orange-600 font-semibold">
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
}