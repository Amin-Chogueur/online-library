import { createSlice } from "@reduxjs/toolkit";
import type { ProductType } from "../../../type/product";
import {
  fetchStationeryItem,
  fetchStationeryProducts,
} from "./stationeryThunk";

// Define a type for the slice state
type InitialStateType = {
  stationeryProducts: ProductType[];
  stationeryItem: ProductType | null;
  totalstationeryProducts: number;
  totalPages: number;
  stationeryLoading: "idle" | "pending" | "succeeded" | "failed";
  error: null | string;
};

// Define the initial state using that type
const initialState: InitialStateType = {
  stationeryProducts: [],
  stationeryItem: null,
  totalPages: 1,
  totalstationeryProducts: 0,
  stationeryLoading: "idle",
  error: "",
};

export const stationerySlice = createSlice({
  name: "Stationery",

  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      //fetch books
      .addCase(fetchStationeryProducts.pending, (state) => {
        state.stationeryLoading = "pending";
      })
      .addCase(fetchStationeryProducts.fulfilled, (state, action) => {
        state.stationeryLoading = "succeeded";
        state.stationeryProducts = action.payload.products;
        state.totalPages = action.payload.totalPages;
        state.totalstationeryProducts = action.payload.totalProducts;
      })
      .addCase(fetchStationeryProducts.rejected, (state, action) => {
        state.stationeryLoading = "failed";
        state.error = action.payload as string;
      })
      //fetch book
      .addCase(fetchStationeryItem.pending, (state) => {
        state.stationeryLoading = "pending";
      })
      .addCase(fetchStationeryItem.fulfilled, (state, action) => {
        state.stationeryLoading = "succeeded";
        state.stationeryItem = action.payload.product;
      })
      .addCase(fetchStationeryItem.rejected, (state, action) => {
        state.stationeryLoading = "failed";
        state.error = action.payload as string;
      });
  },
});

export default stationerySlice.reducer;
