import { create } from 'zustand';

type Platform = 'YouTube' | 'X/Twitter' | 'TikTok' | 'Instagram' | 'Spotify';

interface PlatformStore {
  selectedPlatform: Platform;
  setSelectedPlatform: (platform: Platform) => void;
}

export const usePlatform = create<PlatformStore>((set) => ({
  selectedPlatform: 'YouTube',
  setSelectedPlatform: (platform) => set({ selectedPlatform: platform }),
}));