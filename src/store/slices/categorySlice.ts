import type { CategoryType } from "../../type/category";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Define a type for the slice state
type InitialStateType = {
  categories: CategoryType[];
  loading: "idle" | "pending" | "succeeded" | "failed";
  error: null | string;
};

// Define the initial state using that type
const initialState: InitialStateType = {
  categories: [],
  loading: "idle",
  error: "",
};

const BASE_URL = import.meta.env.VITE_BASE_URL;

export const createCategory = createAsyncThunk(
  "Categories/createCategory",
  async (categoryName: string, { rejectWithValue }) => {
    try {
      const res = await axios.post(`${BASE_URL}/api/categories`, {
        name: categoryName,
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

export const fetchCategories = createAsyncThunk(
  "Categories/fetchCategory",
  async (_, { rejectWithValue }) => {
    try {
      const res = await axios.get(`${BASE_URL}/api/categories`);

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

export const categorySlice = createSlice({
  name: "Categories",

  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      //fetch categories
      .addCase(fetchCategories.pending, (state) => {
        state.loading = "pending";
      })
      .addCase(fetchCategories.fulfilled, (state, action) => {
        state.loading = "succeeded";
        state.categories = action.payload.categories;
      })
      .addCase(fetchCategories.rejected, (state, action) => {
        state.loading = "failed";
        state.error = action.payload as string;
      })
      //create new category
      .addCase(createCategory.pending, (state) => {
        state.loading = "pending";
      })
      .addCase(createCategory.fulfilled, (state, action) => {
        state.loading = "succeeded";
        state.categories.unshift(action.payload.newCategory);
      })
      .addCase(createCategory.rejected, (state, action) => {
        state.loading = "failed";
        state.error = action.payload as string;
      });
  },
});

export default categorySlice.reducer;
