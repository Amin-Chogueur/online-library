import { createSlice } from "@reduxjs/toolkit";
import { fetchCategories } from "./subCategoryThunk";
import type { SubCategoryType } from "../../../type/subCategory";

// Define a type for the slice state
type InitialStateType = {
  subCategories: SubCategoryType[];
  loading: "idle" | "pending" | "succeeded" | "failed";
  error: null | string;
};

// Define the initial state using that type
const initialState: InitialStateType = {
  subCategories: [],
  loading: "idle",
  error: "",
};

export const subCategorySlice = createSlice({
  name: "SubCategories",

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
        state.subCategories = action.payload.subCategories;
      })
      .addCase(fetchCategories.rejected, (state, action) => {
        state.loading = "failed";
        state.error = action.payload as string;
      });
  },
});

export default subCategorySlice.reducer;
