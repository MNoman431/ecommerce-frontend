// import React, { useState, useEffect} from "react";
// import { Link, useNavigate } from "react-router-dom";
// import { FiSearch, FiUser, FiShoppingBag, FiLogOut, FiMenu, FiX, FiSun, FiMoon, FiPackage } from "react-icons/fi";
// import { useDispatch, useSelector } from "react-redux";
// import { toast } from "react-hot-toast";
// import type { AppDispatch, RootState } from "../../redux/store";
// import { logoutUser } from "../../redux/user/authThunks/AuthThunks";
// import { fetchCart } from "../../redux/user/cartThunks/cartThunks";
// import { resetOrders } from "../../redux/user/orderSlice/orderSlice";

// const Navbar: React.FC = () => {
//   const [isOpen, setIsOpen] = useState(false);
//   const [scrolled, setScrolled] = useState(false);
//   const [theme, setTheme] = useState<'light' | 'dark'>(() => {
//     const stored = localStorage.getItem('theme');
//     if (stored === 'light' || stored === 'dark') return stored;
//     const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
//     return prefersDark ? 'dark' : 'light';
//   });
 

//   const dispatch = useDispatch<AppDispatch>();
//   const navigate = useNavigate();
//   const { user } = useSelector((state: RootState) => state.auth);
//   const cartCount = useSelector((state: RootState) => state.cart.items.length);

//   useEffect(() => {
//     const handleScroll = () => setScrolled(window.scrollY > 10);
//     window.addEventListener("scroll", handleScroll);
//     return () => window.removeEventListener("scroll", handleScroll);
//   }, []);

//   // Load cart count when navbar mounts
//   useEffect(() => {
//     if (user) {
//       dispatch(fetchCart());
//     }
//   }, [dispatch, user]);

//   // Apply theme to <html> element and persist
//   useEffect(() => {
//     const root = document.documentElement;
//     if (theme === 'dark') {
//       root.classList.add('dark');
//     } else {
//       root.classList.remove('dark');
//     }
//     localStorage.setItem('theme', theme);
//   }, [theme]);

//   const categories = [
//     { name: "Home", path: "/user" },
//     // { name: "New Arrivals", path: "/newarrivals" },
//     { name: "All Top Covers", path: "/user/covers" },
//     { name: "About Us", path: "/user/aboutUs" },
//     { name: "Contact", path: "/user/contact" },
//   ];

//   const handleLogout = async () => {
//     try {
//       const res = await dispatch(logoutUser());
//       if (res.meta.requestStatus === "fulfilled") {
//         dispatch(resetOrders());
//         toast.success("Logged out successfully!");
//         navigate("/login");
//       } else {
//         toast.error("Logout failed. Try again.");
//       }
//     } catch (error) {
//       toast.error("Something went wrong");
//     }
//   };

//   const toggleTheme = () => setTheme((t) => (t === 'dark' ? 'light' : 'dark'));


//   return (
//     <nav
//       className={`sticky top-0 z-50 transition-all duration-300 ${
//         scrolled 
//           ? "bg-white/95 backdrop-blur-md shadow-lg border-b border-gray-100" 
//           : "bg-transparent"
//       }`}
//     >
//       <div className="max-w-7xl mx-auto px-6 py-4">
//         <div className="flex justify-between items-center">
//           {/* Logo */}
//           <Link
//             to="/"
//             className="flex items-center gap-3 group"
//           >
//             <div className="relative">
//               <span className="text-4xl font-black text-red-600 group-hover:text-red-700 transition-colors duration-300">
//                 NR
//               </span>
//               <div className="absolute -inset-1 bg-gradient-to-r from-red-600 to-pink-600 rounded-lg blur opacity-20 group-hover:opacity-30 transition duration-300"></div>
//             </div>
//             <div className="hidden sm:block">
//               <span className="text-xl font-bold text-gray-900 tracking-wide">
//                 Fancy Top Covers
//               </span>
//               <p className="text-xs text-gray-500 -mt-1">Premium Quality</p>
//             </div>
//           </Link>

