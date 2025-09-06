
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
          <Route path="product/:id" element={<QuickView />} />
          <Route path="cart" element={<Cart />} />
          <Route path="checkout" element={<Checkout />} />
          <Route path="orders" element={<Orders />} />
          <Route path="profile" element={<Profile />} />
          <Route path="thank-you" element={<ThankYou />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
};

export default UserLayout;