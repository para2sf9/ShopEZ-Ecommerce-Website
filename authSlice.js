import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { authAPI } from "../services/api";

const userFromStorage = JSON.parse(localStorage.getItem("shopezUser") || "null");

export const register = createAsyncThunk("auth/register", async (data, { rejectWithValue }) => {
  try {
    const res = await authAPI.register(data);
    localStorage.setItem("shopezUser", JSON.stringify(res.data));
    return res.data;
  } catch (err) {
    return rejectWithValue(err.response?.data?.message || "Registration failed");
  }
});

export const login = createAsyncThunk("auth/login", async (data, { rejectWithValue }) => {
  try {
    const res = await authAPI.login(data);
    localStorage.setItem("shopezUser", JSON.stringify(res.data));
    return res.data;
  } catch (err) {
    return rejectWithValue(err.response?.data?.message || "Login failed");
  }
});

export const fetchProfile = createAsyncThunk("auth/profile", async (_, { rejectWithValue }) => {
  try {
    const res = await authAPI.getProfile();
    return res.data;
  } catch (err) {
    return rejectWithValue(err.response?.data?.message);
  }
});

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: userFromStorage,
    loading: false,
    error: null,
  },
  reducers: {
    logout: (state) => {
      state.user = null;
      localStorage.removeItem("shopezUser");
    },
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(register.pending, (state) => { state.loading = true; state.error = null; })
      .addCase(register.fulfilled, (state, action) => { state.loading = false; state.user = action.payload; })
      .addCase(register.rejected, (state, action) => { state.loading = false; state.error = action.payload; })
      .addCase(login.pending, (state) => { state.loading = true; state.error = null; })
      .addCase(login.fulfilled, (state, action) => { state.loading = false; state.user = action.payload; })
      .addCase(login.rejected, (state, action) => { state.loading = false; state.error = action.payload; })
      .addCase(fetchProfile.fulfilled, (state, action) => {
        state.user = { ...state.user, ...action.payload };
      });
  },
});

export const { logout, clearError } = authSlice.actions;
export default authSlice.reducer;
