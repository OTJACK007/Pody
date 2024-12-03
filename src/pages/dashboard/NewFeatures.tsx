import React, { useState } from 'react';
import { Sparkles, ThumbsUp, ThumbsDown, Send, ChevronRight, Clock, Users } from 'lucide-react';
import { Card, CardBody, Button, Tabs, Tab, Input, Textarea, Badge, Progress } from "@nextui-org/react";

const NewFeatures = () => {
  const [activeTab, setActiveTab] = useState('requested');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [reason, setReason] = useState('');

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

  const handleSubmit = () => {
    // Handle feature suggestion submission
    setTitle('');
    setDescription('');
    setReason('');
  };

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
          <h1 className="text-3xl font-bold text-white">New Features</h1>
          <p className="text-gray-400 mt-1">Vote for upcoming features or suggest new ones</p>
        </div>
      </div>

      <Tabs 
        selectedKey={activeTab}
        onSelectionChange={(key) => setActiveTab(key.toString())}
        classNames={{
          tabList: "bg-gray-800/50 p-1 rounded-lg",
          cursor: "bg-gray-700",
          tab: "text-gray-400 data-[selected=true]:text-white",
        }}
      >
        <Tab key="requested" title="Requested Features" />
        <Tab key="upcoming" title="Upcoming Features" />
        <Tab key="suggest" title="Suggest Feature" />
      </Tabs>

      {activeTab === 'requested' && (
        <div className="space-y-4">
          {requestedFeatures.map((feature) => (
            <Card key={feature.id} className="bg-gray-800/50 border border-gray-700/50">
              <CardBody className="p-6">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-grow">
                    <h3 className="text-xl font-semibold text-white mb-2">{feature.title}</h3>
                    <p className="text-gray-400 mb-4">{feature.description}</p>
                    <div className="flex items-center gap-4 text-sm">
                      <div className="flex items-center gap-2 text-gray-400">
                        <Users className="w-4 h-4" />
                        <span>{feature.supporters} supporters</span>
                      </div>
                      <div className="flex items-center gap-2 text-gray-400">
                        <Clock className="w-4 h-4" />
                        <span>Requested on {feature.requestedDate}</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-col items-end gap-2">
                    <div className="flex items-center gap-2">
                      <Button
                        startContent={<ThumbsUp className="w-4 h-4" />}
                        className="bg-gray-700 text-white hover:bg-gray-600"
                      >
                        {feature.votes.up}
                      </Button>
                      <Button
                        startContent={<ThumbsDown className="w-4 h-4" />}
                        className="bg-gray-700 text-white hover:bg-gray-600"
                      >
                        {feature.votes.down}
                      </Button>
                    </div>
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
            <Card key={feature.id} className="bg-gray-800/50 border border-gray-700/50">
              <CardBody className="p-6">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-grow">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-xl font-semibold text-white">{feature.title}</h3>
                      <Badge color={getStatusColor(feature.status)} variant="flat">
                        {feature.status}
                      </Badge>
                    </div>
                    <p className="text-gray-400 mb-4">{feature.description}</p>
                    
                    <div className="mb-4">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm text-gray-400">Development Progress</span>
                        <span className="text-sm text-white">{feature.progress}%</span>
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
                          <span className="text-sm text-gray-300">{detail}</span>
                        </div>
                      ))}
                    </div>

                    <div className="flex items-center gap-4 mt-4 text-sm">
                      <span className="text-primary">Expected: {feature.eta}</span>
                      <span className="text-gray-400">{feature.votes} votes</span>
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

      {activeTab === 'suggest' && (
        <Card className="bg-gray-800/50 border border-gray-700/50">
          <CardBody className="p-6">
            <div className="space-y-6">
              <div>
                <Input
                  label="Feature Title"
                  placeholder="Enter feature title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  classNames={{
                    input: "bg-gray-700/50 text-white",
                    inputWrapper: "bg-gray-700/50 border-gray-600"
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
                    input: "bg-gray-700/50 text-white",
                    inputWrapper: "bg-gray-700/50 border-gray-600"
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
                    input: "bg-gray-700/50 text-white",
                    inputWrapper: "bg-gray-700/50 border-gray-600"
                  }}
                />
              </div>

              <Button
                className="w-full bg-primary text-white"
                endContent={<Send className="w-4 h-4" />}
                onClick={handleSubmit}
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