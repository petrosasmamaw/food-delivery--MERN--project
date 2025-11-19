import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// --- FETCH FOODS FROM BACKEND ---
export const fetchFoods = createAsyncThunk(
  "store/fetchFoods",
  async () => {
    const res = await axios.get("http://localhost:5000/api/foods");
    return res.data;
  }
);

const StoreSlice = createSlice({
  name: "store",
  initialState: {
    foods: [],
    loading: false,
    error: null
  },
  reducers: {},

  extraReducers: (builder) => {
    builder
      .addCase(fetchFoods.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchFoods.fulfilled, (state, action) => {
        state.loading = false;
        state.foods = action.payload;
      })
      .addCase(fetchFoods.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  }
});

export default StoreSlice.reducer;
