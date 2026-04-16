import { useSelector, useDispatch } from 'react-redux';
import { toggleSeatSelection } from '../../store/slices/seatSlice';

const styles = {
  container: { maxWidth: '480px', margin: '0 auto' },
  title: { color: '#dc2626', fontSize: '18px', fontWeight: '700', marginBottom: '16px', textAlign: 'center' },
  grid: { display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '10px', padding: '20px', background: '#fff', borderRadius: '12px', boxShadow: '0 2px 16px rgba(220,38,38,0.08)', border: '1px solid #fee2e2' },
  seat: { width: '100%', aspectRatio: '1', borderRadius: '8px', border: '2px solid #e5e7eb', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '13px', fontWeight: '600', cursor: 'pointer', transition: 'all 0.2s' },
  available: { background: '#f0fdf4', borderColor: '#86efac', color: '#166534' },
  booked: { background: '#f3f4f6', borderColor: '#d1d5db', color: '#9ca3af', cursor: 'not-allowed' },
  locked: { background: '#fef3c7', borderColor: '#fcd34d', color: '#92400e', cursor: 'not-allowed' },
  selected: { background: '#dc2626', borderColor: '#b91c1c', color: '#fff', transform: 'scale(1.08)' },
  legend: { display: 'flex', gap: '16px', justifyContent: 'center', marginTop: '16px', flexWrap: 'wrap' },
  legendItem: { display: 'flex', alignItems: 'center', gap: '6px', fontSize: '12px', color: '#555' },
  legendBox: { width: '16px', height: '16px', borderRadius: '4px', border: '1px solid #ccc' },
};

export default function SeatLayout() {
  const dispatch = useDispatch();
  const { seatLayout, selectedSeats } = useSelector((state) => state.seat);

  const getSeatStyle = (seat) => {
    if (selectedSeats.includes(seat.seatId)) return { ...styles.seat, ...styles.selected };
    if (seat.status === 'BOOKED') return { ...styles.seat, ...styles.booked };
    if (seat.status === 'LOCKED') return { ...styles.seat, ...styles.locked };
    return { ...styles.seat, ...styles.available };
  };

  const handleClick = (seat) => {
    if (seat.status === 'BOOKED' || seat.status === 'LOCKED') return;
    dispatch(toggleSeatSelection(seat.seatId));
  };

  if (!seatLayout || seatLayout.length === 0) return <p style={{ textAlign: 'center', color: '#888', padding: '20px' }}>No seats available</p>;

  return (
    <div style={styles.container}>
      <h3 style={styles.title}>🪑 Select Your Seats</h3>
      <div style={styles.grid}>
        {seatLayout.map((seat) => (
          <div key={seat.seatId} style={getSeatStyle(seat)} onClick={() => handleClick(seat)} title={`Seat ${seat.seatNumber} - ${seat.status}`}>{seat.seatNumber}</div>
        ))}
      </div>
      <div style={styles.legend}>
        <div style={styles.legendItem}><div style={{ ...styles.legendBox, ...styles.available }}></div>Available</div>
        <div style={styles.legendItem}><div style={{ ...styles.legendBox, background: '#dc2626', borderColor: '#b91c1c' }}></div>Selected</div>
        <div style={styles.legendItem}><div style={{ ...styles.legendBox, ...styles.booked }}></div>Booked</div>
        <div style={styles.legendItem}><div style={{ ...styles.legendBox, ...styles.locked }}></div>Locked</div>
      </div>
    </div>
  );
}
