import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import * as adminService from '../../services/adminService';

export const loadBuses = createAsyncThunk('bus/loadBuses', async (_, { rejectWithValue }) => {
  try { return (await adminService.fetchAllBuses()).data; } catch (e) { return rejectWithValue(e.response?.data?.message || 'Failed to load buses'); }
});

export const addBus = createAsyncThunk('bus/addBus', async (data, { rejectWithValue }) => {
  try { return (await adminService.createBus(data)).data; } catch (e) { return rejectWithValue(e.response?.data?.message || 'Failed to create bus'); }
});

export const editBus = createAsyncThunk('bus/editBus', async ({ id, data }, { rejectWithValue }) => {
  try { return (await adminService.updateBus(id, data)).data; } catch (e) { return rejectWithValue(e.response?.data?.message || 'Failed to update bus'); }
});

export const removeBus = createAsyncThunk('bus/removeBus', async (id, { rejectWithValue }) => {
  try { await adminService.deleteBus(id); return id; } catch (e) { return rejectWithValue(e.response?.data?.message || 'Failed to delete bus'); }
});

export const loadSchedules = createAsyncThunk('bus/loadSchedules', async (_, { rejectWithValue }) => {
  try { return (await adminService.fetchAllSchedules()).data; } catch (e) { return rejectWithValue(e.response?.data?.message || 'Failed to load schedules'); }
});

export const addSchedule = createAsyncThunk('bus/addSchedule', async (data, { rejectWithValue }) => {
  try { return (await adminService.createSchedule(data)).data; } catch (e) { return rejectWithValue(e.response?.data?.message || 'Failed to create schedule'); }
});

export const editSchedule = createAsyncThunk('bus/editSchedule', async ({ id, data }, { rejectWithValue }) => {
  try { return (await adminService.updateSchedule(id, data)).data; } catch (e) { return rejectWithValue(e.response?.data?.message || 'Failed to update schedule'); }
});

export const removeSchedule = createAsyncThunk('bus/removeSchedule', async (id, { rejectWithValue }) => {
  try { await adminService.deleteSchedule(id); return id; } catch (e) { return rejectWithValue(e.response?.data?.message || 'Failed to delete schedule'); }
});

export const loadDashboard = createAsyncThunk('bus/loadDashboard', async (_, { rejectWithValue }) => {
  try { return (await adminService.fetchDashboard()).data; } catch (e) { return rejectWithValue(e.response?.data?.message || 'Failed to load dashboard'); }
});

const busSlice = createSlice({
  name: 'bus',
  initialState: { buses: [], schedules: [], dashboard: null, loading: false, error: null },
  reducers: { clearBusError: (state) => { state.error = null; } },
  extraReducers: (builder) => {
    builder
      .addCase(loadBuses.pending, (s) => { s.loading = true; s.error = null; })
      .addCase(loadBuses.fulfilled, (s, a) => { s.loading = false; s.buses = a.payload; })
      .addCase(loadBuses.rejected, (s, a) => { s.loading = false; s.error = a.payload; })
      .addCase(addBus.pending, (s) => { s.loading = true; s.error = null; })
      .addCase(addBus.fulfilled, (s, a) => { s.loading = false; s.buses.push(a.payload); })
      .addCase(addBus.rejected, (s, a) => { s.loading = false; s.error = a.payload; })
      .addCase(editBus.pending, (s) => { s.loading = true; s.error = null; })
      .addCase(editBus.fulfilled, (s, a) => { s.loading = false; s.buses = s.buses.map(b => b.id === a.payload.id ? a.payload : b); })
      .addCase(editBus.rejected, (s, a) => { s.loading = false; s.error = a.payload; })
      .addCase(removeBus.pending, (s) => { s.loading = true; s.error = null; })
      .addCase(removeBus.fulfilled, (s, a) => { s.loading = false; s.buses = s.buses.filter(b => b.id !== a.payload); })
      .addCase(removeBus.rejected, (s, a) => { s.loading = false; s.error = a.payload; })
      .addCase(loadSchedules.pending, (s) => { s.loading = true; s.error = null; })
      .addCase(loadSchedules.fulfilled, (s, a) => { s.loading = false; s.schedules = a.payload; })
      .addCase(loadSchedules.rejected, (s, a) => { s.loading = false; s.error = a.payload; })
      .addCase(addSchedule.pending, (s) => { s.loading = true; s.error = null; })
      .addCase(addSchedule.fulfilled, (s, a) => { s.loading = false; s.schedules.push(a.payload); })
      .addCase(addSchedule.rejected, (s, a) => { s.loading = false; s.error = a.payload; })
      .addCase(editSchedule.pending, (s) => { s.loading = true; s.error = null; })
      .addCase(editSchedule.fulfilled, (s, a) => { s.loading = false; s.schedules = s.schedules.map(sc => sc.id === a.payload.id ? a.payload : sc); })
      .addCase(editSchedule.rejected, (s, a) => { s.loading = false; s.error = a.payload; })
      .addCase(removeSchedule.pending, (s) => { s.loading = true; s.error = null; })
      .addCase(removeSchedule.fulfilled, (s, a) => { s.loading = false; s.schedules = s.schedules.filter(sc => sc.id !== a.payload); })
      .addCase(removeSchedule.rejected, (s, a) => { s.loading = false; s.error = a.payload; })
      .addCase(loadDashboard.pending, (s) => { s.loading = true; s.error = null; })
      .addCase(loadDashboard.fulfilled, (s, a) => { s.loading = false; s.dashboard = a.payload; })
      .addCase(loadDashboard.rejected, (s, a) => { s.loading = false; s.error = a.payload; });
  },
});

export const { clearBusError } = busSlice.actions;
export default busSlice.reducer;
