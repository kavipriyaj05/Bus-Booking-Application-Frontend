import api from './api';

const bookingService = {
  createBooking: (data) => api.post('/bookings', data),
  getBooking: (bookingId) => api.get(`/bookings/${bookingId}`),
  cancelBooking: (bookingId) => api.post(`/bookings/${bookingId}/cancel`),
  getBookingHistory: () => api.get('/bookings/history'),
};

export default bookingService;
