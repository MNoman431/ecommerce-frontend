import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchTotalProducts } from "../../redux/admin/productThunks/productThunk";
import type { AppDispatch, RootState } from "../../redux/store";

const Dashboard: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const totalProducts = useSelector((state: RootState) => state.products.totalProducts);

  useEffect(() => {
    dispatch(fetchTotalProducts());
  }, [dispatch]);

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold">Dashboard</h1>
      <div className="mt-6 bg-blue-100 p-4 rounded-lg shadow">
        <h2 className="text-lg font-semibold">Total Products</h2>
        <p className="text-2xl font-bold">{totalProducts}</p>
      </div>
    </div>
  );
};


export default Dashboard;
