import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Settings2, Flag, Users, BarChart2, FileText, Zap, MessageSquare } from 'lucide-react';
import { Card, CardBody } from "@nextui-org/react";
import { useTheme } from '../../../contexts/ThemeContext';

const Backoffice = () => {
  const navigate = useNavigate();
  const { theme } = useTheme();

  const sections = [
    {
      icon: <Flag className="w-6 h-6 text-[#ff3366]" />,
      title: 'Features Management',
      description: 'Manage feature requests and roadmap',
      path: '/dashboard/backoffice/features'
    },
    {
      icon: <Users className="w-6 h-6 text-[#ff3366]" />,
      title: 'User Management',
      description: 'Manage users, roles and permissions',
      path: '/dashboard/backoffice/users'
    },
    {
      icon: <BarChart2 className="w-6 h-6 text-[#ff3366]" />,
      title: 'Analytics Dashboard',
      description: 'View detailed platform analytics',
      path: '/dashboard/backoffice/analytics'
    },
    {
      icon: <FileText className="w-6 h-6 text-[#ff3366]" />,
      title: 'Content Management',
      description: 'Manage platform content and moderation',
      path: '/dashboard/backoffice/content'
    },
    {
      icon: <Zap className="w-6 h-6 text-[#ff3366]" />,
      title: 'System Settings',
      description: 'Configure platform settings',
      path: '/dashboard/backoffice/settings'
    },
    {
      icon: <MessageSquare className="w-6 h-6 text-[#ff3366]" />,
      title: 'Support Management',
      description: 'Handle user support and feedback',
      path: '/dashboard/backoffice/support'
    }
  ];

  return (
    <div>
      <div className="flex items-center gap-3 mb-8">
        <Settings2 className="w-8 h-8 text-[#ff3366]" />
        <div>
          <h1 className={`text-3xl font-bold ${
            theme === 'dark' ? 'text-white' : 'text-gray-900'
          }`}>Backoffice</h1>
          <p className={theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}>
            Manage and configure platform settings
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {sections.map((section) => (
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

export default Backoffice;