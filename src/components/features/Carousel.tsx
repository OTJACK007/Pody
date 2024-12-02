import React from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import { ChevronLeft, ChevronRight, ExternalLink } from 'lucide-react';
import { Podcast } from '../../types';
import PodcastCard from './PodcastCard';
import { usePlatform } from '../../hooks/usePlatform';

interface CarouselProps {
  items: Podcast[];
  variant: 'featured' | 'trending';
}

const Carousel = ({ items, variant }: CarouselProps) => {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    align: 'start',
    containScroll: 'trimSnaps',
    dragFree: true,
  });

  const { selectedPlatform } = usePlatform();

  const scrollPrev = () => emblaApi?.scrollPrev();
  const scrollNext = () => emblaApi?.scrollNext();

  // Increased size for trending variant while maintaining aspect ratio
  const slideSize = variant === 'featured' 
    ? 'flex-[0_0_400px]' 
    : 'flex-[0_0_280px]'; // Increased from 180px to 280px

  const getPlatformIcon = () => {
    switch (selectedPlatform) {
      case 'YouTube':
        return 'https://static.wixstatic.com/media/c67dd6_aea51bc85e594033b8a29040d67b1d15~mv2.png';
      case 'X/Twitter':
        return 'https://static.wixstatic.com/media/c67dd6_a7b28b585b034f56ad6ab32232e745fc~mv2.webp';
      case 'TikTok':
        return 'https://static.wixstatic.com/media/c67dd6_f4ebb22077d749f8ab5abdb4ae142cae~mv2.png';
      case 'Instagram':
        return 'https://static.wixstatic.com/media/c67dd6_b9fe6adb4004453a9db57fe97cd4d6aa~mv2.png';
      case 'Spotify':
        return 'https://static.wixstatic.com/media/c67dd6_ec71f45884124292ab688e1089e48cb4~mv2.png';
      default:
        return 'https://static.wixstatic.com/media/c67dd6_aea51bc85e594033b8a29040d67b1d15~mv2.png';
    }
  };

  return (
    <div className="relative group">
      <div className="overflow-hidden no-scrollbar" ref={emblaRef}>
        <div className="flex gap-4">
          {items.map((item) => (
            <div key={item.id} className={slideSize}>
              <div className="space-y-2">
                <PodcastCard 
                  podcast={item} 
                  variant={variant}
                />
                {variant === 'featured' && (
                  <button 
                    className="w-full flex items-center justify-center space-x-2 px-4 py-2 bg-secondary/20 text-white border border-secondary rounded-lg hover:bg-secondary/30 transition-all group"
                  >
                    <img src={getPlatformIcon()} alt={selectedPlatform} className="w-5 h-5" />
                    <span>Watch on {selectedPlatform}</span>
                    <ExternalLink className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
      
      <button
        onClick={scrollPrev}
        className="absolute left-0 top-1/2 -translate-y-1/2 p-2 bg-black/50 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
      >
        <ChevronLeft className="w-6 h-6 text-white" />
      </button>
      
      <button
        onClick={scrollNext}
        className="absolute right-0 top-1/2 -translate-y-1/2 p-2 bg-black/50 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
      >
        <ChevronRight className="w-6 h-6 text-white" />
      </button>
    </div>
  );
};

export default Carousel;