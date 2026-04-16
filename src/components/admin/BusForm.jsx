import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addBus, editBus } from '../../store/slices/busSlice';

const inputStyle = { width: '100%', padding: '10px 14px', border: '1px solid #ddd', borderRadius: '8px', fontSize: '14px', boxSizing: 'border-box', outline: 'none' };
const labelStyle = { display: 'block', fontSize: '13px', fontWeight: '600', color: '#555', marginBottom: '6px' };

export default function BusForm({ bus, onClose }) {
  const dispatch = useDispatch();
  const { loading, error } = useSelector(s => s.bus);
  const [form, setForm] = useState({ busName: '', source: '', destination: '', startTime: '', endTime: '', totalSeats: '', pricePerSeat: '' });

  useEffect(() => { if (bus) setForm({ busName: bus.busName, source: bus.source, destination: bus.destination, startTime: bus.startTime, endTime: bus.endTime, totalSeats: String(bus.totalSeats), pricePerSeat: String(bus.pricePerSeat) }); }, [bus]);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = { ...form, totalSeats: parseInt(form.totalSeats), pricePerSeat: parseFloat(form.pricePerSeat) };
    const result = bus ? await dispatch(editBus({ id: bus.id, data: payload })) : await dispatch(addBus(payload));
    if (!result.error) onClose();
  };

  return (
    <div style={{ background: '#fff', borderRadius: '10px', padding: '28px', boxShadow: '0 2px 8px rgba(0,0,0,0.08)', maxWidth: '500px' }}>
      <h3 style={{ margin: '0 0 20px', color: '#333', fontSize: '18px' }}>{bus ? 'Edit Bus' : 'Add New Bus'}</h3>
      {error && <div style={{ background: '#fef2f2', color: '#dc2626', padding: '10px 14px', borderRadius: '8px', marginBottom: '16px', fontSize: '13px' }}>{error}</div>}
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: '14px' }}><label style={labelStyle}>Bus Name</label><input style={inputStyle} name="busName" value={form.busName} onChange={handleChange} placeholder="e.g. Express Deluxe" required /></div>
        <div style={{ display: 'flex', gap: '12px', marginBottom: '14px' }}>
          <div style={{ flex: 1 }}><label style={labelStyle}>Source</label><input style={inputStyle} name="source" value={form.source} onChange={handleChange} placeholder="e.g. Chennai" required /></div>
          <div style={{ flex: 1 }}><label style={labelStyle}>Destination</label><input style={inputStyle} name="destination" value={form.destination} onChange={handleChange} placeholder="e.g. Bangalore" required /></div>
        </div>
        <div style={{ display: 'flex', gap: '12px', marginBottom: '14px' }}>
          <div style={{ flex: 1 }}><label style={labelStyle}>Start Time</label><input style={inputStyle} name="startTime" type="time" value={form.startTime} onChange={handleChange} required /></div>
          <div style={{ flex: 1 }}><label style={labelStyle}>End Time</label><input style={inputStyle} name="endTime" type="time" value={form.endTime} onChange={handleChange} required /></div>
        </div>
        <div style={{ display: 'flex', gap: '12px', marginBottom: '20px' }}>
          <div style={{ flex: 1 }}><label style={labelStyle}>Total Seats</label><input style={inputStyle} name="totalSeats" type="number" min="1" value={form.totalSeats} onChange={handleChange} placeholder="40" required /></div>
          <div style={{ flex: 1 }}><label style={labelStyle}>Price Per Seat (₹)</label><input style={inputStyle} name="pricePerSeat" type="number" step="0.01" min="0.01" value={form.pricePerSeat} onChange={handleChange} placeholder="500" required /></div>
        </div>
        <div style={{ display: 'flex', gap: '10px' }}>
          <button type="submit" disabled={loading} style={{ padding: '10px 24px', border: 'none', borderRadius: '8px', cursor: 'pointer', fontSize: '14px', fontWeight: '600', color: '#fff', background: loading ? '#999' : '#dc2626' }}>{loading ? 'Saving...' : bus ? 'Update Bus' : 'Create Bus'}</button>
          <button type="button" onClick={onClose} style={{ padding: '10px 24px', border: '1px solid #ddd', borderRadius: '8px', cursor: 'pointer', fontSize: '14px', fontWeight: '600', color: '#555', background: '#fff' }}>Cancel</button>
        </div>
      </form>
    </div>
  );
}
