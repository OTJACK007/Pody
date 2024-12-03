import React from 'react';
import { Card, CardBody, CardHeader, Checkbox, Radio, RadioGroup, Divider } from "@nextui-org/react";
import { X } from 'lucide-react';
import { useTheme } from '../../../../contexts/ThemeContext';

interface FilterPanelProps {
  onClose: () => void;
}

const FilterPanel = ({ onClose }: FilterPanelProps) => {
  const { theme } = useTheme();
  
  const categories = [
    'Content',
    'Meeting',
    'Production',
    'Research'
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
          }`}>Status</h4>
          <RadioGroup>
            <Radio value="all">All Tasks</Radio>
            <Radio value="pending">Pending</Radio>
            <Radio value="completed">Completed</Radio>
            <Radio value="overdue">Overdue</Radio>
          </RadioGroup>
        </div>

        <Divider className={theme === 'dark' ? 'bg-gray-700' : 'bg-gray-200'} />

        <div>
          <h4 className={`text-sm font-medium mb-3 ${
            theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
          }`}>Priority</h4>
          <RadioGroup>
            <Radio value="all">All Priorities</Radio>
            <Radio value="high">High Priority</Radio>
            <Radio value="medium">Medium Priority</Radio>
            <Radio value="low">Low Priority</Radio>
          </RadioGroup>
        </div>

        <Divider className={theme === 'dark' ? 'bg-gray-700' : 'bg-gray-200'} />

        <div>
          <h4 className={`text-sm font-medium mb-3 ${
            theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
          }`}>Categories</h4>
          <div className="space-y-2">
            {categories.map((category) => (
              <Checkbox
                key={category}
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
      </CardBody>
    </Card>
  );
};

export default FilterPanel;