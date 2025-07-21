import { createSlice } from "@reduxjs/toolkit";
import type { ProductType } from "../../../type/product";
import { fetchFavoriteProduct } from "./favoriteThunk";

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
  extraReducers: (builder) => {
    builder

      .addCase(fetchFavoriteProduct.pending, (state) => {
        state.productLoading = "pending";
      })
      .addCase(fetchFavoriteProduct.fulfilled, (state, action) => {
        state.productLoading = "succeeded";
        state.product = action.payload.product;
      })
      .addCase(fetchFavoriteProduct.rejected, (state, action) => {
        state.productLoading = "failed";
        state.error = action.payload as string;
      });
  },
});

export const { addTofavoritePage, removeFromfavoritePage } =
  favoriteSlice.actions;
export default favoriteSlice.reducer;
