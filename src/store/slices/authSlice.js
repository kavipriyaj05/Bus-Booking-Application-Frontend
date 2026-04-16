import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { signupUser, loginUser, googleAuth, forgotPassword, resetPassword } from '../../services/authService';

export const signup = createAsyncThunk('auth/signup', async (data, { rejectWithValue }) => {
  try { const res = await signupUser(data); localStorage.setItem('token', res.data.token); localStorage.setItem('user', JSON.stringify(res.data)); return res.data; }
  catch (err) { return rejectWithValue(err.response?.data?.message || 'Signup failed'); }
});

export const login = createAsyncThunk('auth/login', async (data, { rejectWithValue }) => {
  try { const res = await loginUser(data); localStorage.setItem('token', res.data.token); localStorage.setItem('user', JSON.stringify(res.data)); return res.data; }
  catch (err) { return rejectWithValue(err.response?.data?.message || 'Login failed'); }
});

export const googleLogin = createAsyncThunk('auth/googleLogin', async (data, { rejectWithValue }) => {
  try { const res = await googleAuth(data); localStorage.setItem('token', res.data.token); localStorage.setItem('user', JSON.stringify(res.data)); return res.data; }
  catch (err) { return rejectWithValue(err.response?.data?.message || 'Google login failed'); }
});

export const forgotPwd = createAsyncThunk('auth/forgotPassword', async (data, { rejectWithValue }) => {
  try { const res = await forgotPassword(data); return res.data; }
  catch (err) { return rejectWithValue(err.response?.data?.message || 'Failed to send reset email'); }
});

export const resetPwd = createAsyncThunk('auth/resetPassword', async (data, { rejectWithValue }) => {
  try { const res = await resetPassword(data); return res.data; }
  catch (err) { return rejectWithValue(err.response?.data?.message || 'Password reset failed'); }
});

const storedUser = localStorage.getItem('user');

const authSlice = createSlice({
  name: 'auth',
  initialState: { user: storedUser ? JSON.parse(storedUser) : null, token: localStorage.getItem('token') || null, isAuthenticated: !!localStorage.getItem('token'), loading: false, error: null, message: null },
  reducers: {
    logout: (state) => { state.user = null; state.token = null; state.isAuthenticated = false; state.error = null; state.message = null; localStorage.removeItem('token'); localStorage.removeItem('user'); },
    clearError: (state) => { state.error = null; },
    clearMessage: (state) => { state.message = null; }
  },
  extraReducers: (builder) => {
    builder
      .addCase(signup.pending, (state) => { state.loading = true; state.error = null; })
      .addCase(signup.fulfilled, (state, action) => { state.loading = false; state.user = action.payload; state.token = action.payload.token; state.isAuthenticated = true; })
      .addCase(signup.rejected, (state, action) => { state.loading = false; state.error = action.payload; })
      .addCase(login.pending, (state) => { state.loading = true; state.error = null; })
      .addCase(login.fulfilled, (state, action) => { state.loading = false; state.user = action.payload; state.token = action.payload.token; state.isAuthenticated = true; })
      .addCase(login.rejected, (state, action) => { state.loading = false; state.error = action.payload; })
      .addCase(googleLogin.pending, (state) => { state.loading = true; state.error = null; })
      .addCase(googleLogin.fulfilled, (state, action) => { state.loading = false; state.user = action.payload; state.token = action.payload.token; state.isAuthenticated = true; })
      .addCase(googleLogin.rejected, (state, action) => { state.loading = false; state.error = action.payload; })
      .addCase(forgotPwd.pending, (state) => { state.loading = true; state.error = null; })
      .addCase(forgotPwd.fulfilled, (state, action) => { state.loading = false; state.message = action.payload.message || 'Reset email sent'; })
      .addCase(forgotPwd.rejected, (state, action) => { state.loading = false; state.error = action.payload; })
      .addCase(resetPwd.pending, (state) => { state.loading = true; state.error = null; })
      .addCase(resetPwd.fulfilled, (state, action) => { state.loading = false; state.message = action.payload.message || 'Password reset successful'; })
      .addCase(resetPwd.rejected, (state, action) => { state.loading = false; state.error = action.payload; });
  }
});

export const { logout, clearError, clearMessage } = authSlice.actions;
export default authSlice.reducer;
