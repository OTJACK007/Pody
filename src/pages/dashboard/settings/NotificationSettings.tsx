import React, { useState, useEffect } from 'react';
import { Bell, Mail, Globe, MessageSquare, Star, Gift, Radio, Smartphone, Volume2 } from 'lucide-react';
import { Card, CardBody, Switch, Tabs, Tab, Divider, Button, Select, SelectItem } from "@nextui-org/react";
import { useTheme } from '../../../contexts/ThemeContext';
import { useSettings } from '../../../contexts/SettingsContext';
import SettingsHeader from '../../../components/dashboard/SettingsHeader';
import type { NotificationSettings as NotificationSettingsType } from '../../../lib/firestore/collections/settings';

const NotificationSettings = () => {
  const { theme } = useTheme();
  const { notifications, updateNotifications } = useSettings();
  const [isLoading, setIsLoading] = useState(false);
  const defaultSettings: NotificationSettingsType = {
    browser: true,
    categories: {},
    content: {
      'new-episodes': true,
      recommendations: true,
      trending: true
    },
    social: {
      follows: true,
      mentions: true,
      replies: true
    },
    system: {
      maintenance: false,
      security: true,
      updates: true,
      email: true,
      emailFrequency: 'immediate',
      mobile: false,
      quietHours: {
        enabled: false,
        end: '07:00',
        start: '22:00',
        sound: true
      }
    },
    quietHours: {
      enabled: false,
      start: '22:00',
      end: '07:00',
      sound: true
    }
  };

  const [localSettings, setLocalSettings] = useState<NotificationSettingsType>({
    browser: true,
    categories: {},
    content: {
      'new-episodes': true,
      recommendations: true,
      trending: true
    },
    social: {
      follows: true,
      mentions: true,
      replies: true
    },
    system: {
      maintenance: false,
      security: true,
      updates: true,
      email: true,
      emailFrequency: 'immediate',
      mobile: false,
      quietHours: {
        enabled: false,
        end: '07:00',
        start: '22:00',
        sound: true
      }
    },
    quietHours: {
      enabled: false,
      start: '22:00',
      end: '07:00',
      sound: true
    }
  });

  useEffect(() => {
    if (notifications) {
      setLocalSettings(notifications);
    }
  }, [notifications]);

  const emailFrequencies = [
    { value: 'immediate', label: 'Immediately' },
    { value: 'daily', label: 'Daily Digest' },
    { value: 'weekly', label: 'Weekly Digest' },
    { value: 'never', label: 'Never' }
  ];

  const notificationTypes = [
    {
      id: 'content',
      title: 'Content Updates',
      items: [
        { id: 'new-episodes', label: 'New Episodes', description: 'When channels you follow upload new content' },
        { id: 'recommendations', label: 'Recommendations', description: 'Personalized content suggestions' },
        { id: 'trending', label: 'Trending Content', description: 'Popular episodes in your interests' }
      ]
    },
    {
      id: 'social',
      title: 'Social Interactions',
      items: [
        { id: 'mentions', label: 'Mentions', description: 'When someone mentions you in comments' },
        { id: 'replies', label: 'Replies', description: 'Replies to your comments' },
        { id: 'follows', label: 'New Followers', description: 'When someone follows you' }
      ]
    },
    {
      id: 'system',
      title: 'System Notifications',
      items: [
        { id: 'security', label: 'Security Alerts', description: 'Important security-related notifications' },
        { id: 'updates', label: 'Product Updates', description: 'New features and improvements' },
        { id: 'maintenance', label: 'Maintenance', description: 'Scheduled maintenance notifications' }
      ]
    }
  ];

  const handleSave = async () => {
    try {
      setIsLoading(true);
      await updateNotifications(localSettings);
      alert('Notification settings updated successfully!');
    } catch (error) {
      console.error('Error saving notification settings:', error);
      alert('Error updating notification settings. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleContentToggle = (key: string, value: boolean) => {
    setLocalSettings(prev => ({
      ...prev,
      content: {
        ...prev.content,
        [key]: value
      }
    }));
  };

  const handleSocialToggle = (key: string, value: boolean) => {
    setLocalSettings(prev => ({
      ...prev,
      social: {
        ...prev.social,
        [key]: value
      }
    }));
  };

  const handleSystemToggle = (key: string, value: boolean) => {
    setLocalSettings(prev => ({
      ...prev,
      system: {
        ...prev.system,
        [key]: value
      }
    }));
  };

  const handleEmailFrequencyChange = (value: string) => {
    setLocalSettings(prev => ({
      ...prev,
      system: {
        ...prev.system,
        emailFrequency: value
      }
    }));
  };

  const handleQuietHoursChange = (key: string, value: string | boolean) => {
    setLocalSettings(prev => ({
      ...prev,
      quietHours: {
        ...prev.quietHours,
        [key]: value
      }
    }));
  };

  return (
    <div className="max-w-4xl">
      <SettingsHeader
        icon={<Bell className="w-6 h-6 text-[#ff3366]" />}
        title="Notification Settings"
        description="Configure how and when you want to be notified"
      />
      
      <div className="space-y-6">
        {/* Notification Channels */}
        <Card className={`${
          theme === 'dark' 
            ? 'bg-gray-800/50 border-gray-700/50' 
            : 'bg-white border-gray-200'
        } border`}>
          <CardBody className="p-6">
            <h3 className={`text-lg font-semibold mb-6 ${
              theme === 'dark' ? 'text-white' : 'text-gray-900'
            }`}>Notification Channels</h3>
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-primary/10 rounded-lg">
                    <Mail className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <p className={`font-medium ${
                      theme === 'dark' ? 'text-white' : 'text-gray-900'
                    }`}>Email Notifications</p>
                    <p className={theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}>
                      Receive updates in your inbox
                    </p>
                  </div>
                </div>
                <Select
                  selectedKeys={[localSettings.system.emailFrequency]}
                  onChange={(e) => handleEmailFrequencyChange(e.target.value)}
                  className="max-w-xs"
                  size="sm"
                >
                  {emailFrequencies.map((freq) => (
                    <SelectItem key={freq.value} value={freq.value}>
                      {freq.label}
                    </SelectItem>
                  ))}
                </Select>
              </div>

              <Divider className={theme === 'dark' ? 'bg-gray-700' : 'bg-gray-200'} />

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-primary/10 rounded-lg">
                    <Globe className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <p className={`font-medium ${
                      theme === 'dark' ? 'text-white' : 'text-gray-900'
                    }`}>Browser Notifications</p>
                    <p className={theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}>
                      Get notified in your browser
                    </p>
                  </div>
                </div>
                <Switch
                  isSelected={localSettings.browser}
                  onValueChange={(value) => setLocalSettings(prev => ({ ...prev, browser: value }))}
                  color="success"
                />
              </div>

              <Divider className={theme === 'dark' ? 'bg-gray-700' : 'bg-gray-200'} />

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-primary/10 rounded-lg">
                    <Smartphone className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <p className={`font-medium ${
                      theme === 'dark' ? 'text-white' : 'text-gray-900'
                    }`}>Mobile Push Notifications</p>
                    <p className={theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}>
                      Stay updated on your mobile device
                    </p>
                  </div>
                </div>
                <Switch
                  isSelected={localSettings.system.mobile}
                  onValueChange={(value) => setLocalSettings(prev => ({
                    ...prev,
                    system: { ...prev.system, mobile: value }
                  }))}
                  color="success"
                />
              </div>

              <Divider className={theme === 'dark' ? 'bg-gray-700' : 'bg-gray-200'} />

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-primary/10 rounded-lg">
                    <Volume2 className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <p className={`font-medium ${
                      theme === 'dark' ? 'text-white' : 'text-gray-900'
                    }`}>Sound Notifications</p>
                    <p className={theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}>
                      Play sound for important alerts
                    </p>
                  </div>
                </div>
                <Switch
                  isSelected={localSettings.system.quietHours.sound}
                  onValueChange={(value) => setLocalSettings(prev => ({
                    ...prev,
                    system: {
                      ...prev.system,
                      quietHours: { ...prev.system.quietHours, sound: value }
                    }
                  }))}
                  color="success"
                />
              </div>
            </div>
          </CardBody>
        </Card>

        {/* Notification Types */}
        {notificationTypes.map((section) => (
          <Card key={section.id} className={`${
            theme === 'dark' 
              ? 'bg-gray-800/50 border-gray-700/50' 
              : 'bg-white border-gray-200'
          } border`}>
            <CardBody className="p-6">
              <h3 className={`text-lg font-semibold mb-6 ${
                theme === 'dark' ? 'text-white' : 'text-gray-900'
              }`}>{section.title}</h3>
              <div className="space-y-6">
                {section.items.map((item, index) => (
                  <React.Fragment key={item.id}>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className={`font-medium ${
                          theme === 'dark' ? 'text-white' : 'text-gray-900'
                        }`}>{item.label}</p>
                        <p className={theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}>
                          {item.description}
                        </p>
                      </div>
                      <Switch
                        isSelected={localSettings.content[item.id as keyof typeof localSettings.content]}
                        onValueChange={(value) => setLocalSettings(prev => ({
                          ...prev,
                          content: { ...prev.content, [item.id]: value }
                        }))}
                        color="success"
                      />
                    </div>
                    {index < section.items.length - 1 && (
                      <Divider className={theme === 'dark' ? 'bg-gray-700' : 'bg-gray-200'} />
                    )}
                  </React.Fragment>
                ))}
              </div>
            </CardBody>
          </Card>
        ))}

        {/* Quiet Hours */}
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
                }`}>Quiet Hours</h3>
                <p className={theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}>
                  Pause notifications during specific times
                </p>
              </div>
              <Switch
                isSelected={localSettings.system.quietHours.enabled}
                onValueChange={(value) => handleQuietHoursChange('enabled', value)}
                color="success"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className={`block text-sm mb-2 ${
                  theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                }`}>Start Time</label>
                <input
                  type="time"
                  value={localSettings.system.quietHours.start}
                  onChange={(e) => handleQuietHoursChange('start', e.target.value)}
                  className={`w-full px-4 py-2 rounded-lg focus:ring-1 focus:ring-primary outline-none ${
                    theme === 'dark'
                      ? 'bg-gray-700/50 border-gray-600 text-white'
                      : 'bg-gray-100 border-gray-300 text-gray-900'
                  } border`}
                />
              </div>
              <div>
                <label className={`block text-sm mb-2 ${
                  theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                }`}>End Time</label>
                <input
                  type="time"
                  value={localSettings.system.quietHours.end}
                  onChange={(e) => handleQuietHoursChange('end', e.target.value)}
                  className={`w-full px-4 py-2 rounded-lg focus:ring-1 focus:ring-primary outline-none ${
                    theme === 'dark'
                      ? 'bg-gray-700/50 border-gray-600 text-white'
                      : 'bg-gray-100 border-gray-300 text-gray-900'
                  } border`}
                />
              </div>
            </div>
          </CardBody>
        </Card>

        <div className="flex justify-end gap-3">
          <Button 
            color="danger" 
            variant="flat"
            onClick={() => setLocalSettings(defaultSettings)}
          >
            Reset to Default
          </Button>
          <Button 
            color="primary"
            onClick={handleSave}
            isLoading={isLoading}
          >
            Save Changes
          </Button>
        </div>
      </div>
    </div>
  );
};

export default NotificationSettings;