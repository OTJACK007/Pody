import React from 'react';
import { Palette, Sun, Moon, Monitor } from 'lucide-react';
import { Card, CardBody, RadioGroup, Radio, Button } from "@nextui-org/react";
import SettingsHeader from '../../../components/dashboard/SettingsHeader';

const AppearanceSettings = () => {
  const themes = [
    {
      name: 'Dark Theme',
      description: 'Perfect for low-light environments',
      preview: 'bg-gray-900',
      accent: 'bg-primary'
    },
    {
      name: 'Light Theme',
      description: 'Classic light mode experience',
      preview: 'bg-white',
      accent: 'bg-blue-500'
    },
    {
      name: 'System Theme',
      description: 'Follows your system preferences',
      preview: 'bg-gradient-to-r from-gray-900 to-white',
      accent: 'bg-purple-500'
    }
  ];

  return (
    <div className="max-w-4xl">
      <SettingsHeader
        icon={<Palette className="w-6 h-6 text-primary" />}
        title="Appearance"
        description="Customize your dashboard appearance"
      />
      
      <div className="space-y-6">
        <Card className="bg-gray-800/50 border border-gray-700/50">
          <CardBody className="p-6">
            <h3 className="text-lg font-semibold text-white mb-6">Theme Selection</h3>
            
            <RadioGroup defaultValue="dark">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {themes.map((theme) => (
                  <Radio
                    key={theme.name}
                    value={theme.name.toLowerCase()}
                    classNames={{
                      base: "max-w-full"
                    }}
                  >
                    <div className="flex flex-col gap-2 p-4 rounded-lg bg-gray-700/30 hover:bg-gray-700/50 transition-colors cursor-pointer">
                      <div className={`w-full h-24 rounded-lg ${theme.preview} relative overflow-hidden`}>
                        <div className={`absolute bottom-0 left-0 right-0 h-1 ${theme.accent}`} />
                      </div>
                      <div>
                        <p className="text-white font-medium">{theme.name}</p>
                        <p className="text-gray-400 text-sm">{theme.description}</p>
                      </div>
                    </div>
                  </Radio>
                ))}
              </div>
            </RadioGroup>
          </CardBody>
        </Card>

        <Card className="bg-gray-800/50 border border-gray-700/50">
          <CardBody className="p-6">
            <h3 className="text-lg font-semibold text-white mb-6">Color Schemes</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {['#ff3366', '#2eff94', '#147dff', '#9333ea', '#f97316', '#06b6d4', '#14b8a6', '#8b5cf6'].map((color) => (
                <button
                  key={color}
                  className="group relative aspect-square rounded-lg overflow-hidden"
                  style={{ backgroundColor: color }}
                >
                  <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity" />
                </button>
              ))}
            </div>
          </CardBody>
        </Card>

        <div className="flex justify-end">
          <Button color="primary" size="lg">
            Save Changes
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AppearanceSettings;