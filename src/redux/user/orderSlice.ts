import { createSlice } from "@reduxjs/toolkit";
import { fetchOrders, placeOrder } from "./orderThunks";

interface OrdersState {
  orders: any[];
  loading: boolean;
  error: string | null;
}

const initialState: OrdersState = {
  orders: [],
  loading: false,
  error: null,
};

const orderSlice = createSlice({
  name: "orders",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchOrders.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchOrders.fulfilled, (state, action) => {
        state.loading = false;
        state.orders = action.payload?.orders ?? action.payload ?? [];
      })
      .addCase(fetchOrders.rejected, (state, action) => {
        state.loading = false;
        state.error = (action.error.message as string) || "Failed to load orders";
      })
      .addCase(placeOrder.fulfilled, (state) => {
        // We can refetch orders after placing
      });
  },
});

export default orderSlice.reducer;


