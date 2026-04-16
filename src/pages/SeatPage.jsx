import { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchSeatLayout, fetchScheduleDetail, clearSelectedSeats } from '../store/slices/seatSlice';
import SeatLayout from '../components/seat/SeatLayout';
import SeatSelector from '../components/seat/SeatSelector';

const styles = {
  page: { minHeight: '100vh', background: 'linear-gradient(135deg, #fff5f5 0%, #ffffff 50%, #fef2f2 100%)', padding: '32px 16px' },
  header: { maxWidth: '800px', margin: '0 auto 24px', display: 'flex', alignItems: 'center', gap: '16px' },
  backBtn: { padding: '8px 16px', background: '#fff', color: '#dc2626', border: '1.5px solid #dc2626', borderRadius: '8px', fontSize: '14px', fontWeight: '600', cursor: 'pointer', transition: 'all 0.2s' },
  title: { fontSize: '22px', fontWeight: '700', color: '#dc2626' },
  scheduleCard: { maxWidth: '800px', margin: '0 auto 24px', background: '#fff', borderRadius: '12px', padding: '20px 24px', boxShadow: '0 2px 16px rgba(220,38,38,0.08)', border: '1px solid #fee2e2', display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: '16px' },
  infoGroup: { display: 'flex', flexDirection: 'column', gap: '4px' },
  label: { fontSize: '12px', color: '#888', fontWeight: '600', textTransform: 'uppercase' },
  value: { fontSize: '16px', color: '#111', fontWeight: '600' },
  content: { maxWidth: '800px', margin: '0 auto', display: 'grid', gridTemplateColumns: '1fr', gap: '20px' },
  loading: { textAlign: 'center', padding: '60px', color: '#dc2626', fontSize: '16px' },
};

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

  if (loading && !scheduleDetail) return <div style={styles.page}><p style={styles.loading}>Loading seat map...</p></div>;

  return (
    <div style={styles.page}>
      <div style={styles.header}>
        <button style={styles.backBtn} onClick={() => navigate('/search')}>← Back</button>
        <h1 style={styles.title}>Select Seats</h1>
      </div>
      {scheduleDetail && (
        <div style={styles.scheduleCard}>
          <div style={styles.infoGroup}><span style={styles.label}>Bus</span><span style={styles.value}>{scheduleDetail.busName}</span></div>
          <div style={styles.infoGroup}><span style={styles.label}>Route</span><span style={styles.value}>{scheduleDetail.source} → {scheduleDetail.destination}</span></div>
          <div style={styles.infoGroup}><span style={styles.label}>Time</span><span style={styles.value}>{scheduleDetail.startTime} — {scheduleDetail.endTime}</span></div>
          <div style={styles.infoGroup}><span style={styles.label}>Date</span><span style={styles.value}>{scheduleDetail.journeyDate}</span></div>
          <div style={styles.infoGroup}><span style={styles.label}>Available</span><span style={{ ...styles.value, color: '#16a34a' }}>{scheduleDetail.availableSeats} / {scheduleDetail.totalSeats}</span></div>
        </div>
      )}
      <div style={styles.content}>
        <SeatLayout />
        <SeatSelector scheduleId={scheduleId} />
      </div>
    </div>
  );
}
