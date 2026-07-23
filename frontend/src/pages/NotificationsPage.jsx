import React from 'react';
import { formatRelativeTime } from '../utils/helpers';

export default function NotificationsPage() {
  const notifications = [
    { id: 1, type: 'vote', title: 'New vote on your decision', message: 'Alex voted on "Which JS Framework?"', time: new Date().toISOString(), read: false },
    { id: 2, type: 'comment', title: 'New comment', message: 'Sarah commented on your poll.', time: new Date().toISOString(), read: true }
  ];

  return (
    <div className="max-w-4xl mx-auto p-4 md:p-8 space-y-8 bg-[#faf8ff] min-h-screen">
      <div className="flex justify-between items-end border-b-2 border-[#e1e2ed] pb-6">
        <div>
          <h1 className="text-3xl font-black text-[#191b23] mb-2 flex items-center gap-3">Notifications <span className="bg-[#004ac6] text-white text-sm px-3 py-1 rounded-full">1</span></h1>
          <p className="text-[#434655] font-medium">Stay updated with your activities.</p>
        </div>
        <button className="text-sm text-[#004ac6] hover:text-[#4338d9] font-bold flex items-center gap-2 transition-colors bg-[#dbe1ff] px-4 py-2 rounded-xl">
          <span className="material-symbols-outlined text-[18px]">done_all</span> Mark all read
        </button>
      </div>

      <div className="space-y-4">
        {notifications.map(notif => (
          <div key={notif.id} className={`flex items-start gap-5 p-5 rounded-[24px] border transition-all ${notif.read ? 'bg-white border-[#e1e2ed] shadow-sm' : 'bg-white/70 backdrop-blur-xl border-white/20 shadow-[0_8px_30px_rgba(37,99,235,0.08)]'}`}>
            <div className="w-12 h-12 rounded-full bg-[#dbe1ff] text-[#004ac6] flex items-center justify-center shrink-0">
              <span className="material-symbols-outlined">{notif.type === 'vote' ? 'favorite' : 'forum'}</span>
            </div>
            <div className="flex-grow pt-1">
              <div className="flex justify-between items-start mb-1">
                <h4 className="font-black text-[15px] text-[#191b23]">{notif.title}</h4>
                <span className="text-[11px] font-bold text-[#737686] uppercase tracking-wider">{formatRelativeTime ? formatRelativeTime(notif.time) : 'JUST NOW'}</span>
              </div>
              <p className="text-sm font-medium text-[#434655]">{notif.message}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
