import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, CheckCircle2, Users, Bell, ExternalLink } from 'lucide-react';
import { Button, Card, CardBody, Avatar, Badge, Progress } from "@nextui-org/react";

const Channel = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  // Mock channel data
  const channel = {
    id: '1',
    name: 'TechInsights',
    description: 'Daily tech news, insights, and in-depth interviews with industry leaders',
    bannerImage: 'https://images.unsplash.com/photo-1535303311164-664fc9ec6532?w=1200',
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
        className="text-gray-400 hover:text-white"
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
          className="w-24 h-24 md:w-32 md:h-32 ring-4 ring-gray-800"
        />
        <div className="flex-grow">
          <div className="flex items-center gap-3 mb-2">
            <h1 className="text-3xl font-bold text-white">{channel.name}</h1>
            {channel.verified && (
              <CheckCircle2 className="w-6 h-6 text-primary" />
            )}
            <div className="flex items-center gap-2 bg-gray-800/50 px-3 py-1 rounded-full">
              <img 
                src={channel.platformIcon} 
                alt={channel.platform}
                className="w-4 h-4"
              />
              <span className="text-sm text-gray-300">{channel.platform}</span>
            </div>
          </div>
          <p className="text-gray-400 mb-4 max-w-2xl">{channel.description}</p>
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2">
              <Users className="w-5 h-5 text-gray-400" />
              <span className="text-white font-medium">{channel.subscribers} subscribers</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-yellow-400">★</span>
              <span className="text-white">{channel.stats.avgRating} rating</span>
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
            className="bg-gray-700 text-white"
          >
            Visit Channel
          </Button>
        </div>
      </div>

      {/* Channel Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="bg-gray-800/50 border border-gray-700/50">
          <CardBody className="p-6">
            <h3 className="text-2xl font-bold text-white">{channel.stats.totalViews}</h3>
            <p className="text-gray-400">Total Views</p>
          </CardBody>
        </Card>
        <Card className="bg-gray-800/50 border border-gray-700/50">
          <CardBody className="p-6">
            <h3 className="text-2xl font-bold text-white">{channel.stats.totalEpisodes}</h3>
            <p className="text-gray-400">Total Episodes</p>
          </CardBody>
        </Card>
        <Card className="bg-gray-800/50 border border-gray-700/50">
          <CardBody className="p-6">
            <h3 className="text-2xl font-bold text-white">{channel.stats.avgRating}</h3>
            <p className="text-gray-400">Average Rating</p>
          </CardBody>
        </Card>
      </div>

      {/* Episodes Grid */}
      <div>
        <h2 className="text-2xl font-bold text-white mb-6">Latest Episodes</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {episodes.map((episode) => (
            <Card 
              key={episode.id}
              isPressable
              className="bg-gray-800/50 border border-gray-700/50"
            >
              <CardBody className="p-4">
                <div className="relative aspect-video rounded-lg overflow-hidden mb-4">
                  <img
                    src={episode.thumbnail}
                    alt={episode.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute bottom-2 right-2 px-2 py-1 bg-black/80 text-white text-sm rounded">
                    {episode.duration}
                  </div>
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">{episode.title}</h3>
                <div className="flex items-center justify-between text-sm text-gray-400 mb-3">
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
    </div>
  );
};

export default Channel;