import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../admin/ApiInstance";

interface PaymentIntentPayload {
  amount: number;      // in smallest currency unit (paise)
  currency?: string;   // default: "pkr"
  productName?: string;
  userId?: string | number;
  shippingInfo?: any;
  cartItems?: any[];
}

export const createPaymentIntent = createAsyncThunk(
  "payment/createPaymentIntent",
  async (data: PaymentIntentPayload, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post("/payment/create-checkout-session", data);
      return response.data; // { url }
    } catch (err: any) {
      return rejectWithValue(err.response?.data?.error || err.message);
    }
  }
);
