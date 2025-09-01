import React from "react";
import { Link } from "react-router-dom";

const Slider: React.FC = () => {
  return (
    <div className="h-screen w-64 bg-gray-900 text-white flex flex-col p-4">
      <h2 className="text-2xl font-bold mb-8 text-center">Admin Panel</h2>
      <nav className="flex flex-col space-y-4">

       
       
        <Link to="/" className="hover:bg-gray-700 p-2 rounded">
          Dashboard
        </Link>
        <Link to="/products" className="hover:bg-gray-700 p-2 rounded">
          All Products
        </Link>
        <Link to="/add-product" className="hover:bg-gray-700 p-2 rounded">
          Add Product
        </Link>
      </nav>
    </div>
  );
};

export default Slider;
