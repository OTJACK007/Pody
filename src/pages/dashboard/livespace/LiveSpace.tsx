import React, { useState } from 'react';
import { Genre } from '../../../types';
import LiveBanner from './components/LiveBanner';
import FeaturedSection from './components/FeaturedSection';
import FeedSection from './components/FeedSection';

const LiveSpace = () => {
  const [selectedGenre, setSelectedGenre] = useState<Genre>('Trending');

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