import api from './api';

const paymentService = {
  initiatePayment: (data) => api.post('/api/payments', data),
  getPayment: (paymentId) => api.get(`/api/payments/${paymentId}`),
  handleWebhook: (data) => api.post('/api/payments/webhook', data),
};

export default paymentService;
