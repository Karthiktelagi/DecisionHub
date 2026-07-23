import React, { useState } from 'react';
import { Link } from 'react-router-dom';

export default function CommunitiesPage() {
  const [filter, setFilter] = useState('All');
  const categories = ['All', 'Technology', 'Career', 'Finance', 'Lifestyle'];
  
  const communities = [
    { id: 1, name: 'Frontend Devs', description: 'Discuss frameworks, tooling.', category: 'Technology', members: 1250, decisions: 45, isPrivate: false },
    { id: 2, name: 'Personal Finance', description: 'Collaborative decisions on investments.', category: 'Finance', members: 840, decisions: 112, isPrivate: false }
  ];

  return (
    <div className="p-6 md:p-8 max-w-7xl mx-auto space-y-8 bg-[#faf8ff] min-h-screen">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-black text-[#191b23] mb-2">Communities</h1>
          <p className="text-[#434655] font-medium">Join groups of like-minded people.</p>
        </div>
        <button style={{ background: 'linear-gradient(135deg, #4338d9 0%, #004ac6 100%)' }} className="text-white px-6 py-3 rounded-xl text-sm font-bold shadow-md hover:-translate-y-[1px] transition-all flex items-center gap-2">
          <span className="material-symbols-outlined text-[18px]">group_add</span> Create Community
        </button>
      </div>

      <div className="flex overflow-x-auto no-scrollbar gap-3 pb-2">
        {categories.map(cat => (
          <button key={cat} onClick={() => setFilter(cat)} className={`px-5 py-2 rounded-full text-sm font-bold whitespace-nowrap transition-colors border-2 ${filter === cat ? 'bg-[#dbe1ff] text-[#004ac6] border-[#004ac6]' : 'bg-white text-[#434655] border-[#e1e2ed] hover:border-[#c3c6d7]'}`}>
            {cat}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {communities.map(community => (
          <div key={community.id} className="bg-white/70 backdrop-blur-xl border border-white/20 shadow-[0_8px_30px_rgba(37,99,235,0.08)] rounded-[24px] p-6 hover:-translate-y-1 transition-all flex flex-col h-full overflow-hidden">
            <div className="flex justify-between items-start mb-4">
              <span className="text-[10px] uppercase tracking-wider font-bold text-[#004ac6] bg-[#dbe1ff] px-3 py-1.5 rounded-full">{community.category}</span>
              <span className="material-symbols-outlined text-[#737686] text-[20px]">{community.isPrivate ? 'lock' : 'public'}</span>
            </div>
            <h3 className="text-xl font-black text-[#191b23] mb-2 hover:text-[#004ac6] transition-colors"><Link to={`/communities/${community.id}`}>{community.name}</Link></h3>
            <p className="text-sm text-[#434655] font-medium mb-6 flex-grow">{community.description}</p>
            <div className="flex items-center justify-between pt-5 border-t border-[#e1e2ed]">
              <div className="flex gap-4 text-xs font-bold text-[#434655]">
                <span className="flex items-center gap-1.5"><span className="material-symbols-outlined text-[16px]">group</span> {community.members}</span>
                <span className="flex items-center gap-1.5"><span className="material-symbols-outlined text-[16px]">fact_check</span> {community.decisions}</span>
              </div>
              <button className="text-sm bg-[#f3f3fe] hover:bg-[#dbe1ff] text-[#004ac6] px-4 py-2 rounded-lg font-bold transition-colors">Join</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
