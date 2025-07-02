import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

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
