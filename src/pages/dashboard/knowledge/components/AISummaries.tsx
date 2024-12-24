import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardBody, Avatar, Badge } from "@nextui-org/react";
import { Calendar, Brain } from 'lucide-react';
import { useTheme } from '../../../../contexts/ThemeContext';

interface Summary {
  id: string;
  title: string;
  content: string;
  source_type: string;
  source_title: string;
  source_url?: string;
  metrics: {
    readingTime: string;
    comprehension: number;
    relevance: number;
    impact: number;
  };
  tags: string[];
  created_at: string;
}

interface AISummariesProps {
  summaries: Summary[];
}

const AISummaries = ({ summaries }: AISummariesProps) => {
  const { theme } = useTheme();
  const navigate = useNavigate();

  return (
    <div className="space-y-4">
      {summaries.length === 0 ? (
        <div className="text-center py-12">
          <p className={theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}>
            No AI summaries found in this category.
          </p>
        </div>
      ) : summaries.map((summary) => (
        <Card 
          key={summary.id}
          isPressable
          isHoverable
          className={`${
            theme === 'dark' 
              ? 'bg-gray-800/50 border-gray-700/50' 
              : 'bg-white border-gray-200'
          } border transform transition-all duration-300 hover:scale-[1.02] w-full`}
        >
          <CardBody className="p-4">
            <div className="flex items-start gap-4">
              <Avatar
                src={summary.source_url}
                className="flex-shrink-0 w-16 h-16 rounded-lg ring-2 ring-white/20"
              />
              <div className="flex-grow">
                <div className="flex items-center gap-2 mb-2">
                  <h3 className={`text-xl font-semibold ${
                    theme === 'dark' ? 'text-white' : 'text-gray-900'
                  }`}>{summary.title || 'Untitled Summary'}</h3>
                  <Badge color="secondary" variant="flat">AI Generated</Badge>
                </div>
                
                <p className={`mb-4 line-clamp-2 ${
                  theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                }`}>{summary.content || 'No content available'}</p>

                <div className="flex items-center gap-4">
                  <div className={`flex items-center gap-2 text-sm ${
                    theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                  }`}>
                    <Calendar className="w-4 h-4" />
                    <span>{new Date(summary.created_at).toLocaleDateString()}</span>
                  </div>
                  <div className={`flex items-center gap-2 text-sm ${
                    theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                  }`}>
                    <Brain className="w-4 h-4 text-primary" />
                    <span>{summary.metrics.comprehension}% Accuracy</span>
                  </div>
                </div>

                <div className="flex flex-wrap gap-2 mt-4">
                  {summary.tags.map((tag) => (
                    <Badge key={tag} variant="flat" size="sm">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
          </CardBody>
        </Card>
      ))}
    </div>
  );
};

export default AISummaries;