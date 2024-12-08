import React, { useState, useEffect } from 'react';
import { Card, CardBody, Button, Badge } from "@nextui-org/react";
import { ThumbsUp, ThumbsDown, Calendar, Users } from 'lucide-react';
import { useTheme } from '../../../../../contexts/ThemeContext';
import { fetchFeatures, moveFeatureToDestination, submitVote } from '../../../../../services/features';
import { useAuth } from '../../../../../contexts/AuthContext';

interface RequestedFeaturesProps {
  searchQuery: string;
  onFeatureClick: (feature: any) => void;
}

const RequestedFeatures = ({ searchQuery, onFeatureClick }: RequestedFeaturesProps) => {
  const { theme } = useTheme();
  const { currentUser } = useAuth();
  const [features, setFeatures] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const loadFeatures = async () => {
      setIsLoading(true);
      try {
        const data = await fetchFeatures('collecting');
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

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'listed': return 'success';
      case 'roadmap': return 'primary';
      default: return 'default';
    }
  };

  const handleRevoke = async (e: React.MouseEvent, feature: any) => {
    e.stopPropagation();
    try {
      await moveFeatureToDestination(feature.id, 'suggested', currentUser?.uid || '');
      const data = await fetchFeatures('collecting');
      setFeatures(data);
    } catch (error) {
      console.error('Error revoking feature:', error);
    }
  };

  const handleMoveToRoadmap = async (e: React.MouseEvent, feature: any) => {
    e.stopPropagation();
    try {
      await moveFeatureToDestination(feature.id, 'upcoming', currentUser?.uid || '');
      const data = await fetchFeatures('collecting');
      setFeatures(data);
    } catch (error) {
      console.error('Error moving feature to roadmap:', error);
    }
  };

  const handleVote = async (featureId: string, voteType: 'up' | 'down') => {
    if (!currentUser) return;
    
    try {
      await submitVote(featureId, currentUser.uid, voteType);
      const data = await fetchFeatures('collecting');
      setFeatures(data);
    } catch (error) {
      console.error('Error submitting vote:', error);
    }
  };

  const filteredFeatures = features.filter(feature => 
    feature.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    feature.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

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
                    {feature.status === 'listed' ? 'Listed' : 'In Roadmap'}
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
                      <span>Listed on {new Date(feature.requestedDate).toLocaleDateString()}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button
                      size="sm"
                      startContent={<ThumbsUp className="w-4 h-4" />}
                      className={`${
                        theme === 'dark'
                          ? 'bg-gray-700 text-white hover:bg-gray-600'
                          : 'bg-gray-100 text-gray-900 hover:bg-gray-200'
                      }`}
                      onClick={(e) => {
                        e.stopPropagation();
                        handleVote(feature.id, 'up');
                      }}
                    >
                      {feature.votes.up}
                    </Button>
                    <Button
                      size="sm"
                      startContent={<ThumbsDown className="w-4 h-4" />}
                      className={`${
                        theme === 'dark'
                          ? 'bg-gray-700 text-white hover:bg-gray-600'
                          : 'bg-gray-100 text-gray-900 hover:bg-gray-200'
                      }`}
                      onClick={(e) => {
                        e.stopPropagation();
                        handleVote(feature.id, 'down');
                      }}
                    >
                      {feature.votes.down}
                    </Button>
                  </div>
                </div>
              </div>
              <div className="flex flex-col gap-2">
                {feature.status === 'listed' ? (
                  <>
                    <Button
                      size="sm"
                      color="primary"
                      onClick={(e) => handleMoveToRoadmap(e, feature)}
                    >
                      Move to Roadmap
                    </Button>
                    <Button
                      size="sm"
                      color="danger"
                      onClick={(e) => handleRevoke(e, feature)}
                    >
                      Revoke
                    </Button>
                  </>
                ) : (
                  <Button
                    size="sm"
                    color="danger"
                    onClick={(e) => handleRevoke(e, feature)}
                  >
                    Remove from Roadmap
                  </Button>
                )}
              </div>
            </div>
          </CardBody>
        </Card>
      ))}
    </div>
  );
};

export default RequestedFeatures;