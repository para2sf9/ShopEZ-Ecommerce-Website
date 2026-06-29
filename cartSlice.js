import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { cartAPI } from "../services/api";

export const fetchCart = createAsyncThunk("cart/fetch", async (_, { rejectWithValue }) => {
  try {
    const res = await cartAPI.get();
    return res.data;
  } catch (err) {
    return rejectWithValue(err.response?.data?.message);
  }
});

export const addToCart = createAsyncThunk("cart/add", async (data, { rejectWithValue }) => {
  try {
    const res = await cartAPI.add(data);
    return res.data;
  } catch (err) {
    return rejectWithValue(err.response?.data?.message);
  }
});

export const updateCartItem = createAsyncThunk("cart/update", async (data, { rejectWithValue }) => {
  try {
    const res = await cartAPI.update(data);
    return res.data;
  } catch (err) {
    return rejectWithValue(err.response?.data?.message);
  }
});

export const removeFromCart = createAsyncThunk("cart/remove", async (productId, { rejectWithValue }) => {
  try {
    const res = await cartAPI.remove(productId);
    return res.data;
  } catch (err) {
    return rejectWithValue(err.response?.data?.message);
  }
});

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    items: [],
    loading: false,
    error: null,
  },
  reducers: {
    clearCartState: (state) => {
      state.items = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCart.pending, (state) => { state.loading = true; })
      .addCase(fetchCart.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload?.items || [];
      })
      .addCase(fetchCart.rejected, (state) => { state.loading = false; state.items = []; })
      .addCase(addToCart.fulfilled, (state, action) => {
        state.items = action.payload?.items || [];
      })
      .addCase(updateCartItem.fulfilled, (state, action) => {
        state.items = action.payload?.items || [];
      })
      .addCase(removeFromCart.fulfilled, (state, action) => {
        state.items = action.payload?.items || [];
      });
  },
});

export const { clearCartState } = cartSlice.actions;
export default cartSlice.reducer;
