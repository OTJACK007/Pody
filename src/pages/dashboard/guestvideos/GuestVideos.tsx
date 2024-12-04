import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Crown, UserPlus } from 'lucide-react';
import { Button } from "@nextui-org/react";
import { useTheme } from '../../../contexts/ThemeContext';
import GuestHeader from './components/GuestHeader';
import GuestProfile from './components/GuestProfile';
import GuestPodcasts from './components/GuestPodcasts';
import GuestSocials from './components/GuestSocials';
import SubscriptionModal from '../../../components/modals/SubscriptionModal';

const GuestVideos = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { theme } = useTheme();
  const [showSubscriptionModal, setShowSubscriptionModal] = useState(false);

  return (
    <div className="space-y-8">
      <GuestHeader onBack={() => navigate('/dashboard/livespace')} />
      <GuestProfile />
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
      </div>
      <GuestSocials />
      <GuestPodcasts />

      <SubscriptionModal
        isOpen={showSubscriptionModal}
        onClose={() => setShowSubscriptionModal(false)}
        channelName="Elon Musk"
        subscriptionPrice="5.00"
      />
    </div>
  );
};

export default GuestVideos;