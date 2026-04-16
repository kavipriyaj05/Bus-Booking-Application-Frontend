import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchBookingHistory, cancelBooking } from '../../store/slices/bookingSlice';
import { useNavigate } from 'react-router-dom';

const containerStyle = { maxWidth: '800px', margin: '40px auto', padding: '0 20px' };
const cardStyle = { background: '#fff', borderRadius: '12px', padding: '20px', marginBottom: '16px', boxShadow: '0 2px 12px rgba(0,0,0,0.06)', border: '1px solid #f3f4f6' };
const badgeStyle = (status) => ({ padding: '4px 12px', borderRadius: '20px', fontSize: '12px', fontWeight: '700', background: status === 'CONFIRMED' ? '#dcfce7' : status === 'CANCELLED' ? '#fef2f2' : '#fef9c3', color: status === 'CONFIRMED' ? '#16a34a' : status === 'CANCELLED' ? '#dc2626' : '#ca8a04' });
const btnStyle = { padding: '6px 16px', borderRadius: '6px', border: 'none', fontSize: '13px', fontWeight: '600', cursor: 'pointer' };

export default function BookingHistory() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { bookings, loading, error } = useSelector((state) => state.booking);

  useEffect(() => { dispatch(fetchBookingHistory()); }, [dispatch]);

  if (loading) return <div style={{ textAlign: 'center', padding: '60px', color: '#6b7280' }}>Loading bookings...</div>;
  if (error) return <div style={{ textAlign: 'center', padding: '60px', color: '#dc2626' }}>⚠ {error}</div>;

  return (
    <div style={containerStyle}>
      <h2 style={{ color: '#dc2626', marginBottom: '24px', fontSize: '24px' }}>📋 My Bookings</h2>
      {bookings.length === 0 ? (
        <div style={{ ...cardStyle, textAlign: 'center', padding: '60px' }}>
          <div style={{ fontSize: '48px', marginBottom: '12px' }}>🎫</div>
          <p style={{ color: '#6b7280', margin: 0 }}>No bookings yet. Search for a bus to get started!</p>
        </div>
      ) : bookings.map((b) => (
        <div key={b.bookingId} style={cardStyle}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
            <h3 style={{ margin: 0, fontSize: '16px', color: '#1f2937' }}>Booking #{b.bookingId}</h3>
            <span style={badgeStyle(b.bookingStatus)}>{b.bookingStatus}</span>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '12px', marginBottom: '14px' }}>
            <div><span style={{ fontSize: '12px', color: '#9ca3af' }}>Schedule</span><div style={{ fontWeight: '600', fontSize: '14px' }}>#{b.scheduleId}</div></div>
            <div><span style={{ fontSize: '12px', color: '#9ca3af' }}>Seats</span><div style={{ fontWeight: '600', fontSize: '14px' }}>{b.seatIds?.length || 0}</div></div>
            <div><span style={{ fontSize: '12px', color: '#9ca3af' }}>Amount</span><div style={{ fontWeight: '700', fontSize: '14px', color: '#dc2626' }}>₹{b.totalAmount}</div></div>
          </div>
          <div style={{ display: 'flex', gap: '8px' }}>
            <button style={{ ...btnStyle, background: '#f3f4f6', color: '#374151' }} onClick={() => navigate(`/booking/${b.bookingId}`)}>View Details</button>
            {b.bookingStatus === 'PENDING' && <button style={{ ...btnStyle, background: '#dc2626', color: '#fff' }} onClick={() => navigate(`/payment?bookingId=${b.bookingId}&paymentId=${b.paymentId}`)}>Pay Now</button>}
            {b.bookingStatus !== 'CANCELLED' && <button style={{ ...btnStyle, background: '#fef2f2', color: '#dc2626' }} onClick={() => dispatch(cancelBooking(b.bookingId))}>Cancel</button>}
          </div>
        </div>
      ))}
    </div>
  );
}
