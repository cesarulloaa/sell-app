import React, { useState } from 'react';
import { IconEye } from '../../../components/icons';
import './signup.css';
import type { SignupFormData, FormErrors } from './signup.types';

// Icons used specifically for the signup page
const IconArrowLeft = (props: React.SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M19 12H5"/><path d="M12 19l-7-7 7-7"/>
  </svg>
);

const IconStore = (props: React.SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="m2 7 4.41-4.41A2 2 0 0 1 7.83 2h8.34a2 2 0 0 1 1.42.59L22 7"/>
    <path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8"/>
    <path d="M15 22v-4a2 2 0 0 0-2-2h-2a2 2 0 0 0-2 2v4"/>
    <path d="M2 7h20"/><path d="M22 7v3a2 2 0 0 1-2 2v0a2.7 2.7 0 0 1-1.59-.63.7.7 0 0 0-.82 0A2.7 2.7 0 0 1 16 12a2.7 2.7 0 0 1-1.59-.63.7.7 0 0 0-.82 0A2.7 2.7 0 0 1 12 12a2.7 2.7 0 0 1-1.59-.63.7.7 0 0 0-.82 0A2.7 2.7 0 0 1 8 12a2.7 2.7 0 0 1-1.59-.63.7.7 0 0 0-.82 0A2.7 2.7 0 0 1 4 12v0a2 2 0 0 1-2-2V7"/>
  </svg>
);

const IconMail = (props: React.SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <rect x="2" y="4" width="20" height="16" rx="2" ry="2"/>
    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>
  </svg>
);

const IconEyeOff = (props: React.SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M9.88 9.88a3 3 0 1 0 4.24 4.24"/>
    <path d="M10.73 5.08A10.43 10.43 0 0 1 12 5c7 0 10 7 10 7a13.16 13.16 0 0 1-1.67 2.68"/>
    <path d="M6.61 6.61A13.526 13.526 0 0 0 2 12s3 7 10 7a9.74 9.74 0 0 0 5.39-1.61"/>
    <line x1="2" y1="2" x2="22" y2="22"/>
  </svg>
);

  // Reusable sub-components to keep code clean and maintain consistency
  const InputFieldWrapper = ({ 
    label, 
    id, 
    error, 
    icon, 
    children, 
    helper 
  }: { 
    label: string, 
    id: string, 
    error?: string, 
    icon?: React.ReactNode, 
    children: React.ReactNode, 
    helper?: string 
  }) => (
    <div className="form-group">
      <label htmlFor={id} className="input-label">{label}</label>
      <div className={`input-wrapper ${error ? 'is-error' : ''}`}>
        {children}
        {icon && <div className="input-icon">{icon}</div>}
      </div>
      {error ? (
        <span className="error-text">{error}</span>
      ) : helper ? (
        <span className="input-helper">{helper}</span>
      ) : null}
    </div>
  );

export const Signup: React.FC = () => {
  const [formData, setFormData] = useState<SignupFormData>({
    businessName: '',
    email: '',
    password: '',
    countryCode: '+1',
    phoneNumber: ''
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);


  const validate = (): boolean => {
    const newErrors: FormErrors = {};
    let isValid = true;

    if (!formData.businessName.trim()) {
      newErrors.businessName = 'Business Name is required';
      isValid = false;
    }

    if (!formData.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
      isValid = false;
    }

    if (!formData.password || formData.password.length < 8) {
      newErrors.password = 'Must be at least 8 characters long';
      isValid = false;
    }

    if (!formData.countryCode.trim() || !formData.phoneNumber.trim()) {
      newErrors.phoneNumber = 'Complete WhatsApp number is required';
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    // This is a common pattern in React to update a specific field in the state
    setFormData(prev => ({ ...prev, [name]: value }));
    // Clear error for field upon typing
    if (errors[name as keyof FormErrors]) {
      setErrors(prev => ({ ...prev, [name]: undefined }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validate()) {
      setIsSubmitting(true);
      // Simulate form submission visually (per instructions: "NO conectar backend")
      setTimeout(() => {
        setIsSubmitting(false);
        console.log('Form Submitted!', formData);
      }, 1000);
    }
  };

  return (
    <div className="signup-page">
      {/* 1. Header */}
      <header className="signup-header">
        <button 
          className="signup-back-btn" 
          aria-label="Go back"
          onClick={() => window.history.back()}
        >
          <IconArrowLeft />
        </button>
        <div className="signup-header-title">Vendor Registration</div>
      </header>

      <div className="signup-content">
        {/* 2. Hero Section */}
        <div className="signup-hero">
          <h1 className="signup-title">Start selling on WhatsApp</h1>
          <p className="signup-subtitle">Create your online catalog in seconds.</p>
        </div>

        {/* 3. Form */}
        <form className="signup-form" onSubmit={handleSubmit} noValidate>
          <InputFieldWrapper 
            label="Business Name" 
            id="businessName" 
            error={errors.businessName}
            icon={<IconStore />}
          >
            <input 
              id="businessName"
              name="businessName"
              type="text" 
              className="input-field" 
              placeholder="Enter your business name"
              value={formData.businessName}
              onChange={handleChange}
            />
          </InputFieldWrapper>

          <InputFieldWrapper 
            label="Email Address" 
            id="email" 
            error={errors.email}
            icon={<IconMail />}
          >
            <input 
              id="email"
              name="email"
              type="email" 
              className="input-field" 
              placeholder="name@business.com"
              value={formData.email}
              onChange={handleChange}
            />
          </InputFieldWrapper>

          <InputFieldWrapper 
            label="Password" 
            id="password" 
            error={errors.password}
            helper="Must be at least 8 characters"
            icon={
              <button 
                type="button" 
                className="icon-btn" 
                onClick={() => setShowPassword(!showPassword)}
                aria-label={showPassword ? 'Hide password' : 'Show password'}
              >
                {showPassword ? <IconEyeOff /> : <IconEye width={20} height={20} />}
              </button>
            }
          >
            <input 
              id="password"
              name="password"
              type={showPassword ? "text" : "password"} 
              className="input-field" 
              placeholder="Create a password"
              value={formData.password}
              onChange={handleChange}
            />
          </InputFieldWrapper>

          <div className="form-group">
            <label htmlFor="countryCode" className="input-label">WhatsApp Number</label>
            <div className="phone-input-group">
              <div className={`input-wrapper phone-country ${errors.phoneNumber ? 'is-error' : ''}`}>
                <input 
                  id="countryCode"
                  name="countryCode"
                  type="text" 
                  className="input-field" 
                  placeholder="+1"
                  value={formData.countryCode}
                  onChange={handleChange}
                />
              </div>
              <div className={`input-wrapper phone-number ${errors.phoneNumber ? 'is-error' : ''}`}>
                <input 
                  id="phoneNumber"
                  name="phoneNumber"
                  type="tel" 
                  className="input-field" 
                  placeholder="(555) 000-0000"
                  value={formData.phoneNumber}
                  onChange={handleChange}
                />
              </div>
            </div>
            {errors.phoneNumber && <span className="error-text">{errors.phoneNumber}</span>}
          </div>

          {/* 4. Main CTA */}
          <button 
            type="submit" 
            className="btn-primary" 
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Creating...' : 'Create My Catalog'}
          </button>
        </form>

        {/* 5. Footer */}
        <div className="signup-footer">
          Already have an account? 
          <a href="/auth/login" className="signup-link">Log in</a>
        </div>
      </div>
    </div>
  );
};

export default Signup;
