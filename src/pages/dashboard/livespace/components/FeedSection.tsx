import React, { useState, useEffect } from 'react';
import { Play, CheckCircle2, Search, Eye, Filter, Sparkles, Star } from 'lucide-react';
import { Genre, Video } from '../../../../types';
import { useTheme } from '../../../../contexts/ThemeContext';
import { getTrendingEmoji } from '../../../../utils/emoji';
import { searchVideos } from '../../../../services/video';
import ShortsStorm from './ShortsStorm';
import { Input, Button, Avatar, Card, CardBody, Image } from "@nextui-org/react";
import useEmblaCarousel from 'embla-carousel-react';
import CodyAIChat from '../../../../components/features/CodyAIChat';
import { useNavigate } from 'react-router-dom';

interface FeedSectionProps {
  selectedGenre: Genre;
  onGenreChange: (genre: Genre) => void;
  videos: Video[];
  shorts: Video[];
  isLoading: boolean;
  onVideoClick: (videoId: string) => void;
}

const FeedSection = ({ 
  selectedGenre, 
  onGenreChange,
  videos,
  shorts,
  isLoading,
  onVideoClick
}: FeedSectionProps) => {
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
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<Video[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [debouncedQuery, setDebouncedQuery] = useState('');

  // Filter content based on search and type
  const displayedContent = React.useMemo(() => {
    const content = searchQuery ? searchResults : (shortsMode ? shorts : videos);
    return content.filter(v => v.type === (shortsMode ? 'short' : 'video'));
  }, [searchQuery, searchResults, shortsMode, shorts, videos]);
  // Debounce search query
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedQuery(searchQuery);
    }, 300);

    return () => clearTimeout(timer);
  }, [searchQuery]);

  // Debounce search
  useEffect(() => {
    const performSearch = async () => {
      if (!debouncedQuery) {
        setSearchResults([]);
        return;
      }
      
      setIsSearching(true);
      try {
        const results = await searchVideos(
          debouncedQuery,
          selectedGenre === 'Trending' ? undefined : selectedGenre,
          shortsMode ? 'short' : 'video'
        );
        setSearchResults(results);
      } catch (error) {
        console.error('Error searching videos:', error);
      } finally {
        setIsSearching(false);
      }
    };

    performSearch();
  }, [debouncedQuery, selectedGenre, shortsMode]);

  // Filter videos by type
  const filteredVideos = videos.filter(video => video.type === 'video');
  const filteredShorts = shorts.filter(video => video.type === 'short');
  
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
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
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
      <div className="mt-6">
        {shortsMode ? (
          <div className="overflow-hidden -mx-6" ref={shortsEmblaRef}>
            <div className="flex gap-4 px-6 py-4">
              {displayedContent.map((item) => (
                <div 
                  key={item.id}
                  className="flex-none w-[200px] relative group cursor-pointer"
                  onClick={() => navigate(`/dashboard/video/${item.id}`)}
                >
                  <div className="relative aspect-[9/16] rounded-lg overflow-hidden">
                    <video
                      src={item.video_url}
                      poster={item.thumbnail}
                      className="w-full h-full object-cover"
                      muted
                      loop
                      playsInline
                      autoPlay
                      style={{ objectFit: 'cover' }}
                    />
                    <div className="absolute inset-0 bg-black/80 opacity-0 group-hover:opacity-100 transition-all duration-500 flex flex-col items-center justify-center gap-4">
                      <div className="transform translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 delay-100">
                        <Sparkles className="w-10 h-10 text-primary animate-pulse" />
                      </div>
                      <div className="transform translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 delay-200">
                        <h3 className="text-xl font-bold text-white bg-gradient-to-r from-primary via-secondary to-primary bg-[length:200%_100%] animate-gradient bg-clip-text text-transparent">
                          Get Insights
                        </h3>
                      </div>
                      <div className="transform translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 delay-300">
                        <p className="text-gray-300 text-xs max-w-[80%] mx-auto text-center">
                          AI-powered analysis
                        </p>
                      </div>
                    </div>
                    <div className="absolute bottom-2 right-2 px-2 py-1 bg-black/80 text-white text-xs rounded-md">
                      {item.duration}
                    </div>
                  </div>
                  <div className="mt-3">
                    <div className="flex items-center gap-2 mb-1">
                      <Avatar
                        src={item.channel?.avatar}
                        className="w-6 h-6 ring-2 ring-white/20"
                      />
                      <span className={theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}>
                        {item.channel?.name}
                      </span>
                      {item.channel?.verified && (
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
                        <span>{item.views} views</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {isLoading ? (
              <div className="col-span-full flex justify-center py-12">
                <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
              </div>
            ) : filteredVideos.length === 0 ? (
              <div className="col-span-full text-center py-12">
                <p className={theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}>
                  No videos found in this category
                </p>
              </div>
            ) : (
              filteredVideos.map((item) => (
                <Card 
                  key={item.id}
                  isPressable
                  isHoverable
                  onPress={() => onVideoClick(item.id)}
                  className={`${
                    theme === 'dark' 
                      ? 'bg-gray-800/50 border-gray-700/50' 
                      : 'bg-white border-gray-200'
                  } border group`}
                >
                  <CardBody className="p-0">
                    <div className="relative">
                      <video
                        className="w-full aspect-video object-cover rounded-t-lg"
                        src={item.video_url}
                        poster={item.thumbnail}
                        muted
                        loop
                        playsInline
                        autoPlay
                        style={{ objectFit: 'cover' }}
                      />
                      <div className="absolute inset-0 bg-black/80 opacity-0 group-hover:opacity-100 transition-all duration-500 flex flex-col items-center justify-center gap-4">
                        <div className="transform translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 delay-100">
                          <Sparkles className="w-12 h-12 text-primary animate-pulse" />
                        </div>
                        <div className="transform translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 delay-200">
                          <h3 className="text-2xl font-bold text-white bg-gradient-to-r from-primary via-secondary to-primary bg-[length:200%_100%] animate-gradient bg-clip-text text-transparent">
                            Get Insights
                          </h3>
                        </div>
                        <div className="transform translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 delay-300">
                          <p className="text-gray-300 text-sm max-w-[80%] mx-auto text-center">
                            Unlock AI-powered analysis and key takeaways
                          </p>
                        </div>
                      </div>
                      <div className="absolute bottom-2 right-2 px-2 py-1 bg-black/80 text-white text-xs rounded-md">
                        {item.duration}
                      </div>
                    </div>
                  </CardBody>
                  <CardBody className="p-4">
                    <h3 className={`text-lg font-semibold mb-2 line-clamp-2 ${
                      theme === 'dark' ? 'text-white' : 'text-gray-900'
                    }`}>{item.title}</h3>
                    
                    <div className="flex items-center gap-3 mb-2">
                      <Avatar
                        src={item.channel?.avatar}
                        size="sm"
                        className="ring-2 ring-white/20"
                      />
                      <div className="flex items-center gap-2">
                        <span className={theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}>
                          {item.channel?.name}
                        </span>
                        {item.channel?.verified && (
                          <CheckCircle2 className="w-3 h-3 text-primary" />
                        )}
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2 text-sm text-gray-400">
                        <Eye className="w-3 h-3" />
                        <span>{item.views} views</span>
                      </div>
                      <div className="flex items-center gap-4">
                        <span className={`text-sm px-2 py-1 rounded-full ${
                          theme === 'dark' 
                            ? 'bg-gray-700/50 text-gray-300' 
                            : 'bg-gray-100 text-gray-700'
                        }`}>
                          {item.category}
                        </span>
                        <div className="flex items-center gap-1">
                          <Star className="w-4 h-4 text-green-500 fill-green-500" />
                          <span className="text-sm text-green-500">{item.rating}</span>
                        </div>
                      </div>
                    </div>
                  </CardBody>
                </Card>
              ))
            )}
          </div>
        )}
      </div>

      <CodyAIChat isOpen={showCodyChat} onClose={() => setShowCodyChat(false)} />
    </div>
  );
};

export default FeedSection;