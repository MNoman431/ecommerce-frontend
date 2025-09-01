
import { createSlice } from "@reduxjs/toolkit";
import {
  addProduct,
  deleteProduct,
  fetchProductById,
  fetchProducts,
  updateProduct,
  fetchTotalProducts,   // ✅ import added
} from "../productThunks/productThunk";

interface ProductState {
  products: any[];
  selectedProduct: any | null;
  totalProducts: number;        // ✅ new field for total products
  loading: boolean;
  error: string | null;
}

const initialState: ProductState = {
  products: [],
  selectedProduct: null,
  totalProducts: 0,             // ✅ initialize
  loading: false,
  error: null,
};

const productSlice = createSlice({
  name: "products",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Fetch all products
      .addCase(fetchProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.products = action.payload;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to fetch products";
      })

      // Add product
      .addCase(addProduct.fulfilled, (state, action) => {
        state.products.push(action.payload);
        state.totalProducts += 1; // ✅ total count bhi update karo
      })

      // Update product
      .addCase(updateProduct.fulfilled, (state, action) => {
        const index = state.products.findIndex(p => p.id === action.payload.id);
        if (index !== -1) state.products[index] = action.payload;

        if (state.selectedProduct?.id === action.payload.id) {
          state.selectedProduct = action.payload;
        }
      })

      // Delete product
      .addCase(deleteProduct.fulfilled, (state, action) => {
        state.products = state.products.filter(p => p.id !== action.payload);
        if (state.selectedProduct?.id === action.payload) state.selectedProduct = null;
        state.totalProducts -= 1; // ✅ delete hone pr total kam karo
      })

      // Fetch single product by ID
      .addCase(fetchProductById.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.selectedProduct = null;
      })
      .addCase(fetchProductById.fulfilled, (state, action) => {
        state.loading = false;
        state.selectedProduct = action.payload;
      })
      .addCase(fetchProductById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to fetch product";
      })

      // ✅ Fetch total products
      .addCase(fetchTotalProducts.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchTotalProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.totalProducts = action.payload;
      })
      .addCase(fetchTotalProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to fetch total products";
      });
  },
});

export default productSlice.reducer;
