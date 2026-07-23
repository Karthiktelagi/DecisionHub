import React, { useState } from 'react';
import { formatRelativeTime } from '../utils/helpers';

export default function CommentThread({ comments, onAddComment, onReply, depth = 0 }) {
  const [replyTo, setReplyTo] = useState(null);
  const [replyContent, setReplyContent] = useState('');
  const [newComment, setNewComment] = useState('');

  const handleReplySubmit = (parentId) => {
    if (replyContent.trim()) {
      onReply(parentId, replyContent.trim());
      setReplyContent('');
      setReplyTo(null);
    }
  };

  const handleAddComment = () => {
    if (newComment.trim()) {
      onAddComment(newComment.trim());
      setNewComment('');
    }
  };

  return (
    <div className={`space-y-4 ${depth > 0 ? 'ml-6 pl-4 border-l-2 border-[#dbe1ff]' : ''}`}>
      {depth === 0 && (
        <div className="flex gap-4 mb-8 bg-white p-6 rounded-[24px] border border-[#e1e2ed] shadow-sm">
          <div className="w-10 h-10 rounded-full bg-[#004ac6] flex items-center justify-center text-white font-bold text-sm shrink-0">
            Me
          </div>
          <div className="flex-grow flex flex-col gap-3">
            <textarea
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              placeholder="Share your thoughts..."
              className="w-full bg-[#f3f3fe] border border-[#e1e2ed] rounded-xl p-4 text-sm text-[#191b23] focus:outline-none focus:border-[#004ac6] focus:ring-1 focus:ring-[#004ac6] resize-none min-h-[100px]"
            />
            <div className="flex justify-end">
              <button 
                onClick={handleAddComment}
                disabled={!newComment.trim()}
                style={{ background: 'linear-gradient(135deg, #4338d9 0%, #004ac6 100%)' }}
                className="text-white px-5 py-2 rounded-xl text-sm font-medium transition-all shadow-md hover:-translate-y-[1px] disabled:opacity-50 flex items-center gap-2"
              >
                <span className="material-symbols-outlined text-[16px]">send</span> Comment
              </button>
            </div>
          </div>
        </div>
      )}

      {comments?.map((comment) => (
        <div key={comment._id} className="flex flex-col gap-3 transition-all">
          <div className="flex gap-4 group">
            <div className="w-10 h-10 rounded-full bg-[#eaddff] flex items-center justify-center text-[#712ae2] font-bold text-sm shrink-0 ring-2 ring-white shadow-sm">
              {comment.user?.username?.charAt(0).toUpperCase() || 'U'}
            </div>
            <div className="flex-grow bg-white p-4 rounded-2xl rounded-tl-md border border-[#e1e2ed] shadow-sm">
              <div className="flex items-baseline justify-between mb-2">
                <span className="font-bold text-sm text-[#191b23]">{comment.user?.username || 'Anonymous'}</span>
                <span className="text-[11px] font-medium text-[#737686]">{formatRelativeTime ? formatRelativeTime(comment.createdAt) : 'Just now'}</span>
              </div>
              <p className="text-sm text-[#434655] whitespace-pre-wrap leading-relaxed">{comment.content}</p>
              <div className="flex justify-start mt-3 pt-3 border-t border-[#f3f3fe]">
                <button 
                  onClick={() => setReplyTo(replyTo === comment._id ? null : comment._id)}
                  className="text-xs text-[#737686] hover:text-[#004ac6] font-bold flex items-center gap-1.5 transition-colors"
                >
                  <span className="material-symbols-outlined text-[16px]">reply</span> Reply
                </button>
              </div>
            </div>
          </div>

          {replyTo === comment._id && (
            <div className="flex gap-3 ml-14 mt-1">
              <div className="text-[#c3c6d7] pt-2"><span className="material-symbols-outlined">subdirectory_arrow_right</span></div>
              <div className="flex-grow flex gap-2 items-start bg-white p-3 rounded-xl border border-[#e1e2ed] shadow-sm">
                <textarea
                  value={replyContent}
                  onChange={(e) => setReplyContent(e.target.value)}
                  placeholder="Write a reply..."
                  className="w-full bg-[#f3f3fe] border border-[#e1e2ed] rounded-lg p-3 text-sm text-[#191b23] focus:outline-none focus:border-[#004ac6] resize-none h-12 min-h-[48px]"
                  autoFocus
                />
                <button 
                  onClick={() => handleReplySubmit(comment._id)}
                  style={{ background: 'linear-gradient(135deg, #4338d9 0%, #004ac6 100%)' }}
                  className="text-white p-3 rounded-lg transition-transform hover:-translate-y-[1px] shadow-md shrink-0"
                >
                  <span className="material-symbols-outlined text-[18px]">send</span>
                </button>
              </div>
            </div>
          )}

          {comment.replies && comment.replies.length > 0 && (
            <CommentThread 
              comments={comment.replies} 
              onAddComment={onAddComment} 
              onReply={onReply} 
              depth={depth + 1} 
            />
          )}
        </div>
      ))}
    </div>
  );
}
