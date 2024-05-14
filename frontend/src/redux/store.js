import { configureStore } from "@reduxjs/toolkit";
import { productApi } from "./api/productsApi.js";
import { authApi } from "./api/authApi.js";
import { userApi } from "./api/userApi.js";
import userReducer from "./features/userSlice.js";
import cartReducer from "./features/cartSlice.js";
import { orderApi } from "./api/orderApi.js";
export const store = configureStore({
  reducer: {
    [productApi.reducerPath]: productApi.reducer,
    [authApi.reducerPath]: authApi.reducer,
    [userApi.reducerPath]: userApi.reducer,
    [orderApi.reducerPath]: orderApi.reducer,
    auth: userReducer,
    cart: cartReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat([
      productApi.middleware,
      authApi.middleware,
      userApi.middleware,
      orderApi.middleware,
    ]),
});
