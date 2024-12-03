import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Settings as SettingsIcon, User, Bell, Shield, Palette, Globe, CreditCard } from 'lucide-react';
import { Card, CardBody } from "@nextui-org/react";

const Settings = () => {
  const navigate = useNavigate();

  const settingsSections = [
    {
      icon: <User className="w-6 h-6" />,
      title: 'Account Settings',
      description: 'Manage your account details and preferences',
      path: '/dashboard/settings/account'
    },
    {
      icon: <Bell className="w-6 h-6" />,
      title: 'Notifications',
      description: 'Configure your notification preferences',
      path: '/dashboard/settings/notifications'
    },
    {
      icon: <Shield className="w-6 h-6" />,
      title: 'Privacy & Security',
      description: 'Control your privacy settings and security options',
      path: '/dashboard/settings/privacy'
    },
    {
      icon: <Palette className="w-6 h-6" />,
      title: 'Appearance',
      description: 'Customize your dashboard appearance',
      path: '/dashboard/settings/appearance'
    },
    {
      icon: <Globe className="w-6 h-6" />,
      title: 'Language & Region',
      description: 'Set your preferred language and region',
      path: '/dashboard/settings/language'
    },
    {
      icon: <CreditCard className="w-6 h-6" />,
      title: 'Billing',
      description: 'Manage your subscription and payment methods',
      path: '/dashboard/settings/billing'
    }
  ];

  return (
    <div>
      <div className="flex items-center gap-3 mb-8">
        <SettingsIcon className="w-8 h-8 text-primary" />
        <h1 className="text-3xl font-bold text-white">Settings</h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {settingsSections.map((section) => (
          <Card 
            key={section.title}
            isPressable
            className="bg-gray-800/50 border border-gray-700/50 hover:bg-gray-800 transition-colors"
            onClick={() => navigate(section.path)}
          >
            <CardBody className="flex flex-row items-start gap-4 p-6">
              <div className="p-2 bg-gray-700/50 rounded-lg">
                {section.icon}
              </div>
              <div>
                <h3 className="text-lg font-semibold text-white mb-1">{section.title}</h3>
                <p className="text-gray-400 text-sm">{section.description}</p>
              </div>
            </CardBody>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Settings;