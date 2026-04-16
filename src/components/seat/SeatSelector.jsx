import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { lockSeats, releaseSeats, clearSelectedSeats } from '../../store/slices/seatSlice';

const styles = {
  container: { maxWidth: '480px', margin: '20px auto', background: '#fff', borderRadius: '12px', padding: '24px', boxShadow: '0 2px 16px rgba(220,38,38,0.08)', border: '1px solid #fee2e2' },
  title: { fontSize: '16px', fontWeight: '700', color: '#333', marginBottom: '12px' },
  seatList: { display: 'flex', gap: '8px', flexWrap: 'wrap', marginBottom: '16px' },
  seatChip: { padding: '6px 14px', background: '#fef2f2', color: '#dc2626', borderRadius: '20px', fontSize: '13px', fontWeight: '600', border: '1px solid #fca5a5' },
  row: { display: 'flex', gap: '10px' },
  btn: { flex: 1, padding: '12px', border: 'none', borderRadius: '8px', fontSize: '14px', fontWeight: '700', cursor: 'pointer', transition: 'background 0.2s' },
  lockBtn: { background: '#dc2626', color: '#fff' },
  clearBtn: { background: '#f3f4f6', color: '#555' },
  proceedBtn: { width: '100%', padding: '14px', background: '#16a34a', color: '#fff', border: 'none', borderRadius: '8px', fontSize: '15px', fontWeight: '700', cursor: 'pointer', marginTop: '12px' },
  releaseBtn: { width: '100%', padding: '12px', background: '#f3f4f6', color: '#dc2626', border: '1px solid #fca5a5', borderRadius: '8px', fontSize: '14px', fontWeight: '600', cursor: 'pointer', marginTop: '8px' },
  lockInfo: { background: '#f0fdf4', borderRadius: '8px', padding: '12px', marginTop: '12px', fontSize: '13px', color: '#166534', border: '1px solid #bbf7d0' },
  empty: { textAlign: 'center', color: '#888', fontSize: '14px', padding: '12px' },
  error: { color: '#dc2626', fontSize: '13px', marginTop: '8px' },
  disabled: { opacity: 0.5, cursor: 'not-allowed' },
};

export default function SeatSelector({ scheduleId }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { selectedSeats, lockToken, lockExpiresAt, seatLayout, loading, error } = useSelector((state) => state.seat);

  const selectedSeatNumbers = seatLayout.filter((s) => selectedSeats.includes(s.seatId)).map((s) => s.seatNumber);

  const handleLock = () => { if (selectedSeats.length > 0) dispatch(lockSeats({ scheduleId: Number(scheduleId), seatIds: selectedSeats })); };
  const handleRelease = () => { if (lockToken) dispatch(releaseSeats(lockToken)); };
  const handleClear = () => dispatch(clearSelectedSeats());
  const handleProceed = () => navigate(`/booking?scheduleId=${scheduleId}&lockToken=${lockToken}&seats=${selectedSeats.join(',')}`);

  if (selectedSeats.length === 0 && !lockToken) return <div style={styles.container}><p style={styles.empty}>Click on available seats to select them</p></div>;

  return (
    <div style={styles.container}>
      <h4 style={styles.title}>Selected Seats ({selectedSeats.length})</h4>
      <div style={styles.seatList}>
        {selectedSeatNumbers.map((num) => <span key={num} style={styles.seatChip}>{num}</span>)}
      </div>
      {!lockToken ? (
        <div style={styles.row}>
          <button style={{ ...styles.btn, ...styles.lockBtn, ...(loading ? styles.disabled : {}) }} onClick={handleLock} disabled={loading}>{loading ? 'Locking...' : 'Lock Seats'}</button>
          <button style={{ ...styles.btn, ...styles.clearBtn }} onClick={handleClear}>Clear</button>
        </div>
      ) : (
        <>
          <div style={styles.lockInfo}>Seats locked! Token expires at {new Date(lockExpiresAt).toLocaleTimeString()}</div>
          <button style={styles.proceedBtn} onClick={handleProceed}>Proceed to Booking →</button>
          <button style={styles.releaseBtn} onClick={handleRelease}>Release Seats</button>
        </>
      )}
      {error && <p style={styles.error}>{error}</p>}
    </div>
  );
}
