import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import { fetchBooking, cancelBooking } from '../../store/slices/bookingSlice';

const containerStyle = { maxWidth: '600px', margin: '40px auto', padding: '0 20px' };
const cardStyle = { background: '#fff', borderRadius: '12px', padding: '24px', boxShadow: '0 4px 20px rgba(0,0,0,0.08)' };
const rowStyle = { display: 'flex', justifyContent: 'space-between', padding: '10px 0', borderBottom: '1px solid #f3f4f6' };
const labelStyle = { color: '#6b7280', fontSize: '14px' };
const valueStyle = { fontWeight: '600', fontSize: '14px', color: '#1f2937' };
const badgeStyle = (status) => ({ padding: '4px 12px', borderRadius: '20px', fontSize: '12px', fontWeight: '700', background: status === 'CONFIRMED' ? '#dcfce7' : status === 'CANCELLED' ? '#fef2f2' : '#fef9c3', color: status === 'CONFIRMED' ? '#16a34a' : status === 'CANCELLED' ? '#dc2626' : '#ca8a04' });
const btnStyle = { padding: '10px 20px', borderRadius: '8px', border: 'none', fontSize: '14px', fontWeight: '600', cursor: 'pointer' };

export default function BookingDetail() {
  const { bookingId } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { currentBooking: b, loading, error } = useSelector((state) => state.booking);

  useEffect(() => { dispatch(fetchBooking(bookingId)); }, [dispatch, bookingId]);

  if (loading) return <div style={{ textAlign: 'center', padding: '60px', color: '#6b7280' }}>Loading...</div>;
  if (error) return <div style={{ textAlign: 'center', padding: '60px', color: '#dc2626' }}>{error}</div>;
  if (!b) return <div style={{ textAlign: 'center', padding: '60px', color: '#6b7280' }}>Booking not found</div>;

  return (
    <div style={containerStyle}>
      <div style={cardStyle}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
          <h2 style={{ margin: 0, color: '#dc2626', fontSize: '22px' }}>Booking #{b.bookingId}</h2>
          <span style={badgeStyle(b.bookingStatus)}>{b.bookingStatus}</span>
        </div>
        <div style={rowStyle}><span style={labelStyle}>Schedule ID</span><span style={valueStyle}>#{b.scheduleId}</span></div>
        <div style={rowStyle}><span style={labelStyle}>Total Amount</span><span style={{ ...valueStyle, color: '#dc2626' }}>₹{b.totalAmount}</span></div>
        <div style={rowStyle}><span style={labelStyle}>Seats</span><span style={valueStyle}>{b.seatIds?.join(', ') || 'N/A'}</span></div>
        <div style={rowStyle}><span style={labelStyle}>Payment Status</span><span style={badgeStyle(b.paymentStatus || 'PENDING')}>{b.paymentStatus || 'PENDING'}</span></div>
        <div style={{ ...rowStyle, borderBottom: 'none' }}><span style={labelStyle}>Booked At</span><span style={valueStyle}>{b.createdAt ? new Date(b.createdAt).toLocaleString() : 'N/A'}</span></div>

        {b.passengers && b.passengers.length > 0 && (
          <div style={{ marginTop: '20px' }}>
            <h3 style={{ fontSize: '16px', color: '#1f2937', marginBottom: '12px' }}>Passengers</h3>
            {b.passengers.map((p, i) => (
              <div key={i} style={{ background: '#f9fafb', padding: '10px 14px', borderRadius: '8px', marginBottom: '8px', display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ fontWeight: '600', fontSize: '14px' }}>{p.name}</span>
                <span style={{ color: '#6b7280', fontSize: '13px' }}>Age: {p.age} | {p.gender || 'N/A'}</span>
              </div>
            ))}
          </div>
        )}

        <div style={{ display: 'flex', gap: '10px', marginTop: '24px' }}>
          <button style={{ ...btnStyle, background: '#f3f4f6', color: '#374151' }} onClick={() => navigate('/booking')}>Back</button>
          {b.bookingStatus === 'PENDING' && <button style={{ ...btnStyle, background: '#dc2626', color: '#fff' }} onClick={() => navigate(`/payment?bookingId=${b.bookingId}&paymentId=${b.paymentId}`)}>Pay Now</button>}
          {b.bookingStatus !== 'CANCELLED' && <button style={{ ...btnStyle, background: '#fef2f2', color: '#dc2626' }} onClick={() => dispatch(cancelBooking(b.bookingId))}>Cancel Booking</button>}
        </div>
      </div>
    </div>
  );
}
