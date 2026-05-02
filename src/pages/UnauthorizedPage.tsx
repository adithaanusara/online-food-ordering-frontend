import { Link } from "react-router-dom";

export default function UnauthorizedPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-slate-100">
      <h1 className="text-4xl font-bold text-red-600">Unauthorized Access</h1>
      <p className="mt-3 text-slate-600">
        You do not have permission to access this page.
      </p>

      <Link
        to="/signin"
        className="mt-6 bg-orange-500 text-white px-5 py-3 rounded-lg"
      >
        Go to Sign In
      </Link>
    </div>
  );
}