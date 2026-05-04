import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";

import Navbar from "./components/layout/Navbar";
import ProtectedRoute from "./components/routes/ProtectedRoute";

import HomePage from "./pages/HomePage";

import SignInPage from "./pages/auth/SignInPage";
import SignUpPage from "./pages/auth/SignUpPage";

import CustomerDashboardPage from "./pages/customer/CustomerDashboardPage";

import FoodsPage from "./pages/foods/FoodsPage";
import CartPage from "./pages/cart/CartPage";
import CheckoutPage from "./pages/checkout/CheckoutPage";
import OrdersPage from "./pages/orders/OrdersPage";

import DriverDashboardPage from "./pages/driver/DriverDashboardPage";
import DriverOrdersPage from "./pages/driver/DriverOrdersPage";
import DeliveryHistoryPage from "./pages/driver/DeliveryHistoryPage";

import OwnerDashboardPage from "./pages/owner/OwnerDashboardPage";
import ManageFoodsPage from "./pages/owner/ManageFoodsPage";
import OwnerOrdersPage from "./pages/owner/OwnerOrdersPage";
import DriversPage from "./pages/owner/DriversPage";
import CustomersPage from "./pages/owner/CustomersPage";

import AdminDashboardPage from "./pages/admin/AdminDashboardPage";
import AdminOrdersPage from "./pages/admin/AdminOrdersPage";
import AdminDriversPage from "./pages/admin/AdminDriversPage";
import AdminCustomersPage from "./pages/admin/AdminCustomersPage";

import UnauthorizedPage from "./pages/UnauthorizedPage";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public routes */}
        <Route path="/" element={<HomePage />} />
        <Route path="/signin" element={<SignInPage />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/unauthorized" element={<UnauthorizedPage />} />

        {/* Customer routes */}
        <Route
          path="/customer/dashboard"
          element={
            <>
              <Navbar />
              <ProtectedRoute allowedRoles={["CUSTOMER"]}>
                <CustomerDashboardPage />
              </ProtectedRoute>
            </>
          }
        />

        <Route
          path="/foods"
          element={
            <>
              <Navbar />
              <ProtectedRoute allowedRoles={["CUSTOMER"]}>
                <FoodsPage />
              </ProtectedRoute>
            </>
          }
        />

        <Route
          path="/cart"
          element={
            <>
              <Navbar />
              <ProtectedRoute allowedRoles={["CUSTOMER"]}>
                <CartPage />
              </ProtectedRoute>
            </>
          }
        />

        <Route
          path="/checkout"
          element={
            <>
              <Navbar />
              <ProtectedRoute allowedRoles={["CUSTOMER"]}>
                <CheckoutPage />
              </ProtectedRoute>
            </>
          }
        />

        <Route
          path="/orders"
          element={
            <>
              <Navbar />
              <ProtectedRoute allowedRoles={["CUSTOMER"]}>
                <OrdersPage />
              </ProtectedRoute>
            </>
          }
        />

        {/* Driver routes */}
        <Route
          path="/driver/dashboard"
          element={
            <>
              <Navbar />
              <ProtectedRoute allowedRoles={["DRIVER"]}>
                <DriverDashboardPage />
              </ProtectedRoute>
            </>
          }
        />

        <Route
          path="/driver/orders"
          element={
            <>
              <Navbar />
              <ProtectedRoute allowedRoles={["DRIVER"]}>
                <DriverOrdersPage />
              </ProtectedRoute>
            </>
          }
        />

        <Route
          path="/driver/history"
          element={
            <>
              <Navbar />
              <ProtectedRoute allowedRoles={["DRIVER"]}>
                <DeliveryHistoryPage />
              </ProtectedRoute>
            </>
          }
        />

        {/* Owner routes */}
        <Route
          path="/owner/dashboard"
          element={
            <>
              <Navbar />
              <ProtectedRoute allowedRoles={["OWNER"]}>
                <OwnerDashboardPage />
              </ProtectedRoute>
            </>
          }
        />

        <Route
          path="/owner/foods"
          element={
            <>
              <Navbar />
              <ProtectedRoute allowedRoles={["OWNER"]}>
                <ManageFoodsPage />
              </ProtectedRoute>
            </>
          }
        />

        <Route
          path="/owner/orders"
          element={
            <>
              <Navbar />
              <ProtectedRoute allowedRoles={["OWNER"]}>
                <OwnerOrdersPage />
              </ProtectedRoute>
            </>
          }
        />

        <Route
          path="/owner/drivers"
          element={
            <>
              <Navbar />
              <ProtectedRoute allowedRoles={["OWNER"]}>
                <DriversPage />
              </ProtectedRoute>
            </>
          }
        />

        <Route
          path="/owner/customers"
          element={
            <>
              <Navbar />
              <ProtectedRoute allowedRoles={["OWNER"]}>
                <CustomersPage />
              </ProtectedRoute>
            </>
          }
        />

        {/* Admin routes */}
        <Route
          path="/admin/dashboard"
          element={
            <>
              <Navbar />
              <ProtectedRoute allowedRoles={["ADMIN"]}>
                <AdminDashboardPage />
              </ProtectedRoute>
            </>
          }
        />

        <Route
          path="/admin/orders"
          element={
            <>
              <Navbar />
              <ProtectedRoute allowedRoles={["ADMIN"]}>
                <AdminOrdersPage />
              </ProtectedRoute>
            </>
          }
        />

        <Route
          path="/admin/drivers"
          element={
            <>
              <Navbar />
              <ProtectedRoute allowedRoles={["ADMIN"]}>
                <AdminDriversPage />
              </ProtectedRoute>
            </>
          }
        />

        <Route
          path="/admin/customers"
          element={
            <>
              <Navbar />
              <ProtectedRoute allowedRoles={["ADMIN"]}>
                <AdminCustomersPage />
              </ProtectedRoute>
            </>
          }
        />

        {/* Fallback route must be last */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}