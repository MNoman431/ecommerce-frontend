
// src/redux/store.ts
import { configureStore } from '@reduxjs/toolkit'
import authReducer from './user/authSlice/AuthSlice'
import cartReducer from './user/cartSlice/cartSlice'
import ordersReducer from './user/orderSlice/orderSlice'
import adminOrdersReducer from './admin/orderSlice/OrderSlice'
import productsReducer from './admin/productSlices/productSlice'
import paymentReducer from './user/paymentSlice/PaymentSlice'
import searchReducer from './user/searchSlice/SearchSlice'
import contactReducer from './user/contactSlice/ContactSlice'
import adminContactReducer from './admin/contactSlice/ContactSlice' // admin side

export const store = configureStore({
  reducer: {
    auth: authReducer,
    cart: cartReducer,
    orders: ordersReducer,
    adminOrders: adminOrdersReducer,
    products: productsReducer,
    payment: paymentReducer,
    search: searchReducer,
    contact: contactReducer,
    adminContacts: adminContactReducer // admin side
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
