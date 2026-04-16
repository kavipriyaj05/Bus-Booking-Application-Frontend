import api from './api';

const busService = {
  searchBuses: (source, destination, date) => api.get('/api/buses/search', { params: { source, destination, date } }),
  getBusById: (busId) => api.get(`/api/buses/${busId}`),
  getScheduleById: (scheduleId) => api.get(`/api/schedules/${scheduleId}`),
  getSeatLayout: (scheduleId) => api.get(`/api/schedules/${scheduleId}/seats`),
  lockSeats: (scheduleId, seatIds) => api.post('/api/seats/lock', { scheduleId, seatIds }),
  releaseSeats: (lockToken) => api.post('/api/seats/release', { lockToken }),
};

export default busService;
