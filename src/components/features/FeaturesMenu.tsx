import React, { useState } from 'react';
import { Crown } from 'lucide-react';
import { Feature } from '../../types';
import FeaturesDialog from './FeaturesDialog';

interface FeaturesMenuProps {
  isOpen: boolean;
}

const FeaturesMenu = ({ isOpen }: FeaturesMenuProps) => {
  const [selectedFeature, setSelectedFeature] = useState<Feature | null>(null);

  const features: Feature[] = [
    {
      id: '1',
      title: 'AI-Powered Summaries',
      description: 'Get instant, accurate summaries of any podcast episode using advanced AI technology.',
      videoUrl: 'https://video.wixstatic.com/video/c67dd6_8c436b9b6e42468a9e2b68ea49868528/1080p/mp4/file.mp4',
      thumbnailUrl: 'https://images.unsplash.com/photo-1677442136019-21780ecad995'
    },
    {
      id: '2',
      title: 'Multi-Language Support',
      description: 'Access summaries in 9 different languages with perfect translation quality.',
      videoUrl: 'https://video.wixstatic.com/video/c67dd6_8c436b9b6e42468a9e2b68ea49868528/1080p/mp4/file.mp4',
      thumbnailUrl: 'https://images.unsplash.com/photo-1589149098258-3e9102cd63d3'
    },
    {
      id: '3',
      title: 'Knowledge Library',
      description: 'Build your personal knowledge base with organized podcast insights.',
      videoUrl: 'https://video.wixstatic.com/video/c67dd6_8c436b9b6e42468a9e2b68ea49868528/1080p/mp4/file.mp4',
      thumbnailUrl: 'https://images.unsplash.com/photo-1507842217343-583bb7270b66'
    },
    {
      id: '4',
      title: 'Smart Search',
      description: 'Find specific topics across all your saved podcast summaries instantly.',
      videoUrl: 'https://video.wixstatic.com/video/c67dd6_8c436b9b6e42468a9e2b68ea49868528/1080p/mp4/file.mp4',
      thumbnailUrl: 'https://images.unsplash.com/photo-1557426272-fc759fdf7a8d'
    },
    {
      id: '5',
      title: 'Cross-Platform Sync',
      description: 'Access your summaries across all your devices seamlessly.',
      videoUrl: 'https://video.wixstatic.com/video/c67dd6_8c436b9b6e42468a9e2b68ea49868528/1080p/mp4/file.mp4',
      thumbnailUrl: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97'
    },
    {
      id: '6',
      title: 'Key Insights Extraction',
      description: 'Automatically identify and highlight key takeaways from each episode.',
      videoUrl: 'https://video.wixstatic.com/video/c67dd6_8c436b9b6e42468a9e2b68ea49868528/1080p/mp4/file.mp4',
      thumbnailUrl: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=800&auto=format&fit=crop&q=60'
    },
    {
      id: '7',
      title: 'Custom Collections',
      description: 'Organize summaries into personalized collections for better knowledge management.',
      videoUrl: 'https://video.wixstatic.com/video/c67dd6_8c436b9b6e42468a9e2b68ea49868528/1080p/mp4/file.mp4',
      thumbnailUrl: 'https://images.unsplash.com/photo-1553484771-047a44eee27b'
    },
    {
      id: '8',
      title: 'Export & Share',
      description: 'Export summaries in multiple formats and share them with your team.',
      videoUrl: 'https://video.wixstatic.com/video/c67dd6_8c436b9b6e42468a9e2b68ea49868528/1080p/mp4/file.mp4',
      thumbnailUrl: 'https://images.unsplash.com/photo-1522542550221-31fd19575a2d'
    }
  ];

  if (!isOpen) return null;

  return (
    <>
      <div className="fixed top-[60px] left-0 right-0 w-full bg-background border-t border-gray-800 shadow-2xl overflow-y-auto max-h-[calc(100vh-60px)] z-[100]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature) => (
              <div
                key={feature.id}
                onClick={() => setSelectedFeature(feature)}
                className="group cursor-pointer"
              >
                <div className="relative aspect-video rounded-lg overflow-hidden mb-4">
                  <img
                    src={feature.thumbnailUrl}
                    alt={feature.title}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <button className="px-4 py-2 bg-white text-black rounded-full font-medium transform scale-90 group-hover:scale-100 transition-transform">
                      Watch Demo
                    </button>
                  </div>
                </div>
                <h3 className="text-lg font-semibold text-white mb-2 group-hover:text-primary transition-colors">
                  {feature.title}
                </h3>
                <p className="text-sm text-gray-400 mb-3">
                  {feature.description}
                </p>
                <div className="flex items-center space-x-2">
                  <Crown className="w-4 h-4 text-secondary" />
                  <span className="text-xs text-secondary font-medium">$5 Premium</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {selectedFeature && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center">
          <FeaturesDialog
            feature={selectedFeature}
            onClose={() => setSelectedFeature(null)}
          />
        </div>
      )}
    </>
  );
};

export default FeaturesMenu;