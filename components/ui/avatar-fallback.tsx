import React from 'react';

interface AvatarFallbackProps {
  name: string;
  className?: string;
}

export function AvatarFallback({ name, className = "w-24 h-24" }: AvatarFallbackProps) {
  // Generate a color based on the name
  const getInitialBgColor = (name: string) => {
    const colors = [
      'bg-blue-500', 'bg-green-500', 'bg-yellow-500', 
      'bg-red-500', 'bg-purple-500', 'bg-pink-500', 
      'bg-indigo-500', 'bg-cyan-500', 'bg-teal-500'
    ];
    
    // Simple hash function to get a consistent color for the same name
    let hash = 0;
    for (let i = 0; i < name.length; i++) {
      hash = name.charCodeAt(i) + ((hash << 5) - hash);
    }
    
    return colors[Math.abs(hash) % colors.length];
  };

  // Get initials from name
  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(part => part[0])
      .join('')
      .toUpperCase()
      .substring(0, 2);
  };

  const bgColor = getInitialBgColor(name);
  const initials = getInitials(name);

  return (
    <div 
      className={`${className} rounded-full flex items-center justify-center text-white font-medium ${bgColor}`}
    >
      {initials}
    </div>
  );
} 