import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../admin/ApiInstance";
// import axiosInstance from "../../axiosInstance"; // apna axios instance ka path

interface ContactPayload {
  name: string;
  email: string;
  subject?: string;
  message: string;
}

export const sendContactMessage = createAsyncThunk(
  "contact/sendMessage",
  async (contactData: ContactPayload, { rejectWithValue }) => {
    try {
      const res = await axiosInstance.post("/contacts", contactData);
      return res.data; // success response
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data || { error: "Something went wrong" }
      );
    }
  }
);
