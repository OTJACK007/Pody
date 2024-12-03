import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Settings2, ExternalLink, CheckCircle2 } from 'lucide-react';
import { Card, CardBody, Button, Switch } from "@nextui-org/react";

const AppConfig = () => {
  const { appId } = useParams();
  const navigate = useNavigate();

  const getAppDetails = () => {
    const apps = {
      youtube: {
        name: 'YouTube',
        icon: 'https://static.wixstatic.com/media/c67dd6_aea51bc85e594033b8a29040d67b1d15~mv2.png',
        description: 'Share your podcast content',
        isConnected: true,
        color: 'bg-red-500/10',
        textColor: 'text-red-500',
        settings: [
          { id: 1, label: 'Auto-publish episodes', enabled: true },
          { id: 2, label: 'Sync comments', enabled: false },
          { id: 3, label: 'Cross-post analytics', enabled: true },
          { id: 4, label: 'Channel notifications', enabled: true }
        ]
      },
      notion: {
        name: 'Notion',
        icon: 'https://static.wixstatic.com/media/c67dd6_c0f6b842de844dff9ac8e0e71e7e5a18~mv2.png',
        description: 'Organize your notes and summaries',
        isConnected: false,
        color: 'bg-gray-500/10',
        textColor: 'text-gray-500',
        settings: [
          { id: 1, label: 'Auto-sync notes', enabled: false },
          { id: 2, label: 'Create daily summaries', enabled: false },
          { id: 3, label: 'Share workspace', enabled: false },
          { id: 4, label: 'Integration notifications', enabled: false }
        ]
      },
      spotify: {
        name: 'Spotify',
        icon: 'https://static.wixstatic.com/media/c67dd6_ec71f45884124292ab688e1089e48cb4~mv2.png',
        description: 'Sync your podcast playlists',
        isConnected: true,
        color: 'bg-green-500/10',
        textColor: 'text-green-500',
        settings: [
          { id: 1, label: 'Auto-sync playlists', enabled: true },
          { id: 2, label: 'Share listening activity', enabled: false },
          { id: 3, label: 'Import favorites', enabled: true },
          { id: 4, label: 'Podcast recommendations', enabled: true }
        ]
      },
      'creator-os': {
        name: 'CreatorOS',
        icon: 'https://static.wixstatic.com/media/c67dd6_1244908d1b0545f6ac85b9f17e808a66~mv2.png',
        description: 'Manage your content workflow',
        isConnected: false,
        color: 'bg-blue-500/10',
        textColor: 'text-blue-500',
        settings: [
          { id: 1, label: 'Workflow automation', enabled: false },
          { id: 2, label: 'Team collaboration', enabled: false },
          { id: 3, label: 'Content calendar', enabled: false },
          { id: 4, label: 'Analytics integration', enabled: false }
        ]
      },
      zapier: {
        name: 'Zapier',
        icon: 'https://static.wixstatic.com/media/c67dd6_4de0049f34934c93ac04c63d0bb84608~mv2.png',
        description: 'Automate your workflows',
        isConnected: false,
        color: 'bg-orange-500/10',
        textColor: 'text-orange-500',
        settings: [
          { id: 1, label: 'Custom automations', enabled: false },
          { id: 2, label: 'Multi-step zaps', enabled: false },
          { id: 3, label: 'Error notifications', enabled: false },
          { id: 4, label: 'Usage analytics', enabled: false }
        ]
      },
      'opus-clip': {
        name: 'Opus Clip',
        icon: 'https://static.wixstatic.com/media/c67dd6_c8ef1b8e181340c0a540162c50c059a1~mv2.png',
        description: 'Create short-form content',
        isConnected: false,
        color: 'bg-purple-500/10',
        textColor: 'text-purple-500',
        settings: [
          { id: 1, label: 'Auto-clip generation', enabled: false },
          { id: 2, label: 'Custom branding', enabled: false },
          { id: 3, label: 'Batch processing', enabled: false },
          { id: 4, label: 'Export presets', enabled: false }
        ]
      },
      miro: {
        name: 'Miro',
        icon: 'https://static.wixstatic.com/media/c67dd6_db7bcff2a108431cab79c8c90c531d62~mv2.png',
        description: 'Visualize your content strategy',
        isConnected: false,
        color: 'bg-yellow-500/10',
        textColor: 'text-yellow-500',
        settings: [
          { id: 1, label: 'Board sync', enabled: false },
          { id: 2, label: 'Team collaboration', enabled: false },
          { id: 3, label: 'Template access', enabled: false },
          { id: 4, label: 'Real-time updates', enabled: false }
        ]
      },
      'google-tasks': {
        name: 'Google Tasks',
        icon: 'https://static.wixstatic.com/media/c67dd6_a9320374565d487ab96fa91c5c0ad8fd~mv2.avif',
        description: 'Manage your tasks and reminders',
        isConnected: true,
        color: 'bg-blue-600/10',
        textColor: 'text-blue-600',
        settings: [
          { id: 1, label: 'Task sync', enabled: true },
          { id: 2, label: 'Due date reminders', enabled: true },
          { id: 3, label: 'Priority levels', enabled: false },
          { id: 4, label: 'Calendar integration', enabled: true }
        ]
      },
      skool: {
        name: 'Skool',
        icon: 'https://static.wixstatic.com/media/c67dd6_bd2d62a49a6d4cf3b0f670cda8876925~mv2.png',
        description: 'Build your learning community',
        isConnected: false,
        color: 'bg-pink-500/10',
        textColor: 'text-pink-500',
        settings: [
          { id: 1, label: 'Community features', enabled: false },
          { id: 2, label: 'Course integration', enabled: false },
          { id: 3, label: 'Progress tracking', enabled: false },
          { id: 4, label: 'Discussion forums', enabled: false }
        ]
      },
      bonzai: {
        name: 'Bonzai',
        icon: 'https://static.wixstatic.com/media/c67dd6_f81b724e8fd74c379d41d02ba1b335d9~mv2.png',
        description: 'Optimize your content reach',
        isConnected: false,
        color: 'bg-teal-500/10',
        textColor: 'text-teal-500',
        settings: [
          { id: 1, label: 'SEO optimization', enabled: false },
          { id: 2, label: 'Content distribution', enabled: false },
          { id: 3, label: 'Analytics tracking', enabled: false },
          { id: 4, label: 'Performance reports', enabled: false }
        ]
      }
    };

    return appId ? apps[appId as keyof typeof apps] : null;
  };

  const app = getAppDetails();

  if (!app) {
    return (
      <div className="text-center text-gray-400 py-12">
        App not found
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div>
        <Button
          variant="light"
          startContent={<ArrowLeft className="w-4 h-4" />}
          className="mb-6 text-gray-400 hover:text-white"
          onClick={() => navigate('/dashboard/connected-apps')}
        >
          Back to Connected Apps
        </Button>

        <div className="flex items-center gap-3 mb-8">
          <Settings2 className="w-8 h-8 text-primary" />
          <div>
            <h1 className="text-3xl font-bold text-white">{app.name} Configuration</h1>
            <p className="text-gray-400 mt-1">Manage your {app.name} integration settings</p>
          </div>
        </div>
      </div>

      <div className="grid gap-6">
        <Card className="bg-gray-800/50 border border-gray-700/50">
          <CardBody className="p-6">
            <div className="flex items-center gap-4 mb-6">
              <div className={`p-3 rounded-xl ${app.color}`}>
                <img 
                  src={app.icon} 
                  alt={app.name}
                  className="w-8 h-8 object-contain"
                />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="text-lg font-semibold text-white">{app.name}</h3>
                  {app.isConnected && <CheckCircle2 className="w-4 h-4 text-primary" />}
                </div>
                <p className={`text-sm ${app.textColor}`}>
                  {app.isConnected ? 'Connected' : 'Not Connected'}
                </p>
              </div>
              <Button
                endContent={<ExternalLink className="w-4 h-4" />}
                className="ml-auto bg-gray-700 text-white hover:bg-gray-600"
                size="sm"
              >
                Open {app.name}
              </Button>
            </div>

            <div className="space-y-6">
              <div>
                <h4 className="text-white font-medium mb-4">Integration Settings</h4>
                <div className="space-y-4">
                  {app.settings.map((setting) => (
                    <div key={setting.id} className="flex items-center justify-between">
                      <span className="text-gray-300">{setting.label}</span>
                      <Switch
                        defaultSelected={setting.enabled}
                        size="sm"
                        color="success"
                        isDisabled={!app.isConnected}
                      />
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-6 border-t border-gray-700">
                <Button 
                  className={`w-full ${
                    app.isConnected 
                      ? 'bg-red-500/20 text-red-500 hover:bg-red-500/30' 
                      : 'bg-secondary/20 text-secondary hover:bg-secondary/30'
                  }`}
                >
                  {app.isConnected ? `Disconnect ${app.name}` : `Connect ${app.name}`}
                </Button>
              </div>
            </div>
          </CardBody>
        </Card>
      </div>
    </div>
  );
};

export default AppConfig;