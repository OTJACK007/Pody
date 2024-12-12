import React, { useState } from 'react';
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, Slider, Radio, RadioGroup, Chip } from "@nextui-org/react";
import { DollarSign, Users, Clock, Star, Zap, Trophy } from 'lucide-react';
import { useTheme } from '../../../../contexts/ThemeContext';

interface BrandDealsFilterModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const BrandDealsFilterModal = ({ isOpen, onClose }: BrandDealsFilterModalProps) => {
  const { theme } = useTheme();
  const [budget, setBudget] = useState([1000, 50000]);
  const [followers, setFollowers] = useState([1000, 1000000]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [dealType, setDealType] = useState('all');
  const [duration, setDuration] = useState('all');

  const categories = [
    { id: 'gaming', label: 'Gaming', icon: '🎮' },
    { id: 'fashion', label: 'Fashion', icon: '👗' },
    { id: 'tech', label: 'Technology', icon: '💻' },
    { id: 'beauty', label: 'Beauty', icon: '💄' },
    { id: 'fitness', label: 'Fitness', icon: '💪' },
    { id: 'food', label: 'Food', icon: '🍕' },
    { id: 'travel', label: 'Travel', icon: '✈️' },
    { id: 'music', label: 'Music', icon: '🎵' },
    { id: 'education', label: 'Education', icon: '📚' },
    { id: 'sports', label: 'Sports', icon: '⚽' }
  ];

  const formatNumber = (num: number) => {
    if (num >= 1000000) return `${(num / 1000000).toFixed(1)}M`;
    if (num >= 1000) return `${(num / 1000).toFixed(1)}K`;
    return num.toString();
  };

  const handleCategoryToggle = (categoryId: string) => {
    setSelectedCategories(prev => 
      prev.includes(categoryId)
        ? prev.filter(id => id !== categoryId)
        : [...prev, categoryId]
    );
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      size="2xl"
      classNames={{
        base: `${theme === 'dark' ? 'bg-gray-800' : 'bg-white'} text-${theme === 'dark' ? 'white' : 'black'}`,
        closeButton: `${theme === 'dark' ? 'text-white hover:bg-gray-700' : 'text-gray-500 hover:bg-gray-100'}`
      }}
    >
      <ModalContent>
        <ModalHeader className="flex flex-col gap-1">
          <div className="flex items-center gap-3">
            <Trophy className="w-6 h-6 text-primary" />
            <div>
              <h2 className={`text-2xl font-bold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                Filter Brand Deals
              </h2>
              <p className={theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}>
                Find the perfect partnerships for your brand
              </p>
            </div>
          </div>
        </ModalHeader>
        <ModalBody>
          <div className="space-y-8">
            {/* Budget Range */}
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <DollarSign className="w-5 h-5 text-primary" />
                <h3 className={`font-semibold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                  Budget Range
                </h3>
              </div>
              <Slider
                label="Budget"
                step={1000}
                minValue={1000}
                maxValue={50000}
                value={budget}
                onChange={setBudget as any}
                formatOptions={{ style: 'currency', currency: 'USD', minimumFractionDigits: 0 }}
                className="max-w-md"
                showSteps
                marks
              />
            </div>

            {/* Followers Range */}
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <Users className="w-5 h-5 text-primary" />
                <h3 className={`font-semibold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                  Required Followers
                </h3>
              </div>
              <Slider
                label="Followers"
                step={1000}
                minValue={1000}
                maxValue={1000000}
                value={followers}
                onChange={setFollowers as any}
                className="max-w-md"
                showSteps
                marks
                formatOptions={{ notation: 'compact', compactDisplay: 'short' }}
              />
            </div>

            {/* Categories */}
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <Star className="w-5 h-5 text-primary" />
                <h3 className={`font-semibold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                  Categories
                </h3>
              </div>
              <div className="flex flex-wrap gap-2">
                {categories.map((category) => (
                  <Chip
                    key={category.id}
                    onClick={() => handleCategoryToggle(category.id)}
                    className={`cursor-pointer transition-colors ${
                      selectedCategories.includes(category.id)
                        ? 'bg-primary text-white'
                        : theme === 'dark'
                          ? 'bg-gray-700 text-gray-300'
                          : 'bg-gray-100 text-gray-700'
                    }`}
                  >
                    <span className="mr-1">{category.icon}</span>
                    {category.label}
                  </Chip>
                ))}
              </div>
            </div>

            {/* Deal Type */}
            {/* Duration */}
            <div className="grid grid-cols-2 gap-8">
              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <Zap className="w-5 h-5 text-primary" />
                  <h3 className={`font-semibold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                    Deal Type
                  </h3>
                </div>
                <RadioGroup 
                  value={dealType} 
                  onValueChange={setDealType}
                  classNames={{
                    base: "gap-3",
                    wrapper: theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
                  }}
                >
                  <Radio value="all">All Deals</Radio>
                  <Radio value="one-time">One-time Collaboration</Radio>
                  <Radio value="long-term">Long-term Partnership</Radio>
                  <Radio value="affiliate">Affiliate Program</Radio>
                </RadioGroup>
              </div>

              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <Clock className="w-5 h-5 text-primary" />
                  <h3 className={`font-semibold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                    Campaign Duration
                  </h3>
                </div>
                <RadioGroup 
                  value={duration} 
                  onValueChange={setDuration}
                  classNames={{
                    base: "gap-3",
                    wrapper: theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
                  }}
                >
                  <Radio value="all">Any Duration</Radio>
                  <Radio value="short">Short Term (1-3 months)</Radio>
                  <Radio value="medium">Medium Term (3-6 months)</Radio>
                  <Radio value="long">Long Term (6+ months)</Radio>
                </RadioGroup>
              </div>
            </div>
          </div>
        </ModalBody>
        <ModalFooter>
          <Button
            color="danger"
            variant="flat"
            onPress={onClose}
          >
            Reset Filters
          </Button>
          <Button
            color="primary"
            onPress={onClose}
          >
            Apply Filters
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default BrandDealsFilterModal;