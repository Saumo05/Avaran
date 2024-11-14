import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  isLoading: false,
  reviews: [],
};

export const addNewReview = createAsyncThunk(
  "/order/addNewReview",
  async (formData) => {
    const response = await axios.post(
      `${import.meta.env.VITE_API_URL}/api/shop/review/add`,
      formData
    );

    return response.data;
  }
);

export const getReviews = createAsyncThunk(
  "/order/getReviews",
  async (productId) => {
    const response = await axios.get(
      `${import.meta.env.VITE_API_URL}/api/shop/review/${productId}`
    );

    return response.data;
  }
);

const reviewSlice = createSlice({
  name: "reviewSlice",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getReviews.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getReviews.fulfilled, (state, action) => {
        state.isLoading = false;
        state.reviews = action.payload.data;
      })
      .addCase(getReviews.rejected, (state) => {
        state.isLoading = false;
        state.reviews = [];
      })
      .addCase(addNewReview.pending, (state) => {
        state.isLoading = true; // Indicate loading when adding a review
      })
      .addCase(addNewReview.fulfilled, (state, action) => {
        state.isLoading = false;
        // Add the new review to the state
        state.reviews = action.payload.data;
      })
      .addCase(addNewReview.rejected, (state) => {
        state.isLoading = false;
        // You can add error handling here, e.g., store an error message
      });
  },
});

export default reviewSlice.reducer;
