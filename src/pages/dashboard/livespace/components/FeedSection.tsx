import React, { useState } from 'react';
import { Play, CheckCircle2, Search, Sparkles, Eye } from 'lucide-react';
import { Genre } from '../../../../types';
import { useTheme } from '../../../../contexts/ThemeContext';
import { getTrendingEmoji } from '../../../../utils/emoji';
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
      <h2 className={`text-5xl font-bold bg-gradient-to-r from-${theme === 'dark' ? 'white' : 'gray-900'} to-gray-500 bg-clip-text text-transparent mb-8`}>
        Feed
      </h2>

      {/* Search and AI Assistant */}
      <div className="flex items-center gap-4 mb-6">
        <div className="w-64">
          <Input
            placeholder="Search videos..."
            startContent={<Search className="w-4 h-4 text-gray-400" />}
            classNames={{
              input: `${theme === 'dark' ? 'bg-gray-700/50 text-white' : 'bg-gray-100 text-gray-900'}`,
              inputWrapper: `${theme === 'dark' ? 'bg-gray-700/50 border-gray-600' : 'bg-gray-100 border-gray-300'}`
            }}
          />
        </div>
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

      {/* Genre Filter */}
      <div className="overflow-hidden -mx-6 mb-6" ref={genreEmblaRef}>
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
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {feedContent.map((item) => (
          <div 
            key={item.id}
            className="relative group cursor-pointer"
            onClick={() => navigate(`/dashboard/feedvideo/${item.id}`)}
          >
            <div className="relative aspect-video rounded-lg overflow-hidden">
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

      <CodyAIChat isOpen={showCodyChat} onClose={() => setShowCodyChat(false)} />
    </div>
  );
};

export default FeedSection;