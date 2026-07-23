import React, { useState } from 'react';
import DecisionCard from '../components/DecisionCard';

export default function DecisionsPage() {
  const [filter, setFilter] = useState('All');
  const [search, setSearch] = useState('');

  const decisions = [
    { _id: '1', title: 'Which JS Framework?', description: 'React vs Vue vs Angular for a large scale enterprise application. We need to consider performance and team knowledge.', category: 'Technology', status: 'Active', creator: { username: 'john' }, options: [1,2,3], votesCount: 42, commentsCount: 15 },
    { _id: '2', title: 'Next Car Purchase', description: 'Looking for a reliable SUV under $30k.', category: 'Lifestyle', status: 'Closed', creator: { username: 'alice' }, options: [1,2], votesCount: 12, commentsCount: 3 }
  ];

  const tabs = ['All', 'Active', 'Closed', 'My Decisions'];

  return (
    <div className="p-6 md:p-8 max-w-7xl mx-auto space-y-8 bg-[#faf8ff] min-h-screen">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-black text-[#191b23] mb-2">Decisions</h1>
          <p className="text-[#434655] font-medium">Explore, vote, and discuss decisions.</p>
        </div>
        <button style={{ background: 'linear-gradient(135deg, #4338d9 0%, #004ac6 100%)' }} className="text-white px-6 py-3 rounded-xl text-sm font-bold shadow-md hover:-translate-y-[1px] transition-all flex items-center gap-2">
          <span className="material-symbols-outlined text-[18px]">add</span> Create Decision
        </button>
      </div>

      <div className="bg-white/70 backdrop-blur-xl border border-white/20 shadow-[0_8px_30px_rgba(37,99,235,0.08)] rounded-[24px] p-3 flex flex-col md:flex-row justify-between gap-4 items-center">
        <div className="flex w-full md:w-auto overflow-x-auto no-scrollbar gap-2 p-1">
          {tabs.map(tab => (
            <button
              key={tab}
              onClick={() => setFilter(tab)}
              className={`px-5 py-2.5 rounded-xl text-sm font-bold whitespace-nowrap transition-all ${filter === tab ? 'bg-[#dbe1ff] text-[#004ac6]' : 'text-[#434655] hover:text-[#191b23] hover:bg-[#f3f3fe]'}`}
            >
              {tab}
            </button>
          ))}
        </div>
        
        <div className="relative w-full md:w-80 group">
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-[#737686] group-focus-within:text-[#004ac6]">
            <span className="material-symbols-outlined text-[20px]">search</span>
          </div>
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-[#f3f3fe] border border-[#e1e2ed] rounded-xl py-3 pl-12 pr-4 text-sm text-[#191b23] placeholder-[#737686] focus:outline-none focus:border-[#004ac6] focus:ring-2 focus:ring-[#dbe1ff] transition-all font-medium"
            placeholder="Search decisions..."
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {decisions.map(decision => (
          <DecisionCard key={decision._id} decision={decision} />
        ))}
      </div>
    </div>
  );
}
