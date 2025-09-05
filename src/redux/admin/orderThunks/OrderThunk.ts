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

export const updateOrderStatusThunk = createAsyncThunk(
  "adminOrders/updateStatus",
  async ({ id, status }: { id: number | string; status: string }) => {
    const res = await api.patch(`/orders/${id}/status`, { status });
    return res.data;
  }
);
