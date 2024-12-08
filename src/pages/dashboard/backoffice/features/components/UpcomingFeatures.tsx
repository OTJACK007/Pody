import React, { useState, useEffect } from 'react';
import { Card, CardBody, Progress, Badge, Button } from "@nextui-org/react";
import { Calendar, Edit, Rocket } from 'lucide-react';
import { useTheme } from '../../../../../contexts/ThemeContext';
import { fetchFeatures, publishFeatureToProduction } from '../../../../../services/features';

interface UpcomingFeaturesProps {
  searchQuery: string;
  onFeatureClick: (feature: any) => void;
}

const UpcomingFeatures = ({ searchQuery, onFeatureClick }: UpcomingFeaturesProps) => {
  const { theme } = useTheme();
  const [features, setFeatures] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const loadFeatures = async () => {
      setIsLoading(true);
      setFeatures([]);
      try {
        const data = await fetchFeatures('upcoming');
        setFeatures(data);
      } catch (error) {
        console.error('Error loading features:', error);
        setFeatures([]);
      } finally {
        setIsLoading(false);
      }
    };
    
    loadFeatures();
  }, []);

  const filteredFeatures = features.filter(feature => 
    feature.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    feature.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'In Development': return 'success';
      case 'Planning': return 'warning';
      case 'Research': return 'primary';
      default: return 'default';
    }
  };

  const handlePublish = async (e: React.MouseEvent, feature: any) => {
    e.stopPropagation();
    try {
      await publishFeatureToProduction(feature.id);
      // Refresh features list
      const data = await fetchFeatures('upcoming');
      setFeatures(data);
    } catch (error) {
      console.error('Error publishing feature:', error);
    }
  };

  return (
    <div className="space-y-4">
      {filteredFeatures.map((feature) => (
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
                  <Badge color={getStatusColor(feature.status)} variant="flat">
                    {feature.status}
                  </Badge>
                </div>
                <p className={`mb-4 ${
                  theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                }`}>{feature.description}</p>

                <div className="mb-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className={theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}>
                      Development Progress
                    </span>
                    <span className={theme === 'dark' ? 'text-white' : 'text-gray-900'}>
                      {feature.progress}%
                    </span>
                  </div>
                  <Progress 
                    value={feature.progress} 
                    color={getStatusColor(feature.status)}
                    className="max-w-full"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  {feature.features.slice(0, 4).map((detail, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                      <span className={theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}>
                        {detail}
                      </span>
                    </div>
                  ))}
                </div>

                <div className="flex items-center gap-4 mt-4">
                  <div className={`flex items-center gap-2 text-sm ${
                    theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                  }`}>
                    <Calendar className="w-4 h-4" />
                    <span>Expected: {feature.quarter} ({feature.expectedDate})</span>
                  </div>
                </div>
              </div>
              <div className="flex flex-col gap-2">
                <Button
                  size="sm"
                  className={`${
                    theme === 'dark'
                      ? 'bg-gray-700 text-white hover:bg-gray-600'
                      : 'bg-gray-100 text-gray-900 hover:bg-gray-200'
                  }`}
                  startContent={<Edit className="w-4 h-4" />}
                  onClick={() => onFeatureClick(feature)}
                >
                  Edit
                </Button>
                <Button
                  size="sm"
                  className="bg-secondary text-black font-medium hover:bg-secondary/90"
                  onClick={(e) => handlePublish(e, feature)}
                  startContent={<Rocket className="w-4 h-4" />}
                >
                  Publish
                </Button>
              </div>
            </div>
          </CardBody>
        </Card>
      ))}
    </div>
  );
};

export default UpcomingFeatures;