import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import toast from 'react-hot-toast';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login, actionLoading } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      toast.error('Please fill in all fields');
      return;
    }
    try {
      await login(email, password);
      toast.success('Welcome back!');
      navigate('/dashboard');
    } catch (err) {
      toast.error(err.response?.data?.message || err.message || 'Failed to login');
    }
  };

  return (
    <div className="min-h-screen bg-[#faf8ff] flex items-center justify-center p-4 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-[#dbe1ff] rounded-full blur-[120px] opacity-70"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-[500px] h-[500px] bg-[#eaddff] rounded-full blur-[120px] opacity-70"></div>

      <div className="w-full max-w-md relative z-10">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-black text-[#191b23] tracking-tight mb-2 flex items-center justify-center gap-2">
            DecisionHub
          </h1>
          <p className="text-[#434655]">Make better choices, together.</p>
        </div>

        <div className="bg-white/70 backdrop-blur-xl border border-white/20 shadow-[0_8px_30px_rgba(37,99,235,0.08)] rounded-[24px] p-8">
          <h2 className="text-2xl font-bold text-[#191b23] mb-6">Sign In</h2>
          
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-sm font-bold text-[#434655] mb-2">Email Address</label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-[#737686] group-focus-within:text-[#004ac6] transition-colors">
                  <span className="material-symbols-outlined text-[20px]">mail</span>
                </div>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-[#ffffff] border border-[#c3c6d7] rounded-xl py-3 pl-10 pr-4 text-[#191b23] placeholder-[#737686] focus:outline-none focus:border-[#004ac6] focus:ring-2 focus:ring-[#dbe1ff] transition-all font-medium"
                  placeholder="you@example.com"
                />
              </div>
            </div>

            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="block text-sm font-bold text-[#434655]">Password</label>
                <a href="#" className="text-xs text-[#004ac6] hover:text-[#4338d9] transition-colors font-bold">Forgot password?</a>
              </div>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-[#737686] group-focus-within:text-[#004ac6] transition-colors">
                  <span className="material-symbols-outlined text-[20px]">lock</span>
                </div>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-[#ffffff] border border-[#c3c6d7] rounded-xl py-3 pl-10 pr-4 text-[#191b23] placeholder-[#737686] focus:outline-none focus:border-[#004ac6] focus:ring-2 focus:ring-[#dbe1ff] transition-all font-medium"
                  placeholder="••••••••"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={actionLoading}
              style={{ background: 'linear-gradient(135deg, #4338d9 0%, #004ac6 100%)' }}
              className="w-full py-3.5 mt-4 rounded-xl text-white font-bold text-base hover:-translate-y-[1px] shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {actionLoading ? (
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
              ) : (
                <>
                  Sign In <span className="material-symbols-outlined text-[20px]">login</span>
                </>
              )}
            </button>
          </form>

          <div className="mt-8 text-center text-sm text-[#434655] font-medium">
            Don't have an account?{' '}
            <Link to="/register" className="text-[#004ac6] hover:text-[#4338d9] font-bold transition-colors inline-flex items-center gap-1">
              Create one <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
