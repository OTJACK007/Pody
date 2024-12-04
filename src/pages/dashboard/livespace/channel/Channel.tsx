import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CheckCircle2, Users, Bell, ExternalLink, Crown, UserPlus, Star } from 'lucide-react';
import { Button, Avatar, Badge } from "@nextui-org/react";
import { useTheme } from '../../../../contexts/ThemeContext';
import ChannelHeader from './components/ChannelHeader';
import ChannelInfo from './components/ChannelInfo';
import ChannelStats from './components/ChannelStats';
import ChannelEpisodes from './components/ChannelEpisodes';
import SubscriptionModal from '../../../../components/modals/SubscriptionModal';

const Channel = () => {
  const navigate = useNavigate();
  const { theme } = useTheme();
  const [showSubscriptionModal, setShowSubscriptionModal] = useState(false);

  return (
    <div className="space-y-8">
      <ChannelHeader onBack={() => navigate('/dashboard/livespace')} />
      <div className="relative h-[200px] md:h-[300px] rounded-xl overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1517976487492-5750f3195933?w=1200"
          alt="Channel banner"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
      </div>

      <div className="flex flex-col md:flex-row gap-6 items-start">
        <Avatar
          src="https://images.unsplash.com/photo-1535303311164-664fc9ec6532?w=400"
          className={`w-32 h-32 ring-4 rounded-full flex-shrink-0 ${
            theme === 'dark' ? 'ring-gray-800' : 'ring-gray-200'
          }`}
        />
        <div className="flex-grow">
          <div className="flex items-center gap-3 mb-2">
            <h1 className={`text-3xl font-bold ${
              theme === 'dark' ? 'text-white' : 'text-gray-900'
            }`}>TechInsights</h1>
            <CheckCircle2 className="w-6 h-6 text-primary" />
          </div>
          <p className={`text-lg mb-2 ${
            theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
          }`}>Daily tech news, insights, and in-depth interviews with industry leaders</p>
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2">
              <Users className={theme === 'dark' ? 'text-gray-400' : 'text-gray-500'} />
              <span className={`font-medium ${
                theme === 'dark' ? 'text-white' : 'text-gray-900'
              }`}>1.2M followers</span>
            </div>
            <div className="flex items-center gap-2">
              <Star className="text-yellow-400" />
              <span className={theme === 'dark' ? 'text-white' : 'text-gray-900'}>
                4.8 rating
              </span>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <Button
            startContent={<Crown className="w-4 h-4" />}
            className="bg-secondary text-black font-medium hover:bg-secondary/90"
            onClick={() => setShowSubscriptionModal(true)}
          >
            Subscribe • $5/mo
          </Button>
          <Button
            startContent={<UserPlus className="w-4 h-4" />}
            className="bg-primary text-white hover:bg-primary/90"
          >
            Follow
          </Button>
          <Button
            startContent={<ExternalLink className="w-4 h-4" />}
            className={`${
              theme === 'dark'
                ? 'bg-gray-700 text-white hover:bg-gray-600'
                : 'bg-gray-200 text-gray-900 hover:bg-gray-300'
            }`}
          >
            Visit Channel
          </Button>
        </div>
      </div>

      <ChannelStats />
      <ChannelEpisodes />

      <SubscriptionModal
        isOpen={showSubscriptionModal}
        onClose={() => setShowSubscriptionModal(false)}
        channelName="TechInsights"
        subscriptionPrice="5.00"
      />
    </div>
  );
};

export default Channel;