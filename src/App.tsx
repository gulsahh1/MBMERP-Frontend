import { BrowserRouter as Router, Routes, Route } from "react-router";
import SignIn from "./pages/AuthPages/SignIn";
import NotFound from "./pages/OtherPage/NotFound";
import LineChart from "./pages/Charts/LineChart";
import BarChart from "./pages/Charts/BarChart";
import AppLayout from "./layout/AppLayout";
import { ScrollToTop } from "./components/common/ScrollToTop";
import Home from "./pages/Dashboard/Home";
import CategoryPage from "./features/categories/pages/categoryPage";
import ProductPage from "./features/products/pages/productPage.";
import CustomerPage from "./features/customers/pages/customerPage";
import PaymentPage from "./features/payments/pages/paymentPage";
import SalePage from "./features/sales/pages/salePage";
import StockPage from "./features/stokcs/pages/stockPage";
import OrderPage from "./features/orders/pages/orderPage";
import { SignalRProvider } from "./features/SignalR/signalRProvider";
import PublicRoute from "./routes/PublicRoute";
import ProtectedRoute from "./routes/ProtectedRoute";
import { isTokenExpired } from "./utils/jwt";
import NotificationPage from "./features/notifications/pages/notificationPage";

export default function App() {

const token = localStorage.getItem("token");

if (token && isTokenExpired(token)) {
  localStorage.clear();
  window.location.href = "/login";
}

  return (
    <>
     <SignalRProvider>
      <Router>
  <ScrollToTop />

  <Routes>

    {/* LOGIN - sadece giriş yoksa */}
    <Route
      path="/login"
      element={
        <PublicRoute>
          <SignIn />
        </PublicRoute>
      }
    />

    {/* PROTECTED AREA (DASHBOARD) */}
    <Route
      path="/"
      element={
        <ProtectedRoute>
          <AppLayout />
        </ProtectedRoute>
      }
    >
      <Route index element={<Home />} />

      <Route path="categories" element={<CategoryPage />} />
      <Route path="products" element={<ProductPage />} />
      <Route path="customers" element={<CustomerPage />} />
      <Route path="payments" element={<PaymentPage />} />
      <Route path="sales" element={<SalePage />} />
      <Route path="stocks" element={<StockPage />} />
      <Route path="orders" element={<OrderPage />} />
      <Route path="notifications" element={<NotificationPage />} />
      <Route path="line-chart" element={<LineChart />} />
      <Route path="bar-chart" element={<BarChart />} />
    </Route>

    {/* fallback */}
    <Route path="*" element={<NotFound />} />

  </Routes>
</Router>


     </SignalRProvider>
    
    </>
  );
}
