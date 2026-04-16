import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import busReducer from './slices/busSlice';
import seatReducer from './slices/seatSlice';
import bookingReducer from './slices/bookingSlice';
import paymentReducer from './slices/paymentSlice';

const store = configureStore({
  reducer: {
    auth: authReducer,
    bus: busReducer,
    seat: seatReducer,
    booking: bookingReducer,
    payment: paymentReducer,
  }
});

export default store;
