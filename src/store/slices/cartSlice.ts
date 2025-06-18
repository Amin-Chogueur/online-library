import { createSlice } from "@reduxjs/toolkit";
import type { ItemType } from "../../type/cart";

type InitialStateType = {
  cart: ItemType[];
  item: ItemType | null;
  error: { id: string; message: string } | null;
};

const initialState: InitialStateType = {
  cart: [],
  item: null,
  error: null,
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
    },
  },
});

export const { addToCart, incresseQuantity, decresseQuantity, removeFromCart } =
  cartSlice.actions;
export default cartSlice.reducer;
