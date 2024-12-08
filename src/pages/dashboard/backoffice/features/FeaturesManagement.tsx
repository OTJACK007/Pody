import React, { useState } from 'react';
import { Flag, ArrowLeft, Plus, Search, Rocket } from 'lucide-react';
import { Button, Tabs, Tab, Input } from "@nextui-org/react";
import { useNavigate } from 'react-router-dom';
import { useTheme } from '../../../../contexts/ThemeContext';
import UpcomingFeatures from './components/UpcomingFeatures';
import SuggestedFeatures from './components/SuggestedFeatures';
import RequestedFeatures from './components/RequestedFeatures';
import MaybeList from './components/MaybeList';
import FeatureDetailsModal from './components/FeatureDetailsModal';

const FeaturesManagement = () => {
  const navigate = useNavigate();
  const { theme } = useTheme();
  const [selectedTab, setSelectedTab] = useState('upcoming');
  const [showFeatureModal, setShowFeatureModal] = useState(false);
  const [selectedFeature, setSelectedFeature] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');

  const handleFeatureClick = (feature) => {
    setSelectedFeature(feature);
    setShowFeatureModal(true);
  };

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Button
            variant="light"
            startContent={<ArrowLeft className="w-4 h-4" />}
            className={theme === 'dark' ? 'text-gray-400 hover:text-white' : 'text-gray-600 hover:text-black'}
            onClick={() => navigate('/dashboard/backoffice')}
          >
            Back to Backoffice
          </Button>
          <div className="flex items-center gap-3">
            <Flag className="w-8 h-8 text-[#ff3366]" />
            <div>
              <h1 className={`text-3xl font-bold ${
                theme === 'dark' ? 'text-white' : 'text-gray-900'
              }`}>Features Management</h1>
              <p className={theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}>
                Manage feature requests and roadmap
              </p>
            </div>
          </div>
        </div>
        <Button
          startContent={<Plus className="w-4 h-4" />}
          className="bg-secondary text-black font-medium hover:bg-secondary/90"
          onClick={() => {
            setSelectedFeature(null);
            setShowFeatureModal(true);
          }}
        >
          Add Feature
        </Button>
      </div>

      <div className="flex items-center justify-between">
        <div className="flex-1 max-w-xl">
          <Input
            placeholder="Search features..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            startContent={<Search className="w-4 h-4 text-gray-400" />}
            classNames={{
              input: `${theme === 'dark' ? 'bg-gray-700/50 text-white' : 'bg-gray-100 text-gray-900'}`,
              inputWrapper: `${theme === 'dark' ? 'bg-gray-700/50 border-gray-600' : 'bg-gray-100 border-gray-300'}`
            }}
          />
        </div>
      </div>

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
        <Tab key="upcoming" title="Upcoming Features" />
        <Tab key="suggested" title="Suggested Features" />
        <Tab key="maybe" title="Maybe List" />
        <Tab key="collecting" title="Collecting Votes" />
      </Tabs>

      <div className="mt-6">
        {selectedTab === 'upcoming' && (
          <UpcomingFeatures 
            searchQuery={searchQuery}
            onFeatureClick={handleFeatureClick}
          />
        )}
        {selectedTab === 'suggested' && (
          <SuggestedFeatures 
            searchQuery={searchQuery}
            onFeatureClick={handleFeatureClick}
          />
        )}
        {selectedTab === 'maybe' && (
          <MaybeList
            searchQuery={searchQuery}
            onFeatureClick={handleFeatureClick}
          />
        )}
        {selectedTab === 'collecting' && (
          <RequestedFeatures 
            searchQuery={searchQuery}
            onFeatureClick={handleFeatureClick}
          />
        )}
      </div>

      <FeatureDetailsModal
        isOpen={showFeatureModal}
        onClose={() => setShowFeatureModal(false)}
        feature={selectedFeature}
      />
    </div>
  );
};

export default FeaturesManagement;