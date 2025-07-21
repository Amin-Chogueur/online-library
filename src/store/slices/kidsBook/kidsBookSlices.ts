import { createSlice } from "@reduxjs/toolkit";
import { fetchKidsBook, fetchKidsBooks } from "./kidsBookThunk";
import type { ProductType } from "../../../type/product";

// Define a type for the slice state
type InitialStateType = {
  KidsBooks: ProductType[];
  KidsBook: ProductType | null;
  totalKidsBooks: number;
  totalPages: number;
  kidsBookLoading: "idle" | "pending" | "succeeded" | "failed";
  error: null | string;
};

// Define the initial state using that type
const initialState: InitialStateType = {
  KidsBooks: [],
  KidsBook: null,
  totalPages: 1,
  totalKidsBooks: 0,
  kidsBookLoading: "idle",
  error: "",
};

export const bookSlice = createSlice({
  name: "KidsBooks",

  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      //fetch books
      .addCase(fetchKidsBooks.pending, (state) => {
        state.kidsBookLoading = "pending";
      })
      .addCase(fetchKidsBooks.fulfilled, (state, action) => {
        state.kidsBookLoading = "succeeded";
        state.KidsBooks = action.payload.books;
        state.totalPages = action.payload.totalPages;
        state.totalKidsBooks = action.payload.totalBooks;
      })
      .addCase(fetchKidsBooks.rejected, (state, action) => {
        state.kidsBookLoading = "failed";
        state.error = action.payload as string;
      })
      //fetch book
      .addCase(fetchKidsBook.pending, (state) => {
        state.kidsBookLoading = "pending";
      })
      .addCase(fetchKidsBook.fulfilled, (state, action) => {
        state.kidsBookLoading = "succeeded";
        state.KidsBook = action.payload.product;
      })
      .addCase(fetchKidsBook.rejected, (state, action) => {
        state.kidsBookLoading = "failed";
        state.error = action.payload as string;
      });
  },
});

export default bookSlice.reducer;
