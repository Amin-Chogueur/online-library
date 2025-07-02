import { createSlice } from "@reduxjs/toolkit";
import type { ItemType } from "../../../type/cart";

import type { BookType } from "../../../type/book";

import { fetchBooksInCart, placeOrder } from "./cartThunk";

type OrderItem = {
  _id: string;
  bookId: string;
  title: string;
  category: string;
  price: number;
  quantityInCart: number;
};

type Customer = {
  fullName: string;
  email: string;
  mobile: string;
  address: string;
};

export type Order = {
  _id: string;
  createdAt: string;
  updatedAt: string;
  totalAmount: number;
  status: string;
  customer: Customer;
  items: OrderItem[];
};

type InitialStateType = {
  booksInCart: BookType[];
  cart: ItemType[];
  item: ItemType | null;
  error: { id: string; message: string } | null;
  booksInCartLoading: "idle" | "pending" | "succeeded" | "failed";
  booksInCartError: null | string;
  loadingPlacingOrder: "idle" | "pending" | "succeeded" | "failed";
  errorPlacingOrderMessage: string;
  successPlacingOrderMessage: string;
  placedOrder: Order | undefined;
};

const initialState: InitialStateType = {
  booksInCart: [],
  cart: [],
  item: null,
  error: null,
  booksInCartLoading: "idle",
  booksInCartError: "",
  loadingPlacingOrder: "idle",
  errorPlacingOrderMessage: "",
  successPlacingOrderMessage: "",
  placedOrder: undefined,
};

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
    clearSuccesmessage: (state) => {
      state.errorPlacingOrderMessage = "";
      state.loadingPlacingOrder = "idle";
      state.placedOrder = undefined;
      state.successPlacingOrderMessage = "";
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
      })
      //place Order
      .addCase(placeOrder.pending, (state) => {
        state.loadingPlacingOrder = "pending";
      })
      .addCase(placeOrder.fulfilled, (state, action) => {
        state.loadingPlacingOrder = "succeeded";
        state.placedOrder = action.payload.createdOrder;
        state.successPlacingOrderMessage = action.payload.message;
        state.cart = [];
      })
      .addCase(placeOrder.rejected, (state, action) => {
        state.loadingPlacingOrder = "failed";
        state.errorPlacingOrderMessage =
          (action.payload as string) || "Échec de l'envoi de la commonde";
      });
  },
});

export const {
  addToCart,
  incresseQuantity,
  decresseQuantity,
  removeFromCart,
  clearCart,
  clearSuccesmessage,
} = cartSlice.actions;
export default cartSlice.reducer;
