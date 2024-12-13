import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardBody, Button, Badge } from "@nextui-org/react";
import { Crown, TrendingUp, Youtube, Upload, Wand2, Subtitles, VideoIcon, Megaphone, Rocket, DollarSign, Wallet, CreditCard, Settings } from 'lucide-react';
import { useTheme } from '../../contexts/ThemeContext';
import CreatorStats from './creatorSpace/components/CreatorStats';
import PublishPodcastModal from './creatorSpace/components/PublishPodcastModal';
import CreatorToolCard from './creatorSpace/components/CreatorToolCard';

const CreatorSpace = () => {
  const navigate = useNavigate();
  const [showPublishPodcast, setShowPublishPodcast] = useState(false);
  const { theme } = useTheme();

  const monetizationActive = true; // This would come from your actual data

  const stats = {
    totalEarnings: '$2.8K',
    thisMonth: '$850',
    pendingPayout: '$450',
    nextPayout: '2024-04-01'
  };

  const creatorTools = [
    {
      title: 'Thumbnail Factory',
      description: 'Create stunning thumbnails in seconds',
      icon: <img src="https://static.wixstatic.com/media/c67dd6_dc1b943932434625bf0fecc47a839bcb~mv2.png" alt="Thumbnail Factory" className="w-6 h-6" />,
      color: 'bg-red-500/10'
    },
    {
      title: 'Pody AI',
      description: 'Auto-generate and edit video subtitles',
      icon: <img src="https://static.wixstatic.com/media/c67dd6_b0f1e912c94d4cebbb12ba52362e1755~mv2.gif" alt="Pody" className="w-6 h-6" />,
      color: 'bg-blue-500/10'
    },
    {
      title: 'ShortStorm',
      description: 'Convert videos into engaging shorts',
      icon: <img src="https://static.wixstatic.com/media/c67dd6_4bfeb28dfbb84aa8b0685bb79c7ab934~mv2.png" alt="ShortStorm" className="w-6 h-6" />,
      color: 'bg-purple-500/10'
    },
    {
      title: 'Pody Ad',
      description: 'Promote your content on our platform',
      icon: <img src="https://static.wixstatic.com/media/c67dd6_b0f1e912c94d4cebbb12ba52362e1755~mv2.gif" alt="Pody" className="w-6 h-6" />,
      color: 'bg-primary/10'
    },
    {
      title: 'Shogun 360',
      description: '360° Marketing Content Generator',
      icon: <img src="https://static.wixstatic.com/media/c67dd6_13666aed622048b3b2f3a929081c486f~mv2.png" alt="Shogun 360" className="w-6 h-6" />,
      color: 'bg-secondary/10'
    },
    {
      title: 'Shogun 360',
      description: 'Generate Marketing Videos',
      icon: <img src="https://static.wixstatic.com/media/c67dd6_13666aed622048b3b2f3a929081c486f~mv2.png" alt="Shogun 360" className="w-6 h-6" />,
      color: 'bg-blue-500/10'
    }
  ];

  return (
    <div className="space-y-8">
      {/* Hero Section */}
      <div className="relative -mx-6 -mt-6">
        <div className={`mx-6 rounded-2xl overflow-hidden ${
          theme === 'dark' ? 'bg-gray-800/30' : 'bg-white/30'
        } backdrop-blur-[2px]`}>
          <div className="relative px-8 pt-20 pb-12">
            <div className="absolute inset-0 bg-[url('https://static.wixstatic.com/media/c67dd6_0fdcac507fc1464c925b8d3d50ef0cb0~mv2.jpg')] bg-cover bg-center opacity-20" />
            <div className={`absolute inset-0 ${
              theme === 'dark'
                ? 'bg-gradient-to-r from-primary/10 via-secondary/10 to-primary/10'
                : 'bg-gradient-to-r from-primary/5 via-secondary/5 to-primary/5'
            }`} />
            <div className="relative flex items-center justify-between">
              <div className="max-w-2xl">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-3 rounded-xl bg-secondary/10">
                    <Crown className="w-8 h-8 text-secondary animate-pulse" />
                  </div>
                  <div>
                    <h1 className={`text-4xl font-bold ${
                      theme === 'dark' ? 'text-white' : 'text-gray-900'
                    }`}>Creator Space</h1>
                    <div className="flex items-center gap-3 mt-2">
                      <div className={`flex items-center gap-2 px-3 py-1.5 rounded-full ${
                        monetizationActive 
                          ? theme === 'dark' ? 'bg-green-500/10 text-green-500' : 'bg-green-600/20 text-green-700'
                          : 'bg-red-500/10 text-red-500'
                      }`}>
                        {monetizationActive ? (
                          <DollarSign className="w-4 h-4 animate-bounce" />
                        ) : (
                          <span className="w-2 h-2 rounded-full bg-red-500" />
                        )}
                        <span className="text-sm font-medium">
                          Monetization {monetizationActive ? 'Active' : 'Inactive'}
                        </span>
                      </div>
                      <Button
                        size="sm"
                        startContent={<Settings className="w-4 h-4" />}
                        className={`${
                          theme === 'dark'
                            ? 'bg-secondary/20 text-secondary border border-secondary hover:bg-secondary/30'
                            : 'bg-secondary/30 text-secondary-700 border border-secondary-600 hover:bg-secondary/40'
                        } transition-colors`}
                        onClick={() => navigate('/dashboard/creator-space/manage-channel', { state: { activeTab: 'monetization' } })}
                      >
                        Manage Monetization
                      </Button>
                    </div>
                  </div>
                </div>
                <p className={`text-lg mb-6 ${
                  theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
                }`}>
                  Transform your content creation journey with powerful tools and insights
                </p>
                <Button
                  size="lg"
                  className={`${
                    theme === 'dark'
                      ? 'bg-gradient-to-r from-secondary to-primary text-black'
                      : 'bg-gradient-to-r from-secondary/90 to-primary/90 text-white'
                  } font-medium shadow-lg hover:opacity-90 transition-opacity`}
                  startContent={<Crown className="w-5 h-5" />}
                >
                  Become a Creator
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Revenue Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className={`${
          theme === 'dark' 
            ? 'bg-gray-800/50 border-gray-700/50' 
            : 'bg-white border-gray-200'
        } border`}>
          <CardBody className="p-4">
            <div className="flex items-center justify-between mb-3">
              <div className="p-2 bg-primary/10 rounded-lg">
                <DollarSign className="w-5 h-5 text-primary" />
              </div>
              <span className={`text-2xl font-bold ${
                theme === 'dark' ? 'text-white' : 'text-gray-900'
              }`}>{stats.totalEarnings}</span>
            </div>
            <p className={theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}>
              Total Earnings
            </p>
          </CardBody>
        </Card>

        <Card className={`${
          theme === 'dark' 
            ? 'bg-gray-800/50 border-gray-700/50' 
            : 'bg-white border-gray-200'
        } border`}>
          <CardBody className="p-4">
            <div className="flex items-center justify-between mb-3">
              <div className="p-2 bg-green-500/10 rounded-lg">
                <DollarSign className="w-5 h-5 text-green-500" />
              </div>
              <span className={`text-2xl font-bold ${
                theme === 'dark' ? 'text-white' : 'text-gray-900'
              }`}>{stats.thisMonth}</span>
            </div>
            <p className={theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}>
              This Month
            </p>
          </CardBody>
        </Card>

        <Card className={`${
          theme === 'dark' 
            ? 'bg-gray-800/50 border-gray-700/50' 
            : 'bg-white border-gray-200'
        } border`}>
          <CardBody className="p-4">
            <div className="flex items-center justify-between mb-3">
              <div className="p-2 bg-yellow-500/10 rounded-lg">
                <Wallet className="w-5 h-5 text-yellow-500" />
              </div>
              <span className={`text-2xl font-bold ${
                theme === 'dark' ? 'text-white' : 'text-gray-900'
              }`}>{stats.pendingPayout}</span>
            </div>
            <p className={theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}>
              Pending Payout
            </p>
          </CardBody>
        </Card>

        <Card className={`${
          theme === 'dark' 
            ? 'bg-gray-800/50 border-gray-700/50' 
            : 'bg-white border-gray-200'
        } border`}>
          <CardBody className="p-4">
            <div className="flex items-center justify-between mb-3">
              <div className="p-2 bg-blue-500/10 rounded-lg">
                <CreditCard className="w-5 h-5 text-blue-500" />
              </div>
              <span className={`text-sm font-medium ${
                theme === 'dark' ? 'text-white' : 'text-gray-900'
              }`}>{stats.nextPayout}</span>
            </div>
            <p className={theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}>
              Next Payout Date
            </p>
          </CardBody>
        </Card>
      </div>

      {/* Stats Section */}
      <CreatorStats />

      {/* Main Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2 space-y-6">
          {/* Quick Actions */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Card 
              isPressable
              className={`group ${
                theme === 'dark'
                  ? 'bg-gray-800/50 border-gray-700/50 hover:bg-gray-800'
                  : 'bg-white border-gray-200 hover:bg-gray-50'
              } border transition-all duration-300`}
              onClick={() => navigate('/dashboard/creator-space/manage-channel')}
            >
              <CardBody className="p-6">
                <div className="flex flex-col items-center text-center gap-4">
                  <div className="p-4 rounded-full bg-primary/10 group-hover:scale-110 transition-transform">
                    <TrendingUp className="w-8 h-8 text-primary" />
                  </div>
                  <div>
                    <h3 className={`text-xl font-semibold mb-1 ${
                      theme === 'dark' ? 'text-white' : 'text-gray-900'
                    }`}>Manage Channel</h3>
                    <p className={`${
                      theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                    }`}>Update profile and settings</p>
                  </div>
                </div>
              </CardBody>
            </Card>

            <Card 
              isPressable
              className={`group ${
                theme === 'dark'
                  ? 'bg-gray-800/50 border-gray-700/50 hover:bg-gray-800'
                  : 'bg-white border-gray-200 hover:bg-gray-50'
              } border transition-all duration-300`}
              onClick={() => setShowPublishPodcast(true)}
            >
              <CardBody className="p-6">
                <div className="flex flex-col items-center text-center gap-4">
                  <div className="p-4 rounded-full bg-secondary/10 group-hover:scale-110 transition-transform">
                    <Upload className="w-8 h-8 text-secondary" />
                  </div>
                  <div>
                    <h3 className={`text-xl font-semibold mb-1 ${
                      theme === 'dark' ? 'text-white' : 'text-gray-900'
                    }`}>Publish Podcast</h3>
                    <p className={`${
                      theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                    }`}>Share your content</p>
                  </div>
                </div>
              </CardBody>
            </Card>
          </div>

          {/* Creator Tools */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {creatorTools.map((tool, index) => (
              <CreatorToolCard key={index} {...tool} />
            ))}
          </div>
        </div>

        {/* Placemento Card */}
        <Card className={`${
          theme === 'dark'
            ? 'bg-gray-800/50 border-gray-700/50'
            : 'bg-white border-gray-200'
        } border h-[500px] group`}>
          <CardBody className="p-0 relative overflow-hidden">
            <img
              src="https://static.wixstatic.com/media/c67dd6_8da1dbc20bb84fa49d4cbf61682893a1~mv2.gif"
              alt="IShowSpeed"
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />
            <div className="absolute bottom-12 left-0 right-0 p-6 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
              <img
                src="https://static.wixstatic.com/media/c67dd6_13666aed622048b3b2f3a929081c486f~mv2.png"
                alt="Shogun360 Logo"
                className="w-24 h-24 object-contain mb-4 mx-auto"
              />
              <h3 className="text-2xl font-bold text-white text-center mb-2">
                Find Brand Deals with <img 
                  src="https://static.wixstatic.com/media/c67dd6_cf685e278f2c44cba6aab77903f78ecf~mv2.gif"
                  alt="360DEALS"
                  className="inline-block h-12 align-middle"
                />
              </h3>
              <p className="text-gray-300 text-center mb-4">
                Connect with brands and monetize your content
              </p>
              <Button
                className="w-full bg-white/10 backdrop-blur-sm text-white border border-white/20 hover:bg-white/20"
                endContent={<TrendingUp className="w-4 h-4" />}
              >
                Open 360DEALS
              </Button>
            </div>
          </CardBody>
        </Card>
      </div>

      <PublishPodcastModal
        isOpen={showPublishPodcast}
        onClose={() => setShowPublishPodcast(false)}
      />
    </div>
  );
};

export default CreatorSpace;