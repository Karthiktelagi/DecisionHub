import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { generateAvatar } from '../utils/helpers';

const Sidebar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [mobileOpen, setMobileOpen] = useState(false);
  
  const navItems = [
    { name: 'Dashboard', path: '/dashboard', icon: 'dashboard' },
    { name: 'Boards', path: '/decisions', icon: 'developer_board' },
    { name: 'Communities', path: '/communities', icon: 'group' },
    { name: 'Polls', path: '/polls', icon: 'bar_chart' },
    { name: 'Analytics', path: '/analytics', icon: 'analytics' },
    { name: 'Notifications', path: '/notifications', icon: 'notifications', badge: 3 },
    { name: 'Settings', path: '/settings', icon: 'settings' },
  ];

  const userInfo = user || { name: 'Guest User', role: 'Viewer' };
  const avatar = generateAvatar(userInfo.name);

  return (
    <>
      <button 
        className="md:hidden fixed top-4 left-4 z-50 p-2 glass rounded-lg text-on-surface hover:text-primary transition-colors"
        onClick={() => setMobileOpen(!mobileOpen)}
      >
        <span className="material-symbols-outlined">{mobileOpen ? 'close' : 'menu'}</span>
      </button>

      <aside className={`
        fixed top-0 left-0 z-40 h-screen w-72 
        transform transition-transform duration-300 ease-in-out
        ${mobileOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
        glass border-y-0 border-l-0 rounded-none border-r-white/40
        flex flex-col
      `}>
        <div className="h-24 flex flex-col justify-center px-8 border-b border-surface-container">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-primary-container/20 rounded-xl text-primary">
              <span className="material-symbols-outlined text-3xl">psychology</span>
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gradient tracking-tight leading-none">DecisionHub</h1>
              <p className="text-xs text-on-surface-variant mt-1 font-medium">OS for Consensus</p>
            </div>
          </div>
        </div>

        <nav className="flex-1 overflow-y-auto py-6 px-4 space-y-2 custom-scrollbar">
          {navItems.map((item) => (
            <NavLink
              key={item.name}
              to={item.path}
              onClick={() => setMobileOpen(false)}
              className={({ isActive }) => `
                flex items-center gap-4 px-4 py-3 rounded-xl transition-all duration-200 group
                ${isActive 
                  ? 'bg-primary-container/20 text-primary font-semibold shadow-sm' 
                  : 'text-on-surface-variant hover:bg-surface-container hover:text-on-surface'}
              `}
            >
              <span className="material-symbols-outlined transition-transform group-hover:scale-110">
                {item.icon}
              </span>
              <span className="font-medium">{item.name}</span>
              
              {item.badge && (
                <span className="ml-auto bg-error text-white text-xs font-bold px-2 py-0.5 rounded-full animate-pulse">
                  {item.badge}
                </span>
              )}
            </NavLink>
          ))}
        </nav>

        <div className="px-4 py-4 space-y-2">
            <button 
              onClick={() => navigate('/decisions')}
              className="w-full py-3 rounded-xl btn-gradient text-white font-medium shadow-md hover:shadow-lg transition-shadow flex items-center justify-center gap-2"
            >
                <span className="material-symbols-outlined">add</span>
                New Decision
            </button>
        </div>

        <div className="p-4 border-t border-surface-container space-y-2">
           <a href="#" className="flex items-center gap-3 px-4 py-2 text-sm text-on-surface-variant hover:text-on-surface transition-colors">
               <span className="material-symbols-outlined text-lg">help</span>
               Help Center
           </a>
           <button onClick={logout} className="w-full flex items-center gap-3 px-4 py-2 text-sm text-on-surface-variant hover:text-error transition-colors">
               <span className="material-symbols-outlined text-lg">logout</span>
               Log Out
           </button>
        </div>
      </aside>

      {mobileOpen && (
        <div 
          className="md:hidden fixed inset-0 z-30 bg-black/20 backdrop-blur-sm"
          onClick={() => setMobileOpen(false)}
        />
      )}
    </>
  );
};

export default Sidebar;
