import { configureStore } from "@reduxjs/toolkit";
import filterSortSlice from "./filterSlice";
import cartSlice from "./cartSlice";
export const store = configureStore({
  reducer: {
    filterSortSlice,
    cartSlice,
  }
})