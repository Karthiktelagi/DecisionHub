import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { generateAvatar } from '../utils/helpers';

const Topbar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { user } = useAuth();
  
  const path = location.pathname.split('/')[1] || 'dashboard';
  const title = path.charAt(0).toUpperCase() + path.slice(1);
  
  const userInfo = user || { name: 'Guest User', role: 'Admin' };
  const avatar = generateAvatar(userInfo.name);

  return (
    <header className="h-20 glass border-x-0 border-t-0 rounded-none border-b border-white/40 px-4 md:px-8 flex items-center justify-between sticky top-0 z-20 md:pl-8 pl-16">
      <div className="flex items-center gap-2 animate-slideInRight">
        <h2 className="text-xl font-semibold text-on-surface">{title}</h2>
        {location.pathname.split('/').length > 2 && (
          <>
            <span className="material-symbols-outlined text-on-surface-variant text-sm">chevron_right</span>
            <span className="text-on-surface-variant text-sm truncate max-w-[150px]">
              Detail View
            </span>
          </>
        )}
      </div>

      <div className="flex items-center gap-4 md:gap-6">
        <div className="hidden md:flex relative group">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <span className="material-symbols-outlined text-on-surface-variant group-focus-within:text-primary transition-colors text-xl">search</span>
          </div>
          <input
            type="text"
            placeholder="Search decisions, polls..."
            className="w-72 pl-10 pr-4 py-2.5 bg-surface-container-low rounded-xl focus:ring-2 focus:ring-primary/50 text-sm placeholder-on-surface-variant/70 border-outline/10 focus:border-primary/50 transition-all shadow-sm"
          />
        </div>

        <button className="md:hidden p-2 text-on-surface-variant hover:text-primary transition-colors flex items-center">
          <span className="material-symbols-outlined">search</span>
        </button>

        <button className="p-2 text-on-surface-variant hover:text-primary transition-colors flex items-center">
          <span className="material-symbols-outlined">help</span>
        </button>

        <button className="relative p-2 text-on-surface-variant hover:text-primary transition-colors flex items-center">
          <span className="material-symbols-outlined animate-pulse-glow">notifications</span>
          <span className="absolute top-2 right-2 w-2 h-2 bg-error rounded-full ring-2 ring-white"></span>
        </button>

        <div 
          onClick={() => navigate('/profile')}
          className="flex items-center gap-3 cursor-pointer hover:opacity-80 transition-opacity pl-2 border-l border-surface-container"
        >
          <div className={`w-9 h-9 rounded-full flex items-center justify-center text-white font-bold text-sm shadow-sm ${avatar.color}`}>
            {avatar.initials}
          </div>
          <div className="hidden md:block">
            <p className="text-sm font-semibold text-on-surface leading-tight">{userInfo.name}</p>
            <p className="text-xs text-on-surface-variant leading-tight">{userInfo.role}</p>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Topbar;
