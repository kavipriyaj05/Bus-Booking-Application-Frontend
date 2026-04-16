import api from './api';

const busService = {
  searchBuses: (source, destination, date) => api.get('/buses/search', { params: { source, destination, date } }),
  getBusById: (busId) => api.get(`/buses/${busId}`),
  getScheduleById: (scheduleId) => api.get(`/schedules/${scheduleId}`),
  getSeatLayout: (scheduleId) => api.get(`/schedules/${scheduleId}/seats`),
  lockSeats: (scheduleId, seatIds) => api.post('/seats/lock', { scheduleId, seatIds }),
  releaseSeats: (lockToken) => api.post('/seats/release', { lockToken }),
};

export default busService;
