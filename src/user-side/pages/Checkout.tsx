
import React, { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../../redux/store";
import { fetchCart } from "../../redux/user/cartThunks/cartThunks";
import { placeOrderWithShipping } from "../../redux/user/orderThunks/orderThunks";
import { createPaymentIntent } from "../../redux/user/paymentThunk/PaymentThunk";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";

const Checkout: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { items, loading } = useSelector((s: RootState) => s.cart);
  const navigate = useNavigate();
  const directItem = undefined as any; // Direct buy disabled

  // ✅ State for Personal Info
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");

  // ✅ State for Delivery Info
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [country, setCountry] = useState("");

  // ✅ State for Payment Method
  const [paymentMethod, setPaymentMethod] = useState("COD");

  // ✅ Loading state for Stripe
  const [payLoading, setPayLoading] = useState(false);

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
    if (
      !fullName ||
      !email ||
      !phoneNumber ||
      !address ||
      !city ||
      !postalCode ||
      !country ||
      !paymentMethod
    ) {
      toast.error("Please fill all required details");
      return;
    }

    const amountInPaise = totals.subtotal * 100;

    try {
      setPayLoading(true);

      const shippingInfo = {
        fullName,
        email,             // ✅ email included correctly
        phoneNumber,   // ✅ correct key
        address,       // ✅ correct key
        city,
        postalCode,
        country,
        paymentMethod,
        items: items.map((it: any) => ({
          productId: it.productId || it.Product?.id,
          name: it.Product?.name || "",
          quantity: it.quantity,
          price: it.Product?.price ?? it.price,
        })),
      };

      if (paymentMethod === "Card") {
        // 1️⃣ Create Stripe Payment Intent
        const resultAction = await dispatch(
          createPaymentIntent({
            amount: amountInPaise,
            currency: "pkr",
            productName: "Order Payment",
            shippingInfo,
          })
        );

        if (!createPaymentIntent.fulfilled.match(resultAction)) {
          toast.error(resultAction.payload as string || "Payment failed");
          return;
        }

        const url = resultAction.payload.url;
        if (!url) {
          toast.error("Failed to initiate payment");
          return;
        }

        // 2️⃣ Place order BEFORE redirecting to Stripe
        await dispatch(placeOrderWithShipping(shippingInfo)).unwrap();

        // 3️⃣ Redirect to Stripe Checkout
        window.location.href = url;
      } else {
        // COD / Bank Transfer
        await dispatch(placeOrderWithShipping(shippingInfo)).unwrap();
        toast.success("Order placed successfully");
        navigate("/user/thank-you", { replace: true, state: { name: fullName } });
      }

    } catch (e: any) {
      toast.error(e?.message || "Failed to place order");
    } finally {
      setPayLoading(false);
    }
  };


  // Checkout.tsx

  // const proceedToPay = async () => {
  //   if (
  //     !fullName ||
  //     !email ||
  //     !phoneNumber ||
  //     !address ||
  //     !city ||
  //     !postalCode ||
  //     !country ||
  //     !paymentMethod
  //   ) {
  //     toast.error("Please fill all required details");
  //     return;
  //   }

  //   const amountInPaise = totals.subtotal * 100;

  //   try {
  //     if (paymentMethod === "Card") {
  //       setPayLoading(true);

  //       // ✅ Shipping Info
  //       const shippingInfo = {
  //         fullName,
  //         email,
  //         phoneNumber,
  //         address,
  //         city,
  //         postalCode,
  //         country,
  //         items: items.map((it: any) => ({
  //           productId: it.productId || it.Product?.id,
  //           name: it.Product?.name || "",
  //           quantity: it.quantity,
  //           price: it.Product?.price ?? it.price,
  //         })),
  //       };

  //       // ✅ 1. Call backend to create Stripe Checkout Session
  //       const resultAction = await dispatch(
  //         createPaymentIntent({
  //           amount: amountInPaise,
  //           currency: "pkr",
  //           productName: "Order Payment",
  //           // userId: /* get current user id from auth state */
  //           shippingInfo,
  //           cartItems: shippingInfo.items,
  //         })
  //       );

  //       if (!createPaymentIntent.fulfilled.match(resultAction)) {
  //         toast.error(
  //           (resultAction.payload as string) || "Payment initiation failed"
  //         );
  //         return;
  //       }

  //       const url = resultAction.payload.url;
  //       if (!url) {
  //         toast.error("Payment URL missing");
  //         return;
  //       }

  //       // ✅ 2. Redirect user to Stripe Checkout
  //       window.location.href = url;
  //     } else {
  //       // ✅ COD / Bank Transfer → order create immediately
  //       await dispatch(
  //         placeOrderWithShipping({
  //           fullName,
  //           email,
  //           phoneNumber,
  //           address,
  //           city,
  //           postalCode,
  //           country,
  //           paymentMethod,
  //         })
  //       ).unwrap();

  //       toast.success("Order placed successfully");
  //       navigate("/user/thank-you", { replace: true, state: { name: fullName } });
  //     }
  //   } catch (e: any) {
  //     toast.error(e?.message || "Failed to process payment");
  //   } finally {
  //     setPayLoading(false);
  //   }
  // };
  if (loading)
    return (
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-10">Loading...</div>
    );

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8 grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Personal + Delivery Info */}
      <div className="lg:col-span-2 space-y-4">
        <h2 className="text-xl font-semibold">Personal Information</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <input
            className="border p-3 rounded"
            placeholder="Full Name"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
          />
          <input
            className="border p-3 rounded"
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            className="border p-3 rounded sm:col-span-2"
            placeholder="Phone Number"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
          />
        </div>

        <h2 className="text-xl font-semibold mt-6">Delivery Information</h2>
        <input
          className="border p-3 rounded w-full"
          placeholder="Address"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
        />
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <input
            className="border p-3 rounded"
            placeholder="City"
            value={city}
            onChange={(e) => setCity(e.target.value)}
          />
          <input
            className="border p-3 rounded"
            placeholder="Postal Code"
            value={postalCode}
            onChange={(e) => setPostalCode(e.target.value)}
          />
        </div>
        <input
          className="border p-3 rounded w-full"
          placeholder="Country"
          value={country}
          onChange={(e) => setCountry(e.target.value)}
        />

        {/* ✅ Payment Method */}
        <div>
          <h2 className="text-lg font-semibold mt-6">Payment Method</h2>
          <select
            className="border p-3 rounded w-full mt-2"
            value={paymentMethod}
            onChange={(e) => setPaymentMethod(e.target.value)}
          >
            <option value="COD">Cash on Delivery (COD)</option>
            <option value="Bank Transfer">Bank Transfer</option>
            <option value="Card">Card</option>
          </select>
        </div>
      </div>

      {/* Order Summary */}
      <div className="h-max bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-4">
        <h2 className="text-lg font-semibold mb-3">Order Summary</h2>
        <div className="space-y-2 max-h-60 overflow-auto pr-1">
          {directItem ? (
            <div className="flex items-center justify-between text-sm">
              <span className="truncate mr-2">
                {directItem.name || `Item #${directItem.productId}`}
              </span>
              <span>× {directItem.quantity}</span>
              {directItem.price != null && (
                <span>
                  Rs{Number(directItem.price) *
                    Number(directItem.quantity || 1)}
                </span>
              )}
            </div>
          ) : (
            items.map((it: any) => {
              const price = Number(it.Product?.price ?? it.price ?? 0);
              const qty = Number(it.quantity) || 0;
              return (
                <div
                  key={`${it.cartId}-${it.productId}`}
                  className="flex items-center justify-between text-sm"
                >
                  <span className="truncate mr-2">
                    {it.Product?.name || `Product ${it.productId}`}
                  </span>
                  <span>× {qty}</span>
                  <span>Rs{price * qty}</span>
                </div>
              );
            })
          )}
        </div>
        <div className="border-t my-3" />
        <div className="flex items-center justify-between font-semibold py-1">
          <span>Total</span>
          <span>Rs{totals.subtotal}</span>
        </div>
        <button
          onClick={proceedToPay}
          disabled={items.length === 0 || payLoading}
          className={`mt-4 w-full px-4 py-2 rounded-md text-white ${items.length === 0 || payLoading
              ? "bg-gray-300 cursor-not-allowed"
              : "bg-green-600 hover:bg-green-700"
            }`}
        >
          {payLoading ? "Processing..." : "Proceed to Pay"}
        </button>
      </div>
    </div>
  );
};

