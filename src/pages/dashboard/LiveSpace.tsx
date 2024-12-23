import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Genre } from '../../types';
import { useTheme } from '../../contexts/ThemeContext';
import LiveBanner from './livespace/components/LiveBanner';
import FeaturedSection from './livespace/components/FeaturedSection';
import FeedSection from './livespace/components/FeedSection';
import { getPublicVideos, getPublicShorts } from '../../services/video';
import type { Video } from '../../types/video';

const LiveSpace = () => {
  const navigate = useNavigate();
  const [selectedGenre, setSelectedGenre] = useState<Genre>('Trending');
  const { theme } = useTheme();
  const [videos, setVideos] = useState<Video[]>([]);
  const [shorts, setShorts] = useState<Video[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadVideos = async () => {
      setIsLoading(true);
      const category = selectedGenre === 'Trending' ? undefined : selectedGenre;
      try {
        const [videosData, shortsData] = await Promise.all([
          getPublicVideos(category),
          getPublicShorts(category)
        ]);
        
        setVideos(videosData);
        setShorts(shortsData);
      } catch (error) {
        console.error('Error loading videos:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadVideos();
  }, [selectedGenre]);

  const handleVideoClick = (videoId: string) => {
    navigate(`/dashboard/video/${videoId}`);
  };

  return (
    <div className="space-y-8">
      {/* Live Banner */}
      <LiveBanner />

      {/* Featured Section */}
      <FeaturedSection />

      {/* Feed Section */}
      <FeedSection 
        selectedGenre={selectedGenre} 
        onGenreChange={setSelectedGenre} 
        videos={videos}
        shorts={shorts}
        isLoading={isLoading}
        onVideoClick={handleVideoClick}
      />
    </div>
  );
};

export default LiveSpace;