import React from 'react';
import { AppIntegration } from '../../types';

interface ConnectAppsDropdownProps {
  isOpen: boolean;
}

const ConnectAppsDropdown = ({ isOpen }: ConnectAppsDropdownProps) => {
  const apps: AppIntegration[] = [
    { name: 'YouTube', icon: 'https://static.wixstatic.com/media/c67dd6_aea51bc85e594033b8a29040d67b1d15~mv2.png', connected: true },
    { name: 'Notion', icon: 'https://static.wixstatic.com/media/c67dd6_31a11021abd44aa0bd76ecc124f3fa9c~mv2.png', connected: true },
    { name: 'Spotify', icon: 'https://static.wixstatic.com/media/c67dd6_ec71f45884124292ab688e1089e48cb4~mv2.png', connected: true },
    { name: 'CreatorOS', icon: 'https://static.wixstatic.com/media/c67dd6_1244908d1b0545f6ac85b9f17e808a66~mv2.png', connected: true },
    { name: 'Zapier', icon: 'https://static.wixstatic.com/media/c67dd6_4de0049f34934c93ac04c63d0bb84608~mv2.png', connected: true },
    { name: 'Placemento', icon: 'https://static.wixstatic.com/media/c67dd6_6995f5ff5a9a4e03b53a5c9a7ce530fa~mv2.png', connected: true },
    { name: 'Miro', icon: 'https://static.wixstatic.com/media/c67dd6_db7bcff2a108431cab79c8c90c531d62~mv2.png', connected: true },
    { name: 'Google Tasks', icon: 'https://static.wixstatic.com/media/c67dd6_a9320374565d487ab96fa91c5c0ad8fd~mv2.avif', connected: true },
    { name: 'Skool', icon: 'https://static.wixstatic.com/media/c67dd6_bd2d62a49a6d4cf3b0f670cda8876925~mv2.png', connected: true },
    { name: 'Bonzai', icon: 'https://static.wixstatic.com/media/c67dd6_f81b724e8fd74c379d41d02ba1b335d9~mv2.png', connected: true },
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
            <span className="inline-block px-2 py-0.5 bg-primary/20 text-primary text-xs rounded-full">
              Connected
            </span>
          </div>
        </div>
      ))}
    </div>
  );
}

export default ConnectAppsDropdown;