import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cartItems: localStorage.getItem("cartItems")
    ? JSON.parse(localStorage.getItem("cartItems"))
    : [],
  shippingInfo: localStorage.getItem("shippingInfo")
    ? JSON.parse(localStorage.getItem("shippingInfo"))
    : {},
};

const cartSlice = createSlice({
  name: "cartSlice",
  initialState,
  reducers: {
    setCartItem: (state, action) => {
      const item = action.payload;
      console.log("check item: ", item);
      const isExistIndex = state.cartItems.findIndex(
        (i) => i.product === item.product
      );
      console.log("check index: ", isExistIndex);
      console.log("check cart: ", state.cartItems);

      if (isExistIndex > -1) {
        if (state.cartItems[isExistIndex]) {
          state.cartItems[isExistIndex].quantity += item.quantity;
        }
      } else {
        state.cartItems = [...state.cartItems, item];
      }

      localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
    },
    removeCartItem: (state, action) => {
      const id = action.payload;
      state.cartItems = state.cartItems.filter((i) => i.product !== id);
      localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
    },
    clearCart: (state, action) => {
      localStorage.removeItem("cartItems");
      state.cartItems = [];
    },
    saveShippingInfo: (state, action) => {
      console.log(">>check shipping info: ", action.payload);
      state.shippingInfo = action.payload;
      localStorage.setItem("shippingInfo", JSON.stringify(state.shippingInfo));
    },
  },
});

export const { setCartItem, removeCartItem, saveShippingInfo, clearCart } =
  cartSlice.actions;
export default cartSlice.reducer;
