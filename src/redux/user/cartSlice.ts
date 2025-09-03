import { createSlice } from "@reduxjs/toolkit";
import { addToCart, updateCartItem, fetchCart } from "./cartThunks";

interface CartState {
  items: any[];
  cartId: number | null;
  loading: boolean;
  error: string | null;
}

const initialState: CartState = {
  items: [],
  cartId: null,
  loading: false,
  error: null,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCart.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCart.fulfilled, (state, action) => {
        state.loading = false;
        state.cartId = action.payload.cartId ?? null;
        state.items = action.payload.items ?? [];
      })
      .addCase(fetchCart.rejected, (state, action) => {
        state.loading = false;
        state.error = (action.error.message as string) || "Failed to load cart";
      })
      .addCase(addToCart.fulfilled, (state) => {
        // after add we can refetch, or just mark success
      })
      .addCase(updateCartItem.fulfilled, (state) => {
        // after update we can refetch for simplicity
      });
  },
});

export default cartSlice.reducer;