export default Checkout;




















// uf
// import React, { useEffect, useMemo, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import type { AppDispatch, RootState } from "../../redux/store";
// import { fetchCart } from "../../redux/user/cartThunks/cartThunks";
// import { placeOrderWithShipping } from "../../redux/user/orderThunks/orderThunks";
// import { createPaymentIntent } from "../../redux/user/paymentThunk/PaymentThunk";
// import { useNavigate } from "react-router-dom";
// import { toast } from "react-hot-toast";

// const Checkout: React.FC = () => {
//   const dispatch = useDispatch<AppDispatch>();
//   const { items, loading } = useSelector((s: RootState) => s.cart);
//   const navigate = useNavigate();
//   const directItem = undefined as any; // Direct buy disabled

//   const [fullName, setFullName] = useState("");
//   const [email, setEmail] = useState("");
//   const [phoneNumber, setPhoneNumber] = useState("");
//   const [address, setAddress] = useState("");
//   const [city, setCity] = useState("");
//   const [postalCode, setPostalCode] = useState("");
//   const [country, setCountry] = useState("");
//   const [paymentMethod, setPaymentMethod] = useState("COD");
//   const [payLoading, setPayLoading] = useState(false);

//   useEffect(() => {
//     dispatch(fetchCart());
//   }, [dispatch]);

