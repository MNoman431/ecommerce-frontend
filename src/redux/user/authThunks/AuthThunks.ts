
import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../admin/ApiInstance";

// ✅ Register User
export const registerUser = createAsyncThunk(
  "auth/registerUser",
  async (
    userData: { name: string; email: string; password: string; role: string },
    { rejectWithValue }
  ) => {
    try {
      const response = await axiosInstance.post("/user/register", userData);
      const user = response.data.data; // returns user data with role
      
      // Don't store user data - let them login separately
      return user;
    } catch (err: any) {
      return rejectWithValue(err.response?.data?.message || "Registration failed");
    }
  }
);

// ✅ Login User
export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async (
    userData: { email: string; password: string },
    { rejectWithValue }
  ) => {
    try {
      const response = await axiosInstance.post("/user/login", userData);
      const data = response.data.data; // expected: { user: {...}, token: "..." } OR flat

      // Normalize shape: if backend returns flat object with token, use as-is
      const token: string | undefined = data?.token ?? response.data?.token;
      const user = data?.user ?? data;

      if (token) {
        localStorage.setItem("token", token);
      }
      if (user) {
        localStorage.setItem("user", JSON.stringify(user));
        if (user.role) {
          localStorage.setItem("role", user.role);
        }
      }

      return data; // returns user data + token
    } catch (err: any) {
      return rejectWithValue(err.response?.data?.message || "Login failed");
    }
  }
);

// ✅ Logout User
export const logoutUser = createAsyncThunk(
  "auth/logoutUser",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post("/user/logout");

      // Clear local storage
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      localStorage.removeItem("role");

      return response.data.message;
    } catch (err: any) {
      return rejectWithValue(err.response?.data?.message || "Logout failed");
    }
  }
);






// ✅ Step 1: Forget Password
export const forgetPassword = createAsyncThunk(
  "auth/forgetPassword",
  async (email: string, { rejectWithValue }) => {
    try {
      const res = await axiosInstance.post("/user/forget-password", { email });
      return res.data.message; // "OTP sent to email"
    } catch (err: any) {
      return rejectWithValue(err.response?.data?.message || "Failed to send OTP");
    }
  }
);

// ✅ Step 2: Verify OTP
export const verifyOtp = createAsyncThunk(
  "auth/verifyOtp",
  async (payload: { email: string; otp: string }, { rejectWithValue }) => {
    try {
      const res = await axiosInstance.post("/user/verify-otp", payload);
      return res.data.message; // "OTP verified successfully"
    } catch (err: any) {
      return rejectWithValue(err.response?.data?.message || "Invalid OTP");
    }
  }
);

// ✅ Step 3: Reset Password
export const resetPassword = createAsyncThunk(
  "auth/resetPassword",
  async (payload: { email: string; newPassword: string }, { rejectWithValue }) => {
    try {
      const res = await axiosInstance.post("/user/reset-password", payload);
      return res.data.message; // "Password reset successful"
    } catch (err: any) {
      return rejectWithValue(err.response?.data?.message || "Reset failed");
    }
  }
);
