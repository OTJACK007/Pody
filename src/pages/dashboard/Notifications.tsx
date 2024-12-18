import React from 'react';
import { Bell, Trash2, MessageSquare, Gift, Star } from 'lucide-react';
import { Button, Card, CardBody } from "@nextui-org/react";
import { useTheme } from '../../contexts/ThemeContext';

const Notifications = () => {
  const { theme } = useTheme();

  const notifications = [
    {
      id: 1,
      type: 'message',
      title: 'New Episode Available',
      description: 'TechInsights just uploaded "The Future of AI"',
      time: '2 minutes ago',
      icon: <MessageSquare className="w-5 h-5" />
    },
    {
      id: 2,
      type: 'gift',
      title: 'Special Offer',
      description: 'Get 20% off on annual subscription',
      time: '1 hour ago',
      icon: <Gift className="w-5 h-5" />
    },
    {
      id: 3,
      type: 'star',
      title: 'Achievement Unlocked',
      description: "You have watched 50 episodes!",
      time: '2 hours ago',
      icon: <Star className="w-5 h-5" />
    }
  ];

  const handleDelete = (id: number) => {
    // Handle notification deletion
    console.log('Delete notification:', id);
  };

  return (
    <div>
      <div className="flex items-center gap-3 mb-8">
        <Bell className="w-8 h-8 text-primary" />
        <div>
          <h1 className={`text-3xl font-bold ${
            theme === 'dark' ? 'text-white' : 'text-gray-900'
          }`}>Notifications</h1>
          <p className={theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}>
            Stay updated with your latest activities
          </p>
        </div>
      </div>

      <div className="space-y-4 max-w-4xl">
        {notifications.map((notification) => (
          <Card 
            key={notification.id}
            className={`${
              theme === 'dark' 
                ? 'bg-gray-800/50 border-gray-700/50' 
                : 'bg-white border-gray-200'
            } border`}
          >
            <CardBody className="p-4">
              <div className="flex items-center w-full">
                <div className="p-3 bg-primary/10 rounded-lg mr-4">
                  {notification.icon}
                </div>
                <div className="flex-grow">
                  <h3 className={`text-lg font-semibold mb-1 ${
                    theme === 'dark' ? 'text-white' : 'text-gray-900'
                  }`}>
                    {notification.title}
                  </h3>
                  <p className={`text-sm mb-2 ${
                    theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                  }`}>
                    {notification.description}
                  </p>
                  <span className={`text-xs ${
                    theme === 'dark' ? 'text-gray-500' : 'text-gray-400'
                  }`}>
                    {notification.time}
                  </span>
                </div>
                <div className="ml-4 flex-shrink-0">
                  <Button
                    isIconOnly
                    variant="light"
                    className={`${
                      theme === 'dark' 
                        ? 'text-gray-400 hover:text-red-500' 
                        : 'text-gray-600 hover:text-red-500'
                    }`}
                    onClick={() => handleDelete(notification.id)}
                  >
                    <Trash2 className="w-5 h-5" />
                  </Button>
                </div>
              </div>
            </CardBody>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Notifications;