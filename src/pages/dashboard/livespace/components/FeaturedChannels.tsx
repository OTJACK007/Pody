import React, { useState, useEffect } from 'react';
import { CheckCircle2, Users, Star } from 'lucide-react';
import { Card, CardBody, CardFooter, Button, Avatar, Chip } from "@nextui-org/react";
import { useNavigate } from 'react-router-dom';
import { useTheme } from '../../../../contexts/ThemeContext';
import useEmblaCarousel from 'embla-carousel-react';
import { getFeaturedChannels } from '../../../../services/channel';
import type { UserChannel } from '../../../../services/channel';

const FeaturedChannels = () => {
  const navigate = useNavigate();
  const { theme } = useTheme();
  const [channels, setChannels] = useState<UserChannel[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [emblaRef] = useEmblaCarousel({
    align: 'start',
    containScroll: 'trimSnaps',
    dragFree: true,
  });

  useEffect(() => {
    const loadFeaturedChannels = async () => {
      setIsLoading(true);
      try {
        const data = await getFeaturedChannels();
        setChannels(data);
      } catch (error) {
        console.error('Error loading featured channels:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadFeaturedChannels();
  }, []);

  if (isLoading) {
    return (
      <div className="flex justify-center py-12">
        <div className="w-12 h-12 border-4 rounded-full border-primary border-t-transparent animate-spin"></div>
      </div>
    );
  }

  if (channels.length === 0) {
    return (
      <div className="py-12 text-center">
        <p className={theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}>
          No featured channels available
        </p>
      </div>
    );
  }

  return (
    <div className="-mx-6 overflow-hidden" ref={emblaRef}>
      <div className="flex gap-4 px-6 py-4">
        {channels.map((channel) => (
          <div key={channel.id} className="flex-none w-[300px]">
            <Card className={`${
              theme === 'dark'
                ? 'bg-gray-800/50 border-gray-700'
                : 'bg-white border-gray-200'
            } border`}>
              <CardBody className="p-4 overflow-visible">
                <div className="flex gap-4">
                  <div className="relative">
                    <Avatar
                      isBordered
                      radius="lg"
                      size="lg"
                      src={channel.profile_image}
                    />
                    {channel.is_streaming && (
                      <span className="absolute w-4 h-4 bg-red-500 border-2 border-gray-800 rounded-full -top-1 -right-1 animate-pulse"></span>
                    )}
                  </div>
                  <div className="flex flex-col gap-1">
                    <div className="flex items-center gap-2">
                      <h3 className={`text-small font-semibold ${
                        theme === 'dark' ? 'text-white' : 'text-gray-900'
                      }`}>{channel.channel_name}</h3>
                      {channel.is_verified && (
                        <CheckCircle2 className="w-4 h-4 text-primary" />
                      )}
                    </div>
                    <div className={`flex items-center gap-2 text-tiny ${
                      theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                    }`}>
                      <Users className="w-3 h-3" />
                      <span>{channel.subscribers || '0'} subscribers</span>
                    </div>
                    <div className={`flex items-center gap-2 text-tiny ${
                      theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                    }`}>
                      <Star className="w-3 h-3 text-yellow-500 fill-yellow-500" />
                      <span>{channel.rating || '4.8'} rating</span>
                    </div>
                  </div>
                </div>
              </CardBody>
              <CardFooter className="justify-between">
                <Chip
                  variant="flat"
                  classNames={{
                    base: theme === 'dark' ? 'bg-gray-700' : 'bg-gray-100',
                    content: `${theme === 'dark' ? 'text-white' : 'text-gray-900'} text-small`
                  }}
                  size="sm"
                >
                  {channel.category || 'Technology'}
                </Chip>
                <Button
                  color="success"
                  radius="full"
                  size="sm"
                  variant="flat"
                  className="bg-secondary/20 text-secondary border-secondary"
                  onClick={() => navigate('/dashboard/livespace/channel')}
                >
                  See Channel
                </Button>
              </CardFooter>
            </Card>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FeaturedChannels;