//   const totals = useMemo(() => {
//     const subtotal = items.reduce((sum: number, it: any) => {
//       const price = Number(it.Product?.price ?? it.price ?? 0);
//       const qty = Number(it.quantity) || 0;
//       return sum + price * qty;
//     }, 0);
//     return { subtotal };
//   }, [items]);

//   const proceedToPay = async () => {
//     if (!fullName || !email || !phoneNumber || !address || !city || !postalCode || !country || !paymentMethod) {
//       toast.error("Please fill all required details");
//       return;
//     }

//     const amountInPaise = totals.subtotal * 100;

//     try {
//       setPayLoading(true);

//       const shippingInfo = { fullName, email, phoneNumber, address, city, postalCode, country };
//       const cartItemsPayload = items.map((it: any) => ({
//         productId: it.productId || it.Product?.id,
//         name: it.Product?.name || "",
//         quantity: it.quantity,
//         price: it.Product?.price ?? it.price,
//       }));

//       if (paymentMethod === "Card") {
//         // Create Stripe Checkout Session
//         const resultAction = await dispatch(
//           createPaymentIntent({
//             amount: amountInPaise,
//             currency: "pkr",
//             productName: "Order Payment",
//             shippingInfo,
//             cartItems: cartItemsPayload,
//           })
//         );

//         if (!createPaymentIntent.fulfilled.match(resultAction)) {
//           toast.error(resultAction.payload as string || "Payment failed");
//           return;
//         }

//         const url = resultAction.payload.url;
//         if (!url) {
//           toast.error("Payment URL missing");
//           return;
//         }

//         // Redirect to Stripe
//         window.location.href = url;

//       } else {
//         // COD / Bank Transfer → create order immediately
//         await dispatch(placeOrderWithShipping({ ...shippingInfo, paymentMethod })).unwrap();
//         toast.success("Order placed successfully");
//         navigate("/user/thank-you", { replace: true, state: { name: fullName } });
//       }

