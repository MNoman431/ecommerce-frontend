
// src/redux/store.ts
import { configureStore } from "@reduxjs/toolkit";
import productReducer from "./admin/productSlices/productSlice";

const store = configureStore({
  reducer: {
    products: productReducer, // ✅ reducer key updated to "products"
  },
});

// ✅ TypeScript types
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
