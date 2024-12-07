import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardBody, Avatar, Button } from "@nextui-org/react";
import { Play, Download, Clock, Eye } from 'lucide-react';
import { useTheme } from '../../../../contexts/ThemeContext';
import useEmblaCarousel from 'embla-carousel-react';

interface Short {
  id: string;
  title: string;
  timestamp: string;
  views: string;
  thumbnail: string;
  videoUrl: string;
  sourceVideoId: string;
}

interface ShortsCarouselProps {
  shorts: Short[];
}

const ShortsCarousel = ({ shorts }: ShortsCarouselProps) => {
  const navigate = useNavigate();
  const { theme } = useTheme();
  const [emblaRef] = useEmblaCarousel({
    align: 'start',
    containScroll: 'trimSnaps',
    dragFree: true,
  });

  return (
    <div className="overflow-hidden -mx-6" ref={emblaRef}>
      <div className="flex gap-4 px-6">
        {shorts.map((short) => (
          <div 
            key={short.id}
            className="flex-none w-[200px] relative group"
          >
            <div 
              className="relative aspect-[9/16] rounded-lg overflow-hidden cursor-pointer"
              onClick={() => navigate(`/dashboard/shortvideo/${short.id}`, { state: { sourceVideoId: short.sourceVideoId } })}
            >
              <img
                src={short.thumbnail}
                alt={short.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <Play className="w-8 h-8 text-white" />
              </div>
              <div className="absolute bottom-2 left-2 flex items-center gap-2 text-white text-sm">
                <Clock className="w-4 h-4" />
                <span>{short.timestamp}</span>
              </div>
            </div>
            <div className="mt-2">
              <div className="flex items-center justify-between">
                <h3 className={`text-sm font-medium truncate ${
                  theme === 'dark' ? 'text-white' : 'text-gray-900'
                }`}>{short.title}</h3>
                <Button
                  isIconOnly
                  size="sm"
                  className={`${
                    theme === 'dark'
                      ? 'bg-gray-700 hover:bg-gray-600'
                      : 'bg-gray-100 hover:bg-gray-200'
                  }`}
                  onClick={(e) => {
                    e.stopPropagation();
                    // Handle download
                  }}
                >
                  <Download className="w-4 h-4" />
                </Button>
              </div>
              <div className="flex items-center gap-2 text-xs text-gray-400 mt-1">
                <Eye className="w-3 h-3" />
                <span>{short.views}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ShortsCarousel;