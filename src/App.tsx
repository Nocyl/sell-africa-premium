
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { CartProvider } from "./contexts/CartContext";
import { SearchProvider } from "./contexts/SearchContext";

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
import AdminDashboard from "./pages/dashboard/AdminDashboard";
import SellerDashboard from "./pages/dashboard/SellerDashboard";
import DashboardOrders from "./pages/dashboard/DashboardOrders";
import DashboardCourses from "./pages/dashboard/DashboardCourses";
import DashboardProfile from "./pages/dashboard/DashboardProfile";
import AdminSettings from "./pages/dashboard/AdminSettings";
import SellerSettings from "./pages/dashboard/SellerSettings";
import DashboardSettings from "./pages/dashboard/DashboardSettings";
import SellerProducts from "./pages/dashboard/seller/SellerProducts";
import SellerCourses from "./pages/dashboard/seller/SellerCourses";
import SellerAddProduct from "./pages/dashboard/seller/SellerAddProduct";
import SellerAddCourse from "./pages/dashboard/seller/SellerAddCourse";
import SellerOrders from "./pages/dashboard/seller/SellerOrders";
import SellerMarketing from "./pages/dashboard/seller/SellerMarketing";
import SellerSales from "./pages/dashboard/seller/SellerSales";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <CartProvider>
        <SearchProvider>
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
              <Route path="/admin/settings" element={<AdminSettings />} />
              <Route path="/seller" element={<SellerDashboard />} />
              <Route path="/seller/settings" element={<SellerSettings />} />
              <Route path="/seller/orders" element={<SellerOrders />} />
              <Route path="/seller/marketing" element={<SellerMarketing />} />
              <Route path="/seller/sales" element={<SellerSales />} />
              <Route path="/dashboard/settings" element={<DashboardSettings />} />
              <Route path="/seller/products" element={<SellerProducts />} />
              <Route path="/seller/products/new" element={<SellerAddProduct />} />
              <Route path="/seller/courses" element={<SellerCourses />} />
              <Route path="/seller/courses/new" element={<SellerAddCourse />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </SearchProvider>
      </CartProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
