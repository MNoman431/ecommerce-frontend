import { createSlice } from "@reduxjs/toolkit";
import { sendContactMessage } from "../contactThunks/ContactThunk";
// import { sendContactMessage } from "./ContactThunk";

interface ContactState {
  loading: boolean;
  success: boolean;
  error: string | null;
}

const initialState: ContactState = {
  loading: false,
  success: false,
  error: null,
};

const contactSlice = createSlice({
  name: "contact",
  initialState,
  reducers: {
    resetContactState: (state) => {
      state.loading = false;
      state.success = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(sendContactMessage.pending, (state) => {
        state.loading = true;
        state.success = false;
        state.error = null;
      })
      .addCase(sendContactMessage.fulfilled, (state) => {
        state.loading = false;
        state.success = true;
        state.error = null;
      })
      .addCase(sendContactMessage.rejected, (state, action: any) => {
        state.loading = false;
        state.success = false;
        state.error = action.payload?.error || "Failed to send message";
      });
  },
});

export const { resetContactState } = contactSlice.actions;
export default contactSlice.reducer;
