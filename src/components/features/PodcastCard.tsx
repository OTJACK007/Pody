import React from 'react';
import { Play } from 'lucide-react';
import { Podcast } from '../../types';

interface PodcastCardProps {
  podcast: Podcast;
  variant: 'featured' | 'trending';
}

const PodcastCard = ({ podcast, variant }: PodcastCardProps) => {
  const cardClass = variant === 'featured'
    ? 'w-full h-[200px]'
    : 'w-[280px] h-[500px]'; // Increased height for trending cards

  return (
    <div className={`relative group ${cardClass}`}>
      <img
        src={podcast.coverImage}
        alt={podcast.title}
        className="w-full h-full object-cover rounded-lg"
      />
      <div className="absolute inset-0 bg-black bg-opacity-50 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity">
        <div className="absolute inset-0 flex items-center justify-center">
          <button className="p-3 bg-primary rounded-full hover:bg-primary/80 transition-colors">
            <Play className="w-6 h-6 text-white" />
          </button>
        </div>
      </div>
      <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black to-transparent">
        {podcast.channel && (
          <div className="flex items-center space-x-2 mb-2">
            <span className="text-gray-300 text-sm">{podcast.channel.name}</span>
            {podcast.channel.verified && (
              <img 
                src="https://static.wixstatic.com/media/c67dd6_21a1d7fb139343d287d7e53f88c19d74~mv2.png"
                alt="Verified"
                className="w-4 h-4"
              />
            )}
          </div>
        )}
        <h3 className="text-white font-semibold">{podcast.title}</h3>
        <div className="flex items-center space-x-2 text-sm text-gray-300">
          <span>{podcast.genre}</span>
          <span>•</span>
          <span>{podcast.duration}</span>
          {podcast.rating && (
            <>
              <span>•</span>
              <span className="text-secondary">★ {podcast.rating}</span>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default PodcastCard;