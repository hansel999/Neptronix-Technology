import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { EyeIcon, EyeSlashIcon, ShieldCheckIcon, ArrowPathIcon } from '@heroicons/react/24/outline';
import { useAuth } from '../context/AuthContext';

const LoginPage: React.FC = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  // MFA state
  const [generatedOtp, setGeneratedOtp] = useState('');
  const [otpInput, setOtpInput] = useState(['', '', '', '', '', '']);
  const [otpError, setOtpError] = useState('');
  const [otpAttempts, setOtpAttempts] = useState(0);
  const [resendCooldown, setResendCooldown] = useState(0);
  const otpRefs = useRef<(HTMLInputElement | null)[]>([]);
  const cooldownRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const navigate = useNavigate();
  const { state, login, verifyMfa, clearError } = useAuth();

  useEffect(() => {
    clearError();
  }, []);

  // Navigate home once fully authenticated
  useEffect(() => {
    if (state.isAuthenticated) {
      navigate('/');
    }
  }, [state.isAuthenticated, navigate]);

  // Generate OTP when MFA becomes pending
  useEffect(() => {
    if (state.isMfaPending) {
      generateOtp();
    }
  }, [state.isMfaPending]);

  // Cleanup cooldown on unmount
  useEffect(() => {
    return () => { if (cooldownRef.current) clearInterval(cooldownRef.current); };
  }, []);

  const generateOtp = () => {
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    setGeneratedOtp(otp);
    setOtpInput(['', '', '', '', '', '']);
    setOtpError('');
    setResendCooldown(30);
    if (cooldownRef.current) clearInterval(cooldownRef.current);
    cooldownRef.current = setInterval(() => {
      setResendCooldown(prev => {
        if (prev <= 1) { clearInterval(cooldownRef.current!); return 0; }
        return prev - 1;
      });
    }, 1000);
    setTimeout(() => otpRefs.current[0]?.focus(), 100);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors(prev => ({ ...prev, [name]: '' }));
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.email) newErrors.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Email is invalid';
    if (!formData.password) newErrors.password = 'Password is required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;
    try {
      await login(formData.email, formData.password);
    } catch {}
  };

  const handleOtpChange = (index: number, value: string) => {
    if (!/^\d*$/.test(value)) return;
    const newOtp = [...otpInput];
    newOtp[index] = value.slice(-1);
    setOtpInput(newOtp);
    setOtpError('');
    if (value && index < 5) otpRefs.current[index + 1]?.focus();
    // Auto-verify when all 6 digits entered
    if (newOtp.every(d => d !== '') && newOtp.join('').length === 6) {
      handleVerifyOtp(newOtp.join(''));
    }
  };

  const handleOtpKeyDown = (index: number, e: React.KeyboardEvent) => {
    if (e.key === 'Backspace' && !otpInput[index] && index > 0) {
      otpRefs.current[index - 1]?.focus();
    }
  };

  const handleVerifyOtp = (otp?: string) => {
    const code = otp ?? otpInput.join('');
    if (code.length < 6) { setOtpError('Please enter all 6 digits'); return; }
    const ok = verifyMfa(code, generatedOtp);
    if (!ok) {
      const attempts = otpAttempts + 1;
      setOtpAttempts(attempts);
      setOtpInput(['', '', '', '', '', '']);
      otpRefs.current[0]?.focus();
      if (attempts >= 3) {
        setOtpError('Too many wrong attempts. A new code has been generated.');
        setOtpAttempts(0);
        generateOtp();
      } else {
        setOtpError(`Incorrect code. ${3 - attempts} attempt${3 - attempts === 1 ? '' : 's'} remaining.`);
      }
    }
  };

  // ── MFA Screen ──
  if (state.isMfaPending) {
    const maskedEmail = state.pendingUser?.email
      ? state.pendingUser.email.replace(/(.{2})(.*)(@.*)/, (_, a, b, c) => a + '*'.repeat(b.length) + c)
      : 'your email';

    return (
      <div className="min-h-screen bg-[#f1f3f6] flex items-center justify-center py-8 px-4">
        <div className="bg-white shadow-sm w-full max-w-3xl flex overflow-hidden rounded">

          {/* Left blue panel */}
          <div className="hidden md:flex flex-col justify-center items-center bg-[#2874f0] text-white p-10 w-2/5 gap-4">
            <ShieldCheckIcon className="h-16 w-16 text-white opacity-90" />
            <h2 className="text-2xl font-bold text-center">2-Step Verification</h2>
            <p className="text-blue-100 text-sm text-center leading-relaxed">
              We've sent a 6-digit verification code to keep your account secure.
            </p>
          </div>

          {/* Right OTP panel */}
          <div className="flex-1 p-8 flex flex-col justify-center">
            <div className="mb-6">
              <h3 className="text-xl font-bold text-gray-900 mb-1">Enter Verification Code</h3>
              <p className="text-sm text-gray-500">Sent to <span className="font-medium text-gray-700">{maskedEmail}</span></p>
            </div>

            {/* Demo OTP display */}
            <div className="bg-blue-50 border border-blue-200 rounded p-3 mb-6 flex items-center gap-3">
              <ShieldCheckIcon className="h-5 w-5 text-[#2874f0] flex-shrink-0" />
              <div>
                <p className="text-xs text-blue-600 font-semibold uppercase tracking-wide">Demo Mode — Your OTP</p>
                <p className="text-2xl font-bold text-[#2874f0] tracking-widest mt-0.5">{generatedOtp}</p>
              </div>
            </div>

            {/* 6-digit OTP input boxes */}
            <div className="flex gap-2 mb-4">
              {otpInput.map((digit, i) => (
                <input
                  key={i}
                  ref={el => { otpRefs.current[i] = el; }}
                  type="text" inputMode="numeric" maxLength={1}
                  value={digit}
                  onChange={e => handleOtpChange(i, e.target.value)}
                  onKeyDown={e => handleOtpKeyDown(i, e)}
                  className={`w-11 h-12 text-center text-lg font-bold border-2 rounded outline-none transition-colors ${
                    otpError ? 'border-red-400 bg-red-50' : digit ? 'border-[#2874f0] bg-blue-50' : 'border-gray-300 focus:border-[#2874f0]'
                  }`}
                />
              ))}
            </div>

            {otpError && (
              <p className="text-xs text-red-600 mb-3 flex items-center gap-1">
                <span className="inline-block w-1 h-1 rounded-full bg-red-500 mr-1" />{otpError}
              </p>
            )}

            <button
              onClick={() => handleVerifyOtp()}
              disabled={otpInput.some(d => d === '')}
              className="w-full py-3 bg-[#fb641b] hover:bg-[#e85d18] disabled:bg-gray-200 disabled:text-gray-400 text-white font-bold rounded text-sm transition-colors mb-4"
            >
              Verify & Login
            </button>

            <div className="flex items-center justify-between text-sm">
              <button
                onClick={generateOtp}
                disabled={resendCooldown > 0}
                className="flex items-center gap-1 text-[#2874f0] font-semibold disabled:text-gray-400 hover:underline disabled:no-underline"
              >
                <ArrowPathIcon className="h-4 w-4" />
                {resendCooldown > 0 ? `Resend in ${resendCooldown}s` : 'Resend Code'}
              </button>
              <button
                onClick={() => window.location.reload()}
                className="text-gray-400 hover:text-gray-600 text-xs"
              >
                Back to Login
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // ── Login Form ──
  return (
    <div className="min-h-screen bg-[#f1f3f6] flex items-center justify-center py-8 px-4">
      <div className="bg-white shadow-sm w-full max-w-3xl flex overflow-hidden rounded">

        {/* Left blue panel */}
        <div className="hidden md:flex flex-col justify-between bg-[#2874f0] text-white p-10 w-2/5">
          <div>
            <h2 className="text-3xl font-bold mb-3 leading-tight">Login</h2>
            <p className="text-blue-100 text-sm leading-relaxed">Get access to your Orders, Wishlist and Recommendations</p>
          </div>
          <img src="https://static-assets-web.flixcart.com/www/linchpin/fk-cp-zion/img/login_img_c4a81e.png" alt="Login" className="w-48 mx-auto" onError={e => (e.currentTarget.style.display = 'none')} />
        </div>

        {/* Right form panel */}
        <div className="flex-1 p-8">
          {state.error && (
            <div className="mb-4 bg-red-50 border border-red-200 rounded p-3 text-sm text-red-600">{state.error}</div>
          )}

          <form className="space-y-5" onSubmit={handleSubmit}>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email address</label>
              <input
                id="email" name="email" type="email" autoComplete="email" required
                value={formData.email} onChange={handleChange}
                placeholder="Enter Email"
                className={`w-full px-3 py-2.5 border-b-2 outline-none text-sm transition-colors ${
                  errors.email ? 'border-red-400' : 'border-gray-300 focus:border-[#2874f0]'
                }`}
              />
              {errors.email && <p className="mt-1 text-xs text-red-600">{errors.email}</p>}
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">Password</label>
              <div className="relative">
                <input
                  id="password" name="password" type={showPassword ? 'text' : 'password'}
                  autoComplete="current-password" required
                  value={formData.password} onChange={handleChange}
                  placeholder="Enter Password"
                  className={`w-full px-3 py-2.5 pr-10 border-b-2 outline-none text-sm transition-colors ${
                    errors.password ? 'border-red-400' : 'border-gray-300 focus:border-[#2874f0]'
                  }`}
                />
                <button type="button" className="absolute inset-y-0 right-0 pr-2 flex items-center" onClick={() => setShowPassword(!showPassword)}>
                  {showPassword ? <EyeSlashIcon className="h-5 w-5 text-gray-400" /> : <EyeIcon className="h-5 w-5 text-gray-400" />}
                </button>
              </div>
              {errors.password && <p className="mt-1 text-xs text-red-600">{errors.password}</p>}
            </div>

            <p className="text-xs text-gray-500">By continuing, you agree to Neptronix's Terms of Use and Privacy Policy.</p>

            <button
              type="submit" disabled={state.isLoading}
              className="w-full py-3 bg-[#fb641b] hover:bg-[#e85d18] text-white font-bold rounded text-sm transition-colors disabled:bg-gray-300"
            >
              {state.isLoading ? 'Signing in...' : 'Login'}
            </button>
          </form>

          <div className="mt-5 text-center">
            <p className="text-xs text-gray-400 mb-3">— Demo: use any email + password. Admin: admin@neptronix.com —</p>
            <Link to="/register" className="text-sm text-[#2874f0] font-semibold hover:underline">
              New to Neptronix? Create an account
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
