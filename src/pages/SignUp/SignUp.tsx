import React, { useState, ChangeEvent, FormEvent, useEffect } from 'react';
import img from "../../assets/png[3].png";

interface FormData {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
  acceptTerms: boolean;
}

interface FormErrors {
  name?: string;
  email?: string;
  password?: string;
  confirmPassword?: string;
  acceptTerms?: string;
}

const SignUp = () => {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    acceptTerms: false
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
  const [alertType, setAlertType] = useState<'success' | 'error'>('success');

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

  const validateForm = (): FormErrors => {
    const newErrors: FormErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }

    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }

    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = 'Please confirm your password';
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    if (!formData.acceptTerms) {
      newErrors.acceptTerms = 'You must accept the terms';
    }

    return newErrors;
  };

  const showCustomAlert = (message: string, type: 'success' | 'error') => {
    setAlertMessage(message);
    setAlertType(type);
    setShowAlert(true);
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const validationErrors = validateForm();

    if (Object.keys(validationErrors).length === 0) {
      showCustomAlert('Sign up successful! Welcome to SK Tours!', 'success');
      setFormData({
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
        acceptTerms: false
      });
      setErrors({});
    } else {
      showCustomAlert('Please fix the errors in the form', 'error');
      setErrors(validationErrors);
    }
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
              marginBottom: '16px', 
              objectFit: 'contain' 
            }} 
          />
        </div>

        <form onSubmit={handleSubmit}>
          {/* NAME */}
          <div style={{ marginBottom: '16px' }}>
            <label style={labelStyle}>Full Name</label>
            <input 
              type="text" 
              name="name" 
              value={formData.name} 
              onChange={handleChange} 
              placeholder="Enter your full name" 
              style={inputStyle(!!errors.name)} 
            />
            {errors.name && <p style={errorStyle}>{errors.name}</p>}
          </div>

          {/* EMAIL */}
          <div style={{ marginBottom: '16px' }}>
            <label style={labelStyle}>Email Address</label>
            <input 
              type="email" 
              name="email" 
              value={formData.email} 
              onChange={handleChange} 
              placeholder="Enter your email" 
              style={inputStyle(!!errors.email)} 
            />
            {errors.email && <p style={errorStyle}>{errors.email}</p>}
          </div>

          {/* PASSWORD */}
          <div style={{ marginBottom: '16px' }}>
            <label style={labelStyle}>Password</label>
            <input 
              type="password" 
              name="password" 
              value={formData.password} 
              onChange={handleChange} 
              placeholder="Create a password" 
              style={inputStyle(!!errors.password)} 
            />
            {errors.password && <p style={errorStyle}>{errors.password}</p>}
          </div>

          {/* CONFIRM PASSWORD */}
          <div style={{ marginBottom: '16px' }}>
            <label style={labelStyle}>Confirm Password</label>
            <input 
              type="password" 
              name="confirmPassword" 
              value={formData.confirmPassword} 
              onChange={handleChange} 
              placeholder="Re-enter your password" 
              style={inputStyle(!!errors.confirmPassword)} 
            />
            {errors.confirmPassword && <p style={errorStyle}>{errors.confirmPassword}</p>}
          </div>

          {/* TERMS */}
          <div style={{ marginBottom: '24px' }}>
            <label style={{ 
              display: 'flex', 
              alignItems: 'center', 
              cursor: 'pointer', 
              color: errors.acceptTerms ? '#fc8181' : '#4a5568' 
            }}>
              <input 
                type="checkbox" 
                name="acceptTerms" 
                checked={formData.acceptTerms} 
                onChange={handleChange} 
                style={{ 
                  marginRight: '10px', 
                  width: '16px', 
                  height: '16px' 
                }} 
              />
              <span style={{ fontSize: '14px' }}>
                I agree to the Terms of Service and Privacy Policy
              </span>
            </label>
            {errors.acceptTerms && (
              <p style={{ ...errorStyle, marginLeft: '26px' }}>
                {errors.acceptTerms}
              </p>
            )}
          </div>

          <button type="submit" style={buttonStyle}>
            Create Account
          </button>

          <div style={{ 
            textAlign: 'center', 
            color: '#718096', 
            fontSize: '14px',
            marginTop: '16px'
          }}>
            Already have an account?{' '}
            <a 
              href="/login" 
              style={{ 
                color: '#667eea', 
                textDecoration: 'none', 
                fontWeight: '600' 
              }}
            >
              Sign in
            </a>
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
  marginBottom: '6px',
  color: '#4a5568',
  fontSize: '14px',
  fontWeight: '600'
};

const inputStyle = (error: boolean): React.CSSProperties => ({
  width: '100%',
  padding: '12px 14px',
  border: `2px solid ${error ? '#fc8181' : '#e2e8f0'}`,
  borderRadius: '10px',
  fontSize: '15px',
  boxSizing: 'border-box' as 'border-box'
});

const errorStyle: React.CSSProperties = {
  color: '#fc8181',
  fontSize: '13px',
  marginTop: '4px',
  marginBottom: '0'
};

const buttonStyle: React.CSSProperties = {
  width: '100%',
  padding: '14px',
  background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
  color: 'white',
  border: 'none',
  borderRadius: '10px',
  fontSize: '15px',
  fontWeight: '600',
  cursor: 'pointer'
};

export default SignUp;