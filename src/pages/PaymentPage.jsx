import PaymentForm from '../components/payment/PaymentForm';
import PaymentStatus from '../components/payment/PaymentStatus';
import { useSearchParams } from 'react-router-dom';

const pageStyle = { minHeight: '100vh', background: '#f9fafb', fontFamily: "'Inter', 'Segoe UI', sans-serif" };
const navStyle = { background: '#dc2626', padding: '14px 24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' };
const logoStyle = { color: '#fff', fontSize: '18px', fontWeight: '700', textDecoration: 'none' };
const linkStyle = { color: 'rgba(255,255,255,0.85)', fontSize: '13px', textDecoration: 'none', marginLeft: '16px' };

export default function PaymentPage() {
  const [searchParams] = useSearchParams();
  const isStatus = searchParams.has('paymentId') && !searchParams.has('bookingId');

  return (
    <div style={pageStyle}>
      <nav style={navStyle}>
        <a href="/" style={logoStyle}>🚌 BusBooking</a>
        <div>
          <a href="/search" style={linkStyle}>Search</a>
          <a href="/booking" style={linkStyle}>My Bookings</a>
        </div>
      </nav>
      {isStatus ? <PaymentStatus /> : searchParams.has('transactionId') ? <PaymentStatus /> : <PaymentForm />}
    </div>
  );
}
