import React from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import { Card, CardBody, CardFooter, Button, Chip, Avatar, Badge } from "@nextui-org/react";
import { CheckCircle2, Users, Star, Crown, Play, ExternalLink } from 'lucide-react';

const LiveSpace = () => {
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
      name: 'UFC Hub',
      avatar: 'https://images.unsplash.com/photo-1549719386-74dfcbf7dbed?w=400',
      subscribers: '2.1M',
      rating: 4.7,
      category: 'Sports',
      verified: true,
      isLive: true,
    },
    {
      id: '4',
      name: 'FitLife',
      avatar: 'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=400',
      subscribers: '920K',
      rating: 4.8,
      category: 'Fitness',
      verified: true,
      isLive: false,
    },
    {
      id: '5',
      name: 'BusinessPro',
      avatar: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400',
      subscribers: '1.5M',
      rating: 4.6,
      category: 'Business',
      verified: true,
      isLive: false,
    },
    {
      id: '6',
      name: 'GamersUnite',
      avatar: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?w=400',
      subscribers: '3.2M',
      rating: 4.5,
      category: 'Gaming',
      verified: true,
      isLive: true,
    },
    {
      id: '7',
      name: 'CreativeMinds',
      avatar: 'https://images.unsplash.com/photo-1513364776144-60967b0f800f?w=400',
      subscribers: '1.8M',
      rating: 4.7,
      category: 'Art & Design',
      verified: true,
      isLive: false,
    },
    {
      id: '8',
      name: 'HealthHub',
      avatar: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400',
      subscribers: '2.4M',
      rating: 4.9,
      category: 'Health',
      verified: true,
      isLive: true,
    }
  ];

  const recentEpisodes = [
    {
      id: '1',
      title: 'Tech Talks Daily',
      description: 'Daily tech news and insights',
      coverImage: 'https://images.unsplash.com/photo-1535303311164-664fc9ec6532?w=800',
      genre: 'Technology',
      duration: '45 min',
      rating: 4.8,
      channel: {
        name: 'TechInsights',
        verified: true
      }
    },
    {
      id: '2',
      title: 'Mindset Mastery',
      description: 'Daily motivation and success stories',
      coverImage: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=800',
      genre: 'Motivation',
      duration: '30 min',
      rating: 4.9,
      channel: {
        name: 'MindsetGuru',
        verified: true
      }
    },
    {
      id: '3',
      title: 'UFC Fight Analysis',
      description: 'Breaking down the biggest fights',
      coverImage: 'https://images.unsplash.com/photo-1549719386-74dfcbf7dbed?w=800',
      genre: 'UFC',
      duration: '60 min',
      rating: 4.7,
      channel: {
        name: 'UFC Hub',
        verified: true
      }
    }
  ];

  return (
    <div className="space-y-8">
      {/* Live Banner */}
      <div className="bg-gray-800/50 border border-gray-700 rounded-lg p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Badge
              content=""
              color="danger"
              placement="bottom-right"
              shape="circle"
              size="sm"
              classNames={{
                badge: "animate-pulse"
              }}
            >
              <Avatar
                isBordered
                radius="lg"
                size="lg"
                src="https://images.unsplash.com/photo-1535303311164-664fc9ec6532?w=400"
              />
            </Badge>
            <div>
              <div className="flex items-center space-x-2">
                <h3 className="text-lg font-semibold text-white">TechInsights</h3>
                <CheckCircle2 className="w-5 h-5 text-primary" />
              </div>
              <p className="text-gray-400">Live on X/Twitter</p>
            </div>
          </div>
          <Button
            endContent={<ExternalLink className="w-4 h-4" />}
            className="bg-[#1DA1F2] text-white"
            radius="full"
            size="sm"
          >
            Watch Live
          </Button>
        </div>
      </div>

      {/* Featured Channels */}
      <div>
        <h2 className="text-xl font-semibold text-white mb-4">Featured Channels</h2>
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
                      Follow
                    </Button>
                  </CardFooter>
                </Card>
              </div>
            ))}
          </div>
        </div>

        {/* Premium Banner */}
        <div className="mt-8 bg-gradient-to-r from-secondary/20 to-secondary/5 rounded-lg p-6 border border-secondary/20">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Crown className="w-12 h-12 text-secondary" />
              <div>
                <h3 className="text-xl font-bold text-white">Unlock Premium Features</h3>
                <p className="text-gray-400">Get unlimited access to all content for just $5/month</p>
              </div>
            </div>
            <Button
              color="success"
              size="lg"
              className="bg-secondary text-black font-semibold"
            >
              Subscribe for $5
            </Button>
          </div>
        </div>
      </div>

      {/* Recent Episodes */}
      <div>
        <h2 className="text-xl font-semibold text-white mb-4">Recent Episodes</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {recentEpisodes.map((episode) => (
            <div 
              key={episode.id}
              className="relative group cursor-pointer"
            >
              <div className="relative aspect-video rounded-lg overflow-hidden">
                <img
                  src={episode.coverImage}
                  alt={episode.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <button className="p-3 bg-primary rounded-full hover:bg-primary/80 transition-colors">
                      <Play className="w-6 h-6 text-white" />
                    </button>
                  </div>
                </div>
              </div>
              <div className="mt-3">
                <div className="flex items-center space-x-2 mb-1">
                  <span className="text-gray-300 text-sm">{episode.channel.name}</span>
                  {episode.channel.verified && (
                    <CheckCircle2 className="w-4 h-4 text-primary" />
                  )}
                </div>
                <h3 className="text-white font-semibold">{episode.title}</h3>
                <div className="flex items-center space-x-2 text-sm text-gray-400">
                  <span>{episode.genre}</span>
                  <span>•</span>
                  <span>{episode.duration}</span>
                  <span>•</span>
                  <span className="text-secondary">★ {episode.rating}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default LiveSpace;