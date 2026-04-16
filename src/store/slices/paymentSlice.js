import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import paymentService from '../../services/paymentService';

export const initiatePayment = createAsyncThunk('payment/initiate', async (data, { rejectWithValue }) => {
  try { return (await paymentService.initiatePayment(data)).data; } catch (e) { return rejectWithValue(e.response?.data?.message || 'Payment initiation failed'); }
});

export const fetchPayment = createAsyncThunk('payment/fetch', async (paymentId, { rejectWithValue }) => {
  try { return (await paymentService.getPayment(paymentId)).data; } catch (e) { return rejectWithValue(e.response?.data?.message || 'Failed to fetch payment'); }
});

export const processWebhook = createAsyncThunk('payment/webhook', async (data, { rejectWithValue }) => {
  try { return (await paymentService.handleWebhook(data)).data; } catch (e) { return rejectWithValue(e.response?.data?.message || 'Webhook processing failed'); }
});

const paymentSlice = createSlice({
  name: 'payment',
  initialState: { currentPayment: null, loading: false, error: null },
  reducers: { clearPaymentError: (state) => { state.error = null; }, clearCurrentPayment: (state) => { state.currentPayment = null; } },
  extraReducers: (builder) => {
    builder
      .addCase(initiatePayment.pending, (s) => { s.loading = true; s.error = null; })
      .addCase(initiatePayment.fulfilled, (s, a) => { s.loading = false; s.currentPayment = a.payload; })
      .addCase(initiatePayment.rejected, (s, a) => { s.loading = false; s.error = a.payload; })
      .addCase(fetchPayment.pending, (s) => { s.loading = true; s.error = null; })
      .addCase(fetchPayment.fulfilled, (s, a) => { s.loading = false; s.currentPayment = a.payload; })
      .addCase(fetchPayment.rejected, (s, a) => { s.loading = false; s.error = a.payload; })
      .addCase(processWebhook.pending, (s) => { s.loading = true; s.error = null; })
      .addCase(processWebhook.fulfilled, (s, a) => { s.loading = false; s.currentPayment = a.payload; })
      .addCase(processWebhook.rejected, (s, a) => { s.loading = false; s.error = a.payload; });
  },
});

export const { clearPaymentError, clearCurrentPayment } = paymentSlice.actions;
export default paymentSlice.reducer;
