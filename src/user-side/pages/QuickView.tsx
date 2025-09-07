import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../../redux/store";
import { fetchProductById } from "../../redux/admin/productThunks/productThunk";
import { toast } from "react-hot-toast";
import { FiHeart, FiShoppingCart, FiStar, FiTruck, FiShield, FiRotateCcw } from "react-icons/fi";
import { addToCart, fetchCart } from "../../redux/user/cartThunks/cartThunks";

const QuickView: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [isWishlisted, setIsWishlisted] = useState(false);

  const { selectedProduct, loading, error } = useSelector(
    (state: RootState) => state.products
  );

  useEffect(() => {
    if (id) dispatch(fetchProductById(Number(id)));
  }, [dispatch, id]);

  if (loading) return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
      <div className="animate-pulse">
        <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded w-32 mb-6"></div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="h-96 bg-gray-200 dark:bg-gray-700 rounded-xl"></div>
          <div className="space-y-4">
            <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded w-3/4"></div>
            <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-1/4"></div>
            <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-full"></div>
            <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-2/3"></div>
          </div>
        </div>
      </div>
    </div>
  );
  
  if (error) return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
      <div className="text-center py-20">
        <div className="text-red-500 text-xl mb-4">⚠️ Error Loading Product</div>
        <p className="text-gray-600 dark:text-gray-400">{error}</p>
        <button 
          onClick={() => navigate(-1)}
          className="mt-4 px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
        >
          Go Back
        </button>
      </div>
    </div>
  );
  
  if (!selectedProduct) return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
      <div className="text-center py-20">
        <div className="text-gray-500 text-xl mb-4">🔍 Product Not Found</div>
        <p className="text-gray-600 dark:text-gray-400">The product you're looking for doesn't exist.</p>
        <button 
          onClick={() => navigate(-1)}
          className="mt-4 px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
        >
          Go Back
        </button>
      </div>
    </div>
  );

  const images = selectedProduct.images || [selectedProduct.imageUrl].filter(Boolean);
  const currentImage = images[selectedImage] || "";
  const originalPrice = selectedProduct.originalPrice || selectedProduct.price;
  const discount = originalPrice && selectedProduct.price ? Math.round(((originalPrice - selectedProduct.price) / originalPrice) * 100) : 0;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 sm:py-10 text-gray-900 dark:text-gray-100">
      {/* Breadcrumb */}
      <nav className="mb-8">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center text-sm text-gray-600 dark:text-gray-300 hover:text-red-600 transition-colors"
        >
          <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Back to Products
        </button>
      </nav>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
        {/* Image Gallery */}
        <div className="space-y-4">
          {/* Main Image */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 overflow-hidden shadow-lg">
            {currentImage ? (
              <img 
                src={currentImage} 
                alt={selectedProduct.name || selectedProduct.title} 
                className="w-full h-96 sm:h-[500px] object-cover transition-transform duration-300 hover:scale-105" 
              />
            ) : (
              <div className="h-96 sm:h-[500px] flex items-center justify-center text-gray-400 bg-gray-50 dark:bg-gray-700">
                <div className="text-center">
                  <svg className="w-16 h-16 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  <p>No Image Available</p>
                </div>
              </div>
            )}
          </div>

          {/* Thumbnail Images */}
          {images.length > 1 && (
            <div className="flex space-x-2 overflow-x-auto pb-2">
              {images.map((img: string, index: number) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={`flex-shrink-0 w-20 h-20 rounded-lg border-2 overflow-hidden transition-all ${
                    selectedImage === index 
                      ? 'border-red-500 ring-2 ring-red-200' 
                      : 'border-gray-200 dark:border-gray-700 hover:border-gray-300'
                  }`}
                >
                  <img src={img} alt={`${selectedProduct.name} ${index + 1}`} className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Product Details */}
        <div className="space-y-6">
          {/* Title & Rating */}
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-2">
              {selectedProduct.title || selectedProduct.name}
            </h1>
            
            {/* Rating */}
            <div className="flex items-center space-x-2 mb-4">
              <div className="flex items-center">
                {[1, 2, 3, 4, 5].map((star) => (
                  <FiStar 
                    key={star} 
                    className={`w-4 h-4 ${star <= 4 ? 'text-yellow-400 fill-current' : 'text-gray-300'}`} 
                  />
                ))}
              </div>
              <span className="text-sm text-gray-600 dark:text-gray-400">(4.0) • 128 reviews</span>
            </div>
          </div>

          {/* Price */}
          <div className="space-y-2">
            <div className="flex items-center space-x-3">
              {selectedProduct.price != null && (
                <span className="text-3xl font-bold text-red-600">₹{selectedProduct.price}</span>
              )}
              {originalPrice && originalPrice > selectedProduct.price && (
                <span className="text-lg text-gray-500 line-through">₹{originalPrice}</span>
              )}
              {discount > 0 && (
                <span className="bg-red-100 text-red-800 text-sm font-medium px-2.5 py-0.5 rounded-full">
                  {discount}% OFF
                </span>
              )}
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-400">Inclusive of all taxes</p>
          </div>

          {/* Description */}
          {selectedProduct.description && (
            <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4">
              <h3 className="font-semibold mb-2">Description</h3>
              <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed">
                {selectedProduct.description}
              </p>
            </div>
          )}

          {/* Quantity Selector */}
          <div className="space-y-3">
            <h3 className="font-semibold">Quantity</h3>
            <div className="flex items-center space-x-3">
              <button
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="w-10 h-10 rounded-full border border-gray-300 dark:border-gray-600 flex items-center justify-center hover:bg-gray-50 dark:hover:bg-gray-700"
              >
                -
              </button>
              <span className="w-12 text-center font-medium">{quantity}</span>
              <button
                onClick={() => setQuantity(quantity + 1)}
                className="w-10 h-10 rounded-full border border-gray-300 dark:border-gray-600 flex items-center justify-center hover:bg-gray-50 dark:hover:bg-gray-700"
              >
                +
              </button>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="space-y-3">
            <div className="flex space-x-3">
              <button
                onClick={() => {
                  if (selectedProduct?.id != null) {
                    dispatch(addToCart({ productId: selectedProduct.id as number, quantity }))
                      .then(() => {
                        dispatch(fetchCart());
                        toast.success(`${quantity} item(s) added to cart`);
                      })
                      .catch(() => toast.error("Failed to add to cart"));
                  }
                }}
                className="flex-1 flex items-center justify-center space-x-2 bg-red-600 text-white py-3 px-6 rounded-lg font-medium hover:bg-red-700 transition-colors"
              >
                <FiShoppingCart className="w-5 h-5" />
                <span>Add to Cart</span>
              </button>
              
              <button
                onClick={() => setIsWishlisted(!isWishlisted)}
                className={`w-12 h-12 rounded-lg border-2 flex items-center justify-center transition-colors ${
                  isWishlisted 
                    ? 'border-red-500 bg-red-50 text-red-600' 
                    : 'border-gray-300 dark:border-gray-600 hover:border-red-500 hover:text-red-600'
                }`}
              >
                <FiHeart className={`w-5 h-5 ${isWishlisted ? 'fill-current' : ''}`} />
              </button>
            </div>
{/* gpttttttttttttttttttttttttttttttttttttttt */}
            <button
              onClick={() => {
                if (selectedProduct?.id != null) {
                  dispatch(addToCart({ productId: selectedProduct.id as number, quantity }))
                    .then(() => {
                      dispatch(fetchCart());
                      navigate('/user/checkout');
                    })
                    .catch(() => toast.error('Failed to proceed to checkout'));
                }
              }}
              className="w-full bg-gray-900 dark:bg-white text-white dark:text-gray-900 py-3 px-6 rounded-lg font-medium hover:bg-gray-800 dark:hover:bg-gray-100 transition-colors"
            >
              Buy Now
            </button>
          </div>

          {/* Features */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-6 border-t border-gray-200 dark:border-gray-700">
            <div className="flex items-center space-x-3 text-sm">
              <FiTruck className="w-5 h-5 text-green-600" />
              <div>
                <p className="font-medium">Free Delivery</p>
                <p className="text-gray-600 dark:text-gray-400">On orders above ₹500</p>
              </div>
            </div>
            <div className="flex items-center space-x-3 text-sm">
              <FiShield className="w-5 h-5 text-blue-600" />
              <div>
                <p className="font-medium">Secure Payment</p>
                <p className="text-gray-600 dark:text-gray-400">100% secure</p>
              </div>
            </div>
            <div className="flex items-center space-x-3 text-sm">
              <FiRotateCcw className="w-5 h-5 text-orange-600" />
              <div>
                <p className="font-medium">Easy Returns</p>
                <p className="text-gray-600 dark:text-gray-400">7 days return</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuickView;
