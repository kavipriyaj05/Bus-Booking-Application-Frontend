import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { initiatePayment } from '../../store/slices/paymentSlice';

const formStyle = { maxWidth: '500px', margin: '40px auto', padding: '30px', background: '#fff', borderRadius: '12px', boxShadow: '0 4px 20px rgba(0,0,0,0.08)' };
const inputStyle = { width: '100%', padding: '10px 14px', border: '1px solid #e5e7eb', borderRadius: '8px', fontSize: '14px', boxSizing: 'border-box' };
const btnStyle = { width: '100%', padding: '12px', background: '#dc2626', color: '#fff', border: 'none', borderRadius: '8px', fontSize: '16px', fontWeight: '600', cursor: 'pointer', marginTop: '20px' };
const radioStyle = { display: 'flex', gap: '12px', flexWrap: 'wrap' };
const radioCard = (selected) => ({ flex: '1', minWidth: '120px', padding: '14px', borderRadius: '10px', border: selected ? '2px solid #dc2626' : '2px solid #e5e7eb', background: selected ? '#fef2f2' : '#fff', cursor: 'pointer', textAlign: 'center', transition: 'all 0.2s' });

export default function PaymentForm() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const bookingId = searchParams.get('bookingId');
  const { loading, error } = useSelector((state) => state.payment);
  const [paymentMethod, setPaymentMethod] = useState('UPI');

  const methods = [{ id: 'UPI', icon: '📱', label: 'UPI' }, { id: 'CREDIT_CARD', icon: '💳', label: 'Credit Card' }, { id: 'DEBIT_CARD', icon: '🏧', label: 'Debit Card' }, { id: 'NET_BANKING', icon: '🏦', label: 'Net Banking' }];

  const handleSubmit = async (e) => {
    e.preventDefault();
    const result = await dispatch(initiatePayment({ bookingId: Number(bookingId), paymentMethod }));
    if (result.meta.requestStatus === 'fulfilled') navigate(`/payment/status?paymentId=${result.payload.paymentId}&transactionId=${result.payload.transactionId}`);
  };

  return (
    <form onSubmit={handleSubmit} style={formStyle}>
      <h2 style={{ margin: '0 0 6px', color: '#dc2626', fontSize: '22px' }}>💳 Payment</h2>
      <p style={{ color: '#6b7280', fontSize: '14px', margin: '0 0 24px' }}>Booking #{bookingId}</p>
      {error && <div style={{ background: '#fef2f2', color: '#dc2626', padding: '10px 14px', borderRadius: '8px', marginBottom: '16px', fontSize: '13px' }}>⚠ {error}</div>}
      <label style={{ display: 'block', fontSize: '13px', fontWeight: '600', color: '#374151', marginBottom: '10px' }}>Select Payment Method</label>
      <div style={radioStyle}>
        {methods.map((m) => (
          <div key={m.id} style={radioCard(paymentMethod === m.id)} onClick={() => setPaymentMethod(m.id)}>
            <div style={{ fontSize: '24px', marginBottom: '4px' }}>{m.icon}</div>
            <div style={{ fontSize: '13px', fontWeight: '600', color: paymentMethod === m.id ? '#dc2626' : '#374151' }}>{m.label}</div>
          </div>
        ))}
      </div>
      <button type="submit" style={{ ...btnStyle, opacity: loading ? 0.7 : 1 }} disabled={loading}>{loading ? 'Processing...' : 'Pay Now →'}</button>
    </form>
  );
}
