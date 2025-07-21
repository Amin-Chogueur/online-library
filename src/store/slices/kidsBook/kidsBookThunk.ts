import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

type FetchBooksParams = {
  page: number;
  title?: string;
};

const BASE_URL = import.meta.env.VITE_BASE_URL;

export const fetchKidsBooks = createAsyncThunk(
  "KidsBooks/fetchKidsBooks",
  async ({ page, title }: FetchBooksParams, { rejectWithValue }) => {
    try {
      const res = await axios.get(`${BASE_URL}/api/products/kids`, {
        params: {
          title,
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
export const fetchKidsBook = createAsyncThunk(
  "KidsBooks/fetchKidsBook",
  async (title: string, { rejectWithValue }) => {
    try {
      const res = await axios.get(`${BASE_URL}/api/products/${title}`);

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
