
import { Routes, Route } from "react-router-dom";
import Carousal from "../components/Carousal";
import AllTopCovers from "../components/AllTopCovers";
import Footer from "../components/Footer";
import Navbar from "../components/Navabar";
import Contact from "../pages/Contact";
import QuickView from "../pages/QuickView";
import Cart from "../pages/Cart";
import Orders from "../pages/Orders";
import Profile from "../pages/Profile";
import ThankYou from "../pages/ThankYou";
import Checkout from "../pages/Checkout";
import PaymentSuccess from "../pages/payment/PaymentSuccess";
import PaymentFailed from "../pages/payment/PaymentFailed";
import AboutUs from "../pages/AboutUs";
import ProductPage from "../pages/ProductPage";


const UserLayout = () => {
  return (
    <div className="flex flex-col min-h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 transition-colors">
      <Navbar />
      <main className="flex-grow">
        <Routes>
          {/* Home route - with carousel and products */}
          <Route path="" element={
            <>
              <Carousal />
              <AllTopCovers />
            </>
          } />
          
          {/* Covers route - only products */}
          <Route path="covers" element={<AllTopCovers />} />
          <Route path="contact" element={<Contact />} />
          <Route path="aboutUs" element={<AboutUs />} />
        <Route path="/user/product/:id" element={<ProductPage />} />


          <Route path="product/:id" element={<QuickView />} />
          <Route path="cart" element={<Cart />} />
          <Route path="checkout" element={<Checkout />} />
          <Route path="orders" element={<Orders />} />
          <Route path="profile" element={<Profile />} />
          <Route path="thank-you" element={<ThankYou />} />
          <Route path="payment/success" element={<PaymentSuccess />} />
          <Route path="payment/failed" element={<PaymentFailed />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
};

export default UserLayout;