//     } catch (e: any) {
//       toast.error(e?.message || "Failed to process payment");
//     } finally {
//       setPayLoading(false);
//     }
//   };

//   if (loading) return <div className="max-w-6xl mx-auto px-4 sm:px-6 py-10">Loading...</div>;

//   return (
//     <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8 grid grid-cols-1 lg:grid-cols-3 gap-6">
//       {/* Personal + Delivery Info */}
//       <div className="lg:col-span-2 space-y-4">
//         <h2 className="text-xl font-semibold">Personal Information</h2>
//         <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
//           <input className="border p-3 rounded" placeholder="Full Name" value={fullName} onChange={e => setFullName(e.target.value)} />
//           <input className="border p-3 rounded" type="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} />
//           <input className="border p-3 rounded sm:col-span-2" placeholder="Phone Number" value={phoneNumber} onChange={e => setPhoneNumber(e.target.value)} />
//         </div>

//         <h2 className="text-xl font-semibold mt-6">Delivery Information</h2>
//         <input className="border p-3 rounded w-full" placeholder="Address" value={address} onChange={e => setAddress(e.target.value)} />
//         <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
//           <input className="border p-3 rounded" placeholder="City" value={city} onChange={e => setCity(e.target.value)} />
//           <input className="border p-3 rounded" placeholder="Postal Code" value={postalCode} onChange={e => setPostalCode(e.target.value)} />
//         </div>
//         <input className="border p-3 rounded w-full" placeholder="Country" value={country} onChange={e => setCountry(e.target.value)} />

//         <div>
//           <h2 className="text-lg font-semibold mt-6">Payment Method</h2>
//           <select className="border p-3 rounded w-full mt-2" value={paymentMethod} onChange={e => setPaymentMethod(e.target.value)}>
//             <option value="COD">Cash on Delivery (COD)</option>
//             <option value="Bank Transfer">Bank Transfer</option>
//             <option value="Card">Card</option>
//           </select>
//         </div>
//       </div>

//       {/* Order Summary */}
//       <div className="h-max bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-4">
//         <h2 className="text-lg font-semibold mb-3">Order Summary</h2>
//         <div className="space-y-2 max-h-60 overflow-auto pr-1">
//           {directItem ? (
//             <div className="flex items-center justify-between text-sm">
//               <span className="truncate mr-2">{directItem.name || `Item #${directItem.productId}`}</span>
//               <span>× {directItem.quantity}</span>
//               {directItem.price != null && <span>₹{Number(directItem.price) * Number(directItem.quantity || 1)}</span>}
//             </div>
//           ) : (
//             items.map((it: any) => {
//               const price = Number(it.Product?.price ?? it.price ?? 0);
//               const qty = Number(it.quantity) || 0;
//               return (
//                 <div key={`${it.cartId}-${it.productId}`} className="flex items-center justify-between text-sm">
//                   <span className="truncate mr-2">{it.Product?.name || `Product ${it.productId}`}</span>
//                   <span>× {qty}</span>
//                   <span>₹{price * qty}</span>
//                 </div>
//               );
//             })
//           )}
//         </div>
//         <div className="border-t my-3" />
//         <div className="flex items-center justify-between font-semibold py-1">
//           <span>Total</span>
//           <span>₹{totals.subtotal}</span>
//         </div>
//         <button
//           onClick={proceedToPay}
//           disabled={items.length === 0 || payLoading}
//           className={`mt-4 w-full px-4 py-2 rounded-md text-white ${items.length === 0 || payLoading ? "bg-gray-300 cursor-not-allowed" : "bg-green-600 hover:bg-green-700"}`}
//         >
//           {payLoading ? "Processing..." : "Proceed to Pay"}
//         </button>
//       </div>
//     </div>
//   );
// };

// export default Checkout;
