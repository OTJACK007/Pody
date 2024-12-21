import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft, Play, Clock, Tag, Eye, Plus, Link as LinkIcon, Brain, Sparkles, Download, X } from 'lucide-react';
import { Button, Card, CardBody, Tabs, Tab, Chip, Progress, Avatar, Popover, PopoverTrigger, PopoverContent } from "@nextui-org/react";
import { useTheme } from '../../../contexts/ThemeContext';
import VideoPlayer from './components/VideoPlayer';
import KeyMoments from './components/KeyMoments';
import FullContent from './components/FullContent';
import InsightsList from './components/InsightsList';
import TopicInsights from './components/TopicInsights';
import CodyAIChat from '../../../components/features/CodyAIChat';
import NotionConnect from './components/NotionConnect';
import TranscriptView from './components/TranscriptView';
import NotesEditor from './components/NotesEditor';
import PdfExport from './components/PdfExport';
import AIAnalysis from './components/AIAnalysis';
import RelatedContent from './components/RelatedContent';

const PodcastVideo = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { theme } = useTheme();
  const [showCodyChat, setShowCodyChat] = useState(false);
  const [showNotionModal, setShowNotionModal] = useState(false);
  const [showPdfExport, setShowPdfExport] = useState(false);
  const [selectedView, setSelectedView] = useState('full');

  const podcastData = {
    id: '1',
    title: 'The Future of AI Technology',
    description: 'An in-depth discussion about artificial intelligence and its impact on various industries',
    duration: '2:45:30',
    views: '125K',
    channel: {
      name: 'TechInsights',
      avatar: 'https://images.unsplash.com/photo-1535303311164-664fc9ec6532?w=400',
      verified: true
    },
    thumbnail: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800',
    progress: 75,
    topics: ['AI', 'Technology', 'Future', 'Innovation'],
    keyMoments: [
      {
        timestamp: '00:05:30',
        title: 'Introduction to AI Ethics',
        summary: 'Discussion about the importance of ethical considerations in AI development',
        insights: [
          'AI systems must be designed with clear ethical guidelines',
          'Transparency is crucial for building trust in AI',
          'Ethics should be considered from the start of development'
        ]
      },
      {
        timestamp: '00:15:45',
        title: 'Future of Machine Learning',
        summary: 'Exploring upcoming trends and innovations in machine learning',
        insights: [
          'Automated ML will become more accessible',
          'Edge computing will drive ML innovation',
          'Hybrid AI systems will combine multiple approaches'
        ]
      },
      {
        timestamp: '00:25:20',
        title: 'AI in Healthcare',
        summary: 'Applications and potential impact of AI in the healthcare industry',
        insights: [
          'AI will enhance diagnostic accuracy',
          'Personalized medicine will be revolutionized',
          'Patient care will become more efficient'
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
              onClick={() => navigate('/dashboard/podroom')}
              className="text-white hover:text-white/80"
            >
              <ArrowLeft className="w-6 h-6" />
            </Button>
            <div>
              <h1 className={`text-xl font-bold ${
                'text-white'
              }`}>{podcastData.title}</h1>
              <div className="flex items-center gap-2">
                <Avatar
                  src={podcastData.channel.avatar}
                  size="sm"
                  className="ring-2 ring-white/20"
                />
                <span className="text-white">
                  {podcastData.channel.name}
                </span>
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
              Link to Notion
            </Button>
            <Button
              startContent={<Download className="w-4 h-4" />}
              className={`${
                theme === 'dark'
                  ? 'bg-gray-700 text-white hover:bg-gray-600'
                  : 'bg-gray-100 text-gray-900 hover:bg-gray-200'
              }`}
              onClick={() => setShowPdfExport(true)}
            >
              Export
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

      <div className="pt-[84px] pb-12 max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="col-span-2 space-y-6">
            <Card className={`${
              theme === 'dark' 
                ? 'bg-gray-800/50 border-gray-700/50' 
                : 'bg-white border-gray-200'
            } border`}>
              <CardBody className="p-0">
                <VideoPlayer videoUrl="https://video.wixstatic.com/video/c67dd6_8c436b9b6e42468a9e2b68ea49868528/1080p/mp4/file.mp4" />
              </CardBody>
            </Card>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <Button
                  startContent={<Play className="w-4 h-4" />}
                  className="bg-primary text-white hover:bg-primary/90"
                >
                  Watch Full Podcast
                </Button>
                <div className={`flex items-center gap-2 text-sm ${
                  theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                }`}>
                  <Clock className="w-4 h-4" />
                  <span>{podcastData.duration}</span>
                </div>
                <div className={`flex items-center gap-2 text-sm ${
                  theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                }`}>
                  <Eye className="w-4 h-4" />
                  <span>{podcastData.views}</span>
                </div>
              </div>
              <div className="flex gap-2">
                {podcastData.topics.slice(0, 3).map((topic) => (
                  <Chip key={topic} color="primary" variant="flat">
                    {topic}
                  </Chip>
                ))}
                {podcastData.topics.length > 3 && (
                  <Popover placement="bottom">
                    <PopoverTrigger>
                      <Button
                        isIconOnly
                        size="sm" 
                        variant="flat"
                        className={`${
                          theme === 'dark'
                            ? 'bg-gray-700/50 text-white hover:bg-gray-600'
                            : 'bg-gray-100 text-gray-900 hover:bg-gray-200' 
                        } w-7 h-7 min-w-0 rounded-full text-sm font-medium`}
                      >
                        +{podcastData.topics.length - 3}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className={`${
                      theme === 'dark' ? 'bg-gray-800' : 'bg-white'
                    } p-3 rounded-lg border ${
                      theme === 'dark' ? 'border-gray-700' : 'border-gray-200'
                    }`}>
                      <div className="flex flex-wrap gap-2 max-w-[200px]">
                        {podcastData.topics.slice(3).map((topic) => (
                          <Chip key={topic} color="primary" variant="flat">
                            {topic}
                          </Chip>
                        ))}
                      </div>
                    </PopoverContent>
                  </Popover>
                )}
              </div>
            </div>

            <Tabs 
              selectedKey={selectedView}
              onSelectionChange={(key) => setSelectedView(key.toString())}
              classNames={{
                tabList: `${theme === 'dark' ? 'bg-gray-800/50' : 'bg-gray-100'} p-1 rounded-lg`,
                cursor: `${theme === 'dark' ? 'bg-gray-700' : 'bg-white'}`,
                tab: `${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'} data-[selected=true]:${theme === 'dark' ? 'text-white' : 'text-gray-900'}`,
                tabContent: "group-data-[selected=true]:text-inherit"
              }}
            >
              <Tab key="full" title="Full Content" />
              <Tab key="key-moments" title="Key Moments" />
              <Tab key="insights" title="Insights" />
              <Tab key="topics" title="Topics" />
              <Tab key="transcript" title="Transcript" />
              <Tab key="notes" title="My Notes" />
            </Tabs>

            <div className="mt-6">
              {selectedView === 'full' && (
                <FullContent content={{
                  title: podcastData.title,
                  description: podcastData.description,
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
                          content: 'The journey of AI technology has been remarkable, starting from simple rule-based systems to today\'s sophisticated neural networks. We\'ve seen major breakthroughs in machine learning, natural language processing, and computer vision. The development of deep learning architectures has revolutionized how AI systems learn and adapt, leading to more human-like capabilities in understanding and processing information.'
                        },
                        {
                          title: 'Current Industry Applications',
                          content: 'AI is currently transforming numerous industries. In healthcare, it\'s improving diagnostic accuracy and drug discovery. Financial institutions use AI for fraud detection and risk assessment. Manufacturing benefits from predictive maintenance and quality control. The retail sector leverages AI for personalized customer experiences and inventory management. These applications demonstrate AI\'s versatility and practical value across different domains.'
                        },
                        {
                          title: 'Future Predictions and Trends',
                          content: 'The future of AI holds exciting possibilities. Experts predict significant advancements in autonomous systems, more sophisticated language models, and breakthrough applications in quantum computing. We\'re likely to see AI becoming more accessible through no-code platforms, enabling wider adoption across industries. Edge computing and AI will converge, bringing intelligent processing closer to data sources.'
                        },
                        {
                          title: 'Impact on Business and Society',
                          content: 'AI\'s influence extends beyond technological advancement, reshaping business models and societal structures. It\'s creating new job categories while automating routine tasks, necessitating workforce adaptation and continuous learning. Businesses are reimagining their operations with AI-driven insights, while society grapples with questions of privacy, bias, and ethical AI development.'
                        }
                      ]
                    },
                    {
                      title: 'Key Discussion Points',
                      content: 'The discussion covers several critical aspects of AI development, including ethical considerations, technical challenges, and practical implementation strategies.',
                      key_points: [
                        'Ethical AI development practices',
                        'Technical implementation challenges',
                        'Industry adoption patterns',
                        'Success case studies'
                      ],
                      detailed_points: [
                        {
                          title: 'Ethical AI Development Practices',
                          content: 'Ethical AI development requires careful consideration of fairness, transparency, and accountability. Developers must address bias in training data, ensure explainability of AI decisions, and implement robust privacy protections. Regular ethical audits and diverse team perspectives help maintain responsible AI development practices. The discussion emphasizes the importance of establishing ethical frameworks early in the development process.'
                        },
                        {
                          title: 'Technical Implementation Challenges',
                          content: 'Organizations face various technical hurdles when implementing AI solutions. These include data quality and availability, computing infrastructure requirements, integration with legacy systems, and scaling challenges. The discussion explores strategies for overcoming these obstacles, including hybrid cloud approaches, data preprocessing techniques, and modular architecture designs.'
                        },
                        {
                          title: 'Industry Adoption Patterns',
                          content: 'Different industries show varying patterns in AI adoption. Some sectors, like finance and technology, are early adopters, while others face regulatory or cultural barriers. The analysis covers adoption rates, common implementation strategies, and factors influencing successful AI integration across different sectors.'
                        },
                        {
                          title: 'Success Case Studies',
                          content: 'Real-world examples demonstrate successful AI implementations. These cases highlight key success factors, common pitfalls to avoid, and measurable outcomes. The studies span various industries, providing valuable insights for organizations at different stages of their AI journey.'
                        }
                      ]
                    },
                    {
                      title: 'Expert Insights',
                      content: 'Industry experts share their perspectives on AI development, implementation strategies, and future predictions.',
                      takeaways: [
                        'Focus on responsible AI development',
                        'Importance of data quality',
                        'Need for continuous learning',
                        'Balance between innovation and ethics'
                      ],
                      detailed_points: [
                        {
                          title: 'Responsible AI Development',
                          content: 'Experts emphasize the critical importance of developing AI systems responsibly. This includes considering societal impact, ensuring fairness and transparency, and implementing robust safety measures. They discuss frameworks for ethical AI development and the role of governance in maintaining responsible practices.'
                        },
                        {
                          title: 'Data Quality Importance',
                          content: 'High-quality data is fundamental to successful AI implementations. Experts discuss strategies for data collection, cleaning, and validation. They emphasize the importance of diverse, representative datasets and proper data governance practices to ensure reliable AI outcomes.'
                        },
                        {
                          title: 'Continuous Learning',
                          content: 'The rapidly evolving AI landscape requires continuous learning and adaptation. Experts share insights on staying current with AI developments, implementing effective training programs, and fostering a culture of innovation and learning within organizations.'
                        },
                        {
                          title: 'Innovation vs Ethics Balance',
                          content: 'Finding the right balance between pushing technological boundaries and maintaining ethical standards is crucial. Experts discuss frameworks for evaluating AI initiatives, managing risks, and ensuring innovations align with ethical principles and societal values.'
                        }
                      ]
                    }
                  ]
                }} />
              )}
              {selectedView === 'key-moments' && (
                <KeyMoments moments={podcastData.keyMoments} />
              )}
              {selectedView === 'insights' && (
                <InsightsList insights={podcastData.keyMoments.flatMap(m => m.insights)} />
              )}
              {selectedView === 'topics' && (
                <TopicInsights topics={podcastData.topics} moments={podcastData.keyMoments} />
              )}
              {selectedView === 'transcript' && (
                <TranscriptView podcastId={podcastData.id} />
              )}
              {selectedView === 'notes' && (
                <NotesEditor podcastId={podcastData.id} />
              )}
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6 sticky top-[84px]">
            <AIAnalysis podcast={podcastData} onAskQuestion={() => setShowCodyChat(true)} />
            <RelatedContent topics={podcastData.topics} />
          </div>
        </div>
      </div>

      <CodyAIChat 
        isOpen={showCodyChat} 
        onClose={() => setShowCodyChat(false)} 
      />

      <NotionConnect
        isOpen={showNotionModal}
        onClose={() => setShowNotionModal(false)}
      />

      <PdfExport
        isOpen={showPdfExport}
        onClose={() => setShowPdfExport(false)}
        podcast={podcastData}
      />
    </div>
  );
};

export default PodcastVideo;