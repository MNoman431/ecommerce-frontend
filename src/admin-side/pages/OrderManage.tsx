import React, { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../../redux/store";
import { fetchAllOrders } from "../../redux/admin/orderThunks/OrderThunk";

const OrderManage: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { orders, loading, error } = useSelector((s: RootState) => (s as any).adminOrders || { orders: [], loading: false, error: null });

  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  useEffect(() => {
    dispatch(fetchAllOrders());
  }, [dispatch]);

  const totalPages = useMemo(() => Math.max(1, Math.ceil((orders?.length || 0) / pageSize)), [orders, pageSize]);
  const paginatedOrders = useMemo(() => {
    const start = (page - 1) * pageSize;
    return (orders || []).slice(start, start + pageSize);
  }, [orders, page, pageSize]);

  useEffect(() => {
    // Clamp page if data shrinks or pageSize changes
    if (page > totalPages) setPage(totalPages);
  }, [totalPages, page]);

  return (
    <div className="p-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">All Orders</h1>
        <div className="flex items-center gap-3">
          <label className="text-sm text-gray-600">Rows per page</label>
          <select
            value={pageSize}
            onChange={(e) => { setPageSize(Number(e.target.value)); setPage(1); }}
            className="border rounded px-2 py-1 text-sm"
          >
            {[5, 10, 20, 50].map(sz => (
              <option key={sz} value={sz}>{sz}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="mt-4 bg-white border border-gray-200 rounded-xl shadow-sm">
        {loading ? (
          <div className="p-6">Loading...</div>
        ) : error ? (
          <div className="p-6 text-red-600">{String(error)}</div>
        ) : (orders?.length || 0) === 0 ? (
          <div className="p-6">No orders found.</div>
        ) : (
          <>
            <div className="overflow-auto rounded-t-xl">
              <table className="min-w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Order #</th>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">User</th>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Email</th>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Total</th>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Status</th>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Items</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {paginatedOrders.map((o: any) => (
                    <tr key={o.id} className="hover:bg-gray-50">
                      <td className="px-4 py-3 text-sm">{o.id}</td>
                      <td className="px-4 py-3 text-sm">{o.User?.name || o.user?.name || o.userId}</td>
                      <td className="px-4 py-3 text-sm">{o.User?.email || o.user?.email || "-"}</td>
                      <td className="px-4 py-3 text-sm font-medium">₹{o.totalAmount}</td>
                      <td className="px-4 py-3 text-sm">
                        <span className="inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold bg-blue-50 text-blue-700">{o.status}</span>
                      </td>
                      <td className="px-4 py-3 text-sm">
                        <div className="max-h-20 overflow-auto pr-1 space-y-1">
                          {(o.OrderItems || []).map((it: any) => (
                            <div key={it.id} className="text-xs text-gray-700">
                              {(it.Product?.name || `#${it.productId}`)} × {it.quantity}
                            </div>
                          ))}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="flex items-center justify-between px-4 py-3 border-t">
              <p className="text-sm text-gray-600">Page {page} of {totalPages} — {(orders?.length || 0)} results</p>
              <div className="inline-flex items-center gap-2">
                <button
                  onClick={() => setPage((p) => Math.max(1, p - 1))}
                  disabled={page <= 1}
                  className={`px-3 py-1.5 rounded border text-sm ${page <= 1 ? 'text-gray-400 border-gray-200 bg-gray-50 cursor-not-allowed' : 'text-gray-700 border-gray-300 hover:bg-gray-50'}`}
                >
                  Previous
                </button>
                <button
                  onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                  disabled={page >= totalPages}
                  className={`px-3 py-1.5 rounded border text-sm ${page >= totalPages ? 'text-gray-400 border-gray-200 bg-gray-50 cursor-not-allowed' : 'text-gray-700 border-gray-300 hover:bg-gray-50'}`}
                >
                  Next
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default OrderManage;



