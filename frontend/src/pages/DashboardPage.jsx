import React, { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { Link } from 'react-router-dom';
import VoteChart from '../components/VoteChart';

export default function DashboardPage() {
  const { user } = useAuth();
  const [stats, setStats] = useState({ totalDecisions: 12, activePolls: 5, communities: 3, totalVotes: 48 });

  const categoryData = {
    labels: ['Tech', 'Career', 'Finance', 'Lifestyle', 'Travel'],
    values: [35, 25, 20, 15, 5]
  };
  const activityData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    values: [10, 25, 20, 45, 30, 60]
  };

  return (
    <div className="p-6 md:p-8 max-w-7xl mx-auto space-y-8 bg-[#faf8ff] min-h-screen">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-black text-[#191b23] mb-2">
            Good morning, {user?.name || user?.username || 'User'}! 👋
          </h1>
          <p className="text-[#434655] font-medium">Here's what's happening in your decisions.</p>
        </div>
        <div className="flex gap-3">
          <Link to="/decisions/new" className="bg-white border border-[#c3c6d7] text-[#191b23] px-5 py-2.5 rounded-xl text-sm font-bold shadow-sm hover:-translate-y-[1px] transition-transform flex items-center gap-2">
            <span className="material-symbols-outlined text-[18px]">add_circle</span> New Decision
          </Link>
          <Link to="/polls" style={{ background: 'linear-gradient(135deg, #4338d9 0%, #004ac6 100%)' }} className="text-white px-5 py-2.5 rounded-xl text-sm font-bold shadow-md hover:-translate-y-[1px] transition-transform flex items-center gap-2">
            <span className="material-symbols-outlined text-[18px]">poll</span> Active Polls
          </Link>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white/70 backdrop-blur-xl border border-white/20 shadow-[0_8px_30px_rgba(37,99,235,0.08)] rounded-[24px] p-6 flex items-center gap-5 group hover:-translate-y-1 transition-all">
          <div className="w-14 h-14 rounded-2xl bg-[#dbe1ff] text-[#004ac6] flex items-center justify-center">
            <span className="material-symbols-outlined text-[28px]">fact_check</span>
          </div>
          <div>
            <p className="text-[#434655] text-sm font-bold mb-1">Total Decisions</p>
            <p className="text-3xl font-black text-[#191b23] leading-none">{stats.totalDecisions}</p>
          </div>
        </div>
        <div className="bg-white/70 backdrop-blur-xl border border-white/20 shadow-[0_8px_30px_rgba(37,99,235,0.08)] rounded-[24px] p-6 flex items-center gap-5 group hover:-translate-y-1 transition-all">
          <div className="w-14 h-14 rounded-2xl bg-[#eaddff] text-[#712ae2] flex items-center justify-center">
            <span className="material-symbols-outlined text-[28px]">insights</span>
          </div>
          <div>
            <p className="text-[#434655] text-sm font-bold mb-1">Active Polls</p>
            <p className="text-3xl font-black text-[#191b23] leading-none">{stats.activePolls}</p>
          </div>
        </div>
        <div className="bg-white/70 backdrop-blur-xl border border-white/20 shadow-[0_8px_30px_rgba(37,99,235,0.08)] rounded-[24px] p-6 flex items-center gap-5 group hover:-translate-y-1 transition-all">
          <div className="w-14 h-14 rounded-2xl bg-[#e2dfff] text-[#4338d9] flex items-center justify-center">
            <span className="material-symbols-outlined text-[28px]">groups</span>
          </div>
          <div>
            <p className="text-[#434655] text-sm font-bold mb-1">Communities</p>
            <p className="text-3xl font-black text-[#191b23] leading-none">{stats.communities}</p>
          </div>
        </div>
        <div className="bg-white/70 backdrop-blur-xl border border-white/20 shadow-[0_8px_30px_rgba(37,99,235,0.08)] rounded-[24px] p-6 flex items-center gap-5 group hover:-translate-y-1 transition-all">
          <div className="w-14 h-14 rounded-2xl bg-[#cce8e4] text-[#006b5e] flex items-center justify-center">
            <span className="material-symbols-outlined text-[28px]">how_to_vote</span>
          </div>
          <div>
            <p className="text-[#434655] text-sm font-bold mb-1">Total Votes</p>
            <p className="text-3xl font-black text-[#191b23] leading-none">{stats.totalVotes}</p>
          </div>
        </div>
      </div>

      {/* Charts & Lists Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 bg-white/70 backdrop-blur-xl border border-white/20 shadow-[0_8px_30px_rgba(37,99,235,0.08)] rounded-[24px] p-6 md:p-8">
          <h3 className="text-xl font-black text-[#191b23] mb-6 flex items-center gap-2">
            <span className="material-symbols-outlined text-[#004ac6]">monitoring</span> Activity Trends
          </h3>
          <div className="h-72">
            <VoteChart data={activityData} type="line" />
          </div>
        </div>

        <div className="space-y-8">
          <div className="bg-white/70 backdrop-blur-xl border border-white/20 shadow-[0_8px_30px_rgba(37,99,235,0.08)] rounded-[24px] p-6">
            <h3 className="text-xl font-black text-[#191b23] mb-6 flex items-center gap-2">
              <span className="material-symbols-outlined text-[#712ae2]">donut_small</span> Categories
            </h3>
            <div className="h-64">
              <VoteChart data={categoryData} type="doughnut" />
            </div>
          </div>

          <div style={{ background: 'linear-gradient(135deg, #4338d9 0%, #712ae2 100%)' }} className="rounded-[24px] p-8 text-white shadow-lg relative overflow-hidden">
            <div className="absolute top-[-20%] right-[-10%] w-32 h-32 bg-white/20 rounded-full blur-[20px]"></div>
            <h3 className="text-xl font-black mb-2">Upgrade to Pro</h3>
            <p className="text-white/80 text-sm font-medium mb-6">Get unlimited polls and advanced analytics.</p>
            <button className="bg-white text-[#4338d9] px-6 py-2.5 rounded-xl text-sm font-bold shadow-sm hover:shadow-md transition-shadow">
              Upgrade Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
