import React from 'react';
import { Card, CardBody, CardHeader, Checkbox, Radio, RadioGroup, Divider } from "@nextui-org/react";
import { X } from 'lucide-react';
import { useTheme } from '../../../../contexts/ThemeContext';

interface FilterPanelProps {
  onClose: () => void;
}

const FilterPanel = ({ onClose }: FilterPanelProps) => {
  const { theme } = useTheme();
  
  const tags = [
    'Technology',
    'Business',
    'Personal Growth',
    'Finance',
    'Health'
  ];

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
          }`}>Date Range</h4>
          <RadioGroup>
            <Radio value="all">All Time</Radio>
            <Radio value="today">Today</Radio>
            <Radio value="week">This Week</Radio>
            <Radio value="month">This Month</Radio>
            <Radio value="custom">Custom Range</Radio>
          </RadioGroup>
        </div>

        <Divider className={theme === 'dark' ? 'bg-gray-700' : 'bg-gray-200'} />

        <div>
          <h4 className={`text-sm font-medium mb-3 ${
            theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
          }`}>Tags</h4>
          <div className="space-y-2">
            {tags.map((tag) => (
              <Checkbox
                key={tag}
                value={tag}
                classNames={{
                  wrapper: theme === 'dark' ? "before:border-gray-600" : "before:border-gray-300"
                }}
              >
                {tag}
              </Checkbox>
            ))}
          </div>
        </div>

        <Divider className={theme === 'dark' ? 'bg-gray-700' : 'bg-gray-200'} />

        <div>
          <h4 className={`text-sm font-medium mb-3 ${
            theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
          }`}>Status</h4>
          <RadioGroup>
            <Radio value="all">All Notes</Radio>
            <Radio value="favorites">Favorites</Radio>
            <Radio value="archived">Archived</Radio>
          </RadioGroup>
        </div>
      </CardBody>
    </Card>
  );
};

export default FilterPanel;