import BookingForm from '../components/booking/BookingForm';
import BookingHistory from '../components/booking/BookingHistory';
import { useParams, useSearchParams, Link } from 'react-router-dom';

export default function BookingPage() {
  const { scheduleId } = useParams();
  const [searchParams] = useSearchParams();
  const hasSchedule = scheduleId || searchParams.get('scheduleId');

  return (
    <div className="search-page">
      <nav className="page-nav">
        <Link to="/" className="page-nav-brand">NextStop</Link>
        <div className="page-nav-links">
          <Link to="/search" className="page-nav-link">Search</Link>
          <Link to="/bookings" className="page-nav-link active">My Bookings</Link>
        </div>
      </nav>
      <div className="page-content">
        {hasSchedule ? <BookingForm /> : <BookingHistory />}
      </div>
    </div>
  );
}
