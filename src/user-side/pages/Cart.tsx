import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../../redux/store";
import { fetchCart, updateCartItem } from "../../redux/user/cartThunks";

const Cart: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { items, loading } = useSelector((s: RootState) => s.cart);

  useEffect(() => {
    dispatch(fetchCart());
  }, [dispatch]);

  const changeQty = (productId: number | string, quantity: number) => {
    dispatch(updateCartItem({ productId, quantity })).then(() => {
      dispatch(fetchCart());
    });
  };

  if (loading) return <div className="max-w-5xl mx-auto px-6 py-10">Loading cart...</div>;

  return (
    <div className="max-w-5xl mx-auto px-6 py-10">
      <h1 className="text-2xl font-bold mb-4">Your Cart</h1>
      {items.length === 0 ? (
        <p>No items in cart.</p>
      ) : (
        <div className="space-y-4">
          {items.map((it: any) => (
            <div key={`${it.cartId}-${it.productId}`} className="flex items-center justify-between border rounded p-3">
              <div>
                <p className="font-semibold">{it.Product?.name || it.Product?.title || `Product ${it.productId}`}</p>
                <p className="text-sm text-gray-500">Qty: {it.quantity}</p>
              </div>
              <div className="flex gap-2">
                <button onClick={() => changeQty(it.productId, it.quantity + 1)} className="px-3 py-1 rounded bg-gray-100">+</button>
                <button onClick={() => changeQty(it.productId, Math.max(0, it.quantity - 1))} className="px-3 py-1 rounded bg-gray-100">-</button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Cart;


