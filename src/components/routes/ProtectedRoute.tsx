import { Navigate } from "react-router-dom";

type ProtectedRouteProps = {
  children: React.ReactNode;
  allowedRoles?: string[];
};

export default function ProtectedRoute({
  children,
  allowedRoles = [],
}: ProtectedRouteProps) {
  const currentUser = JSON.parse(
    localStorage.getItem("food_ordering_current_user") || "null"
  );

  if (!currentUser) {
    return <Navigate to="/signin" replace />;
  }

  if (allowedRoles.length > 0) {
    const userRole = String(currentUser.role || "").toUpperCase();
    const allowed = allowedRoles.map((role) => role.toUpperCase());

    if (!allowed.includes(userRole)) {
      return <Navigate to="/unauthorized" replace />;
    }
  }

  return <>{children}</>;
}