import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';

export default function ProfilePage() {
  const { user } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const profileData = { name: user?.name || 'Jane Doe', username: user?.username || 'janedoe', bio: 'Passionate about technology.', location: 'San Francisco, CA', website: 'janedoe.com' };

  return (
    <div className="max-w-4xl mx-auto p-4 md:p-8 bg-[#faf8ff] min-h-screen">
      <div className="bg-white/70 backdrop-blur-xl border border-white/20 shadow-[0_8px_30px_rgba(37,99,235,0.08)] rounded-[32px] overflow-hidden">
        <div className="h-48 bg-gradient-to-r from-[#4338d9] to-[#004ac6]"></div>
        <div className="px-10 pb-10 relative">
          <div className="flex justify-between items-end -mt-20 mb-8">
            <div className="w-40 h-40 rounded-[32px] border-8 border-white bg-[#eaddff] flex items-center justify-center text-5xl font-black text-[#712ae2] shadow-sm">{profileData.name.charAt(0)}</div>
            <button style={{ background: 'linear-gradient(135deg, #4338d9 0%, #004ac6 100%)' }} className="text-white px-6 py-2.5 rounded-xl font-bold shadow-md hover:-translate-y-[1px] transition-all flex items-center gap-2">
              <span className="material-symbols-outlined text-[18px]">edit</span> Edit Profile
            </button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            <div className="md:col-span-2 space-y-6">
              <div>
                <h1 className="text-4xl font-black text-[#191b23] flex items-center gap-4 mb-2">{profileData.name} <span className="bg-[#dbe1ff] text-[#004ac6] text-xs px-3 py-1 rounded-full font-bold">User</span></h1>
                <p className="text-[#434655] font-bold text-lg">@{profileData.username}</p>
              </div>
              <p className="text-[#191b23] text-lg font-medium">{profileData.bio}</p>
              <div className="flex gap-6 text-sm font-bold text-[#737686] pt-4">
                <span className="flex items-center gap-2"><span className="material-symbols-outlined text-[20px]">location_on</span> {profileData.location}</span>
                <span className="flex items-center gap-2"><span className="material-symbols-outlined text-[20px]">link</span> <span className="text-[#004ac6]">{profileData.website}</span></span>
              </div>
            </div>
            <div className="bg-[#f3f3fe] rounded-[24px] p-8 border border-[#e1e2ed]">
              <h3 className="font-black text-[#191b23] mb-6 text-xl">Stats</h3>
              <div className="space-y-6">
                <div>
                  <div className="flex justify-between text-sm font-bold mb-2"><span className="text-[#434655]">Decisions</span><span className="text-[#004ac6]">12</span></div>
                  <div className="w-full bg-[#e1e2ed] rounded-full h-2"><div className="bg-[#004ac6] h-2 rounded-full" style={{width: '60%'}}></div></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
