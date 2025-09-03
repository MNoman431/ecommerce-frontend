

import { createSlice } from "@reduxjs/toolkit";
import { registerUser, loginUser, logoutUser } from "../authThunks/AuthThunks";

interface AuthState {
  user: { id: string; name: string; email: string; role: string; token?: string } | null;
  loading: boolean;
  error: string | null;
}

// LocalStorage se user load karo
const userFromStorage = typeof window !== "undefined"
  ? JSON.parse(localStorage.getItem("user") || "null")
  : null;

const initialState: AuthState = {
  user: userFromStorage,  // ✅ yahan change
  loading: false,
  error: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    resetAuthState: (state) => {
      state.user = null;
      state.loading = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    // Register
    builder.addCase(registerUser.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(registerUser.fulfilled, (state, action) => {
      state.loading = false;
      const payload: any = action.payload as any;
      state.user = payload?.user ?? payload;
    });
    builder.addCase(registerUser.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
    });

    // Login
    builder.addCase(loginUser.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(loginUser.fulfilled, (state, action) => {
      state.loading = false;
      const payload: any = action.payload as any;
      state.user = payload?.user ?? payload;
    });
    builder.addCase(loginUser.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
    });

    // Logout
    builder.addCase(logoutUser.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(logoutUser.fulfilled, (state) => {
      state.loading = false;
      state.user = null;
    });
    builder.addCase(logoutUser.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
    });
  },
});

export const { resetAuthState } = authSlice.actions;
export default authSlice.reducer;
