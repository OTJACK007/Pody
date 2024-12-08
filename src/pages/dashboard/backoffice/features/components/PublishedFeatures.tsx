import React, { useState } from 'react';
import { Card, CardBody, Badge, Button, Select, SelectItem } from "@nextui-org/react";
import { Calendar, Star, ArrowUpRight } from 'lucide-react';
import { useTheme } from '../../../../../contexts/ThemeContext';

interface PublishedFeaturesProps {
  searchQuery: string;
  onFeatureClick: (feature: any) => void;
}

const PublishedFeatures = ({ searchQuery, onFeatureClick }: PublishedFeaturesProps) => {
  const { theme } = useTheme();
  const [sortBy, setSortBy] = useState('newest');

  const features = [
    {
      id: 1,
      title: 'AI-Powered Summaries',
      description: 'Get instant, accurate summaries of any podcast episode using advanced AI technology',
      publishDate: '2024-03-15',
      impact: 'high',
      category: 'AI & Machine Learning',
      highlights: [
        'Smart content analysis',
        'Multi-language support',
        'Key points extraction'
      ]
    },
    {
      id: 2,
      title: 'Cross-Platform Sync',
      description: 'Seamlessly sync your content and preferences across all your devices',
      publishDate: '2024-03-10',
      impact: 'medium',
      category: 'User Experience',
      highlights: [
        'Real-time synchronization',
        'Offline support',
        'Cross-device compatibility'
      ]
    },
    {
      id: 3,
      title: 'Advanced Analytics Dashboard',
      description: 'Comprehensive analytics and insights for content creators',
      publishDate: '2024-03-05',
      impact: 'high',
      category: 'Analytics',
      highlights: [
        'Real-time metrics',
        'Custom reports',
        'Audience insights'
      ]
    }
  ].filter(feature => 
    feature.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    feature.description.toLowerCase().includes(searchQuery.toLowerCase())
  ).sort((a, b) => {
    if (sortBy === 'newest') {
      return new Date(b.publishDate).getTime() - new Date(a.publishDate).getTime();
    } else {
      return new Date(a.publishDate).getTime() - new Date(b.publishDate).getTime();
    }
  });

  const getImpactColor = (impact: string) => {
    switch (impact) {
      case 'high': return 'success';
      case 'medium': return 'warning';
      case 'low': return 'primary';
      default: return 'default';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-end">
        <Select
          label="Sort by"
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          className="max-w-xs"
          classNames={{
            trigger: `${theme === 'dark' ? 'bg-gray-700/50 border-gray-600' : 'bg-gray-100 border-gray-300'}`,
            value: theme === 'dark' ? 'text-white' : 'text-gray-900'
          }}
        >
          <SelectItem key="newest" value="newest">Newest First</SelectItem>
          <SelectItem key="oldest" value="oldest">Oldest First</SelectItem>
        </Select>
      </div>

      <div className="space-y-4">
        {features.map((feature) => (
          <Card 
            key={feature.id}
            className={`${
              theme === 'dark' 
                ? 'bg-gray-800/50 border-gray-700/50 hover:bg-gray-800' 
                : 'bg-white border-gray-200 hover:bg-gray-50'
            } border transition-colors cursor-pointer`}
            onClick={() => onFeatureClick(feature)}
          >
            <CardBody className="p-6">
              <div className="flex items-start justify-between gap-4">
                <div className="flex-grow">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className={`text-xl font-semibold ${
                      theme === 'dark' ? 'text-white' : 'text-gray-900'
                    }`}>{feature.title}</h3>
                    <Badge color={getImpactColor(feature.impact)} variant="flat">
                      {feature.impact} Impact
                    </Badge>
                    <Badge variant="flat" className="bg-[#ff3366]/10 text-[#ff3366]">
                      {feature.category}
                    </Badge>
                  </div>
                  <p className={`mb-4 ${
                    theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                  }`}>{feature.description}</p>

                  <div className="grid grid-cols-2 gap-4 mb-4">
                    {feature.highlights.map((highlight, index) => (
                      <div key={index} className="flex items-center gap-2">
                        <Star className="w-4 h-4 text-[#ff3366]" />
                        <span className={theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}>
                          {highlight}
                        </span>
                      </div>
                    ))}
                  </div>

                  <div className="flex items-center gap-4">
                    <div className={`flex items-center gap-2 text-sm ${
                      theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                    }`}>
                      <Calendar className="w-4 h-4" />
                      <span>Published on {feature.publishDate}</span>
                    </div>
                  </div>
                </div>
                <Button
                  isIconOnly
                  variant="light"
                  className={theme === 'dark' ? 'text-gray-400 hover:text-white' : 'text-gray-600 hover:text-black'}
                >
                  <ArrowUpRight className="w-5 h-5" />
                </Button>
              </div>
            </CardBody>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default PublishedFeatures;