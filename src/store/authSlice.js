import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import userApiService from '../service/userApiService';

// Async thunk for login
export const loginAsync = createAsyncThunk(
  'auth/loginAsync',
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const response = await userApiService.login(email, password);
      return response.user;
    } catch (error) {
      return rejectWithValue(error.message || 'Login failed');
    }
  }
);

// Async thunk for logout
export const logoutAsync = createAsyncThunk(
  'auth/logoutAsync',
  async (_, { rejectWithValue }) => {
    try {
      await userApiService.logout();
    } catch (error) {
      return rejectWithValue(error.message || 'Logout failed');
    }
  }
);

// Async thunk for getting current user
export const getCurrentUserAsync = createAsyncThunk(
  'auth/getCurrentUserAsync',
  async (_, { rejectWithValue }) => {
    try {
      const user = await userApiService.getCurrentUser();
      return user;
    } catch (error) {
      return rejectWithValue(error.message || 'Failed to get user profile');
    }
  }
);

const initialState = {
  isAuthenticated: false,
  user: null,
  loading: false,
  error: null,
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    // Login cases
    builder
      .addCase(loginAsync.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginAsync.fulfilled, (state, action) => {
        state.isAuthenticated = true;
        state.user = action.payload;
        state.loading = false;
        state.error = null;
      })
      .addCase(loginAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

    // Logout cases
      .addCase(logoutAsync.pending, (state) => {
        state.loading = true;
      })
      .addCase(logoutAsync.fulfilled, (state) => {
        state.isAuthenticated = false;
        state.user = null;
        state.loading = false;
        state.error = null;
      })
      .addCase(logoutAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

    // Get current user cases
      .addCase(getCurrentUserAsync.pending, (state) => {
        state.loading = true;
      })
      .addCase(getCurrentUserAsync.fulfilled, (state, action) => {
        state.user = action.payload;
        state.loading = false;
        state.error = null;
      })
      .addCase(getCurrentUserAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearError } = authSlice.actions;
export default authSlice.reducer;