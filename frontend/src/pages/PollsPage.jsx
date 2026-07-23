import React, { useState } from 'react';
import PollWidget from '../components/PollWidget';

export default function PollsPage() {
  const [filter, setFilter] = useState('All');
  
  const polls = [
    { _id: 'p1', title: 'Which UI library should we use?', type: 'SINGLE_CHOICE', options: [{ _id: 'o1', text: 'Material UI', votes: 12 }, { _id: 'o2', text: 'Tailwind CSS', votes: 45 }] }
  ];

  return (
    <div className="p-6 md:p-8 max-w-5xl mx-auto space-y-8 bg-[#faf8ff] min-h-screen">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-black text-[#191b23] mb-2">Active Polls</h1>
          <p className="text-[#434655] font-medium">Cast your vote on ongoing polls across all decisions.</p>
        </div>
        <div className="bg-white border border-[#e1e2ed] p-2 rounded-xl flex items-center gap-2 shadow-sm">
          <span className="material-symbols-outlined text-[#737686] ml-2 text-[20px]">filter_list</span>
          <select value={filter} onChange={(e) => setFilter(e.target.value)} className="bg-transparent text-sm font-bold text-[#191b23] focus:outline-none border-none py-1 pr-8 outline-none">
            <option value="All">All Types</option>
            <option value="SINGLE_CHOICE">Single Choice</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {polls.map(poll => (
          <PollWidget key={poll._id} poll={poll} onVote={() => {}} />
        ))}
      </div>
    </div>
  );
}
