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


export const placeOrderWithShipping = createAsyncThunk(
  "orders/placeOrderWithShipping",
  async (shipping: { name: string; phone: string; address: string; city: string; postalCode: string }) => {
    const res = await api.post("/orders/", { shipping });
    return res.data; // { message, orderId }
  }
);

// Removed direct order thunk per request


