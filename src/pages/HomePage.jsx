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
          <span className="nav-icon">🚌</span>
          <span className="nav-title">BusBooking</span>
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
            <div className="feature-icon">🔍</div>
            <h3>Easy Search</h3>
            <p>Search buses by route and date with real-time seat availability.</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">💺</div>
            <h3>Seat Selection</h3>
            <p>Choose your preferred seats with our interactive seat map.</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">💳</div>
            <h3>Secure Payment</h3>
            <p>Pay safely with multiple payment options and instant confirmation.</p>
          </div>
        </section>
      </main>
    </div>
  );
};

export default HomePage;
