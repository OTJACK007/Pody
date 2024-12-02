import React, { useEffect } from 'react';
import { X, ExternalLink } from 'lucide-react';
import { Feature } from '../../types';
import { usePlatform } from '../../hooks/usePlatform';

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

  const getPlatformIcon = () => {
    switch (selectedPlatform) {
      case 'YouTube':
        return 'https://static.wixstatic.com/media/c67dd6_aea51bc85e594033b8a29040d67b1d15~mv2.png';
      case 'X/Twitter':
        return 'https://static.wixstatic.com/media/c67dd6_a7b28b585b034f56ad6ab32232e745fc~mv2.webp';
      case 'TikTok':
        return 'https://static.wixstatic.com/media/c67dd6_f4ebb22077d749f8ab5abdb4ae142cae~mv2.png';
      case 'Instagram':
        return 'https://static.wixstatic.com/media/c67dd6_b9fe6adb4004453a9db57fe97cd4d6aa~mv2.png';
      case 'Spotify':
        return 'https://static.wixstatic.com/media/c67dd6_ec71f45884124292ab688e1089e48cb4~mv2.png';
      default:
        return 'https://static.wixstatic.com/media/c67dd6_aea51bc85e594033b8a29040d67b1d15~mv2.png';
    }
  };

  return (
    <div 
      className="fixed inset-0 bg-black/90 z-[9999] p-4 md:p-8 flex items-center justify-center"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="relative w-full max-w-4xl bg-background rounded-xl shadow-2xl transform transition-all duration-300 scale-95 hover:scale-100">
        <button
          onClick={onClose}
          className="absolute -top-4 -right-4 p-2 bg-black/50 rounded-full hover:bg-black/70 transition-colors z-10"
        >
          <X className="w-6 h-6 text-white" />
        </button>
        
        <div className="aspect-video w-full">
          <video
            src={feature.videoUrl}
            controls
            autoPlay
            className="w-full h-full object-cover rounded-t-xl"
          />
        </div>
        
        <div className="p-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-2xl font-bold text-white mb-2">{feature.title}</h3>
              <p className="text-gray-300">{feature.description}</p>
            </div>
          </div>
          
          <button 
            className="w-full flex items-center justify-center space-x-2 px-4 py-3 bg-secondary/20 text-white border border-secondary rounded-lg hover:bg-secondary/30 transition-all group"
          >
            <img src={getPlatformIcon()} alt={selectedPlatform} className="w-5 h-5" />
            <span>Watch on {selectedPlatform}</span>
            <ExternalLink className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default FeaturesDialog;