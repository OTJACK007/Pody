import React, { useState } from 'react';
import { Play, Pause, Volume2, VolumeX } from 'lucide-react';
import { Slider } from "@nextui-org/react";
import { useTheme } from '../../../../contexts/ThemeContext';

interface VideoPlayerProps {
  videoUrl: string;
}

const VideoPlayer = ({ videoUrl }: VideoPlayerProps) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [progress, setProgress] = useState(0);
  const [volume, setVolume] = useState(100);
  const { theme } = useTheme();

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.floor(seconds % 60);
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  return (
    <div className="relative group">
      <video
        src={videoUrl}
        className="w-full aspect-video object-cover"
        onClick={() => setIsPlaying(!isPlaying)}
      />

      {/* Overlay Controls */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
        <div className="absolute bottom-0 left-0 right-0 p-4">
          {/* Progress Bar */}
          <Slider
            size="sm"
            value={progress}
            onChange={(value) => setProgress(Array.isArray(value) ? value[0] : value)}
            className="mb-4"
            classNames={{
              track: "bg-white/30",
              filledTrack: "bg-primary",
              thumb: "bg-primary"
            }}
          />

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button
                onClick={() => setIsPlaying(!isPlaying)}
                className="p-2 rounded-full bg-primary/20 hover:bg-primary/30 transition-colors"
              >
                {isPlaying ? (
                  <Pause className="w-6 h-6 text-white" />
                ) : (
                  <Play className="w-6 h-6 text-white" />
                )}
              </button>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => setIsMuted(!isMuted)}
                  className="p-2 rounded-full hover:bg-white/10 transition-colors"
                >
                  {isMuted ? (
                    <VolumeX className="w-5 h-5 text-white" />
                  ) : (
                    <Volume2 className="w-5 h-5 text-white" />
                  )}
                </button>
                <Slider
                  size="sm"
                  value={volume}
                  onChange={(value) => setVolume(Array.isArray(value) ? value[0] : value)}
                  className="w-24"
                  classNames={{
                    track: "bg-white/30",
                    filledTrack: "bg-white",
                    thumb: "bg-white"
                  }}
                />
              </div>

              <span className="text-sm text-white">
                {formatTime(progress)} / {formatTime(180)}
              </span>
            </div>

            <div className="flex items-center gap-2">
              <button
                className="px-3 py-1 text-sm text-white bg-white/20 rounded-full hover:bg-white/30 transition-colors"
              >
                1x
              </button>
              <button
                className="px-3 py-1 text-sm text-white bg-white/20 rounded-full hover:bg-white/30 transition-colors"
              >
                HD
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoPlayer;