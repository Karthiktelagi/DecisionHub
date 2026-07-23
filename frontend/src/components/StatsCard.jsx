import React from 'react';

const StatsCard = ({ title, value, change, icon, color = 'primary' }) => {
  
  const colors = {
    primary: { bg: 'bg-primary-container/20', text: 'text-primary', glow: 'shadow-[0_0_15px_rgba(37,99,235,0.2)]' },
    secondary: { bg: 'bg-secondary-container/20', text: 'text-secondary', glow: 'shadow-[0_0_15px_rgba(113,42,226,0.2)]' },
    success: { bg: 'bg-success/10', text: 'text-success', glow: 'shadow-[0_0_15px_rgba(16,185,129,0.2)]' },
    warning: { bg: 'bg-warning/10', text: 'text-warning', glow: 'shadow-[0_0_15px_rgba(245,158,11,0.2)]' },
    danger: { bg: 'bg-error/10', text: 'text-error', glow: 'shadow-[0_0_15px_rgba(186,26,26,0.2)]' },
  };

  const selectedColor = colors[color] || colors.primary;

  let trendIcon = 'remove';
  let trendColor = 'text-on-surface-variant';
  
  if (change > 0) {
    trendIcon = 'trending_up';
    trendColor = 'text-success';
  } else if (change < 0) {
    trendIcon = 'trending_down';
    trendColor = 'text-error';
  }

  return (
    <div className="glass-card bg-white/60 p-6 flex flex-col justify-between h-full group relative overflow-hidden">
      <div className={`absolute -right-4 -top-4 w-24 h-24 rounded-full ${selectedColor.bg} blur-2xl opacity-70 group-hover:opacity-100 transition-opacity duration-500`} />
      
      <div className="flex items-start justify-between mb-4 relative z-10">
        <h3 className="text-on-surface-variant font-semibold text-sm tracking-wide uppercase">{title}</h3>
        <div className={`p-2.5 rounded-xl ${selectedColor.bg} ${selectedColor.text} ${selectedColor.glow}`}>
          <span className="material-symbols-outlined text-xl">{icon}</span>
        </div>
      </div>
      
      <div className="relative z-10">
        <div className="text-3xl font-bold text-on-surface mb-2 tracking-tight">
          {value}
        </div>
        
        {change !== undefined && (
          <div className="flex items-center gap-1.5 text-xs font-medium">
            <span className={`flex items-center gap-1 ${trendColor} bg-surface-container-high px-1.5 py-0.5 rounded-md`}>
              <span className="material-symbols-outlined text-[14px]">{trendIcon}</span>
              {Math.abs(change)}%
            </span>
            <span className="text-on-surface-variant ml-1">vs last month</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default StatsCard;
