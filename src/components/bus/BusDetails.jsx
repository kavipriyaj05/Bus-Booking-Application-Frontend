import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchBusDetail } from '../../store/slices/seatSlice';

const styles = {
  card: { background: '#fff', borderRadius: '12px', padding: '24px', boxShadow: '0 2px 16px rgba(220,38,38,0.08)', border: '1px solid #fee2e2', maxWidth: '500px', margin: '0 auto 20px' },
  title: { fontSize: '20px', fontWeight: '700', color: '#dc2626', marginBottom: '16px' },
  row: { display: 'flex', justifyContent: 'space-between', padding: '8px 0', borderBottom: '1px solid #f3f4f6' },
  label: { fontWeight: '600', color: '#555', fontSize: '14px' },
  value: { color: '#111', fontSize: '14px' },
  loading: { textAlign: 'center', padding: '20px', color: '#dc2626' },
  error: { textAlign: 'center', padding: '20px', color: '#dc2626' },
};

export default function BusDetails({ busId }) {
  const dispatch = useDispatch();
  const { busDetail, loading, error } = useSelector((state) => state.seat);

  useEffect(() => { if (busId) dispatch(fetchBusDetail(busId)); }, [busId, dispatch]);

  if (loading) return <p style={styles.loading}>Loading bus details...</p>;
  if (error) return <p style={styles.error}>{error}</p>;
  if (!busDetail) return null;

  return (
    <div style={styles.card}>
      <h3 style={styles.title}>🚌 {busDetail.busName}</h3>
      <div style={styles.row}><span style={styles.label}>Route</span><span style={styles.value}>{busDetail.source} → {busDetail.destination}</span></div>
      <div style={styles.row}><span style={styles.label}>Departure</span><span style={styles.value}>{busDetail.startTime}</span></div>
      <div style={styles.row}><span style={styles.label}>Arrival</span><span style={styles.value}>{busDetail.endTime}</span></div>
      <div style={styles.row}><span style={styles.label}>Total Seats</span><span style={styles.value}>{busDetail.totalSeats}</span></div>
    </div>
  );
}
