import React, { useState } from 'react';
import { Genre } from '../../types';
import { useTheme } from '../../contexts/ThemeContext';
import LiveBanner from './livespace/components/LiveBanner';
import FeaturedSection from './livespace/components/FeaturedSection';
import FeedSection from './livespace/components/FeedSection';

const LiveSpace = () => {
  const [selectedGenre, setSelectedGenre] = useState<Genre>('Trending');
  const { theme } = useTheme();

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
      />
    </div>
  );
};

export default LiveSpace;