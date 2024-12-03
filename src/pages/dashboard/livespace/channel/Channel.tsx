import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '../../../../contexts/ThemeContext';
import ChannelHeader from './components/ChannelHeader';
import ChannelInfo from './components/ChannelInfo';
import ChannelStats from './components/ChannelStats';
import ChannelEpisodes from './components/ChannelEpisodes';

const Channel = () => {
  const navigate = useNavigate();
  const { theme } = useTheme();

  return (
    <div className="space-y-8">
      <ChannelHeader onBack={() => navigate('/dashboard/livespace')} />
      <ChannelInfo />
      <ChannelStats />
      <ChannelEpisodes />
    </div>
  );
};

export default Channel;