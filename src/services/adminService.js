import api from './api';

export const fetchAllBuses = () => api.get('/admin/buses');
export const fetchBusById = (id) => api.get(`/admin/buses/${id}`);
export const createBus = (data) => api.post('/admin/buses', data);
export const updateBus = (id, data) => api.put(`/admin/buses/${id}`, data);
export const deleteBus = (id) => api.delete(`/admin/buses/${id}`);
export const fetchAllSchedules = () => api.get('/admin/schedules');
export const fetchSchedulesByBus = (busId) => api.get(`/admin/schedules/bus/${busId}`);
export const createSchedule = (data) => api.post('/admin/schedules', data);
export const updateSchedule = (id, data) => api.put(`/admin/schedules/${id}`, data);
export const deleteSchedule = (id) => api.delete(`/admin/schedules/${id}`);
export const fetchDashboard = () => api.get('/admin/dashboard');