//           {/* Desktop Menu */}
//           <div className="hidden lg:flex gap-8 items-center">
//             {categories.map((cat) => (
//               <Link
//                 key={cat.name}
//                 to={cat.path}
//                 className="relative group text-gray-700 font-medium hover:text-red-600 transition duration-300"
//               >
//                 {cat.name}
//                 <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-red-600 to-pink-600 group-hover:w-full transition-all duration-300"></span>
//               </Link>
//             ))}
//           </div>

//           {/* Right Icons & Actions */}
//           <div className="hidden lg:flex items-center gap-6">
//             <button className="p-2 text-gray-600 hover:text-red-600 hover:bg-red-50 rounded-full transition-all duration-200">
//               <FiSearch className="w-5 h-5" />
//             </button>

//             {/* Theme Toggle */}
//             <button
//               onClick={toggleTheme}
//               className="p-2 text-gray-600 hover:text-red-600 hover:bg-red-50 rounded-full transition-all duration-200"
//               aria-label="Toggle theme"
//               title={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
//             >
//               {theme === 'dark' ? <FiSun className="w-5 h-5" /> : <FiMoon className="w-5 h-5" />}
//             </button>
            
//             {/* User Profile - only show if logged in */}
//             {user && (
//               <button onClick={() => navigate('/user/profile')} className="p-2 text-gray-600 hover:text-red-600 hover:bg-red-50 rounded-full transition-all duration-200" title="Your Profile">
//                 <FiUser className="w-5 h-5" />
//               </button>
//             )}
            
//             {/* Orders icon - only show if logged in */}
//             {user && (
//               <button onClick={() => navigate('/user/orders')} className="p-2 text-gray-600 hover:text-red-600 hover:bg-red-50 rounded-full transition-all duration-200" title="Your Orders">
//                 <FiPackage className="w-5 h-5" />
//               </button>
//             )}

//             <div className="relative">
//               <button onClick={() => navigate('/cart')} className="p-2 text-gray-600 hover:text-red-600 hover:bg-red-50 rounded-full transition-all duration-200">
//                 <FiShoppingBag className="w-5 h-5" />
//                 {cartCount > 0 && (
//                   <span className="absolute -top-1 -right-1 bg-red-600 text-white text-xs min-w-[1.25rem] h-5 px-1 rounded-full flex items-center justify-center font-bold shadow-lg">
//                     {Math.min(cartCount, 99)}
//                   </span>
//                 )}
//               </button>
//             </div>

//             {user ? (
//               <button
//                 onClick={handleLogout}
//                 className="flex items-center gap-2 bg-gradient-to-r from-red-600 to-pink-600 text-white px-4 py-2 rounded-full text-sm font-medium hover:from-red-700 hover:to-pink-700 transform hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-xl"
//               >
//                 <FiLogOut className="w-4 h-4" />
//                 Logout
//               </button>
//             ) : (
//               <div className="flex items-center gap-3">
//                 <button
//                   onClick={() => navigate('/login')}
//                   className="text-gray-700 hover:text-red-600 font-medium transition-colors duration-200"
//                 >
//                   Login
//                 </button>
//                 <button
//                   onClick={() => navigate('/register')}
//                   className="bg-gradient-to-r from-red-600 to-pink-600 text-white px-4 py-2 rounded-full text-sm font-medium hover:from-red-700 hover:to-pink-700 transform hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-xl"
//                 >
//                   Register
//                 </button>
//               </div>
//             )}
//           </div>

//           {/* Mobile Menu Button */}
//           <div className="lg:hidden">
//             <button
//               onClick={() => setIsOpen(!isOpen)}
//               className="p-2 text-gray-700 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all duration-200"
//             >
//               {isOpen ? <FiX className="w-6 h-6" /> : <FiMenu className="w-6 h-6" />}
//             </button>
//           </div>
//         </div>

