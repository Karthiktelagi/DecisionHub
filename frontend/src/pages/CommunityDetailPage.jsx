import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import DecisionCard from '../components/DecisionCard';

export default function CommunityDetailPage() {
  const { id } = useParams();
  const [activeTab, setActiveTab] = useState('decisions');
  const tabs = ['decisions', 'members', 'about'];

  return (
    <div className="max-w-6xl mx-auto p-4 md:p-8 space-y-8 bg-[#faf8ff] min-h-screen">
      <div className="bg-white/70 backdrop-blur-xl border border-white/20 shadow-[0_8px_30px_rgba(37,99,235,0.08)] rounded-[32px] p-8 md:p-12 flex flex-col md:flex-row items-center md:items-start gap-8 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-[#dbe1ff] rounded-full blur-[100px] opacity-50 pointer-events-none"></div>
        <div className="w-28 h-28 rounded-[24px] bg-[#eaddff] flex items-center justify-center text-4xl font-black text-[#712ae2] shadow-sm shrink-0">FD</div>
        <div className="flex-grow z-10 text-center md:text-left">
          <div className="flex flex-col md:flex-row md:items-center gap-4 mb-3 justify-center md:justify-start">
            <h1 className="text-3xl md:text-4xl font-black text-[#191b23]">Frontend Devs</h1>
            <span className="bg-[#dbe1ff] text-[#004ac6] px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider w-max mx-auto md:mx-0">Technology</span>
          </div>
          <p className="text-[#434655] font-medium mb-6 max-w-2xl mx-auto md:mx-0">A community for frontend developers to discuss tech stacks, share knowledge, and make collective decisions.</p>
          <div className="flex flex-wrap items-center justify-center md:justify-start gap-6 text-sm font-bold text-[#737686] mb-8">
            <span className="flex items-center gap-2"><span className="material-symbols-outlined text-[18px]">group</span> 1250 Members</span>
            <span className="flex items-center gap-2"><span className="material-symbols-outlined text-[18px]">shield</span> Created by alex_dev</span>
            <span className="flex items-center gap-2"><span className="material-symbols-outlined text-[18px]">calendar_today</span> Est. 2023</span>
          </div>
          <div className="flex gap-4 justify-center md:justify-start">
            <button style={{ background: 'linear-gradient(135deg, #4338d9 0%, #004ac6 100%)' }} className="text-white px-8 py-3 rounded-xl font-bold hover:-translate-y-[1px] shadow-md transition-all">Join Community</button>
            <button className="bg-white text-[#191b23] border border-[#c3c6d7] px-8 py-3 rounded-xl font-bold hover:bg-[#f3f3fe] transition-colors shadow-sm">Share</button>
          </div>
        </div>
      </div>

      <div className="flex border-b-2 border-[#e1e2ed]">
        {tabs.map(tab => (
          <button key={tab} onClick={() => setActiveTab(tab)} className={`px-8 py-4 text-sm font-bold capitalize transition-colors relative ${activeTab === tab ? 'text-[#004ac6]' : 'text-[#737686] hover:text-[#434655]'}`}>
            {tab}
            {activeTab === tab && <div className="absolute bottom-[-2px] left-0 w-full h-1 bg-[#004ac6] rounded-t-full"></div>}
          </button>
        ))}
      </div>

      <div className="min-h-[400px]">
        {activeTab === 'decisions' && (
          <div className="space-y-8">
            <div className="flex justify-between items-center">
               <div className="relative w-72 group">
                 <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-[#737686]"><span className="material-symbols-outlined text-[20px]">search</span></div>
                 <input type="text" className="w-full bg-white border border-[#c3c6d7] rounded-xl py-2.5 pl-12 pr-4 text-sm text-[#191b23] focus:border-[#004ac6] font-medium" placeholder="Search decisions..." />
               </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
               <DecisionCard decision={{ _id: 'd1', title: 'React 18 vs 19', description: 'Should we migrate?', category: 'Technology', creator: { username: 'alex' } }} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
