import { useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchSeatLayout, fetchScheduleDetail, clearSelectedSeats } from '../store/slices/seatSlice';
import SeatLayout from '../components/seat/SeatLayout';
import SeatSelector from '../components/seat/SeatSelector';

export default function SeatPage() {
  const { scheduleId } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { scheduleDetail, loading } = useSelector((state) => state.seat);

  useEffect(() => {
    dispatch(clearSelectedSeats());
    dispatch(fetchScheduleDetail(scheduleId));
    dispatch(fetchSeatLayout(scheduleId));
  }, [scheduleId, dispatch]);

  if (loading && !scheduleDetail) return <div className="search-page"><div className="page-content"><p className="loading-text">Loading seat map...</p></div></div>;

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
        <div className="seat-header">
          <button className="btn-outline" onClick={() => navigate('/search')}>Back to Search</button>
          <h1 className="page-title">Select Seats</h1>
        </div>
        {scheduleDetail && (
          <div className="schedule-info-card">
            <div className="info-item"><span className="info-label">Bus</span><span className="info-value">{scheduleDetail.busName}</span></div>
            <div className="info-item"><span className="info-label">Route</span><span className="info-value">{scheduleDetail.source} → {scheduleDetail.destination}</span></div>
            <div className="info-item"><span className="info-label">Time</span><span className="info-value">{scheduleDetail.startTime} — {scheduleDetail.endTime}</span></div>
            <div className="info-item"><span className="info-label">Date</span><span className="info-value">{scheduleDetail.journeyDate}</span></div>
            <div className="info-item"><span className="info-label">Available</span><span className="info-value info-highlight">{scheduleDetail.availableSeats} / {scheduleDetail.totalSeats}</span></div>
          </div>
        )}
        <div className="seat-grid">
          <SeatLayout />
          <SeatSelector scheduleId={scheduleId} />
        </div>
      </div>
    </div>
  );
}
