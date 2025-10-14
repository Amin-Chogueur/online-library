import { createSlice } from "@reduxjs/toolkit";
import type { ProductType } from "../../../type/product";

type InitialStateType = {
  favorites: ProductType[];
  product: ProductType | null;
  productLoading: "idle" | "pending" | "succeeded" | "failed";
  error: null | string;
};

const initialState: InitialStateType = {
  favorites: [],
  productLoading: "idle",
  product: null,
  error: null,
};

const favoriteSlice = createSlice({
  name: "Favorites",
  initialState,
  reducers: {
    addTofavoritePage: (state, action) => {
      state.favorites.push(action.payload);
    },
    removeFromfavoritePage: (state, action) => {
      state.favorites = state.favorites.filter(
        (product) => product._id !== action.payload
      );
    },
  },
});

export const { addTofavoritePage, removeFromfavoritePage } =
  favoriteSlice.actions;
export default favoriteSlice.reducer;
