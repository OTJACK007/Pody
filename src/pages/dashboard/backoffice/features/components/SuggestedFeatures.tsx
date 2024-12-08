import React, { useState, useEffect } from 'react';
import { Card, CardBody, Button, Badge } from "@nextui-org/react";
import { ThumbsUp, ThumbsDown, Calendar, Users, ArrowUpRight } from 'lucide-react';
import { useTheme } from '../../../../../contexts/ThemeContext';
import { fetchFeatures, moveFeatureToDestination } from '../../../../../services/features';

interface SuggestedFeaturesProps {
  searchQuery: string;
  onFeatureClick: (feature: any) => void;
}

const SuggestedFeatures = ({ searchQuery, onFeatureClick }: SuggestedFeaturesProps) => {
  const { theme } = useTheme();
  const [features, setFeatures] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const loadFeatures = async () => {
      setIsLoading(true);
      try {
        const data = await fetchFeatures('suggested');
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
      case 'maybe': return 'warning';
      case 'pending': return 'primary';
      default: return 'default';
    }
  };

  const handleAccept = async (e: React.MouseEvent, feature: any) => {
    e.stopPropagation();
    try {
      await moveFeatureToDestination(feature.id, 'upcoming');
      const data = await fetchFeatures('suggested');
      setFeatures(data);
    } catch (error) {
      console.error('Error accepting feature:', error);
    }
  };

  const handleReject = async (e: React.MouseEvent, feature: any) => {
    e.stopPropagation();
    try {
      await moveFeatureToDestination(feature.id, 'collecting');
      const data = await fetchFeatures('suggested');
      setFeatures(data);
    } catch (error) {
      console.error('Error rejecting feature:', error);
    }
  };

  const handleMaybe = async (e: React.MouseEvent, feature: any) => {
    e.stopPropagation();
    try {
      await moveFeatureToDestination(feature.id, 'maybe');
      const data = await fetchFeatures('suggested');
      setFeatures(data);
    } catch (error) {
      console.error('Error moving feature to maybe list:', error);
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
                    {feature.status === 'maybe' ? 'Maybe List' : 'Pending Review'}
                  </Badge>
                </div>
                <p className={`mb-4 ${
                  theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                }`}>{feature.description}</p>

                <div className="flex items-center gap-6">
                  <div className="flex items-center gap-4">
                    <div className={`flex items-center gap-2 text-sm ${
                      theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                    }`}>
                      <Calendar className="w-4 h-4" />
                      <span>Requested on {feature.requestedDate}</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex flex-col gap-2">
                <Button
                  size="sm"
                  color="success"
                  onClick={(e) => handleAccept(e, feature)}
                >
                  Accept
                </Button>
                <Button
                  size="sm"
                  color="warning"
                  onClick={(e) => handleMaybe(e, feature)}
                >
                  Maybe
                </Button>
                <Button
                  size="sm"
                  color="danger"
                  onClick={(e) => handleReject(e, feature)}
                >
                  Reject
                </Button>
              </div>
            </div>
          </CardBody>
        </Card>
      ))}
    </div>
  );
};

export default SuggestedFeatures;