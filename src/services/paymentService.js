import api from './api';

const paymentService = {
  initiatePayment: (data) => api.post('/payments', data),
  getPayment: (paymentId) => api.get(`/payments/${paymentId}`),
  handleWebhook: (data) => api.post('/payments/webhook', data),
};

export default paymentService;
