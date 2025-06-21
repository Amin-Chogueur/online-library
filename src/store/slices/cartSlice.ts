import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { ItemType } from "../../type/cart";
import axios from "axios";
import type { BookType } from "../../type/book";
import type { RootState } from "../store";

type InitialStateType = {
  booksInCart: BookType[];
  cart: ItemType[];
  item: ItemType | null;
  error: { id: string; message: string } | null;
  booksInCartLoading: "idle" | "pending" | "succeeded" | "failed";
  booksInCartError: null | string;
};

const initialState: InitialStateType = {
  booksInCart: [],
  cart: [],
  item: null,
  error: null,
  booksInCartLoading: "idle",
  booksInCartError: "",
};

const BASE_URL = import.meta.env.VITE_BASE_URL;

export const fetchBooksInCart = createAsyncThunk(
  "cart/fetchBooksInCart",
  async (_, { rejectWithValue, getState }) => {
    try {
      // i get the ids here instead of geting them in the cart page  so i can fetch the books only once in the first render and whenever the user update the items quantity in the cart there is no need to refetch the books and if user remove item from cart , there i refetch the books again by dispatch this action in the remove button in the cartItem component for butter ux
      const state = getState() as RootState; // Type cast to your RootState
      const cart = state.cart.cart;
      const ids = cart.map((item) => item._id);
      const res = await axios.get(`${BASE_URL}/api/cart`, {
        params: { ids },
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
const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const id = action.payload;
      if (state.cart.find((item) => item._id === id)) {
        return;
      } else {
        const newItem = {
          _id: id,
          quantityInCart: 1,
        };
        state.cart.push(newItem); // add the item to the cart
      }
    },
    incresseQuantity: (state, action) => {
      const { id, quantity } = action.payload;
      const itemIndex = state.cart.findIndex((item) => item._id === id);
      if (state.cart[itemIndex].quantityInCart === quantity) {
        state.error = {
          id,
          message: "Quantité maximale atteinte.",
        };
        return;
      } else {
        state.cart[itemIndex].quantityInCart += 1;
      }
    },
    decresseQuantity: (state, action) => {
      const id = action.payload;
      state.error = null;
      const itemIndex = state.cart.findIndex((item) => item._id === id);
      if (state.cart[itemIndex].quantityInCart === 1) {
        return;
      } else {
        state.cart[itemIndex].quantityInCart -= 1;
      }
    },
    removeFromCart: (state, action) => {
      state.cart = state.cart.filter((item) => item._id !== action.payload);
      fetchBooksInCart();
    },
    clearCart: (state) => {
      state.cart = [];
    },
  },
  extraReducers: (builder) => {
    builder //'fetch all books without pagination'
      .addCase(fetchBooksInCart.pending, (state) => {
        state.booksInCartLoading = "pending";
      })
      .addCase(fetchBooksInCart.fulfilled, (state, action) => {
        state.booksInCartLoading = "succeeded";
        state.booksInCart = action.payload.booksInCart;
      })
      .addCase(fetchBooksInCart.rejected, (state, action) => {
        state.booksInCartLoading = "failed";
        state.booksInCartError = action.payload as string;
      });
  },
});

export const {
  addToCart,
  incresseQuantity,
  decresseQuantity,
  removeFromCart,
  clearCart,
} = cartSlice.actions;
export default cartSlice.reducer;
