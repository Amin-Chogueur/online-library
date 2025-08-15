import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const BASE_URL = import.meta.env.VITE_BASE_URL;

export const fetchCategories = createAsyncThunk(
  "Categories/fetchCategory",
  async (category: string | null, { rejectWithValue }) => {
    try {
      const res = await axios.get(`${BASE_URL}/api/categories`, {
        params: {
          category,
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
