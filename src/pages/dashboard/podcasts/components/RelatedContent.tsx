import React from 'react';
import { Card, CardBody, Button, Avatar, Progress } from "@nextui-org/react";
import { Play, Clock, ArrowRight } from 'lucide-react';
import { useTheme } from '../../../../contexts/ThemeContext';

interface RelatedContentProps {
  topics: string[];
}

const RelatedContent = ({ topics }: RelatedContentProps) => {
  const { theme } = useTheme();

  const relatedPodcasts = [
    {
      id: 1,
      title: 'AI Ethics and Society',
      channel: {
        name: 'Tech Ethics',
        avatar: 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=400'
      },
      duration: '45:30',
      progress: 0,
      thumbnail: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=400'
    },
    {
      id: 2,
      title: 'Machine Learning Trends',
      channel: {
        name: 'AI Insights',
        avatar: 'https://images.unsplash.com/photo-1535303311164-664fc9ec6532?w=400'
      },
      duration: '38:15',
      progress: 25,
      thumbnail: 'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?w=400'
    },
    {
      id: 3,
      title: 'Healthcare AI Revolution',
      channel: {
        name: 'Future Health',
        avatar: 'https://images.unsplash.com/photo-1551601651-2a8555f1a136?w=400'
      },
      duration: '42:20',
      progress: 0,
      thumbnail: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=400'
    }
  ];

  return (
    <Card className={`${
      theme === 'dark' 
        ? 'bg-gray-800/50 border-gray-700/50' 
        : 'bg-white border-gray-200'
    } border`}>
      <CardBody className="p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className={`text-xl font-bold ${
            theme === 'dark' ? 'text-white' : 'text-gray-900'
          }`}>Related Content</h2>
          <Button
            isIconOnly
            variant="light"
            className={theme === 'dark' ? 'text-gray-400 hover:text-white' : 'text-gray-600 hover:text-black'}
          >
            <ArrowRight className="w-5 h-5" />
          </Button>
        </div>

        <div className="space-y-4">
          {relatedPodcasts.map((podcast) => (
            <div
              key={podcast.id}
              className={`flex gap-4 p-2 rounded-lg transition-colors cursor-pointer ${
                theme === 'dark'
                  ? 'hover:bg-gray-700/30'
                  : 'hover:bg-gray-100'
              }`}
            >
              <div className="relative flex-shrink-0">
                <img
                  src={podcast.thumbnail}
                  alt={podcast.title}
                  className="w-24 h-16 object-cover rounded-lg"
                />
                <Button
                  isIconOnly
                  className="absolute inset-0 m-auto bg-black/50 opacity-0 hover:opacity-100 transition-opacity"
                  size="sm"
                >
                  <Play className="w-4 h-4 text-white" />
                </Button>
              </div>

              <div className="flex-grow min-w-0">
                <h3 className={`font-medium truncate ${
                  theme === 'dark' ? 'text-white' : 'text-gray-900'
                }`}>{podcast.title}</h3>
                
                <div className="flex items-center gap-2 mt-1">
                  <Avatar
                    src={podcast.channel.avatar}
                    className="w-4 h-4"
                  />
                  <span className={`text-sm truncate ${
                    theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                  }`}>{podcast.channel.name}</span>
                </div>

                <div className="flex items-center gap-4 mt-2">
                  <div className={`flex items-center gap-1 text-xs ${
                    theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                  }`}>
                    <Clock className="w-3 h-3" />
                    <span>{podcast.duration}</span>
                  </div>
                  {podcast.progress > 0 && (
                    <Progress
                      value={podcast.progress}
                      color="primary"
                      size="sm"
                      className="max-w-24"
                    />
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardBody>
    </Card>
  );
};

export default RelatedContent;