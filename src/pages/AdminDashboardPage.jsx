import { useState } from 'react';
import { Link } from 'react-router-dom';
import Dashboard from '../components/admin/Dashboard';
import BusList from '../components/admin/BusList';
import BusForm from '../components/admin/BusForm';
import ScheduleForm from '../components/admin/ScheduleForm';

const tabs = ['Dashboard', 'Buses', 'Schedules'];

export default function AdminDashboardPage() {
  const [activeTab, setActiveTab] = useState('Dashboard');
  const [editingBus, setEditingBus] = useState(undefined);

  const handleBusEdit = (bus) => setEditingBus(bus);
  const handleBusFormClose = () => setEditingBus(undefined);

  return (
    <div className="admin-page">
      <div className="admin-topbar">
        <div className="admin-topbar-inner">
          <Link to="/" className="admin-brand">NextStop Admin</Link>
          <Link to="/" className="admin-back-link">Back to Home</Link>
        </div>
      </div>
      <div className="admin-tabs">
        <div className="admin-tabs-inner">
          {tabs.map(t => (
            <button key={t} onClick={() => { setActiveTab(t); setEditingBus(undefined); }}
              className={`admin-tab-btn ${activeTab === t ? 'active' : ''}`}>{t}</button>
          ))}
        </div>
      </div>
      <div className="admin-content">
        {activeTab === 'Dashboard' && <Dashboard />}
        {activeTab === 'Buses' && (editingBus !== undefined ? <BusForm bus={editingBus} onClose={handleBusFormClose} /> : <BusList onEdit={handleBusEdit} />)}
        {activeTab === 'Schedules' && <ScheduleForm />}
      </div>
    </div>
  );
}
