import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, CheckCircle2, Users, Bell, ExternalLink, Crown, UserPlus, Star } from 'lucide-react';
import { Button, Avatar, Badge, Progress, Card, CardBody } from "@nextui-org/react";
import { useTheme } from '../../../contexts/ThemeContext';
import SubscriptionModal from '../../../components/modals/SubscriptionModal';

const Channel = () => {
  const navigate = useNavigate();
  const { theme } = useTheme();
  const [showSubscriptionModal, setShowSubscriptionModal] = useState(false);

  const channel = {
    name: 'TechInsights',
    description: 'Daily tech news, insights, and in-depth interviews with industry leaders',
    bannerImage: 'https://images.unsplash.com/photo-1517976487492-5750f3195933?w=1200',
    avatar: 'https://images.unsplash.com/photo-1535303311164-664fc9ec6532?w=400',
    subscribers: '1.2M',
    platform: 'YouTube',
    platformIcon: 'https://static.wixstatic.com/media/c67dd6_aea51bc85e594033b8a29040d67b1d15~mv2.png',
    verified: true,
    stats: {
      totalViews: '25M',
      totalEpisodes: 156,
      avgRating: 4.8
    }
  };

  const episodes = [
    {
      id: 1,
      title: 'The Future of AI Technology',
      thumbnail: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800',
      duration: '45:30',
      views: '125K',
      date: '2 days ago',
      progress: 75
    },
    {
      id: 2,
      title: 'Web3 Revolution',
      thumbnail: 'https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=800',
      duration: '38:15',
      views: '98K',
      date: '5 days ago',
      progress: 45
    },
    {
      id: 3,
      title: 'Blockchain Technology',
      thumbnail: 'https://images.unsplash.com/photo-1639762681057-408e52192e55?w=800',
      duration: '42:20',
      views: '156K',
      date: '1 week ago',
      progress: 60
    }
  ];

  return (
    <div className="space-y-8">
      <Button
        variant="light"
        startContent={<ArrowLeft className="w-4 h-4" />}
        className={theme === 'dark' ? 'text-gray-400 hover:text-white' : 'text-gray-600 hover:text-black'}
        onClick={() => navigate('/dashboard/livespace')}
      >
        Back to Live Space
      </Button>

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
          className={`w-32 h-32 ring-4 rounded-full flex-shrink-0 ${
            theme === 'dark' ? 'ring-gray-800' : 'ring-gray-200'
          }`}
        />
        <div className="flex-grow">
          <div className="flex items-center gap-3 mb-2">
            <h1 className={`text-3xl font-bold ${
              theme === 'dark' ? 'text-white' : 'text-gray-900'
            }`}>{channel.name}</h1>
            <CheckCircle2 className="w-6 h-6 text-primary" />
          </div>
          <p className={`text-lg mb-2 ${
            theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
          }`}>{channel.description}</p>
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2">
              <Users className={theme === 'dark' ? 'text-gray-400' : 'text-gray-500'} />
              <span className={`font-medium ${
                theme === 'dark' ? 'text-white' : 'text-gray-900'
              }`}>{channel.subscribers} followers</span>
            </div>
            <div className="flex items-center gap-2">
              <Star className="text-yellow-400" />
              <span className={theme === 'dark' ? 'text-white' : 'text-gray-900'}>
                {channel.stats.avgRating} rating
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
            Unlock all content
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

      {/* Channel Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className={`${
          theme === 'dark'
            ? 'bg-gray-800/50 border-gray-700/50'
            : 'bg-white border-gray-200'
        } border`}>
          <CardBody className="p-6">
            <h3 className="text-2xl font-bold text-white">{channel.stats.totalViews}</h3>
            <p className={theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}>
              Total Views
            </p>
          </CardBody>
        </Card>
        <Card className={`${
          theme === 'dark'
            ? 'bg-gray-800/50 border-gray-700/50'
            : 'bg-white border-gray-200'
        } border`}>
          <CardBody className="p-6">
            <h3 className="text-2xl font-bold text-white">{channel.stats.totalEpisodes}</h3>
            <p className={theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}>
              Total Episodes
            </p>
          </CardBody>
        </Card>
        <Card className={`${
          theme === 'dark'
            ? 'bg-gray-800/50 border-gray-700/50'
            : 'bg-white border-gray-200'
        } border`}>
          <CardBody className="p-6">
            <h3 className="text-2xl font-bold text-white">{channel.stats.avgRating}</h3>
            <p className={theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}>
              Average Rating
            </p>
          </CardBody>
        </Card>
      </div>

      {/* Episodes Grid */}
      <div>
        <h2 className={`text-2xl font-bold mb-6 ${
          theme === 'dark' ? 'text-white' : 'text-gray-900'
        }`}>Latest Episodes</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {episodes.map((episode) => (
            <Card 
              key={episode.id}
              isPressable
              onPress={() => navigate('/dashboard/podroom/podcastvideo')}
              className={`${
                theme === 'dark'
                  ? 'bg-gray-800/50 border-gray-700/50'
                  : 'bg-white border-gray-200'
              } border hover:scale-[1.02] transition-all duration-300`}
            >
              <CardBody className="p-4">
                <div className="relative aspect-video rounded-lg overflow-hidden mb-4">
                  <img
                    src={episode.thumbnail}
                    alt={episode.title}
                    className="w-full h-full object-cover cursor-pointer"
                  />
                  <div className="absolute bottom-2 right-2 px-2 py-1 bg-black/80 text-white text-sm rounded">
                    {episode.duration}
                  </div>
                </div>
                <h3 className={`text-lg font-semibold mb-2 ${
                  theme === 'dark' ? 'text-white' : 'text-gray-900'
                }`}>{episode.title}</h3>
                <div className={`flex items-center justify-between text-sm mb-3 ${
                  theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                }`}>
                  <span>{episode.views} views</span>
                  <span>{episode.date}</span>
                </div>
                <Progress 
                  value={episode.progress} 
                  color="primary"
                  size="sm"
                  className="max-w-full"
                />
              </CardBody>
            </Card>
          ))}
        </div>
      </div>

      <SubscriptionModal
        isOpen={showSubscriptionModal}
        onClose={() => setShowSubscriptionModal(false)}
        channelName={channel.name}
        subscriptionPrice="7.99"
      />
    </div>
  );
};

export default Channel;