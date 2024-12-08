import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Settings2, ExternalLink, Users, TrendingUp, BarChart2, Share2 } from 'lucide-react';
import { Card, CardBody, Button, Switch } from "@nextui-org/react";
import { useTheme } from '../../../../contexts/ThemeContext';

const MetaConfig = () => {
  const navigate = useNavigate();
  const { theme } = useTheme();

  const [settings, setSettings] = useState({
    autoPost: true,
    crossPosting: true,
    insights: true,
    analytics: true
  });

  const stats = {
    followers: '85.2K',
    engagement: '5.8%',
    reach: '2.1M',
    shares: '12.5K'
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
            }`}>Meta Configuration</h1>
            <p className={theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}>
              Manage your Meta platforms integration settings
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
                }`}>{stats.followers}</span>
              </div>
              <p className={theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}>
                Total Followers
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
                  <TrendingUp className="w-5 h-5 text-green-500" />
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

          <Card className={`${
            theme === 'dark' 
              ? 'bg-gray-800/50 border-gray-700/50' 
              : 'bg-white border-gray-200'
          } border`}>
            <CardBody className="p-4">
              <div className="flex items-center justify-between mb-2">
                <div className="p-2 bg-yellow-500/10 rounded-lg">
                  <BarChart2 className="w-5 h-5 text-yellow-500" />
                </div>
                <span className={`text-2xl font-bold ${
                  theme === 'dark' ? 'text-white' : 'text-gray-900'
                }`}>{stats.reach}</span>
              </div>
              <p className={theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}>
                Monthly Reach
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
                  <Share2 className="w-5 h-5 text-blue-500" />
                </div>
                <span className={`text-2xl font-bold ${
                  theme === 'dark' ? 'text-white' : 'text-gray-900'
                }`}>{stats.shares}</span>
              </div>
              <p className={theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}>
                Monthly Shares
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
                  Configure your Meta platforms integration
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
                Open Meta Business Suite
              </Button>
            </div>

            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className={theme === 'dark' ? 'text-white' : 'text-gray-900'}>
                    Auto-post Content
                  </p>
                  <p className={`text-sm ${
                    theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                  }`}>
                    Automatically share new content on Meta platforms
                  </p>
                </div>
                <Switch
                  isSelected={settings.autoPost}
                  onValueChange={(value) => setSettings({ ...settings, autoPost: value })}
                  color="success"
                />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <p className={theme === 'dark' ? 'text-white' : 'text-gray-900'}>
                    Cross-platform Posting
                  </p>
                  <p className={`text-sm ${
                    theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                  }`}>
                    Share content across Facebook and Instagram
                  </p>
                </div>
                <Switch
                  isSelected={settings.crossPosting}
                  onValueChange={(value) => setSettings({ ...settings, crossPosting: value })}
                  color="success"
                />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <p className={theme === 'dark' ? 'text-white' : 'text-gray-900'}>
                    Audience Insights
                  </p>
                  <p className={`text-sm ${
                    theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                  }`}>
                    Track audience demographics and behavior
                  </p>
                </div>
                <Switch
                  isSelected={settings.insights}
                  onValueChange={(value) => setSettings({ ...settings, insights: value })}
                  color="success"
                />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <p className={theme === 'dark' ? 'text-white' : 'text-gray-900'}>
                    Analytics Integration
                  </p>
                  <p className={`text-sm ${
                    theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                  }`}>
                    Track performance metrics
                  </p>
                </div>
                <Switch
                  isSelected={settings.analytics}
                  onValueChange={(value) => setSettings({ ...settings, analytics: value })}
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

export default MetaConfig;