import React, { useState, useEffect } from 'react';
import { Palette, Sun, Moon, Check } from 'lucide-react';
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

  const themes = [
    {
      name: 'Dark Theme',
      value: 'dark',
      description: 'Easier on the eyes in low-light environments',
      preview: 'bg-gray-900',
      accent: 'bg-primary',
      icon: <Moon className="w-5 h-5" />
    },
    {
      name: 'Light Theme',
      value: 'light',
      description: 'Perfect for bright environments',
      preview: 'bg-white',
      accent: 'bg-blue-500',
      icon: <Sun className="w-5 h-5" />
    }
  ];

  const colors = [
    '#ff3366',
    '#2eff94',
    '#147dff',
    '#9333ea',
    '#f97316',
    '#06b6d4',
    '#14b8a6',
    '#8b5cf6'
  ];

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

  return (
    <div className="max-w-4xl">
      <SettingsHeader
        icon={<Palette className="w-6 h-6 text-[#ff3366]" />}
        title="Appearance"
        description="Customize your dashboard appearance"
      />
      
      <div className="space-y-6">
        <Card className={`${
          theme === 'dark' 
            ? 'bg-gray-800/50 border-gray-700/50 backdrop-blur-sm' 
            : 'bg-white/80 border-gray-200 backdrop-blur-sm'
        } border`}>
          <CardBody className="p-6">
            <h3 className={`text-lg font-semibold mb-6 ${
              theme === 'dark' ? 'text-white' : 'text-gray-900'
            }`}>Theme Selection</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {themes.map((themeOption) => (
                <button
                  key={themeOption.name}
                  onClick={() => setSelectedTheme(themeOption.value)}
                  className="text-left w-full"
                >
                  <div
                    className={`relative flex flex-col gap-4 p-6 rounded-xl border-2 transition-all duration-300 ${
                      theme === 'dark' 
                        ? 'bg-gray-700/30 hover:bg-gray-700/50 border-gray-700/50' 
                        : 'bg-gray-50 hover:bg-gray-100 border-gray-200'
                    } ${
                      selectedTheme === themeOption.value
                        ? 'border-primary ring-2 ring-primary/20'
                        : 'hover:border-primary'
                    } cursor-pointer group`}
                  >
                    <div className="absolute top-4 right-4">
                      <div className={`w-4 h-4 rounded-full border-2 transition-colors ${
                        selectedTheme === themeOption.value
                          ? 'border-primary bg-primary'
                          : theme === 'dark' ? 'border-gray-600' : 'border-gray-300'
                      }`} />
                    </div>
                    <div className="flex items-center gap-3">
                      <div className={`p-2 rounded-lg ${
                        theme === 'dark' ? 'bg-gray-600/50' : 'bg-gray-200/50'
                      } group-hover:bg-primary/20 transition-colors`}>
                        {themeOption.icon}
                      </div>
                      <div className="flex items-center gap-2">
                        <p className={`font-medium ${
                          theme === 'dark' ? 'text-white' : 'text-gray-900'
                        }`}>{themeOption.name}</p>
                      </div>
                    </div>
                    <div>
                      <div className={`w-full h-32 rounded-xl ${themeOption.preview} relative overflow-hidden shadow-lg transition-transform group-hover:scale-[1.02]`}>
                        <div className={`absolute bottom-0 left-0 right-0 h-1.5 ${themeOption.accent}`} />
                      </div>
                      <p className={`text-sm mt-2 ${
                        theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                      }`}>{themeOption.description}</p>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </CardBody>
        </Card>

        <Card className={`${
          theme === 'dark' 
            ? 'bg-gray-800/50 border-gray-700/50 backdrop-blur-sm' 
            : 'bg-white/80 border-gray-200 backdrop-blur-sm'
        } border`}>
          <CardBody className="p-6">
            <h3 className={`text-lg font-semibold mb-6 ${
              theme === 'dark' ? 'text-white' : 'text-gray-900'
            }`}>Color Schemes</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {colors.map((color) => (
                <button
                  key={color}
                  className={`group relative aspect-square rounded-lg overflow-hidden ${
                    color === selectedColor ? 'ring-2 ring-offset-2 ring-primary' : ''
                  }`}
                  onClick={() => setSelectedColor(color)}
                  style={{ backgroundColor: color }}
                >
                  <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity" />
                  {color === selectedColor && (
                    <Check className="absolute inset-0 m-auto text-white w-6 h-6" />
                  )}
                </button>
              ))}
            </div>
          </CardBody>
        </Card>

        <div className="flex justify-end">
          <Button 
            className="bg-primary text-white font-medium hover:bg-primary/90 px-8"
            size="lg"
            onClick={handleSaveChanges}
            isLoading={isSaving}
            startContent={<Check className="w-4 h-4" />}
          >
            Save Changes
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AppearanceSettings;