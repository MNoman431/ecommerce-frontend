import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../../redux/store";
import { fetchOrders, placeOrder } from "../../redux/user/orderThunks";

const Orders: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { orders, loading } = useSelector((s: RootState) => s.orders);

  useEffect(() => {
    dispatch(fetchOrders());
  }, [dispatch]);

  const place = () => {
    dispatch(placeOrder()).then(() => dispatch(fetchOrders()));
  };

  return (
    <div className="max-w-5xl mx-auto px-6 py-10">
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-2xl font-bold">Your Orders</h1>
        <button onClick={place} className="px-4 py-2 rounded bg-red-600 text-white hover:bg-red-700">Place Order from Cart</button>
      </div>
      {loading ? (
        <p>Loading...</p>
      ) : orders.length === 0 ? (
        <p>No orders yet.</p>
      ) : (
        <div className="space-y-4">
          {orders.map((o: any) => (
            <div key={o.id} className="border rounded p-3">
              <div className="flex items-center justify-between">
                <p className="font-semibold">Order #{o.id}</p>
                <span className="text-sm">Status: {o.status}</span>
              </div>
              <div className="mt-2 text-sm text-gray-600">
                Total: ₹{o.totalAmount}
              </div>
              <ul className="mt-2 list-disc pl-5 text-sm">
                {(o.OrderItems || o.items || []).map((it: any) => (
                  <li key={it.id}>{it.Product?.name || `Product ${it.productId}`} × {it.quantity}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Orders;


