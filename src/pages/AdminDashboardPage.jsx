import { useState } from 'react';
import Dashboard from '../components/admin/Dashboard';
import BusList from '../components/admin/BusList';
import BusForm from '../components/admin/BusForm';
import ScheduleForm from '../components/admin/ScheduleForm';

const tabs = ['Dashboard', 'Buses', 'Schedules'];

const tabBtnStyle = (active) => ({ padding: '10px 24px', border: 'none', borderBottom: active ? '3px solid #dc2626' : '3px solid transparent', background: 'transparent', cursor: 'pointer', fontSize: '15px', fontWeight: active ? '700' : '500', color: active ? '#dc2626' : '#888', transition: 'all 0.2s' });

export default function AdminDashboardPage() {
  const [activeTab, setActiveTab] = useState('Dashboard');
  const [editingBus, setEditingBus] = useState(undefined);

  const handleBusEdit = (bus) => setEditingBus(bus);
  const handleBusFormClose = () => setEditingBus(undefined);

  return (
    <div style={{ minHeight: '100vh', background: '#f8f8f8' }}>
      <div style={{ background: '#dc2626', padding: '20px 0', marginBottom: '0' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '0 24px' }}>
          <h1 style={{ margin: 0, color: '#fff', fontSize: '22px', fontWeight: '700' }}>🚌 Bus Booking Admin</h1>
        </div>
      </div>
      <div style={{ background: '#fff', borderBottom: '1px solid #eee', marginBottom: '28px' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '0 24px', display: 'flex', gap: '4px' }}>
          {tabs.map(t => <button key={t} onClick={() => { setActiveTab(t); setEditingBus(undefined); }} style={tabBtnStyle(activeTab === t)}>{t}</button>)}
        </div>
      </div>
      <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '0 24px 40px' }}>
        {activeTab === 'Dashboard' && <Dashboard />}
        {activeTab === 'Buses' && (editingBus !== undefined ? <BusForm bus={editingBus} onClose={handleBusFormClose} /> : <BusList onEdit={handleBusEdit} />)}
        {activeTab === 'Schedules' && <ScheduleForm />}
      </div>
    </div>
  );
}
