import { createSlice } from "@reduxjs/toolkit";

const billToSlice = createSlice({
  name: "billTo",
  initialState: {
    billToName: "",
    billToEmail: "",
    billToAddress: "",
  },
  reducers: {
    name(state, action) {
      state.billToName = action.payload;
    },
    email(state, action) {
      state.billToEmail = action.payload;
    },
    address(state, action) {
      state.billToAddress = action.payload;
    },
  },
});

export const billToActions = billToSlice.actions;

export default billToSlice;
