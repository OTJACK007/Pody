import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Calendar, Brain, Share2, Clock, Star, Tag } from 'lucide-react';
import { Button, Card, CardBody, Badge, Progress } from "@nextui-org/react";
import { useTheme } from '../../../../contexts/ThemeContext';
import CodyAIChat from '../../../../components/features/CodyAIChat';
import NotionConnect from '../../../../components/notion/NotionConnect';

const AISummaryDetailsPage = () => {
  const { summaryId } = useParams();
  const navigate = useNavigate();
  const { theme } = useTheme();
  const [showCodyChat, setShowCodyChat] = useState(false);
  const [showNotionModal, setShowNotionModal] = useState(false);

  // Mock data - replace with real data fetching
  const summary = {
    id: summaryId,
    title: 'AI Ethics and Society',
    content: 'AI-generated summary of key ethical considerations in AI development...',
    source: {
      type: 'podcast',
      title: 'Tech Ethics Today',
      image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=400'
    },
    tags: ['AI', 'Ethics', 'Technology'],
    date: '2024-03-14',
    metrics: {
      readingTime: '8 min',
      comprehension: 98,
      relevance: 95,
      impact: 92
    },
    sections: [
      {
        title: 'Overview',
        content: 'This episode explores the fascinating world of artificial intelligence and its profound impact across various industries. We delve into current trends, ethical considerations, and future predictions from industry experts.',
        key_points: [
          'Evolution of AI technology',
          'Current industry applications',
          'Future predictions and trends',
          'Impact on business and society'
        ],
        detailed_points: [
          {
            title: 'Evolution of AI Technology',
            content: 'The journey of AI technology has been remarkable, starting from simple rule-based systems to today\'s sophisticated neural networks. We\'ve seen major breakthroughs in machine learning, natural language processing, and computer vision.'
          },
          {
            title: 'Current Industry Applications',
            content: 'AI is currently transforming numerous industries. In healthcare, it\'s improving diagnostic accuracy and drug discovery. Financial institutions use AI for fraud detection and risk assessment.'
          }
        ]
      },
      {
        title: 'Deep Dive Analysis',
        content: 'A comprehensive analysis of the ethical implications and technical challenges in AI development.',
        key_points: [
          'Ethical frameworks in AI',
          'Technical implementation challenges',
          'Future considerations',
          'Best practices'
        ],
        detailed_points: [
          {
            title: 'Ethical Frameworks',
            content: 'Examining the various ethical frameworks being developed to guide AI development and deployment.'
          },
          {
            title: 'Technical Challenges',
            content: 'Understanding the key technical hurdles in implementing ethical AI systems.'
          }
        ]
      }
    ]
  };

  return (
    <div className="min-h-screen -mt-[60px]">
      {/* Header */}
      <div className="fixed top-0 left-0 right-0 bg-background/80 backdrop-blur-md z-50 border-b border-gray-800">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button
              isIconOnly
              variant="light"
              onClick={() => navigate(-1)}
              className="text-white hover:text-white/80"
            >
              <ArrowLeft className="w-6 h-6" />
            </Button>
            <div>
              <h1 className="text-xl font-bold text-white">{summary.title}</h1>
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4 text-gray-400" />
                <span className="text-gray-400">{summary.date}</span>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Button
              startContent={<img 
                src="https://static.wixstatic.com/media/c67dd6_c0f6b842de844dff9ac8e0e71e7e5a18~mv2.png"
                alt="Notion"
                className="w-4 h-4"
              />}
              className={`${
                theme === 'dark'
                  ? 'bg-gray-700 text-white hover:bg-gray-600'
                  : 'bg-gray-100 text-gray-900 hover:bg-gray-200'
              }`}
              onClick={() => setShowNotionModal(true)}
            >
              Export to Notion
            </Button>
            <Button
              startContent={<Brain className="w-4 h-4" />}
              className="bg-primary text-white hover:bg-primary/90"
              onClick={() => setShowCodyChat(true)}
            >
              Ask Cody AI
            </Button>
          </div>
        </div>
      </div>

      <div className="pt-[84px] pb-12 max-w-4xl mx-auto px-6">
        {/* Metrics Section */}
        <Card className={`mb-8 ${
          theme === 'dark' 
            ? 'bg-gray-800/50 border-gray-700/50' 
            : 'bg-white border-gray-200'
        } border`}>
          <CardBody className="p-6">
            <div className="grid grid-cols-4 gap-6">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <Clock className="w-4 h-4 text-primary" />
                  <span className={theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}>
                    Reading Time
                  </span>
                </div>
                <span className={`text-xl font-bold ${
                  theme === 'dark' ? 'text-white' : 'text-gray-900'
                }`}>{summary.metrics.readingTime}</span>
              </div>
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <Brain className="w-4 h-4 text-primary" />
                  <span className={theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}>
                    Comprehension
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <span className={`text-xl font-bold ${
                    theme === 'dark' ? 'text-white' : 'text-gray-900'
                  }`}>{summary.metrics.comprehension}%</span>
                  <Progress 
                    value={summary.metrics.comprehension} 
                    className="w-20" 
                    color="success"
                    size="sm"
                  />
                </div>
              </div>
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <Star className="w-4 h-4 text-primary" />
                  <span className={theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}>
                    Relevance
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <span className={`text-xl font-bold ${
                    theme === 'dark' ? 'text-white' : 'text-gray-900'
                  }`}>{summary.metrics.relevance}%</span>
                  <Progress 
                    value={summary.metrics.relevance} 
                    className="w-20" 
                    color="primary"
                    size="sm"
                  />
                </div>
              </div>
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <Tag className="w-4 h-4 text-primary" />
                  <span className={theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}>
                    Impact
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <span className={`text-xl font-bold ${
                    theme === 'dark' ? 'text-white' : 'text-gray-900'
                  }`}>{summary.metrics.impact}%</span>
                  <Progress 
                    value={summary.metrics.impact} 
                    className="w-20" 
                    color="secondary"
                    size="sm"
                  />
                </div>
              </div>
            </div>
          </CardBody>
        </Card>

        {/* Summary Content */}
        <div className="space-y-8">
          {summary.sections.map((section, index) => (
            <Card key={index} className={`${
              theme === 'dark' 
                ? 'bg-gray-800/50 border-gray-700/50' 
                : 'bg-white border-gray-200'
            } border`}>
              <CardBody className="p-6">
                <div className="prose prose-lg dark:prose-invert max-w-none">
                  <h2 className={`text-2xl font-bold mb-4 ${
                    theme === 'dark' ? 'text-white' : 'text-gray-900'
                  }`}>{section.title}</h2>
                  
                  <p className={`mb-6 ${
                    theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
                  }`}>{section.content}</p>

                  <div className="space-y-6">
                    <div>
                      <h3 className={`text-xl font-semibold mb-4 ${
                        theme === 'dark' ? 'text-white' : 'text-gray-900'
                      }`}>Key Points</h3>
                      <ul className="space-y-2">
                        {section.key_points.map((point, i) => (
                          <li key={i} className="flex items-center gap-2">
                            <div className="w-1.5 h-1.5 rounded-full bg-primary flex-shrink-0" />
                            <span className={theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}>
                              {point}
                            </span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="space-y-6">
                      {section.detailed_points.map((point, i) => (
                        <div key={i} className={`p-6 rounded-lg ${
                          theme === 'dark' ? 'bg-gray-700/30' : 'bg-gray-50'
                        }`}>
                          <h4 className={`text-lg font-semibold mb-2 ${
                            theme === 'dark' ? 'text-white' : 'text-gray-900'
                          }`}>{point.title}</h4>
                          <p className={theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}>
                            {point.content}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </CardBody>
            </Card>
          ))}
        </div>
      </div>

      <CodyAIChat 
        isOpen={showCodyChat} 
        onClose={() => setShowCodyChat(false)} 
      />

      <NotionConnect
        isOpen={showNotionModal}
        onClose={() => setShowNotionModal(false)}
        onPageSelect={(pageId) => {
          // Handle Notion export
          console.log('Export to Notion page:', pageId);
        }}
      />
    </div>
  );
};

export default AISummaryDetailsPage;