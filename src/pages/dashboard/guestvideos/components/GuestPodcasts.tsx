import React from 'react';
import { Card, CardBody, Progress, Avatar } from "@nextui-org/react";
import { CheckCircle2 } from 'lucide-react';
import { useTheme } from '../../../../contexts/ThemeContext';
import { useNavigate } from 'react-router-dom';

const GuestPodcasts = () => {
  const { theme } = useTheme();
  const navigate = useNavigate();

  const podcasts = [
    {
      id: 1,
      title: 'The Future of AI and Space Exploration',
      thumbnail: 'https://images.unsplash.com/photo-1614728263952-84ea256f9679?w=800',
      duration: '2:45:30',
      views: '5.2M',
      date: '3 months ago',
      progress: 75,
      channel: {
        name: 'TechInsights',
        avatar: 'https://images.unsplash.com/photo-1535303311164-664fc9ec6532?w=400',
        verified: true
      }
    },
    {
      id: 2,
      title: 'Tesla, SpaceX, and Sustainable Energy',
      thumbnail: 'https://images.unsplash.com/photo-1611816055460-618287c870bd?w=800',
      duration: '1:58:15',
      views: '3.8M',
      date: '5 months ago',
      progress: 45,
      channel: {
        name: 'Future Talk',
        avatar: 'https://images.unsplash.com/photo-1614728894747-a83421789f10?w=400',
        verified: true
      }
    },
    {
      id: 3,
      title: 'Building Multi-Planetary Species',
      thumbnail: 'https://images.unsplash.com/photo-1614313913007-2b4ae8ce32d6?w=800',
      duration: '2:12:20',
      views: '4.1M',
      date: '6 months ago',
      progress: 60,
      channel: {
        name: 'Space Explorers',
        avatar: 'https://images.unsplash.com/photo-1614732414444-096e5f1122d5?w=400',
        verified: true
      }
    }
  ];

  return (
    <div>
      <h2 className={`text-2xl font-bold mb-6 ${
        theme === 'dark' ? 'text-white' : 'text-gray-900'
      }`}>Featured Podcasts</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {podcasts.map((podcast) => (
          <Card 
            key={podcast.id}
            isPressable
            onPress={() => navigate(`/dashboard/podroom/podcastvideo`)}
            className={`${
              theme === 'dark'
                ? 'bg-gray-800/50 border-gray-700/50'
                : 'bg-white border-gray-200'
            } border hover:scale-[1.02] transition-all duration-300`}
          >
            <CardBody className="p-4">
              <div className="relative aspect-video rounded-lg overflow-hidden mb-4">
                <img
                  src={podcast.thumbnail}
                  alt={podcast.title}
                  className="w-full h-full object-cover cursor-pointer"
                />
                <div className="absolute bottom-2 right-2 px-2 py-1 bg-black/80 text-white text-sm rounded">
                  {podcast.duration}
                </div>
              </div>
              <h3 className={`text-lg font-semibold mb-2 ${
                theme === 'dark' ? 'text-white' : 'text-gray-900'
              }`}>{podcast.title}</h3>
              
              <div className="flex items-center gap-3 mb-3">
                <Avatar
                  src={podcast.channel.avatar}
                  size="sm"
                  className="ring-2 ring-white/20"
                />
                <div className="flex items-center gap-2">
                  <span className={theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}>
                    {podcast.channel.name}
                  </span>
                  {podcast.channel.verified && (
                    <CheckCircle2 className="w-4 h-4 text-primary" />
                  )}
                </div>
              </div>

              <div className={`flex items-center justify-between text-sm mb-3 ${
                theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
              }`}>
                <span>{podcast.views} views</span>
                <span>{podcast.date}</span>
              </div>

              <Progress 
                value={podcast.progress} 
                color="primary"
                size="sm"
                className="max-w-full"
              />
            </CardBody>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default GuestPodcasts;