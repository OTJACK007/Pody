import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Camera, Mail, Building, MapPin, Globe, DollarSign, CreditCard, Wallet, Crown, ListVideo } from 'lucide-react';
import { Button, Card, CardBody, Input, Avatar, Tabs, Tab, Progress } from "@nextui-org/react";
import { useTheme } from '../../../../contexts/ThemeContext';

const ManageChannel = () => {
  const navigate = useNavigate();
  const { theme } = useTheme();
  const [selectedTab, setSelectedTab] = useState('account');
  const [subscriptionPrice, setSubscriptionPrice] = useState('');

  const stats = {
    totalEarnings: '$2.8K',
    thisMonth: '$850',
    pendingPayout: '$450',
    nextPayout: '2024-04-01'
  };

  const paymentMethods = [
    {
      id: 1,
      type: 'stripe',
      name: 'Stripe',
      icon: 'https://static.wixstatic.com/media/c67dd6_7db17138923b4bcf92d85ed71f9f85ed~mv2.png',
      connected: true
    },
    {
      id: 2,
      type: 'paypal',
      name: 'PayPal',
      icon: 'https://static.wixstatic.com/media/c67dd6_ba6512237a194a9a9297eeeb9219122e~mv2.png',
      connected: false
    }
  ];

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      <div className="flex items-center gap-4">
        <Button
          isIconOnly
          variant="light"
          onClick={() => navigate('/dashboard/creator-space')}
          className={theme === 'dark' ? 'text-gray-400 hover:text-white' : 'text-gray-600 hover:text-black'}
        >
          <ArrowLeft className="w-6 h-6" />
        </Button>
        <div>
          <h1 className={`text-3xl font-bold ${
            theme === 'dark' ? 'text-white' : 'text-gray-900'
          }`}>Channel Settings</h1>
          <p className={theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}>
            Manage your channel profile and payment settings
          </p>
        </div>
      </div>

      {/* Video Management Card */}
      <Card className={`${
        theme === 'dark' 
          ? 'bg-gray-800/50 border-gray-700/50' 
          : 'bg-white border-gray-200'
      } border`}>
        <CardBody className="p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-primary/10 rounded-lg">
                <ListVideo className="w-5 h-5 text-primary" />
              </div>
              <div>
                <p className={`font-medium ${
                  theme === 'dark' ? 'text-white' : 'text-gray-900'
                }`}>Manage Videos</p>
                <p className={theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}>
                  Upload, edit and organize your videos
                </p>
              </div>
            </div>
            <Button
              className="bg-primary text-white hover:bg-primary/90"
              onClick={() => navigate('/dashboard/creator-space/manage-videos')}
            >
              Manage Videos
            </Button>
          </div>
        </CardBody>
      </Card>

      <Tabs 
        selectedKey={selectedTab}
        onSelectionChange={(key) => setSelectedTab(key.toString())}
        classNames={{
          tabList: `${theme === 'dark' ? 'bg-gray-800/50' : 'bg-gray-100'} p-1 rounded-lg`,
          cursor: `${theme === 'dark' ? 'bg-gray-700' : 'bg-white'}`,
          tab: `${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'} data-[selected=true]:${theme === 'dark' ? 'text-white' : 'text-gray-900'}`,
          tabContent: "group-data-[selected=true]:text-inherit"
        }}
      >
        <Tab key="account" title="Account Info" />
        <Tab key="revenue" title="Revenue Details" />
        <Tab key="monetization" title="Monetization" />
      </Tabs>

      {selectedTab === 'account' && (
        <div className="space-y-6">
          {/* Profile Banner & Avatar */}
          <Card className={`${
            theme === 'dark' 
              ? 'bg-gray-800/50 border-gray-700/50' 
              : 'bg-white border-gray-200'
          } border`}>
            <CardBody className="p-6">
              <div className="relative">
                <div className={`h-48 rounded-xl overflow-hidden ${
                  theme === 'dark' ? 'bg-gray-700' : 'bg-gray-100'
                }`}>
                  <Button
                    className="absolute inset-0 w-full h-full flex flex-col items-center justify-center gap-2 bg-black/50 opacity-0 hover:opacity-100 transition-opacity"
                    variant="flat"
                  >
                    <Camera className="w-6 h-6" />
                    <span>Change Banner</span>
                  </Button>
                </div>

                <div className="absolute -bottom-12 left-6 flex items-end gap-4">
                  <div className="relative">
                    <Avatar
                      src="https://i.pravatar.cc/150?u=a042581f4e29026024d"
                      className="w-24 h-24 ring-4 ring-background"
                    />
                    <Button
                      isIconOnly
                      className="absolute -bottom-2 -right-2 rounded-full"
                      size="sm"
                    >
                      <Camera className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </div>

              <div className="mt-16 grid grid-cols-2 gap-6">
                <Input
                  label="Channel Name"
                  placeholder="Enter channel name"
                  defaultValue="Tech Insights"
                  classNames={{
                    input: `${theme === 'dark' ? 'bg-gray-700/50 text-white' : 'bg-gray-100 text-gray-900'}`,
                    inputWrapper: `${theme === 'dark' ? 'bg-gray-700/50 border-gray-600' : 'bg-gray-100 border-gray-300'}`
                  }}
                />
                <Input
                  label="Email"
                  placeholder="Enter email"
                  startContent={<Mail className="w-4 h-4 text-gray-400" />}
                  classNames={{
                    input: `${theme === 'dark' ? 'bg-gray-700/50 text-white' : 'bg-gray-100 text-gray-900'}`,
                    inputWrapper: `${theme === 'dark' ? 'bg-gray-700/50 border-gray-600' : 'bg-gray-100 border-gray-300'}`
                  }}
                />
                <Input
                  label="Company"
                  placeholder="Enter company name"
                  startContent={<Building className="w-4 h-4 text-gray-400" />}
                  classNames={{
                    input: `${theme === 'dark' ? 'bg-gray-700/50 text-white' : 'bg-gray-100 text-gray-900'}`,
                    inputWrapper: `${theme === 'dark' ? 'bg-gray-700/50 border-gray-600' : 'bg-gray-100 border-gray-300'}`
                  }}
                />
                <Input
                  label="Location"
                  placeholder="Enter location"
                  startContent={<MapPin className="w-4 h-4 text-gray-400" />}
                  classNames={{
                    input: `${theme === 'dark' ? 'bg-gray-700/50 text-white' : 'bg-gray-100 text-gray-900'}`,
                    inputWrapper: `${theme === 'dark' ? 'bg-gray-700/50 border-gray-600' : 'bg-gray-100 border-gray-300'}`
                  }}
                />
                <Input
                  label="Website"
                  placeholder="Enter website URL"
                  startContent={<Globe className="w-4 h-4 text-gray-400" />}
                  classNames={{
                    input: `${theme === 'dark' ? 'bg-gray-700/50 text-white' : 'bg-gray-100 text-gray-900'}`,
                    inputWrapper: `${theme === 'dark' ? 'bg-gray-700/50 border-gray-600' : 'bg-gray-100 border-gray-300'}`
                  }}
                />
              </div>
              <div className="flex justify-end mt-6">
                <Button
                  color="primary"
                  className="px-8"
                >
                  Save Changes
                </Button>
              </div>
            </CardBody>
          </Card>
        </div>
      )}

      {selectedTab === 'revenue' && (
        <div className="space-y-6">
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

          {/* Payment Methods */}
          <Card className={`${
            theme === 'dark' 
              ? 'bg-gray-800/50 border-gray-700/50' 
              : 'bg-white border-gray-200'
          } border`}>
            <CardBody className="p-6">
              <h3 className={`text-xl font-semibold mb-6 ${
                theme === 'dark' ? 'text-white' : 'text-gray-900'
              }`}>Payment Methods</h3>
              
              <div className="space-y-4">
                {paymentMethods.map((method) => (
                  <div
                    key={method.id}
                    className={`flex items-center justify-between p-4 rounded-lg ${
                      theme === 'dark' ? 'bg-gray-700/30' : 'bg-gray-100'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className={`p-2 rounded-lg ${
                        theme === 'dark' ? 'bg-gray-600/50' : 'bg-gray-200'
                      }`}>
                        <img 
                          src={method.icon}
                          alt={method.name}
                          className="w-6 h-6 object-contain"
                        />
                      </div>
                      <div>
                        <p className={theme === 'dark' ? 'text-white' : 'text-gray-900'}>
                          {method.name}
                        </p>
                        <p className={`text-sm ${
                          theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                        }`}>
                          {method.connected ? 'Connected' : 'Not Connected'}
                        </p>
                      </div>
                    </div>
                    <Button
                      className={method.connected 
                        ? 'bg-red-500/20 text-red-500 hover:bg-red-500/30'
                        : 'bg-secondary text-black hover:bg-secondary/90'
                      }
                    >
                      {method.connected ? 'Disconnect' : 'Connect'}
                    </Button>
                  </div>
                ))}
              </div>
            </CardBody>
          </Card>
        </div>
      )}

      {selectedTab === 'monetization' && (
        <div className="space-y-6">
          <Card className={`${
            theme === 'dark' 
              ? 'bg-gray-800/50 border-gray-700/50' 
              : 'bg-white border-gray-200'
          } border`}>
            <CardBody className="p-6">
              <div className="flex items-center gap-4 mb-6">
                <div className="p-3 bg-secondary/10 rounded-xl">
                  <DollarSign className="w-8 h-8 text-secondary" />
                </div>
                <div>
                  <h3 className={`text-xl font-bold ${
                    theme === 'dark' ? 'text-white' : 'text-gray-900'
                  }`}>Monetize Your Channel</h3>
                  <p className={theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}>
                    Start earning from your content
                  </p>
                </div>
              </div>

              <div className={`p-6 rounded-xl mb-6 ${
                theme === 'dark' ? 'bg-gray-900/50' : 'bg-gray-50'
              }`}>
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h4 className={`text-lg font-semibold ${
                      theme === 'dark' ? 'text-white' : 'text-gray-900'
                    }`}>Channel Monetization</h4>
                    <p className={theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}>
                      Enable monetization features for your channel
                    </p>
                  </div>
                  <Button
                    className="bg-secondary/20 text-secondary border border-secondary hover:bg-secondary/30"
                    startContent={<Crown className="w-4 h-4" />}
                    isDisabled
                  >
                    Coming Soon
                  </Button>
                </div>
                <div className={`mt-4 p-4 rounded-lg ${
                  theme === 'dark' ? 'bg-gray-800/50' : 'bg-gray-100'
                }`}>
                  <h5 className={`font-medium mb-2 ${
                    theme === 'dark' ? 'text-white' : 'text-gray-900'
                  }`}>Requirements:</h5>
                  <ul className={`list-disc list-inside space-y-1 ${
                    theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                  }`}>
                    <li>500K views on videos published on Pody</li>
                    <li>No active Community Guidelines strikes</li>
                    <li>Complete channel review process</li>
                  </ul>
                </div>
              </div>

              <div className={`p-6 rounded-xl ${
                theme === 'dark' ? 'bg-gray-900/50' : 'bg-gray-50'
              }`}>
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h4 className={`text-lg font-semibold ${
                      theme === 'dark' ? 'text-white' : 'text-gray-900'
                    }`}>Creator Subscriptions</h4>
                    <p className={theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}>
                      Let your audience support you with monthly subscriptions
                    </p>
                  </div>
                  <Button
                    className="bg-primary text-white hover:bg-primary/90"
                    startContent={<DollarSign className="w-4 h-4" />}
                  >
                    Activate Subscriptions
                  </Button>
                </div>
                
                <div className="mt-6">
                  <label className={`block text-sm font-medium mb-2 ${
                    theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
                  }`}>
                    Monthly Subscription Price
                  </label>
                  <div className="flex items-center gap-2">
                    <div className="relative flex-grow max-w-xs">
                      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">$</span>
                      <Input
                        type="number"
                        min="1"
                        step="0.01"
                        placeholder="5.00"
                        value={subscriptionPrice}
                        onChange={(e) => setSubscriptionPrice(e.target.value)}
                        classNames={{
                          input: `${theme === 'dark' ? 'bg-gray-700/50 text-white pl-7' : 'bg-gray-100 text-gray-900 pl-7'}`,
                          inputWrapper: `${theme === 'dark' ? 'bg-gray-700/50 border-gray-600' : 'bg-gray-100 border-gray-300'}`
                        }}
                      />
                    </div>
                    <span className={theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}>USD per month</span>
                  </div>
                  <p className={`mt-2 text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                    Set your monthly subscription price. Subscribers will get access to exclusive content and perks.
                  </p>
                </div>
              </div>
            </CardBody>
          </Card>
        </div>
      )}
    </div>
  );
};

export default ManageChannel;