import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Settings2, ExternalLink, DollarSign, Users, Crown, BarChart2 } from 'lucide-react';
import { Card, CardBody, Button, Switch } from "@nextui-org/react";
import { useTheme } from '../../../../contexts/ThemeContext';

const PatreonConfig = () => {
  const navigate = useNavigate();
  const { theme } = useTheme();

  const [settings, setSettings] = useState({
    autoPost: true,
    exclusiveContent: true,
    tierSync: true,
    analytics: true
  });

  const stats = {
    patrons: '1.2K',
    monthlyRevenue: '$5.8K',
    avgPledge: '$4.80',
    retention: '92%'
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
            }`}>Patreon Configuration</h1>
            <p className={theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}>
              Manage your Patreon integration settings
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
                }`}>{stats.patrons}</span>
              </div>
              <p className={theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}>
                Total Patrons
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
                  <DollarSign className="w-5 h-5 text-green-500" />
                </div>
                <span className={`text-2xl font-bold ${
                  theme === 'dark' ? 'text-white' : 'text-gray-900'
                }`}>{stats.monthlyRevenue}</span>
              </div>
              <p className={theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}>
                Monthly Revenue
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
                  <Crown className="w-5 h-5 text-yellow-500" />
                </div>
                <span className={`text-2xl font-bold ${
                  theme === 'dark' ? 'text-white' : 'text-gray-900'
                }`}>{stats.avgPledge}</span>
              </div>
              <p className={theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}>
                Average Pledge
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
                  <BarChart2 className="w-5 h-5 text-blue-500" />
                </div>
                <span className={`text-2xl font-bold ${
                  theme === 'dark' ? 'text-white' : 'text-gray-900'
                }`}>{stats.retention}</span>
              </div>
              <p className={theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}>
                Patron Retention
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
                  Configure your Patreon integration
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
                Open Patreon
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
                    Automatically share new content with patrons
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
                    Exclusive Content
                  </p>
                  <p className={`text-sm ${
                    theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                  }`}>
                    Manage patron-only content access
                  </p>
                </div>
                <Switch
                  isSelected={settings.exclusiveContent}
                  onValueChange={(value) => setSettings({ ...settings, exclusiveContent: value })}
                  color="success"
                />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <p className={theme === 'dark' ? 'text-white' : 'text-gray-900'}>
                    Tier Synchronization
                  </p>
                  <p className={`text-sm ${
                    theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                  }`}>
                    Sync patron tiers with platform features
                  </p>
                </div>
                <Switch
                  isSelected={settings.tierSync}
                  onValueChange={(value) => setSettings({ ...settings, tierSync: value })}
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
                    Track patron engagement and revenue
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

export default PatreonConfig;