import React, { useEffect } from 'react';
import { X, ExternalLink } from 'lucide-react';
import { Feature } from '../../types';
import { usePlatform } from '../../hooks/usePlatform';
import { getPlatformIcon } from '../../utils/platform';

interface FeaturesDialogProps {
  feature: Feature;
  onClose: () => void;
}

const FeaturesDialog = ({ feature, onClose }: FeaturesDialogProps) => {
  const { selectedPlatform } = usePlatform();

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, []);

  return (
    <div 
      className="fixed inset-0 bg-black/90 z-[9999] p-4 flex items-start justify-center"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="relative w-full max-w-4xl bg-background rounded-xl shadow-2xl transform transition-all duration-300 scale-95 hover:scale-100 mt-[100px]">
        <button
          onClick={onClose}
          className="absolute -top-4 -right-4 p-2 bg-black/50 rounded-full hover:bg-black/70 transition-colors z-10"
        >
          <X className="w-6 h-6 text-white" />
        </button>
        
        <div className="p-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-2xl font-bold text-white mb-2">{feature.title}</h3>
              <p className="text-gray-300">{feature.description}</p>
            </div>
          </div>
        </div>

        <div className="w-full px-6 pb-6">
          <div className="aspect-video w-full rounded-lg overflow-hidden bg-black/50">
            <video
              src={feature.videoUrl}
              controls
              autoPlay
              className="w-full h-full object-cover"
            />
          </div>
        </div>
        
        <div className="p-6 pt-0">
          <button 
            className="w-full flex items-center justify-center space-x-2 px-4 py-3 bg-secondary/20 text-white border border-secondary rounded-lg hover:bg-secondary/30 transition-all group"
          >
            <img src={getPlatformIcon(selectedPlatform)} alt={selectedPlatform} className="w-5 h-5" />
            <span>Watch on {selectedPlatform}</span>
            <ExternalLink className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default FeaturesDialog;