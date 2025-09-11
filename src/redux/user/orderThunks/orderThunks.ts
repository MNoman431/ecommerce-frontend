// import { createAsyncThunk } from "@reduxjs/toolkit";
// import api from "../../admin/ApiInstance";

// export const placeOrder = createAsyncThunk(
//   "orders/placeOrder",
//   async () => {
//     const res = await api.post("/orders/");
//     return res.data;
//   }
// );

// export const fetchOrders = createAsyncThunk(
//   "orders/fetchOrders",
//   async () => {
//     const res = await api.get("/orders/");
//     return res.data;
//   }
// );


// export const placeOrderWithShipping = createAsyncThunk(
//   "orders/placeOrderWithShipping",
//   async (shipping: { name: string; phone: string; address: string; city: string; postalCode: string }) => {
//     const res = await api.post("/orders/", { shipping });
//     return res.data; // { message, orderId }
//   }
// );

// // Removed direct order thunk per request





import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../admin/ApiInstance";

export const placeOrder = createAsyncThunk(
  "orders/placeOrder",
  async () => {
    const res = await api.post("/orders/");
    return res.data;
  }
);

export const fetchOrders = createAsyncThunk(
  "orders/fetchOrders",
  async () => {
    const res = await api.get("/orders/");
    return res.data;
  }
);

// ✅ Send fields directly to backend
// export const placeOrderWithShipping = createAsyncThunk(
//   "orders/placeOrderWithShipping",
//   async (shipping: { 
//     fullName: string; 
//     phone: string; 
//     deliveryAddress: string; 
//     city: string; 
//     postalCode: string; 
//     paymentMethod: string;
//   }) => {
//     const res = await api.post("/orders/", shipping); // 👈 changed
//     return res.data; // { message, orderId }
//   }
// );

export const placeOrderWithShipping = createAsyncThunk(
  "orders/placeOrderWithShipping",
  async (shipping: { 
    fullName: string; 
    phoneNumber: string;   // 👈 match backend
    email: string;         // 👈 required
    address: string;       // 👈 match backend
    city: string; 
    postalCode: string; 
    country: string;       // 👈 required
    paymentMethod: string; // 👈 COD | Bank Transfer | Card
  }) => {
    const res = await api.post("/orders/", shipping);
    return res.data;
  }
);
