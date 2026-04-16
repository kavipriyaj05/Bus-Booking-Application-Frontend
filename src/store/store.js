import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';

const store = configureStore({
  reducer: {
    auth: authReducer,
    bus: (state = { buses: [], loading: false, error: null }) => state,
    seat: (state = { seats: [], lock: null, loading: false, error: null }) => state,
    booking: (state = { bookings: [], currentBooking: null, loading: false, error: null }) => state,
    payment: (state = { payments: [], currentPayment: null, loading: false, error: null }) => state,
  }
});

export default store;
