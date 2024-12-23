import { create } from 'zustand';
import { addVideoToPodroom, removeVideoFromPodroom, getPodroomVideos, isVideoInPodroom } from '../services/podroom';
import type { PodroomVideo } from '../services/podroom';

interface PodroomStore {
  videos: PodroomVideo[];
  isLoading: boolean;
  error: string | null;
  addVideo: (videoId: string) => Promise<void>;
  removeVideo: (videoId: string) => Promise<void>;
  refreshVideos: () => Promise<void>;
  checkVideoInPodroom: (videoId: string) => Promise<boolean>;
}

export const usePodroom = create<PodroomStore>((set, get) => ({
  videos: [],
  isLoading: false,
  error: null,

  addVideo: async (videoId: string) => {
    set({ isLoading: true, error: null });
    try {
      const video = await addVideoToPodroom(videoId);
      if (video) {
        set(state => ({
          videos: [video, ...state.videos]
        }));
      }
    } catch (error) {
      set({ error: 'Failed to add video to podroom' });
    } finally {
      set({ isLoading: false });
    }
  },

  removeVideo: async (videoId: string) => {
    set({ isLoading: true, error: null });
    try {
      const success = await removeVideoFromPodroom(videoId);
      if (success) {
        set(state => ({
          videos: state.videos.filter(v => v.video_id !== videoId)
        }));
      }
    } catch (error) {
      set({ error: 'Failed to remove video from podroom' });
    } finally {
      set({ isLoading: false });
    }
  },

  refreshVideos: async () => {
    set({ isLoading: true, error: null });
    try {
      const videos = await getPodroomVideos();
      set({ videos });
    } catch (error) {
      set({ error: 'Failed to fetch podroom videos' });
    } finally {
      set({ isLoading: false });
    }
  },

  checkVideoInPodroom: async (videoId: string) => {
    try {
      return await isVideoInPodroom(videoId);
    } catch (error) {
      console.error('Error checking video in podroom:', error);
      return false;
    }
  }
}));