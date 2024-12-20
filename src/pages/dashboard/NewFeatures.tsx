import React, { useState, useEffect } from 'react';
import { Sparkles, ThumbsUp, ThumbsDown, Send, ChevronRight, Clock, Users, Rocket, Calendar } from 'lucide-react';
import { Card, CardBody, Button, Tabs, Tab, Input, Textarea, Badge, Progress, Select, SelectItem } from "@nextui-org/react";
import { useAuth } from '../../contexts/AuthContext';
import { useTheme } from '../../contexts/ThemeContext';
import { suggestFeature, fetchFeatures, submitVote, moveFeatureToDestination } from '../../services/features';
import type { Feature } from '../../services/features';

const getStatusColor = (status: Feature['status']) => {
  switch (status) {
    case 'upcoming':
      return 'primary';
    case 'collectingvotes':
      return 'warning';
    case 'published':
      return 'success';
    default:
      return 'default';
  }
};

const NewFeatures = () => {
  const [activeTab, setActiveTab] = useState('requested');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [reason, setReason] = useState('');
  const [sortBy, setSortBy] = useState('newest');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [features, setFeatures] = useState<Feature[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { theme } = useTheme();
  const { currentUser } = useAuth();

  useEffect(() => {
    const loadFeatures = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const status = activeTab === 'requested' ? 'collectingvotes' :
                      activeTab === 'upcoming' ? 'upcoming' :
                      activeTab === 'published' ? 'published' : 'inbox';
                      
        const data = await fetchFeatures(status);
        
        // Sort features based on selected option
        const sortedData = [...data].sort((a, b) => {
          if (sortBy === 'newest') {
            return new Date(b.requested_at).getTime() - new Date(a.requested_at).getTime();
          } else {
            return new Date(a.requested_at).getTime() - new Date(b.requested_at).getTime();
          }
        });
        
        setFeatures(sortedData);
      } catch (error) {
        console.error('Error loading features:', error);
        setError('Failed to load features. Please try again.');
      } finally {
        setIsLoading(false);
      }
    };

    loadFeatures();
  }, [activeTab, sortBy]);

  const handleSubmit = async () => {
    if (!currentUser) return;
    
    setIsSubmitting(true);
    setError(null);
    try {
      await suggestFeature({
        title,
        subtitle: reason,
        description,
        status: 'inbox',
        created_by: currentUser.id
      });
      
      // Reset form
      setTitle('');
      setDescription('');
      setReason('');
      
      // Switch to requested tab and refresh features
      setActiveTab('requested');
      const data = await fetchFeatures('collectingvotes');
      setFeatures(data);
      
      alert('Feature suggestion submitted successfully!');
    } catch (error) {
      console.error('Error submitting feature:', error);
      setError('Failed to submit feature suggestion. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleVote = async (featureId: string, voteType: 'up' | 'down') => {
    if (!currentUser) {
      alert('Please sign in to vote');
      return;
    }

    setError(null);
    try {
      await submitVote(featureId, currentUser.id, voteType);
      
      // Refresh features to get updated vote counts
      const status = activeTab === 'requested' ? 'collectingvotes' :
                    activeTab === 'upcoming' ? 'upcoming' :
                    'published';
      const data = await fetchFeatures(status);
      setFeatures(data);
    } catch (error) {
      console.error('Error submitting vote:', error);
      setError('Failed to submit vote. Please try again.');
    }
  };

  const handleMoveFeature = async (featureId: string, newStatus: Feature['status']) => {
    setError(null);
    try {
      await moveFeatureToDestination(featureId, newStatus);
      
      // Refresh features
      const data = await fetchFeatures(activeTab === 'requested' ? 'collectingvotes' : 'upcoming');
      setFeatures(data);
    } catch (error) {
      console.error('Error moving feature:', error);
      setError('Failed to move feature. Please try again.');
    }
  };

  return (
    <div className="space-y-8">
      <div className="flex items-center gap-3">
        <Sparkles className="w-8 h-8 text-primary" />
        <div>
          <h1 className={`text-3xl font-bold ${
            theme === 'dark' ? 'text-white' : 'text-gray-900'
          }`}>New Features</h1>
          <p className={theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}>
            Vote for upcoming features or suggest new ones
          </p>
        </div>
      </div>

      <Tabs 
        selectedKey={activeTab}
        onSelectionChange={(key) => setActiveTab(key.toString())}
        classNames={{
          tabList: `${theme === 'dark' ? 'bg-gray-800/50' : 'bg-gray-100'} p-1 rounded-lg`,
          cursor: `${theme === 'dark' ? 'bg-gray-700' : 'bg-white'}`,
          tab: `${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'} data-[selected=true]:${theme === 'dark' ? 'text-white' : 'text-gray-900'}`,
          tabContent: "group-data-[selected=true]:text-inherit"
        }}
      >
        <Tab key="requested" title="Requested Features" />
        <Tab key="upcoming" title="Upcoming Features" />
        <Tab key="published" title={
          <div className="flex items-center gap-2">
            <Rocket className="w-4 h-4 text-[#ff3366]" />
            <span>Published Features</span>
          </div>
        } />
        <Tab key="suggest" title="Suggest Feature" />
      </Tabs>

      {error && (
        <div className="bg-red-500/10 border border-red-500/50 text-red-500 px-4 py-2 rounded-lg">
          {error}
        </div>
      )}

      {isLoading ? (
        <div className="flex items-center justify-center py-12">
          <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
        </div>
      ) : features.length === 0 ? (
        <div className="text-center py-12">
          <p className={theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}>
            No features available in this category.
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {activeTab === 'requested' && (
            <div className="space-y-4">
              {features.map((feature) => (
                <Card key={feature.id} className={`${
                  theme === 'dark' 
                    ? 'bg-gray-800/50 border-gray-700/50' 
                    : 'bg-white border-gray-200'
                } border`}>
                  <CardBody className="p-6">
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-grow">
                        <h3 className={`text-xl font-semibold mb-2 ${
                          theme === 'dark' ? 'text-white' : 'text-gray-900'
                        }`}>{feature.title}
                          {feature.subtitle && (
                            <span className={`ml-2 text-sm ${
                              theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                            }`}>
                              {feature.subtitle}
                            </span>
                          )}
                        </h3>
                        <p className={`mb-4 ${
                          theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                        }`}>{feature.description}</p>

                        <div className="flex items-center gap-4">
                          <div className={`flex items-center gap-2 text-sm ${
                            theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                          }`}>
                            <Calendar className="w-4 h-4" />
                            <span>Requested on {new Date(feature.requested_at).toLocaleDateString()}</span>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Button
                          startContent={<ThumbsUp className="w-4 h-4" />}
                          className={`${
                            theme === 'dark'
                              ? 'bg-gray-700 text-white hover:bg-gray-600'
                              : 'bg-gray-100 text-gray-900 hover:bg-gray-200'
                          }`}
                          onClick={() => handleVote(feature.id, 'up')}
                        >
                          {feature.votes_up}
                        </Button>
                        <Button
                          startContent={<ThumbsDown className="w-4 h-4" />}
                          className={`${
                            theme === 'dark'
                              ? 'bg-gray-700 text-white hover:bg-gray-600'
                              : 'bg-gray-100 text-gray-900 hover:bg-gray-200'
                          }`}
                          onClick={() => handleVote(feature.id, 'down')}
                        >
                          {feature.votes_down}
                        </Button>
                      </div>
                    </div>
                  </CardBody>
                </Card>
              ))}
            </div>
          )}

          {activeTab === 'upcoming' && (
            <div className="space-y-4">
              {features.map((feature) => (
                <Card key={feature.id} className={`${
                  theme === 'dark' 
                    ? 'bg-gray-800/50 border-gray-700/50' 
                    : 'bg-white border-gray-200'
                } border`}>
                  <CardBody className="p-6">
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-grow">
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className={`text-xl font-semibold ${
                            theme === 'dark' ? 'text-white' : 'text-gray-900'
                          }`}>{feature.title}
                            {feature.subtitle && (
                              <span className={`ml-2 text-sm ${
                                theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                              }`}>
                                {feature.subtitle}
                              </span>
                            )}
                          </h3>
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
                              {feature.development_progress}%
                            </span>
                          </div>
                          <Progress 
                            value={feature.development_progress} 
                            color={getStatusColor(feature.status)}
                            className="max-w-full"
                          />
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                          {feature.subfeatures.map((detail, index) => (
                            <div key={index} className="flex items-center gap-2">
                              <ChevronRight className="w-4 h-4 text-primary" />
                              <span className={theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}>
                                {detail}
                              </span>
                            </div>
                          ))}
                        </div>

                        <div className="flex items-center gap-4 mt-4">
                          <span className="text-primary">Expected: {feature.expected_release}</span>
                          <span className={theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}>
                            {feature.votes_up - feature.votes_down} votes
                          </span>
                        </div>
                      </div>
                    </div>
                  </CardBody>
                </Card>
              ))}
            </div>
          )}
          
          {activeTab === 'published' && (
            <div className="space-y-4">
              <div className="flex justify-end">
                <Select
                  label="Sort by"
                  selectedKeys={[sortBy]}
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
              
              {features.map((feature) => (
                <Card key={feature.id} className={`${
                  theme === 'dark' 
                    ? 'bg-gray-800/50 border-gray-700/50' 
                    : 'bg-white border-gray-200'
                } border`}>
                  <CardBody className="p-6">
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-grow">
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className={`text-xl font-semibold ${
                            theme === 'dark' ? 'text-white' : 'text-gray-900'
                          }`}>{feature.title}</h3>
                          {feature.subtitle && (
                            <span className={`text-sm ${
                              theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                            }`}>
                              {feature.subtitle}
                            </span>
                          )}
                          <Badge variant="flat" className="bg-[#ff3366]/10 text-[#ff3366]">
                            Published
                          </Badge>
                        </div>
                        <p className={`mb-4 ${
                          theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                        }`}>{feature.description}</p>

                        <div className="grid grid-cols-2 gap-4 mb-4">
                          {feature.subfeatures.map((highlight, idx) => (
                            <div key={idx} className="flex items-center gap-2">
                              <div className="w-1.5 h-1.5 rounded-full bg-[#ff3366]" />
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
                            <span>Published on {new Date(feature.requested_at).toLocaleDateString()}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardBody>
                </Card>
              ))}
            </div>
          )}

          {activeTab === 'suggest' && (
            <Card className={`${
              theme === 'dark' 
                ? 'bg-gray-800/50 border-gray-700/50' 
                : 'bg-white border-gray-200'
            } border`}>
              <CardBody className="p-6">
                <div className="space-y-6">
                  <div>
                    <Input
                      label="Feature Title"
                      placeholder="Enter feature title"
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      classNames={{
                        input: `${theme === 'dark' ? 'bg-gray-700/50 text-white' : 'bg-gray-100 text-gray-900'}`,
                        inputWrapper: `${theme === 'dark' ? 'bg-gray-700/50 border-gray-600' : 'bg-gray-100 border-gray-300'}`
                      }}
                    />
                  </div>

                  <div>
                    <Textarea
                      label="Feature Description"
                      placeholder="Describe the feature you'd like to see"
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      classNames={{
                        input: `${theme === 'dark' ? 'bg-gray-700/50 text-white' : 'bg-gray-100 text-gray-900'}`,
                        inputWrapper: `${theme === 'dark' ? 'bg-gray-700/50 border-gray-600' : 'bg-gray-100 border-gray-300'}`
                      }}
                    />
                  </div>

                  <div>
                    <Textarea
                      label="Why do you need this feature?"
                      placeholder="Explain how this feature would help you"
                      value={reason}
                      onChange={(e) => setReason(e.target.value)}
                      classNames={{
                        input: `${theme === 'dark' ? 'bg-gray-700/50 text-white' : 'bg-gray-100 text-gray-900'}`,
                        inputWrapper: `${theme === 'dark' ? 'bg-gray-700/50 border-gray-600' : 'bg-gray-100 border-gray-300'}`
                      }}
                    />
                  </div>

                  <Button
                    className="w-full bg-primary text-white"
                    endContent={<Send className="w-4 h-4" />}
                    onClick={handleSubmit}
                    isLoading={isSubmitting}
                    isDisabled={!title || !description || !reason}
                  >
                    Submit Feature Request
                  </Button>
                </div>
              </CardBody>
            </Card>
          )}
        </div>
      )}
    </div>
  );
};

export default NewFeatures;