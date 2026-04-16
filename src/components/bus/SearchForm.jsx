import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { searchBuses, clearSearchResults } from '../../store/slices/seatSlice';

const searchFormStyles = {
  container: { background: '#fff', borderRadius: '12px', padding: '32px', boxShadow: '0 4px 24px rgba(220,38,38,0.10)', maxWidth: '700px', margin: '0 auto' },
  title: { color: '#dc2626', fontSize: '22px', fontWeight: '700', marginBottom: '24px', textAlign: 'center' },
  row: { display: 'flex', gap: '16px', flexWrap: 'wrap', marginBottom: '16px' },
  fieldGroup: { flex: '1 1 200px', display: 'flex', flexDirection: 'column', gap: '6px' },
  label: { fontSize: '13px', fontWeight: '600', color: '#555' },
  input: { padding: '12px 14px', borderRadius: '8px', border: '1.5px solid #e5e7eb', fontSize: '15px', outline: 'none', transition: 'border 0.2s' },
  inputFocus: { borderColor: '#dc2626' },
  btn: { width: '100%', padding: '14px', background: '#dc2626', color: '#fff', border: 'none', borderRadius: '8px', fontSize: '16px', fontWeight: '700', cursor: 'pointer', marginTop: '8px', transition: 'background 0.2s' },
  btnDisabled: { background: '#f87171', cursor: 'not-allowed' },
  error: { color: '#dc2626', textAlign: 'center', marginTop: '12px', fontSize: '14px' },
};

export default function SearchForm() {
  const dispatch = useDispatch();
  const { loading, error } = useSelector((state) => state.seat);
  const [source, setSource] = useState('');
  const [destination, setDestination] = useState('');
  const [date, setDate] = useState('');
  const [focused, setFocused] = useState('');

  const handleSearch = (e) => {
    e.preventDefault();
    if (!source || !destination || !date) return;
    dispatch(clearSearchResults());
    dispatch(searchBuses({ source: source.trim(), destination: destination.trim(), date }));
  };

  const getInputStyle = (name) => ({ ...searchFormStyles.input, ...(focused === name ? searchFormStyles.inputFocus : {}) });

  return (
    <form style={searchFormStyles.container} onSubmit={handleSearch}>
      <h2 style={searchFormStyles.title}>🔍 Search Buses</h2>
      <div style={searchFormStyles.row}>
        <div style={searchFormStyles.fieldGroup}>
          <label style={searchFormStyles.label}>From</label>
          <input style={getInputStyle('source')} type="text" placeholder="Source city" value={source} onChange={(e) => setSource(e.target.value)} onFocus={() => setFocused('source')} onBlur={() => setFocused('')} required />
        </div>
        <div style={searchFormStyles.fieldGroup}>
          <label style={searchFormStyles.label}>To</label>
          <input style={getInputStyle('dest')} type="text" placeholder="Destination city" value={destination} onChange={(e) => setDestination(e.target.value)} onFocus={() => setFocused('dest')} onBlur={() => setFocused('')} required />
        </div>
        <div style={searchFormStyles.fieldGroup}>
          <label style={searchFormStyles.label}>Date</label>
          <input style={getInputStyle('date')} type="date" value={date} onChange={(e) => setDate(e.target.value)} onFocus={() => setFocused('date')} onBlur={() => setFocused('')} min={new Date().toISOString().split('T')[0]} required />
        </div>
      </div>
      <button type="submit" style={{ ...searchFormStyles.btn, ...(loading ? searchFormStyles.btnDisabled : {}) }} disabled={loading}>{loading ? 'Searching...' : 'Search Buses'}</button>
      {error && <p style={searchFormStyles.error}>{error}</p>}
    </form>
  );
}
