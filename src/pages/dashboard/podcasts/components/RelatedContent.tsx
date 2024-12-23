import React from 'react';
import { Card, CardBody, Button, Avatar, Progress } from "@nextui-org/react";
import { Play, Clock, ArrowRight, Eye } from 'lucide-react';
import { useTheme } from '../../../../contexts/ThemeContext';
import { useNavigate } from 'react-router-dom';

interface Channel {
  name: string;
  avatar: string;
}

interface Video {
  id: string;
  title: string;
  thumbnail: string;
  duration: string;
  views: string;
  channel?: Channel;
}

interface RelatedContentProps {
  videos: Video[];
}

const RelatedContent = ({ videos }: RelatedContentProps) => {
  const { theme } = useTheme();
  const navigate = useNavigate();
  
  if (!videos?.length) {
    return null;
  }

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
          {videos.map((video) => (
            <div
              key={video.id}
              className={`flex gap-4 p-2 rounded-lg transition-colors cursor-pointer ${
                theme === 'dark'
                  ? 'hover:bg-gray-700/30'
                  : 'hover:bg-gray-100'
              }`} 
              onClick={() => navigate(`/dashboard/video/${video.id}`)}
            >
              <div className="relative flex-shrink-0">
                <video
                  className="w-24 h-16 object-cover rounded-lg"
                  src={video.video_url}
                  poster={video.thumbnail}
                  muted
                  loop
                  playsInline
                  autoPlay
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
                }`}>{video.title}</h3>
                
                <div className="flex items-center gap-2 mt-1">
                  <Avatar
                    src={video.channel?.avatar || "https://static.wixstatic.com/media/c67dd6_14b426420ff54c82ad19ed7af43ef12b~mv2.png"}
                    className="w-4 h-4"
                  />
                  <span className={`text-sm truncate ${
                    theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                  }`}>{video.channel?.name || 'Unknown Channel'}</span>
                </div>

                <div className="flex items-center gap-4 mt-2">
                  <div className={`flex items-center gap-1 text-xs ${
                    theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                  }`}>
                    <Clock className="w-3 h-3" />
                    <span>{video.duration}</span>
                  </div>
                  <div className={`flex items-center gap-1 text-xs ${
                    theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                  }`}>
                    <Eye className="w-3 h-3" />
                    <span>{video.views}</span>
                  </div>
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