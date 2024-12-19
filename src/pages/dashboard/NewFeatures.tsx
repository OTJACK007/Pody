import { useState, useEffect } from 'react';
import { Sparkles, ThumbsUp, ThumbsDown, Send, ChevronRight, Clock, Users, Rocket } from 'lucide-react';
import { Card, CardBody, Button, Tabs, Tab, Input, Textarea, Badge, Progress, Select, SelectItem } from "@nextui-org/react";
import { useAuth } from '../../contexts/AuthContext';
import { useTheme } from '../../contexts/ThemeContext';
import { fetchFeatures, suggestFeature, voteOnFeature } from '../../services/features';
import type { Feature } from '../../services/features';

const NewFeatures = () => {
  const [activeTab, setActiveTab] = useState('requested');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [reason, setReason] = useState('');
  const [sortBy, setSortBy] = useState('newest');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [features, setFeatures] = useState<Feature[]>([]);
  const { theme } = useTheme();
  const { currentUser } = useAuth();

  useEffect(() => {
    loadFeatures();
  }, [activeTab]);

  const loadFeatures = async () => {
    try {
      let status: Feature['status'];
      switch (activeTab) {
        case 'requested':
          status = 'collectingvotes';
          break;
        case 'upcoming':
          status = 'upcoming';
          break;
        case 'published':
          status = 'published';
          break;
        default:
          return;
      }

      const data = await fetchFeatures(status);
      setFeatures(data);
    } catch (error) {
      console.error('Error loading features:', error);
    }
  };

  const handleSubmit = async () => {
    if (!currentUser) return;
    
    setIsSubmitting(true);
    try {
      await suggestFeature({
        title,
        subtitle: '',
        description,
        development_progress: 0,
        expected_release: '',
        subfeatures: [],
        status: 'inbox',
        created_by: currentUser.id
      });
      
      setTitle('');
      setDescription('');
      setReason('');
      setActiveTab('requested');
    } catch (error) {
      console.error('Error submitting feature:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleVote = async (featureId: string, voteType: 'up' | 'down') => {
    if (!currentUser) return;
    
    try {
      await voteOnFeature(featureId, currentUser.id, voteType);
      await loadFeatures();
    } catch (error) {
      console.error('Error voting:', error);
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

      {activeTab === 'suggest' && (
        <Card className={`${
          theme === 'dark' 
            ? 'bg-gray-800/50 border-gray-700/50' 
            : 'bg-white border-gray-200'
        } border`}>
          <CardBody className="p-6">
            <div className="space-y-6">
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
                      <Badge variant="flat" className="bg-[#ff3366]/10 text-[#ff3366]">
                        Published
                      </Badge>
                    </div>
                    <p className={`mb-4 ${
                      theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                    }`}>{feature.description}</p>

                    <div className="grid grid-cols-2 gap-4 mb-4">
                      {feature.subfeatures.map((subfeature, idx) => (
                        <div key={idx} className="flex items-center gap-2">
                          <div className="w-1.5 h-1.5 rounded-full bg-[#ff3366]" />
                          <span className={theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}>
                            {subfeature}
                          </span>
                        </div>
                      ))}
                    </div>

                    <div className="flex items-center gap-4">
                      <div className={`flex items-center gap-2 text-sm ${
                        theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                      }`}>
                        <Clock className="w-4 h-4" />
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
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className={`text-xl font-semibold ${
                        theme === 'dark' ? 'text-white' : 'text-gray-900'
                      }`}>{feature.title}</h3>
                      <Badge color="warning" variant="flat">
                        Collecting Votes
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
                          <Clock className="w-4 h-4" />
                          <span>Requested on {new Date(feature.requested_at).toLocaleDateString()}</span>
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
                          onClick={() => handleVote(feature.id, 'up')}
                        >
                          {feature.votes_up}
                        </Button>
                        <Button
                          size="sm"
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
                      }`}>{feature.title}</h3>
                      <Badge color="primary" variant="flat">
                        In Development
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
                        color="primary"
                        className="max-w-full"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      {feature.subfeatures.map((subfeature, idx) => (
                        <div key={idx} className="flex items-center gap-2">
                          <ChevronRight className="w-4 h-4 text-primary" />
                          <span className={theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}>
                            {subfeature}
                          </span>
                        </div>
                      ))}
                    </div>

                    <div className="flex items-center gap-4 mt-4">
                      <span className="text-primary">Expected: {feature.expected_release}</span>
                      <span className={theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}>
                        {feature.votes_up + feature.votes_down} votes
                      </span>
                    </div>
                  </div>
                </div>
              </CardBody>
            </Card>
          ))}
        </div>
      )}

     
    </div>
  );
};

export default NewFeatures;