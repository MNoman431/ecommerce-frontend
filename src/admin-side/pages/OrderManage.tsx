import React, { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../../redux/store";
import { fetchAllOrders, updateOrderStatusThunk } from "../../redux/admin/orderThunks/OrderThunk";

const OrderManage: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { orders, loading, error } = useSelector((s: RootState) => (s as any).adminOrders || { orders: [], loading: false, error: null });

  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [selected, setSelected] = useState<any | null>(null);

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

  const printSlip = (o: any) => {
  if (!o) return;
  const userName = o.User?.name || o.user?.name || o.userId || "-";
  const addressLines = [
    o.fullName,
    o.phoneNumber,
    o.address,
    `${o.city || ''} ${o.postalCode || ''}`,
    o.country
  ].filter(Boolean).join('<br/>');
  const totalItems = (o.OrderItems || []).reduce((sum: number, it: any) => sum + (Number(it.quantity) || 0), 0);
  const paymentMethod = o.paymentMethod || 'N/A';

  const win = window.open('', 'PRINT', 'height=650,width=900,top=100,left=150');
  if (!win) return;
  win.document.write(`
    <html>
      <head>
        <title>Order Slip #${o.id}</title>
        <style>
          body { font-family: Arial, sans-serif; color: #111; margin: 24px; }
          .slip { border: 1px solid #e5e7eb; border-radius: 12px; padding: 16px; width: 480px; }
          .header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 12px; }
          .brand { font-weight: 800; font-size: 18px; }
          .muted { color: #6b7280; font-size: 12px; }
          .row { display: flex; justify-content: space-between; margin: 6px 0; font-size: 14px; }
          .label { color: #374151; }
          .value { font-weight: 600; }
          .line { border-top: 1px dashed #e5e7eb; margin: 10px 0; }
        </style>
      </head>
      <body onload="window.print();window.close()">
        <div class="slip">
          <div class="header">
            <div class="brand">Order Slip</div>
            <div class="muted">#${o.id}</div>
          </div>
          <div class="row"><span class="label">Order Date</span><span class="value">${o.createdAt ? new Date(o.createdAt).toLocaleString() : '-'}</span></div>
          <div class="row"><span class="label">Status</span><span class="value">${o.status}</span></div>
          <div class="row"><span class="label">Customer</span><span class="value">${userName}</span></div>
          <div class="line"></div>
          <div class="row"><span class="label">Ship To</span><span class="value" style="text-align:right">${addressLines || '-'}</span></div>
          <div class="row"><span class="label">Payment</span><span class="value">${paymentMethod}</span></div>
          <div class="line"></div>
          <div class="row"><span class="label">Total Items</span><span class="value">${totalItems}</span></div>
          <div class="row"><span class="label">Total Amount</span><span class="value">${o.totalAmount}</span></div>
        </div>
      </body>
    </html>
  `);
  win.document.close();
  win.focus();
};

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
                    <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {paginatedOrders.map((o: any) => (
                    <tr key={o.id} className="hover:bg-gray-50">
                      <td className="px-4 py-3 text-sm">{o.id}</td>
                      <td className="px-4 py-3 text-sm">{o.User?.name || o.user?.name || o.userId}</td>
                      <td className="px-4 py-3 text-sm">{o.User?.email || o.user?.email || "-"}</td>
                      <td className="px-4 py-3 text-sm font-medium">Rs{o.totalAmount}</td>
                      <td className="px-4 py-3 text-sm">
                        <div className="inline-flex items-center gap-2">
                          <span className="inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold bg-blue-50 text-blue-700">{o.status}</span>
                          <select
                            className="border rounded px-2 py-1 text-xs"
                            value={o.status}
                            onChange={(e) => dispatch(updateOrderStatusThunk({ id: o.id, status: e.target.value })).then(() => dispatch(fetchAllOrders()))}
                          >
                            <option value="pending">pending</option>
                            <option value="accepted">accepted</option>
                            <option value="cancelled">cancelled</option>
                            <option value="ready_to_ship">ready_to_ship</option>
                            <option value="shipped">shipped</option>
                            <option value="delivered">delivered</option>
                          </select>
                        </div>
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
                      <td className="px-4 py-3 text-sm">
                        <button
                          onClick={() => setSelected(o)}
                          className="inline-flex items-center rounded-md border border-gray-300 px-3 py-1.5 text-sm text-gray-700 hover:bg-gray-50"
                        >
                          View
                        </button>
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

      {/* View Modal */}
      {selected && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div className="absolute inset-0 bg-black/40" onClick={() => setSelected(null)} />
          <div className="relative z-10 w-full max-w-2xl rounded-2xl bg-white p-6 shadow-xl">
            <div className="flex items-start justify-between">
              <h3 className="text-lg font-semibold">Order Details</h3>
              <button onClick={() => setSelected(null)} className="rounded p-1 text-gray-500 hover:bg-gray-100">✕</button>
            </div>
            <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1 text-sm">
                <p><span className="font-medium text-gray-600">Order #:</span> {selected.id}</p>
                <p><span className="font-medium text-gray-600">Status:</span> {selected.status}</p>
                <p><span className="font-medium text-gray-600">Total:</span> Rs{selected.totalAmount}</p>
              </div>
              <div className="space-y-1 text-sm">
                <p><span className="font-medium text-gray-600">User:</span> {selected.User?.name || selected.user?.name || selected.userId}</p>
                <p><span className="font-medium text-gray-600">Email:</span> {selected.User?.email || selected.user?.email || '-'}</p>
              </div>
            </div>
            {/* Summary only - no product names */}
            <div className="mt-4 grid grid-cols-2 gap-4">
              <div className="rounded border p-3">
                <div className="text-xs text-gray-500">Order Date</div>
                <div className="text-sm font-medium">{selected.createdAt ? new Date(selected.createdAt).toLocaleString() : '-'}</div>
              </div>
              <div className="rounded border p-3">
                <div className="text-xs text-gray-500">Total Items</div>
                <div className="text-sm font-medium">{(selected.OrderItems || []).reduce((sum: number, it: any) => sum + (Number(it.quantity)||0), 0)}</div>
              </div>
              <div className="rounded border p-3">
                <div className="text-xs text-gray-500">Status</div>
                <div className="text-sm font-medium capitalize">{selected.status}</div>
              </div>
              <div className="rounded border p-3">
                <div className="text-xs text-gray-500">Total Amount</div>
                <div className="text-sm font-medium">Rs{selected.totalAmount}</div>
              </div>
            </div>
            {/* Shipping info */}
  {/* Shipping info */}
{selected.fullName || selected.address ? (
  <div className="mt-4">
    <h4 className="text-sm font-semibold text-gray-700">Shipping</h4>
    <div className="mt-2 text-sm text-gray-700">
      <p>{selected.fullName || "N/A"}</p>
      <p>{selected.phoneNumber || "N/A"}</p>
      <p>{selected.address || "N/A"}</p>
      <p>{(selected.city || "") + " " + (selected.postalCode || "")}</p>
      <p>{selected.country || "N/A"}</p>
    </div>
    <div className="mt-2 text-sm text-gray-700">
      <p><strong>Payment Method:</strong> {selected.paymentMethod || "N/A"}</p>
    </div>
  </div>
) : (
  <div className="mt-4 text-sm text-gray-500">No shipping details available.</div>
)}


            <div className="mt-6 flex items-center justify-end gap-3">
              <button onClick={() => printSlip(selected)} className="rounded-md border px-4 py-2 text-sm hover:bg-gray-50">Download Slip / Print</button>
              <button onClick={() => setSelected(null)} className="rounded-md bg-gray-800 px-4 py-2 text-white hover:bg-black">Close</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default OrderManage;








