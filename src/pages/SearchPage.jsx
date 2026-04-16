import SearchForm from '../components/bus/SearchForm';
import BusResults from '../components/bus/BusResults';

const styles = {
  page: { minHeight: '100vh', background: 'linear-gradient(135deg, #fff5f5 0%, #ffffff 50%, #fef2f2 100%)', padding: '40px 16px' },
  header: { textAlign: 'center', marginBottom: '32px' },
  logo: { fontSize: '32px', fontWeight: '800', color: '#dc2626' },
  subtitle: { fontSize: '15px', color: '#777', marginTop: '6px' },
};

export default function SearchPage() {
  return (
    <div style={styles.page}>
      <div style={styles.header}>
        <h1 style={styles.logo}>🚌 BusBook</h1>
        <p style={styles.subtitle}>Find and book your bus tickets easily</p>
      </div>
      <SearchForm />
      <BusResults />
    </div>
  );
}
