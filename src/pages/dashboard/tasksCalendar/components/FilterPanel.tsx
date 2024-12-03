import React from 'react';
import { Card, CardBody, CardHeader, Checkbox, Radio, RadioGroup, Divider } from "@nextui-org/react";
import { X } from 'lucide-react';

interface FilterPanelProps {
  onClose: () => void;
}

const FilterPanel = ({ onClose }: FilterPanelProps) => {
  const categories = [
    'Content',
    'Meeting',
    'Production',
    'Research'
  ];

  return (
    <Card className="bg-gray-800/50 border border-gray-700/50">
      <CardHeader className="flex justify-between items-center">
        <h3 className="text-lg font-semibold text-white">Filters</h3>
        <button
          onClick={onClose}
          className="p-1 hover:bg-gray-700 rounded-lg transition-colors"
        >
          <X className="w-5 h-5 text-gray-400" />
        </button>
      </CardHeader>
      <CardBody className="space-y-6">
        <div>
          <h4 className="text-sm font-medium text-gray-400 mb-3">Status</h4>
          <RadioGroup>
            <Radio value="all">All Tasks</Radio>
            <Radio value="pending">Pending</Radio>
            <Radio value="completed">Completed</Radio>
            <Radio value="overdue">Overdue</Radio>
          </RadioGroup>
        </div>

        <Divider className="bg-gray-700" />

        <div>
          <h4 className="text-sm font-medium text-gray-400 mb-3">Priority</h4>
          <RadioGroup>
            <Radio value="all">All Priorities</Radio>
            <Radio value="high">High Priority</Radio>
            <Radio value="medium">Medium Priority</Radio>
            <Radio value="low">Low Priority</Radio>
          </RadioGroup>
        </div>

        <Divider className="bg-gray-700" />

        <div>
          <h4 className="text-sm font-medium text-gray-400 mb-3">Categories</h4>
          <div className="space-y-2">
            {categories.map((category) => (
              <Checkbox
                key={category}
                value={category}
                classNames={{
                  wrapper: "before:border-gray-600"
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