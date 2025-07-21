import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const BASE_URL = import.meta.env.VITE_BASE_URL;

export const fetchFavoriteProduct = createAsyncThunk(
  "Favorites/fetchFavoriteProduct",
  async (title: string, { rejectWithValue }) => {
    try {
      const res = await axios.get(`${BASE_URL}/api/products/${title}`);
      return res.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        return rejectWithValue(
          error.response?.data?.message || "Une erreur s'est produite"
        );
      }

      return rejectWithValue("Une erreur inconnue s'est produite");
    }
  }
);
