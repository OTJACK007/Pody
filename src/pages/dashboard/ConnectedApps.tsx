import React from 'react';
import { useNavigate } from 'react-router-dom';
import { AppWindow, ExternalLink } from 'lucide-react';
import { Card, CardBody, Switch } from "@nextui-org/react";
import { useTheme } from '../../contexts/ThemeContext';

const ConnectedApps = () => {
  const navigate = useNavigate();
  const { theme } = useTheme();

  const apps = [
    {
      id: 'youtube',
      name: 'YouTube',
      icon: 'https://static.wixstatic.com/media/c67dd6_aea51bc85e594033b8a29040d67b1d15~mv2.png',
      description: 'Share your podcast content',
      isConnected: true,
      color: 'bg-red-500/10',
      textColor: 'text-red-500'
    },
    {
      id: 'x-twitter',
      name: 'X/Twitter',
      icon: 'https://static.wixstatic.com/media/c67dd6_a7b28b585b034f56ad6ab32232e745fc~mv2.webp',
      description: 'Engage with your audience',
      isConnected: false,
      color: 'bg-blue-500/10',
      textColor: 'text-blue-500'
    },
    {
      id: 'meta',
      name: 'Meta',
      icon: 'https://static.wixstatic.com/media/c67dd6_e11a6a0bb99345839dbdc7cf12357c0b~mv2.png',
      description: 'Connect with Meta platforms',
      isConnected: false,
      color: 'bg-blue-500/10',
      textColor: 'text-blue-500'
    },
    {
      id: 'notion',
      name: 'Notion',
      icon: 'https://static.wixstatic.com/media/c67dd6_c0f6b842de844dff9ac8e0e71e7e5a18~mv2.png',
      description: 'Organize your notes and summaries',
      isConnected: false,
      color: 'bg-gray-500/10',
      textColor: 'text-gray-500'
    },
    {
      id: 'spotify',
      name: 'Spotify',
      icon: 'https://static.wixstatic.com/media/c67dd6_ec71f45884124292ab688e1089e48cb4~mv2.png',
      description: 'Sync your podcast playlists',
      isConnected: true,
      color: 'bg-green-500/10',
      textColor: 'text-green-500'
    },
    {
      id: 'zapier',
      name: 'Zapier',
      icon: 'https://static.wixstatic.com/media/c67dd6_4de0049f34934c93ac04c63d0bb84608~mv2.png',
      description: 'Automate your workflows',
      isConnected: false,
      color: 'bg-orange-500/10',
      textColor: 'text-orange-500'
    },
    {
      id: 'opus-clip',
      name: 'Opus Clip',
      icon: 'https://static.wixstatic.com/media/c67dd6_c8ef1b8e181340c0a540162c50c059a1~mv2.png',
      description: 'Create short-form content',
      isConnected: false,
      color: 'bg-purple-500/10',
      textColor: 'text-purple-500'
    },
    {
      id: 'miro',
      name: 'Miro',
      icon: 'https://static.wixstatic.com/media/c67dd6_db7bcff2a108431cab79c8c90c531d62~mv2.png',
      description: 'Visualize your content strategy',
      isConnected: false,
      color: 'bg-yellow-500/10',
      textColor: 'text-yellow-500'
    },
    {
      id: 'google-tasks',
      name: 'Google Tasks',
      icon: 'https://static.wixstatic.com/media/c67dd6_a9320374565d487ab96fa91c5c0ad8fd~mv2.avif',
      description: 'Manage your tasks and reminders',
      isConnected: true,
      color: 'bg-blue-600/10',
      textColor: 'text-blue-600'
    },
    {
      id: 'skool',
      name: 'Skool',
      icon: 'https://static.wixstatic.com/media/c67dd6_183e7da825044704859844a354659a3e~mv2.png',
      description: 'Build your learning community',
      isConnected: false,
      color: 'bg-pink-500/10',
      textColor: 'text-pink-500'
    },
    {
      id: 'bonzai',
      name: 'Bonzai',
      icon: 'https://static.wixstatic.com/media/c67dd6_79b52518fc054f2ba3c38af876ecf7d8~mv2.png',
      description: 'Optimize your content reach',
      isConnected: false,
      color: 'bg-teal-500/10',
      textColor: 'text-teal-500'
    },
    {
      id: 'patreon',
      name: 'Patreon',
      icon: 'https://static.wixstatic.com/media/c67dd6_1ea98dca9e6b42e5914438202de7b6bb~mv2.png',
      description: 'Monetize your content',
      isConnected: false,
      color: 'bg-red-400/10',
      textColor: 'text-red-400'
    }
  ];

  return (
    <div className="space-y-8">
      <div className="flex items-center gap-3">
        <AppWindow className="w-8 h-8 text-primary" />
        <div>
          <h1 className={`text-3xl font-bold ${
            theme === 'dark' ? 'text-white' : 'text-gray-900'
          }`}>Connected Apps</h1>
          <p className={theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}>
            Manage your app integrations and connections
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {apps.map((app) => (
          <Card 
            key={app.id}
            className={`${
              theme === 'dark' 
                ? 'bg-gray-800/50 border-gray-700/50 hover:bg-gray-800' 
                : 'bg-white border-gray-200 hover:bg-gray-50'
            } border transition-all duration-300`}
          >
            <CardBody className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className={`p-3 rounded-xl ${app.color}`}>
                    <img 
                      src={app.icon} 
                      alt={app.name}
                      className="w-8 h-8 object-contain"
                    />
                  </div>
                  <div>
                    <h3 className={`text-lg font-semibold ${
                      theme === 'dark' ? 'text-white' : 'text-gray-900'
                    }`}>{app.name}</h3>
                    <p className={app.textColor}>
                      {app.isConnected ? 'Connected' : 'Not Connected'}
                    </p>
                  </div>
                </div>
                <Switch
                  defaultSelected={app.isConnected}
                  size="sm"
                  color="success"
                  className="ml-4"
                />
              </div>

              <p className={`text-sm ${
                theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
              }`}>
                {app.description}
              </p>

              <button 
                onClick={() => navigate(`/dashboard/connected-apps/configure/${app.id}`)}
                className={`mt-4 w-full flex items-center justify-center gap-2 px-4 py-2 rounded-lg transition-colors text-sm ${
                  theme === 'dark'
                    ? 'bg-gray-700/50 hover:bg-gray-700 text-gray-300'
                    : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
                }`}
              >
                <span>Configure</span>
                <ExternalLink className="w-4 h-4" />
              </button>
            </CardBody>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default ConnectedApps;