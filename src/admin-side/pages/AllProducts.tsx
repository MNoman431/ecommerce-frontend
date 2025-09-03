
// src/components/Admin/AllProducts.tsx
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../../redux/store";
import { fetchProducts } from "../../redux/admin/productThunks/productThunk";
import { useNavigate } from "react-router-dom";

interface Product {
  id: number;
  name: string;
  price: number;
  description?: string;
  category?: string;
  stock?: number;
  imageUrl?: string;
  addedBy?: number | string;
}

const AllProducts: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const { products = [], loading, error } = useSelector(
    (state: RootState) => state.products
  );

  const { user } = useSelector((state: RootState) => state.auth || {});

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  if (loading)
    return <p className="text-center text-lg font-medium text-gray-600">⏳ Loading products...</p>;
  if (error) return <p className="text-center text-red-500">{error}</p>;

  // If API doesn't include 'addedBy', show all products. Otherwise, filter by current admin id.
  const hasAddedBy = Array.isArray(products) && products.some((p: Product) => p.addedBy !== undefined && p.addedBy !== null);
  const currentAdminId = user?.id != null ? String(user.id) : "";
  const visibleProducts = hasAddedBy
    ? products.filter((p: Product) => String(p.addedBy ?? "") === currentAdminId)
    : products;

  return (
    <div className="p-6">
      {/* Header Section */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">Your Products</h1>
          <p className="text-gray-500">Manage the products you’ve added.</p>
        </div>
        <button
          onClick={() => navigate("/add-product")}
          className="bg-green-600 hover:bg-green-700 text-white px-5 py-2.5 rounded-lg shadow transition"
        >
          + Add New Product
        </button>
      </div>

      {/* Empty State */}
      {visibleProducts.length === 0 ? (
        <div className="flex flex-col items-center justify-center mt-20 text-gray-500">
          <p className="text-lg">No products found.</p>
          <button
            onClick={() => navigate("/add-product")}
            className="mt-4 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg shadow transition"
          >
            Add your first product
          </button>
        </div>
      ) : (
        // Product Grid
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {visibleProducts.map((product: Product) => (
            <div
              key={product.id}
              className="bg-white rounded-xl shadow-md hover:shadow-xl transition overflow-hidden border border-gray-200 flex flex-col"
            >
              {/* Image */}
              {product.imageUrl ? (
                <img
                  src={product.imageUrl}
                  alt={product.name}
                  className="w-full h-52 object-cover"
                />
              ) : (
                <div className="w-full h-52 flex items-center justify-center bg-gray-100 text-gray-400">
                  No Image
                </div>
              )}

              {/* Card Body */}
              <div className="p-5 flex flex-col flex-1">
                <h2 className="text-lg font-semibold text-gray-800 truncate">{product.name}</h2>
                <p className="text-gray-500 text-sm mt-1 line-clamp-2 flex-1">
                  {product.description || "No description available."}
                </p>

                {/* Tags */}
                <div className="mt-3 flex flex-wrap gap-2 text-xs font-medium">
                  {product.category && (
                    <span className="bg-blue-100 text-blue-700 px-2 py-1 rounded-md">
                      {product.category}
                    </span>
                  )}
                  {product.stock !== undefined && (
                    <span
                      className={`px-2 py-1 rounded-md ${
                        product.stock > 0
                          ? "bg-green-100 text-green-700"
                          : "bg-red-100 text-red-600"
                      }`}
                    >
                      {product.stock > 0 ? `${product.stock} in stock` : "Out of stock"}
                    </span>
                  )}
                </div>

                {/* Price */}
                <p className="text-lg font-bold text-gray-900 mt-3">${product.price}</p>

                {/* Actions */}
                <div className="mt-5 flex justify-between gap-3">
                  <button
                    className="flex-1 bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition"
                    onClick={() => navigate(`/view-product/${product.id}`)}
                  >
                    View
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AllProducts;
