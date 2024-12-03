import React from 'react';
import { Share2, ExternalLink, CheckCircle2 } from 'lucide-react';
import { Card, CardBody, Button, Avatar } from "@nextui-org/react";
import { useTheme } from '../../contexts/ThemeContext';

const SocialAccounts = () => {
  const { theme } = useTheme();

  const socialNetworks = [
    {
      id: 1,
      name: 'YouTube',
      icon: 'https://static.wixstatic.com/media/c67dd6_aea51bc85e594033b8a29040d67b1d15~mv2.png',
      description: 'Share your podcast content',
      followers: '1.2M',
      isConnected: true,
      color: 'bg-red-500/10 hover:bg-red-500/20',
      textColor: 'text-red-500'
    },
    {
      id: 2,
      name: 'X/Twitter',
      icon: 'https://static.wixstatic.com/media/c67dd6_a7b28b585b034f56ad6ab32232e745fc~mv2.webp',
      description: 'Engage with your audience',
      followers: '850K',
      isConnected: true,
      color: 'bg-blue-500/10 hover:bg-blue-500/20',
      textColor: 'text-blue-500'
    },
    {
      id: 3,
      name: 'TikTok',
      icon: 'https://static.wixstatic.com/media/c67dd6_b7587372515d41e38da514bcb9cb0214~mv2.webp',
      description: 'Share short-form clips',
      followers: '2.1M',
      isConnected: false,
      color: 'bg-pink-500/10 hover:bg-pink-500/20',
      textColor: 'text-pink-500'
    },
    {
      id: 4,
      name: 'Instagram',
      icon: 'https://static.wixstatic.com/media/c67dd6_b9fe6adb4004453a9db57fe97cd4d6aa~mv2.png',
      description: 'Share podcast highlights',
      followers: '925K',
      isConnected: false,
      color: 'bg-purple-500/10 hover:bg-purple-500/20',
      textColor: 'text-purple-500'
    },
    {
      id: 5,
      name: 'Spotify',
      icon: 'https://static.wixstatic.com/media/c67dd6_ec71f45884124292ab688e1089e48cb4~mv2.png',
      description: 'Distribute your podcasts',
      followers: '500K',
      isConnected: true,
      color: 'bg-green-500/10 hover:bg-green-500/20',
      textColor: 'text-green-500'
    },
    {
      id: 6,
      name: 'LinkedIn',
      icon: 'https://static.wixstatic.com/media/c67dd6_bb44a9fdef4e4fabbbbbad4f88a24540~mv2.webp',
      description: 'Share professional content',
      followers: '320K',
      isConnected: false,
      color: 'bg-blue-600/10 hover:bg-blue-600/20',
      textColor: 'text-blue-600'
    }
  ];

  return (
    <div className="space-y-8">
      <div className="flex items-center gap-3">
        <Share2 className="w-8 h-8 text-primary" />
        <div>
          <h1 className={`text-3xl font-bold ${
            theme === 'dark' ? 'text-white' : 'text-gray-900'
          }`}>Social Accounts</h1>
          <p className={theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}>
            Connect and manage your social media accounts
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {socialNetworks.map((network) => (
          <Card 
            key={network.id}
            className={`${
              theme === 'dark' 
                ? 'bg-gray-800/50 border-gray-700/50 hover:bg-gray-800' 
                : 'bg-white border-gray-200 hover:bg-gray-50'
            } border transition-all duration-300`}
          >
            <CardBody className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className={`p-3 rounded-xl ${network.color}`}>
                    <Avatar
                      src={network.icon}
                      className="w-8 h-8"
                    />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className={`text-lg font-semibold ${
                        theme === 'dark' ? 'text-white' : 'text-gray-900'
                      }`}>{network.name}</h3>
                      {network.isConnected && (
                        <CheckCircle2 className="w-4 h-4 text-primary" />
                      )}
                    </div>
                    {network.isConnected && (
                      <p className={network.textColor}>
                        {network.followers} followers
                      </p>
                    )}
                  </div>
                </div>
              </div>

              <p className={`text-sm h-10 ${
                theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
              }`}>
                {network.description}
              </p>

              <Button
                className={`w-full ${
                  network.isConnected 
                    ? `${theme === 'dark' ? 'bg-gray-700 text-gray-300 hover:bg-gray-600' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`
                    : 'bg-primary text-white hover:bg-primary/90'
                }`}
                endContent={network.isConnected ? null : <ExternalLink className="w-4 h-4" />}
              >
                {network.isConnected ? 'Connected' : 'Connect Account'}
              </Button>
            </CardBody>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default SocialAccounts;