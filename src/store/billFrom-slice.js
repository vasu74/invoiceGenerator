import { createSlice } from "@reduxjs/toolkit";

const billFromSlice = createSlice({
  name: "billFrom",
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

export const billFromActions = billFromSlice.actions;

export default billFromSlice;
