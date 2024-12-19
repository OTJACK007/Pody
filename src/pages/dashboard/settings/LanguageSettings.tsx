import React, { useState, useEffect } from 'react';
import { Globe } from 'lucide-react';
import { Card, CardBody, RadioGroup, Radio } from "@nextui-org/react";
import { useTheme } from '../../../contexts/ThemeContext';
import { useAuth } from '../../../contexts/AuthContext';
import { useSettings } from '../../../contexts/SettingsContext';
import SettingsHeader from '../../../components/dashboard/SettingsHeader';
import { getLanguageSettings, updateLanguageSettings } from '../../../services/settings/languageService';
import type { LanguageSettings as LanguageSettingsType } from '../../../types/settings';

const LanguageSettings = () => {
  const { theme } = useTheme();
  const { currentUser } = useAuth();
  const { language, updateLanguage } = useSettings();
  const [isLoading, setIsLoading] = useState(false);
  const [settings, setSettings] = useState<LanguageSettingsType>({
    language: 'en',
    region: 'US',
    timeZone: 'auto',
    dateFormat: 'MM/DD/YYYY'
  });

  useEffect(() => {
    const loadSettings = async () => {
      if (currentUser?.id) {
        const data = await getLanguageSettings(currentUser.id);
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
      await updateLanguageSettings(currentUser.id, settings);
      await updateLanguage(settings);
    } catch (error) {
      console.error('Error saving settings:', error);
    } finally {
      setIsLoading(false);
    }
  };

  // ... reste du composant ...
};

export default LanguageSettings;