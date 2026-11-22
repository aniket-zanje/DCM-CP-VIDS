import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { User, Lock, ArrowRight, Eye, EyeOff, UserPlus, CheckCircle2, XCircle } from 'lucide-react';
import { registerUser } from '../utils/auth';

export default function RegisterPage() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ fullName: '', username: '', password: '', confirm: '' });
  const [showPass, setShowPass] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    if (!form.fullName.trim()) return setError('Please enter your full name.');
    if (form.password !== form.confirm) return setError('Passwords do not match.');
    if (form.password.length < 6) return setError('Password must be at least 6 characters.');
    setLoading(true);
    setTimeout(() => {
      const result = registerUser({ fullName: form.fullName, username: form.username.trim(), password: form.password });
      if (result.success) {
        setSuccess(true);
        setTimeout(() => navigate('/login'), 1200);
      } else {
        setError(result.error);
      }
      setLoading(false);
    }, 400);
  };

  const passwordStrength = form.password.length === 0 ? 0 : form.password.length < 6 ? 1 : form.password.length < 10 ? 2 : 3;
  const strengthColors = ['', 'bg-red-400', 'bg-amber-400', 'bg-emerald-500'];
  const strengthLabels = ['', 'Weak', 'Medium', 'Strong'];

  return (
    <div className="min-h-screen bg-[#FAF9F5] flex items-center justify-center px-4 py-16 relative overflow-hidden">
      {/* Background */}
      <div className="absolute top-0 right-0 w-96 h-96 rounded-full bg-gradient-to-bl from-[#D1FAE5]/60 to-transparent blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-96 h-96 rounded-full bg-gradient-to-tr from-[#D1FAE5]/40 to-transparent blur-3xl pointer-events-none" />

      <div className="w-full max-w-md relative z-10">
        <div className="bg-white rounded-3xl shadow-[0_20px_60px_rgba(20,30,24,0.1)] border border-[#E2EBE5] overflow-hidden">
          
          {/* Top accent bar */}
          <div className="h-1.5 w-full bg-gradient-to-r from-[#95C798] via-[#386641] to-[#2C5234]" />
          
          <div className="p-8 sm:p-10 space-y-6">
            
            {/* Header */}
            <div className="text-center space-y-2">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-[#E4F0E7] border border-[#C9E2CE] shadow-sm mb-1">
                <UserPlus className="w-6 h-6 text-[#386641]" />
              </div>
              <h1 className="text-2xl font-extrabold text-[#141E18] tracking-tight">Create Your Account</h1>
              <p className="text-xs text-[#6D7E73] font-medium">Join VIDS – Visual Interactive Digital Systems</p>
            </div>

            {/* Success */}
            {success && (
              <div className="flex items-center gap-3 p-3.5 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold animate-in fade-in">
                <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-600" />
                <span>Account created! Redirecting to login...</span>
              </div>
            )}

            {/* Error */}
            {error && (
              <div className="flex items-center gap-3 p-3.5 rounded-xl bg-red-50 border border-red-200 text-red-800 text-xs font-bold animate-in fade-in">
                <XCircle className="w-4 h-4 shrink-0 text-red-500" />
                <span>{error}</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Full Name */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-[#2F3E34] block">Full Name</label>
                <div className="relative group">
                  <User className="w-4 h-4 text-[#96A59C] absolute left-3.5 top-1/2 -translate-y-1/2 group-focus-within:text-[#386641] transition-colors" />
                  <input
                    type="text"
                    value={form.fullName}
                    onChange={e => setForm(f => ({ ...f, fullName: e.target.value }))}
                    placeholder="e.g. Priya Sharma"
                    required
                    className="w-full pl-10 pr-4 py-3 rounded-xl bg-[#FAF9F5] border border-[#E2EBE5] focus:border-[#95C798] focus:ring-2 focus:ring-[#95C798]/30 outline-none text-sm text-[#141E18] font-medium placeholder:text-[#C2CEC6] transition-all"
                  />
                </div>
              </div>

              {/* Username */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-[#2F3E34] block">User ID</label>
                <div className="relative group">
                  <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#96A59C] group-focus-within:text-[#386641] font-mono text-sm font-bold transition-colors">@</span>
                  <input
                    type="text"
                    value={form.username}
                    onChange={e => setForm(f => ({ ...f, username: e.target.value.replace(/\s/g, '') }))}
                    placeholder="your_unique_id"
                    required
                    minLength={3}
                    className="w-full pl-9 pr-4 py-3 rounded-xl bg-[#FAF9F5] border border-[#E2EBE5] focus:border-[#95C798] focus:ring-2 focus:ring-[#95C798]/30 outline-none text-sm text-[#141E18] font-medium placeholder:text-[#C2CEC6] transition-all"
                  />
                </div>
                <p className="text-[11px] text-[#96A59C] font-medium pl-1">Min. 3 characters, no spaces</p>
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
                    placeholder="Min. 6 characters"
                    required
                    className="w-full pl-10 pr-11 py-3 rounded-xl bg-[#FAF9F5] border border-[#E2EBE5] focus:border-[#95C798] focus:ring-2 focus:ring-[#95C798]/30 outline-none text-sm text-[#141E18] font-medium placeholder:text-[#C2CEC6] transition-all"
                  />
                  <button type="button" onClick={() => setShowPass(s => !s)} className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[#96A59C] hover:text-[#386641] transition-colors">
                    {showPass ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
                {/* Strength bar */}
                {form.password.length > 0 && (
                  <div className="flex items-center gap-2 pl-1">
                    <div className="flex gap-1 flex-1">
                      {[1,2,3].map(i => (
                        <div key={i} className={`h-1.5 flex-1 rounded-full transition-all duration-300 ${i <= passwordStrength ? strengthColors[passwordStrength] : 'bg-[#E2EBE5]'}`} />
                      ))}
                    </div>
                    <span className="text-[11px] font-bold" style={{ color: passwordStrength === 1 ? '#F87171' : passwordStrength === 2 ? '#FBBF24' : '#10B981' }}>
                      {strengthLabels[passwordStrength]}
                    </span>
                  </div>
                )}
              </div>

              {/* Confirm Password */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-[#2F3E34] block">Confirm Password</label>
                <div className="relative group">
                  <Lock className="w-4 h-4 text-[#96A59C] absolute left-3.5 top-1/2 -translate-y-1/2 group-focus-within:text-[#386641] transition-colors" />
                  <input
                    type="password"
                    value={form.confirm}
                    onChange={e => setForm(f => ({ ...f, confirm: e.target.value }))}
                    placeholder="Re-enter password"
                    required
                    className={`w-full pl-10 pr-4 py-3 rounded-xl bg-[#FAF9F5] border outline-none text-sm text-[#141E18] font-medium placeholder:text-[#C2CEC6] transition-all focus:ring-2 ${
                      form.confirm && form.password !== form.confirm
                        ? 'border-red-300 focus:border-red-400 focus:ring-red-200/40'
                        : form.confirm && form.password === form.confirm
                        ? 'border-emerald-300 focus:border-emerald-400 focus:ring-emerald-200/40'
                        : 'border-[#E2EBE5] focus:border-[#95C798] focus:ring-[#95C798]/30'
                    }`}
                  />
                  {form.confirm && (
                    <span className="absolute right-3.5 top-1/2 -translate-y-1/2">
                      {form.password === form.confirm
                        ? <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                        : <XCircle className="w-4 h-4 text-red-400" />}
                    </span>
                  )}
                </div>
              </div>

              {/* Submit */}
              <button
                type="submit"
                disabled={loading || success}
                className="w-full py-3.5 rounded-xl bg-[#386641] hover:bg-[#2C5234] active:scale-[0.98] text-white font-extrabold text-sm shadow-sm hover:shadow transition-all flex items-center justify-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed cursor-pointer mt-1"
              >
                {loading ? (
                  <span className="flex items-center gap-2">
                    <span className="w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin" />
                    Creating account...
                  </span>
                ) : (
                  <span className="flex items-center gap-2">
                    Create Account
                    <ArrowRight className="w-4 h-4" />
                  </span>
                )}
              </button>
            </form>

            <div className="text-center pt-1">
              <p className="text-xs text-[#6D7E73]">
                Already have an account?{' '}
                <Link to="/login" className="text-[#386641] font-bold hover:text-[#2C5234] hover:underline transition-colors">
                  Sign in →
                </Link>
              </p>
            </div>
          </div>
        </div>

        <div className="text-center mt-5">
          <Link to="/" className="text-xs text-[#6D7E73] hover:text-[#141E18] font-medium transition-colors">
            ← Back to VIDS Home
          </Link>
        </div>
      </div>
    </div>
  );
}
