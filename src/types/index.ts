export interface Podcast {
  id: string;
  title: string;
  description: string;
  coverImage: string;
  genre: string;
  duration: string;
  year?: string;
  rating?: number;
  channel?: {
    name: string;
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
  videoUrl: string;
  thumbnailUrl: string;
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