// // redux/user/paymentSlice/PaymentSlice.ts
// import { createSlice } from "@reduxjs/toolkit";
// import { createPaymentIntent } from "../paymentThunk/PaymentThunk";

// interface PaymentState {
//   checkoutUrl: string | null;
//   loading: boolean;
//   error: string | null;
// }

// const initialState: PaymentState = {
//   checkoutUrl: null,
//   loading: false,
//   error: null,
// };

// const paymentSlice = createSlice({
//   name: "payment",
//   initialState,
//   reducers: {
//     resetPayment: (state) => {
//       state.checkoutUrl = null;
//       state.loading = false;
//       state.error = null;
//     },
//   },
//   extraReducers: (builder) => {
//     builder
//       .addCase(createPaymentIntent.pending, (state) => {
//         state.loading = true;
//         state.error = null;
//       })
//       .addCase(createPaymentIntent.fulfilled, (state, action) => {
//         state.loading = false;
//         state.checkoutUrl = action.payload.url; // updated
//       })
//       .addCase(createPaymentIntent.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.payload as string;
//       });
//   },
// });

// export const { resetPayment } = paymentSlice.actions;
// export default paymentSlice.reducer;


import { createSlice } from "@reduxjs/toolkit";
import { createPaymentIntent } from "../paymentThunk/PaymentThunk";

interface PaymentState {
  clientSecret: string | null; // Stores Stripe Checkout URL
  loading: boolean;
  error: string | null;
}

const initialState: PaymentState = {
  clientSecret: null,
  loading: false,
  error: null,
};

const paymentSlice = createSlice({
  name: "payment",
  initialState,
  reducers: {
    resetPayment: (state) => {
      state.clientSecret = null;
      state.loading = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createPaymentIntent.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createPaymentIntent.fulfilled, (state, action) => {
        state.loading = false;
        state.clientSecret = action.payload.url; // store Stripe Checkout URL
      })
      .addCase(createPaymentIntent.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { resetPayment } = paymentSlice.actions;
export default paymentSlice.reducer;
