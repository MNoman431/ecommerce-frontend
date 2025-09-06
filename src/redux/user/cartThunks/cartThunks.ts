import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../admin/ApiInstance";

export const addToCart = createAsyncThunk(
  "cart/addToCart",
  async (
    payload: { productId: number | string; quantity: number },
  ) => {
    const res = await api.post("/cart/add", payload);
    return res.data;
  }
);

export const updateCartItem = createAsyncThunk(
  "cart/updateCartItem",
  async (
    payload: { productId: number | string; quantity: number },
  ) => {
    const res = await api.put("/cart/update", payload);
    return res.data;
  }
);

export const fetchCart = createAsyncThunk(
  "cart/fetchCart",
  async () => {
    const res = await api.get("/cart/");
    return res.data;
  }
);


