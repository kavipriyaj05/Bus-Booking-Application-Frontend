import PaymentForm from '../components/payment/PaymentForm';
import PaymentStatus from '../components/payment/PaymentStatus';
import { useLocation, useSearchParams, Link } from 'react-router-dom';

export default function PaymentPage() {
  const location = useLocation();
  const [searchParams] = useSearchParams();
  const isSuccess = location.pathname === '/payment/success';
  const isStatus = isSuccess || searchParams.has('paymentId') || searchParams.has('transactionId');

  return (
    <div className="search-page">
      <nav className="page-nav">
        <Link to="/" className="page-nav-brand">NextStop</Link>
        <div className="page-nav-links">
          <Link to="/search" className="page-nav-link">Search</Link>
          <Link to="/bookings" className="page-nav-link">My Bookings</Link>
        </div>
      </nav>
      <div className="page-content">
        {isStatus ? <PaymentStatus /> : <PaymentForm />}
      </div>
    </div>
  );
}
