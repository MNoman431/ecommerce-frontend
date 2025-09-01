// import React from "react";
// import { Link } from "react-router-dom";

// const Slider: React.FC = () => {
//   return (
//     <div className="h-screen w-64 bg-gray-900 text-white flex flex-col p-4">
//       <h2 className="text-2xl font-bold mb-8 text-center">Admin Panel</h2>
//       <nav className="flex flex-col space-y-4">

       
       
//         <Link to="/" className="hover:bg-gray-700 p-2 rounded">
//           Dashboard
//         </Link>
//         <Link to="/products" className="hover:bg-gray-700 p-2 rounded">
//           All Products
//         </Link>
//         <Link to="/add-product" className="hover:bg-gray-700 p-2 rounded">
//           Add Product
//         </Link>
//       </nav>
//     </div>
//   );
// };

// export default Slider;




// after styling
import React from "react";
import { Link, useLocation } from "react-router-dom";
import { LayoutDashboard, Package, PlusCircle } from "lucide-react";

const Slider: React.FC = () => {
  const location = useLocation();

  const navItems = [
    { path: "/", label: "Dashboard", icon: <LayoutDashboard size={20} /> },
    { path: "/products", label: "All Products", icon: <Package size={20} /> },
    { path: "/add-product", label: "Add Product", icon: <PlusCircle size={20} /> },
  ];

  return (
    <div className="fixed top-0 left-0 h-screen w-64 bg-gray-900 text-white flex flex-col p-6 shadow-lg z-50">
      {/* Header */}
      <h2 className="text-2xl font-extrabold mb-10 text-center tracking-wide">
        Admin Panel
      </h2>

      {/* Navigation */}
      <nav className="flex flex-col space-y-3">
        {navItems.map((item) => {
          const isActive = location.pathname === item.path;

          return (
            <Link
              key={item.path}
              to={item.path}
              className={`flex items-center gap-3 px-4 py-2 rounded-lg transition-all duration-200 ${
                isActive
                  ? "bg-blue-600 text-white shadow-md"
                  : "text-gray-300 hover:bg-gray-800 hover:text-white"
              }`}
            >
              {item.icon}
              <span className="font-medium">{item.label}</span>
            </Link>
          );
        })}
      </nav>

      {/* Footer */}
      <div className="mt-auto pt-6 border-t border-gray-700 text-sm text-gray-400 text-center">
        © {new Date().getFullYear()} Admin
      </div>
    </div>
  );
};

export default Slider;
