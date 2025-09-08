// import React, { useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import type { AppDispatch, RootState } from "../../redux/store";
// import { fetchOrders } from "../../redux/user/orderThunks/orderThunks";

// const Orders: React.FC = () => {
//   const dispatch = useDispatch<AppDispatch>();
//   const { orders, loading } = useSelector((s: RootState) => s.orders);

//   useEffect(() => {
//     // fetch on mount; future: add cache check to avoid flicker
//     if (!orders || orders.length === 0) {
//       dispatch(fetchOrders());
//     }
//   }, [dispatch, orders.length]);

//   const statusBadge = (status: string) => {
//     const map: Record<string, string> = {
//       pending: "bg-yellow-50 text-yellow-700",
//       accepted: "bg-blue-50 text-blue-700",
//       ready_to_ship: "bg-indigo-50 text-indigo-700",
//       shipped: "bg-purple-50 text-purple-700",
//       delivered: "bg-green-50 text-green-700",
//       cancelled: "bg-red-50 text-red-700",
//     };
//     const cls = map[(status || '').toLowerCase()] || "bg-gray-100 text-gray-700";
//     return <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold ${cls}`}>{status}</span>;
//   };

//   return (
//     <div className="max-w-5xl mx-auto px-6 py-10">
//       <div className="flex items-center justify-between mb-4">
//         <h1 className="text-2xl font-bold">Your Orders</h1>
//         {/* <button onClick={() => dispatch(fetchOrders())} className="px-3 py-1.5 rounded border border-gray-300 text-sm hover:bg-gray-50">Refresh</button> */}
//       </div>
//       {loading ? (
//         <div className="space-y-3">
//           {Array.from({ length: 3 }).map((_, i) => (
//             <div key={i} className="animate-pulse border rounded-xl p-4 bg-white">
//               <div className="h-4 w-40 bg-gray-200 rounded" />
//               <div className="mt-2 h-3 w-24 bg-gray-200 rounded" />
//               <div className="mt-3 h-3 w-64 bg-gray-200 rounded" />
//             </div>
//           ))}
//         </div>
//       ) : orders.length === 0 ? (
//         <p>No orders yet.</p>
//       ) : (
//         <div className="space-y-4">
//           {orders.map((o: any) => (
//             <div key={o.id} className="border rounded-xl p-4 bg-white shadow-sm">
//               <div className="flex flex-wrap items-center justify-between gap-2">
//                 <div className="flex items-center gap-3">
//                   <p className="font-semibold">Order #{o.id}</p>
//                   {statusBadge(o.status)}
//                 </div>
//                 <div className="text-sm text-gray-500">
//                   {o.createdAt ? new Date(o.createdAt).toLocaleString() : ''}
//                 </div>
//               </div>
//               <div className="mt-2 text-sm text-gray-700">
//                 <span className="font-medium">Total:</span> ₹{o.totalAmount}
//               </div>
//               <div className="mt-3">
//                 <h4 className="text-sm font-semibold text-gray-700 mb-1">Items</h4>
//                 <ul className="list-disc pl-5 text-sm text-gray-700">
//                   {(o.OrderItems || o.items || []).map((it: any) => (
//                     <li key={it.id}>{it.Product?.name || `Product ${it.productId}`} × {it.quantity}</li>
//                   ))}
//                 </ul>
//               </div>
//             </div>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// };

// export default Orders;




import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../../redux/store";
import { fetchOrders } from "../../redux/user/orderThunks/orderThunks";

const Orders: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { orders, loading } = useSelector((s: RootState) => s.orders);

  useEffect(() => {
    // fetch on mount; future: add cache check to avoid flicker
    if (!orders || orders.length === 0) {
      dispatch(fetchOrders());
    }
  }, [dispatch, orders.length]);

  const statusBadge = (status: string) => {
    const map: Record<string, string> = {
      pending: "bg-yellow-50 text-yellow-700",
      accepted: "bg-blue-50 text-blue-700",
      ready_to_ship: "bg-indigo-50 text-indigo-700",
      shipped: "bg-purple-50 text-purple-700",
      delivered: "bg-green-50 text-green-700",
      cancelled: "bg-red-50 text-red-700",
    };
    const cls = map[(status || "").toLowerCase()] || "bg-gray-100 text-gray-700";
    return (
      <span
        className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold ${cls}`}
      >
        {status}
      </span>
    );
  };

  return (
    <div className="max-w-5xl mx-auto px-6 py-10">
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-2xl font-bold">Your Orders</h1>
      </div>

      {loading ? (
        <div className="space-y-3">
          {Array.from({ length: 3 }).map((_, i) => (
            <div
              key={i}
              className="animate-pulse border rounded-xl p-4 bg-white"
            >
              <div className="h-4 w-40 bg-gray-200 rounded" />
              <div className="mt-2 h-3 w-24 bg-gray-200 rounded" />
              <div className="mt-3 h-3 w-64 bg-gray-200 rounded" />
            </div>
          ))}
        </div>
      ) : orders.length === 0 ? (
        <p>No orders yet.</p>
      ) : (
        <div className="space-y-4">
          {orders.map((o: any) => (
            <div
              key={o.id}
              className="border rounded-xl p-4 bg-white shadow-sm"
            >
              {/* Order header */}
              <div className="flex flex-wrap items-center justify-between gap-2">
                <div className="flex items-center gap-3">
                  <p className="font-semibold">Order #{o.id}</p>
                  {statusBadge(o.status)}
                </div>
                <div className="text-sm text-gray-500">
                  {o.createdAt ? new Date(o.createdAt).toLocaleString() : ""}
                </div>
              </div>

              {/* Total */}
              <div className="mt-2 text-sm text-gray-700">
                <span className="font-medium">Total:</span> ₹{o.totalAmount}
              </div>

              {/* Personal Info */}
              <div className="mt-2 text-sm text-gray-700">
                <h4 className="font-semibold text-gray-800 mb-1">
                  Personal Info
                </h4>
                <p>
                  <span className="font-medium">Name:</span> {o.fullName}
                </p>
                <p>
                  <span className="font-medium">Email:</span> {o.email}
                </p>
                <p>
                  <span className="font-medium">Phone:</span> {o.phone}
                </p>
                <p>
                  <span className="font-medium">Address:</span> {o.address},{" "}
                  {o.city}
                </p>
              </div>

              {/* Payment Method */}
              <div className="mt-2 text-sm text-gray-700">
                <span className="font-medium">Payment Method:</span>{" "}
                {o.paymentMethod}
              </div>

              {/* Items */}
              <div className="mt-3">
                <h4 className="text-sm font-semibold text-gray-700 mb-1">
                  Items
                </h4>
                <ul className="list-disc pl-5 text-sm text-gray-700">
                  {(o.OrderItems || o.items || []).map((it: any) => (
                    <li key={it.id}>
                      {it.Product?.name || `Product ${it.productId}`} ×{" "}
                      {it.quantity}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Orders;
