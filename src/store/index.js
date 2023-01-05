import { configureStore } from "@reduxjs/toolkit";
import billFromSlice from "./billFrom-slice";
import billToSlice from "./billTo-slice";
import ItemSlice from "./item-slice";

const store = configureStore({
  reducer: {
    billTo: billToSlice.reducer,
    billFrom: billFromSlice.reducer,
    cart: ItemSlice.reducer,
  },
});

export default store;
