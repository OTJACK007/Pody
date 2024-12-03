import React from 'react';
import { Globe, Search, Check } from 'lucide-react';
import { Card, CardBody, Input, Button, RadioGroup, Radio } from "@nextui-org/react";
import SettingsHeader from '../../../components/dashboard/SettingsHeader';

const LanguageSettings = () => {
  const languages = [
    { 
      code: 'en', 
      name: 'English', 
      region: 'United States',
      flag: 'https://static.wixstatic.com/media/c67dd6_a4882c1010344b30922c23e626baf714~mv2.png'
    },
    { 
      code: 'uk', 
      name: 'English', 
      region: 'United Kingdom',
      flag: 'https://static.wixstatic.com/media/c67dd6_2a4617a1f26249028eeb357ddcfbf2d0~mv2.png'
    },
    { 
      code: 'fr', 
      name: 'French', 
      region: 'France',
      flag: 'https://static.wixstatic.com/media/c67dd6_6d61dc59e47b47d89b4edfdf83cdb608~mv2.png'
    },
    { 
      code: 'es', 
      name: 'Spanish', 
      region: 'Spain',
      flag: 'https://static.wixstatic.com/media/c67dd6_f705d2b950704c50990390cd9e3dd732~mv2.png'
    },
    { 
      code: 'de', 
      name: 'German', 
      region: 'Germany',
      flag: 'https://static.wixstatic.com/media/c67dd6_c0cddb77907a4e6883e91c95f197d3fa~mv2.png'
    },
    { 
      code: 'ru', 
      name: 'Russian', 
      region: 'Russia',
      flag: 'https://static.wixstatic.com/media/c67dd6_62e9768157ae4abd8543922462ac6b1e~mv2.png'
    },
    { 
      code: 'ja', 
      name: 'Japanese', 
      region: 'Japan',
      flag: 'https://static.wixstatic.com/media/c67dd6_f7079d18b87042f8ad70a98d17b27ff3~mv2.png'
    },
    { 
      code: 'zh', 
      name: 'Chinese', 
      region: 'China',
      flag: 'https://static.wixstatic.com/media/c67dd6_40f8140eaf8441cd9d3aa19107ed1be4~mv2.png'
    },
    { 
      code: 'in', 
      name: 'Hindi', 
      region: 'India',
      flag: 'https://static.wixstatic.com/media/c67dd6_36192cdfdf5f4f0ca31b105cc21011c0~mv2.png'
    }
  ];

  const timeZones = [
    { id: 'auto', name: 'Auto-detect timezone', description: 'Based on your system settings' },
    { id: 'et', name: 'Eastern Time (ET)', description: 'UTC-05:00' },
    { id: 'pt', name: 'Pacific Time (PT)', description: 'UTC-08:00' },
    { id: 'gmt', name: 'Greenwich Mean Time (GMT)', description: 'UTC+00:00' },
    { id: 'cet', name: 'Central European Time (CET)', description: 'UTC+01:00' },
    { id: 'jst', name: 'Japan Standard Time (JST)', description: 'UTC+09:00' }
  ];

  const dateFormats = [
    { id: 'mdy', format: 'MM/DD/YYYY', example: '03/15/2024' },
    { id: 'dmy', format: 'DD/MM/YYYY', example: '15/03/2024' },
    { id: 'ymd', format: 'YYYY-MM-DD', example: '2024-03-15' }
  ];

  return (
    <div className="max-w-4xl">
      <SettingsHeader
        icon={<Globe className="w-6 h-6 text-primary" />}
        title="Language & Region"
        description="Set your preferred language and region settings"
      />
      
      <div className="space-y-6">
        {/* Language Selection */}
        <Card className="bg-gray-800/50 border border-gray-700/50">
          <CardBody className="p-6">
            <h3 className="text-lg font-semibold text-white mb-4">Language</h3>
            <div className="space-y-4">
              <Input
                placeholder="Search languages..."
                startContent={<Search className="w-4 h-4 text-gray-400" />}
                classNames={{
                  input: "bg-gray-700/50 text-white",
                  inputWrapper: "bg-gray-700/50 border-gray-600"
                }}
              />
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {languages.map((lang) => (
                  <button
                    key={lang.code}
                    className="flex items-center gap-3 p-3 rounded-lg bg-gray-700/30 hover:bg-gray-700/50 transition-colors text-left group"
                  >
                    <img 
                      src={lang.flag} 
                      alt={`${lang.region} flag`}
                      className="w-8 h-8 object-cover rounded-full"
                    />
                    <div className="flex-grow">
                      <p className="text-white font-medium">{lang.name}</p>
                      <p className="text-gray-400 text-sm">{lang.region}</p>
                    </div>
                    <Check className="w-4 h-4 text-primary opacity-0 group-hover:opacity-100 transition-opacity" />
                  </button>
                ))}
              </div>
            </div>
          </CardBody>
        </Card>

        {/* Time Zone */}
        <Card className="bg-gray-800/50 border border-gray-700/50">
          <CardBody className="p-6">
            <h3 className="text-lg font-semibold text-white mb-4">Time Zone</h3>
            <RadioGroup defaultValue="auto">
              <div className="space-y-3">
                {timeZones.map((tz) => (
                  <Radio
                    key={tz.id}
                    value={tz.id}
                    classNames={{
                      base: "max-w-full"
                    }}
                  >
                    <div className="flex flex-col">
                      <span className="text-white">{tz.name}</span>
                      <span className="text-gray-400 text-sm">{tz.description}</span>
                    </div>
                  </Radio>
                ))}
              </div>
            </RadioGroup>
          </CardBody>
        </Card>

        {/* Date Format */}
        <Card className="bg-gray-800/50 border border-gray-700/50">
          <CardBody className="p-6">
            <h3 className="text-lg font-semibold text-white mb-4">Date Format</h3>
            <RadioGroup defaultValue="mdy">
              <div className="space-y-3">
                {dateFormats.map((format) => (
                  <Radio
                    key={format.id}
                    value={format.id}
                    classNames={{
                      base: "max-w-full"
                    }}
                  >
                    <div className="flex flex-col">
                      <span className="text-white">{format.format}</span>
                      <span className="text-gray-400 text-sm">Example: {format.example}</span>
                    </div>
                  </Radio>
                ))}
              </div>
            </RadioGroup>
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

export default LanguageSettings;