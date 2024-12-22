import React, { useState } from 'react';
import { Card, CardBody, Input, Button, Progress } from "@nextui-org/react";
import { Search, Download, Copy, Clock } from 'lucide-react';
import { useTheme } from '../../../../contexts/ThemeContext';

interface TranscriptViewProps {
  transcript: {
    time: string;
    speaker: string;
    text: string;
  }[];
}

const TranscriptView = ({ transcript }: TranscriptViewProps) => {
  const [searchQuery, setSearchQuery] = useState('');
  const { theme } = useTheme();

  const filteredTranscript = transcript?.filter(entry =>
    entry.text.toLowerCase().includes(searchQuery.toLowerCase()) ||
    entry.speaker?.toLowerCase().includes(searchQuery.toLowerCase())
  ) || [];

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Input
          placeholder="Search transcript..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          startContent={<Search className="w-4 h-4 text-gray-400" />}
          className="flex-grow"
          classNames={{
            input: `${theme === 'dark' ? 'bg-gray-700/50 text-white' : 'bg-gray-100 text-gray-900'}`,
            inputWrapper: `${theme === 'dark' ? 'bg-gray-700/50 border-gray-600' : 'bg-gray-100 border-gray-300'}`
          }}
        />
        <Button
          startContent={<Download className="w-4 h-4" />}
          className={`${
            theme === 'dark'
              ? 'bg-gray-700 text-white hover:bg-gray-600'
              : 'bg-gray-100 text-gray-900 hover:bg-gray-200'
          }`}
        >
          Download
        </Button>
        <Button
          startContent={<Copy className="w-4 h-4" />}
          className={`${
            theme === 'dark'
              ? 'bg-gray-700 text-white hover:bg-gray-600'
              : 'bg-gray-100 text-gray-900 hover:bg-gray-200'
          }`}
        >
          Copy All
        </Button>
      </div>

      <Card className={`${
        theme === 'dark' 
          ? 'bg-gray-800/50 border-gray-700/50' 
          : 'bg-white border-gray-200'
      } border`}>
        <CardBody className="p-6">
          <div className="space-y-6">
            {filteredTranscript.map((entry, index) => (
              <div 
                key={index}
                className="flex gap-4 group"
              >
                <div className={`flex-shrink-0 w-24 text-sm ${
                  theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                }`}>
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4" />
                    <span>{entry.time}</span>
                  </div>
                </div>
                <div className="flex-grow">
                  <span className={`font-medium ${
                    theme === 'dark' ? 'text-primary' : 'text-primary/90'
                  }`}>{entry.speaker}: </span>
                  <span className={theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}>
                    {entry.text}
                  </span>
                </div>
                <Button
                  isIconOnly
                  variant="light"
                  className={`opacity-0 group-hover:opacity-100 transition-opacity ${
                    theme === 'dark' ? 'text-gray-400 hover:text-white' : 'text-gray-600 hover:text-black'
                  }`}
                >
                  <Copy className="w-4 h-4" />
                </Button>
              </div>
            ))}
          </div>
        </CardBody>
      </Card>

      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Progress 
            value={30} 
            color="primary"
            size="sm"
            className="w-32"
          />
          <span className={`text-sm ${
            theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
          }`}>30% processed</span>
        </div>
        <Button
          className="bg-primary text-white hover:bg-primary/90"
        >
          Generate Full Transcript
        </Button>
      </div>
    </div>
  );
};

export default TranscriptView;