import React, { useState, useEffect } from 'react';
import { Shield, Lock, Smartphone, QrCode } from 'lucide-react';
import { Card, CardBody, Switch, Button } from "@nextui-org/react";
import { useTheme } from '../../../contexts/ThemeContext';
import { useAuth } from '../../../contexts/AuthContext';
import { useSettings } from '../../../contexts/SettingsContext';
import SettingsHeader from '../../../components/dashboard/SettingsHeader';
import { getPrivacySettings, updatePrivacySettings, updatePassword, setupTwoFactor } from '../../../services/settings/privacyService';
import type { PrivacySettings as PrivacySettingsType } from '../../../types/settings';

const PrivacySettings = () => {
  const { theme } = useTheme();
  const { currentUser } = useAuth();
  const { privacy, updatePrivacy } = useSettings();
  const [isLoading, setIsLoading] = useState(false);
  const [settings, setSettings] = useState<PrivacySettingsType>({
    password_authentication: {
      change_password: true,
      phone_number_authentication: {
        enabled: false,
        phone_number: '',
        verified: false
      },
      authenticator_app: {
        enabled: false,
        qr_code_url: '',
        last_used: new Date()
      }
    },
    privacy_settings: {
      show_profile: true,
      allow_listening_activity: false,
      share_library: true,
      allow_friend_requests: true
    },
    security_log: []
  });

  useEffect(() => {
    const loadSettings = async () => {
      if (currentUser?.id) {
        const data = await getPrivacySettings(currentUser.id);
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
      await updatePrivacySettings(currentUser.id, settings);
      await updatePrivacy(settings);
    } catch (error) {
      console.error('Error saving settings:', error);
    } finally {
      setIsLoading(false);
    }
  };

  // ... reste du composant ...
};

export default PrivacySettings;