import { useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';
import './Login.css';

const Login = () => {
  const [error, setError] = useState('');
  const [isAuthenticating, setIsAuthenticating] = useState(false);
  const navigate = useNavigate();

  // Enhanced mock authentication with better validation
  const authenticateUser = async (email, password) => {
    // Simulate API delay (1-1.5 seconds for more realistic feel)
    await new Promise(resolve => setTimeout(resolve, 1000 + Math.random() * 500));
    
    // Enhanced mock validation - accepts any valid email and password >= 6 chars
    const isValidEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    const isValidPassword = password.length >= 6;

    if (isValidEmail && isValidPassword) {
      return { 
        success: true, 
        token: 'mock-jwt-token',
        user: {
          email,
          name: email.split('@')[0] // Generate mock username from email
        }
      };
    }
    return { 
      success: false, 
      message: 'Invalid credentials. Use any valid email and password (6+ characters).' 
    };
  };

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email('Invalid email address')
        .required('Email is required'),
      password: Yup.string()
        .min(6, 'Password must be at least 6 characters')
        .required('Password is required'),
    }),
    onSubmit: async (values) => {
      try {
        setIsAuthenticating(true);
        setError('');
        
        const authResult = await authenticateUser(values.email, values.password);
        
        if (authResult.success) {
          // Store authentication data
          localStorage.setItem('authToken', authResult.token);
          localStorage.setItem('userEmail', values.email);
          localStorage.setItem('userName', authResult.user.name);
          localStorage.setItem('isAuthenticated', 'true');
          
          // Redirect to dashboard with a slight delay for better UX
          setTimeout(() => navigate('/dashboard'), 300);
        } else {
          setError(authResult.message || 'Authentication failed');
        }
      } catch (err) {
        setError(err.message || 'Login failed. Please try again.');
      } finally {
        setIsAuthenticating(false);
      }
    },
  });

  return (
    <div className="login-wrapper">
      <div className="login-container">
        <h1 className="login-title">Welcome Back</h1>
        <p className="login-subtitle">Please enter your credentials</p>
        
        {error && (
          <div className="error-message">
            <i className="error-icon">⚠️</i> {error}
          </div>
        )}
        
        <form onSubmit={formik.handleSubmit} noValidate>
          <div className="form-group">
            <label htmlFor="email">Email Address</label>
            <input
              id="email"
              name="email"
              type="email"
              placeholder="Enter your email"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.email}
              disabled={isAuthenticating}
              className={formik.touched.email && formik.errors.email ? 'input-error' : ''}
            />
            {formik.touched.email && formik.errors.email && (
              <div className="error">
                <i className="error-icon">!</i> {formik.errors.email}
              </div>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              id="password"
              name="password"
              type="password"
              placeholder="Enter your password"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.password}
              disabled={isAuthenticating}
              className={formik.touched.password && formik.errors.password ? 'input-error' : ''}
            />
            {formik.touched.password && formik.errors.password && (
              <div className="error">
                <i className="error-icon">!</i> {formik.errors.password}
              </div>
            )}
          </div>

          <button
            type="submit"
            className="submit-btn"
            disabled={formik.isSubmitting || isAuthenticating}
            aria-busy={isAuthenticating}
          >
            {isAuthenticating ? (
              <>
                <span className="loading-spinner" aria-hidden="true"></span>
                Signing In...
              </>
            ) : (
              'Sign In'
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;