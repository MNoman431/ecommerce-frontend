import React, { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { FiHeart, FiEye, FiShoppingCart, FiStar } from "react-icons/fi";
import { toast } from "react-hot-toast";
import type { AppDispatch, RootState } from "../../redux/store";
import { fetchProducts } from "../../redux/admin/productThunks/productThunk";
import { addToCart, fetchCart } from "../../redux/user/cartThunks/cartThunks";

type Product = {
  id?: string | number;
  name?: string;
  title?: string;
  price?: number | string;
  imageUrl?: string;
  image?: string;
  coverImage?: string;
  [key: string]: unknown;
};

const AllTopCovers: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const { products = [], loading, error } = useSelector(
    (state: RootState) => state.products || { products: [], loading: false, error: null }
  );

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  // Pagination: 3 rows per page responsive to columns
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(12);

  // compute items per page based on viewport to keep exactly 3 rows
  useEffect(() => {
    const compute = () => {
      const width = window.innerWidth;
      // Tailwind breakpoints: sm=640, lg=1024
      if (width >= 1024) return 12; // 4 cols * 3 rows
      if (width >= 640) return 9;   // 3 cols * 3 rows
      return 6;                     // 2 cols * 3 rows
    };

    const apply = () => {
      const per = compute();
      setItemsPerPage((prev) => (prev !== per ? per : prev));
    };

    apply();
    const onResize = () => {
      apply();
    };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  const totalItems = Array.isArray(products) ? products.length : 0;
  const totalPages = Math.max(1, Math.ceil(totalItems / itemsPerPage));
  const pageSafe = Math.min(Math.max(currentPage, 1), totalPages);

  const paginatedProducts = useMemo(() => {
    const start = (pageSafe - 1) * itemsPerPage;
    const end = start + itemsPerPage;
    return (products || []).slice(start, end);
  }, [products, pageSafe, itemsPerPage]);

  // keep page within bounds when itemsPerPage or products change
  useEffect(() => {
    const newTotalPages = Math.max(1, Math.ceil(totalItems / itemsPerPage));
    if (currentPage > newTotalPages) {
      setCurrentPage(newTotalPages);
    }
  }, [itemsPerPage, totalItems]);

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-6 py-12">
        <p className="text-center text-lg font-medium text-gray-600">Loading products...</p>
      </div>
    );
  }

  if (error) {
  return (
      <div className="max-w-7xl mx-auto px-6 py-12">
        <p className="text-center text-red-600">{String(error)}</p>
    </div>
    );
  }

  const getImage = (p: Product) => (p.imageUrl as string) || (p.image as string) || (p.coverImage as string) || "";
  const getTitle = (p: Product) => (p.title as string) || (p.name as string) || "Untitled";
  const getPrice = (p: Product) => (p.price != null ? Number(p.price) : NaN);

  const getOldPrice = (p: Product) => {
    const price = getPrice(p);
    if (Number.isNaN(price)) return NaN;
    return Math.round(price * 1.2); // show 20% higher as comparable old price
  };

  const getDiscountPercent = (p: Product) => {
    const price = getPrice(p);
    const oldPrice = getOldPrice(p);
    if (Number.isNaN(price) || Number.isNaN(oldPrice) || oldPrice <= price) return 0;
    return Math.round(((oldPrice - price) / oldPrice) * 100);
  };

  return (
    <div id="top-covers" className="max-w-7xl mx-auto px-6 py-10 text-gray-900 dark:text-gray-100">
      <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-gray-100 mb-6">All Top Covers</h1>

      {products.length === 0 ? (
        <p className="text-gray-600">No products found.</p>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
          {paginatedProducts.map((product: Product) => (
            <div
              key={String(product.id ?? Math.random())}
              className="group bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-2xl shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 overflow-hidden ring-1 ring-transparent hover:ring-red-50/50"
            >
              <div className="relative aspect-[4/5] bg-gray-50 dark:bg-gray-700 overflow-hidden">
                {/* Discount Badge */}
                {getDiscountPercent(product) > 0 && (
                  <span className="absolute left-3 top-3 z-10 bg-red-600 text-white text-xs font-bold px-2 py-1 rounded-full shadow">
                    -{getDiscountPercent(product)}%
                  </span>
                )}

                {/* Action Buttons */}
                <div className="absolute right-3 top-3 z-10 flex flex-col gap-2 opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
                  <button className="p-2 rounded-full bg-white/90 hover:bg-white text-gray-700 hover:text-red-600 shadow-md">
                    <FiHeart className="w-4 h-4" />
                  </button>
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      if (product.id != null) {
                        dispatch(addToCart({ productId: product.id as number, quantity: 1 }))
                          .then(() => {
                            dispatch(fetchCart());
                            toast.success("Added to cart");
                          })
                          .catch(() => {
                            toast.error("Failed to add to cart");
                          });
                      }
                    }}
                    className="p-2 rounded-full bg-white/90 hover:bg-white text-gray-700 hover:text-red-600 shadow-md"
                  >
                    <FiShoppingCart className="w-4 h-4" />
                  </button>
                </div>

                {/* Image */}
                {getImage(product) ? (
                  <img
                    src={getImage(product)}
                    alt={getTitle(product)}
                    className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                ) : (
                  <div className="h-full w-full flex items-center justify-center text-gray-400">No Image</div>
                )}

                {/* Quick View */}
                {/* <button
                  onClick={(e) => {
                    e.preventDefault();
                    const pid = product.id != null ? String(product.id) : "";
                    if (pid) navigate(`/user/product/${pid}`);
                  }}
                  className="absolute inset-x-3 bottom-3 z-10 hidden sm:flex items-center justify-center gap-2 bg-white/95 text-gray-800 border border-gray-200 rounded-full py-2 text-xs font-medium shadow-md opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300"
                >
                  <FiEye className="w-4 h-4" />
                  Quick View
                </button> */}
                <button
  onClick={(e) => {
    e.preventDefault();
    const pid = product.id != null ? String(product.id) : "";
    if (pid) navigate(`/user/product/${pid}`);
  }}
  className="absolute inset-x-3 bottom-3 z-10 flex items-center justify-center gap-2 
             bg-white/95 text-gray-800 border border-gray-200 rounded-full py-2 text-xs font-medium shadow-md
             opacity-100 sm:opacity-0 sm:translate-y-2 sm:group-hover:opacity-100 sm:group-hover:translate-y-0 
             transition-all duration-300"
>
  <FiEye className="w-4 h-4" />
  Quick View
</button>

              </div>

              <div className="p-4">
                <h3 className="text-sm font-semibold text-gray-900 dark:text-gray-100 line-clamp-2 min-h-[2.5rem]">{getTitle(product)}</h3>

                {/* Rating */}
                <div className="mt-2 flex items-center gap-1 text-amber-400">
                  {Array.from({ length: 5 }).map((_, idx) => (
                    <FiStar key={idx} className={`w-4 h-4 ${idx < 4 ? "fill-amber-400" : ""}`} />
                  ))}
                  <span className="ml-2 text-xs text-gray-500 dark:text-gray-400">(123)</span>
                </div>

                {/* Price */}
               {/* Price */}
{!Number.isNaN(getPrice(product)) && (
  <div className="mt-2 flex items-center gap-2">
    <p className="text-red-600 font-bold">
      Rs {getPrice(product).toLocaleString("en-IN")}
    </p>
    {!Number.isNaN(getOldPrice(product)) && (
      <>
        <span className="text-gray-400 dark:text-gray-500 line-through text-sm">
          Rs {getOldPrice(product).toLocaleString("en-IN")}
        </span>
        {getDiscountPercent(product) > 0 && (
          <span className="text-green-600 text-xs font-semibold">
            Save {getDiscountPercent(product)}%
          </span>
        )}
      </>
    )}
  </div>
)}

              </div>
            </div>
          ))}
        </div>
      )}

      {/* Pagination Controls */}
      {totalPages > 1 && (
        <div className="mt-8 flex items-center justify-center gap-2">
          <button
            onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
            disabled={pageSafe === 1}
            className={`px-3 py-2 rounded-md border text-sm font-medium ${
              pageSafe === 1
                ? "text-gray-300 border-gray-200 dark:border-gray-700 cursor-not-allowed"
                : "text-gray-700 dark:text-gray-200 border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800"
            }`}
          >
            Prev
          </button>

          {Array.from({ length: totalPages }).map((_, i) => {
            const pageNum = i + 1;
            const isActive = pageSafe === pageNum;
            return (
              <button
                key={pageNum}
                onClick={() => setCurrentPage(pageNum)}
                className={`min-w-[2.25rem] px-3 py-2 rounded-md border text-sm font-medium ${
                  isActive
                    ? "bg-red-600 border-red-600 text-white"
                    : "text-gray-700 dark:text-gray-200 border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800"
                }`}
              >
                {pageNum}
              </button>
            );
          })}

          <button
            onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
            disabled={pageSafe === totalPages}
            className={`px-3 py-2 rounded-md border text-sm font-medium ${
              pageSafe === totalPages
                ? "text-gray-300 border-gray-200 dark:border-gray-700 cursor-not-allowed"
                : "text-gray-700 dark:text-gray-200 border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800"
            }`}
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
};

export default AllTopCovers;
