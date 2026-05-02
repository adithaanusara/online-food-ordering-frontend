import { FormEvent, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Gender } from "../../types";
import { useAuth } from "../../context/AuthContext";

export default function SignUpPage() {
  const navigate = useNavigate();
  const { signUp } = useAuth();

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

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setError("");

    if (!fullName.trim() || !email.trim() || !password.trim()) {
      setError("Full name, email and password are required");
      return;
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters");
      return;
    }

    if (role === "DRIVER") {
      if (
        !nicNumber.trim() ||
        !phone.trim() ||
        !vehicleType.trim() ||
        !vehicleNumber.trim()
      ) {
        setError("Driver details are required");
        return;
      }
    }

    try {
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
      setError(err instanceof Error ? err.message : "Sign up failed");
    }
  };

  return (
    <div className="min-h-screen bg-slate-100 flex items-center justify-center px-4 py-10">
      <div className="bg-white w-full max-w-2xl rounded-2xl shadow-lg p-8">
        <h1 className="text-3xl font-bold text-center text-slate-800">
          Create Account
        </h1>

        <p className="text-center text-slate-500 mt-2">
          Register as a customer or delivery driver
        </p>

        {error && (
          <div className="mt-5 bg-red-100 text-red-700 px-4 py-3 rounded-lg">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="mt-6 space-y-5">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              Register As
            </label>

            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => setRole("CUSTOMER")}
                className={`border rounded-xl py-3 font-semibold ${
                  role === "CUSTOMER"
                    ? "bg-orange-500 text-white border-orange-500"
                    : "bg-white text-slate-700"
                }`}
              >
                Customer
              </button>

              <button
                type="button"
                onClick={() => setRole("DRIVER")}
                className={`border rounded-xl py-3 font-semibold ${
                  role === "DRIVER"
                    ? "bg-orange-500 text-white border-orange-500"
                    : "bg-white text-slate-700"
                }`}
              >
                Driver
              </button>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700">
              Full Name
            </label>
            <input
              type="text"
              className="mt-1 w-full border rounded-lg px-4 py-3"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              placeholder="Enter full name"
            />
          </div>

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
              placeholder="Minimum 6 characters"
            />
          </div>

          {role === "DRIVER" && (
            <div className="border-t pt-5">
              <h2 className="text-xl font-bold text-slate-800 mb-4">
                Driver Details
              </h2>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700">
                    NIC Number
                  </label>
                  <input
                    type="text"
                    className="mt-1 w-full border rounded-lg px-4 py-3"
                    value={nicNumber}
                    onChange={(e) => setNicNumber(e.target.value)}
                    placeholder="Enter NIC number"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700">
                    Gender
                  </label>
                  <select
                    className="mt-1 w-full border rounded-lg px-4 py-3"
                    value={gender}
                    onChange={(e) => setGender(e.target.value as Gender)}
                  >
                    <option value="MALE">Male</option>
                    <option value="FEMALE">Female</option>
                    <option value="OTHER">Other</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700">
                    Phone Number
                  </label>
                  <input
                    type="text"
                    className="mt-1 w-full border rounded-lg px-4 py-3"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="0771234567"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700">
                    Vehicle Type
                  </label>
                  <input
                    type="text"
                    className="mt-1 w-full border rounded-lg px-4 py-3"
                    value={vehicleType}
                    onChange={(e) => setVehicleType(e.target.value)}
                    placeholder="Bike / Three Wheeler / Car"
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-slate-700">
                    Vehicle Number
                  </label>
                  <input
                    type="text"
                    className="mt-1 w-full border rounded-lg px-4 py-3"
                    value={vehicleNumber}
                    onChange={(e) => setVehicleNumber(e.target.value)}
                    placeholder="ABC-1234"
                  />
                </div>
              </div>
            </div>
          )}

          <button
            type="submit"
            className="w-full bg-orange-500 hover:bg-orange-600 text-white font-bold py-3 rounded-lg"
          >
            Sign Up
          </button>
        </form>

        <p className="text-center text-slate-600 mt-5">
          Already have an account?{" "}
          <Link to="/signin" className="text-orange-600 font-semibold">
            Sign In
          </Link>
        </p>
      </div>
    </div>
  );
}