import React, { useState, useEffect } from 'react';
import { CheckCircle2 } from 'lucide-react';
import { Card, CardBody, CardFooter, Button, Avatar } from "@nextui-org/react";
import { useNavigate } from 'react-router-dom';
import { useTheme } from '../../../../contexts/ThemeContext';
import useEmblaCarousel from 'embla-carousel-react';
import { getFeaturedGuests } from '../../../../services/channel';
import type { UserChannel } from '../../../../services/channel';

const FamousGuests = () => {
  const navigate = useNavigate();
  const { theme } = useTheme();
  const [guests, setGuests] = useState<UserChannel[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [emblaRef] = useEmblaCarousel({
    align: 'start',
    containScroll: 'trimSnaps',
    dragFree: true,
  });

  useEffect(() => {
    const loadFeaturedGuests = async () => {
      setIsLoading(true);
      try {
        const data = await getFeaturedGuests();
        setGuests(data);
      } catch (error) {
        console.error('Error loading featured guests:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadFeaturedGuests();
  }, []);

  if (isLoading) {
    return (
      <div className="flex justify-center py-12">
        <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (guests.length === 0) {
    return (
      <div className="text-center py-12">
        <p className={theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}>
          No featured guests available
        </p>
      </div>
    );
  }

  return (
    <div className="overflow-hidden -mx-6" ref={emblaRef}>
      <div className="flex gap-4 px-6 py-4">
        {guests.map((guest) => (
          <div key={guest.id} className="flex-none w-[300px]">
            <Card className={`${
              theme === 'dark'
                ? 'bg-gray-800/50 border-gray-700'
                : 'bg-white border-gray-200'
            } border`}>
              <CardBody className="p-0">
                <div className="relative w-full h-[168px]">
                  <img
                    src={guest.banner_image || guest.profile_image}
                    alt={guest.channel_name}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
                  <div className="absolute bottom-4 left-4 right-4">
                    <div className="flex items-center gap-3">
                      <Avatar
                        src={guest.profile_image}
                        className="ring-2 ring-white/20"
                        size="lg"
                      />
                      <div>
                        <div className="flex items-center gap-2">
                          <h3 className="text-white font-semibold">{guest.channel_name}</h3>
                          {guest.is_verified && (
                            <CheckCircle2 className="w-4 h-4 text-primary" />
                          )}
                        </div>
                        <p className="text-sm text-gray-300">
                          {guest.description || 'Featured Creator'}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </CardBody>
              <CardFooter className="justify-between">
                <div className="flex items-center gap-2">
                  <span className={theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}>
                    {guest.videos_count || 0} Episodes
                  </span>
                  <span className={theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}>•</span>
                  <div className="flex items-center gap-1">
                    <span className="text-yellow-400">★</span>
                    <span className={theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}>
                      {guest.rating || '4.8'}
                    </span>
                  </div>
                </div>
                <Button
                  color="success"
                  radius="full"
                  size="sm"
                  variant="flat"
                  className="bg-secondary/20 text-secondary border-secondary"
                  onClick={() => navigate(`/dashboard/guestvideos/${guest.id}`)}
                >
                  View Episodes
                </Button>
              </CardFooter>
            </Card>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FamousGuests;