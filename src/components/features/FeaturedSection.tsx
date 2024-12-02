import React, { useState, useEffect } from 'react';
import { ArrowRight } from 'lucide-react';
import Carousel from './Carousel';
import PlatformSelector from './PlatformSelector';
import { Podcast } from '../../types';

interface FeaturedSectionProps {
  podcasts: Podcast[];
}

const FeaturedSection = ({ podcasts }: FeaturedSectionProps) => {
  const [currentTitle, setCurrentTitle] = useState(0);
  const titles = ["On Fire 🔥", "Featured Podcasts"];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTitle((prev) => (prev === 0 ? 1 : 0));
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
        <div className="relative h-[40px] md:h-[60px]">
          {titles.map((title, index) => (
            <h1
              key={title}
              className="text-3xl md:text-5xl font-bold text-white absolute whitespace-nowrap transition-all duration-500"
              style={{
                opacity: currentTitle === index ? 1 : 0,
                transform: `translateX(${currentTitle === index ? '0' : '-20px'})`,
                pointerEvents: currentTitle === index ? 'auto' : 'none',
              }}
            >
              {title}
            </h1>
          ))}
        </div>
        <div className="flex items-center space-x-4">
          <PlatformSelector />
          <button className="flex items-center space-x-2 text-primary hover:text-primary/80 transition-colors">
            <span>Show More</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
      <Carousel items={podcasts} variant="featured" />
    </div>
  );
};

export default FeaturedSection;