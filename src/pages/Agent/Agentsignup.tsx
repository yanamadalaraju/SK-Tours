import React, { useState, ChangeEvent, FormEvent, useEffect } from 'react';
import img from "../../assets/png[3].png";
import { BASE_URL } from '@/ApiUrls';
import { useNavigate } from 'react-router-dom';

interface FormData {
  email: string;
  password: string;
  confirmPassword: string;
  acceptTerms: boolean;
}

interface FormErrors {
  email?: string;
  password?: string;
  confirmPassword?: string;
  acceptTerms?: string;
}

const Agentsignup = () => {
  const [formData, setFormData] = useState<FormData>({
    email: '',
    password: '',
    confirmPassword: '',
    acceptTerms: false
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
  const [alertType, setAlertType] = useState<'success' | 'error'>('success');
    const navigate = useNavigate();
  
  // State for password visibility
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

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
const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
  e.preventDefault();

  const validationErrors = validateForm();

  if (Object.keys(validationErrors).length === 0) {
    try {
      const response = await fetch(`${BASE_URL}/api/users`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: formData.email,
          password: formData.password
        })
      });

      let data = {};
      try {
        data = await response.json();
      } catch {
        data = {};
      }

      console.log("Status:", response.status);
      console.log("Data:", data);

      if (response.ok) {
        showCustomAlert(
          (data as any).message || "User registered successfully!",
          "success"
        );

        // reset form
        setFormData({
          email: '',
          password: '',
          confirmPassword: '',
          acceptTerms: false
        });

             setTimeout(() => {
            navigate('/login');
          }, 2000); 

      } else {
        showCustomAlert(
          (data as any).error || "Something went wrong",
          "error"
        );
      }

    } catch (error) {
      console.error(error);
      showCustomAlert("Network error", "error");
    }
  } else {
    setErrors(validationErrors);
    showCustomAlert("Fix form errors", "error");
  }
};
  // Eye icon component
  const EyeIcon = ({ show, onClick }: { show: boolean; onClick: () => void }) => (
    <button
      type="button"
      onClick={onClick}
      style={{
        position: 'absolute',
        right: '12px',
        top: '50%',
        transform: 'translateY(-50%)',
        background: 'transparent',
        border: 'none',
        cursor: 'pointer',
        padding: 0,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: '#a0aec0',
        fontSize: '18px'
      }}
    >
      {show ? (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
          <circle cx="12" cy="12" r="3" />
        </svg>
      ) : (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24" />
          <line x1="1" y1="1" x2="23" y2="23" />
        </svg>
      )}
    </button>
  );

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

          {/* PASSWORD with Eye Icon */}
          <div style={{ marginBottom: '16px' }}>
            <label style={labelStyle}>Password</label>
            <div style={{ position: 'relative' }}>
              <input 
                type={showPassword ? "text" : "password"} 
                name="password" 
                value={formData.password} 
                onChange={handleChange} 
                placeholder="Create a password" 
                style={inputStyle(!!errors.password)} 
              />
              <EyeIcon show={showPassword} onClick={() => setShowPassword(!showPassword)} />
            </div>
            {errors.password && <p style={errorStyle}>{errors.password}</p>}
          </div>

          {/* CONFIRM PASSWORD with Eye Icon */}
          <div style={{ marginBottom: '16px' }}>
            <label style={labelStyle}>Confirm Password</label>
            <div style={{ position: 'relative' }}>
              <input 
                type={showConfirmPassword ? "text" : "password"} 
                name="confirmPassword" 
                value={formData.confirmPassword} 
                onChange={handleChange} 
                placeholder="Re-enter your password" 
                style={inputStyle(!!errors.confirmPassword)} 
              />
              <EyeIcon show={showConfirmPassword} onClick={() => setShowConfirmPassword(!showConfirmPassword)} />
            </div>
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
              href="/agentlogin" 
              style={{ 
                color: '#667eea', 
                textDecoration: 'none', 
                fontWeight: '600' 
              }}
            >
              Agent Sign in
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
  padding: '12px 40px 12px 14px',
  border: `2px solid ${error ? '#fc8181' : '#e2e8f0'}`,
  borderRadius: '10px',
  fontSize: '15px',
  boxSizing: 'border-box' as 'border-box',
  outline: 'none',
  transition: 'border-color 0.2s'
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
  cursor: 'pointer',
  transition: 'transform 0.2s, opacity 0.2s'
};

export default Agentsignup;