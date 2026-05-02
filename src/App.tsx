import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Navbar from "./components/layout/Navbar";
import ProtectedRoute from "./components/routes/ProtectedRoute";

import SignInPage from "./pages/auth/SignInPage";
import SignUpPage from "./pages/auth/SignUpPage";

import CustomerDashboardPage from "./pages/customer/CustomerDashboardPage";
import DriverDashboardPage from "./pages/driver/DriverDashboardPage";
import DriverOrdersPage from "./pages/driver/DriverOrdersPage";
import DeliveryHistoryPage from "./pages/driver/DeliveryHistoryPage";

import OwnerDashboardPage from "./pages/owner/OwnerDashboardPage";
import ManageFoodsPage from "./pages/owner/ManageFoodsPage";
import OwnerOrdersPage from "./pages/owner/OwnerOrdersPage";
import DriversPage from "./pages/owner/DriversPage";
import CustomersPage from "./pages/owner/CustomersPage";

import UnauthorizedPage from "./pages/UnauthorizedPage";

export default function App() {
  return (
    <BrowserRouter>
      <Navbar />

      <Routes>
        <Route path="/" element={<Navigate to="/signin" replace />} />

        <Route path="/signin" element={<SignInPage />} />
        <Route path="/signup" element={<SignUpPage />} />

        <Route path="/unauthorized" element={<UnauthorizedPage />} />

        <Route
          path="/customer/dashboard"
          element={
            <ProtectedRoute allowedRoles={["CUSTOMER"]}>
              <CustomerDashboardPage />
            </ProtectedRoute>
          }
        />

        <Route
          path="/driver/dashboard"
          element={
            <ProtectedRoute allowedRoles={["DRIVER"]}>
              <DriverDashboardPage />
            </ProtectedRoute>
          }
        />

        <Route
          path="/driver/orders"
          element={
            <ProtectedRoute allowedRoles={["DRIVER"]}>
              <DriverOrdersPage />
            </ProtectedRoute>
          }
        />

        <Route
          path="/driver/history"
          element={
            <ProtectedRoute allowedRoles={["DRIVER"]}>
              <DeliveryHistoryPage />
            </ProtectedRoute>
          }
        />

        <Route
          path="/owner/dashboard"
          element={
            <ProtectedRoute allowedRoles={["OWNER"]}>
              <OwnerDashboardPage />
            </ProtectedRoute>
          }
        />

        <Route
          path="/owner/foods"
          element={
            <ProtectedRoute allowedRoles={["OWNER"]}>
              <ManageFoodsPage />
            </ProtectedRoute>
          }
        />

        <Route
          path="/owner/orders"
          element={
            <ProtectedRoute allowedRoles={["OWNER"]}>
              <OwnerOrdersPage />
            </ProtectedRoute>
          }
        />

        <Route
          path="/owner/drivers"
          element={
            <ProtectedRoute allowedRoles={["OWNER"]}>
              <DriversPage />
            </ProtectedRoute>
          }
        />

        <Route
          path="/owner/customers"
          element={
            <ProtectedRoute allowedRoles={["OWNER"]}>
              <CustomersPage />
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}