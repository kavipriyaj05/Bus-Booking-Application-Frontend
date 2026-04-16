import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loadDashboard } from '../../store/slices/busSlice';

const cardStyle = { background: '#fff', borderRadius: '10px', padding: '24px', boxShadow: '0 2px 8px rgba(0,0,0,0.08)', flex: '1', minWidth: '200px', textAlign: 'center' };
const labelStyle = { fontSize: '14px', color: '#888', marginBottom: '6px' };
const valueStyle = { fontSize: '28px', fontWeight: '700', color: '#dc2626' };

export default function Dashboard() {
  const dispatch = useDispatch();
  const { dashboard, loading, error } = useSelector(s => s.bus);

  useEffect(() => { dispatch(loadDashboard()); }, [dispatch]);

  if (loading) return <div style={{ textAlign: 'center', padding: '40px', color: '#888' }}>Loading dashboard...</div>;
  if (error) return <div style={{ textAlign: 'center', padding: '40px', color: '#dc2626' }}>Error: {error}</div>;
  if (!dashboard) return null;

  return (
    <div>
      <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap', marginBottom: '32px' }}>
        <div style={cardStyle}><div style={labelStyle}>Total Buses</div><div style={valueStyle}>{dashboard.totalBuses}</div></div>
        <div style={cardStyle}><div style={labelStyle}>Total Bookings</div><div style={valueStyle}>{dashboard.totalBookings}</div></div>
        <div style={cardStyle}><div style={labelStyle}>Total Revenue</div><div style={valueStyle}>₹{Number(dashboard.totalRevenue).toLocaleString()}</div></div>
      </div>
      <div style={{ background: '#fff', borderRadius: '10px', padding: '24px', boxShadow: '0 2px 8px rgba(0,0,0,0.08)' }}>
        <h3 style={{ margin: '0 0 16px', color: '#333', fontSize: '18px' }}>Recent Bookings</h3>
        {dashboard.recentBookings?.length === 0 && <p style={{ color: '#888' }}>No bookings yet.</p>}
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '14px' }}>
            <thead>
              <tr style={{ borderBottom: '2px solid #f0f0f0', textAlign: 'left' }}>
                <th style={{ padding: '10px 12px', color: '#888', fontWeight: '600' }}>ID</th>
                <th style={{ padding: '10px 12px', color: '#888', fontWeight: '600' }}>User</th>
                <th style={{ padding: '10px 12px', color: '#888', fontWeight: '600' }}>Bus</th>
                <th style={{ padding: '10px 12px', color: '#888', fontWeight: '600' }}>Date</th>
                <th style={{ padding: '10px 12px', color: '#888', fontWeight: '600' }}>Status</th>
                <th style={{ padding: '10px 12px', color: '#888', fontWeight: '600' }}>Amount</th>
              </tr>
            </thead>
            <tbody>
              {dashboard.recentBookings?.map(b => (
                <tr key={b.bookingId} style={{ borderBottom: '1px solid #f5f5f5' }}>
                  <td style={{ padding: '10px 12px' }}>#{b.bookingId}</td>
                  <td style={{ padding: '10px 12px' }}>{b.userEmail}</td>
                  <td style={{ padding: '10px 12px' }}>{b.busName}</td>
                  <td style={{ padding: '10px 12px' }}>{b.journeyDate}</td>
                  <td style={{ padding: '10px 12px' }}><span style={{ padding: '3px 10px', borderRadius: '12px', fontSize: '12px', fontWeight: '600', background: b.status === 'CONFIRMED' ? '#dcfce7' : b.status === 'CANCELLED' ? '#fef2f2' : '#fef9c3', color: b.status === 'CONFIRMED' ? '#166534' : b.status === 'CANCELLED' ? '#991b1b' : '#854d0e' }}>{b.status}</span></td>
                  <td style={{ padding: '10px 12px', fontWeight: '600' }}>₹{Number(b.amount).toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
