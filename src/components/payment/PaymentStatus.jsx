import { useSearchParams, useNavigate } from 'react-router-dom';

const containerStyle = { maxWidth: '500px', margin: '60px auto', padding: '0 20px' };
const cardStyle = { background: '#fff', borderRadius: '16px', padding: '40px 30px', boxShadow: '0 4px 24px rgba(0,0,0,0.08)', textAlign: 'center' };
const btnStyle = { padding: '10px 24px', borderRadius: '8px', border: 'none', fontSize: '14px', fontWeight: '600', cursor: 'pointer' };

export default function PaymentStatus() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const bookingId = searchParams.get('bookingId');
  const amount = searchParams.get('amount');
  const status = searchParams.get('status') || 'SUCCESS';
  const seats = searchParams.get('seats');

  const isSuccess = status === 'SUCCESS';

  return (
    <div style={containerStyle}>
      <div style={cardStyle}>
        {/* Success Icon */}
        <div style={{ width: '80px', height: '80px', borderRadius: '50%', background: isSuccess ? '#dcfce7' : '#fef2f2', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 20px' }}>
          <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke={isSuccess ? '#16a34a' : '#dc2626'} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            {isSuccess ? <polyline points="20 6 9 17 4 12" /> : <><line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" /></>}
          </svg>
        </div>

        <h2 style={{ margin: '0 0 4px', color: isSuccess ? '#16a34a' : '#dc2626', fontSize: '26px', fontWeight: '700' }}>
          {isSuccess ? 'Payment Successful' : 'Payment Failed'}
        </h2>
        <p style={{ color: '#6b7280', fontSize: '14px', margin: '0 0 24px' }}>
          {isSuccess ? 'Your booking has been confirmed!' : 'Something went wrong with your payment.'}
        </p>

        <div style={{ background: '#f9fafb', borderRadius: '10px', padding: '18px', textAlign: 'left', marginBottom: '24px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 0', borderBottom: '1px solid #e5e7eb' }}>
            <span style={{ color: '#6b7280', fontSize: '13px' }}>Booking ID</span>
            <span style={{ fontWeight: '700', fontSize: '13px', color: '#1f2937' }}>#{bookingId}</span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 0', borderBottom: '1px solid #e5e7eb' }}>
            <span style={{ color: '#6b7280', fontSize: '13px' }}>Status</span>
            <span style={{ fontWeight: '600', fontSize: '13px', color: isSuccess ? '#16a34a' : '#dc2626' }}>{isSuccess ? 'CONFIRMED' : 'FAILED'}</span>
          </div>
          {seats && (
            <div style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 0', borderBottom: '1px solid #e5e7eb' }}>
              <span style={{ color: '#6b7280', fontSize: '13px' }}>Seats</span>
              <span style={{ fontWeight: '600', fontSize: '13px', color: '#374151' }}>{seats}</span>
            </div>
          )}
          <div style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 0' }}>
            <span style={{ color: '#6b7280', fontSize: '13px' }}>Amount Paid</span>
            <span style={{ fontWeight: '700', fontSize: '16px', color: '#16a34a' }}>₹{Number(amount || 0).toLocaleString()}</span>
          </div>
        </div>

        {isSuccess && (
          <div style={{ background: '#f0fdf4', border: '1px solid #bbf7d0', borderRadius: '8px', padding: '12px', marginBottom: '24px', fontSize: '13px', color: '#166534' }}>
            A confirmation email has been sent to your registered email address.
          </div>
        )}

        <div style={{ display: 'flex', gap: '10px', justifyContent: 'center' }}>
          <button style={{ ...btnStyle, background: '#f3f4f6', color: '#374151' }} onClick={() => navigate('/bookings')}>My Bookings</button>
          <button style={{ ...btnStyle, background: '#dc2626', color: '#fff' }} onClick={() => navigate('/search')}>Book Another</button>
        </div>
      </div>
    </div>
  );
}
