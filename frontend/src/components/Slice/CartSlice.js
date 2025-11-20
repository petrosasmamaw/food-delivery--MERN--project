// src/components/Slice/CartSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// API helper
async function api(url, method = "GET", body) {
  const res = await fetch(url, {
    method,
    headers: { "Content-Type": "application/json" },
    body: body ? JSON.stringify(body) : undefined,
  });
  if (!res.ok) throw new Error("API Error");
  return res.json().catch(() => ({}));
}

// ---------- 1. LOAD CART ----------
export const fetchCart = createAsyncThunk("cart/fetchCart", async (userId) => {
  if (!userId) return [];
  const data = await api(`http://localhost:5000/api/cart/${userId}`);
  return data.items || [];
});

// ---------- 2. UPDATE SERVER ----------
export const syncCart = createAsyncThunk(
  "cart/syncCart",
  async ({ userId, items }) => {
    if (!userId) return items;
    const data = await api("http://localhost:5000/api/cart", "PUT", {
      userId,
      items,
    });
    return data.items;
  }
);

const CartSlice = createSlice({
  name: "cart",
  initialState: { items: [], loading: false, error: null },

  reducers: {
    // LOCAL ADD
    addItem: (state, action) => {
      const item = action.payload;
      const exist = state.items.find((i) => i._id === item._id);

      if (exist) exist.quantity++;
      else state.items.push({ ...item, quantity: 1 });
    },

    // LOCAL DECREASE
    decreaseItem: (state, action) => {
      const id = action.payload;
      const item = state.items.find((i) => i._id === id);

      if (!item) return;
      if (item.quantity > 1) item.quantity--;
      else state.items = state.items.filter((i) => i._id !== id);
    },

    // LOCAL REMOVE
    removeItem: (state, action) => {
      state.items = state.items.filter((i) => i._id !== action.payload);
    },

    clearCart: (state) => {
      state.items = [];
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(fetchCart.fulfilled, (state, action) => {
        state.items = action.payload || [];
      })
      .addCase(syncCart.fulfilled, (state, action) => {
        state.items = action.payload || [];
      });
  },
});

export const { addItem, decreaseItem, removeItem, clearCart } =
  CartSlice.actions;
export default CartSlice.reducer;
