import React, { useState, useEffect } from 'react';
import { Bell, Mail, Globe, MessageSquare } from 'lucide-react';
import { Card, CardBody, Switch, Select, SelectItem } from "@nextui-org/react";
import { useTheme } from '../../../contexts/ThemeContext';
import { useAuth } from '../../../contexts/AuthContext';
import { useSettings } from '../../../contexts/SettingsContext';
import SettingsHeader from '../../../components/dashboard/SettingsHeader';
import { getNotificationSettings, updateNotificationSettings } from '../../../services/settings/notificationService';
import type { NotificationSettings as NotificationSettingsType } from '../../../types/settings';

const NotificationSettings = () => {
  const { theme } = useTheme();
  const { currentUser } = useAuth();
  const { notifications, updateNotifications } = useSettings();
  const [isLoading, setIsLoading] = useState(false);
  const [settings, setSettings] = useState<NotificationSettingsType>({
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
    }
  });

  useEffect(() => {
    const loadSettings = async () => {
      if (currentUser?.id) {
        const data = await getNotificationSettings(currentUser.id);
        if (data) {
          setSettings(data);
        }
      }
    };
    loadSettings();
  }, [currentUser?.id]);

  const handleSave = async () => {
    if (!currentUser?.id) return;
    
    setIsLoading(true);
    try {
      await updateNotificationSettings(currentUser.id, settings);
      await updateNotifications(settings);
    } catch (error) {
      console.error('Error saving settings:', error);
    } finally {
      setIsLoading(false);
    }
  };

  // ... reste du composant ...
};

export default NotificationSettings;