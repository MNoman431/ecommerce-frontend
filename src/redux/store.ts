
// src/redux/store.ts
import { configureStore } from '@reduxjs/toolkit'
import authReducer from './user/authSlice/AuthSlice'
import cartReducer from './user/cartSlice/cartSlice'
import ordersReducer from './user/orderSlice/orderSlice'
import adminOrdersReducer from './admin/orderSlice/OrderSlice'
import productsReducer from './admin/productSlices/productSlice'

export const store = configureStore({
  reducer: {
    auth: authReducer,
    cart: cartReducer,
    orders: ordersReducer,
    adminOrders: adminOrdersReducer,
    products: productsReducer,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
