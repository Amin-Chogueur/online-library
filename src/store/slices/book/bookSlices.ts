import type { ProductType } from "../../../type/product";
import { createSlice } from "@reduxjs/toolkit";
import { fetchBook, fetchBooks } from "./bookThunk";

// Define a type for the slice state
type InitialStateType = {
  books: ProductType[];
  book: ProductType | null;
  totalBooks: number;
  totalPages: number;
  bookLoading: "idle" | "pending" | "succeeded" | "failed";
  error: null | string;
};

// Define the initial state using that type
const initialState: InitialStateType = {
  books: [],
  book: null,
  totalPages: 1,
  totalBooks: 0,
  bookLoading: "idle",
  error: "",
};

export const bookSlice = createSlice({
  name: "Books",

  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      //fetch books
      .addCase(fetchBooks.pending, (state) => {
        state.bookLoading = "pending";
      })
      .addCase(fetchBooks.fulfilled, (state, action) => {
        state.bookLoading = "succeeded";
        state.books = action.payload.books;
        state.totalPages = action.payload.totalPages;
        state.totalBooks = action.payload.totalBooks;
      })
      .addCase(fetchBooks.rejected, (state, action) => {
        state.bookLoading = "failed";
        state.error = action.payload as string;
      })
      //fetch book
      .addCase(fetchBook.pending, (state) => {
        state.bookLoading = "pending";
      })
      .addCase(fetchBook.fulfilled, (state, action) => {
        state.bookLoading = "succeeded";
        state.book = action.payload.product;
      })
      .addCase(fetchBook.rejected, (state, action) => {
        state.bookLoading = "failed";
        state.error = action.payload as string;
      });
  },
});

export default bookSlice.reducer;
