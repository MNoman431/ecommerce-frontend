import React, { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../../redux/store";
import { fetchCart } from "../../redux/user/cartThunks";
import { placeOrderWithShipping } from "../../redux/user/orderThunks";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";

const Checkout: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { items, loading } = useSelector((s: RootState) => s.cart);
  const location = useLocation();
  const navigate = useNavigate();
  const directItem = undefined as any; // Direct buy disabled

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [postalCode, setPostalCode] = useState("");

  useEffect(() => {
    dispatch(fetchCart());
  }, [dispatch]);

  const totals = useMemo(() => {
    const subtotal = items.reduce((sum: number, it: any) => {
      const price = Number(it.Product?.price ?? it.price ?? 0);
      const qty = Number(it.quantity) || 0;
      return sum + price * qty;
    }, 0);
    return { subtotal };
  }, [items]);

  const proceedToPay = async () => {
    if (!name || !phone || !address || !city || !postalCode) {
      toast.error("Please fill all delivery details");
      return;
    }
    try {
      await dispatch(placeOrderWithShipping({ name, phone, address, city, postalCode })).unwrap();
      toast.success("Order placed successfully");
      // Try to read orderId from the fulfilled action payload stored in last action if needed; simplify by navigating with name only
      navigate('/user/thank-you', { replace: true, state: { name } });
    } catch (e: any) {
      toast.error(e?.message || "Failed to place order");
    }
  };

  if (loading) return <div className="max-w-6xl mx-auto px-4 sm:px-6 py-10">Loading...</div>;

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8 grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div className="lg:col-span-2 space-y-4">
        <h2 className="text-xl font-semibold">Delivery Information</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <input className="border p-3 rounded" placeholder="Full Name" value={name} onChange={(e) => setName(e.target.value)} />
          <input className="border p-3 rounded" placeholder="Phone" value={phone} onChange={(e) => setPhone(e.target.value)} />
        </div>
        <input className="border p-3 rounded w-full" placeholder="Address" value={address} onChange={(e) => setAddress(e.target.value)} />
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <input className="border p-3 rounded" placeholder="City" value={city} onChange={(e) => setCity(e.target.value)} />
          <input className="border p-3 rounded" placeholder="Postal Code" value={postalCode} onChange={(e) => setPostalCode(e.target.value)} />
        </div>
      </div>

      <div className="h-max bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-4">
        <h2 className="text-lg font-semibold mb-3">Order Summary</h2>
        <div className="space-y-2 max-h-60 overflow-auto pr-1">
          {directItem ? (
            <div className="flex items-center justify-between text-sm">
              <span className="truncate mr-2">{directItem.name || `Item #${directItem.productId}`}</span>
              <span>× {directItem.quantity}</span>
              {directItem.price != null && (
                <span>₹{Number(directItem.price) * Number(directItem.quantity || 1)}</span>
              )}
            </div>
          ) : (
            items.map((it: any) => {
              const price = Number(it.Product?.price ?? it.price ?? 0);
              const qty = Number(it.quantity) || 0;
              return (
                <div key={`${it.cartId}-${it.productId}`} className="flex items-center justify-between text-sm">
                  <span className="truncate mr-2">{it.Product?.name || `Product ${it.productId}`}</span>
                  <span>× {qty}</span>
                  <span>₹{price * qty}</span>
                </div>
              );
            })
          )}
        </div>
        <div className="border-t my-3" />
        <div className="flex items-center justify-between font-semibold py-1">
          <span>Total</span>
          <span>₹{totals.subtotal}</span>
        </div>
        <button
          onClick={proceedToPay}
          disabled={items.length === 0}
          className={`mt-4 w-full px-4 py-2 rounded-md text-white ${items.length === 0 ? 'bg-gray-300 cursor-not-allowed' : 'bg-green-600 hover:bg-green-700'}`}
        >
          Proceed to Pay
        </button>
      </div>
    </div>
  );
};

export default Checkout;
