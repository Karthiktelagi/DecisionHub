import React from 'react';
import { useNavigate } from 'react-router-dom';
import { getCategoryColor, getStatusColor, truncateText } from '../utils/helpers';

export default function DecisionCard({ decision }) {
  const navigate = useNavigate();

  return (
    <div 
      onClick={() => navigate(`/decisions/${decision._id}`)}
      className="bg-white/70 backdrop-blur-xl border border-white/20 shadow-[0_8px_30px_rgba(37,99,235,0.08)] rounded-[24px] p-6 cursor-pointer transform transition-all duration-300 hover:-translate-y-2 flex flex-col h-full overflow-hidden relative group"
    >
      <div className="flex justify-between items-start mb-4">
        <span className="px-3 py-1 rounded-full text-xs font-bold bg-[#eaddff] text-[#712ae2]">
          {decision.category || 'General'}
        </span>
        <div className="flex -space-x-2">
          <div className="w-8 h-8 rounded-full border-2 border-white bg-[#004ac6] text-white flex items-center justify-center text-xs font-bold">
            {decision.creator?.username?.charAt(0).toUpperCase() || 'U'}
          </div>
        </div>
      </div>

      <h3 className="text-xl font-bold text-[#191b23] mb-2 group-hover:text-[#004ac6] transition-colors line-clamp-2">
        {decision.title}
      </h3>
      
      <p className="text-[#434655] text-sm mb-6 flex-grow line-clamp-2">
        {decision.description}
      </p>

      {/* Progress Bar Mock */}
      <div className="mb-4">
        <div className="flex justify-between text-xs text-[#434655] mb-1">
          <span>Progress</span>
          <span>75%</span>
        </div>
        <div className="w-full h-2 bg-[#e7e7f3] rounded-full overflow-hidden">
          <div className="h-full bg-gradient-to-r from-[#4338d9] to-[#004ac6]" style={{ width: '75%' }}></div>
        </div>
      </div>

      <div className="flex items-center justify-between mt-auto pt-4 border-t border-[#e1e2ed]">
        <div className="flex items-center gap-4 text-[#434655]">
          <div className="flex items-center gap-1.5 text-xs">
            <span className="material-symbols-outlined text-[16px]">calendar_today</span>
            <span>{new Date().toLocaleDateString()}</span>
          </div>
          <div className="flex items-center gap-1.5 text-xs">
            <span className="material-symbols-outlined text-[16px]">forum</span>
            <span>{decision.commentsCount || 0}</span>
          </div>
        </div>
        
        <div className="flex items-center gap-2">
          <button className="text-[#004ac6] hover:bg-[#dbe1ff] p-1.5 rounded-full transition-colors flex items-center justify-center">
            <span className="material-symbols-outlined text-[18px]">share</span>
          </button>
          <button className="text-[#004ac6] hover:bg-[#dbe1ff] p-1.5 rounded-full transition-colors flex items-center justify-center">
            <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
          </button>
        </div>
      </div>
    </div>
  );
}
