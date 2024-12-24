import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Calendar, Tag, Brain, Star, Clock } from 'lucide-react';
import { Button, Card, CardBody, Badge, Progress } from "@nextui-org/react";
import { useTheme } from '../../../../contexts/ThemeContext';
import CodyAIChat from '../../../../components/features/CodyAIChat';
import NotionConnect from '../../../../components/notion/NotionConnect';

const NoteDetailsPage = () => {
  const { noteId } = useParams();
  const navigate = useNavigate();
  const { theme } = useTheme();
  const [showCodyChat, setShowCodyChat] = useState(false);
  const [showNotionModal, setShowNotionModal] = useState(false);

  // Mock data - replace with real data fetching
  const note = {
    id: noteId,
    title: 'Building Mental Resilience',
    content: 'Key insights on developing mental toughness and resilience in challenging situations...',
    source: {
      type: 'podcast',
      title: 'Mindset Mastery',
      image: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=400'
    },
    tags: ['Psychology', 'Mental Health', 'Personal Growth'],
    date: '2024-03-15',
    sections: [
      {
        title: 'Core Concepts',
        content: 'Understanding the fundamental principles of mental resilience and how to develop it through consistent practice and mindful awareness.',
        key_points: [
          'Resilience is a skill that can be developed',
          'Mindset plays a crucial role in resilience',
          'Recovery and adaptation are key components',
          'Building support systems enhances resilience'
        ],
        detailed_points: [
          {
            title: 'The Nature of Resilience',
            content: 'Mental resilience is not just about bouncing back from adversity, but about growing stronger through challenges. It involves developing a flexible mindset that can adapt to changing circumstances while maintaining core stability.'
          },
          {
            title: 'Building Blocks of Mental Toughness',
            content: 'The foundation of mental toughness includes emotional regulation, cognitive flexibility, and a growth mindset. These elements work together to create a robust psychological framework for handling stress and challenges.'
          }
        ]
      },
      {
        title: 'Practical Applications',
        content: 'Implementing resilience strategies in daily life through specific techniques and practices.',
        key_points: [
          'Daily resilience exercises',
          'Stress management techniques',
          'Emotional regulation practices',
          'Goal-setting frameworks'
        ],
        detailed_points: [
          {
            title: 'Daily Practice Routines',
            content: 'Incorporating small challenges into daily routines helps build resilience gradually. This might include taking cold showers, practicing mindfulness, or setting increasingly difficult goals.'
          },
          {
            title: 'Recovery Strategies',
            content: 'Understanding and implementing effective recovery strategies is crucial for maintaining long-term resilience. This includes both physical and mental recovery techniques.'
          }
        ]
      },
      {
        title: 'Advanced Insights',
        content: 'Deeper exploration of psychological mechanisms and advanced techniques for mental resilience.',
        key_points: [
          'Neuroplasticity and resilience',
          'Advanced cognitive techniques',
          'Long-term sustainability',
          'Performance optimization'
        ],
        detailed_points: [
          {
            title: 'Neurological Foundations',
            content: 'Understanding how the brain adapts and strengthens through adversity provides insights into optimizing resilience training.'
          },
          {
            title: 'Peak Performance States',
            content: 'Learning to access and maintain peak performance states through advanced psychological techniques and mental preparation.'
          }
        ]
      }
    ],
    metrics: {
      readingTime: '12 min',
      comprehension: 95,
      relevance: 92,
      impact: 88
    }
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
              <h1 className="text-xl font-bold text-white">{note.title}</h1>
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4 text-gray-400" />
                <span className="text-gray-400">{note.date}</span>
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
        {/* Note Metrics */}
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
                }`}>{note.metrics.readingTime}</span>
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
                  }`}>{note.metrics.comprehension}%</span>
                  <Progress 
                    value={note.metrics.comprehension} 
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
                  }`}>{note.metrics.relevance}%</span>
                  <Progress 
                    value={note.metrics.relevance} 
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
                  }`}>{note.metrics.impact}%</span>
                  <Progress 
                    value={note.metrics.impact} 
                    className="w-20" 
                    color="secondary"
                    size="sm"
                  />
                </div>
              </div>
            </div>
          </CardBody>
        </Card>

        {/* Note Content */}
        <div className="space-y-8">
          {note.sections.map((section, index) => (
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

export default NoteDetailsPage;
