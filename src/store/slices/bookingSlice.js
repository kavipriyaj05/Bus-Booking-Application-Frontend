import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import bookingService from '../../services/bookingService';

export const createBooking = createAsyncThunk('booking/create', async (data, { rejectWithValue }) => {
  try { return (await bookingService.createBooking(data)).data; } catch (e) { return rejectWithValue(e.response?.data?.message || 'Booking failed'); }
});

export const fetchBooking = createAsyncThunk('booking/fetch', async (bookingId, { rejectWithValue }) => {
  try { return (await bookingService.getBooking(bookingId)).data; } catch (e) { return rejectWithValue(e.response?.data?.message || 'Failed to fetch booking'); }
});

export const cancelBooking = createAsyncThunk('booking/cancel', async (bookingId, { rejectWithValue }) => {
  try { return (await bookingService.cancelBooking(bookingId)).data; } catch (e) { return rejectWithValue(e.response?.data?.message || 'Cancel failed'); }
});

export const fetchBookingHistory = createAsyncThunk('booking/history', async (_, { rejectWithValue }) => {
  try { return (await bookingService.getBookingHistory()).data; } catch (e) { return rejectWithValue(e.response?.data?.message || 'Failed to fetch history'); }
});

const bookingSlice = createSlice({
  name: 'booking',
  initialState: { currentBooking: null, bookings: [], loading: false, error: null },
  reducers: { clearBookingError: (state) => { state.error = null; }, clearCurrentBooking: (state) => { state.currentBooking = null; } },
  extraReducers: (builder) => {
    builder
      .addCase(createBooking.pending, (s) => { s.loading = true; s.error = null; })
      .addCase(createBooking.fulfilled, (s, a) => { s.loading = false; s.currentBooking = a.payload; })
      .addCase(createBooking.rejected, (s, a) => { s.loading = false; s.error = a.payload; })
      .addCase(fetchBooking.pending, (s) => { s.loading = true; s.error = null; })
      .addCase(fetchBooking.fulfilled, (s, a) => { s.loading = false; s.currentBooking = a.payload; })
      .addCase(fetchBooking.rejected, (s, a) => { s.loading = false; s.error = a.payload; })
      .addCase(cancelBooking.pending, (s) => { s.loading = true; s.error = null; })
      .addCase(cancelBooking.fulfilled, (s, a) => { s.loading = false; s.currentBooking = a.payload; })
      .addCase(cancelBooking.rejected, (s, a) => { s.loading = false; s.error = a.payload; })
      .addCase(fetchBookingHistory.pending, (s) => { s.loading = true; s.error = null; })
      .addCase(fetchBookingHistory.fulfilled, (s, a) => { s.loading = false; s.bookings = a.payload; })
      .addCase(fetchBookingHistory.rejected, (s, a) => { s.loading = false; s.error = a.payload; });
  },
});

export const { clearBookingError, clearCurrentBooking } = bookingSlice.actions;
export default bookingSlice.reducer;
