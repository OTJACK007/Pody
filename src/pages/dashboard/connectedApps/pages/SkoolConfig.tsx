import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Settings2, ExternalLink, Users, BookOpen, MessageSquare, TrendingUp } from 'lucide-react';
import { Card, CardBody, Button, Switch } from "@nextui-org/react";
import { useTheme } from '../../../../contexts/ThemeContext';

const SkoolConfig = () => {
  const navigate = useNavigate();
  const { theme } = useTheme();

  const [settings, setSettings] = useState({
    communityFeatures: true,
    courseIntegration: true,
    progressTracking: false,
    discussionForums: true
  });

  const stats = {
    activeMembers: '2.5K',
    courses: '15',
    discussions: '850',
    engagement: '92%'
  };

  return (
    <div className="space-y-8">
      <div>
        <Button
          variant="light"
          startContent={<ArrowLeft className="w-4 h-4" />}
          className={`mb-6 ${
            theme === 'dark' ? 'text-gray-400 hover:text-white' : 'text-gray-600 hover:text-black'
          }`}
          onClick={() => navigate('/dashboard/connected-apps')}
        >
          Back to Connected Apps
        </Button>

        <div className="flex items-center gap-3 mb-8">
          <Settings2 className="w-8 h-8 text-primary" />
          <div>
            <h1 className={`text-3xl font-bold ${
              theme === 'dark' ? 'text-white' : 'text-gray-900'
            }`}>Skool Configuration</h1>
            <p className={theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}>
              Manage your Skool integration settings
            </p>
          </div>
        </div>
      </div>

      <div className="grid gap-6">
        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card className={`${
            theme === 'dark' 
              ? 'bg-gray-800/50 border-gray-700/50' 
              : 'bg-white border-gray-200'
          } border`}>
            <CardBody className="p-4">
              <div className="flex items-center justify-between mb-2">
                <div className="p-2 bg-primary/10 rounded-lg">
                  <Users className="w-5 h-5 text-primary" />
                </div>
                <span className={`text-2xl font-bold ${
                  theme === 'dark' ? 'text-white' : 'text-gray-900'
                }`}>{stats.activeMembers}</span>
              </div>
              <p className={theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}>
                Active Members
              </p>
            </CardBody>
          </Card>

          <Card className={`${
            theme === 'dark' 
              ? 'bg-gray-800/50 border-gray-700/50' 
              : 'bg-white border-gray-200'
          } border`}>
            <CardBody className="p-4">
              <div className="flex items-center justify-between mb-2">
                <div className="p-2 bg-green-500/10 rounded-lg">
                  <BookOpen className="w-5 h-5 text-green-500" />
                </div>
                <span className={`text-2xl font-bold ${
                  theme === 'dark' ? 'text-white' : 'text-gray-900'
                }`}>{stats.courses}</span>
              </div>
              <p className={theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}>
                Active Courses
              </p>
            </CardBody>
          </Card>

          <Card className={`${
            theme === 'dark' 
              ? 'bg-gray-800/50 border-gray-700/50' 
              : 'bg-white border-gray-200'
          } border`}>
            <CardBody className="p-4">
              <div className="flex items-center justify-between mb-2">
                <div className="p-2 bg-yellow-500/10 rounded-lg">
                  <MessageSquare className="w-5 h-5 text-yellow-500" />
                </div>
                <span className={`text-2xl font-bold ${
                  theme === 'dark' ? 'text-white' : 'text-gray-900'
                }`}>{stats.discussions}</span>
              </div>
              <p className={theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}>
                Active Discussions
              </p>
            </CardBody>
          </Card>

          <Card className={`${
            theme === 'dark' 
              ? 'bg-gray-800/50 border-gray-700/50' 
              : 'bg-white border-gray-200'
          } border`}>
            <CardBody className="p-4">
              <div className="flex items-center justify-between mb-2">
                <div className="p-2 bg-blue-500/10 rounded-lg">
                  <TrendingUp className="w-5 h-5 text-blue-500" />
                </div>
                <span className={`text-2xl font-bold ${
                  theme === 'dark' ? 'text-white' : 'text-gray-900'
                }`}>{stats.engagement}</span>
              </div>
              <p className={theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}>
                Engagement Rate
              </p>
            </CardBody>
          </Card>
        </div>

        {/* Settings */}
        <Card className={`${
          theme === 'dark' 
            ? 'bg-gray-800/50 border-gray-700/50' 
            : 'bg-white border-gray-200'
        } border`}>
          <CardBody className="p-6">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className={`text-lg font-semibold ${
                  theme === 'dark' ? 'text-white' : 'text-gray-900'
                }`}>Integration Settings</h3>
                <p className={theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}>
                  Configure your Skool integration
                </p>
              </div>
              <Button
                endContent={<ExternalLink className="w-4 h-4" />}
                className={`${
                  theme === 'dark'
                    ? 'bg-gray-700 text-white hover:bg-gray-600'
                    : 'bg-gray-100 text-gray-900 hover:bg-gray-200'
                }`}
                size="sm"
              >
                Open Skool
              </Button>
            </div>

            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className={theme === 'dark' ? 'text-white' : 'text-gray-900'}>
                    Community Features
                  </p>
                  <p className={`text-sm ${
                    theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                  }`}>
                    Enable community engagement features
                  </p>
                </div>
                <Switch
                  isSelected={settings.communityFeatures}
                  onValueChange={(value) => setSettings({ ...settings, communityFeatures: value })}
                  color="success"
                />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <p className={theme === 'dark' ? 'text-white' : 'text-gray-900'}>
                    Course Integration
                  </p>
                  <p className={`text-sm ${
                    theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                  }`}>
                    Integrate with course content
                  </p>
                </div>
                <Switch
                  isSelected={settings.courseIntegration}
                  onValueChange={(value) => setSettings({ ...settings, courseIntegration: value })}
                  color="success"
                />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <p className={theme === 'dark' ? 'text-white' : 'text-gray-900'}>
                    Progress Tracking
                  </p>
                  <p className={`text-sm ${
                    theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                  }`}>
                    Track member progress and achievements
                  </p>
                </div>
                <Switch
                  isSelected={settings.progressTracking}
                  onValueChange={(value) => setSettings({ ...settings, progressTracking: value })}
                  color="success"
                />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <p className={theme === 'dark' ? 'text-white' : 'text-gray-900'}>
                    Discussion Forums
                  </p>
                  <p className={`text-sm ${
                    theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                  }`}>
                    Enable community discussions
                  </p>
                </div>
                <Switch
                  isSelected={settings.discussionForums}
                  onValueChange={(value) => setSettings({ ...settings, discussionForums: value })}
                  color="success"
                />
              </div>
            </div>
          </CardBody>
        </Card>
      </div>
    </div>
  );
};

export default SkoolConfig;