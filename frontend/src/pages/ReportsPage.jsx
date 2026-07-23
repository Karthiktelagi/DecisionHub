import React from 'react';
import toast from 'react-hot-toast';

export default function ReportsPage() {
  const handleGenerate = () => { toast.success('Report generated!'); };

  return (
    <div className="max-w-5xl mx-auto p-4 md:p-8 space-y-8 bg-[#faf8ff] min-h-screen">
      <div>
        <h1 className="text-3xl font-black text-[#191b23] mb-2">Reports & Exports</h1>
        <p className="text-[#434655] font-medium">Generate comprehensive reports.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-white/70 backdrop-blur-xl border border-white/20 shadow-[0_8px_30px_rgba(37,99,235,0.08)] rounded-[24px] p-8">
          <h2 className="text-xl font-black text-[#191b23] mb-8 flex items-center gap-3">
            <span className="material-symbols-outlined text-[#004ac6] text-[24px]">description</span> Generate New Report
          </h2>
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-bold text-[#434655] mb-2">Select Target</label>
              <select className="w-full bg-[#f3f3fe] border border-[#e1e2ed] rounded-xl py-3.5 px-4 text-[#191b23] font-medium focus:border-[#004ac6] outline-none">
                <option value="d1">Which JS Framework?</option>
              </select>
            </div>
            <button onClick={handleGenerate} style={{ background: 'linear-gradient(135deg, #4338d9 0%, #004ac6 100%)' }} className="w-full py-4 rounded-xl text-white font-bold text-base hover:-translate-y-[1px] shadow-md transition-all flex items-center justify-center gap-2">
              <span className="material-symbols-outlined text-[20px]">download</span> Generate & Download
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
