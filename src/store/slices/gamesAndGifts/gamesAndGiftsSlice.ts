import { createSlice } from "@reduxjs/toolkit";

import { fetchGameAndGift, fetchGamesAndGifts } from "./gamesAndGiftsThunk";
import type { ProductType } from "../../../type/product";

// Define a type for the slice state
type InitialStateType = {
  gamesAndGifts: ProductType[];
  gameAndGift: ProductType | null;
  totalgamesAndGifts: number;
  totalPages: number;
  gamesAndGiftsLoading: "idle" | "pending" | "succeeded" | "failed";
  error: null | string;
};

// Define the initial state using that type
const initialState: InitialStateType = {
  gamesAndGifts: [],
  gameAndGift: null,
  totalPages: 1,
  totalgamesAndGifts: 0,
  gamesAndGiftsLoading: "idle",
  error: "",
};

export const gamesAndGiftsSlice = createSlice({
  name: "GamesAndGifts",

  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      //fetch books
      .addCase(fetchGamesAndGifts.pending, (state) => {
        state.gamesAndGiftsLoading = "pending";
      })
      .addCase(fetchGamesAndGifts.fulfilled, (state, action) => {
        state.gamesAndGiftsLoading = "succeeded";
        state.totalgamesAndGifts = action.payload.totalProducts;
        state.totalPages = action.payload.totalPages;
        state.gamesAndGifts = action.payload.products;
      })
      .addCase(fetchGamesAndGifts.rejected, (state, action) => {
        state.gamesAndGiftsLoading = "failed";
        state.error = action.payload as string;
      })
      //fetch book
      .addCase(fetchGameAndGift.pending, (state) => {
        state.gamesAndGiftsLoading = "pending";
      })
      .addCase(fetchGameAndGift.fulfilled, (state, action) => {
        state.gamesAndGiftsLoading = "succeeded";
        state.gameAndGift = action.payload.product;
      })
      .addCase(fetchGameAndGift.rejected, (state, action) => {
        state.gamesAndGiftsLoading = "failed";
        state.error = action.payload as string;
      });
  },
});

export default gamesAndGiftsSlice.reducer;
