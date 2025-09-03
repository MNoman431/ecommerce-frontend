import React, { useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../../redux/store";
import { fetchCart, updateCartItem } from "../../redux/user/cartThunks";
import { FiTrash2 } from "react-icons/fi";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const Cart: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { items, loading } = useSelector((s: RootState) => s.cart);
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(fetchCart());
  }, [dispatch]);

  const changeQty = (productId: number | string, quantity: number) => {
    dispatch(updateCartItem({ productId, quantity })).then(() => {
      dispatch(fetchCart());
      if (quantity <= 0) toast.success("Item removed");
    });
  };

  const totals = useMemo(() => {
    const itemCount = items.reduce((sum: number, it: any) => sum + (Number(it.quantity) || 0), 0);
    const subtotal = items.reduce((sum: number, it: any) => {
      const price = Number(it.Product?.price ?? it.price ?? 0);
      const qty = Number(it.quantity) || 0;
      return sum + price * qty;
    }, 0);
    return { itemCount, subtotal };
  }, [items]);

  if (loading) return <div className="max-w-6xl mx-auto px-4 sm:px-6 py-10">Loading cart...</div>;

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8">
      <h1 className="text-2xl font-bold mb-6">Your Cart</h1>
      {items.length === 0 ? (
        <p>No items in cart.</p>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Items */}
          <div className="lg:col-span-2 space-y-4">
            {items.map((it: any) => {
              const price = Number(it.Product?.price ?? it.price ?? 0);
              const lineTotal = price * (Number(it.quantity) || 0);
              return (
                <div key={`${it.cartId}-${it.productId}`} className="flex items-center justify-between border rounded-lg p-3 bg-white dark:bg-gray-800">
                  <div className="min-w-0">
                    <p className="font-semibold truncate">{it.Product?.name || it.Product?.title || `Product ${it.productId}`}</p>
                    <p className="text-xs text-gray-500">Price: ₹{price} · Qty: {it.quantity} · Total: ₹{lineTotal}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <button onClick={() => changeQty(it.productId, it.quantity + 1)} className="px-3 py-1 rounded bg-gray-100">+</button>
                    <button onClick={() => changeQty(it.productId, Math.max(0, it.quantity - 1))} className="px-3 py-1 rounded bg-gray-100">-</button>
                    <button
                      onClick={() => changeQty(it.productId, 0)}
                      className="p-2 rounded bg-red-50 text-red-600 hover:bg-red-100"
                      title="Remove"
                      aria-label="Remove item"
                    >
                      <FiTrash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Summary */}
          <div className="lg:sticky lg:top-20 h-max bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-4">
            <h2 className="text-lg font-semibold mb-3">Order Summary</h2>
            <div className="flex items-center justify-between text-sm py-1">
              <span>Items</span>
              <span>{totals.itemCount}</span>
            </div>
            <div className="flex items-center justify-between text-sm py-1">
              <span>Subtotal</span>
              <span>₹{totals.subtotal}</span>
            </div>
            <div className="border-t my-3" />
            <div className="flex items-center justify-between font-semibold py-1">
              <span>Total</span>
              <span>₹{totals.subtotal}</span>
            </div>
            <button
              disabled={totals.itemCount === 0}
              onClick={() => navigate('/user/orders')}
              className={`mt-4 w-full px-4 py-2 rounded-md text-white ${totals.itemCount === 0 ? 'bg-gray-300 cursor-not-allowed' : 'bg-red-600 hover:bg-red-700'}`}
            >
              Proceed to Checkout ({totals.itemCount})
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;


