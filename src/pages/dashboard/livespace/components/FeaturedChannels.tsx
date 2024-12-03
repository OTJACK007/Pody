import React from 'react';
import { CheckCircle2, Users, Star } from 'lucide-react';
import { Card, CardBody, CardFooter, Button, Avatar, Chip } from "@nextui-org/react";
import useEmblaCarousel from 'embla-carousel-react';

const FeaturedChannels = () => {
  const [emblaRef] = useEmblaCarousel({
    align: 'start',
    containScroll: 'trimSnaps',
    dragFree: true,
  });

  const featuredChannels = [
    {
      id: '1',
      name: 'TechInsights',
      avatar: 'https://images.unsplash.com/photo-1535303311164-664fc9ec6532?w=400',
      subscribers: '1.2M',
      rating: 4.8,
      category: 'Technology',
      verified: true,
      isLive: true,
    },
    {
      id: '2',
      name: 'MindsetGuru',
      avatar: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=400',
      subscribers: '850K',
      rating: 4.9,
      category: 'Personal Growth',
      verified: true,
      isLive: false,
    },
    {
      id: '3',
      name: 'BusinessPro',
      avatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=400',
      subscribers: '620K',
      rating: 4.7,
      category: 'Business',
      verified: true,
      isLive: false,
    },
    {
      id: '4',
      name: 'FitLife',
      avatar: 'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=400',
      subscribers: '920K',
      rating: 4.8,
      category: 'Fitness',
      verified: true,
      isLive: true,
    },
    {
      id: '5',
      name: 'CreativeMinds',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400',
      subscribers: '450K',
      rating: 4.6,
      category: 'Creativity',
      verified: true,
      isLive: false,
    }
  ];

  return (
    <div className="overflow-hidden -mx-6" ref={emblaRef}>
      <div className="flex gap-4 px-6">
        {featuredChannels.map((channel) => (
          <div key={channel.id} className="flex-none w-[300px]">
            <Card className="bg-gray-800/50 border border-gray-700">
              <CardBody className="overflow-visible p-4">
                <div className="flex gap-4">
                  <div className="relative">
                    <Avatar
                      isBordered
                      radius="lg"
                      size="lg"
                      src={channel.avatar}
                    />
                    {channel.isLive && (
                      <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 border-2 border-gray-800 rounded-full animate-pulse"></span>
                    )}
                  </div>
                  <div className="flex flex-col gap-1">
                    <div className="flex items-center gap-2">
                      <h3 className="text-small font-semibold text-white">{channel.name}</h3>
                      {channel.verified && (
                        <CheckCircle2 className="w-4 h-4 text-primary" />
                      )}
                    </div>
                    <div className="flex items-center gap-2 text-tiny text-gray-400">
                      <Users className="w-3 h-3" />
                      <span>{channel.subscribers} subscribers</span>
                    </div>
                    <div className="flex items-center gap-2 text-tiny text-gray-400">
                      <Star className="w-3 h-3 fill-yellow-500 text-yellow-500" />
                      <span>{channel.rating} rating</span>
                    </div>
                  </div>
                </div>
              </CardBody>
              <CardFooter className="justify-between">
                <Chip
                  variant="flat"
                  classNames={{
                    base: "bg-gray-700",
                    content: "text-white text-small"
                  }}
                  size="sm"
                >
                  {channel.category}
                </Chip>
                <Button
                  color="success"
                  radius="full"
                  size="sm"
                  variant="flat"
                  className="bg-secondary/20 text-secondary border-secondary"
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