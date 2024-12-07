import React from 'react';
import { Zap, Play } from 'lucide-react';
import { useTheme } from '../../../../contexts/ThemeContext';

interface ShortsStormProps {
  onToggle: () => void;
  isActive: boolean;
}

const ShortsStorm = ({ onToggle, isActive }: ShortsStormProps) => {
  const { theme } = useTheme();

  return (
    <button
      onClick={onToggle}
      className={`group relative overflow-hidden px-6 py-3 rounded-full transition-all duration-300 ${
        isActive
          ? 'bg-gradient-to-r from-red-500 via-orange-500 to-yellow-500'
          : theme === 'dark'
            ? 'bg-gray-800 hover:bg-gray-700'
            : 'bg-gray-100 hover:bg-gray-200'
      }`}
    >
      <div className="absolute inset-0 bg-gradient-to-r from-red-500 via-orange-500 to-yellow-500 opacity-0 group-hover:opacity-100 transition-opacity" />
      
      <div className="relative flex items-center gap-2">
        <Zap className={`w-5 h-5 ${
          isActive ? 'text-white' : 'text-primary'
        } ${!isActive && 'group-hover:animate-bounce'}`} />
        <span className={isActive ? 'text-white' : theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}>
          Short Storm
        </span>
      </div>

      {isActive && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="absolute inset-0 bg-black/10" />
          <div className="relative animate-pulse">
            <Play className="w-4 h-4 text-white" />
          </div>
        </div>
      )}
    </button>
  );
};

export default ShortsStorm;