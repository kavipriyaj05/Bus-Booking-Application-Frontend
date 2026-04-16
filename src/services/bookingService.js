import api from './api';

const bookingService = {
  createBooking: (data) => api.post('/api/bookings', data),
  getBooking: (bookingId) => api.get(`/api/bookings/${bookingId}`),
  cancelBooking: (bookingId) => api.post(`/api/bookings/${bookingId}/cancel`),
  getBookingHistory: () => api.get('/api/bookings/history'),
};

export default bookingService;
