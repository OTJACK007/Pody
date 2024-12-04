import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CheckCircle2, Users, Bell, ExternalLink, Crown, UserPlus } from 'lucide-react';
import { Button, Avatar } from "@nextui-org/react";
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
      <ChannelInfo />
      <ChannelStats />
      <ChannelEpisodes />
      <div className="flex gap-3">
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
              ? 'bg-gray-800 text-white hover:bg-gray-700'
              : 'bg-gray-200 text-black hover:bg-gray-300'
          }`}
        >
          Share
        </Button>
      </div>

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