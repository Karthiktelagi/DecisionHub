import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import toast from 'react-hot-toast';

export default function RegisterPage() {
  const [formData, setFormData] = useState({
    name: '',
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
    role: 'user'
  });
  const [acceptedTerms, setAcceptedTerms] = useState(false);
  const { register, actionLoading } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.username || !formData.email || !formData.password) {
      toast.error('Please fill in all required fields');
      return;
    }
    if (formData.password !== formData.confirmPassword) {
      toast.error('Passwords do not match');
      return;
    }
    if (!acceptedTerms) {
      toast.error('Please accept the Terms of Service');
      return;
    }
    try {
      await register(formData);
      toast.success('Registration successful!');
      navigate('/dashboard');
    } catch (err) {
      toast.error(err.response?.data?.message || err.message || 'Failed to register');
    }
  };

  return (
    <div className="min-h-screen bg-[#faf8ff] flex items-center justify-center p-4 relative overflow-hidden py-12">
      <div className="absolute top-[20%] right-[-10%] w-[500px] h-[500px] bg-[#eaddff] rounded-full blur-[120px] opacity-70"></div>
      <div className="absolute bottom-[10%] left-[-10%] w-[500px] h-[500px] bg-[#dbe1ff] rounded-full blur-[120px] opacity-70"></div>

      <div className="w-full max-w-lg relative z-10">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-black text-[#191b23] tracking-tight mb-2">
            Join DecisionHub
          </h1>
          <p className="text-[#434655]">Start making collaborative decisions today.</p>
        </div>

        <div className="bg-white/70 backdrop-blur-xl border border-white/20 shadow-[0_8px_30px_rgba(37,99,235,0.08)] rounded-[24px] p-8">
          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="grid grid-cols-2 gap-5">
              <div>
                <label className="block text-sm font-bold text-[#434655] mb-2">Full Name</label>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-[#737686] group-focus-within:text-[#004ac6] transition-colors">
                    <span className="material-symbols-outlined text-[20px]">person</span>
                  </div>
                  <input
                    type="text" name="name" value={formData.name} onChange={handleChange}
                    className="w-full bg-[#ffffff] border border-[#c3c6d7] rounded-xl py-3 pl-10 pr-3 text-sm text-[#191b23] placeholder-[#737686] focus:outline-none focus:border-[#004ac6] focus:ring-2 focus:ring-[#dbe1ff] transition-all font-medium"
                    placeholder="John Doe"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-bold text-[#434655] mb-2">Username</label>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-[#737686] group-focus-within:text-[#004ac6] transition-colors">
                    <span className="material-symbols-outlined text-[20px]">alternate_email</span>
                  </div>
                  <input
                    type="text" name="username" value={formData.username} onChange={handleChange}
                    className="w-full bg-[#ffffff] border border-[#c3c6d7] rounded-xl py-3 pl-10 pr-3 text-sm text-[#191b23] placeholder-[#737686] focus:outline-none focus:border-[#004ac6] focus:ring-2 focus:ring-[#dbe1ff] transition-all font-medium"
                    placeholder="johndoe"
                  />
                </div>
              </div>
            </div>

            <div>
              <label className="block text-sm font-bold text-[#434655] mb-2">Email Address</label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-[#737686] group-focus-within:text-[#004ac6] transition-colors">
                  <span className="material-symbols-outlined text-[20px]">mail</span>
                </div>
                <input
                  type="email" name="email" value={formData.email} onChange={handleChange}
                  className="w-full bg-[#ffffff] border border-[#c3c6d7] rounded-xl py-3 pl-10 pr-3 text-sm text-[#191b23] placeholder-[#737686] focus:outline-none focus:border-[#004ac6] focus:ring-2 focus:ring-[#dbe1ff] transition-all font-medium"
                  placeholder="you@example.com"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-5">
              <div>
                <label className="block text-sm font-bold text-[#434655] mb-2">Password</label>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-[#737686] group-focus-within:text-[#004ac6] transition-colors">
                    <span className="material-symbols-outlined text-[20px]">lock</span>
                  </div>
                  <input
                    type="password" name="password" value={formData.password} onChange={handleChange}
                    className="w-full bg-[#ffffff] border border-[#c3c6d7] rounded-xl py-3 pl-10 pr-3 text-sm text-[#191b23] placeholder-[#737686] focus:outline-none focus:border-[#004ac6] focus:ring-2 focus:ring-[#dbe1ff] transition-all font-medium"
                    placeholder="••••••••"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-bold text-[#434655] mb-2">Confirm</label>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-[#737686] group-focus-within:text-[#004ac6] transition-colors">
                    <span className="material-symbols-outlined text-[20px]">lock</span>
                  </div>
                  <input
                    type="password" name="confirmPassword" value={formData.confirmPassword} onChange={handleChange}
                    className="w-full bg-[#ffffff] border border-[#c3c6d7] rounded-xl py-3 pl-10 pr-3 text-sm text-[#191b23] placeholder-[#737686] focus:outline-none focus:border-[#004ac6] focus:ring-2 focus:ring-[#dbe1ff] transition-all font-medium"
                    placeholder="••••••••"
                  />
                </div>
              </div>
            </div>

            <div className="pt-2">
              <label className="block text-sm font-bold text-[#434655] mb-3">Select Role</label>
              <div className="flex gap-4">
                <label className={`flex-1 flex items-center justify-center gap-2 p-3 rounded-xl border-2 cursor-pointer transition-all ${formData.role === 'user' ? 'border-[#004ac6] bg-[#dbe1ff]/30 text-[#004ac6]' : 'border-[#e1e2ed] bg-white text-[#434655] hover:border-[#c3c6d7]'}`}>
                  <input type="radio" name="role" value="user" checked={formData.role === 'user'} onChange={handleChange} className="hidden" />
                  <span className="material-symbols-outlined">person</span> <span className="font-bold text-sm">User</span>
                </label>
                <label className={`flex-1 flex items-center justify-center gap-2 p-3 rounded-xl border-2 cursor-pointer transition-all ${formData.role === 'moderator' ? 'border-[#712ae2] bg-[#eaddff]/30 text-[#712ae2]' : 'border-[#e1e2ed] bg-white text-[#434655] hover:border-[#c3c6d7]'}`}>
                  <input type="radio" name="role" value="moderator" checked={formData.role === 'moderator'} onChange={handleChange} className="hidden" />
                  <span className="material-symbols-outlined">shield</span> <span className="font-bold text-sm">Moderator</span>
                </label>
              </div>
            </div>

            <div className="pt-2 flex items-center gap-3">
              <input 
                type="checkbox" id="terms" checked={acceptedTerms} onChange={(e) => setAcceptedTerms(e.target.checked)}
                className="w-5 h-5 rounded border-[#c3c6d7] text-[#004ac6] focus:ring-[#004ac6]" 
              />
              <label htmlFor="terms" className="text-sm font-medium text-[#434655]">
                I agree to the <a href="#" className="text-[#004ac6] hover:underline font-bold">Terms of Service</a> and <a href="#" className="text-[#004ac6] hover:underline font-bold">Privacy Policy</a>
              </label>
            </div>

            <button
              type="submit" disabled={actionLoading}
              style={{ background: 'linear-gradient(135deg, #4338d9 0%, #004ac6 100%)' }}
              className="w-full py-3.5 mt-4 rounded-xl text-white font-bold text-base hover:-translate-y-[1px] shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {actionLoading ? (
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
              ) : (
                <>
                  Create Account <span className="material-symbols-outlined text-[20px]">person_add</span>
                </>
              )}
            </button>
          </form>

          <div className="mt-8 text-center text-sm text-[#434655] font-medium">
            Already have an account?{' '}
            <Link to="/login" className="text-[#004ac6] hover:text-[#4338d9] font-bold transition-colors">
              Sign In
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
