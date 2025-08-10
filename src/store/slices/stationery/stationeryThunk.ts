import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

type FetchStationerParams = {
  page: number;
  selectedSubCategory?: string;
  productStatus?: string | undefined;
  title?: string;
};

const BASE_URL = import.meta.env.VITE_BASE_URL;

export const fetchStationeryProducts = createAsyncThunk(
  "Stationery/fetchStationeryProducts",
  async (
    { page, selectedSubCategory, title, productStatus }: FetchStationerParams,
    { rejectWithValue }
  ) => {
    try {
      const res = await axios.get(`${BASE_URL}/api/products`, {
        params: {
          title,
          category: "Papeterie",
          subCategory: selectedSubCategory,
          productStatus: productStatus,
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
export const fetchStationeryItem = createAsyncThunk(
  "Stationery/fetchStationeryItem",
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
