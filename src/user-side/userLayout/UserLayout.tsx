
// import AllTopCovers from "../components/AllTopCovers";
// import Carousal from "../components/Carousal";
// import Navabar from "../components/Navabar";
// import Footer from "../components/Footer";
// import { Route, Routes } from "react-router-dom";



// const UserLayout = () => {
//   return (
//     <div className="flex flex-col min-h-screen">
//       <Navabar />
//       <Carousal />
//       <AllTopCovers/>
//       <Routes>
//         <Route path="/covers" element={<AllTopCovers />} />
//       </Routes>
//       <Footer />
//     </div>
//   );
// };

// export default UserLayout;


// UserLayout.tsx
import { Routes, Route } from "react-router-dom";
import Carousal from "../components/Carousal";
import AllTopCovers from "../components/AllTopCovers";
import Footer from "../components/Footer";
import Navbar from "../components/Navabar";
import Contact from "../pages/Contact";
import QuickView from "../pages/QuickView";
import Cart from "../pages/Cart";
import Orders from "../pages/Orders";

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
          <Route path="orders" element={<Orders />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
};

export default UserLayout;