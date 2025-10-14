import { combineReducers, configureStore } from "@reduxjs/toolkit";

import cartReducer from "./slices/cart/cartSlice";
import favoritesReducer from "./slices/favorites/favoriteSlice";

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
  cart: cartReducer, // will be persisted via root config
  favorites: favoritesReducer, // will be persisted via root config
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
