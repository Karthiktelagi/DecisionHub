import React, { useState } from 'react';

export default function ProsConsList({ pros, cons, onAddPro, onAddCon }) {
  const [newPro, setNewPro] = useState('');
  const [newCon, setNewCon] = useState('');

  const handleAddPro = (e) => {
    e.preventDefault();
    if (newPro.trim()) {
      onAddPro(newPro.trim());
      setNewPro('');
    }
  };

  const handleAddCon = (e) => {
    e.preventDefault();
    if (newCon.trim()) {
      onAddCon(newCon.trim());
      setNewCon('');
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
      {/* Pros Column */}
      <div className="bg-[#cce8e4]/30 border border-[#cce8e4] rounded-2xl p-4 flex flex-col h-full">
        <h4 className="text-[#006b5e] font-bold flex items-center gap-2 mb-4">
          <span className="material-symbols-outlined text-[18px]">thumb_up</span> Pros
        </h4>
        <div className="space-y-2 mb-4 flex-grow">
          {pros.map((pro, i) => (
            <div key={i} className="bg-white border border-[#cce8e4] rounded-xl p-3 text-sm text-[#191b23] shadow-sm">
              {pro.text}
              {pro.user && <div className="text-[10px] text-[#006b5e]/70 mt-1">- {pro.user}</div>}
            </div>
          ))}
          {pros.length === 0 && (
            <div className="text-sm text-[#006b5e]/50 italic text-center py-4">No pros added yet.</div>
          )}
        </div>
        <form onSubmit={handleAddPro} className="relative mt-auto">
          <input
            type="text"
            value={newPro}
            onChange={(e) => setNewPro(e.target.value)}
            placeholder="Add a pro..."
            className="w-full bg-white border border-[#cce8e4] rounded-xl py-2 pl-3 pr-10 text-sm text-[#191b23] placeholder-[#006b5e]/50 focus:outline-none focus:border-[#006b5e] focus:ring-1 focus:ring-[#006b5e] transition-all"
          />
          <button type="submit" className="absolute right-2 top-1/2 -translate-y-1/2 text-[#006b5e] hover:text-[#004b42]">
            <span className="material-symbols-outlined text-[20px]">add</span>
          </button>
        </form>
      </div>

      {/* Cons Column */}
      <div className="bg-[#ffdad6]/30 border border-[#ffdad6] rounded-2xl p-4 flex flex-col h-full">
        <h4 className="text-[#93000a] font-bold flex items-center gap-2 mb-4">
          <span className="material-symbols-outlined text-[18px]">thumb_down</span> Cons
        </h4>
        <div className="space-y-2 mb-4 flex-grow">
          {cons.map((con, i) => (
            <div key={i} className="bg-white border border-[#ffdad6] rounded-xl p-3 text-sm text-[#191b23] shadow-sm">
              {con.text}
              {con.user && <div className="text-[10px] text-[#93000a]/70 mt-1">- {con.user}</div>}
            </div>
          ))}
          {cons.length === 0 && (
            <div className="text-sm text-[#93000a]/50 italic text-center py-4">No cons added yet.</div>
          )}
        </div>
        <form onSubmit={handleAddCon} className="relative mt-auto">
          <input
            type="text"
            value={newCon}
            onChange={(e) => setNewCon(e.target.value)}
            placeholder="Add a con..."
            className="w-full bg-white border border-[#ffdad6] rounded-xl py-2 pl-3 pr-10 text-sm text-[#191b23] placeholder-[#93000a]/50 focus:outline-none focus:border-[#93000a] focus:ring-1 focus:ring-[#93000a] transition-all"
          />
          <button type="submit" className="absolute right-2 top-1/2 -translate-y-1/2 text-[#93000a] hover:text-[#ba1a1a]">
            <span className="material-symbols-outlined text-[20px]">add</span>
          </button>
        </form>
      </div>
    </div>
  );
}
