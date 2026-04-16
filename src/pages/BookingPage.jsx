import BookingForm from '../components/booking/BookingForm';
import BookingHistory from '../components/booking/BookingHistory';
import BookingDetail from '../components/booking/BookingDetail';
import { useParams } from 'react-router-dom';

const pageStyle = { minHeight: '100vh', background: '#f9fafb', fontFamily: "'Inter', 'Segoe UI', sans-serif" };
const navStyle = { background: '#dc2626', padding: '14px 24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' };
const logoStyle = { color: '#fff', fontSize: '18px', fontWeight: '700', textDecoration: 'none' };
const linkStyle = { color: 'rgba(255,255,255,0.85)', fontSize: '13px', textDecoration: 'none', marginLeft: '16px' };

export default function BookingPage() {
  const { bookingId } = useParams();

  return (
    <div style={pageStyle}>
      <nav style={navStyle}>
        <a href="/" style={logoStyle}>🚌 BusBooking</a>
        <div>
          <a href="/search" style={linkStyle}>Search</a>
          <a href="/booking" style={linkStyle}>My Bookings</a>
        </div>
      </nav>
      {bookingId ? <BookingDetail /> : window.location.search.includes('new') ? <BookingForm /> : <BookingHistory />}
    </div>
  );
}
