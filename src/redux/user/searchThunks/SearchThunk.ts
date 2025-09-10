// redux/user/searchThunk.ts
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "./../../admin/ApiInstance";

export const fetchSearchResults = createAsyncThunk(
  "search/fetchSearchResults",
  async (query: string, { rejectWithValue }) => {
    try {
      const response = await axios.get(`/search`, { params: { query } });
      // Map id -> _id so frontend always has _id
      const mapped = response.data.map((p: any) => ({
        ...p,
        _id: p._id || p.id,  // <- fix here
      }));
      return mapped;
    } catch (error: any) {
      return rejectWithValue(error.response?.data || "Something went wrong");
    }
  }
);
