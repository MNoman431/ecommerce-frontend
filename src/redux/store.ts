
// src/redux/store.ts
import { configureStore } from '@reduxjs/toolkit'
import authReducer from './user/authSlice/AuthSlice'
import cartReducer from './user/cartSlice/cartSlice'
import ordersReducer from './user/orderSlice/orderSlice'
import adminOrdersReducer from './admin/orderSlice/OrderSlice'
import productsReducer from './admin/productSlices/productSlice'
import paymentReducer from './user/paymentSlice/PaymentSlice'

export const store = configureStore({
  reducer: {
    auth: authReducer,
    cart: cartReducer,
    orders: ordersReducer,
    adminOrders: adminOrdersReducer,
    products: productsReducer,
     payment: paymentReducer,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
