import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const styles = {
  container: { maxWidth: '800px', margin: '24px auto', padding: '0 16px' },
  title: { color: '#dc2626', fontSize: '20px', fontWeight: '700', marginBottom: '16px' },
  empty: { textAlign: 'center', color: '#888', padding: '40px', fontSize: '16px' },
  card: { background: '#fff', borderRadius: '12px', padding: '20px 24px', marginBottom: '14px', boxShadow: '0 2px 12px rgba(220,38,38,0.08)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px', border: '1px solid #fee2e2', transition: 'box-shadow 0.2s' },
  busName: { fontSize: '18px', fontWeight: '700', color: '#111' },
  route: { fontSize: '14px', color: '#555', marginTop: '4px' },
  time: { fontSize: '14px', color: '#333', marginTop: '4px' },
  right: { textAlign: 'right', display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '8px' },
  seats: { fontSize: '14px', fontWeight: '600' },
  seatsAvail: { color: '#16a34a' },
  seatsFull: { color: '#dc2626' },
  btn: { padding: '10px 24px', background: '#dc2626', color: '#fff', border: 'none', borderRadius: '8px', fontSize: '14px', fontWeight: '600', cursor: 'pointer', transition: 'background 0.2s' },
  btnDisabled: { background: '#d4d4d4', color: '#888', cursor: 'not-allowed' },
  date: { fontSize: '13px', color: '#777', marginTop: '2px' },
};

export default function BusResults() {
  const navigate = useNavigate();
  const { searchResults, loading } = useSelector((state) => state.seat);

  if (loading) return <p style={{ textAlign: 'center', padding: '40px', color: '#dc2626' }}>Loading results...</p>;
  if (!searchResults || searchResults.length === 0) return null;

  return (
    <div style={styles.container}>
      <h3 style={styles.title}>🚌 Available Buses ({searchResults.length})</h3>
      {searchResults.map((bus) => (
        <div key={bus.scheduleId} style={styles.card} onMouseEnter={(e) => e.currentTarget.style.boxShadow = '0 4px 20px rgba(220,38,38,0.18)'} onMouseLeave={(e) => e.currentTarget.style.boxShadow = '0 2px 12px rgba(220,38,38,0.08)'}>
          <div>
            <div style={styles.busName}>{bus.busName}</div>
            <div style={styles.route}>{bus.source} → {bus.destination}</div>
            <div style={styles.time}>🕐 {bus.startTime} — {bus.endTime}</div>
            <div style={styles.date}>📅 {bus.journeyDate}</div>
          </div>
          <div style={styles.right}>
            <span style={{ ...styles.seats, ...(bus.availableSeats > 0 ? styles.seatsAvail : styles.seatsFull) }}>{bus.availableSeats > 0 ? `${bus.availableSeats} seats available` : 'No seats'}</span>
            <button style={{ ...styles.btn, ...(bus.availableSeats === 0 ? styles.btnDisabled : {}) }} disabled={bus.availableSeats === 0} onClick={() => navigate(`/seats/${bus.scheduleId}`)}>Select Seats</button>
          </div>
        </div>
      ))}
    </div>
  );
}
