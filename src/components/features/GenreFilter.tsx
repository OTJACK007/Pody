import React from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import { Genre } from '../../types';
import { getTrendingEmoji } from '../../utils/emoji';

interface GenreFilterProps {
  activeGenre: Genre;
  onGenreChange: (genre: Genre) => void;
}

const GenreFilter = ({ activeGenre, onGenreChange }: GenreFilterProps) => {
  const [emblaRef] = useEmblaCarousel({
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

  return (
    <div className="overflow-hidden" ref={emblaRef}>
      <div className="flex space-x-4">
        {genres.map((genre) => (
          <button
            key={genre}
            onClick={() => onGenreChange(genre)}
            className={`flex-none px-4 py-2 rounded-full whitespace-nowrap transition-colors flex items-center space-x-2 ${
              activeGenre === genre
                ? 'bg-accent text-white'
                : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
            }`}
          >
            <span>{getTrendingEmoji(genre)}</span>
            <span>{genre}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default GenreFilter;