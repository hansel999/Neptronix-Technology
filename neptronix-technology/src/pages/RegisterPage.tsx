import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { EyeIcon, EyeSlashIcon } from '@heroicons/react/24/outline';
import { useAuth } from '../context/AuthContext';

const RegisterPage: React.FC = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    firstName: '',
    lastName: '',
    phone: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const navigate = useNavigate();
  const { state, register, clearError } = useAuth();

  useEffect(() => {
    clearError();
  }, []);

  // Redirect once auth state is committed
  useEffect(() => {
    if (state.isAuthenticated) {
      navigate('/');
    }
  }, [state.isAuthenticated, navigate]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.firstName) {
      newErrors.firstName = 'First name is required';
    }

    if (!formData.lastName) {
      newErrors.lastName = 'Last name is required';
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

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    try {
      await register({
        email: formData.email,
        password: formData.password,
        firstName: formData.firstName,
        lastName: formData.lastName,
        phone: formData.phone
      });
    } catch (error) {
      // Error is handled by the auth context
    }
  };

  return (
    <div className="min-h-screen bg-[#f1f3f6] flex items-center justify-center py-8 px-4">
      <div className="bg-white shadow-sm w-full max-w-3xl flex overflow-hidden rounded">

        {/* Left blue panel */}
        <div className="hidden md:flex flex-col justify-between bg-[#2874f0] text-white p-10 w-2/5">
          <div>
            <h2 className="text-3xl font-bold mb-3 leading-tight">Looks like you're new here!</h2>
            <p className="text-blue-100 text-sm leading-relaxed">Sign up with your details to get started</p>
          </div>
          <div className="space-y-3 mt-6">
            {['Track your orders', 'Save shipping addresses', 'Create wishlists', 'Faster checkout'].map(b => (
              <div key={b} className="flex items-center gap-2 text-sm text-blue-100">
                <span className="text-[#ffe500] font-bold">✓</span> {b}
              </div>
            ))}
          </div>
        </div>

        {/* Right form panel */}
        <div className="flex-1 p-8 overflow-y-auto max-h-screen">
          {state.error && (
            <div className="mb-4 bg-red-50 border border-red-200 rounded p-3 text-sm text-red-600">{state.error}</div>
          )}

          <form className="space-y-4" onSubmit={handleSubmit}>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">First Name</label>
                <input id="firstName" name="firstName" type="text" autoComplete="given-name" required
                  value={formData.firstName} onChange={handleChange} placeholder="First name"
                  className={`w-full px-3 py-2.5 border-b-2 outline-none text-sm transition-colors ${errors.firstName ? 'border-red-400' : 'border-gray-300 focus:border-[#2874f0]'}`}
                />
                {errors.firstName && <p className="mt-1 text-xs text-red-600">{errors.firstName}</p>}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Last Name</label>
                <input id="lastName" name="lastName" type="text" autoComplete="family-name" required
                  value={formData.lastName} onChange={handleChange} placeholder="Last name"
                  className={`w-full px-3 py-2.5 border-b-2 outline-none text-sm transition-colors ${errors.lastName ? 'border-red-400' : 'border-gray-300 focus:border-[#2874f0]'}`}
                />
                {errors.lastName && <p className="mt-1 text-xs text-red-600">{errors.lastName}</p>}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Email address</label>
              <input id="email" name="email" type="email" autoComplete="email" required
                value={formData.email} onChange={handleChange} placeholder="Enter Email"
                className={`w-full px-3 py-2.5 border-b-2 outline-none text-sm transition-colors ${errors.email ? 'border-red-400' : 'border-gray-300 focus:border-[#2874f0]'}`}
              />
              {errors.email && <p className="mt-1 text-xs text-red-600">{errors.email}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number <span className="text-gray-400 font-normal">(Optional)</span></label>
              <input id="phone" name="phone" type="tel" autoComplete="tel"
                value={formData.phone} onChange={handleChange} placeholder="+977-98XXXXXXXX"
                className="w-full px-3 py-2.5 border-b-2 border-gray-300 focus:border-[#2874f0] outline-none text-sm transition-colors"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
              <div className="relative">
                <input id="password" name="password" type={showPassword ? 'text' : 'password'} autoComplete="new-password" required
                  value={formData.password} onChange={handleChange} placeholder="Create Password"
                  className={`w-full px-3 py-2.5 pr-10 border-b-2 outline-none text-sm transition-colors ${errors.password ? 'border-red-400' : 'border-gray-300 focus:border-[#2874f0]'}`}
                />
                <button type="button" className="absolute inset-y-0 right-0 pr-2 flex items-center" onClick={() => setShowPassword(!showPassword)}>
                  {showPassword ? <EyeSlashIcon className="h-5 w-5 text-gray-400" /> : <EyeIcon className="h-5 w-5 text-gray-400" />}
                </button>
              </div>
              {errors.password && <p className="mt-1 text-xs text-red-600">{errors.password}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Confirm Password</label>
              <input id="confirmPassword" name="confirmPassword" type="password" autoComplete="new-password" required
                value={formData.confirmPassword} onChange={handleChange} placeholder="Confirm Password"
                className={`w-full px-3 py-2.5 border-b-2 outline-none text-sm transition-colors ${errors.confirmPassword ? 'border-red-400' : 'border-gray-300 focus:border-[#2874f0]'}`}
              />
              {errors.confirmPassword && <p className="mt-1 text-xs text-red-600">{errors.confirmPassword}</p>}
            </div>

            <p className="text-xs text-gray-500">By continuing, you agree to Neptronix's Terms of Use and Privacy Policy.</p>

            <button type="submit" disabled={state.isLoading}
              className="w-full py-3 bg-[#fb641b] hover:bg-[#e85d18] text-white font-bold rounded text-sm transition-colors disabled:bg-gray-300"
            >
              {state.isLoading ? 'Creating account...' : 'Create Account'}
            </button>
          </form>

          <div className="mt-5 text-center">
            <Link to="/login" className="text-sm text-[#2874f0] font-semibold hover:underline">
              Existing user? Login
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
