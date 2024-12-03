import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useTheme } from '../../../contexts/ThemeContext';
import GuestHeader from './components/GuestHeader';
import GuestProfile from './components/GuestProfile';
import GuestPodcasts from './components/GuestPodcasts';
import GuestSocials from './components/GuestSocials';

const GuestVideos = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { theme } = useTheme();

  return (
    <div className="space-y-8">
      <GuestHeader onBack={() => navigate('/dashboard/livespace')} />
      <GuestProfile />
      <GuestSocials />
      <GuestPodcasts />
    </div>
  );
};

export default GuestVideos;