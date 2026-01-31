import React, { useState, ChangeEvent, FormEvent, useEffect } from 'react';
import { Link } from 'react-router-dom';
import img from "../../assets/png[3].png";

interface LoginData {
  email: string;
  password: string;
  rememberMe: boolean;
}

interface LoginErrors {
  email?: string;
  password?: string;
}

const Login = () => {
  const [formData, setFormData] = useState<LoginData>({
    email: '',
    password: '',
    rememberMe: false
  });

  const [errors, setErrors] = useState<LoginErrors>({});
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
  const [alertType, setAlertType] = useState<'success' | 'error'>('success');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    // Check for saved login credentials
    const savedEmail = localStorage.getItem('rememberedEmail');
    if (savedEmail) {
      setFormData(prev => ({
        ...prev,
        email: savedEmail,
        rememberMe: true
      }));
    }
  }, []);

  useEffect(() => {
    if (showAlert) {
      const timer = setTimeout(() => {
        setShowAlert(false);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [showAlert]);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    });
  };

  const showCustomAlert = (message: string, type: 'success' | 'error') => {
    setAlertMessage(message);
    setAlertType(type);
    setShowAlert(true);
  };

  const validateForm = (): LoginErrors => {
    const newErrors: LoginErrors = {};

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }

    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }

    return newErrors;
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const validationErrors = validateForm();

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      showCustomAlert('Please fix the errors in the form', 'error');
      return;
    }

    setIsLoading(true);

    // Simulate API call
    setTimeout(() => {
      if (formData.rememberMe) {
        localStorage.setItem('rememberedEmail', formData.email);
      } else {
        localStorage.removeItem('rememberedEmail');
      }

      // Demo login logic
      if (formData.email === 'sktours' && formData.password === 'sktours123') {
        showCustomAlert('Login successful! Welcome back!', 'success');
        setFormData({
          email: '',
          password: '',
          rememberMe: false
        });
        setErrors({});
      } else {
        showCustomAlert('Invalid email or password', 'error');
      }
      
      setIsLoading(false);
    }, 1500);
  };

  const handleForgotPassword = () => {
    if (!formData.email) {
      showCustomAlert('Please enter your email to reset password', 'error');
      return;
    }
    showCustomAlert(`Password reset link sent to ${formData.email}`, 'success');
  };

  return (
    <div style={{ 
      minHeight: '100vh', 
      display: 'flex', 
      alignItems: 'center', 
      justifyContent: 'center', 
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', 
      padding: '20px', 
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
      position: 'relative'
    }}>
      {/* Custom Alert Notification */}
      {showAlert && (
        <div style={{
          position: 'fixed',
          top: '20px',
          right: '20px',
          zIndex: 1000,
          animation: 'slideInRight 0.3s ease-out'
        }}>
          <div style={{
            background: alertType === 'success' 
              ? 'linear-gradient(135deg, #4CAF50 0%, #45a049 100%)' 
              : 'linear-gradient(135deg, #f44336 0%, #d32f2f 100%)',
            color: 'white',
            padding: '16px 24px',
            borderRadius: '10px',
            boxShadow: '0 4px 20px rgba(0,0,0,0.2)',
            display: 'flex',
            alignItems: 'center',
            minWidth: '300px',
            maxWidth: '400px'
          }}>
            <div style={{ 
              marginRight: '12px',
              fontSize: '20px'
            }}>
              {alertType === 'success' ? '✅' : '❌'}
            </div>
            <div style={{ flex: 1 }}>
              <strong style={{ display: 'block', marginBottom: '4px' }}>
                {alertType === 'success' ? 'Success!' : 'Error!'}
              </strong>
              <div style={{ fontSize: '14px' }}>{alertMessage}</div>
            </div>
            <button 
              onClick={() => setShowAlert(false)}
              style={{
                background: 'transparent',
                border: 'none',
                color: 'white',
                fontSize: '18px',
                cursor: 'pointer',
                marginLeft: '12px',
                padding: '0 4px'
              }}
            >
              ×
            </button>
          </div>
        </div>
      )}

      <div style={{ 
        width: '100%', 
        maxWidth: '500px', 
        background: 'white', 
        borderRadius: '16px', 
        padding: '32px', 
        boxShadow: '0 10px 40px rgba(0,0,0,0.2)' 
      }}>
        
        <div style={{ 
          textAlign: 'center', 
          marginBottom: '10px', 
          display: 'flex', 
          flexDirection: 'column', 
          alignItems: 'center' 
        }}>
          <img 
            src={img} 
            alt="SK Tours" 
            style={{ 
              height: '56px', 
              marginBottom: '20px', 
              objectFit: 'contain' 
            }} 
          />
          <h1 style={{ 
            color: '#2d3748', 
            fontSize: '28px', 
            marginBottom: '8px',
            fontWeight: '700'
          }}>
            Welcome Back
          </h1>
  
        </div>

        <form onSubmit={handleSubmit}>
          {/* EMAIL */}
          <div style={{ marginBottom: '20px' }}>
            <label style={labelStyle}>Email Address</label>
            <input 
              type="email" 
              name="email" 
              value={formData.email} 
              onChange={handleChange} 
              placeholder="Enter your email" 
              style={inputStyle(!!errors.email)} 
              disabled={isLoading}
            />
            {errors.email && <p style={errorStyle}>{errors.email}</p>}
          </div>

          {/* PASSWORD */}
          <div style={{ marginBottom: '20px' }}>
            <label style={labelStyle}>Password</label>
            <input 
              type="password" 
              name="password" 
              value={formData.password} 
              onChange={handleChange} 
              placeholder="Enter your password" 
              style={inputStyle(!!errors.password)} 
              disabled={isLoading}
            />
            {errors.password && <p style={errorStyle}>{errors.password}</p>}
            
            <div style={{ 
              display: 'flex', 
              justifyContent: 'space-between', 
              alignItems: 'center',
              marginTop: '10px'
            }}>
              <label style={{ 
                display: 'flex', 
                alignItems: 'center', 
                cursor: 'pointer',
                color: '#4a5568'
              }}>
                <input 
                  type="checkbox" 
                  name="rememberMe" 
                  checked={formData.rememberMe} 
                  onChange={handleChange}
                  style={{ 
                    marginRight: '8px', 
                    width: '16px', 
                    height: '16px' 
                  }} 
                  disabled={isLoading}
                />
                <span style={{ fontSize: '14px' }}>Remember me</span>
              </label>
              
              <button 
                type="button"
                onClick={handleForgotPassword}
                style={{
                  background: 'none',
                  border: 'none',
                  color: '#667eea',
                  fontSize: '14px',
                  cursor: 'pointer',
                  textDecoration: 'none',
                  fontWeight: '500'
                }}
                disabled={isLoading}
              >
                Forgot password?
              </button>
            </div>
          </div>

          <button 
            type="submit" 
            style={{
              ...buttonStyle,
              opacity: isLoading ? 0.7 : 1,
              position: 'relative'
            }}
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <span style={{ marginRight: '8px' }}>⏳</span>
                Signing in...
              </>
            ) : (
              'Sign In'
            )}
          </button>

  

          <div style={{ 
            textAlign: 'center', 
            color: '#718096', 
            fontSize: '14px'
          }}>
            Don't have an account?{' '}
            <Link 
              to="/signup" 
              style={{ 
                color: '#667eea', 
                textDecoration: 'none', 
                fontWeight: '600' 
              }}
            >
              Sign up
            </Link>
          </div>

          {/* Divider */}
          <div style={{ 
            display: 'flex', 
            alignItems: 'center', 
            margin: '30px 0'
          }}>
            <div style={{ flex: 1, height: '1px', background: '#e2e8f0' }}></div>
            <div style={{ padding: '0 12px', color: '#718096', fontSize: '14px' }}>
              Or continue with
            </div>
            <div style={{ flex: 1, height: '1px', background: '#e2e8f0' }}></div>
          </div>

          {/* Social Login Buttons */}
          <div style={{ display: 'flex', gap: '12px' }}>
            <button 
              type="button"
              style={socialButtonStyle}
              disabled={isLoading}
            >
              <span style={{ marginRight: '8px' }}>🔵</span>
              Facebook
            </button>
            <button 
              type="button"
              style={socialButtonStyle}
              disabled={isLoading}
            >
              <span style={{ marginRight: '8px' }}>🔴</span>
              Google
            </button>
          </div>
        </form>
      </div>

      {/* Add CSS for animation */}
      <style>{`
        @keyframes slideInRight {
          from {
            transform: translateX(100%);
            opacity: 0;
          }
          to {
            transform: translateX(0);
            opacity: 1;
          }
        }
        
        @keyframes fadeOut {
          from {
            opacity: 1;
          }
          to {
            opacity: 0;
          }
        }
      `}</style>
    </div>
  );
};

