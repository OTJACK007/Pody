import React, { useState, useEffect } from 'react';
import { Card, CardBody, CardHeader, Checkbox, Radio, RadioGroup, Divider } from "@nextui-org/react";
import { X } from 'lucide-react';
import { useTheme } from '../../contexts/ThemeContext';

interface FilterPanelProps {
  onClose: () => void;
  onFilterChange: (filters: any) => void;
}

const FilterPanel = ({ onClose, onFilterChange }: FilterPanelProps) => {
  const { theme } = useTheme();
  
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedRating, setSelectedRating] = useState('all');
  const [selectedDuration, setSelectedDuration] = useState('all');

  const categories = ['Technology', 'Business', 'Personal Growth', 'Entertainment', 'Education'];
  const ratings = [
    { value: '4', label: '4+ Stars' },
    { value: '3', label: '3+ Stars' },
    { value: 'all', label: 'All Ratings' }
  ];
  const duration = ['0-30 min', '30-60 min', '60+ min'];

  useEffect(() => {
    onFilterChange({
      category: selectedCategories.length === 1 ? selectedCategories[0] : 'all',
      rating: selectedRating,
      duration: selectedDuration
    });
  }, [selectedCategories, selectedRating, selectedDuration]);

  return (
    <Card className={`${
      theme === 'dark' 
        ? 'bg-gray-800/50 border-gray-700/50' 
        : 'bg-white border-gray-200'
    } border`}>
      <CardHeader className="flex justify-between items-center">
        <h3 className={`text-lg font-semibold ${
          theme === 'dark' ? 'text-white' : 'text-gray-900'
        }`}>Filters</h3>
        <button
          onClick={onClose}
          className={`p-1 rounded-lg transition-colors ${
            theme === 'dark'
              ? 'hover:bg-gray-700 text-gray-400'
              : 'hover:bg-gray-100 text-gray-600'
          }`}
        >
          <X className="w-5 h-5" />
        </button>
      </CardHeader>
      <CardBody className="space-y-6">
        <div>
          <h4 className={`text-sm font-medium mb-3 ${
            theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
          }`}>Categories</h4>
          <div className="space-y-2">
            {categories.map((category) => (
              <Checkbox
                key={category}
                isSelected={selectedCategories.includes(category)}
                onValueChange={(checked) => {
                  setSelectedCategories(prev => 
                    checked 
                      ? [...prev, category]
                      : prev.filter(c => c !== category)
                  );
                }}
                value={category}
                classNames={{
                  wrapper: theme === 'dark' ? "before:border-gray-600" : "before:border-gray-300"
                }}
              >
                {category}
              </Checkbox>
            ))}
          </div>
        </div>

        <Divider className={theme === 'dark' ? 'bg-gray-700' : 'bg-gray-200'} />

        <div>
          <h4 className={`text-sm font-medium mb-3 ${
            theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
          }`}>Rating</h4>
          <RadioGroup
            value={selectedRating}
            onValueChange={setSelectedRating}
          >
            {ratings.map(({ value, label }) => (
              <Radio key={value} value={value}>
                {label}
              </Radio>
            ))}
          </RadioGroup>
        </div>

        <Divider className={theme === 'dark' ? 'bg-gray-700' : 'bg-gray-200'} />

        <div>
          <h4 className={`text-sm font-medium mb-3 ${
            theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
          }`}>Duration</h4>
          <RadioGroup
            value={selectedDuration}
            onValueChange={setSelectedDuration}
          >
            {duration.map((d) => (
              <Radio key={d} value={d}>
                {d}
              </Radio>
            ))}
          </RadioGroup>
        </div>
      </CardBody>
    </Card>
  );
};

export default FilterPanel;