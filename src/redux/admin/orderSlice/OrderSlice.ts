import { createSlice } from "@reduxjs/toolkit";
import { fetchAllOrders } from "../orderThunks/OrderThunk";

interface AdminOrdersState {
  orders: any[];
  loading: boolean;
  error: string | null;
}

const initialState: AdminOrdersState = {
  orders: [],
  loading: false,
  error: null,
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
  },
});

export default adminOrderSlice.reducer;
