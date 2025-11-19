import { createSlice } from "@reduxjs/toolkit";

const initialState = { orders: [] };

const OrderSlice = createSlice({
  name: "orders",
  initialState,
  reducers: {
    setOrders: (state, action) => {
      state.orders = action.payload || [];
    },

    placeOrder: (state, action) => {
      state.orders.push({
        ...action.payload,
        _id: Date.now(),
        createdAt: new Date().toISOString(),
        status: "Pending"
      });
    }
  }
});

export const { setOrders, placeOrder } = OrderSlice.actions;
export default OrderSlice.reducer;
