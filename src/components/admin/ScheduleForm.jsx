import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loadBuses, loadSchedules, addSchedule, editSchedule, removeSchedule } from '../../store/slices/busSlice';

const inputStyle = { width: '100%', padding: '10px 14px', border: '1px solid #ddd', borderRadius: '8px', fontSize: '14px', boxSizing: 'border-box', outline: 'none' };
const labelStyle = { display: 'block', fontSize: '13px', fontWeight: '600', color: '#555', marginBottom: '6px' };
const btnStyle = (bg) => ({ padding: '6px 14px', border: 'none', borderRadius: '6px', cursor: 'pointer', fontSize: '13px', fontWeight: '600', color: '#fff', background: bg });

export default function ScheduleForm() {
  const dispatch = useDispatch();
  const { buses, schedules, loading, error } = useSelector(s => s.bus);
  const [form, setForm] = useState({ busId: '', journeyDate: '' });
  const [editingId, setEditingId] = useState(null);

  useEffect(() => { dispatch(loadBuses()); dispatch(loadSchedules()); }, [dispatch]);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = { busId: parseInt(form.busId), journeyDate: form.journeyDate };
    const result = editingId ? await dispatch(editSchedule({ id: editingId, data: payload })) : await dispatch(addSchedule(payload));
    if (!result.error) { setForm({ busId: '', journeyDate: '' }); setEditingId(null); }
  };

  const handleEdit = (sc) => { setForm({ busId: String(sc.busId), journeyDate: sc.journeyDate }); setEditingId(sc.id); };
  const handleDelete = (id) => { if (window.confirm('Delete this schedule?')) dispatch(removeSchedule(id)); };
  const handleCancel = () => { setForm({ busId: '', journeyDate: '' }); setEditingId(null); };

  return (
    <div>
      <div style={{ background: '#fff', borderRadius: '10px', padding: '28px', boxShadow: '0 2px 8px rgba(0,0,0,0.08)', marginBottom: '24px', maxWidth: '500px' }}>
        <h3 style={{ margin: '0 0 20px', color: '#333', fontSize: '18px' }}>{editingId ? 'Edit Schedule' : 'Add Schedule'}</h3>
        {error && <div style={{ background: '#fef2f2', color: '#dc2626', padding: '10px 14px', borderRadius: '8px', marginBottom: '16px', fontSize: '13px' }}>{error}</div>}
        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: '14px' }}>
            <label style={labelStyle}>Bus</label>
            <select style={inputStyle} name="busId" value={form.busId} onChange={handleChange} required>
              <option value="">Select a bus</option>
              {buses.map(b => <option key={b.id} value={b.id}>{b.busName} ({b.source} → {b.destination})</option>)}
            </select>
          </div>
          <div style={{ marginBottom: '20px' }}><label style={labelStyle}>Journey Date</label><input style={inputStyle} name="journeyDate" type="date" value={form.journeyDate} onChange={handleChange} required /></div>
          <div style={{ display: 'flex', gap: '10px' }}>
            <button type="submit" disabled={loading} style={{ padding: '10px 24px', border: 'none', borderRadius: '8px', cursor: 'pointer', fontSize: '14px', fontWeight: '600', color: '#fff', background: loading ? '#999' : '#dc2626' }}>{loading ? 'Saving...' : editingId ? 'Update' : 'Create'}</button>
            {editingId && <button type="button" onClick={handleCancel} style={{ padding: '10px 24px', border: '1px solid #ddd', borderRadius: '8px', cursor: 'pointer', fontSize: '14px', fontWeight: '600', color: '#555', background: '#fff' }}>Cancel</button>}
          </div>
        </form>
      </div>
      <div style={{ background: '#fff', borderRadius: '10px', padding: '24px', boxShadow: '0 2px 8px rgba(0,0,0,0.08)' }}>
        <h3 style={{ margin: '0 0 16px', color: '#333', fontSize: '18px' }}>All Schedules ({schedules.length})</h3>
        {schedules.length === 0 && <p style={{ color: '#888', textAlign: 'center' }}>No schedules found.</p>}
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '14px' }}>
            <thead>
              <tr style={{ borderBottom: '2px solid #f0f0f0', textAlign: 'left' }}>
                <th style={{ padding: '10px 12px', color: '#888', fontWeight: '600' }}>ID</th>
                <th style={{ padding: '10px 12px', color: '#888', fontWeight: '600' }}>Bus</th>
                <th style={{ padding: '10px 12px', color: '#888', fontWeight: '600' }}>Journey Date</th>
                <th style={{ padding: '10px 12px', color: '#888', fontWeight: '600' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {schedules.map(sc => (
                <tr key={sc.id} style={{ borderBottom: '1px solid #f5f5f5' }}>
                  <td style={{ padding: '10px 12px' }}>#{sc.id}</td>
                  <td style={{ padding: '10px 12px', fontWeight: '600' }}>{sc.busName}</td>
                  <td style={{ padding: '10px 12px' }}>{sc.journeyDate}</td>
                  <td style={{ padding: '10px 12px', display: 'flex', gap: '8px' }}>
                    <button onClick={() => handleEdit(sc)} style={btnStyle('#2563eb')}>Edit</button>
                    <button onClick={() => handleDelete(sc.id)} style={btnStyle('#ef4444')}>Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
