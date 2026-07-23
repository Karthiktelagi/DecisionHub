import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import ComparisonTable from '../components/ComparisonTable';
import ProsConsList from '../components/ProsConsList';
import PollWidget from '../components/PollWidget';
import CommentThread from '../components/CommentThread';

export default function DecisionDetailPage() {
  const { id } = useParams();
  const [activeTab, setActiveTab] = useState('overview');
  const [expandedOption, setExpandedOption] = useState(null);

  const decision = {
    _id: id || '1', title: 'Which frontend framework for our new SaaS?', description: 'We need to decide on the core frontend technology.', status: 'Active', category: 'Technology', creator: { username: 'alex_dev' },
    options: [
      { id: 'opt1', title: 'React (Next.js)', description: 'Industry standard.', votes: 45, pros: [{text: 'Huge community', user: 'alex'}], cons: [] },
      { id: 'opt2', title: 'Vue (Nuxt)', description: 'Approachable.', votes: 20, pros: [], cons: [] }
    ],
    polls: [{ _id: 'p1', title: 'SEO Priority?', type: 'SINGLE_CHOICE', options: [{_id: 'y', text: 'Yes', votes: 12}] }],
    comments: [{ _id: 'c1', content: 'Next.js is safe.', user: { username: 'sam' }, createdAt: new Date().toISOString(), replies: [] }]
  };

  const tabs = [
    { id: 'overview', name: 'Overview', icon: 'layers' },
    { id: 'options', name: 'Options', icon: 'list' },
    { id: 'comparison', name: 'Comparison', icon: 'monitoring' },
    { id: 'polls', name: 'Polls', icon: 'pie_chart' },
    { id: 'discussion', name: 'Discussion', icon: 'forum' }
  ];

  return (
    <div className="max-w-6xl mx-auto p-4 md:p-8 space-y-6 bg-[#faf8ff] min-h-screen">
      <div className="bg-white/70 backdrop-blur-xl border border-white/20 shadow-[0_8px_30px_rgba(37,99,235,0.08)] rounded-[24px] p-8 md:p-10 relative overflow-hidden">
        <div className="flex flex-col md:flex-row justify-between items-start gap-4 mb-6 relative z-10">
          <div className="flex gap-3 items-center">
            <span className="px-3 py-1 rounded-full text-xs font-bold bg-[#cce8e4] text-[#006b5e]">{decision.status}</span>
            <span className="text-xs font-bold bg-[#eaddff] text-[#712ae2] px-3 py-1 rounded-full">{decision.category}</span>
          </div>
          <div className="flex items-center gap-4 text-sm text-[#434655] font-medium">
            <div className="flex items-center gap-1.5"><span className="material-symbols-outlined text-[16px]">person</span> {decision.creator.username}</div>
            <div className="flex items-center gap-1.5 text-[#b06f00]"><span className="material-symbols-outlined text-[16px]">schedule</span> Due soon</div>
          </div>
        </div>
        <h1 className="text-3xl md:text-4xl font-black text-[#191b23] mb-4 relative z-10">{decision.title}</h1>
      </div>

      <div className="flex overflow-x-auto no-scrollbar gap-2 bg-white p-2 rounded-[24px] border border-[#e1e2ed] shadow-sm">
        {tabs.map(tab => (
          <button
            key={tab.id} onClick={() => setActiveTab(tab.id)}
            className={`flex items-center gap-2 px-5 py-3 rounded-xl text-sm font-bold transition-all whitespace-nowrap flex-1 justify-center ${activeTab === tab.id ? 'bg-[#dbe1ff] text-[#004ac6]' : 'text-[#434655] hover:text-[#191b23] hover:bg-[#f3f3fe]'}`}
          >
            <span className="material-symbols-outlined text-[18px]">{tab.icon}</span> {tab.name}
          </button>
        ))}
      </div>

      <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
        {activeTab === 'overview' && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="md:col-span-2 bg-white/70 backdrop-blur-xl border border-white/20 shadow-[0_8px_30px_rgba(37,99,235,0.08)] rounded-[24px] p-8">
              <h3 className="text-xl font-black text-[#191b23] mb-4">Description</h3>
              <p className="text-[#434655] leading-relaxed font-medium">{decision.description}</p>
            </div>
          </div>
        )}
        
        {activeTab === 'options' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {decision.options.map(opt => (
                <div key={opt.id} className="bg-white/70 backdrop-blur-xl border border-white/20 shadow-[0_8px_30px_rgba(37,99,235,0.08)] rounded-[24px] p-6 hover:-translate-y-1 transition-all">
                  <h3 className="text-xl font-black text-[#191b23] mb-2">{opt.title}</h3>
                  <p className="text-sm text-[#434655] mb-6 font-medium">{opt.description}</p>
                  <div className="flex justify-between items-center pt-4 border-t border-[#e1e2ed]">
                    <span className="text-xs font-bold bg-[#dbe1ff] px-3 py-1 rounded-full text-[#004ac6]">{opt.votes} votes</span>
                    <button onClick={() => setExpandedOption(expandedOption === opt.id ? null : opt.id)} className="text-xs font-bold text-[#004ac6] hover:underline">Pros & Cons</button>
                  </div>
                  {expandedOption === opt.id && (
                    <div className="mt-4"><ProsConsList pros={opt.pros} cons={opt.cons} onAddPro={()=>{}} onAddCon={()=>{}} /></div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
        
        {activeTab === 'comparison' && (
           <ComparisonTable options={decision.options} factors={[{id:'f1',name:'Cost'}]} scores={{}} onScoreChange={()=>{}} onAddFactor={()=>{}} />
        )}
        
        {activeTab === 'polls' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {decision.polls.map(poll => <PollWidget key={poll._id} poll={poll} />)}
          </div>
        )}
        
        {activeTab === 'discussion' && (
          <CommentThread comments={decision.comments} onAddComment={()=>{}} onReply={()=>{}} />
        )}
      </div>
    </div>
  );
}
