import React, { useState, useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { FiSearch, FiX } from "react-icons/fi";
import type { AppDispatch, RootState } from "../../redux/store";
import { fetchSearchResults } from "../../redux/user/searchThunks/SearchThunk";
import { clearSearch } from "../../redux/user/searchSlice/SearchSlice";

const SearchBar: React.FC = () => {
  const [query, setQuery] = useState("");
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const { results, loading } = useSelector((state: RootState) => state.search);

  // Debounced search
  const debouncedSearch = useCallback(
    debounce((searchQuery: string) => {
      if (searchQuery.trim().length > 2) {
        dispatch(fetchSearchResults(searchQuery));
      } else {
        dispatch(clearSearch());
      }
    }, 300),
    [dispatch]
  );

  useEffect(() => {
    debouncedSearch(query);
    return () => debouncedSearch.cancel?.();
  }, [query, debouncedSearch]);

  const handleSearchToggle = () => {
    setIsSearchOpen(!isSearchOpen);
    if (isSearchOpen) {
      setQuery("");
      dispatch(clearSearch());
    }
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      navigate(`/search?q=${encodeURIComponent(query)}`);
      setIsSearchOpen(false);
      setQuery("");
      dispatch(clearSearch());
    }
  };

  const handleResultClick = (productId?: string) => {
    if (!productId) return; // prevent NaN errors
    navigate(`/user/product/${productId}`);
    setIsSearchOpen(false);
    setQuery("");
    dispatch(clearSearch());
  };

  return (
    <div className="relative">
      <button
        onClick={handleSearchToggle}
        className="p-2 text-gray-600 hover:text-red-600 hover:bg-red-50 rounded-full transition-all duration-200"
        aria-label="Search"
      >
        <FiSearch className="w-5 h-5" />
      </button>

      {isSearchOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-50"
          onClick={() => setIsSearchOpen(false)}
        >
          <div
            className="absolute top-0 left-0 right-0 bg-white shadow-lg"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="max-w-7xl mx-auto px-4 py-4">
              <form onSubmit={handleSearchSubmit} className="relative">
                <div className="flex items-center">
                  <FiSearch className="absolute left-3 text-gray-400 w-5 h-5" />
                  <input
                    type="text"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Search for products..."
                    className="w-full pl-10 pr-12 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                    autoFocus
                  />
                  <button
                    type="button"
                    onClick={() => setIsSearchOpen(false)}
                    className="absolute right-3 text-gray-400 hover:text-gray-600"
                  >
                    <FiX className="w-5 h-5" />
                  </button>
                </div>
              </form>

              {query.trim().length > 2 && (
                <div className="absolute top-full left-0 right-0 bg-white border border-gray-200 rounded-b-lg shadow-lg mt-1 max-h-96 overflow-y-auto z-50">
                  {loading ? (
                    <div className="p-4 text-center text-gray-500">
                      <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-red-600 mx-auto"></div>
                      <p className="mt-2">Searching...</p>
                    </div>
                  ) : results.length > 0 ? (
                    <>
                      {results.map((product) => (
                        <div
                          key={product._id ?? `${product.name}-${Math.random()}`}
                          onClick={() => handleResultClick(product._id)}
                          className="p-4 border-b border-gray-100 hover:bg-gray-50 cursor-pointer transition-colors"
                        >
                          <div className="flex items-center space-x-4">
                            <img
                              src={product.images?.[0] || "/placeholder-product.jpg"}
                              alt={product.name}
                              className="w-12 h-12 object-cover rounded"
                            />
                            <div className="flex-1">
                              <h4 className="font-medium text-gray-900">{product.name}</h4>
                              <p className="text-red-600 font-semibold">${product.price}</p>
                            </div>
                          </div>
                        </div>
                      ))}

                      <div className="p-4 bg-gray-50">
                        <button
                          onClick={() => {
                            navigate(`/search?q=${encodeURIComponent(query)}`);
                            setIsSearchOpen(false);
                          }}
                          className="w-full text-center text-red-600 font-medium hover:text-red-700"
                        >
                          View all results for "{query}"
                        </button>
                      </div>
                    </>
                  ) : (
                    <div className="p-6 text-center text-gray-700">
                      <p className="text-lg font-semibold">No matching products found</p>
                      <p className="mt-2 text-sm text-gray-500">
                        We couldn’t find any products matching "<span className="italic text-red-600">{query}</span>".
                        Try adjusting your search or check back later.
                      </p>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// Debounce utility
function debounce<T extends (...args: any[]) => any>(func: T, wait: number): T & { cancel?: () => void } {
  let timeout: NodeJS.Timeout;
  const debounced = ((...args: Parameters<T>) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  }) as T & { cancel?: () => void };
  debounced.cancel = () => clearTimeout(timeout);
  return debounced;
}

export default SearchBar;
