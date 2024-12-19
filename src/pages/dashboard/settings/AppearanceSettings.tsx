import React, { useState, useEffect } from 'react';
import { Palette, Sun, Moon } from 'lucide-react';
import { Card, CardBody, Button } from "@nextui-org/react";
import { useTheme } from '../../../contexts/ThemeContext';
import { useSettings } from '../../../contexts/SettingsContext';
import SettingsHeader from '../../../components/dashboard/SettingsHeader';

const AppearanceSettings = () => {
  const { theme, toggleTheme } = useTheme();
  const { appearance, updateAppearance, isLoading } = useSettings();
  const [selectedTheme, setSelectedTheme] = useState(theme);
  const [selectedColor, setSelectedColor] = useState(appearance?.colorScheme || '#ff3366');
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    if (appearance) {
      setSelectedTheme(appearance.theme);
      setSelectedColor(appearance.colorScheme);
    }
  }, [appearance]);

  const handleSaveChanges = async () => {
    try {
      setIsSaving(true);
      await updateAppearance({
        theme: selectedTheme as 'dark' | 'light',
        colorScheme: selectedColor
      });
      
      if (selectedTheme !== theme) {
        toggleTheme();
      }
    } catch (error) {
      console.error('Error saving appearance settings:', error);
    } finally {
      setIsSaving(false);
    }
  };

  // ... reste du code du composant ...
};

export default AppearanceSettings;