import React from 'react';
import { CheckCircle2, Users, Bell, ExternalLink } from 'lucide-react';
import { Button, Avatar } from "@nextui-org/react";
import { useTheme } from '../../../../../contexts/ThemeContext';

const ChannelInfo = () => {
  const { theme } = useTheme();

  const channel = {
    name: 'TechInsights',
    description: 'Daily tech news, insights, and in-depth interviews with industry leaders',
    bannerImage: 'https://images.unsplash.com/photo-1535303311164-664fc9ec6532?w=1200',
    avatar: 'https://images.unsplash.com/photo-1535303311164-664fc9ec6532?w=400',
    subscribers: '1.2M',
    platform: 'YouTube',
    platformIcon: 'https://static.wixstatic.com/media/c67dd6_aea51bc85e594033b8a29040d67b1d15~mv2.png',
    verified: true,
    stats: {
      avgRating: 4.8
    }
  };

  return (
    <>
      {/* Channel Banner */}
      <div className="relative h-[200px] md:h-[300px] rounded-xl overflow-hidden">
        <img
          src={channel.bannerImage}
          alt={`${channel.name} banner`}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
      </div>

      {/* Channel Info */}
      <div className="flex flex-col md:flex-row gap-6 items-start">
        <Avatar
          src={channel.avatar}
          className={`w-24 h-24 md:w-32 md:h-32 ring-4 ${
            theme === 'dark' ? 'ring-gray-800' : 'ring-gray-200'
          }`}
        />
        <div className="flex-grow">
          <div className="flex items-center gap-3 mb-2">
            <h1 className={`text-3xl font-bold ${
              theme === 'dark' ? 'text-white' : 'text-gray-900'
            }`}>{channel.name}</h1>
            {channel.verified && (
              <CheckCircle2 className="w-6 h-6 text-primary" />
            )}
            <div className={`flex items-center gap-2 px-3 py-1 rounded-full ${
              theme === 'dark' ? 'bg-gray-800/50' : 'bg-gray-100'
            }`}>
              <img 
                src={channel.platformIcon} 
                alt={channel.platform}
                className="w-4 h-4"
              />
              <span className={theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}>
                {channel.platform}
              </span>
            </div>
          </div>
          <p className={`mb-4 max-w-2xl ${
            theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
          }`}>{channel.description}</p>
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2">
              <Users className={theme === 'dark' ? 'text-gray-400' : 'text-gray-500'} />
              <span className={`font-medium ${
                theme === 'dark' ? 'text-white' : 'text-gray-900'
              }`}>{channel.subscribers} subscribers</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-yellow-400">★</span>
              <span className={theme === 'dark' ? 'text-white' : 'text-gray-900'}>
                {channel.stats.avgRating} rating
              </span>
            </div>
          </div>
        </div>
        <div className="flex gap-3">
          <Button
            startContent={<Bell className="w-4 h-4" />}
            className="bg-primary text-white"
          >
            Subscribe
          </Button>
          <Button
            startContent={<ExternalLink className="w-4 h-4" />}
            className={`${
              theme === 'dark'
                ? 'bg-gray-700 text-white'
                : 'bg-gray-200 text-gray-900'
            }`}
          >
            Visit Channel
          </Button>
        </div>
      </div>
    </>
  );
};

export default ChannelInfo;