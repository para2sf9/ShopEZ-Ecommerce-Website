import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { productAPI } from "../services/api";

export const fetchProducts = createAsyncThunk("product/fetchAll", async (params) => {
  const res = await productAPI.getAll(params);
  return res.data;
});

export const fetchFeatured = createAsyncThunk("product/featured", async () => {
  const res = await productAPI.getFeatured();
  return res.data;
});

export const fetchTrending = createAsyncThunk("product/trending", async () => {
  const res = await productAPI.getTrending();
  return res.data;
});

export const fetchNewArrivals = createAsyncThunk("product/newArrivals", async () => {
  const res = await productAPI.getNewArrivals();
  return res.data;
});

export const fetchProductById = createAsyncThunk("product/fetchById", async (id) => {
  const res = await productAPI.getById(id);
  return res.data;
});

const productSlice = createSlice({
  name: "product",
  initialState: {
    products: [],
    featured: [],
    trending: [],
    newArrivals: [],
    currentProduct: null,
    total: 0,
    pages: 0,
    loading: false,
    error: null,
  },
  reducers: {
    clearCurrentProduct: (state) => {
      state.currentProduct = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => { state.loading = true; })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.products = action.payload.products;
        state.total = action.payload.total;
        state.pages = action.payload.pages;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(fetchFeatured.fulfilled, (state, action) => { state.featured = action.payload; })
      .addCase(fetchTrending.fulfilled, (state, action) => { state.trending = action.payload; })
      .addCase(fetchNewArrivals.fulfilled, (state, action) => { state.newArrivals = action.payload; })
      .addCase(fetchProductById.fulfilled, (state, action) => { state.currentProduct = action.payload; });
  },
});

export const { clearCurrentProduct } = productSlice.actions;
export default productSlice.reducer;
