import React from 'react';
import { Upload } from 'lucide-react';
import { useTheme } from '../../../../contexts/ThemeContext';

interface VideoPreviewProps {
  thumbnailUrl?: string | null;
  onUpload: () => void;
}

const VideoPreview = ({ thumbnailUrl, onUpload }: VideoPreviewProps) => {
  const { theme } = useTheme();

  return (
    <div 
      onClick={onUpload}
      className={`aspect-video rounded-lg overflow-hidden cursor-pointer group relative ${
        theme === 'dark' ? 'bg-gray-700/50' : 'bg-gray-100'
      }`}
    >
      {thumbnailUrl ? (
        <img
          src={thumbnailUrl}
          alt="Video thumbnail"
          className="w-full h-full object-cover"
        />
      ) : (
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <Upload className={`w-8 h-8 mb-2 ${
            theme === 'dark' ? 'text-gray-400' : 'text-gray-500'
          }`} />
          <p className={theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}>
            Upload Thumbnail
          </p>
        </div>
      )}
      <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
        <div className="text-white text-center">
          <Upload className="w-8 h-8 mx-auto mb-2" />
          <p>Change Thumbnail</p>
        </div>
      </div>
    </div>
  );
};

export default VideoPreview;