import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchTotalProducts } from "../../redux/admin/productThunks/productThunk";
import { fetchOrdersCount } from "../../redux/admin/orderThunks/OrderThunk";
import type { AppDispatch, RootState } from "../../redux/store";

const Dashboard: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const totalProducts = useSelector((state: RootState) => state.products.totalProducts);
  const totalOrders = useSelector((state: RootState) => (state as any).adminOrders.totalCount as number);

  useEffect(() => {
    dispatch(fetchTotalProducts());
    dispatch(fetchOrdersCount());
  }, [dispatch]);

  return (
    <div className="p-6">
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight">Dashboard</h1>
          <p className="mt-1 text-sm text-gray-600">Overview of key marketplace metrics</p>
        </div>
      </div>

      <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
        {/* Total Products */}
        <div className="relative overflow-hidden rounded-2xl border border-blue-200 bg-gradient-to-br from-blue-50 to-white shadow-sm transition hover:shadow-md">
          <div className="p-5">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-blue-700">Total Products</p>
                <p className="mt-2 text-3xl font-bold text-blue-900">{totalProducts}</p>
              </div>
              <div className="shrink-0 rounded-xl bg-blue-600/10 p-3 text-blue-700">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-8 w-8">
                  <path d="M21 7.5V18a3 3 0 0 1-3 3H6a3 3 0 0 1-3-3V7.5m18 0A2.25 2.25 0 0 0 19.5 5.25H4.5A2.25 2.25 0 0 0 2.25 7.5m18 0V9A2.25 2.25 0 0 1 18 11.25H6A2.25 2.25 0 0 1 3.75 9V7.5" />
                </svg>
              </div>
            </div>
          </div>
          <div className="h-1 w-full bg-gradient-to-r from-blue-400 via-blue-500 to-blue-600" />
        </div>

        {/* Total Orders */}
        <div className="relative overflow-hidden rounded-2xl border border-emerald-200 bg-gradient-to-br from-emerald-50 to-white shadow-sm transition hover:shadow-md">
          <div className="p-5">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-emerald-700">Total Orders</p>
                <p className="mt-2 text-3xl font-bold text-emerald-900">{totalOrders}</p>
              </div>
              <div className="shrink-0 rounded-xl bg-emerald-600/10 p-3 text-emerald-700">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-8 w-8">
                  <path d="M2.25 6.75A2.25 2.25 0 0 1 4.5 4.5h15a2.25 2.25 0 0 1 2.25 2.25v10.5A2.25 2.25 0 0 1 19.5 19.5h-15A2.25 2.25 0 0 1 2.25 17.25V6.75zm3 0h13.5v3H5.25v-3z" />
                </svg>
              </div>
            </div>
          </div>
          <div className="h-1 w-full bg-gradient-to-r from-emerald-400 via-emerald-500 to-emerald-600" />
        </div>
      </div>
    </div>
  );
};


export default Dashboard;
