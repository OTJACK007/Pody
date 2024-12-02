import React from 'react';
import { ArrowRight } from 'lucide-react';
import { Podcast } from '../../types';
import Carousel from './Carousel';
import PlatformSelector from './PlatformSelector';

interface PodcastGridProps {
  title: string;
  podcasts: Podcast[];
}

const PodcastGrid = ({ title, podcasts }: PodcastGridProps) => {
  return (
    <div className="w-full">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
        <h2 className="text-2xl md:text-3xl font-bold text-white">{title}</h2>
        <div className="flex items-center space-x-4">
          <PlatformSelector />
          <button className="flex items-center space-x-2 text-primary hover:text-primary/80 transition-colors">
            <span>Show More</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
      <Carousel items={podcasts} variant="trending" />
    </div>
  );
};

export default PodcastGrid;