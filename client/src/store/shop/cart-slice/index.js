import axios from "axios";

import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
  cartItems: [],
  isLoading: false,
};

export const addToCart = createAsyncThunk(
  "/cart/addToCart",
  async ({ userId, productId, quantity }) => {
    const response = await axios.post(
      `${import.meta.env.VITE_API_URL}/api/shop/cart/add`,
      { userId, productId, quantity }
    );

    return response.data;
  }
);

export const fetchCartItems = createAsyncThunk(
  "/cart/fetchCartItems",
  async (userId) => {
    const response = await axios.get(
      `${import.meta.env.VITE_API_URL}/api/shop/cart/get/${userId}`
    );

    return response.data;
  }
);
export const deleteCartItem = createAsyncThunk(
  "/cart/deleteCartItem",
  async ({ userId, productId }) => {
    const response = await axios.delete(
      `${
        import.meta.env.VITE_API_URL
      }/api/shop/cart/delete/${userId}/${productId}`
    );

    return response.data;
  }
);
export const updateCartQty = createAsyncThunk(
  "/cart/updateCartQty",
  async ({ userId, productId, quantity }) => {
    const response = await axios.put(
      `${import.meta.env.VITE_API_URL}/api/shop/cart/update-cart`,
      { userId, productId, quantity }
    );

    return response.data;
  }
);

const shoppingCartSlice = createSlice({
  name: "shoppingCart",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(addToCart.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(addToCart.fulfilled, (state, action) => {
      state.isLoading = false;
      state.cartItems = action.payload.data;
    });
    builder.addCase(addToCart.rejected, (state) => {
      state.isLoading = false;
      state.cartItems = [];
    });
    builder.addCase(fetchCartItems.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(fetchCartItems.fulfilled, (state, action) => {
      state.isLoading = false;
      state.cartItems = action.payload.data;
    });
    builder.addCase(fetchCartItems.rejected, (state) => {
      state.isLoading = false;
      state.cartItems = [];
    });
    builder.addCase(updateCartQty.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(updateCartQty.fulfilled, (state, action) => {
      state.isLoading = false;
      state.cartItems = action.payload.data;
    });
    builder.addCase(updateCartQty.rejected, (state) => {
      state.isLoading = false;
      state.cartItems = [];
    });
    builder.addCase(deleteCartItem.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(deleteCartItem.fulfilled, (state, action) => {
      state.isLoading = false;
      state.cartItems = action.payload.data;
    });
    builder.addCase(deleteCartItem.rejected, (state) => {
      state.isLoading = false;
      state.cartItems = [];
    });
  },
});

export default shoppingCartSlice.reducer;
