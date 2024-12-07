import React, { useState } from 'react';
import { Play, CheckCircle2, Search, Eye, Filter, Sparkles } from 'lucide-react';
import { Genre } from '../../../../types';
import { useTheme } from '../../../../contexts/ThemeContext';
import { getTrendingEmoji } from '../../../../utils/emoji';
import ShortsStorm from './ShortsStorm';
import { Input, Button, Avatar } from "@nextui-org/react";
import useEmblaCarousel from 'embla-carousel-react';
import CodyAIChat from '../../../../components/features/CodyAIChat';
import { useNavigate } from 'react-router-dom';

interface FeedSectionProps {
  selectedGenre: Genre;
  onGenreChange: (genre: Genre) => void;
}

const FeedSection = ({ selectedGenre, onGenreChange }: FeedSectionProps) => {
  const navigate = useNavigate();
  const { theme } = useTheme();
  const [shortsMode, setShortsMode] = useState(false);
  const [shortsEmblaRef] = useEmblaCarousel({
    align: 'start',
    containScroll: 'trimSnaps',
    dragFree: true,
  });
  const [showCodyChat, setShowCodyChat] = useState(false);
  const [genreEmblaRef] = useEmblaCarousel({
    align: 'start',
    containScroll: 'trimSnaps',
    dragFree: true,
  });

  const genres: Genre[] = [
    'Trending',
    'Mindset',
    'Entrepreneurship',
    'Wealth',
    'Technology',
    'AI & Tech',
    'Web3',
    'Ecommerce',
    'Business',
    'Personal Growth',
    'Motivation',
    'Entertainment'
  ];

  const shortsContent = [
    {
      id: 'short-1',
      title: 'Quick AI Tips for Beginners',
      coverImage: 'https://images.unsplash.com/photo-1555255707-c07966088b7b?w=800',
      views: '1.2M',
      channel: {
        name: 'TechBites',
        avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400',
        verified: true
      }
    },
    {
      id: 'short-2',
      title: '60-Second Productivity Hack',
      coverImage: 'https://images.unsplash.com/photo-1483058712412-4245e9b90334?w=800',
      views: '856K',
      channel: {
        name: 'LifeHacks',
        avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400',
        verified: true
      }
    },
    {
      id: 'short-3',
      title: 'Mind-Blowing Tech Facts',
      coverImage: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=800',
      views: '2.1M',
      channel: {
        name: 'TechFacts',
        avatar: 'https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=400',
        verified: true
      }
    },
    {
      id: 'short-4',
      title: 'Future of Web3 Explained',
      coverImage: 'https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=800',
      views: '923K',
      channel: {
        name: 'CryptoDaily',
        avatar: 'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?w=400',
        verified: true
      }
    },
    {
      id: 'short-5',
      title: 'Morning Routine Secrets',
      coverImage: 'https://images.unsplash.com/photo-1484627147104-f5197bcd6651?w=800',
      views: '1.5M',
      channel: {
        name: 'LifestylePro',
        avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400',
        verified: true
      }
    },
    {
      id: 'short-6',
      title: 'Investment Tips 2024',
      coverImage: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=800',
      views: '1.8M',
      channel: {
        name: 'WealthTips',
        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400',
        verified: true
      }
    }
  ];

  const feedContent = [
    {
      id: '1',
      title: 'The Future of AI in 2024',
      coverImage: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800',
      genre: 'Technology',
      duration: '45 min',
      rating: 4.8,
      views: '125K',
      channel: {
        name: 'TechInsights',
        avatar: 'https://images.unsplash.com/photo-1535303311164-664fc9ec6532?w=400',
        verified: true
      }
    },
    {
      id: '2',
      title: 'Building Mental Resilience',
      coverImage: 'https://images.unsplash.com/photo-1589149098258-3e9102cd63d3?w=800',
      genre: 'Personal Growth',
      duration: '32 min',
      rating: 4.9,
      views: '98K',
      channel: {
        name: 'MindsetGuru',
        avatar: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=400',
        verified: true
      }
    },
    {
      id: '3',
      title: 'Startup Success Stories',
      coverImage: 'https://images.unsplash.com/photo-1507842217343-583bb7270b66?w=800',
      genre: 'Business',
      duration: '38 min',
      rating: 4.7,
      views: '156K',
      channel: {
        name: 'BusinessPro',
        avatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=400',
        verified: true
      }
    },
    {
      id: '4',
      title: 'Web3 Revolution: The Future of Internet',
      coverImage: 'https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=800',
      genre: 'Web3',
      duration: '42 min',
      rating: 4.6,
      views: '112K',
      channel: {
        name: 'CryptoVision',
        avatar: 'https://images.unsplash.com/photo-1614728263952-84ea256f9679?w=400',
        verified: true
      }
    },
    {
      id: '5',
      title: 'Mastering E-commerce Growth',
      coverImage: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800',
      genre: 'Ecommerce',
      duration: '35 min',
      rating: 4.8,
      views: '89K',
      channel: {
        name: 'BusinessGrowth',
        avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400',
        verified: true
      }
    },
    {
      id: '6',
      title: 'Wealth Building Strategies 2024',
      coverImage: 'https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?w=800',
      genre: 'Wealth',
      duration: '50 min',
      rating: 4.9,
      views: '203K',
      channel: {
        name: 'WealthMastery',
        avatar: 'https://images.unsplash.com/photo-1551601651-2a8555f1a136?w=400',
        verified: true
      }
    }
  ].filter(item => selectedGenre === 'Trending' || item.genre === selectedGenre);

  return (
    <div>
      <h2 className={`text-5xl font-bold ${
        theme === 'dark' 
          ? 'bg-gradient-to-r from-white to-gray-500 bg-clip-text text-transparent'
          : 'bg-gradient-to-r from-gray-900 to-gray-500 bg-clip-text text-transparent'
      } mb-8`}>
        Feed
      </h2>

      {/* Search and AI Assistant */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-4">
          <Input
            className="w-[400px]"
            placeholder={`Search ${shortsMode ? 'shorts' : 'videos'}...`}
            startContent={<Search className="w-4 h-4 text-gray-400" />}
            classNames={{
              input: `${theme === 'dark' ? 'bg-gray-700/50 text-white' : 'bg-gray-100 text-gray-900'}`,
              inputWrapper: `${theme === 'dark' ? 'bg-gray-700/50 border-gray-600' : 'bg-gray-100 border-gray-300'}`
            }}
          />
          <Button
            isIconOnly
            className="group relative bg-secondary text-black font-medium hover:bg-secondary/90 w-10 h-10 hover:w-32 transition-[width,background] duration-500 ease-in-out overflow-hidden"
            onClick={() => setShowCodyChat(true)}
          >
            <Sparkles className="w-5 h-5 absolute left-2.5 transition-transform duration-500 group-hover:scale-110" />
            <span className="absolute left-10 opacity-0 group-hover:opacity-100 transition-all duration-500 delay-100 transform translate-x-2 group-hover:translate-x-0 whitespace-nowrap">
              Ask Cody!
            </span>
          </Button>
        </div>
        <div className="flex items-center gap-3">
          <ShortsStorm onToggle={() => setShortsMode(!shortsMode)} isActive={shortsMode} />
        </div>
      </div>

      {/* Genre Filter */}
      <div className="overflow-hidden -mx-6 mb-8" ref={genreEmblaRef}>
        <div className="flex space-x-4 px-6">
          {genres.map((genre) => (
            <button
              key={genre}
              onClick={() => onGenreChange(genre)}
              className={`flex-none px-4 py-2 rounded-full whitespace-nowrap transition-colors flex items-center space-x-2 ${
                selectedGenre === genre
                  ? 'bg-accent text-white'
                  : theme === 'dark'
                    ? 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              <span>{getTrendingEmoji(genre)}</span>
              <span>{genre}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Feed Content */}
      {shortsMode ? (
        <div className="overflow-hidden -mx-6" ref={shortsEmblaRef}>
          <div className="flex gap-4 px-6">
            {shortsContent.map((item) => (
              <div 
                key={item.id}
                className="flex-none w-[200px] relative group cursor-pointer"
                onClick={() => navigate(`/dashboard/shortvideo/${item.id}`)}
              >
                <div className="relative aspect-[9/16] rounded-lg overflow-hidden">
                  <img
                    src={item.coverImage}
                    alt={item.title}
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
                  <div className="flex items-center gap-2 mb-1">
                    <Avatar
                      src={item.channel.avatar}
                      className="w-6 h-6 ring-2 ring-white/20"
                    />
                    <span className={theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}>
                      {item.channel.name}
                    </span>
                    {item.channel.verified && (
                      <CheckCircle2 className="w-4 h-4 text-primary" />
                    )}
                  </div>
                  <h3 className={theme === 'dark' ? 'text-white' : 'text-gray-900'}>
                    {item.title}
                  </h3>
                  <div className={`flex items-center space-x-2 text-sm ${
                    theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                  }`}>
                    <div className="flex items-center gap-1">
                      <Eye className="w-4 h-4" />
                      <span>{item.views}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {feedContent.map((item) => (
          <div 
            key={item.id}
            className="relative group cursor-pointer"
            onClick={() => navigate(`/dashboard/feedvideo/${item.id}`)}
          >
            <div className={`relative ${shortsMode ? 'aspect-[9/16] max-w-[280px] mx-auto' : 'aspect-video'} rounded-lg overflow-hidden`}>
              <img
                src={item.coverImage}
                alt={item.title}
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
              <div className="flex items-center gap-2 mb-1">
                <Avatar
                  src={item.channel.avatar}
                  className="w-6 h-6 ring-2 ring-white/20"
                />
                <span className={`${
                  theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
                }`}>
                  {item.channel.name}
                </span>
                {item.channel.verified && (
                  <CheckCircle2 className="w-4 h-4 text-primary" />
                )}
              </div>
              <h3 className={theme === 'dark' ? 'text-white' : 'text-gray-900'}>
                {item.title}
              </h3>
              <div className={`flex items-center space-x-2 text-sm ${
                theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
              }`}>
                <span>{item.genre}</span>
                <span>•</span>
                <span>{item.duration}</span>
                <span>•</span>
                <span className="text-secondary">★ {item.rating}</span>
                <span>•</span>
                <div className="flex items-center gap-1">
                  <Eye className="w-4 h-4" />
                  <span>{item.views}</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      )}

      <CodyAIChat isOpen={showCodyChat} onClose={() => setShowCodyChat(false)} />
    </div>
  );
};

export default FeedSection;