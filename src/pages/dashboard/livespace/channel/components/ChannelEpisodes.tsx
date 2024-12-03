import React from 'react';
import { Card, CardBody, Progress } from "@nextui-org/react";
import { useTheme } from '../../../../../contexts/ThemeContext';

const ChannelEpisodes = () => {
  const { theme } = useTheme();

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
    <div>
      <h2 className={`text-2xl font-bold mb-6 ${
        theme === 'dark' ? 'text-white' : 'text-gray-900'
      }`}>Latest Episodes</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {episodes.map((episode) => (
          <Card 
            key={episode.id}
            isPressable
            className={`${
              theme === 'dark'
                ? 'bg-gray-800/50 border-gray-700/50'
                : 'bg-white border-gray-200'
            } border`}
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
  );
};

export default ChannelEpisodes;