import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { User, Lock, ArrowRight, Eye, EyeOff, Cpu, CheckCircle2, XCircle } from 'lucide-react';
import { loginUser } from '../utils/auth';

export default function LoginPage({ onLogin }) {
  const navigate = useNavigate();
  const [form, setForm] = useState({ username: '', password: '' });
  const [showPass, setShowPass] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    setTimeout(() => {
      const result = loginUser({ username: form.username.trim(), password: form.password });
      if (result.success) {
        setSuccess(true);
        onLogin(result.user);
        setTimeout(() => navigate('/'), 800);
      } else {
        setError(result.error);
      }
      setLoading(false);
    }, 400);
  };

  return (
    <div className="min-h-screen bg-[#FAF9F5] flex items-center justify-center px-4 py-16 relative overflow-hidden">
      {/* Background organic shapes */}
      <div className="absolute top-0 left-0 w-96 h-96 rounded-full bg-gradient-to-br from-[#D1FAE5]/60 to-transparent blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-96 h-96 rounded-full bg-gradient-to-tl from-[#D1FAE5]/40 to-transparent blur-3xl pointer-events-none" />

      <div className="w-full max-w-md relative z-10">
        {/* Card */}
        <div className="bg-white rounded-3xl shadow-[0_20px_60px_rgba(20,30,24,0.1)] border border-[#E2EBE5] overflow-hidden">
          
          {/* Top green accent bar */}
          <div className="h-1.5 w-full bg-gradient-to-r from-[#95C798] via-[#386641] to-[#2C5234]" />
          
          <div className="p-8 sm:p-10 space-y-7">
            
            {/* Logo & Title */}
            <div className="text-center space-y-3">
              <div className="flex justify-center">
                <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#F3F8F4] border border-[#C9E2CE] text-[11px] font-bold text-[#2C5234]">
                  Accounts stay saved in this browser
                </span>
              </div>
              <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-[#E4F0E7] border border-[#C9E2CE] shadow-sm mb-1">
                <svg viewBox="0 0 48 48" className="w-8 h-8" fill="none">
                  <rect x="8" y="8" width="32" height="32" rx="6" fill="#F3F7F4" stroke="#386641" strokeWidth="2.5"/>
                  <path d="M12 4v4M18 4v4M24 4v4M30 4v4M36 4v4M12 40v4M18 40v4M24 40v4M30 40v4M36 40v4" stroke="#467652" strokeWidth="2.5" strokeLinecap="round"/>
                  <path d="M4 12h4M4 18h4M4 24h4M4 30h4M4 36h4M40 12h4M40 18h4M40 24h4M40 30h4M40 36h4" stroke="#467652" strokeWidth="2.5" strokeLinecap="round"/>
                  <path d="M16 18L24 30L32 18" stroke="#141E18" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round"/>
                  <circle cx="24" cy="30" r="2.2" fill="#467652"/>
                </svg>
              </div>
              <div>
                <h1 className="text-2xl font-extrabold text-[#141E18] tracking-tight">Welcome back to VIDS</h1>
                <p className="text-xs text-[#6D7E73] mt-1 font-medium">Sign in to access your learning dashboard</p>
              </div>
            </div>

            {/* Success State */}
            {success && (
              <div className="flex items-center gap-3 p-3.5 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold animate-in fade-in duration-150">
                <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-600" />
                <span>Login successful! Redirecting...</span>
              </div>
            )}

            {/* Error State */}
            {error && (
              <div className="flex items-center gap-3 p-3.5 rounded-xl bg-red-50 border border-red-200 text-red-800 text-xs font-bold animate-in fade-in duration-150">
                <XCircle className="w-4 h-4 shrink-0 text-red-500" />
                <span>{error}</span>
              </div>
            )}

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-5">
              {/* User ID */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-[#2F3E34] block">User ID</label>
                <div className="relative group">
                  <User className="w-4 h-4 text-[#96A59C] absolute left-3.5 top-1/2 -translate-y-1/2 group-focus-within:text-[#386641] transition-colors" />
                  <input
                    type="text"
                    value={form.username}
                    onChange={e => setForm(f => ({ ...f, username: e.target.value }))}
                    placeholder="Enter your user ID"
                    required
                    className="w-full pl-10 pr-4 py-3 rounded-xl bg-[#FAF9F5] border border-[#E2EBE5] focus:border-[#95C798] focus:ring-2 focus:ring-[#95C798]/30 outline-none text-sm text-[#141E18] font-medium placeholder:text-[#C2CEC6] transition-all"
                  />
                </div>
              </div>

              {/* Password */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-[#2F3E34] block">Password</label>
                <div className="relative group">
                  <Lock className="w-4 h-4 text-[#96A59C] absolute left-3.5 top-1/2 -translate-y-1/2 group-focus-within:text-[#386641] transition-colors" />
                  <input
                    type={showPass ? 'text' : 'password'}
                    value={form.password}
                    onChange={e => setForm(f => ({ ...f, password: e.target.value }))}
                    placeholder="Enter your password"
                    required
                    className="w-full pl-10 pr-11 py-3 rounded-xl bg-[#FAF9F5] border border-[#E2EBE5] focus:border-[#95C798] focus:ring-2 focus:ring-[#95C798]/30 outline-none text-sm text-[#141E18] font-medium placeholder:text-[#C2CEC6] transition-all"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPass(s => !s)}
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[#96A59C] hover:text-[#386641] transition-colors"
                  >
                    {showPass ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              {/* Submit */}
              <button
                type="submit"
                disabled={loading || success}
                className="w-full py-3.5 rounded-xl bg-[#386641] hover:bg-[#2C5234] active:scale-[0.98] text-white font-extrabold text-sm shadow-sm hover:shadow transition-all flex items-center justify-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed cursor-pointer mt-2"
              >
                {loading ? (
                  <span className="flex items-center gap-2">
                    <span className="w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin" />
                    Signing in...
                  </span>
                ) : (
                  <span className="flex items-center gap-2">
                    Sign In
                    <ArrowRight className="w-4 h-4" />
                  </span>
                )}
              </button>
            </form>

            {/* Register Link */}
            <div className="text-center pt-1">
              <p className="text-xs text-[#6D7E73]">
                New to VIDS?{' '}
                <Link to="/register" className="text-[#386641] font-bold hover:text-[#2C5234] hover:underline transition-colors">
                  Create an account →
                </Link>
              </p>
            </div>

            {/* Guest mode notice */}
            <div className="bg-[#FAF6F0] border border-[#E8DED2] rounded-xl p-3 text-center">
              <p className="text-[11px] text-[#6D7E73] font-medium">
                <span className="text-[#4A3A2A] font-bold">Guest mode:</span> You can also{' '}
                <Link to="/" className="text-[#386641] font-bold hover:underline">browse all topics</Link> without signing in.
              </p>
            </div>

          </div>
        </div>

        {/* Back link */}
        <div className="text-center mt-5">
          <Link to="/" className="text-xs text-[#6D7E73] hover:text-[#141E18] font-medium transition-colors">
            ← Back to VIDS Home
          </Link>
        </div>
      </div>
    </div>
  );
}
