import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createBooking } from '../../store/slices/bookingSlice';
import { useNavigate } from 'react-router-dom';

const formStyle = { maxWidth: '600px', margin: '40px auto', padding: '30px', background: '#fff', borderRadius: '12px', boxShadow: '0 4px 20px rgba(0,0,0,0.08)' };
const inputStyle = { width: '100%', padding: '10px 14px', border: '1px solid #e5e7eb', borderRadius: '8px', fontSize: '14px', marginBottom: '12px', boxSizing: 'border-box' };
const btnStyle = { width: '100%', padding: '12px', background: '#dc2626', color: '#fff', border: 'none', borderRadius: '8px', fontSize: '16px', fontWeight: '600', cursor: 'pointer' };
const labelStyle = { display: 'block', fontSize: '13px', fontWeight: '600', color: '#374151', marginBottom: '4px' };
const errorStyle = { background: '#fef2f2', color: '#dc2626', padding: '10px 14px', borderRadius: '8px', marginBottom: '16px', fontSize: '13px' };

export default function BookingForm() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error } = useSelector((state) => state.booking);
  const selectedSeats = useSelector((state) => state.seat?.selectedSeats || []);
  const scheduleId = useSelector((state) => state.seat?.scheduleId || '');
  const lockToken = useSelector((state) => state.seat?.lockToken || '');
  const [pricePerSeat, setPricePerSeat] = useState('500');
  const [passengers, setPassengers] = useState(selectedSeats.length > 0 ? selectedSeats.map(() => ({ name: '', age: '', gender: '' })) : [{ name: '', age: '', gender: '' }]);

  const updatePassenger = (i, field, value) => setPassengers(passengers.map((p, idx) => idx === i ? { ...p, [field]: value } : p));
  const addPassenger = () => setPassengers([...passengers, { name: '', age: '', gender: '' }]);
  const removePassenger = (i) => setPassengers(passengers.filter((_, idx) => idx !== i));

  const handleSubmit = async (e) => {
    e.preventDefault();
    const result = await dispatch(createBooking({ scheduleId: Number(scheduleId), seatIds: selectedSeats.map(Number), passengers: passengers.map(p => ({ name: p.name, age: Number(p.age), gender: p.gender })), lockToken, pricePerSeat: Number(pricePerSeat) }));
    if (result.meta.requestStatus === 'fulfilled') navigate(`/payment?bookingId=${result.payload.bookingId}&paymentId=${result.payload.paymentId}`);
  };

  return (
    <form onSubmit={handleSubmit} style={formStyle}>
      <h2 style={{ margin: '0 0 20px', color: '#dc2626', fontSize: '22px' }}>🎫 Complete Your Booking</h2>
      {error && <div style={errorStyle}>⚠ {error}</div>}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '16px' }}>
        <div><label style={labelStyle}>Schedule ID</label><input style={inputStyle} type="number" value={scheduleId} readOnly /></div>
        <div><label style={labelStyle}>Price Per Seat (₹)</label><input style={inputStyle} type="number" value={pricePerSeat} onChange={(e) => setPricePerSeat(e.target.value)} required /></div>
      </div>
      <div style={{ marginBottom: '16px' }}>
        <label style={labelStyle}>Selected Seats</label>
        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
          {selectedSeats.length > 0 ? selectedSeats.map((s, i) => <span key={i} style={{ background: '#fef2f2', color: '#dc2626', padding: '4px 12px', borderRadius: '20px', fontSize: '13px', fontWeight: '600' }}>Seat {s}</span>) : <span style={{ color: '#9ca3af', fontSize: '13px' }}>No seats selected — select from Seat page</span>}
        </div>
      </div>
      <div style={{ marginBottom: '16px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
          <h3 style={{ margin: 0, fontSize: '16px', color: '#1f2937' }}>👥 Passengers</h3>
          <button type="button" onClick={addPassenger} style={{ background: 'none', border: '1px solid #dc2626', color: '#dc2626', padding: '4px 12px', borderRadius: '6px', fontSize: '12px', cursor: 'pointer' }}>+ Add</button>
        </div>
        {passengers.map((p, i) => (
          <div key={i} style={{ background: '#f9fafb', padding: '14px', borderRadius: '8px', marginBottom: '10px', position: 'relative' }}>
            {passengers.length > 1 && <button type="button" onClick={() => removePassenger(i)} style={{ position: 'absolute', top: '8px', right: '8px', background: '#dc2626', color: '#fff', border: 'none', borderRadius: '50%', width: '20px', height: '20px', fontSize: '12px', cursor: 'pointer', lineHeight: '20px', textAlign: 'center' }}>×</button>}
            <div style={{ fontSize: '12px', fontWeight: '700', color: '#6b7280', marginBottom: '8px' }}>Passenger {i + 1}</div>
            <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr', gap: '8px' }}>
              <input style={inputStyle} placeholder="Full Name" value={p.name} onChange={(e) => updatePassenger(i, 'name', e.target.value)} required />
              <input style={inputStyle} type="number" placeholder="Age" value={p.age} onChange={(e) => updatePassenger(i, 'age', e.target.value)} min="1" max="120" required />
              <select style={inputStyle} value={p.gender} onChange={(e) => updatePassenger(i, 'gender', e.target.value)}>
                <option value="">Gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>
            </div>
          </div>
        ))}
      </div>
      <div style={{ background: '#f9fafb', padding: '14px', borderRadius: '8px', marginBottom: '20px', display: 'flex', justifyContent: 'space-between' }}>
        <span style={{ color: '#6b7280', fontWeight: '500' }}>Total Amount</span>
        <span style={{ color: '#dc2626', fontWeight: '700', fontSize: '18px' }}>₹{(Number(pricePerSeat) * (selectedSeats.length || passengers.length)).toLocaleString()}</span>
      </div>
      <button type="submit" style={{ ...btnStyle, opacity: loading ? 0.7 : 1 }} disabled={loading}>{loading ? 'Processing...' : 'Confirm & Pay →'}</button>
    </form>
  );
}
