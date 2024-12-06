import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Share2, ExternalLink, CheckCircle2 } from 'lucide-react';
import { Card, CardBody, Button, Avatar } from "@nextui-org/react";
import { useTheme } from '../../contexts/ThemeContext';
import { useSocialAccounts } from '../../contexts/SocialAccountsContext';
import { SocialAccount } from '../../lib/firestore/collections/socialAccounts';

const SocialAccounts = () => {
  const navigate = useNavigate();
  const { theme } = useTheme();
  const { accounts, connectAccount, disconnectAccount, isLoading } = useSocialAccounts();

  const handleConnect = async (network: any) => {
    try {
      const account: SocialAccount = {
        id: Date.now().toString(),
        platform: network.name,
        username: `user_${Date.now()}`,
        profileUrl: `https://${network.name.toLowerCase()}.com/username`,
        followers: network.followers || '0',
        isConnected: true,
        lastSync: new Date(),
        accessToken: 'mock_token',
        refreshToken: 'mock_refresh_token',
        tokenExpiry: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
      };
      
      await connectAccount(account);
    } catch (error) {
      console.error('Error connecting account:', error);
    }
  };

  const handleDisconnect = async (platform: string) => {
    try {
      await disconnectAccount(platform);
    } catch (error) {
      console.error('Error disconnecting account:', error);
    }
  };

  const socialNetworks = [
    {
      id: 1,
      name: 'YouTube',
      icon: 'https://static.wixstatic.com/media/c67dd6_aea51bc85e594033b8a29040d67b1d15~mv2.png',
      description: 'Share your podcast content',
      color: 'bg-red-500/10 hover:bg-red-500/20',
      textColor: 'text-red-500'
    },
    {
      id: 2,
      name: 'X/Twitter',
      icon: 'https://static.wixstatic.com/media/c67dd6_a7b28b585b034f56ad6ab32232e745fc~mv2.webp',
      description: 'Engage with your audience',
      color: 'bg-blue-500/10 hover:bg-blue-500/20',
      textColor: 'text-blue-500'
    },
    {
      id: 3,
      name: 'TikTok',
      icon: 'https://static.wixstatic.com/media/c67dd6_b7587372515d41e38da514bcb9cb0214~mv2.webp',
      description: 'Share short-form clips',
      color: 'bg-pink-500/10 hover:bg-pink-500/20',
      textColor: 'text-pink-500'
    },
    {
      id: 4,
      name: 'Instagram',
      icon: 'https://static.wixstatic.com/media/c67dd6_b9fe6adb4004453a9db57fe97cd4d6aa~mv2.png',
      description: 'Share podcast highlights',
      color: 'bg-purple-500/10 hover:bg-purple-500/20',
      textColor: 'text-purple-500'
    },
    {
      id: 5,
      name: 'Spotify',
      icon: 'https://static.wixstatic.com/media/c67dd6_ec71f45884124292ab688e1089e48cb4~mv2.png',
      description: 'Distribute your podcasts',
      color: 'bg-green-500/10 hover:bg-green-500/20',
      textColor: 'text-green-500'
    },
    {
      id: 6,
      name: 'LinkedIn',
      icon: 'https://static.wixstatic.com/media/c67dd6_bb44a9fdef4e4fabbbbbad4f88a24540~mv2.webp',
      description: 'Share professional content',
      color: 'bg-blue-600/10 hover:bg-blue-600/20',
      textColor: 'text-blue-600'
    },
    {
      id: 7,
      name: 'Meta',
      icon: 'https://static.wixstatic.com/media/c67dd6_e11a6a0bb99345839dbdc7cf12357c0b~mv2.png',
      description: 'Connect with Meta platforms',
      color: 'bg-blue-500/10 hover:bg-blue-500/20',
      textColor: 'text-blue-500'
    },
    {
      id: 8,
      name: 'Telegram',
      icon: 'https://static.wixstatic.com/media/c67dd6_ac87e7d2fc8c434f8c087005f5b27964~mv2.png',
      description: 'Share updates via Telegram',
      color: 'bg-blue-400/10 hover:bg-blue-400/20',
      textColor: 'text-blue-400'
    },
    {
      id: 9,
      name: 'Substack',
      icon: 'https://static.wixstatic.com/media/c67dd6_2b19ac41ffd349f4aa25811bea0bbabc~mv2.png',
      description: 'Share your newsletter content',
      color: 'bg-orange-500/10 hover:bg-orange-500/20',
      textColor: 'text-orange-500'
    },
    {
      id: 10,
      name: 'OnlyFans',
      icon: 'https://static.wixstatic.com/media/c67dd6_da17ab64a7e542e18aef84cd3fcbc08e~mv2.png',
      description: 'Share exclusive content',
      color: 'bg-blue-400/10 hover:bg-blue-400/20',
      textColor: 'text-blue-400'
    },
    {
      id: 11,
      name: 'Skool',
      icon: 'https://static.wixstatic.com/media/c67dd6_183e7da825044704859844a354659a3e~mv2.png',
      description: 'Build your learning community',
      color: 'bg-pink-400/10 hover:bg-pink-400/20',
      textColor: 'text-pink-400'
    },
    {
      id: 12,
      name: 'Patreon',
      icon: 'https://static.wixstatic.com/media/c67dd6_1ea98dca9e6b42e5914438202de7b6bb~mv2.png',
      description: 'Monetize your content',
      color: 'bg-red-400/10 hover:bg-red-400/20',
      textColor: 'text-red-400'
    }
  ];

  return (
    <div className="space-y-8">
      <div className="flex items-center gap-3">
        <Share2 className="w-8 h-8 text-primary" />
        <div>
          <h1 className={`text-3xl font-bold ${
            theme === 'dark' ? 'text-white' : 'text-gray-900'
          }`}>Social Accounts</h1>
          <p className={theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}>
            Connect and manage your social media accounts
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {socialNetworks.map((network) => (
          <Card 
            key={network.id}
            className={`${
              theme === 'dark' 
                ? 'bg-gray-800/50 border-gray-700/50 hover:bg-gray-800' 
                : 'bg-white border-gray-200 hover:bg-gray-50'
            } border transition-all duration-300`}
          >
            <CardBody className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className={`p-3 rounded-xl ${network.color}`}>
                    <Avatar
                      src={network.icon}
                      className="w-8 h-8"
                    />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className={`text-lg font-semibold ${
                        theme === 'dark' ? 'text-white' : 'text-gray-900'
                      }`}>{network.name}</h3>
                    </div>
                  </div>
                </div>
              </div>

              <p className={`text-sm h-10 ${
                theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
              }`}>
                {network.description}
              </p>

              <Button
                className={`w-full ${
                  'bg-primary text-white hover:bg-primary/90'
                }`}
                endContent={<ExternalLink className="w-4 h-4" />}
                onClick={() => handleConnect(network)}
                isLoading={isLoading}
              >
                Connect Account
              </Button>
            </CardBody>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default SocialAccounts;