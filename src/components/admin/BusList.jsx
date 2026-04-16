import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loadBuses, removeBus } from '../../store/slices/busSlice';

const btnStyle = (bg) => ({ padding: '6px 14px', border: 'none', borderRadius: '6px', cursor: 'pointer', fontSize: '13px', fontWeight: '600', color: '#fff', background: bg });

export default function BusList({ onEdit }) {
  const dispatch = useDispatch();
  const { buses, loading, error } = useSelector(s => s.bus);

  useEffect(() => { dispatch(loadBuses()); }, [dispatch]);

  const handleDelete = (id) => { if (window.confirm('Delete this bus?')) dispatch(removeBus(id)); };

  if (loading) return <div style={{ textAlign: 'center', padding: '40px', color: '#888' }}>Loading buses...</div>;
  if (error) return <div style={{ textAlign: 'center', padding: '40px', color: '#dc2626' }}>Error: {error}</div>;

  return (
    <div style={{ background: '#fff', borderRadius: '10px', padding: '24px', boxShadow: '0 2px 8px rgba(0,0,0,0.08)' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
        <h3 style={{ margin: 0, color: '#333', fontSize: '18px' }}>All Buses ({buses.length})</h3>
        <button onClick={() => onEdit(null)} style={btnStyle('#dc2626')}>+ Add Bus</button>
      </div>
      {buses.length === 0 && <p style={{ color: '#888', textAlign: 'center' }}>No buses found. Add one to get started.</p>}
      <div style={{ overflowX: 'auto' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '14px' }}>
          <thead>
            <tr style={{ borderBottom: '2px solid #f0f0f0', textAlign: 'left' }}>
              <th style={{ padding: '10px 12px', color: '#888', fontWeight: '600' }}>ID</th>
              <th style={{ padding: '10px 12px', color: '#888', fontWeight: '600' }}>Name</th>
              <th style={{ padding: '10px 12px', color: '#888', fontWeight: '600' }}>Route</th>
              <th style={{ padding: '10px 12px', color: '#888', fontWeight: '600' }}>Time</th>
              <th style={{ padding: '10px 12px', color: '#888', fontWeight: '600' }}>Seats</th>
              <th style={{ padding: '10px 12px', color: '#888', fontWeight: '600' }}>Price</th>
              <th style={{ padding: '10px 12px', color: '#888', fontWeight: '600' }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {buses.map(b => (
              <tr key={b.id} style={{ borderBottom: '1px solid #f5f5f5' }}>
                <td style={{ padding: '10px 12px' }}>#{b.id}</td>
                <td style={{ padding: '10px 12px', fontWeight: '600' }}>{b.busName}</td>
                <td style={{ padding: '10px 12px' }}>{b.source} → {b.destination}</td>
                <td style={{ padding: '10px 12px' }}>{b.startTime} - {b.endTime}</td>
                <td style={{ padding: '10px 12px' }}>{b.totalSeats}</td>
                <td style={{ padding: '10px 12px', fontWeight: '600', color: '#dc2626' }}>₹{Number(b.pricePerSeat).toLocaleString()}</td>
                <td style={{ padding: '10px 12px', display: 'flex', gap: '8px' }}>
                  <button onClick={() => onEdit(b)} style={btnStyle('#2563eb')}>Edit</button>
                  <button onClick={() => handleDelete(b.id)} style={btnStyle('#ef4444')}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
