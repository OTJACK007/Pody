import React from 'react';
import { Card, CardBody, Button } from "@nextui-org/react";
import { ExternalLink } from 'lucide-react';
import { useTheme } from '../../../../contexts/ThemeContext';

const GuestSocials = () => {
  const { theme } = useTheme();

  const socials = [
    {
      platform: 'X/Twitter',
      handle: '@elonmusk',
      followers: '128.5M',
      icon: 'https://static.wixstatic.com/media/c67dd6_a7b28b585b034f56ad6ab32232e745fc~mv2.webp'
    },
    {
      platform: 'LinkedIn',
      handle: 'elonmusk',
      followers: '4.2M',
      icon: 'https://static.wixstatic.com/media/c67dd6_bb44a9fdef4e4fabbbbbad4f88a24540~mv2.webp'
    },
    {
      platform: 'Instagram',
      handle: '@elonmusk',
      followers: '2.8M',
      icon: 'https://static.wixstatic.com/media/c67dd6_b9fe6adb4004453a9db57fe97cd4d6aa~mv2.png'
    }
  ];

  return (
    <div>
      <h2 className={`text-2xl font-bold mb-6 ${
        theme === 'dark' ? 'text-white' : 'text-gray-900'
      }`}>Social Media</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {socials.map((social) => (
          <Card key={social.platform} className={`${
            theme === 'dark'
              ? 'bg-gray-800/50 border-gray-700/50'
              : 'bg-white border-gray-200'
          } border`}>
            <CardBody className="p-6">
              <div className="flex items-center gap-4 mb-4">
                <img 
                  src={social.icon} 
                  alt={social.platform}
                  className="w-8 h-8"
                />
                <div>
                  <h3 className={theme === 'dark' ? 'text-white' : 'text-gray-900'}>
                    {social.platform}
                  </h3>
                  <p className={theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}>
                    {social.handle}
                  </p>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span className={theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}>
                  {social.followers} followers
                </span>
                <Button
                  isIconOnly
                  variant="light"
                  className={theme === 'dark' ? 'text-gray-400 hover:text-white' : 'text-gray-600 hover:text-black'}
                >
                  <ExternalLink className="w-4 h-4" />
                </Button>
              </div>
            </CardBody>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default GuestSocials;