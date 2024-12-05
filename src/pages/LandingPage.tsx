import React from 'react';
import Header from '../components/layout/Header';
import HeroSection from '../components/features/HeroSection';
import GenreFilter from '../components/features/GenreFilter';
import FeaturedSection from '../components/features/FeaturedSection';
import PodcastGrid from '../components/features/PodcastGrid';
import { Genre, Podcast } from '../types';

function LandingPage() {
  const [activeGenre, setActiveGenre] = React.useState<Genre>('Trending');

  const mockPodcasts: Podcast[] = [
    {
      id: '1',
      title: 'Tech Talks Daily',
      description: 'Daily tech news and insights',
      coverImage: 'https://images.unsplash.com/photo-1535303311164-664fc9ec6532?w=800&auto=format&fit=crop&q=60',
      genre: 'Technology',
      duration: '45 min',
      rating: 4.8,
      year: '2024',
      channel: {
        name: 'TechInsights',
        verified: true
      }
    },
    {
      id: '2',
      title: 'Mindset Mastery',
      description: 'Daily motivation and success stories',
      coverImage: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=800&auto=format&fit=crop&q=60',
      genre: 'Motivation',
      duration: '30 min',
      rating: 4.9,
      year: '2024',
      channel: {
        name: 'MindsetGuru',
        verified: true
      }
    },
    {
      id: '3',
      title: 'UFC Fight Analysis',
      description: 'Breaking down the biggest fights',
      coverImage: 'https://images.unsplash.com/photo-1549719386-74dfcbf7dbed?w=800&auto=format&fit=crop&q=60',
      genre: 'UFC',
      duration: '60 min',
      rating: 4.7,
      year: '2024',
      channel: {
        name: 'UFC Hub',
        verified: true
      }
    },
    {
      id: '4',
      title: 'Fitness Revolution',
      description: 'Workout tips and nutrition advice',
      coverImage: 'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=800&auto=format&fit=crop&q=60',
      genre: 'Fitness',
      duration: '45 min',
      rating: 4.8,
      year: '2024',
      channel: {
        name: 'FitLife',
        verified: true
      }
    },
    {
      id: '5',
      title: 'E-commerce Success',
      description: 'Building online businesses',
      coverImage: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&auto=format&fit=crop&q=60',
      genre: 'Business',
      duration: '40 min',
      rating: 4.6,
      year: '2024',
      channel: {
        name: 'BusinessPro',
        verified: true
      }
    },
    {
      id: '6',
      title: 'Gaming Weekly',
      description: 'Latest gaming news and reviews',
      coverImage: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?w=800&auto=format&fit=crop&q=60',
      genre: 'Gaming',
      duration: '55 min',
      rating: 4.5,
      year: '2024',
      channel: {
        name: 'GamersUnite',
        verified: true
      }
    },
    {
      id: '7',
      title: 'Comedy Hour',
      description: 'Stand-up comedy highlights',
      coverImage: 'https://images.unsplash.com/photo-1527224538127-2104bb71c51b?w=800&auto=format&fit=crop&q=60',
      genre: 'Comedy',
      duration: '50 min',
      rating: 4.7,
      year: '2024',
      channel: {
        name: 'LaughFactory',
        verified: true
      }
    },
    {
      id: '8',
      title: 'EdTech Today',
      description: 'Educational technology insights',
      coverImage: 'https://images.unsplash.com/photo-1509062522246-3755977927d7?w=800&auto=format&fit=crop&q=60',
      genre: 'Education',
      duration: '35 min',
      rating: 4.5,
      year: '2024',
      channel: {
        name: 'EduTech',
        verified: true
      }
    }
  ];

  const trendingPodcasts = mockPodcasts.filter(podcast => 
    activeGenre === 'Trending' || podcast.genre === activeGenre
  );

  return (
    <div className="min-h-screen bg-[#1A1A1A]">
      <Header />
      <HeroSection />
      
      <main className="mt-8 md:mt-12"> 
        <div className="px-6 w-full space-y-8">
          <FeaturedSection podcasts={mockPodcasts} />
          
          <div className="sticky top-[60px] bg-[#1A1A1A] py-1 z-40 mt-12">
            <GenreFilter
              activeGenre={activeGenre}
              onGenreChange={setActiveGenre}
            />
          </div>

          <div className="mt-2">
            <PodcastGrid
            title={`${activeGenre} Podcasts`}
            podcasts={trendingPodcasts}
            />
          </div>
        </div>
      </main>
    </div>
  );
}

export default LandingPage;