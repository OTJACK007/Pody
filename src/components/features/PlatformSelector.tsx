import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { usePlatform } from '../../hooks/usePlatform';

interface Platform {
  name: string;
  icon: string;
  status: 'available' | 'soon';
}

interface PlatformSelectorProps {
  className?: string;
}

const PlatformSelector = ({ className = '' }: PlatformSelectorProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const { selectedPlatform, setSelectedPlatform } = usePlatform();

  const platforms: Platform[] = [
    { 
      name: 'YouTube',
      icon: 'https://static.wixstatic.com/media/c67dd6_aea51bc85e594033b8a29040d67b1d15~mv2.png',
      status: 'available'
    },
    { 
      name: 'X/Twitter',
      icon: 'https://static.wixstatic.com/media/c67dd6_a7b28b585b034f56ad6ab32232e745fc~mv2.webp',
      status: 'soon'
    },
    { 
      name: 'TikTok',
      icon: 'https://static.wixstatic.com/media/c67dd6_f4ebb22077d749f8ab5abdb4ae142cae~mv2.png',
      status: 'soon'
    },
    { 
      name: 'Instagram',
      icon: 'https://static.wixstatic.com/media/c67dd6_b9fe6adb4004453a9db57fe97cd4d6aa~mv2.png',
      status: 'soon'
    },
    { 
      name: 'Spotify',
      icon: 'https://static.wixstatic.com/media/c67dd6_ec71f45884124292ab688e1089e48cb4~mv2.png',
      status: 'soon'
    }
  ];

  const selectedPlatformData = platforms.find(p => p.name === selectedPlatform) || platforms[0];

  return (
    <div className={`relative ${className}`}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        onBlur={() => setTimeout(() => setIsOpen(false), 200)}
        className="flex items-center space-x-2 bg-gray-800/80 hover:bg-gray-800 px-3 py-2 rounded-lg transition-colors"
      >
        <img
          src={selectedPlatformData.icon}
          alt={selectedPlatformData.name}
          className="w-5 h-5 object-contain"
        />
        <span className="text-white text-sm">{selectedPlatformData.name}</span>
        <ChevronDown className="w-4 h-4 text-gray-400" />
      </button>

      {isOpen && (
        <div className="absolute top-full right-0 mt-2 w-48 bg-background border border-gray-800 rounded-lg shadow-xl py-2 z-50">
          {platforms.map((platform) => (
            <button
              key={platform.name}
              className="flex items-center space-x-3 w-full px-4 py-2 hover:bg-gray-800 transition-colors group"
              onClick={() => {
                setSelectedPlatform(platform.name as any);
                setIsOpen(false);
              }}
            >
              <img
                src={platform.icon}
                alt={platform.name}
                className="w-5 h-5 object-contain"
              />
              <span className="text-white text-sm">{platform.name}</span>
              <span className={`ml-auto text-xs ${platform.status === 'available' ? 'text-primary' : 'text-secondary'}`}>
                {platform.status === 'available' ? 'Available' : 'Soon'}
              </span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default PlatformSelector;