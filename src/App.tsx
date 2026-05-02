import { Route, Routes } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import ProtectedRoute from './components/routes/ProtectedRoute';
import HomePage from './pages/HomePage';
import SignInPage from './pages/auth/SignInPage';
import SignUpPage from './pages/auth/SignUpPage';
import FoodsPage from './pages/foods/FoodsPage';
import CartPage from './pages/cart/CartPage';
import CheckoutPage from './pages/checkout/CheckoutPage';
import OrdersPage from './pages/orders/OrdersPage';
import TrackOrderPage from './pages/orders/TrackOrderPage';
import CategoriesPage from './pages/categories/CategoriesPage';
import NotFoundPage from './pages/NotFoundPage';
export default function App(){ return <><Navbar/><Routes><Route path="/" element={<HomePage/>}/><Route path="/signin" element={<SignInPage/>}/><Route path="/signup" element={<SignUpPage/>}/><Route path="/foods" element={<FoodsPage/>}/><Route path="/cart" element={<CartPage/>}/><Route path="/checkout" element={<ProtectedRoute><CheckoutPage/></ProtectedRoute>}/><Route path="/orders" element={<ProtectedRoute><OrdersPage/></ProtectedRoute>}/><Route path="/orders/:id" element={<ProtectedRoute><TrackOrderPage/></ProtectedRoute>}/><Route path="/categories" element={<ProtectedRoute role="ADMIN"><CategoriesPage/></ProtectedRoute>}/><Route path="*" element={<NotFoundPage/>}/></Routes></> }
