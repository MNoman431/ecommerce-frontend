import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../ApiInstance";


// ✅ Get all messages (for admin)
export const fetchContacts = createAsyncThunk(
  "adminContacts/fetchAll",
  async (_, { rejectWithValue }) => {
    try {
      const res = await axiosInstance.get("/contacts");
      return res.data.data; // backend se data array aata hai
    } catch (error: any) {
      return rejectWithValue(error.response?.data || { error: "Failed to fetch contacts" });
    }
  }
);

// ✅ Reply to a contact
export const replyToContact = createAsyncThunk(
  "adminContacts/reply",
  async ({ id, reply }: { id: number; reply: string }, { rejectWithValue }) => {
    try {
      const res = await axiosInstance.post(`/contacts/reply/${id}`, { reply });
      return res.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data || { error: "Failed to send reply" });
    }
  }
);
