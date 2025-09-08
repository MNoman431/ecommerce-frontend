// redux/user/paymentThunk/PaymentThunk.ts
import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../admin/ApiInstance";

interface PaymentPayload {
  amount: number;      // in smallest currency unit (paise)
  currency?: string;   // default: "pkr"
  productName?: string;
}

export const createPaymentIntent = createAsyncThunk(
  "payment/createPaymentIntent",
  async (data: PaymentPayload, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post("/payment/create-checkout-session", data);
      return response.data; // { url: string }
    } catch (err: any) {
      return rejectWithValue(err.response?.data?.error || err.message);
    }
  }
);
