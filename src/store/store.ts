import { combineReducers, configureStore } from "@reduxjs/toolkit";
import booksReducer from "./slices/book/bookSlices";
import subCategoriesReducer from "./slices/subCategory/subCategorySlice";
import cartReducer from "./slices/cart/cartSlice";
import favoritesReducer from "./slices/favorites/favoriteSlice";
import kidsBooksReducer from "./slices/kidsBook/kidsBookSlices";
import gamesAndGiftsReducer from "./slices/gamesAndGifts/gamesAndGiftsSlice";
import stationeryReducer from "./slices/stationery/stationerySlice";
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";

import storage from "redux-persist/lib/storage"; // localStorage for web

const rootReducer = combineReducers({
  books: booksReducer, // not persisted
  kidsBook: kidsBooksReducer,
  gamesAndGifts: gamesAndGiftsReducer,
  subCategories: subCategoriesReducer, // not persisted
  cart: cartReducer, // will be persisted via root config
  favorites: favoritesReducer, // will be persisted via root config
  stationery: stationeryReducer,
});

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["cart", "favorites"], // persist only these
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);

// Types
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
