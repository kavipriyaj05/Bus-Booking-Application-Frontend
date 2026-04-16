import { lazy, Suspense } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import PrivateRoute from './components/auth/PrivateRoute';

const LoginPage = lazy(() => import('./pages/LoginPage'));
const SignupPage = lazy(() => import('./pages/SignupPage'));
const ForgotPasswordPage = lazy(() => import('./pages/ForgotPasswordPage'));
const HomePage = lazy(() => import('./pages/HomePage'));
const AdminDashboardPage = lazy(() => import('./pages/AdminDashboardPage'));
const SearchPage = lazy(() => import('./pages/SearchPage'));
const SeatPage = lazy(() => import('./pages/SeatPage'));
const BookingPage = lazy(() => import('./pages/BookingPage'));
const PaymentPage = lazy(() => import('./pages/PaymentPage'));

const Loader = () => <div className="page-loader"><div className="spinner"></div></div>;

function App() {
  return (
    <BrowserRouter>
      <Suspense fallback={<Loader />}>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/forgot-password" element={<ForgotPasswordPage />} />
          <Route path="/" element={<PrivateRoute><HomePage /></PrivateRoute>} />
          <Route path="/admin" element={<PrivateRoute adminOnly={true}><AdminDashboardPage /></PrivateRoute>} />
          <Route path="/search" element={<PrivateRoute><SearchPage /></PrivateRoute>} />
          <Route path="/seats/:scheduleId" element={<PrivateRoute><SeatPage /></PrivateRoute>} />
          <Route path="/booking/:scheduleId" element={<PrivateRoute><BookingPage /></PrivateRoute>} />
          <Route path="/booking" element={<PrivateRoute><BookingPage /></PrivateRoute>} />
          <Route path="/bookings" element={<PrivateRoute><BookingPage /></PrivateRoute>} />
          <Route path="/payment/success" element={<PrivateRoute><PaymentPage /></PrivateRoute>} />
          <Route path="/payment/:bookingId" element={<PrivateRoute><PaymentPage /></PrivateRoute>} />
          <Route path="/payment" element={<PrivateRoute><PaymentPage /></PrivateRoute>} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}

export default App;
