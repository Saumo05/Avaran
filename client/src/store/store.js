//Still store will create our global reducer and holds all application state
//We need to create slices for each and every apllication

import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./auth-slice";
import adminProducts from "./admin/products-slice";
import adminOrderSlice from "./admin/order-slice";
import shoppingProducts from "./shop/products-slice";
import shopCartSlice from "./shop/cart-slice";
import shopAddressSlice from "./shop/address-slice";
import shopOrderSlice from "./shop/order-slice";
import shopSearchSlice from "./shop/search-slice";
import shopReviewSlice from "./shop/review-slice";
import commonFeatureSlice from "./common-slice/feature-slice";

//Combine all slices to form a global reducer

const store = configureStore({
  reducer: {
    auth: authReducer,

    adminProducts: adminProducts,
    adminOrder: adminOrderSlice,

    commonFeature: commonFeatureSlice,

    shopProducts: shoppingProducts,
    shopCart: shopCartSlice,
    shopAddress: shopAddressSlice,
    shopOrder: shopOrderSlice,
    shopSearch: shopSearchSlice,
    shopReview: shopReviewSlice,
  },
});

export default store;
