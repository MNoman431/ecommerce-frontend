import { createSlice } from "@reduxjs/toolkit";
import { fetchAllOrders, fetchOrdersCount, updateOrderStatusThunk } from "../orderThunks/OrderThunk";

interface AdminOrdersState {
  orders: any[];
  loading: boolean;
  error: string | null;
  totalCount: number;
}

const initialState: AdminOrdersState = {
  orders: [],
  loading: false,
  error: null,
  totalCount: 0,
};

const adminOrderSlice = createSlice({
  name: "adminOrders",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchAllOrders.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(fetchAllOrders.fulfilled, (state, action) => {
      state.loading = false;
      state.orders = action.payload?.orders ?? [];
    });
    builder.addCase(fetchAllOrders.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message || "Failed to fetch orders";
    });

    builder.addCase(fetchOrdersCount.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchOrdersCount.fulfilled, (state, action) => {
      state.loading = false;
      state.totalCount = Number(action.payload?.count ?? 0);
    });
    builder.addCase(fetchOrdersCount.rejected, (state) => {
      state.loading = false;
    });

    builder.addCase(updateOrderStatusThunk.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(updateOrderStatusThunk.fulfilled, (state, action) => {
      state.loading = false;
      const updated = action.payload?.order;
      if (!updated) return;
      const idx = state.orders.findIndex((o: any) => o.id === updated.id);
      if (idx >= 0) state.orders[idx] = { ...state.orders[idx], ...updated };
    });
    builder.addCase(updateOrderStatusThunk.rejected, (state) => {
      state.loading = false;
    });
  },
});

export default adminOrderSlice.reducer;
