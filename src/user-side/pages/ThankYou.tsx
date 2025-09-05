import React from "react";
import { Link, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import type { RootState } from "../../redux/store";

const ThankYou: React.FC = () => {
  const location = useLocation();
  const passed = (location.state as any) || {};
  const authUser = useSelector((s: RootState) => s.auth.user);
  const name = passed.name || authUser?.name || "Customer";
  const orderId = passed.orderId as number | string | undefined;

  return (
    <div className="max-w-3xl mx-auto px-6 py-16 text-center">
      <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-4">Thank You, {name}!</h1>
      <p className="text-gray-700 mb-2">Your order has been placed successfully.</p>
      {orderId && (
        <p className="text-gray-600 mb-6">Order Reference: <span className="font-semibold">#{orderId}</span></p>
      )}
      <div className="flex items-center justify-center gap-3 mt-4">
        <Link
          to="/user/orders"
          className="px-5 py-2.5 rounded-md bg-gray-900 text-white hover:bg-black"
        >
          View My Orders
        </Link>
        <Link
          to="/user"
          className="px-5 py-2.5 rounded-md border border-gray-300 text-gray-800 hover:bg-gray-50"
        >
          Continue Shopping
        </Link>
      </div>
    </div>
  );
};

export default ThankYou;


