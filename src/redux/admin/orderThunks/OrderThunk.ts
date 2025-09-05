import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../admin/ApiInstance";

export const fetchAllOrders = createAsyncThunk(
  "adminOrders/fetchAll",
  async () => {
    const res = await api.get("/orders/all");
    return res.data;
  }
);

export const fetchOrdersCount = createAsyncThunk(
  "adminOrders/fetchCount",
  async () => {
    const res = await api.get("/orders/count");
    return res.data;
  }
);
