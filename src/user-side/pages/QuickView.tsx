import React, { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../../redux/store";
import { fetchProductById } from "../../redux/admin/productThunks/productThunk";
import { addToCart, fetchCart } from "../../redux/user/cartThunks";
import { toast } from "react-hot-toast";

const QuickView: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const { selectedProduct, loading, error } = useSelector(
    (state: RootState) => state.products
  );

  useEffect(() => {
    if (id) dispatch(fetchProductById(Number(id)));
  }, [dispatch, id]);

  if (loading) return <p className="text-center py-10">Loading product...</p>;
  if (error) return <p className="text-center py-10 text-red-500">{error}</p>;
  if (!selectedProduct) return <p className="text-center py-10">Product not found.</p>;

  const image = selectedProduct.imageUrl || (selectedProduct.images?.[0] ?? "");

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-6 sm:py-10 text-gray-900 dark:text-gray-100">
      <button
        onClick={() => navigate(-1)}
        className="mb-6 text-sm text-gray-600 dark:text-gray-300 hover:text-red-600"
      >
        ← Back
      </button>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
        <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-100 dark:border-gray-700 overflow-hidden">
          {image ? (
            <img src={image} alt={selectedProduct.name || selectedProduct.title} className="w-full h-full object-cover max-h-[60vh]" />
          ) : (
            <div className="h-64 sm:h-80 flex items-center justify-center text-gray-400">No Image</div>
          )}
        </div>

        <div>
          <h1 className="text-xl sm:text-2xl font-bold">{selectedProduct.title || selectedProduct.name}</h1>
          {selectedProduct.price != null && (
            <p className="mt-2 text-red-600 font-bold text-lg sm:text-xl">₹{selectedProduct.price}</p>
          )}
          {selectedProduct.description && (
            <p className="mt-4 text-sm text-gray-600 dark:text-gray-300 leading-relaxed">{selectedProduct.description}</p>
          )}

          <div className="mt-6 grid grid-cols-1 sm:flex sm:gap-3">
            <button
              onClick={() => {
                if (selectedProduct?.id != null) {
                  dispatch(addToCart({ productId: selectedProduct.id as number, quantity: 1 }))
                    .then(() => {
                      dispatch(fetchCart());
                      toast.success("Added to cart");
                    })
                    .catch(() => toast.error("Failed to add to cart"));
                }
              }}
              className="px-4 py-2 rounded-md bg-red-600 text-white hover:bg-red-700 w-full sm:w-auto"
            >
              Add to Cart
            </button>
            <button className="mt-2 sm:mt-0 px-4 py-2 rounded-md border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800 w-full sm:w-auto">BuyNow</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuickView;
