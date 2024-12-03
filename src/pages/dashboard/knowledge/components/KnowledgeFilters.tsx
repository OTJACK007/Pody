import React from 'react';
import { Card, CardBody, CardHeader, Checkbox, RadioGroup, Radio, Divider } from "@nextui-org/react";
import { X } from 'lucide-react';

interface FilterPanelProps {
  onClose: () => void;
}

const KnowledgeFilters = ({ onClose }: FilterPanelProps) => {
  const sources = ['Podcasts', 'Videos', 'Articles', 'Notes'];
  const tags = ['Technology', 'Business', 'Personal Growth', 'Finance', 'Health'];

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
          <h4 className="text-sm font-medium text-gray-400 mb-3">Date Range</h4>
          <RadioGroup>
            <Radio value="all">All Time</Radio>
            <Radio value="today">Today</Radio>
            <Radio value="week">This Week</Radio>
            <Radio value="month">This Month</Radio>
            <Radio value="custom">Custom Range</Radio>
          </RadioGroup>
        </div>

        <Divider className="bg-gray-700" />

        <div>
          <h4 className="text-sm font-medium text-gray-400 mb-3">Source Type</h4>
          <div className="space-y-2">
            {sources.map((source) => (
              <Checkbox
                key={source}
                value={source}
                classNames={{
                  wrapper: "before:border-gray-600"
                }}
              >
                {source}
              </Checkbox>
            ))}
          </div>
        </div>

        <Divider className="bg-gray-700" />

        <div>
          <h4 className="text-sm font-medium text-gray-400 mb-3">Tags</h4>
          <div className="space-y-2">
            {tags.map((tag) => (
              <Checkbox
                key={tag}
                value={tag}
                classNames={{
                  wrapper: "before:border-gray-600"
                }}
              >
                {tag}
              </Checkbox>
            ))}
          </div>
        </div>

        <Divider className="bg-gray-700" />

        <div>
          <h4 className="text-sm font-medium text-gray-400 mb-3">Status</h4>
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

export default KnowledgeFilters;