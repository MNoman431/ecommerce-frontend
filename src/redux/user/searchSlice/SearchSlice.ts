// redux/user/searchSlice.ts
import { createSlice } from "@reduxjs/toolkit";
import { fetchSearchResults } from "../searchThunks/SearchThunk";
// import { fetchSearchResults } from "./searchThunk";

interface SearchState {
  results: any[];
  loading: boolean;
  error: string | null;
}

const initialState: SearchState = {
  results: [],
  loading: false,
  error: null,
};

const searchSlice = createSlice({
  name: "search",
  initialState,
  reducers: {
    clearSearch: (state) => {
      state.results = [];
      state.error = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchSearchResults.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchSearchResults.fulfilled, (state, action) => {
        state.loading = false;
        state.results = action.payload;
      })
      .addCase(fetchSearchResults.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  }
});

export const { clearSearch } = searchSlice.actions;
export default searchSlice.reducer;