//         {/* Mobile Menu */}
//         {isOpen && (
//           <div className="lg:hidden mt-4 bg-white rounded-xl shadow-xl border border-gray-100 overflow-hidden animate-slideDown">
//             <div className="p-4 space-y-3">
//               {categories.map((cat) => (
//                 <Link
//                   key={cat.name}
//                   to={cat.path}
//                   onClick={() => setIsOpen(false)}
//                   className="block px-4 py-3 text-gray-700 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all duration-200 font-medium"
//                 >
//                   {cat.name}
//                 </Link>
//               ))}
//             </div>
            
//             <div className="border-t border-gray-100 p-4">
//               <div className="flex items-center justify-between mb-4">
//                 <div className="flex gap-3">
//                   <button className="p-2 text-gray-600 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all duration-200">
//                     <FiSearch className="w-5 h-5" />
//                   </button>
//                   {/* Theme Toggle (Mobile) */}
//                   <button
//                     onClick={toggleTheme}
//                     className="p-2 text-gray-600 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all duration-200"
//                     aria-label="Toggle theme"
//                     title={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
//                   >
//                     {theme === 'dark' ? <FiSun className="w-5 h-5" /> : <FiMoon className="w-5 h-5" />}
//                   </button>
//                   {/* User Profile - only show if logged in */}
//                   {user && (
//                     <button onClick={() => { navigate('/user/profile'); setIsOpen(false); }} className="p-2 text-gray-600 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all duration-200">
//                       <FiUser className="w-5 h-5" />
//                     </button>
//                   )}
//                   {/* Orders (mobile) - only show if logged in */}
//                   {user && (
//                     <button onClick={() => { navigate('/user/orders'); setIsOpen(false); }} className="p-2 text-gray-600 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all duration-200">
//                       <FiPackage className="w-5 h-5" />
//                     </button>
//                   )}
//                   <div className="relative">
//                     <button onClick={() => { navigate('/cart'); setIsOpen(false); }} className="p-2 text-gray-600 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all duration-200">
//                       <FiShoppingBag className="w-5 h-5" />
//                     </button>
//                   </div>
//                 </div>
                
//                 {user ? (
//                   <button
//                     onClick={handleLogout}
//                     className="flex items-center gap-2 bg-gradient-to-r from-red-600 to-pink-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:from-red-700 hover:to-pink-700 transition-all duration-200"
//                   >
//                     <FiLogOut className="w-4 h-4" />
//                     Logout
//                   </button>
//                 ) : (
//                   <div className="flex gap-2">
//                     <button
//                       onClick={() => { navigate('/login'); setIsOpen(false); }}
//                       className="text-gray-700 hover:text-red-600 font-medium transition-colors duration-200 px-3 py-2"
//                     >
//                       Login
//                     </button>
//                     <button
//                       onClick={() => { navigate('/register'); setIsOpen(false); }}
//                       className="bg-gradient-to-r from-red-600 to-pink-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:from-red-700 hover:to-pink-700 transition-all duration-200"
//                     >
//                       Register
//                     </button>
//                   </div>
//                 )}
//               </div>
//             </div>
//           </div>
//         )}
//       </div>
//     </nav>
//   );
// };

// export default Navbar;





