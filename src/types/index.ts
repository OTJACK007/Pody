export interface Podcast {
  id: string;
  title: string;
  description: string;
  coverImage: string;
  genre: string;
  duration: string;
  year?: string;
  rating?: number;
  views?: string;
  channel?: {
    name: string;
    avatar?: string;
    verified?: boolean;
  };
}

export interface NavItem {
  name: string;
  icon: React.ReactNode;
}

export interface AppIntegration {
  name: string;
  icon: string;
  comingSoon?: boolean;
  connected?: boolean;
}

export interface Feature {
  id: string;
  title: string;
  description: string;
  status: 'planning' | 'development' | 'testing' | 'review' | 'ready' | 'published';
  stage?: string;
  quarter?: string;
  progress: number;
  expected_date?: string;
  features: string[];
  votes: {
    up: number;
    down: number;
    users: Record<string, 'up' | 'down'>;
  };
  category: string;
  requested_by: string;
  requested_date: Date;
  destination: 'upcoming' | 'suggested' | 'maybe' | 'collecting' | 'published';
  published_date?: Date;
  last_modified: Date;
  modified_by: string;
}

export type Platform = 'YouTube' | 'X/Twitter' | 'TikTok' | 'Instagram' | 'Spotify';

export type AuthMode = 'signin' | 'signup';

export type Genre = 
  | 'Trending'
  | 'Mindset'
  | 'Entrepreneurship'
  | 'Wealth'
  | 'Technology'
  | 'AI & Tech'
  | 'Web3'
  | 'Ecommerce'
  | 'Business'
  | 'Personal Growth'
  | 'Motivation'
  | 'Entertainment';