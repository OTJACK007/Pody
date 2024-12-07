import React from 'react';
import { Card, CardBody, Avatar, Button } from "@nextui-org/react";
import { Play, CheckCircle2, Eye, Clock } from 'lucide-react';
import { useTheme } from '../../../../contexts/ThemeContext';
import { useNavigate } from 'react-router-dom';

interface RelatedShortsProps {
  currentShortId?: string;
}

const RelatedShorts = ({ currentShortId }: RelatedShortsProps) => {
  const navigate = useNavigate();
  const { theme } = useTheme();

  const relatedShorts = [
    {
      id: 'short-2',
      title: 'Advanced AI Techniques',
      coverImage: 'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?w=800',
      views: '856K',
      channel: {
        name: 'TechPro',
        avatar: 'https://images.unsplash.com/photo-1535303311164-664fc9ec6532?w=400',
        verified: true
      }
    },
    {
      id: 'short-3',
      title: 'ML Best Practices',
      coverImage: 'https://images.unsplash.com/photo-1555255707-c07966088b7b?w=800',
      views: '723K',
      channel: {
        name: 'AIGuru',
        avatar: 'https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=400',
        verified: true
      }
    },
    {
      id: 'short-4',
      title: 'Neural Networks 101',
      coverImage: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800',
      views: '945K',
      channel: {
        name: 'DeepLearn',
        avatar: 'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?w=400',
        verified: true
      }
    }
  ].filter(short => short.id !== currentShortId);

  return (
    <Card className={`${
      theme === 'dark' 
        ? 'bg-gray-800/50 border-gray-700/50' 
        : 'bg-white border-gray-200'
    } border`}>
      <CardBody className="p-6">
        <h3 className={`text-lg font-semibold mb-4 ${
          theme === 'dark' ? 'text-white' : 'text-gray-900'
        }`}>More Shorts</h3>

        <div className="space-y-4">
          {relatedShorts.map((short) => (
            <div
              key={short.id}
              className="group cursor-pointer"
              onClick={() => navigate(`/dashboard/shortvideo/${short.id}`)}
            >
              <div className="flex gap-3">
                <div className="relative flex-shrink-0">
                  <div className="w-32 aspect-[9/16] rounded-lg overflow-hidden">
                    <img
                      src={short.coverImage}
                      alt={short.title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                      <Play className="w-6 h-6 text-white" />
                    </div>
                  </div>
                </div>

                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <Avatar
                      src={short.channel.avatar}
                      className="w-5 h-5 ring-2 ring-white/20"
                    />
                    <span className={`text-sm ${
                      theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
                    }`}>
                      {short.channel.name}
                    </span>
                    {short.channel.verified && (
                      <CheckCircle2 className="w-3 h-3 text-primary" />
                    )}
                  </div>
                  <h4 className={`text-sm font-medium mb-1 ${
                    theme === 'dark' ? 'text-white' : 'text-gray-900'
                  }`}>{short.title}</h4>
                  <div className="flex items-center gap-1 text-xs text-gray-400 mb-2">
                    <Eye className="w-3 h-3" />
                    <span>{short.views}</span>
                  </div>
                  <Button
                    className={`w-full ${
                      theme === 'dark'
                        ? 'bg-gray-700/50 hover:bg-gray-700'
                        : 'bg-gray-100 hover:bg-gray-200'
                    } text-sm`}
                    size="sm"
                    onClick={(e) => {
                      e.stopPropagation();
                      // Handle Watch Later logic
                    }}
                    startContent={<Clock className="w-4 h-4" />}
                  >
                    Watch Later
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardBody>
    </Card>
  );
};

export default RelatedShorts;