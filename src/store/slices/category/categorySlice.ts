import type { CategoryType } from "../../../type/category";
import { createSlice } from "@reduxjs/toolkit";
import { fetchCategories } from "./categoryThunk";

// Define a type for the slice state
type InitialStateType = {
  categories: CategoryType[];
  loading: "idle" | "pending" | "succeeded" | "failed";
  error: null | string;
};

// Define the initial state using that type
const initialState: InitialStateType = {
  categories: [],
  loading: "idle",
  error: "",
};

export const categorySlice = createSlice({
  name: "Categories",

  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      //fetch categories
      .addCase(fetchCategories.pending, (state) => {
        state.loading = "pending";
      })
      .addCase(fetchCategories.fulfilled, (state, action) => {
        state.loading = "succeeded";
        state.categories = action.payload;
      })
      .addCase(fetchCategories.rejected, (state, action) => {
        state.loading = "failed";
        state.error = action.payload as string;
      });
  },
});

export default categorySlice.reducer;