import React, { useState, useEffect} from "react";
import { Link, useNavigate } from "react-router-dom";
import { FiSearch, FiUser, FiShoppingBag, FiLogOut, FiMenu, FiX, FiSun, FiMoon, FiPackage } from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-hot-toast";
import type { AppDispatch, RootState } from "../../redux/store";
import { logoutUser } from "../../redux/user/authThunks/AuthThunks";
import { fetchCart } from "../../redux/user/cartThunks/cartThunks";
import { resetOrders } from "../../redux/user/orderSlice/orderSlice";
import SearchBar from "./SearchBar";
import { ShoppingCart } from "lucide-react";
// import SearchBar from "./SearchBar"; // Import the SearchBar component

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [theme, setTheme] = useState<'light' | 'dark'>(() => {
    const stored = localStorage.getItem('theme');
    if (stored === 'light' || stored === 'dark') return stored;
    const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
    return prefersDark ? 'dark' : 'light';
  });
 

  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const { user } = useSelector((state: RootState) => state.auth);
  const cartCount = useSelector((state: RootState) => state.cart.items.length);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Load cart count when navbar mounts
  useEffect(() => {
    if (user) {
      dispatch(fetchCart());
    }
  }, [dispatch, user]);

  // Apply theme to <html> element and persist
  useEffect(() => {
    const root = document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
    localStorage.setItem('theme', theme);
  }, [theme]);

  const categories = [
    { name: "Home", path: "/user" },
    { name: "All Top Covers", path: "/user/covers" },
    { name: "About Us", path: "/user/aboutUs" },
    { name: "Contact", path: "/user/contact" },
  ];

  const handleLogout = async () => {
    try {
      const res = await dispatch(logoutUser());
      if (res.meta.requestStatus === "fulfilled") {
        dispatch(resetOrders());
        toast.success("Logged out successfully!");
        navigate("/login");
      } else {
        toast.error("Logout failed. Try again.");
      }
    } catch (error) {
      toast.error("Something went wrong");
    }
  };

  const toggleTheme = () => setTheme((t) => (t === 'dark' ? 'light' : 'dark'));


  return (
    <nav
  className={`sticky top-0 z-50 transition-all duration-300 ${
    scrolled 
      ? "bg-white/95 backdrop-blur-md shadow-lg border-b border-gray-100" 
      : "bg-transparent"
  }`}
>
  <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 sm:py-4">
    <div className="flex justify-between items-center">
      {/* Logo */}
      <Link to="/" className="flex items-center gap-2 sm:gap-3 group">
        <div className="relative">
          <span className="text-3xl sm:text-4xl font-black text-red-600 group-hover:text-red-700 transition-colors duration-300">
            NR
          </span>
          <div className="absolute -inset-1 bg-gradient-to-r from-red-600 to-pink-600 rounded-lg blur opacity-20 group-hover:opacity-30 transition duration-300"></div>
        </div>
        <div className="hidden sm:block">
          <span className="text-lg sm:text-xl font-bold text-gray-900 tracking-wide">
            Fancy Top Covers
          </span>
          <p className="text-xs text-gray-500 -mt-1">Premium Quality</p>
        </div>
      </Link>

      {/* Desktop Menu */}
      <div className="hidden lg:flex gap-8 items-center">
        {categories.map((cat) => (
          <Link
            key={cat.name}
            to={cat.path}
            className="relative group text-gray-700 font-medium hover:text-red-600 transition duration-300"
          >
            {cat.name}
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-red-600 to-pink-600 group-hover:w-full transition-all duration-300"></span>
          </Link>
        ))}
      </div>

      {/* Right Actions (Desktop) */}
      <div className="hidden lg:flex items-center gap-5">
        <SearchBar />
        <button
          onClick={toggleTheme}
          className="p-2 text-gray-600 hover:text-red-600 hover:bg-red-50 rounded-full transition-all"
        >
          {theme === 'dark' ? <FiSun className="w-5 h-5" /> : <FiMoon className="w-5 h-5" />}
        </button>

        {user && (
          <>
            <button onClick={() => navigate('/user/profile')} className="p-2 text-gray-600 hover:text-red-600 rounded-full transition-all">
              <FiUser className="w-5 h-5" />
            </button>
            <button onClick={() => navigate('/user/orders')} className="p-2 text-gray-600 hover:text-red-600 rounded-full transition-all">
              <FiPackage className="w-5 h-5" />
            </button>
          </>
        )}

        <div className="relative">
          <button onClick={() => navigate('/cart')} className="p-2 text-gray-600 hover:text-red-600 rounded-full transition-all">
           <ShoppingCart className="w-5 h-5" />

            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-red-600 text-white text-xs min-w-[1.1rem] h-5 px-1 rounded-full flex items-center justify-center font-bold">
                {Math.min(cartCount, 99)}
              </span>
            )}
          </button>
        </div>

        {user ? (
          <button
            onClick={handleLogout}
            className="hidden sm:flex items-center gap-2 bg-gradient-to-r from-red-600 to-pink-600 text-white px-4 py-2 rounded-full text-sm font-medium hover:from-red-700 hover:to-pink-700 transition-all shadow-lg"
          >
            <FiLogOut className="w-4 h-4" />
            Logout
          </button>
        ) : (
          <div className="flex items-center gap-3">
            <button
              onClick={() => navigate('/login')}
              className="text-gray-700 hover:text-red-600 font-medium transition"
            >
              Login
            </button>
            <button
              onClick={() => navigate('/register')}
              className="bg-gradient-to-r from-red-600 to-pink-600 text-white px-4 py-2 rounded-full text-sm font-medium hover:from-red-700 hover:to-pink-700 transition shadow-lg"
            >
              Register
            </button>
          </div>
        )}
      </div>

      {/* Mobile Menu Button */}
      <div className="lg:hidden">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="p-2 text-gray-700 hover:text-red-600 hover:bg-red-50 rounded-lg transition"
        >
          {isOpen ? <FiX className="w-6 h-6" /> : <FiMenu className="w-6 h-6" />}
        </button>
      </div>
    </div>

    {/* Mobile Menu */}
    <div
      className={`lg:hidden transition-all duration-300 overflow-hidden ${
        isOpen ? "max-h-screen mt-4" : "max-h-0"
      }`}
    >
      <div className="bg-white rounded-xl shadow-xl border border-gray-100">
        <div className="p-4 space-y-2">
          {categories.map((cat) => (
            <Link
              key={cat.name}
              to={cat.path}
              onClick={() => setIsOpen(false)}
              className="block px-4 py-2 text-gray-700 hover:text-red-600 hover:bg-red-50 rounded-lg transition"
            >
              {cat.name}
            </Link>
          ))}
        </div>

        {/* Mobile Bottom Section */}
        <div className="border-t border-gray-100 p-4 flex flex-col gap-3">
          <div className="flex gap-3">
            <button className="p-2 text-gray-600 hover:text-red-600 hover:bg-red-50 rounded-lg transition">
              <FiSearch className="w-5 h-5" />
            </button>
            <button
              onClick={toggleTheme}
              className="p-2 text-gray-600 hover:text-red-600 hover:bg-red-50 rounded-lg transition"
            >
              {theme === 'dark' ? <FiSun className="w-5 h-5" /> : <FiMoon className="w-5 h-5" />}
            </button>
            {user && (
              <>
                <button onClick={() => { navigate('/user/profile'); setIsOpen(false); }} className="p-2 text-gray-600 hover:text-red-600 rounded-lg transition">
                  <FiUser className="w-5 h-5" />
                </button>
                <button onClick={() => { navigate('/user/orders'); setIsOpen(false); }} className="p-2 text-gray-600 hover:text-red-600 rounded-lg transition">
                  <FiPackage className="w-5 h-5" />
                </button>
              </>
            )}
            <div className="relative">
              <button onClick={() => { navigate('/cart'); setIsOpen(false); }} className="p-2 text-gray-600 hover:text-red-600 rounded-lg transition">
             <ShoppingCart className="w-5 h-5" />
                {cartCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-600 text-white text-xs min-w-[1.1rem] h-5 px-1 rounded-full flex items-center justify-center font-bold">
                    {Math.min(cartCount, 99)}
                  </span>
                )}
              </button>
            </div>
          </div>

          {user ? (
            <button
              onClick={handleLogout}
              className="flex items-center justify-center gap-2 bg-gradient-to-r from-red-600 to-pink-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:from-red-700 hover:to-pink-700 transition shadow-lg"
            >
              <FiLogOut className="w-4 h-4" />
              Logout
            </button>
          ) : (
            <div className="flex gap-2">
              <button
                onClick={() => { navigate('/login'); setIsOpen(false); }}
                className="flex-1 text-center text-gray-700 hover:text-red-600 font-medium transition px-3 py-2"
              >
                Login
              </button>
              <button
                onClick={() => { navigate('/register'); setIsOpen(false); }}
                className="flex-1 bg-gradient-to-r from-red-600 to-pink-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:from-red-700 hover:to-pink-700 transition shadow-lg"
              >
                Register
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  </div>
</nav>

  );
};

export default Navbar;