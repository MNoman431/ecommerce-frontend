
import React, { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../../redux/store";
import { fetchProductById, deleteProduct } from "../../redux/admin/productThunks/productThunk";
import { toast } from "react-hot-toast";

const ViewProduct: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const { selectedProduct, loading, error } = useSelector(
    (state: RootState) => state.products
  );

  useEffect(() => {
    if (id) {
      dispatch(fetchProductById(Number(id)));
    }
  }, [dispatch, id]);

  if (loading)
    return <p className="text-center text-lg font-medium text-gray-600">⏳ Loading product...</p>;
  if (error) return <p className="text-center text-red-500">{error}</p>;
  if (!selectedProduct) return <p className="text-center text-gray-500">Product not found.</p>;

  return (
    <div className="p-6 max-w-4xl mx-auto">
      {/* Multiple Images */}
      {selectedProduct.images && Array.isArray(selectedProduct.images) && selectedProduct.images.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
          {selectedProduct.images.map((url: string, idx: number) => (
            <img
              key={idx}
              src={url}
              alt={`${selectedProduct.name}-${idx}`}
              className="w-full h-64 object-cover rounded-xl shadow"
            />
          ))}
        </div>
      ) : (
        selectedProduct.imageUrl && (
          <img
            src={selectedProduct.imageUrl}
            alt={selectedProduct.name}
            className="w-full h-96 object-cover rounded-xl shadow mb-6"
          />
        )
      )}

      {/* Product Info */}
      <div className="bg-white rounded-xl shadow p-6">
        <h1 className="text-3xl font-bold text-gray-800">{selectedProduct.name}</h1>
        <p className="text-gray-600 mt-2">{selectedProduct.description || "No description"}</p>

        {/* Extra details */}
        <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
          <div className="flex flex-col">
            <span className="font-semibold text-gray-700">Price:</span>
            <span className="text-lg font-bold text-gray-900">${selectedProduct.price}</span>
          </div>

          {selectedProduct.category && (
            <div className="flex flex-col">
              <span className="font-semibold text-gray-700">Category:</span>
              <span className="bg-blue-100 text-blue-700 px-2 py-1 rounded-md w-fit mt-1">
                {selectedProduct.category}
              </span>
            </div>
          )}

          {selectedProduct.stock !== undefined && (
            <div className="flex flex-col">
              <span className="font-semibold text-gray-700">Stock:</span>
              <span
                className={`px-2 py-1 rounded-md w-fit mt-1 ${
                  selectedProduct.stock > 0
                    ? "bg-green-100 text-green-700"
                    : "bg-red-100 text-red-600"
                }`}
              >
                {selectedProduct.stock > 0
                  ? `${selectedProduct.stock} in stock`
                  : "Out of stock"}
              </span>
            </div>
          )}

          {/* New fields */}
          {selectedProduct.carModel && (
            <div className="flex flex-col">
              <span className="font-semibold text-gray-700">Car Model:</span>
              <span className="text-gray-800 mt-1">{selectedProduct.carModel}</span>
            </div>
          )}

          {selectedProduct.color && (
            <div className="flex flex-col">
              <span className="font-semibold text-gray-700">Color:</span>
              <span className="text-gray-800 mt-1">{selectedProduct.color}</span>
            </div>
          )}

          {selectedProduct.material && (
            <div className="flex flex-col">
              <span className="font-semibold text-gray-700">Material:</span>
              <span className="text-gray-800 mt-1">{selectedProduct.material}</span>
            </div>
          )}

          {selectedProduct.addedBy && (
            <div className="flex flex-col">
              <span className="font-semibold text-gray-700">Added By (Admin ID):</span>
              <span className="text-gray-800 mt-1">{selectedProduct.addedBy}</span>
            </div>
          )}
        </div>

        {/* Buttons */}
        <div className="mt-8 flex gap-4">
          <button
            className="bg-yellow-400 text-gray-800 px-4 py-2 rounded-md hover:bg-yellow-500 transition"
            onClick={() => navigate(`/add-product/${Number(selectedProduct.id)}`)}
          >
            ✏️ Edit
          </button>
          <button
            className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition"
            onClick={async () => {
              if (window.confirm("Are you sure you want to delete this product?")) {
                const res = await dispatch(deleteProduct(Number(selectedProduct.id)));
                if (res.meta.requestStatus === "fulfilled") {
                  toast.success("Product deleted successfully!");
                  navigate("/products");
                } else {
                  // toast.error(res.payload || "Failed to delete product");
                  toast.error(res.payload as any || "Failed to delete product");

                }
              }
            }}
          >
            🗑️ Delete
          </button>
          <button
            className="bg-gray-200 px-4 py-2 rounded-md hover:bg-gray-300 transition"
            onClick={() => navigate("/products")}
          >
            🔙 Back
          </button>
        </div>
      </div>
    </div>
  );
};

export default ViewProduct;
