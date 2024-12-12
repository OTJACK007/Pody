import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardBody, Button, Avatar, Badge, Progress } from "@nextui-org/react";
import { DollarSign, Users, Star, TrendingUp, ExternalLink, Search, Filter, Crown, Rocket } from 'lucide-react';
import { useTheme } from '../../contexts/ThemeContext';
import BrandDealsFilterModal from './branddeals/components/BrandDealsFilterModal';

const BrandDeals = () => {
  const navigate = useNavigate();
  const { theme } = useTheme();
  const [selectedPlatform, setSelectedPlatform] = useState<string | null>(null);
  const [showFilterModal, setShowFilterModal] = useState(false);
  const [emblaRef] = useEmblaCarousel({
    align: 'start',
    containScroll: 'trimSnaps',
    dragFree: true,
  });
  const [fashionRef] = useEmblaCarousel({
    align: 'start',
    containScroll: 'trimSnaps',
    dragFree: true,
  });
  const [techRef] = useEmblaCarousel({
    align: 'start',
    containScroll: 'trimSnaps',
    dragFree: true,
  });

  const platforms = [
    { id: 'kick', name: 'KICK', icon: 'https://static.wixstatic.com/media/c67dd6_39dedfcfc65b4375a61bf0e763ac8447~mv2.png', minFollowers: '1K' },
    { id: 'twitch', name: 'Twitch', icon: 'https://static.wixstatic.com/media/c67dd6_089d6bbd564f44d283886219447b54da~mv2.png', minFollowers: '5K' },
    { id: 'tiktok', name: 'TikTok', icon: 'https://static.wixstatic.com/media/c67dd6_669a072e9da540e3aef4ab2262eb8693~mv2.png', minFollowers: '10K' },
    { id: 'instagram', name: 'Instagram', icon: 'https://static.wixstatic.com/media/c67dd6_b9fe6adb4004453a9db57fe97cd4d6aa~mv2.png', minFollowers: '15K' },
    { id: 'youtube', name: 'YouTube', icon: 'https://static.wixstatic.com/media/c67dd6_aea51bc85e594033b8a29040d67b1d15~mv2.png', minFollowers: '20K' }
  ];

  const topPayingCampaigns = [
    {
      id: 1,
      brand: 'Red Bull',
      logo: 'https://static.wixstatic.com/media/c67dd6_39d659c4a5b046a4aba2b1b500d4315f~mv2.png',
      background: 'https://static.wixstatic.com/media/c67dd6_750aa0cc590e4f47bfeb72cde1e7b1f0~mv2.png',
      title: 'Gaming Energy Campaign',
      description: "Join Red Bull's gaming creator program and energize your content",
      budget: '$5,000 - $15,000',
      platforms: ['youtube', 'twitch', 'kick'],
      requirements: '100K+ followers',
      match: 95,
      deadline: '5 days left',
      perks: ['Monthly Supply', 'Event Access', 'Gaming Setup']
    },
    {
      id: 2,
      brand: 'Dior',
      logo: 'https://static.wixstatic.com/media/c67dd6_7d270ef7acb643fdac186664398bdfd5~mv2.webp',
      background: 'https://static.wixstatic.com/media/c67dd6_0e51e4bd55e04752a9523978cb15309a~mv2.avif',
      title: 'Luxury Fashion Partnership',
      description: "Create premium fashion content with Dior's latest collection",
      budget: '$10,000 - $25,000',
      platforms: ['instagram', 'tiktok'],
      requirements: '250K+ followers',
      match: 88,
      deadline: '7 days left',
      perks: ['Designer Items', 'Fashion Shows', 'VIP Events']
    },
    {
      id: 3,
      brand: 'Nike',
      logo: 'https://static.wixstatic.com/media/c67dd6_93708bac3542414abc1430c9ef5ee8a4~mv2.jpg',
      background: 'https://static.wixstatic.com/media/c67dd6_8bcaf78799b946c2a28a2bc3c8851e04~mv2.jpg',
      title: 'Athlete Creator Program',
      description: "Share your athletic journey with Nike's latest gear",
      budget: '$8,000 - $20,000',
      platforms: ['youtube', 'instagram', 'tiktok'],
      requirements: '150K+ followers',
      match: 92,
      deadline: '3 days left',
      perks: ['Sports Gear', 'Training Sessions', 'Event Access']
    },
    {
      id: 4,
      brand: 'Adidas',
      logo: 'https://static.wixstatic.com/media/c67dd6_1ea98dca9e6b42e5914438202de7b6bb~mv2.png',
      background: 'https://images.unsplash.com/photo-1556906781-9a412961c28c?w=800',
      title: 'Sports Creator Program',
      description: "Join Adidas's creator network and showcase your athletic journey",
      budget: '$12,000 - $30,000',
      platforms: ['youtube', 'instagram'],
      requirements: '200K+ followers',
      match: 91,
      deadline: '6 days left',
      perks: ['Sports Gear', 'Event Access', 'Training Sessions']
    },
    {
      id: 5,
      brand: 'Puma',
      logo: 'https://static.wixstatic.com/media/c67dd6_7db17138923b4bcf92d85ed71f9f85ed~mv2.png',
      background: 'https://images.unsplash.com/photo-1539185441755-769473a23570?w=800',
      title: 'Urban Style Campaign',
      description: "Create authentic urban content with Puma's latest collection",
      budget: '$15,000 - $35,000',
      platforms: ['instagram', 'tiktok'],
      requirements: '300K+ followers',
      match: 89,
      deadline: '8 days left',
      perks: ['Clothing Line', 'Photo Shoots', 'VIP Events']
    },
  ];

  const fashionCampaigns = [
    {
      id: 6,
      brand: 'Gucci',
      logo: 'https://static.wixstatic.com/media/c67dd6_1244908d1b0545f6ac85b9f17e808a66~mv2.png',
      background: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=800',
      title: 'Luxury Lifestyle',
      description: 'Create premium content showcasing Gucci lifestyle',
      budget: '$20,000 - $50,000',
      platforms: ['instagram', 'youtube'],
      requirements: '500K+ followers',
      match: 87,
      deadline: '10 days left',
      perks: ['Designer Items', 'Fashion Shows', 'VIP Access']
    },
    // Add 4 more fashion campaigns...
  ];

  const techCampaigns = [
    {
      id: 11,
      brand: 'Apple',
      logo: 'https://static.wixstatic.com/media/c67dd6_db5e32cf31f84b6a901529f12f889b58~mv2.png',
      background: 'https://images.unsplash.com/photo-1531297484001-80022131f5a1?w=800',
      title: 'Tech Creator Program',
      description: 'Create innovative content with the latest Apple products',
      budget: '$25,000 - $60,000',
      platforms: ['youtube', 'instagram'],
      requirements: '1M+ followers',
      match: 94,
      deadline: '12 days left',
      perks: ['Latest Devices', 'WWDC Access', 'Studio Time']
    },
    // Add 4 more tech campaigns...
  ];
  const renderCampaignCarousel = (ref: any, campaigns: any[], title: string) => (
    <div className="space-y-4">
      <h2 className={`text-2xl font-bold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
        {title}
      </h2>
      <div className="overflow-hidden -mx-6" ref={ref}>
        <div className="flex gap-6 px-6">
          {campaigns.map((campaign) => (
            <div key={campaign.id} className="flex-none w-[400px]">
              {/* Existing campaign card code */}
              <Card
                className={`${
                  theme === 'dark'
                    ? 'bg-gray-800/50 border-gray-700/50'
                    : 'bg-white border-gray-200'
                } border group hover:border-primary transition-all duration-300 transform hover:scale-[1.02]`}
              >
                {/* ... rest of the campaign card code ... */}
              </Card>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  return (
    <div className="space-y-8">
      {/* Hero Section */}
      <div className="relative -mx-6 -mt-6 mb-8">
        <div className="relative h-[250px] overflow-hidden rounded-b-[2rem]">
          <div className="absolute inset-0">
            <img 
              src="https://static.wixstatic.com/media/c67dd6_b3c0575e13904dc69f03cacff0900964~mv2.gif"
              alt="IShowSpeed"
              className="w-full h-full object-cover scale-110 opacity-50"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background via-background/80 to-transparent" />
          </div>
          
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-6">
            <div className="flex flex-col items-center">
              <img 
                src="https://static.wixstatic.com/media/c67dd6_f09c1dca310946fe95656090ce05fd3e~mv2.gif"
                alt="360DEALS"
                className="h-24 object-contain mb-2"
              />
              <p className="text-2xl text-white/90 max-w-2xl mx-auto font-medium mb-4">
                Connect with premium brands and unlock exclusive partnership opportunities
              </p>
            
              <div className="flex items-center gap-4">
              <Button
                size="lg"
                className="bg-white text-black font-semibold hover:bg-white/90 px-8 shadow-xl"
                startContent={<Rocket className="w-5 h-5" />}
                onClick={() => navigate('/dashboard/creator-space')}
              >
                Creator Space
              </Button>
              <Button
                size="lg"
                className="bg-primary text-white font-semibold hover:bg-primary/90 px-8 shadow-xl"
                startContent={<Crown className="w-5 h-5" />}
              >
                Become Partner
              </Button>
            </div>
            </div>
          </div>
        </div>
      </div>

      {/* Platform Filter */}
      <div className="sticky top-[60px] py-4 z-20">
        <div className="flex items-center justify-between mb-6">
          <h2 className={`text-xl font-bold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
            Connect Your Platforms
          </h2>
          <div className="flex items-center gap-3">
            <Button
              startContent={<Search className="w-4 h-4" />}
              className="bg-primary text-white"
            >
              Search Deals
            </Button>
            <Button
              startContent={<Filter className="w-4 h-4" />}
              className={`${
                theme === 'dark'
                  ? 'bg-gray-800 text-white hover:bg-gray-700'
                  : 'bg-gray-100 text-gray-900 hover:bg-gray-200'
              }`}
              onClick={() => setShowFilterModal(true)}
            >
              Filters
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-5 gap-4">
          {platforms.map((platform) => (
            <Card
              key={platform.id}
              isPressable
              isHoverable
              onClick={() => setSelectedPlatform(platform.id === selectedPlatform ? null : platform.id)}
              className={`relative group transition-all duration-300 ${
                selectedPlatform === platform.id
                  ? 'ring-2 ring-primary'
                  : theme === 'dark' ? 'bg-gray-800/50' : 'bg-gray-100'
              }`}
            >
              <CardBody className="p-4">
                <div className="flex flex-col items-center gap-4">
                  <img 
                    src={platform.icon}
                    alt={platform.name}
                    className="w-10 h-10 object-contain"
                  />
                  <div className="w-full">
                    <div className="flex items-center justify-between mb-2">
                      <span className={`text-xs ${
                        theme === 'dark' ? 'text-white' : 'text-gray-900'
                      }`}>Followers</span>
                      <span className={`text-xs ${
                        theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                      }`}>{selectedPlatform === platform.id ? '125K' : platform.minFollowers}</span>
                    </div>
                    <div className={`w-full h-1.5 rounded-full ${
                      selectedPlatform === platform.id
                        ? 'bg-gradient-to-r from-primary to-secondary'
                        : theme === 'dark' ? 'bg-gray-700' : 'bg-gray-200'
                    }`}>
                      <div className={`h-full rounded-full transition-all duration-300 ${
                        selectedPlatform === platform.id
                          ? 'w-full bg-gradient-to-r from-primary to-secondary'
                          : 'w-0'
                      }`} />
                    </div>
                  </div>
                </div>
                <div className={`absolute inset-x-0 bottom-0 h-1 transition-transform duration-300 ${
                  selectedPlatform === platform.id
                    ? 'bg-primary scale-x-100'
                    : 'scale-x-0'
                }`} />
              </CardBody>
            </Card>
          ))}
        </div>
      </div>

          <Card
            key={campaign.id}
            className={`${
              theme === 'dark'
                ? 'bg-gray-800/50 border-gray-700/50'
                : 'bg-white border-gray-200'
            } border group hover:border-primary transition-all duration-300 transform hover:scale-[1.02]`}
          >
            <CardBody className="p-6">
              <div className="flex items-center gap-4 mb-4">
                <Avatar
                  src={campaign.logo}
                  className="w-12 h-12 rounded-lg"
                />
                <div>
                  <h3 className={`text-lg font-semibold ${
                    theme === 'dark' ? 'text-white' : 'text-gray-900'
                  }`}>{campaign.brand}</h3>
                </div>
              </div>

              <div className="relative h-40 rounded-lg overflow-hidden mb-4 group-hover:shadow-xl transition-shadow">
                <img
                  src={campaign.background}
                  alt={campaign.title}
                  className="absolute inset-0 w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black/50" />
                <div className="absolute inset-0 p-4">
                  <h4 className="text-xl font-bold text-white mb-2">{campaign.title}</h4>
                  <p className="text-sm text-white/80">{campaign.description}</p>
                  <div className="absolute top-4 right-4 flex items-center gap-2">
                    <span className="text-sm text-white/90">Match</span>
                    <span className="text-sm font-bold text-primary">{campaign.match}%</span>
                  </div>
                </div>
              </div>

              <div className="flex flex-wrap gap-2 mb-4">
                {campaign.platforms.map((platform) => {
                  const platformData = platforms.find(p => p.id === platform);
                  return platformData ? (
                    <div
                      key={platform}
                      className={`p-1.5 rounded-lg ${
                        theme === 'dark' ? 'bg-gray-700' : 'bg-gray-100'
                      }`}
                    >
                      <img 
                        src={platformData.icon}
                        alt={platformData.name}
                        className="w-4 h-4"
                      />
                    </div>
                  ) : null;
                })}
              </div>

              <div className="space-y-2 mb-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <DollarSign className="w-4 h-4 text-primary" />
                    <span className={`font-semibold ${
                      theme === 'dark' ? 'text-white' : 'text-gray-900'
                    }`}>
                      {campaign.budget}
                    </span>
                  </div>
                  <Badge color="warning" variant="flat">
                    {campaign.deadline}
                  </Badge>
                </div>
                <div className="flex items-center gap-2">
                  <Users className="w-4 h-4 text-primary" />
                  <span className={theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}>
                    {campaign.requirements}
                  </span>
                </div>
              </div>

              <div className="flex flex-wrap gap-2 mb-4">
                {campaign.perks.map((perk, index) => (
                  <Badge
                    key={index}
                    className="bg-primary/10 text-primary"
                  >
                    {perk}
                  </Badge>
                ))}
              </div>

              <Button
                className="w-full bg-primary text-white hover:bg-primary/90 transition-colors"
                endContent={<ExternalLink className="w-4 h-4" />}
              >
                Apply Now
              </Button>
            </CardBody>
      {/* Campaign Carousels */}
      {renderCampaignCarousel(emblaRef, topPayingCampaigns, "🔥 Highest Paying Deals")}
      {renderCampaignCarousel(fashionRef, fashionCampaigns, "👗 Fashion Brands")}
      {renderCampaignCarousel(techRef, techCampaigns, "💻 Tech Companies")}
      
      <BrandDealsFilterModal 
        isOpen={showFilterModal}
        onClose={() => setShowFilterModal(false)}
      />
    </div>
  );
};

export default BrandDeals;