import { createSlice } from "@reduxjs/toolkit";
import type { BookType } from "../../../type/book";

type InitialStateType = {
  favorites: BookType[];
};

const initialState: InitialStateType = {
  favorites: [],
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
        (book) => book._id !== action.payload
      );
    },
  },
});

export const { addTofavoritePage, removeFromfavoritePage } =
  favoriteSlice.actions;
export default favoriteSlice.reducer;
