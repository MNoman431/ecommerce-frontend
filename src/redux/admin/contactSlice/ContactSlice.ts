import { createSlice } from "@reduxjs/toolkit";
import { fetchContacts, replyToContact } from "../contactThunks/ContactThunks";
// import { fetchContacts, replyToContact } from "./AdminContactThunk";

interface ContactState {
  contacts: any[];
  loading: boolean;
  error: string | null;
  replyStatus: string | null;
}

const initialState: ContactState = {
  contacts: [],
  loading: false,
  error: null,
  replyStatus: null,
};

const adminContactSlice = createSlice({
  name: "adminContacts",
  initialState,
  reducers: {
    clearReplyStatus: (state) => {
      state.replyStatus = null;
    },
  },
  extraReducers: (builder) => {
    // Fetch contacts
    builder.addCase(fetchContacts.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchContacts.fulfilled, (state, action) => {
      state.loading = false;
      state.contacts = action.payload;
    });
    builder.addCase(fetchContacts.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
    });

    // Reply to contact
    builder.addCase(replyToContact.fulfilled, (state) => {
      state.replyStatus = "Reply sent successfully!";
    });
    builder.addCase(replyToContact.rejected, (state, action) => {
      state.replyStatus = "Failed to send reply";
      state.error = action.payload as string;
    });
  },
});

export const { clearReplyStatus } = adminContactSlice.actions;
export default adminContactSlice.reducer;
