export const formatDate = (dateString) => {
  if (!dateString) return '';
  const options = { year: 'numeric', month: 'short', day: 'numeric' };
  return new Date(dateString).toLocaleDateString(undefined, options);
};

export const formatRelativeTime = (dateString) => {
  if (!dateString) return '';
  const date = new Date(dateString);
  const now = new Date();
  const diffInSeconds = Math.floor((now - date) / 1000);

  if (diffInSeconds < 60) return 'just now';
  if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)}m ago`;
  if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)}h ago`;
  if (diffInSeconds < 2592000) return `${Math.floor(diffInSeconds / 86400)}d ago`;
  return formatDate(dateString);
};

export const truncateText = (text, maxLength) => {
  if (!text) return '';
  if (text.length <= maxLength) return text;
  return `${text.substring(0, maxLength)}...`;
};

export const getCategoryColor = (category) => {
  const colors = {
    technology: 'bg-primary-container/10 text-primary border-primary-container/30',
    business: 'bg-secondary-container/10 text-secondary border-secondary-container/30',
    design: 'bg-tertiary-container/10 text-tertiary border-tertiary-container/30',
    marketing: 'bg-warning/10 text-warning border-warning/30',
    default: 'bg-surface-container text-on-surface-variant border-outline/20'
  };
  return colors[category?.toLowerCase()] || colors.default;
};

export const getCategoryIcon = (category) => {
  const icons = {
    technology: 'computer',
    business: 'work',
    design: 'palette',
    marketing: 'campaign',
    default: 'label'
  };
  return icons[category?.toLowerCase()] || icons.default;
};

export const getStatusColor = (status) => {
  const colors = {
    open: 'text-success bg-success/10',
    closed: 'text-on-surface-variant bg-surface-container',
    pending: 'text-warning bg-warning/10',
    draft: 'text-secondary bg-secondary-container/20'
  };
  return colors[status?.toLowerCase()] || colors.open;
};

export const generateAvatar = (name) => {
  if (!name) return { initials: '?', color: 'bg-primary text-white' };
  
  const initials = name
    .split(' ')
    .map(n => n[0])
    .join('')
    .substring(0, 2)
    .toUpperCase();
    
  const colors = [
    'bg-primary', 'bg-secondary', 'bg-tertiary', 
    'bg-[#059669]', 'bg-[#d97706]', 'bg-[#db2777]'
  ];
  
  const hash = name.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
  const color = colors[hash % colors.length];
  
  return { initials, color: `${color} text-white` };
};
