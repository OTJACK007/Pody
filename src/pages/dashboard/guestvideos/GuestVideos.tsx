import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Crown, UserPlus } from 'lucide-react';
import { Button, Avatar } from "@nextui-org/react";
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
      <div className="relative h-[200px] md:h-[300px] rounded-xl overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1517976487492-5750f3195933?w=1200"
          alt="Guest banner"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
      </div>

      <div className="flex flex-col md:flex-row gap-6 items-start">
        <Avatar
          src="https://static.wixstatic.com/media/c67dd6_8d954ad6b5dc4867b2c13fbef9341d21~mv2.jpg"
          className={`w-32 h-32 ring-4 rounded-full flex-shrink-0 ${
            theme === 'dark' ? 'ring-gray-800' : 'ring-gray-200'
          }`}
        />
        <div className="flex flex-grow items-start justify-between">
          <GuestProfile />
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
          </div>
        </div>
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