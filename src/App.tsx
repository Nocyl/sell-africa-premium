
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { CartProvider } from "./contexts/CartContext";

import Index from "./pages/Index";
import Products from "./pages/Products";
import DigitalProducts from "./pages/DigitalProducts";
import PhysicalProducts from "./pages/PhysicalProducts";
import Courses from "./pages/Courses";
import Sell from "./pages/Sell";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Cart from "./pages/Cart";
import NotFound from "./pages/NotFound";
import ProductDetail from "./pages/ProductDetail";
import CourseDetail from "./pages/CourseDetail";
import Checkout from "./pages/Checkout";
import PaymentSuccess from "./pages/PaymentSuccess";
import UserDashboard from "./pages/dashboard/UserDashboard";
import DashboardOrders from "./pages/dashboard/DashboardOrders";
import DashboardCourses from "./pages/dashboard/DashboardCourses";
import DashboardProfile from "./pages/dashboard/DashboardProfile";
import AdminDashboard from "./pages/dashboard/AdminDashboard";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <CartProvider>
        <Toaster />
        <Sonner position="top-right" closeButton richColors />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/products" element={<Products />} />
            <Route path="/digital" element={<DigitalProducts />} />
            <Route path="/physical" element={<PhysicalProducts />} />
            <Route path="/courses" element={<Courses />} />
            <Route path="/product/:id" element={<ProductDetail />} />
            <Route path="/course/:id" element={<CourseDetail />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/payment-success" element={<PaymentSuccess />} />
            <Route path="/sell" element={<Sell />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/dashboard" element={<UserDashboard />} />
            <Route path="/dashboard/orders" element={<DashboardOrders />} />
            <Route path="/dashboard/courses" element={<DashboardCourses />} />
            <Route path="/dashboard/profile" element={<DashboardProfile />} />
            <Route path="/admin" element={<AdminDashboard />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </CartProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
