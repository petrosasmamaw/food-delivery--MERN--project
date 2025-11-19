import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  items: [], // Cart items
};

const CartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    // Set cart items from backend
    setCart: (state, action) => {
      state.items = action.payload || [];
    },

    // Add item locally
    addToCartLocal: (state, action) => {
      const { item } = action.payload;
      const existing = state.items.find((i) => i._id === item._id);

      if (existing) existing.quantity += 1;
      else state.items.push({ ...item, quantity: 1 });
    },

    // Decrease quantity locally
    decreaseQuantityLocal: (state, action) => {
      const id = action.payload;
      const item = state.items.find((i) => i._id === id);

      if (item) {
        if (item.quantity > 1) item.quantity -= 1;
        else state.items = state.items.filter((i) => i._id !== id);
      }
    },

    // Remove item completely
    removeFromCartLocal: (state, action) => {
      const id = action.payload;
      state.items = state.items.filter((i) => i._id !== id);
    },

    // Clear cart locally
    clearCartLocal: (state) => {
      state.items = [];
    },
  },
});

// Export actions
export const {
  setCart,
  addToCartLocal,
  decreaseQuantityLocal,
  removeFromCartLocal,
  clearCartLocal,
} = CartSlice.actions;

// Export reducer
export default CartSlice.reducer;

/* ------------------------
   ASYNC THUNK — Backend Sync
------------------------ */
export const syncCartWithBackend = (userId, items) => async () => {
  if (!userId) return;
  try {
    await axios.put("/api/cart", { userId, items });
  } catch (err) {
    console.error("Cart sync error:", err);
  }
};
