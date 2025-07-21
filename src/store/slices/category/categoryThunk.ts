import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import type { CategoryType } from "../../../type/category";

const BASE_URL = import.meta.env.VITE_BASE_URL;

export const fetchCategories = createAsyncThunk(
  "Categories/fetchCategory",
  async (_, { rejectWithValue }) => {
    try {
      const res = await axios.get(`${BASE_URL}/api/categories`);
      let { categories }: { categories: CategoryType[] } = res.data;
      categories = categories.filter(
        (category) =>
          category.name !== "Enfance" &&
          category.name !== "Jeux / Cadeaux" &&
          category.name !== "Papeterie"
      );
      return categories;
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
