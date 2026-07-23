import React, { useState } from 'react';
import { formatRelativeTime } from '../utils/helpers';

export default function PollWidget({ poll, onVote }) {
  const [selectedOption, setSelectedOption] = useState(null);
  const [showResults, setShowResults] = useState(false);

  const handleVote = () => {
    if (selectedOption !== null && onVote) {
      onVote(poll._id, selectedOption);
      setShowResults(true);
    }
  };

  const totalVotes = poll.options?.reduce((sum, opt) => sum + (opt.votes || 0), 0) || 0;

  return (
    <div className="bg-white/70 backdrop-blur-xl border border-white/20 shadow-[0_8px_30px_rgba(37,99,235,0.08)] rounded-[24px] p-6 text-[#191b23] transition-all">
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="text-lg font-bold mb-1">{poll.title}</h3>
          <div className="flex items-center gap-2 text-xs text-[#434655]">
            <span className="bg-[#dbe1ff] text-[#004ac6] px-2 py-0.5 rounded-md font-medium">
              {poll.type || 'SINGLE_CHOICE'}
            </span>
            {poll.isAnonymous && (
              <span className="bg-[#e7e7f3] px-2 py-0.5 rounded-md font-medium">Anonymous</span>
            )}
            {poll.deadline && (
              <span className="flex items-center gap-1 font-medium">
                <span className="material-symbols-outlined text-[14px]">schedule</span> {poll.deadline}
              </span>
            )}
          </div>
        </div>
        <button 
          onClick={() => setShowResults(!showResults)}
          className="text-xs text-[#004ac6] hover:text-[#4338d9] transition-colors underline font-medium"
        >
          {showResults ? 'Vote' : 'Results'}
        </button>
      </div>

      <div className="space-y-3 mb-6">
        {poll.options?.map((option, idx) => {
          const percentage = totalVotes === 0 ? 0 : Math.round(((option.votes || 0) / totalVotes) * 100);
          const isSelected = selectedOption === option._id;

          if (showResults) {
            return (
              <div key={option._id || idx} className="relative h-10 bg-[#f3f3fe] rounded-xl overflow-hidden flex items-center px-4 border border-[#e1e2ed]">
                <div 
                  className="absolute top-0 left-0 h-full bg-[#dbe1ff] transition-all duration-1000 ease-out origin-left scale-x-100"
                  style={{ width: `${percentage}%` }}
                ></div>
                <div className="relative z-10 flex justify-between w-full text-sm font-bold text-[#191b23]">
                  <span>{option.text}</span>
                  <span className="text-[#004ac6]">{percentage}% ({option.votes || 0})</span>
                </div>
              </div>
            );
          }

          return (
            <div 
              key={option._id || idx}
              onClick={() => setSelectedOption(option._id)}
              className={`flex items-center gap-3 p-3 rounded-xl border cursor-pointer transition-all duration-200 ${
                isSelected 
                  ? 'border-[#004ac6] bg-[#dbe1ff]/50 text-[#004ac6]' 
                  : 'border-[#c3c6d7] bg-[#ffffff] hover:border-[#004ac6]/50 hover:bg-[#f3f3fe]'
              }`}
            >
              {isSelected ? (
                <span className="material-symbols-outlined text-[#004ac6]">radio_button_checked</span>
              ) : (
                <span className="material-symbols-outlined text-[#737686]">radio_button_unchecked</span>
              )}
              <span className="text-sm font-medium">{option.text}</span>
            </div>
          );
        })}
      </div>

      {!showResults && (
        <button
          onClick={handleVote}
          disabled={selectedOption === null}
          style={{ background: 'linear-gradient(135deg, #4338d9 0%, #004ac6 100%)' }}
          className="w-full py-2.5 rounded-xl text-white font-medium hover:-translate-y-[1px] shadow-md disabled:opacity-50 disabled:cursor-not-allowed transition-all"
        >
          Submit Vote
        </button>
      )}
      {showResults && (
        <div className="text-center text-xs text-[#434655] mt-4 font-medium">
          Total votes: {totalVotes}
        </div>
      )}
    </div>
  );
}
