import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import busService from '../../services/busService';

export const searchBuses = createAsyncThunk('seat/searchBuses', async ({ source, destination, date }, { rejectWithValue }) => {
  try { const res = await busService.searchBuses(source, destination, date); return res.data; }
  catch (err) { return rejectWithValue(err.response?.data?.message || 'Search failed'); }
});

export const fetchBusDetail = createAsyncThunk('seat/fetchBusDetail', async (busId, { rejectWithValue }) => {
  try { const res = await busService.getBusById(busId); return res.data; }
  catch (err) { return rejectWithValue(err.response?.data?.message || 'Failed to fetch bus'); }
});

export const fetchScheduleDetail = createAsyncThunk('seat/fetchScheduleDetail', async (scheduleId, { rejectWithValue }) => {
  try { const res = await busService.getScheduleById(scheduleId); return res.data; }
  catch (err) { return rejectWithValue(err.response?.data?.message || 'Failed to fetch schedule'); }
});

export const fetchSeatLayout = createAsyncThunk('seat/fetchSeatLayout', async (scheduleId, { rejectWithValue }) => {
  try { const res = await busService.getSeatLayout(scheduleId); return res.data; }
  catch (err) { return rejectWithValue(err.response?.data?.message || 'Failed to fetch seats'); }
});

export const lockSeats = createAsyncThunk('seat/lockSeats', async ({ scheduleId, seatIds }, { rejectWithValue }) => {
  try { const res = await busService.lockSeats(scheduleId, seatIds); return res.data; }
  catch (err) { return rejectWithValue(err.response?.data?.message || 'Failed to lock seats'); }
});

export const releaseSeats = createAsyncThunk('seat/releaseSeats', async (lockToken, { rejectWithValue }) => {
  try { await busService.releaseSeats(lockToken); return lockToken; }
  catch (err) { return rejectWithValue(err.response?.data?.message || 'Failed to release seats'); }
});

const seatSlice = createSlice({
  name: 'seat',
  initialState: {
    searchResults: [],
    busDetail: null,
    scheduleDetail: null,
    seatLayout: [],
    selectedSeats: [],
    lockToken: null,
    lockExpiresAt: null,
    loading: false,
    error: null,
  },
  reducers: {
    toggleSeatSelection: (state, action) => {
      const seatId = action.payload;
      state.selectedSeats = state.selectedSeats.includes(seatId) ? state.selectedSeats.filter(id => id !== seatId) : [...state.selectedSeats, seatId];
    },
    clearSelectedSeats: (state) => { state.selectedSeats = []; state.lockToken = null; state.lockExpiresAt = null; },
    clearSearchResults: (state) => { state.searchResults = []; },
    clearError: (state) => { state.error = null; },
  },
  extraReducers: (builder) => {
    builder
      .addCase(searchBuses.pending, (s) => { s.loading = true; s.error = null; })
      .addCase(searchBuses.fulfilled, (s, a) => { s.loading = false; s.searchResults = a.payload; })
      .addCase(searchBuses.rejected, (s, a) => { s.loading = false; s.error = a.payload; })
      .addCase(fetchBusDetail.pending, (s) => { s.loading = true; s.error = null; })
      .addCase(fetchBusDetail.fulfilled, (s, a) => { s.loading = false; s.busDetail = a.payload; })
      .addCase(fetchBusDetail.rejected, (s, a) => { s.loading = false; s.error = a.payload; })
      .addCase(fetchScheduleDetail.pending, (s) => { s.loading = true; s.error = null; })
      .addCase(fetchScheduleDetail.fulfilled, (s, a) => { s.loading = false; s.scheduleDetail = a.payload; })
      .addCase(fetchScheduleDetail.rejected, (s, a) => { s.loading = false; s.error = a.payload; })
      .addCase(fetchSeatLayout.pending, (s) => { s.loading = true; s.error = null; })
      .addCase(fetchSeatLayout.fulfilled, (s, a) => { s.loading = false; s.seatLayout = a.payload; })
      .addCase(fetchSeatLayout.rejected, (s, a) => { s.loading = false; s.error = a.payload; })
      .addCase(lockSeats.pending, (s) => { s.loading = true; s.error = null; })
      .addCase(lockSeats.fulfilled, (s, a) => { s.loading = false; s.lockToken = a.payload.lockToken; s.lockExpiresAt = a.payload.expiresAt; })
      .addCase(lockSeats.rejected, (s, a) => { s.loading = false; s.error = a.payload; })
      .addCase(releaseSeats.pending, (s) => { s.loading = true; })
      .addCase(releaseSeats.fulfilled, (s) => { s.loading = false; s.lockToken = null; s.lockExpiresAt = null; s.selectedSeats = []; })
      .addCase(releaseSeats.rejected, (s, a) => { s.loading = false; s.error = a.payload; });
  },
});

export const { toggleSeatSelection, clearSelectedSeats, clearSearchResults, clearError } = seatSlice.actions;
export default seatSlice.reducer;
