// src/redux/admin/productThunks/productThunk.ts
import { createAsyncThunk } from "@reduxjs/toolkit";
import adminApi from "../ApiInstance"; // ✅ axios instance me withCredentials set hai

// ✅ Fetch all products
export const fetchProducts = createAsyncThunk(
  "admin/fetchProducts",
  async () => {
    const res = await adminApi.get("/products"); // cookie automatically bhejega
    return res.data.data;
  }
);

// ✅ Add product
export const addProduct = createAsyncThunk(
  "admin/addProduct",
  async (productData: FormData) => {
    const res = await adminApi.post("/products", productData, {
      headers: {
        "Content-Type": "multipart/form-data"
      },
      withCredentials: true // <-- YEH LINE ADD KAREN!
    });
    return res.data.data;
  }
);

// ✅ Update product
export const updateProduct = createAsyncThunk(
  "admin/updateProduct",
  async ({ id, productData }: { id: string; productData: FormData }) => {
    const res = await adminApi.patch(`/products/${id}`, productData, {
      headers: { "Content-Type": "multipart/form-data" },
      withCredentials: true,
    });
    return res.data.data;
  }
);

// ✅ Delete product
export const deleteProduct = createAsyncThunk(
  "admin/deleteProduct",
  async (id: number) => {
    await adminApi.delete(`/products/${id}`, { withCredentials: true });
    return id;
  }
);


// ✅ Fetch single product by ID
export const fetchProductById = createAsyncThunk(
  "admin/fetchProductById",
  async (id: number) => {
    const res = await adminApi.get(`/products/${id}`, { withCredentials: true });
    return res.data.data;
  }
);


// ✅ Fetch total products count
export const fetchTotalProducts = createAsyncThunk(
  "admin/fetchTotalProducts",
  async () => {
    const res = await adminApi.get("/products/count");
    return res.data.data; // <-- .data.data, not .data.total
  }
);




