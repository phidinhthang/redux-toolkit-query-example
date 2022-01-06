import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import { api } from "./api";
import { setupListeners } from "@reduxjs/toolkit/query";

export const store = configureStore({
  reducer: {
    [api.reducerPath]: api.reducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(api.middleware)
});

setupListeners(store.dispatch);
