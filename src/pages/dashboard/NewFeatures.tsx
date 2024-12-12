import React, { useState } from 'react';
import { Sparkles, ThumbsUp, ThumbsDown, Send, ChevronRight, Clock, Users, Rocket, Calendar } from 'lucide-react';
import { Card, CardBody, Button, Tabs, Tab, Input, Textarea, Badge, Progress, Select, SelectItem } from "@nextui-org/react";
import { useAuth } from '../../contexts/AuthContext';
import { useTheme } from '../../contexts/ThemeContext';
import { createFeature } from '../../services/features';

const NewFeatures = () => {
  const [activeTab, setActiveTab] = useState('requested');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [reason, setReason] = useState('');
  const [sortBy, setSortBy] = useState('newest');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { theme } = useTheme();
  const { currentUser } = useAuth();

  const handleSubmit = async () => {
    if (!currentUser) return;
    
    setIsSubmitting(true);
    try {
      await createFeature({
        title,
        description,
        reason,
        status: 'pending',
        progress: 0,
        features: [],
        category: '',
        requestedBy: currentUser.uid,
        requestedDate: new Date(),
        destination: 'suggested',
        votes: { up: 0, down: 0, users: {} },
        lastModified: new Date(),
        modifiedBy: currentUser.uid
      });
      
      // Reset form
      setTitle('');
      setDescription('');
      setReason('');
      
      // Switch to requested tab
      setActiveTab('requested');
    } catch (error) {
      console.error('Error submitting feature:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const requestedFeatures = [
    {
      id: 1,
      title: 'Custom Podcast Categories',
      description: 'Allow users to create and manage custom podcast categories',
      votes: { up: 325, down: 12 },
      requestedBy: 'Sarah Wilson',
      requestedDate: '2024-03-15',
      supporters: 325
    },
    {
      id: 2,
      title: 'Batch Export Summaries',
      description: 'Export multiple podcast summaries at once in various formats',
      votes: { up: 287, down: 8 },
      requestedBy: 'Mike Johnson',
      requestedDate: '2024-03-14',
      supporters: 287
    },
    {
      id: 3,
      title: 'Advanced Search Filters',
      description: 'Add more granular search filters for podcast discovery',
      votes: { up: 256, down: 15 },
      requestedBy: 'John Smith',
      requestedDate: '2024-03-13',
      supporters: 256
    }
  ];

  const upcomingFeatures = [
    {
      id: 1,
      title: 'AI-Powered Video Summaries',
      description: 'Get instant video summaries with key points and timestamps',
      votes: 245,
      status: 'In Development',
      eta: 'Q2 2024',
      progress: 75,
      details: [
        'Smart content analysis',
        'Automatic chapter detection',
        'Key points extraction',
        'Custom summary length'
      ]
    },
    {
      id: 2,
      title: 'Collaborative Notes',
      description: 'Share and collaborate on podcast notes with your team',
      votes: 189,
      status: 'Planning',
      eta: 'Q3 2024',
      progress: 35,
      details: [
        'Real-time collaboration',
        'Comment threads',
        'Version history',
        'Export options'
      ]
    },
    {
      id: 3,
      title: 'Advanced Analytics Dashboard',
      description: 'Detailed insights and statistics about your podcast consumption',
      votes: 156,
      status: 'Research',
      eta: 'Q3 2024',
      progress: 25,
      details: [
        'Listening patterns',
        'Topic preferences',
        'Time analysis',
        'Custom reports'
      ]
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'In Development': return 'success';
      case 'Planning': return 'warning';
      case 'Research': return 'primary';
      default: return 'default';
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

      {activeTab === 'requested' && (
        <div className="space-y-4">
          {requestedFeatures.map((feature) => (
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
                    }`}>{feature.title}</h3>
                    <p className={`mb-4 ${
                      theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                    }`}>{feature.description}</p>
                    <div className="flex items-center gap-4 text-sm">
                      <div className={`flex items-center gap-2 ${
                        theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                      }`}>
                        <Users className="w-4 h-4" />
                        <span>{feature.supporters} supporters</span>
                      </div>
                      <div className={`flex items-center gap-2 ${
                        theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                      }`}>
                        <Clock className="w-4 h-4" />
                        <span>Requested on {feature.requestedDate}</span>
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
                    >
                      {feature.votes.up}
                    </Button>
                    <Button
                      startContent={<ThumbsDown className="w-4 h-4" />}
                      className={`${
                        theme === 'dark'
                          ? 'bg-gray-700 text-white hover:bg-gray-600'
                          : 'bg-gray-100 text-gray-900 hover:bg-gray-200'
                      }`}
                    >
                      {feature.votes.down}
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
          {upcomingFeatures.map((feature) => (
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
                      {feature.details.map((detail, index) => (
                        <div key={index} className="flex items-center gap-2">
                          <ChevronRight className="w-4 h-4 text-primary" />
                          <span className={theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}>
                            {detail}
                          </span>
                        </div>
                      ))}
                    </div>

                    <div className="flex items-center gap-4 mt-4 text-sm">
                      <span className="text-primary">Expected: {feature.eta}</span>
                      <span className={theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}>
                        {feature.votes} votes
                      </span>
                    </div>
                  </div>
                  <Button
                    className="bg-secondary text-black font-medium hover:bg-secondary/90"
                  >
                    More Details
                  </Button>
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
              defaultSelectedKeys={["newest"]}
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
          
          {[
            {
              title: 'AI-Powered Summaries',
              description: 'Get instant, accurate summaries of any podcast episode using advanced AI technology',
              publishDate: '2024-03-15',
              category: 'AI & Machine Learning',
              highlights: [
                'Smart content analysis',
                'Multi-language support',
                'Key points extraction'
              ]
            },
            {
              title: 'Cross-Platform Sync',
              description: 'Seamlessly sync your content and preferences across all your devices',
              publishDate: '2024-03-10',
              category: 'User Experience',
              highlights: [
                'Real-time synchronization',
                'Offline support',
                'Cross-device compatibility'
              ]
            }
          ].map((feature, index) => (
            <Card key={index} className={`${
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
                      <Badge variant="flat" className="bg-[#ff3366]/10 text-[#ff3366]">
                        {feature.category}
                      </Badge>
                    </div>
                    <p className={`mb-4 ${
                      theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                    }`}>{feature.description}</p>

                    <div className="grid grid-cols-2 gap-4 mb-4">
                      {feature.highlights.map((highlight, idx) => (
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
                        <span>Published on {feature.publishDate}</span>
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
  );
};

export default NewFeatures;