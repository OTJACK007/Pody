import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Settings2, ExternalLink, Users, Layout, Clock, Share2 } from 'lucide-react';
import { Card, CardBody, Button, Switch } from "@nextui-org/react";
import { useTheme } from '../../../../contexts/ThemeContext';

const MiroConfig = () => {
  const navigate = useNavigate();
  const { theme } = useTheme();

  const [settings, setSettings] = useState({
    boardSync: true,
    teamCollaboration: true,
    templateAccess: false,
    realTimeUpdates: true
  });

  const stats = {
    activeBoards: '25',
    teamMembers: '12',
    templates: '8',
    sharedAssets: '156'
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
            }`}>Miro Configuration</h1>
            <p className={theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}>
              Manage your Miro integration settings
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
                  <Layout className="w-5 h-5 text-primary" />
                </div>
                <span className={`text-2xl font-bold ${
                  theme === 'dark' ? 'text-white' : 'text-gray-900'
                }`}>{stats.activeBoards}</span>
              </div>
              <p className={theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}>
                Active Boards
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
                  <Users className="w-5 h-5 text-green-500" />
                </div>
                <span className={`text-2xl font-bold ${
                  theme === 'dark' ? 'text-white' : 'text-gray-900'
                }`}>{stats.teamMembers}</span>
              </div>
              <p className={theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}>
                Team Members
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
                  <Clock className="w-5 h-5 text-yellow-500" />
                </div>
                <span className={`text-2xl font-bold ${
                  theme === 'dark' ? 'text-white' : 'text-gray-900'
                }`}>{stats.templates}</span>
              </div>
              <p className={theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}>
                Active Templates
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
                }`}>{stats.sharedAssets}</span>
              </div>
              <p className={theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}>
                Shared Assets
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
                  Configure your Miro integration
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
                Open Miro
              </Button>
            </div>

            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className={theme === 'dark' ? 'text-white' : 'text-gray-900'}>
                    Board Sync
                  </p>
                  <p className={`text-sm ${
                    theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                  }`}>
                    Sync boards across platforms
                  </p>
                </div>
                <Switch
                  isSelected={settings.boardSync}
                  onValueChange={(value) => setSettings({ ...settings, boardSync: value })}
                  color="success"
                />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <p className={theme === 'dark' ? 'text-white' : 'text-gray-900'}>
                    Team Collaboration
                  </p>
                  <p className={`text-sm ${
                    theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                  }`}>
                    Enable team collaboration features
                  </p>
                </div>
                <Switch
                  isSelected={settings.teamCollaboration}
                  onValueChange={(value) => setSettings({ ...settings, teamCollaboration: value })}
                  color="success"
                />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <p className={theme === 'dark' ? 'text-white' : 'text-gray-900'}>
                    Template Access
                  </p>
                  <p className={`text-sm ${
                    theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                  }`}>
                    Access premium templates
                  </p>
                </div>
                <Switch
                  isSelected={settings.templateAccess}
                  onValueChange={(value) => setSettings({ ...settings, templateAccess: value })}
                  color="success"
                />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <p className={theme === 'dark' ? 'text-white' : 'text-gray-900'}>
                    Real-time Updates
                  </p>
                  <p className={`text-sm ${
                    theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                  }`}>
                    Enable real-time board updates
                  </p>
                </div>
                <Switch
                  isSelected={settings.realTimeUpdates}
                  onValueChange={(value) => setSettings({ ...settings, realTimeUpdates: value })}
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

export default MiroConfig;