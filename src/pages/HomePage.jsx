import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../store/slices/authSlice';
import { useNavigate, Link } from 'react-router-dom';

const HomePage = () => {
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => { dispatch(logout()); navigate('/login'); };

  return (
    <div className="home-container">
      <nav className="navbar">
        <div className="nav-brand">
          <svg className="nav-svg-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="4" width="18" height="14" rx="2"/><line x1="3" y1="10" x2="21" y2="10"/><circle cx="7" cy="18" r="1.5" fill="currentColor"/><circle cx="17" cy="18" r="1.5" fill="currentColor"/></svg>
          <span className="nav-title">NextStop</span>
        </div>
        <div className="nav-links">
          <Link to="/search" className="nav-link">Search Buses</Link>
          <Link to="/bookings" className="nav-link">My Bookings</Link>
          {user?.role === 'ADMIN' && <Link to="/admin" className="nav-link nav-admin">Admin Panel</Link>}
          <div className="nav-user">
            <span className="nav-username">{user?.username || user?.email}</span>
            <button onClick={handleLogout} className="btn-logout">Logout</button>
          </div>
        </div>
      </nav>
      <main className="home-main">
        <section className="hero-section">
          <div className="hero-content">
            <h1>Book Your Bus Journey</h1>
            <p>Find and book bus tickets across hundreds of routes. Fast, easy, and secure.</p>
            <div className="hero-actions">
              <Link to="/search" className="btn-primary btn-large">Search Buses</Link>
              <Link to="/bookings" className="btn-outline btn-large">View Bookings</Link>
            </div>
          </div>
        </section>
        <section className="features-section">
          <div className="feature-card">
            <div className="feature-icon-svg">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
            </div>
            <h3>Easy Search</h3>
            <p>Search buses by route and date with real-time seat availability.</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon-svg">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="2" y="6" width="20" height="12" rx="2"/><line x1="2" y1="12" x2="22" y2="12"/><circle cx="7" cy="9" r="1" fill="currentColor"/><circle cx="12" cy="9" r="1" fill="currentColor"/><circle cx="17" cy="9" r="1" fill="currentColor"/></svg>
            </div>
            <h3>Seat Selection</h3>
            <p>Choose your preferred seats with our interactive seat map.</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon-svg">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="1" y="4" width="22" height="16" rx="2"/><line x1="1" y1="10" x2="23" y2="10"/></svg>
            </div>
            <h3>Secure Payment</h3>
            <p>Pay safely with multiple payment options and instant confirmation.</p>
          </div>
        </section>
      </main>
    </div>
  );
};

export default HomePage;
