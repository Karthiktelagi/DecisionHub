import React, { useState } from 'react';

export default function ComparisonTable({ options, factors, scores, onScoreChange, onAddFactor }) {
  const [newFactor, setNewFactor] = useState('');
  const [isAddingFactor, setIsAddingFactor] = useState(false);

  const getScoreColor = (score) => {
    if (!score) return 'bg-[#faf8ff] text-[#434655]';
    if (score < 4) return 'bg-[#ffdad6] text-[#93000a] border-[#ffdad6]';
    if (score < 7) return 'bg-[#fff8e6] text-[#b06f00] border-[#fff8e6]';
    return 'bg-[#cce8e4] text-[#006b5e] border-[#cce8e4]';
  };

  const calculateTotal = (optionId) => {
    return factors.reduce((sum, factor) => {
      const score = scores[`${optionId}-${factor.id}`] || 0;
      return sum + score;
    }, 0);
  };

  const totals = options.map(opt => ({ id: opt.id, total: calculateTotal(opt.id) }));
  const maxTotal = Math.max(...totals.map(t => t.total), 1);

  const handleAddFactor = () => {
    if (newFactor.trim()) {
      onAddFactor({ id: Date.now().toString(), name: newFactor.trim() });
      setNewFactor('');
      setIsAddingFactor(false);
    }
  };

  return (
    <div className="overflow-x-auto rounded-[24px] border border-white/20 bg-white/70 backdrop-blur-xl shadow-[0_8px_30px_rgba(37,99,235,0.08)]">
      <table className="w-full text-left text-sm text-[#191b23]">
        <thead className="bg-[#f3f3fe] border-b border-[#e1e2ed] text-xs uppercase text-[#434655]">
          <tr>
            <th className="px-6 py-4 font-bold w-1/4">Factor</th>
            {options.map(option => (
              <th key={option.id} className="px-6 py-4 font-bold text-center w-48 text-[#191b23]">
                {option.title}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {factors.map(factor => (
            <tr key={factor.id} className="border-b border-[#e1e2ed] hover:bg-[#ffffff]/50 transition-colors">
              <td className="px-6 py-4 font-medium text-[#191b23]">
                {factor.name}
              </td>
              {options.map(option => {
                const score = scores[`${option.id}-${factor.id}`] || '';
                return (
                  <td key={option.id} className="px-6 py-4 text-center">
                    <input
                      type="number"
                      min="1"
                      max="10"
                      value={score}
                      onChange={(e) => onScoreChange(option.id, factor.id, parseInt(e.target.value) || '')}
                      className={`w-16 h-10 text-center rounded-xl border border-[#c3c6d7] bg-white focus:ring-2 focus:ring-[#004ac6] outline-none transition-all font-bold ${getScoreColor(score)}`}
                      placeholder="-"
                    />
                  </td>
                );
              })}
            </tr>
          ))}
          {/* Add Factor Row */}
          <tr className="border-b border-[#e1e2ed] bg-[#ffffff]/30">
            <td className="px-6 py-4">
              {isAddingFactor ? (
                <div className="flex items-center gap-2">
                  <input 
                    type="text" 
                    value={newFactor}
                    onChange={(e) => setNewFactor(e.target.value)}
                    placeholder="New factor..."
                    className="bg-white border border-[#c3c6d7] rounded-lg px-2 py-1 text-sm text-[#191b23] w-full focus:outline-none focus:border-[#004ac6]"
                    autoFocus
                    onKeyDown={(e) => e.key === 'Enter' && handleAddFactor()}
                  />
                  <button onClick={handleAddFactor} className="text-[#006b5e] hover:text-[#004ac6]">
                    <span className="material-symbols-outlined text-[18px]">add_circle</span>
                  </button>
                  <button onClick={() => setIsAddingFactor(false)} className="text-[#ba1a1a] hover:text-[#93000a]">
                    <span className="material-symbols-outlined text-[18px]">cancel</span>
                  </button>
                </div>
              ) : (
                <button 
                  onClick={() => setIsAddingFactor(true)}
                  className="flex items-center gap-1 text-xs text-[#004ac6] hover:text-[#4338d9] font-bold transition-colors"
                >
                  <span className="material-symbols-outlined text-[16px]">add</span> Add Factor
                </button>
              )}
            </td>
            {options.map(opt => <td key={opt.id} className="px-6 py-4"></td>)}
          </tr>
        </tbody>
        <tfoot className="bg-[#f3f3fe] font-bold border-t-2 border-[#e1e2ed]">
          <tr>
            <td className="px-6 py-5 text-right text-[#434655]">Total Score:</td>
            {options.map(option => {
              const total = calculateTotal(option.id);
              const isWinner = total === maxTotal && total > 0;
              return (
                <td key={option.id} className="px-6 py-5 text-center">
                  <div className={`text-xl ${isWinner ? 'text-[#006b5e]' : 'text-[#191b23]'}`}>
                    {total}
                  </div>
                </td>
              );
            })}
          </tr>
        </tfoot>
      </table>
    </div>
  );
}
