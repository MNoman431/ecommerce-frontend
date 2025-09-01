

import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../axiosInstance";

export const registerUser = createAsyncThunk(
  "auth/registerUser",
  async (userData, { rejectWithValue }) => {
    try {
      const res = await axiosInstance.post("/user/register", userData);
      return res.data.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || "Registration failed");
    }
  }
);

export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async (userData, { rejectWithValue }) => {
    try {
      const res = await axiosInstance.post("/user/login", userData);
      const user = res.data.data;
      localStorage.setItem("role", user.role);
      localStorage.setItem("user", JSON.stringify(user));
      return user;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || "Login failed");
    }
  }
);

export const logoutUser = createAsyncThunk(
  "auth/logoutUser",
  async (_, { rejectWithValue }) => {
    try {
      await axiosInstance.post("/user/logout", {});
      localStorage.removeItem("role");
      localStorage.removeItem("user");
      return null;
    } catch (err) {
      return rejectWithValue("Logout failed");
    }
  }
);
