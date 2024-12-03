import React from 'react';
import { CheckCircle2 } from 'lucide-react';
import { Card, CardBody, CardFooter, Button, Avatar } from "@nextui-org/react";
import useEmblaCarousel from 'embla-carousel-react';

const FamousGuests = () => {
  const [emblaRef] = useEmblaCarousel({
    align: 'start',
    containScroll: 'trimSnaps',
    dragFree: true,
  });

  const famousGuests = [
    {
      id: '1',
      name: 'Elon Musk',
      avatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=400',
      role: 'CEO of Tesla & SpaceX',
      episodes: 3,
      rating: 4.9,
      verified: true,
      coverImage: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=800'
    },
    {
      id: '2',
      name: 'Mark Cuban',
      avatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=400',
      role: 'Entrepreneur & Investor',
      episodes: 5,
      rating: 4.8,
      verified: true,
      coverImage: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=800'
    },
    {
      id: '3',
      name: 'Gary Vee',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400',
      role: 'CEO of VaynerMedia',
      episodes: 8,
      rating: 4.7,
      verified: true,
      coverImage: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800'
    }
  ];

  return (
    <div className="overflow-hidden -mx-6" ref={emblaRef}>
      <div className="flex gap-4 px-6">
        {famousGuests.map((guest) => (
          <div key={guest.id} className="flex-none w-[300px]">
            <Card className="bg-gray-800/50 border border-gray-700">
              <CardBody className="p-0">
                <div className="relative aspect-video">
                  <img
                    src={guest.coverImage}
                    alt={guest.name}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
                  <div className="absolute bottom-4 left-4 right-4">
                    <div className="flex items-center gap-3">
                      <Avatar
                        src={guest.avatar}
                        className="ring-2 ring-white/20"
                        size="lg"
                      />
                      <div>
                        <div className="flex items-center gap-2">
                          <h3 className="text-white font-semibold">{guest.name}</h3>
                          {guest.verified && (
                            <CheckCircle2 className="w-4 h-4 text-primary" />
                          )}
                        </div>
                        <p className="text-sm text-gray-300">{guest.role}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </CardBody>
              <CardFooter className="justify-between">
                <span className="text-sm text-gray-400">{guest.episodes} Episodes</span>
                <Button
                  color="success"
                  radius="full"
                  size="sm"
                  variant="flat"
                  className="bg-secondary/20 text-secondary border-secondary"
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