import type { BookType } from "../../type/book";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Define a type for the slice state
type InitialStateType = {
  books: BookType[];
  book: BookType | null;
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

type FetchBooksParams = {
  page: number;
  selectedCategory: string;
  title?: string;
};

const BASE_URL = import.meta.env.VITE_BASE_URL;

export const fetchBooks = createAsyncThunk(
  "Books/fetchBooks",
  async (
    { page, selectedCategory, title }: FetchBooksParams,
    { rejectWithValue }
  ) => {
    try {
      const res = await axios.get(`${BASE_URL}/api/books`, {
        params: {
          title,
          category: selectedCategory,
          page,
        },
      });

      return res.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        return rejectWithValue(
          error.response?.data?.message || "An error occurred"
        );
      }

      return rejectWithValue("An unknown error occurred");
    }
  }
);
export const fetchBook = createAsyncThunk(
  "Books/fetchBook",
  async (title: string, { rejectWithValue }) => {
    try {
      const res = await axios.get(`${BASE_URL}/api/books/${title}`);

      return res.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        return rejectWithValue(
          error.response?.data?.message || "An error occurred"
        );
      }

      return rejectWithValue("An unknown error occurred");
    }
  }
);

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
        state.book = action.payload.book;
      })
      .addCase(fetchBook.rejected, (state, action) => {
        state.bookLoading = "failed";
        state.error = action.payload as string;
      });
  },
});

export default bookSlice.reducer;
