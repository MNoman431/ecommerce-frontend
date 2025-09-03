

// import { createAsyncThunk } from "@reduxjs/toolkit";
// import axiosInstance from "../../axiosInstance";

// export const registerUser = createAsyncThunk(
//   "auth/registerUser",
//   async (userData, { rejectWithValue }) => {
//     try {
//       const res = await axiosInstance.post("/user/register", userData);
//       return res.data.data;
//     } catch (err) {
//       return rejectWithValue(err.response?.data?.message || "Registration failed");
//     }
//   }
// );

// export const loginUser = createAsyncThunk(
//   "auth/loginUser",
//   async (userData, { rejectWithValue }) => {
//     try {
//       const res = await axiosInstance.post("/user/login", userData);
//       const user = res.data.data;
//       localStorage.setItem("role", user.role);
//       localStorage.setItem("user", JSON.stringify(user));
//       return user;
//     } catch (err) {
//       return rejectWithValue(err.response?.data?.message || "Login failed");
//     }
//   }
// );

// export const logoutUser = createAsyncThunk(
//   "auth/logoutUser",
//   async (_, { rejectWithValue }) => {
//     try {
//       await axiosInstance.post("/user/logout", {});
//       localStorage.removeItem("role");
//       localStorage.removeItem("user");
//       return null;
//     } catch (err) {
//       return rejectWithValue("Logout failed");
//     }
//   }
// );







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
      return response.data.data; // returns user data
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
