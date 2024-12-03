import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Settings as SettingsIcon, User, Bell, Shield, Palette, Globe, CreditCard } from 'lucide-react';
import { Card, CardBody } from "@nextui-org/react";
import { useTheme } from '../../contexts/ThemeContext';

const Settings = () => {
  const navigate = useNavigate();
  const { theme } = useTheme();

  const settingsSections = [
    {
      icon: <User className="w-6 h-6 text-[#ff3366]" />,
      title: 'Account Settings',
      description: 'Manage your account details and preferences',
      path: '/dashboard/settings/account'
    },
    {
      icon: <Bell className="w-6 h-6 text-[#ff3366]" />,
      title: 'Notifications',
      description: 'Configure your notification preferences',
      path: '/dashboard/settings/notifications'
    },
    {
      icon: <Shield className="w-6 h-6 text-[#ff3366]" />,
      title: 'Privacy & Security',
      description: 'Control your privacy settings and security options',
      path: '/dashboard/settings/privacy'
    },
    {
      icon: <Palette className="w-6 h-6 text-[#ff3366]" />,
      title: 'Appearance',
      description: 'Customize your dashboard appearance',
      path: '/dashboard/settings/appearance'
    },
    {
      icon: <Globe className="w-6 h-6 text-[#ff3366]" />,
      title: 'Language & Region',
      description: 'Set your preferred language and region',
      path: '/dashboard/settings/language'
    },
    {
      icon: <CreditCard className="w-6 h-6 text-[#ff3366]" />,
      title: 'Billing',
      description: 'Manage your subscription and payment methods',
      path: '/dashboard/settings/billing'
    }
  ];

  return (
    <div>
      <div className="flex items-center gap-3 mb-8">
        <SettingsIcon className="w-8 h-8 text-[#ff3366]" />
        <h1 className={`text-3xl font-bold ${
          theme === 'dark' ? 'text-white' : 'text-gray-900'
        }`}>Settings</h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {settingsSections.map((section) => (
          <Card 
            key={section.title}
            isPressable
            className={`${
              theme === 'dark' 
                ? 'bg-gray-800/50 border-gray-700/50 hover:bg-gray-800' 
                : 'bg-white border-gray-200 hover:bg-gray-50'
            } border transition-colors`}
            onClick={() => navigate(section.path)}
          >
            <CardBody className="flex flex-row items-start gap-4 p-6">
              <div className={`p-2 ${
                theme === 'dark' ? 'bg-gray-700/50' : 'bg-gray-100'
              } rounded-lg`}>
                {section.icon}
              </div>
              <div>
                <h3 className={`text-lg font-semibold mb-1 ${
                  theme === 'dark' ? 'text-white' : 'text-gray-900'
                }`}>{section.title}</h3>
                <p className={`text-sm ${
                  theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                }`}>{section.description}</p>
              </div>
            </CardBody>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Settings;