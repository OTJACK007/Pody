import React, { useState } from 'react';
import { Card, CardBody, Button, Input } from "@nextui-org/react";
import { Search, Tag, Plus, MessageSquare, Share2 } from 'lucide-react';
import { useTheme } from '../../../../contexts/ThemeContext';

interface InsightsListProps {
  insights: string[];
}

const InsightsList = ({ insights }: InsightsListProps) => {
  const [searchQuery, setSearchQuery] = useState('');
  const { theme } = useTheme();

  const filteredInsights = insights.filter(insight =>
    typeof insight === 'string' && insight.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Input
          placeholder="Search insights..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          startContent={<Search className="w-4 h-4 text-gray-400" />}
          classNames={{
            input: `${theme === 'dark' ? 'bg-gray-700/50 text-white' : 'bg-gray-100 text-gray-900'}`,
            inputWrapper: `${theme === 'dark' ? 'bg-gray-700/50 border-gray-600' : 'bg-gray-100 border-gray-300'}`
          }}
        />
        <Button
          className={`${
            theme === 'dark'
              ? 'bg-gray-700 text-white hover:bg-gray-600'
              : 'bg-gray-100 text-gray-900 hover:bg-gray-200'
          }`}
          startContent={<Tag className="w-4 h-4" />}
        >
          Filter by Topic
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredInsights.map((insight, index) => (
          <Card
            key={index}
            className={`${
              theme === 'dark'
                ? 'bg-gray-800/50 border-gray-700/50 hover:bg-gray-800'
                : 'bg-white border-gray-200 hover:bg-gray-50'
            } border transition-colors group`}
          >
            <CardBody className="p-4">
              <p className={`mb-4 break-words ${
                theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
              }`}>{typeof insight === 'object' ? insight.content : insight}</p>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Button
                    size="sm"
                    startContent={<Plus className="w-4 h-4" />}
                    className="bg-primary/20 text-primary hover:bg-primary/30"
                  >
                    Save
                  </Button>
                  <Button
                    isIconOnly
                    size="sm"
                    variant="light"
                    className={theme === 'dark' ? 'text-gray-400 hover:text-white' : 'text-gray-600 hover:text-black'}
                  >
                    <Share2 className="w-4 h-4" />
                  </Button>
                </div>
                <div className={`text-sm ${
                  theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                }`}>
                  5 min ago
                </div>
              </div>
            </CardBody>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default InsightsList;