const labelStyle: React.CSSProperties = {
  display: 'block',
  marginBottom: '8px',
  color: '#4a5568',
  fontSize: '14px',
  fontWeight: '600'
};

const inputStyle = (error: boolean): React.CSSProperties => ({
  width: '100%',
  padding: '14px 16px',
  border: `2px solid ${error ? '#fc8181' : '#e2e8f0'}`,
  borderRadius: '10px',
  fontSize: '15px',
  boxSizing: 'border-box' as 'border-box',
  transition: 'border-color 0.2s'
});

const errorStyle: React.CSSProperties = {
  color: '#fc8181',
  fontSize: '13px',
  marginTop: '6px',
  marginBottom: '0'
};

const buttonStyle: React.CSSProperties = {
  width: '100%',
  padding: '15px',
  background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
  color: 'white',
  border: 'none',
  borderRadius: '10px',
  fontSize: '16px',
  fontWeight: '600',
  cursor: 'pointer',
  transition: 'opacity 0.2s'
};

const socialButtonStyle: React.CSSProperties = {
  flex: 1,
  padding: '12px',
  background: '#fff',
  color: '#4a5568',
  border: '2px solid #e2e8f0',
  borderRadius: '8px',
  fontSize: '14px',
  fontWeight: '500',
  cursor: 'pointer',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  transition: 'all 0.2s'
};

export default Login;