// import { createSlice } from "@reduxjs/toolkit";
// import { fetchOrders, placeOrder } from "../orderThunks/orderThunks";

// interface OrdersState {
//   orders: any[];
//   loading: boolean;
//   error: string | null;
// }

// const initialState: OrdersState = {
//   orders: [],
//   loading: false,
//   error: null,
// };

// const orderSlice = createSlice({
//   name: "orders",
//   initialState,
//   reducers: {
//     resetOrders: (state) => {
//       state.orders = [];
//       state.loading = false;
//       state.error = null;
//     },
//   },
//   extraReducers: (builder) => {
//     builder
//       .addCase(fetchOrders.pending, (state) => {
//         state.loading = true;
//         state.error = null;
//       })
//       .addCase(fetchOrders.fulfilled, (state, action) => {
//         state.loading = false;
//         state.orders = action.payload?.orders ?? action.payload ?? [];
//       })
//       .addCase(fetchOrders.rejected, (state, action) => {
//         state.loading = false;
//         state.error = (action.error.message as string) || "Failed to load orders";
//       })
//       .addCase(placeOrder.fulfilled, (state) => {
//         // We can refetch orders after placing
//       });
//   },
// });

// export const { resetOrders } = orderSlice.actions;
// export default orderSlice.reducer;



// src/redux/slices/orderSlice.ts
import { createSlice } from "@reduxjs/toolkit";
import { fetchOrders, placeOrder, placeOrderWithShipping } from "../orderThunks/orderThunks";

interface OrdersState {
  orders: any[];
  loading: boolean;
  error: string | null;
  success: boolean; // ✅ to track order placement
}

const initialState: OrdersState = {
  orders: [],
  loading: false,
  error: null,
  success: false,
};

const orderSlice = createSlice({
  name: "orders",
  initialState,
  reducers: {
    resetOrders: (state) => {
      state.orders = [];
      state.loading = false;
      state.error = null;
      state.success = false;
    },
  },
  extraReducers: (builder) => {
    builder
      // ✅ Fetch Orders
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
        state.error = (action.payload as string) || "Failed to load orders";
      })

      // ✅ Place Order (simple)
      .addCase(placeOrder.pending, (state) => {
        state.loading = true;
        state.success = false;
      })
      .addCase(placeOrder.fulfilled, (state) => {
        state.loading = false;
        state.success = true;
      })
      .addCase(placeOrder.rejected, (state, action) => {
        state.loading = false;
        state.error = (action.payload as string) || "Failed to place order";
      })

      // ✅ Place Order with Shipping
      .addCase(placeOrderWithShipping.pending, (state) => {
        state.loading = true;
        state.success = false;
      })
      .addCase(placeOrderWithShipping.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        // Optionally push new order
        if (action.payload?.order) {
          state.orders.push(action.payload.order);
        }
      })
      .addCase(placeOrderWithShipping.rejected, (state, action) => {
        state.loading = false;
        state.error = (action.payload as string) || "Failed to place order with shipping";
      });
  },
});

export const { resetOrders } = orderSlice.actions;
export default orderSlice.reducer;
