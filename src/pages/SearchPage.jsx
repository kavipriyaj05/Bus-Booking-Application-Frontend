import SearchForm from '../components/bus/SearchForm';
import BusResults from '../components/bus/BusResults';
import { Link } from 'react-router-dom';

export default function SearchPage() {
  return (
    <div className="search-page">
      <nav className="page-nav">
        <Link to="/" className="page-nav-brand">NextStop</Link>
        <div className="page-nav-links">
          <Link to="/search" className="page-nav-link active">Search</Link>
          <Link to="/bookings" className="page-nav-link">My Bookings</Link>
        </div>
      </nav>
      <div className="page-content">
        <div className="page-header">
          <h1>Search Buses</h1>
          <p>Find and book your bus tickets easily</p>
        </div>
        <SearchForm />
        <BusResults />
      </div>
    </div>
  );
}
