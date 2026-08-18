import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../../contexts/AuthContext';
import '../../../components/login.css';


// Icons used specifically for the signup page
const IconArrowLeft = (props: React.SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M19 12H5" /><path d="M12 19l-7-7 7-7" />
  </svg>
);


// Simple feather icons for Mail and Lock to be used if not available in components/icons
const IconMail = (props: React.SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <rect x="2" y="4" width="20" height="16" rx="2" ry="2" />
    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
  </svg>
);

const IconLock = (props: React.SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
    <path d="M7 11V7a5 5 0 0 1 10 0v4" />
  </svg>
);

export const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Hook de autenticación
  const { login, error: authError } = useAuth();
  const navigate = useNavigate();


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email.includes('@')) {
      setEmailError(true);
      return;
    }

    setEmailError(false);
    setIsSubmitting(true);

    try {
      // Llamar a Firebase login
      await login(email, password);

      // Si el login es exitoso, redirigir
      navigate('/dashboard');

      console.log('✓ Login exitoso!');
    } catch (err) {
      console.error('Error en login:', err);
      // El error ya está en authError
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="login-page">
      <div className="back-button-container">
        <button
          className="signup-back-btn"
          aria-label="Go back"
          onClick={() => window.history.back()}
        >
          <IconArrowLeft />
        </button>
      </div>
      <div className="login-card soft-card">

        <div className="login-header">
          <h1 className="login-title">Welcome Back</h1>
          <p className="login-subtitle">Sign in to continue exploring fresh products</p>
        </div>

        {/* Mostrar error de Firebase si existe */}
        {authError && (
          <div className="error-banner">
            {authError}
          </div>
        )}

        <form className="login-form" onSubmit={handleSubmit} noValidate>

          <div className="form-group">
            <label htmlFor="email" className="input-label">Email</label>
            <div className={`input-wrapper ${emailError ? 'is-error' : ''} ${isSubmitting ? 'is-disabled' : ''}`}>
              <IconMail className="input-icon" />
              <input
                id="email"
                type="email"
                className="input-field"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  if (emailError) setEmailError(false);
                }}
                disabled={isSubmitting}
                required
              />
            </div>
            {emailError && <span className="error-text">Please enter a valid email address</span>}
          </div>

          <div className="form-group">
            <label htmlFor="password" className="input-label">Password</label>
            <div className={`input-wrapper ${isSubmitting ? 'is-disabled' : ''}`}>
              <IconLock className="input-icon" />
              <input
                id="password"
                type="password"
                className="input-field"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                disabled={isSubmitting}
                required
              />
            </div>
          </div>

          <a href="#" className="forgot-password">Forgot password?</a>

          <button
            type="submit"
            className={`pill-button ${isSubmitting ? 'pill-button--inactive' : 'pill-button--primary'} login-btn`}
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Signing in...' : 'Sign In'}
          </button>
        </form>

        <div className="login-footer">
          Don't have an account?
          <a href="/auth/register" className="signup-link">Sign up</a>
        </div>

      </div>
    </div>
  );
};

export default Login;
