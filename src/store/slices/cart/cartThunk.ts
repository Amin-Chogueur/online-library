import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import type { RootState } from "../../store";
import type { OrderFormSchema } from "../../../components/cart/OrderForm";
import type { ItemType } from "../../../type/cart";

type OrderItem = {
  _id: string;
  bookId: string;
  title: string;
  category: string;
  price: number;
  promoPrice?: number;
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

const BASE_URL = import.meta.env.VITE_BASE_URL;

export const fetchProductsInCart = createAsyncThunk(
  "cart/fetchProductsInCart",
  async (_, { rejectWithValue, getState }) => {
    try {
      // i get the ids here instead of geting them in the cart page  so i can fetch the books only once in the first render and whenever the user update the items quantity in the cart there is no need to refetch the books and if user remove item from cart , there i refetch the books again by dispatch this action in the remove button in the cartItem component for butter ux
      const state = getState() as RootState; // Type cast to your RootState
      const cart = state.cart.cart;
      const ids = cart.map((item) => item._id);
      const res = await axios.get(`${BASE_URL}/api/cart`, {
        params: { ids },
      });
      console.log(res.data);
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

export const placeOrder = createAsyncThunk(
  "cart/placeOrder",
  async (
    {
      clientInfo,
      cartItems,
    }: { clientInfo: OrderFormSchema; cartItems: ItemType[] },
    { rejectWithValue }
  ) => {
    try {
      const res = await axios.post(`${BASE_URL}/api/orders`, {
        clientInfo,
        cartItems,
      });

      if (res.data.status === 200) {
        return res.data;
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        return rejectWithValue(
          error.response?.data?.message || "Échec de l'envoi de la commonde"
        );
      }

      return rejectWithValue("An unknown error occurred");
    }
  }
);
