import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { fetchPayment, processWebhook } from '../../store/slices/paymentSlice';

const containerStyle = { maxWidth: '500px', margin: '40px auto', padding: '0 20px' };
const cardStyle = { background: '#fff', borderRadius: '12px', padding: '30px', boxShadow: '0 4px 20px rgba(0,0,0,0.08)', textAlign: 'center' };
const btnStyle = { padding: '10px 24px', borderRadius: '8px', border: 'none', fontSize: '14px', fontWeight: '600', cursor: 'pointer', marginTop: '16px' };

export default function PaymentStatus() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const paymentId = searchParams.get('paymentId');
  const transactionId = searchParams.get('transactionId');
  const { currentPayment: p, loading, error } = useSelector((state) => state.payment);
  const [simulated, setSimulated] = useState(false);

  useEffect(() => { if (paymentId) dispatch(fetchPayment(paymentId)); }, [dispatch, paymentId]);

  const simulatePayment = async (status) => {
    await dispatch(processWebhook({ transactionId: transactionId || p?.transactionId, status }));
    setSimulated(true);
    if (paymentId) dispatch(fetchPayment(paymentId));
  };

  if (loading) return <div style={{ textAlign: 'center', padding: '60px', color: '#6b7280' }}>Loading...</div>;
  if (error) return <div style={{ textAlign: 'center', padding: '60px', color: '#dc2626' }}>⚠ {error}</div>;

  const status = p?.paymentStatus || 'PENDING';
  const icon = status === 'SUCCESS' ? '✅' : status === 'FAILED' ? '❌' : '⏳';
  const color = status === 'SUCCESS' ? '#16a34a' : status === 'FAILED' ? '#dc2626' : '#ca8a04';

  return (
    <div style={containerStyle}>
      <div style={cardStyle}>
        <div style={{ fontSize: '64px', marginBottom: '12px' }}>{icon}</div>
        <h2 style={{ margin: '0 0 6px', color, fontSize: '24px' }}>Payment {status}</h2>
        <p style={{ color: '#6b7280', fontSize: '14px', margin: '0 0 20px' }}>Transaction: {p?.transactionId || transactionId || 'N/A'}</p>
        {p && (
          <div style={{ background: '#f9fafb', borderRadius: '8px', padding: '16px', textAlign: 'left', marginBottom: '20px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', padding: '6px 0', borderBottom: '1px solid #e5e7eb' }}><span style={{ color: '#6b7280', fontSize: '13px' }}>Booking ID</span><span style={{ fontWeight: '600', fontSize: '13px' }}>#{p.bookingId}</span></div>
            <div style={{ display: 'flex', justifyContent: 'space-between', padding: '6px 0', borderBottom: '1px solid #e5e7eb' }}><span style={{ color: '#6b7280', fontSize: '13px' }}>Method</span><span style={{ fontWeight: '600', fontSize: '13px' }}>{p.paymentMethod || 'N/A'}</span></div>
            <div style={{ display: 'flex', justifyContent: 'space-between', padding: '6px 0' }}><span style={{ color: '#6b7280', fontSize: '13px' }}>Amount</span><span style={{ fontWeight: '700', fontSize: '14px', color: '#dc2626' }}>₹{p.amount}</span></div>
          </div>
        )}
        {!simulated && status === 'PENDING' && (
          <div>
            <p style={{ color: '#6b7280', fontSize: '13px', marginBottom: '12px' }}>Simulate payment result:</p>
            <div style={{ display: 'flex', gap: '10px', justifyContent: 'center' }}>
              <button style={{ ...btnStyle, background: '#16a34a', color: '#fff', marginTop: 0 }} onClick={() => simulatePayment('SUCCESS')}>✓ Simulate Success</button>
              <button style={{ ...btnStyle, background: '#dc2626', color: '#fff', marginTop: 0 }} onClick={() => simulatePayment('FAILED')}>✗ Simulate Failure</button>
            </div>
          </div>
        )}
        <div style={{ display: 'flex', gap: '10px', justifyContent: 'center', marginTop: '20px' }}>
          <button style={{ ...btnStyle, background: '#f3f4f6', color: '#374151' }} onClick={() => navigate('/booking')}>My Bookings</button>
          <button style={{ ...btnStyle, background: '#dc2626', color: '#fff' }} onClick={() => navigate('/')}>Home</button>
        </div>
      </div>
    </div>
  );
}
