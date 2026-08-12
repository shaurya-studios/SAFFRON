import React from 'react';
import { LucideIcon } from 'lucide-react';

interface DoodleProps {
  icon: LucideIcon;
  size?: number;
  className?: string;
  rotation?: number;
  strokeWidth?: number;
}

export const Doodle = ({ icon: Icon, size = 64, className = "", rotation = 0, strokeWidth = 1.5 }: DoodleProps) => {
  return (
    <div 
      className={`flex justify-center items-center my-6 opacity-80 ${className}`}
      style={{ transform: `rotate(${rotation}deg)` }}
    >
      <Icon 
        size={size} 
        strokeWidth={strokeWidth}
        className="doodle-stroke"
      />
    </div>
  );
};
