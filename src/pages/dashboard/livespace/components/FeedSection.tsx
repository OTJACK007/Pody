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

const getPlatformIcon = (platform: string): string => {
  switch (platform) {
    case 'Shogun Live':
      return 'https://static.wixstatic.com/media/c67dd6_13666aed622048b3b2f3a929081c486f~mv2.png';
    case 'YouTube':
      return 'https://static.wixstatic.com/media/c67dd6_f8c1be01d8b64398b3e2b57ac4d8cbfb~mv2.png';
    case 'X':
      return 'https://static.wixstatic.com/media/c67dd6_a7b28b585b034f56ad6ab32232e745fc~mv2.webp';
    case 'TikTok':
      return 'https://static.wixstatic.com/media/c67dd6_669a072e9da540e3aef4ab2262eb8693~mv2.png';
    case 'Instagram':
      return 'https://static.wixstatic.com/media/c67dd6_b9fe6adb4004453a9db57fe97cd4d6aa~mv2.png';
    case 'LinkedIn':
      return 'https://static.wixstatic.com/media/c67dd6_bb44a9fdef4e4fabbbbbad4f88a24540~mv2.webp';
    case 'Facebook':
      return 'https://static.wixstatic.com/media/c67dd6_e11a6a0bb99345839dbdc7cf12357c0b~mv2.png';
    case 'Twitch':
      return 'https://static.wixstatic.com/media/c67dd6_089d6bbd564f44d283886219447b54da~mv2.png';
    case 'Kick':
      return 'https://static.wixstatic.com/media/c67dd6_39dedfcfc65b4375a61bf0e763ac8447~mv2.png';
    default:
      return 'https://static.wixstatic.com/media/c67dd6_13666aed622048b3b2f3a929081c486f~mv2.png';
  }
};

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
  // Debounce search query
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedQuery(searchQuery);
    }, 300);

    return () => clearTimeout(timer);
  }, [searchQuery]);

  // Perform search when debounced query changes
  useEffect(() => {
    const performSearch = async () => {
      if (!debouncedQuery) {
        setSearchResults([]);
        return;
      }
      
      setIsSearching(true);
      try {
        const { data, error } = await supabase.rpc(
          'search_videos',
          {
            search_query: debouncedQuery,
            category_filter: selectedGenre === 'Trending' ? null : selectedGenre,
            type_filter: shortsMode ? 'short' : 'video'
          }
        );

        if (error) throw error;
        setSearchResults(data || []);
      } catch (error) {
        console.error('Error searching videos:', error);
        setSearchResults([]);
      } finally {
        setIsSearching(false);
      }
    };

    performSearch();
  }, [debouncedQuery, selectedGenre, shortsMode]);

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
            onChange={(e) => {
              setSearchQuery(e.target.value);
              if (!e.target.value) {
                setSearchResults([]);
              }
            }}
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
                        <CheckCircle2 className="w-4 h-4 text-primary" />
                    </div>
                    <h3 className={theme === 'dark' ? 'text-white' : 'text-gray-900'}>
                      {item.title}
                    </h3>
                    <div className={`flex items-center gap-2 text-sm ${
                      theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                    }`}>
                      <img 
                        src={getPlatformIcon(item.linkedplatform || 'Shogun Live')} 
                        alt={item.linkedplatform || 'Shogun Live'}
                        className="w-4 h-4"
                      />
                      <Eye className="w-4 h-4" />
                      <span>{item.views} views</span>
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
                          <CheckCircle2 className="w-3 h-3 text-primary" />
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className={`flex items-center gap-2 text-sm ${
                        theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                      }`}>
                        <img 
                          src={getPlatformIcon(item.linkedplatform || 'Shogun Live')} 
                          alt={item.linkedplatform || 'Shogun Live'}
                          className="w-4 h-4"
                        />
                        <div className="flex items-center gap-1">
                          <Eye className="w-4 h-4" />
                          <span>{item.views} views</span>
                        </div>
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