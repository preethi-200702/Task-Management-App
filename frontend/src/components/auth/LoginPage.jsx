import { useState } from 'react';
import { Sprout, Mail, Lock, Eye, EyeOff, AlertCircle, ArrowLeft, Sparkles } from '../common/Icons';
import { useTheme } from '../../context/ThemeContext';
import { useAuth } from '../../context/AuthContext';

export default function LoginPage({ onGoToRegister, onGoToWelcome }) {
  const { accentConfig } = useTheme();
  const { login, loading, error, clearError } = useAuth();

  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const [showPassword, setShowPassword] = useState(false);
  const [formErrors, setFormErrors] = useState({});

  const validate = () => {
    const errors = {};
    if (!formData.email.trim()) {
      errors.email = 'Please enter your email';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = 'Please enter a valid email address';
    }

    if (!formData.password) {
      errors.password = 'Please enter your password';
    }
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    clearError();
    if (!validate()) return;

    await login(formData.email.trim(), formData.password);
  };

  return (
    <div className="min-h-screen bg-[#fdfbf7] dark:bg-[#17151e] text-slate-800 dark:text-amber-50 flex items-center justify-center p-4 transition-colors font-sans">
      <div className="w-full max-w-md">
        {/* Back Link */}
        <button
          onClick={onGoToWelcome}
          className="inline-flex items-center gap-2 text-sm text-slate-500 dark:text-purple-300 hover:text-slate-800 dark:hover:text-amber-100 mb-6 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Welcome Page</span>
        </button>

        {/* Stationery Card Container */}
        <div className="bg-white dark:bg-[#1e1b29] rounded-3xl shadow-xl border-2 border-amber-100/80 dark:border-purple-900/40 p-7 sm:p-8 relative overflow-hidden">
          {/* Header */}
          <div className="flex flex-col items-center text-center mb-6">
            <div className={`w-14 h-14 rounded-2xl flex items-center justify-center ${accentConfig.softBg} ${accentConfig.textColor} shadow-sm mb-3.5`}>
              <Sprout className="w-7 h-7" />
            </div>
            <h2 className="text-2xl font-heading font-bold text-slate-900 dark:text-amber-100">
              Welcome Back to BloomTask
            </h2>
            <p className="text-sm text-slate-500 dark:text-purple-300 font-hand text-base mt-1">
              Step into your cozy garden desk & see what has bloomed ✨
            </p>
          </div>

          {/* Backend Error Alert */}
          {error && (
            <div className="mb-5 p-3.5 rounded-2xl bg-rose-50 dark:bg-rose-950/60 border border-rose-200 dark:border-rose-900 text-rose-700 dark:text-rose-300 text-xs sm:text-sm flex items-start gap-2.5">
              <AlertCircle className="w-5 h-5 shrink-0 mt-0.5 text-rose-500" />
              <span>{error}</span>
            </div>
          )}

          {/* Login Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Email */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-amber-200/90 mb-1.5 flex items-center gap-1.5">
                <Mail className="w-3.5 h-3.5 text-slate-400" />
                <span>Email Address</span>
              </label>
              <input
                type="email"
                placeholder="you@example.com"
                value={formData.email}
                onChange={(e) => {
                  setFormData({ ...formData, email: e.target.value });
                  if (formErrors.email) setFormErrors({ ...formErrors, email: null });
                }}
                className={`w-full px-4 py-2.5 text-sm rounded-2xl border bg-amber-50/20 dark:bg-slate-900/60 text-slate-900 dark:text-amber-50 placeholder-slate-400 focus:outline-hidden transition-all ${
                  formErrors.email
                    ? 'border-rose-400 focus:ring-2 focus:ring-rose-400/20'
                    : `border-amber-200/70 dark:border-purple-800/50 focus:ring-2 ${accentConfig.ringClass}`
                }`}
              />
              {formErrors.email && (
                <p className="text-xs text-rose-500 mt-1 flex items-center gap-1">
                  <AlertCircle className="w-3 h-3" />
                  {formErrors.email}
                </p>
              )}
            </div>

            {/* Password */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-amber-200/90 mb-1.5 flex items-center gap-1.5">
                <Lock className="w-3.5 h-3.5 text-slate-400" />
                <span>Password</span>
              </label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  placeholder="••••••••"
                  value={formData.password}
                  onChange={(e) => {
                    setFormData({ ...formData, password: e.target.value });
                    if (formErrors.password) setFormErrors({ ...formErrors, password: null });
                  }}
                  className={`w-full pl-4 pr-11 py-2.5 text-sm rounded-2xl border bg-amber-50/20 dark:bg-slate-900/60 text-slate-900 dark:text-amber-50 placeholder-slate-400 focus:outline-hidden transition-all ${
                    formErrors.password
                      ? 'border-rose-400 focus:ring-2 focus:ring-rose-400/20'
                      : `border-amber-200/70 dark:border-purple-800/50 focus:ring-2 ${accentConfig.ringClass}`
                  }`}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                  className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-slate-400 hover:text-slate-600 dark:hover:text-amber-200"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
              {formErrors.password && (
                <p className="text-xs text-rose-500 mt-1 flex items-center gap-1">
                  <AlertCircle className="w-3 h-3" />
                  {formErrors.password}
                </p>
              )}
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className={`w-full mt-2 py-3 rounded-2xl text-sm font-bold shadow-md transition-all hover:scale-101 flex items-center justify-center gap-2 ${accentConfig.btnClass} ${
                loading ? 'opacity-70 cursor-not-allowed' : ''
              }`}
            >
              {loading ? (
                <>
                  <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
                  <span>Opening Workspace...</span>
                </>
              ) : (
                <>
                  <Sprout className="w-4 h-4" />
                  <span>Enter My Garden Desk</span>
                </>
              )}
            </button>
          </form>

          {/* Divider */}
          <div className="my-6 flex items-center gap-3">
            <div className="flex-1 h-px bg-amber-100 dark:bg-purple-900/40" />
            <span className="text-xs text-slate-400 font-hand text-base">or</span>
            <div className="flex-1 h-px bg-amber-100 dark:bg-purple-900/40" />
          </div>

          {/* Switch to Register */}
          <div className="text-center">
            <p className="text-xs text-slate-600 dark:text-purple-200/80">
              New to BloomTask?{' '}
              <button
                type="button"
                onClick={onGoToRegister}
                className="font-bold underline hover:opacity-80 transition-opacity ml-1"
                style={{ color: accentConfig.colorHex }}
              >
                Create your cozy workspace 🌱
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
