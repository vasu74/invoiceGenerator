import { createSlice } from "@reduxjs/toolkit";

const ItemSlice = createSlice({
  name: "item",
  initialState: {
    items: [
      {
        id: "0",
        name: "",
        description: "",
        price: 1.0,
        quantity: 1,
      },
    ],
    total: 0,
    subTotal: 0,
    taxRate: 10,
    taxAmount: 0,
    discountRate: 10,
    discountAmount: 0.0,
    currency: "$",
    notes: "",
    isOpen: false,
  },
  reducers: {
    addItemToCart(state) {
      var id = (+new Date() + Math.floor(Math.random() * 9999999999)).toString(
        36
      );
      state.items.push({
        id: id,
        name: "",
        price: 1.0,
        description: "",
        quantity: 1,
      });
    },

    removeItemToCart(state, action) {
      // get to know why this is not working
      // var index = state.items.indexOf(action.payload);
      // state.items = state.items.splice(index, 1);
      state.items = state.items.filter((item) => item.id !== action.payload.id);
    },

    // edit cart item
    itemEditHandler(state, action) {
      state.items = state.items.map(function (item) {
        for (var key in item) {
          if (key === action.payload.name && item.id === action.payload.id) {
            item[key] = action.payload.value;
          }
        }
        return item;
      });
    },
    handleCalculateTotal(state, action) {
      // here we use forEach method in place of map function
      // state.items.forEach((item) => {
      //   state.subTotal = parseFloat(
      //     state.subTotal +
      //       parseFloat(item.price).toFixed(2) * parseInt(item.quantity)
      //   ).toFixed(2);
      // });

      // state.items.forEach((item) => {
      //   state.subTotal =
      //     parseFloat(state.subTotal).toFixed(2) +
      //     parseFloat(item.price).toFixed(2) * parseInt(item.quantity);
      // });
      // state.taxAmount = parseFloat(
      //   parseFloat(state.subTotal).toFixed(2) * (state.taxRate / 100)
      // ).toFixed(2);
      // state.discountAmount = parseFloat(
      //   parseFloat(state.subTotal).toFixed(2) * (state.discountRate / 100)
      // ).toFixed(2);
      // state.total =
      //   parseFloat(state.subTotal).toFixed(2) -
      //   (state.discountAmount + state.taxAmount);
      state.subTotal = 0;
      state.items.map((item) => {
        state.subTotal += parseFloat((item.price * item.quantity).toFixed(2));
        return parseFloat(state.subTotal.toFixed(2));
      });
      state.taxAmount = parseFloat(
        (state.subTotal * (state.taxRate / 100)).toFixed(2)
      );
      state.discountAmount = parseFloat(
        (state.subTotal * (state.discountRate / 100)).toFixed(2)
      );
      state.total = parseFloat(
        state.subTotal - state.discountAmount - state.taxAmount
      ).toFixed(2);
    },
    note(state, action) {
      state.notes = action.payload;
    },
    currencyChange(state, action) {
      state.currency = action.payload;
    },
    taxRateChange(state, action) {
      state.taxRate = action.taxRate;
    },
    discountRateChange(state, action) {
      state.discountRate = action.discountRate;
    },

    openModal(state, action) {
      state.isOpen = !state.isOpen;
    },
  },
});

export const itemActions = ItemSlice.actions;
export default ItemSlice;
