import React from 'react';
import { AppIntegration } from '../../types';

interface ConnectAppsDropdownProps {
  isOpen: boolean;
}

const ConnectAppsDropdown = ({ isOpen }: ConnectAppsDropdownProps) => {
  const apps: AppIntegration[] = [
    { name: 'YouTube', icon: 'https://static.wixstatic.com/media/c67dd6_aea51bc85e594033b8a29040d67b1d15~mv2.png', connected: true },
    { name: 'X/Twitter', icon: 'https://static.wixstatic.com/media/c67dd6_a7b28b585b034f56ad6ab32232e745fc~mv2.webp', comingSoon: true },
    { name: 'Notion', icon: 'https://static.wixstatic.com/media/c67dd6_c0f6b842de844dff9ac8e0e71e7e5a18~mv2.png', comingSoon: true },
    { name: 'Spotify', icon: 'https://static.wixstatic.com/media/c67dd6_ec71f45884124292ab688e1089e48cb4~mv2.png', comingSoon: true },
    { name: 'Zapier', icon: 'https://static.wixstatic.com/media/c67dd6_4de0049f34934c93ac04c63d0bb84608~mv2.png', comingSoon: true },
    { name: 'Opus Clip', icon: 'https://static.wixstatic.com/media/c67dd6_c8ef1b8e181340c0a540162c50c059a1~mv2.png', comingSoon: true },
    { name: 'Miro', icon: 'https://static.wixstatic.com/media/c67dd6_db7bcff2a108431cab79c8c90c531d62~mv2.png', comingSoon: true },
    { name: 'Google Tasks', icon: 'https://static.wixstatic.com/media/c67dd6_a9320374565d487ab96fa91c5c0ad8fd~mv2.avif', connected: true },
    { name: 'Skool', icon: 'https://static.wixstatic.com/media/c67dd6_183e7da825044704859844a354659a3e~mv2.png', comingSoon: true },
    { name: 'Bonzai', icon: 'https://static.wixstatic.com/media/c67dd6_79b52518fc054f2ba3c38af876ecf7d8~mv2.png', comingSoon: true },
  ];

  if (!isOpen) return null;

  return (
    <div className="absolute top-full right-0 md:left-0 mt-2 w-[calc(100vw-2rem)] md:w-[400px] bg-background border border-gray-800 rounded-lg shadow-xl p-4 grid grid-cols-1 md:grid-cols-2 gap-4 max-h-[80vh] overflow-y-auto">
      {apps.map((app) => (
        <div
          key={app.name}
          className="relative group flex items-center space-x-3 p-3 rounded-lg bg-gray-800/50 hover:bg-gray-800 transition-all cursor-pointer"
        >
          {app.icon ? (
            <img src={app.icon} alt={app.name} className="w-8 h-8 object-contain" />
          ) : (
            <div className="w-8 h-8 bg-gray-700 rounded-lg" />
          )}
          <div>
            <p className="text-white font-medium">{app.name}</p>
            {app.connected ? (
              <span className="inline-block px-2 py-0.5 bg-primary/20 text-primary text-xs rounded-full">
                Connected
              </span>
            ) : (
              <span className="inline-block px-2 py-0.5 bg-secondary/20 text-secondary text-xs rounded-full">
                Coming Soon
              </span>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}

export default ConnectAppsDropdown;