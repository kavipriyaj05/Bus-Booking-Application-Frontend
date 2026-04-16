import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { forgotPwd, resetPwd, clearError, clearMessage } from '../../store/slices/authSlice';
import { Link } from 'react-router-dom';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [token, setToken] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [step, setStep] = useState(1);
  const dispatch = useDispatch();
  const { loading, error, message } = useSelector((state) => state.auth);

  useEffect(() => { return () => { dispatch(clearError()); dispatch(clearMessage()); }; }, [dispatch]);
  useEffect(() => { if (message && step === 1) setStep(2); }, [message, step]);

  const handleForgot = (e) => { e.preventDefault(); dispatch(forgotPwd({ email })); };
  const handleReset = (e) => { e.preventDefault(); dispatch(resetPwd({ token, newPassword })); };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <div className="auth-header">
          <div className="auth-brand">NextStop</div>
          <h2>{step === 1 ? 'Forgot Password' : 'Reset Password'}</h2>
          <p>{step === 1 ? 'Enter your email to receive a reset token' : 'Enter the token and your new password'}</p>
        </div>
        {error && <div className="auth-error">{error}</div>}
        {message && <div className="auth-success">{message}</div>}
        {step === 1 ? (
          <form onSubmit={handleForgot}>
            <div className="form-group">
              <label htmlFor="forgot-email">Email</label>
              <input id="forgot-email" type="email" placeholder="Enter your email" value={email} onChange={(e) => setEmail(e.target.value)} required />
            </div>
            <button type="submit" className="btn-primary" disabled={loading}>{loading ? 'Sending...' : 'Send Reset Token'}</button>
          </form>
        ) : (
          <form onSubmit={handleReset}>
            <div className="form-group">
              <label htmlFor="reset-token">Reset Token</label>
              <input id="reset-token" type="text" placeholder="Paste the token from email" value={token} onChange={(e) => setToken(e.target.value)} required />
            </div>
            <div className="form-group">
              <label htmlFor="reset-new-password">New Password</label>
              <input id="reset-new-password" type="password" placeholder="Min 6 characters" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} required minLength={6} />
            </div>
            <button type="submit" className="btn-primary" disabled={loading}>{loading ? 'Resetting...' : 'Reset Password'}</button>
          </form>
        )}
        <div className="auth-links">
          <Link to="/login">Back to Login</Link>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
