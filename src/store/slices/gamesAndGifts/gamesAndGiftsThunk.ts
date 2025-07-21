import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

type FetchGamesAndGiftsParams = {
  page: number;
  title?: string;
};

const BASE_URL = import.meta.env.VITE_BASE_URL;

export const fetchGamesAndGifts = createAsyncThunk(
  "GamesAndGifts/fetchGamesAndGifts",
  async ({ page, title }: FetchGamesAndGiftsParams, { rejectWithValue }) => {
    try {
      const res = await axios.get(`${BASE_URL}/api/products/gamesAndGifts`, {
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
export const fetchGameAndGift = createAsyncThunk(
  "GamesAndGifts/fetchGameAndGift",
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
