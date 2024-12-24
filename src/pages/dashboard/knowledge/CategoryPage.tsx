import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Search, Filter, Brain, Plus, Sparkles, Share2, Download, Rocket, Command, Bot, Wand2, MessageSquare, Book, FileText, Star, Clock } from 'lucide-react';
import { Button, Input, Tabs, Tab, Card, CardBody, Chip, Dropdown, DropdownTrigger, DropdownMenu, DropdownItem } from "@nextui-org/react";
import { useTheme } from '../../../contexts/ThemeContext';
import { supabase } from '../../../lib/supabase';
import KnowledgeGrid from './components/KnowledgeGrid';
import KnowledgeList from './components/KnowledgeList';
import FilterPanel from './components/FilterPanel';
import CodyAIChat from '../../../components/features/CodyAIChat';
import NotionConnect from '../podcasts/components/NotionConnect';
import AISummaries from './components/AISummaries';
import Highlights from './components/Highlights';
import TopicInsights from './components/TopicInsights';
import NotesEditor from './components/NotesEditor';
import { useCategoryContent } from '../../../hooks/useCategoryContent';

const CategoryPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [showFilters, setShowFilters] = useState(false);
  const [selectedTab, setSelectedTab] = useState('all');
  const [showCodyChat, setShowCodyChat] = useState(false);
  const [showNotionModal, setShowNotionModal] = useState(false);
  const { theme } = useTheme();
  const [categoryName, setCategoryName] = useState('');
  const [searchQuery, setSearchQuery] = useState('');

  const {
    summaries,
    highlights,
    topics,
    notes,
    isLoading,
    error,
    loadContent
  } = useCategoryContent(id || '');

  useEffect(() => {
    const loadCategory = async () => {
      if (!id) return;
      
      try {
        const { data: category, error } = await supabase
          .from('knowledge_categories')
          .select('name')
          .eq('id', id)
          .single();

        if (error) throw error;
        setCategoryName(category.name);
        
        // Load content
        await loadContent();
      } catch (error) {
        console.error('Error loading category:', error);
      }
    };

    loadCategory();
  }, [id, loadContent]);

  const aiTools = [
    {
      id: 'summarize',
      name: 'AI Summarize',
      icon: <Brain className="w-4 h-4" />,
      description: 'Generate summaries of your notes'
    },
    {
      id: 'insights',
      name: 'Extract Insights',
      icon: <Sparkles className="w-4 h-4" />,
      description: 'Extract key insights from content'
    },
    {
      id: 'organize',
      name: 'Auto Organize',
      icon: <Command className="w-4 h-4" />,
      description: 'Automatically organize content'
    },
    {
      id: 'generate',
      name: 'Content Generator',
      icon: <Wand2 className="w-4 h-4" />,
      description: 'Generate new content ideas'
    }
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <Button
          variant="light"
          startContent={<ArrowLeft className="w-4 h-4" />}
          className={`mb-6 ${
            theme === 'dark' ? 'text-gray-400 hover:text-white' : 'text-gray-600 hover:text-black'
          }`}
          onClick={() => navigate('/dashboard/knowledge')}
        >
          Back to Knowledge Library
        </Button>

        <div className="flex items-center justify-between">
          <div>
            <h1 className={`text-3xl font-bold ${
              theme === 'dark' ? 'text-white' : 'text-gray-900'
            }`}>{categoryName}</h1>
            <p className={theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}>
              Your {categoryName.toLowerCase()} knowledge hub
            </p>
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

      {/* AI Tools */}
      <Card className={`${
        theme === 'dark' 
          ? 'bg-gray-800/50 border-gray-700/50' 
          : 'bg-white border-gray-200'
      } border mb-8`}>
        <CardBody className="p-6">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-primary/10 rounded-lg">
                <Bot className="w-5 h-5 text-primary" />
              </div>
              <div>
                <h3 className={`font-semibold ${
                  theme === 'dark' ? 'text-white' : 'text-gray-900'
                }`}>AI Tools</h3>
                <p className={theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}>
                  Enhance your knowledge with AI
                </p>
              </div>
            </div>
            <Button
              className="bg-secondary text-black font-medium hover:bg-secondary/90"
              startContent={<Rocket className="w-4 h-4" />}
            >
              Upgrade for More
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {aiTools.map((tool) => (
              <Card
                key={tool.id} 
                className={`border-none h-[200px] overflow-hidden ${
                  theme === 'dark'
                    ? 'bg-gradient-to-br from-gray-800/80 via-gray-800/50 to-gray-800/30'
                    : 'bg-gradient-to-br from-gray-100/80 via-gray-100/50 to-gray-100/30'
                } group hover:scale-[1.02] transition-all duration-300`}
                isPressable
              >
                <div className="absolute inset-0 flex flex-col items-center justify-center p-6 z-10">
                  <div className={`p-4 rounded-xl mb-3 backdrop-blur-sm ${
                    tool.id === 'summarize' ? 'bg-primary/10' :
                    tool.id === 'insights' ? 'bg-secondary/10' :
                    tool.id === 'organize' ? 'bg-blue-500/10' :
                    'bg-purple-500/10'
                  } group-hover:scale-110 transition-all duration-300 shadow-lg`}>
                    {React.cloneElement(tool.icon, { 
                      className: `w-8 h-8 ${
                        tool.id === 'summarize' ? 'text-primary' :
                        tool.id === 'insights' ? 'text-secondary' :
                        tool.id === 'organize' ? 'text-blue-500' :
                        'text-purple-500'
                      }`
                    })}
                  </div>
                  <h4 className={`text-lg font-bold mb-1 ${
                    theme === 'dark' ? 'text-white' : 'text-gray-900'
                  } group-hover:text-primary transition-colors`}>{tool.name}</h4>
                  <p className={`text-center text-sm ${
                    theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                  }`}>{tool.description}</p>
                </div>
                <div className="absolute inset-0 bg-gradient-to-br from-black/5 to-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </Card>
            ))}
          </div>
        </CardBody>
      </Card>

      {/* Main Content */}
      <div className="flex gap-6">
        <div className="flex-1">
          <div className="flex items-center justify-between mb-6">
            <div className="flex-1 max-w-xl">
              <Input
                placeholder="Search in this category..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                startContent={<Search className="w-4 h-4 text-gray-400" />}
                classNames={{
                  input: `${theme === 'dark' ? 'bg-gray-700/50 text-white' : 'bg-gray-100 text-gray-900'}`,
                  inputWrapper: `${theme === 'dark' ? 'bg-gray-700/50 border-gray-600' : 'bg-gray-100 border-gray-300'}`
                }}
              />
            </div>
            <div className="flex items-center gap-3 ml-4">
              <Button
                startContent={<Filter className="w-4 h-4" />}
                className={`${
                  theme === 'dark'
                    ? 'bg-gray-700 text-white hover:bg-gray-600'
                    : 'bg-gray-100 text-gray-900 hover:bg-gray-200'
                }`}
                onClick={() => setShowFilters(!showFilters)}
              >
                Filters
              </Button>
              <Button
                startContent={<Plus className="w-4 h-4" />}
                className="bg-primary text-white hover:bg-primary/90"
              >
                New Note
              </Button>
            </div>
          </div>

          <Tabs 
            selectedKey={selectedTab}
            onSelectionChange={(key) => setSelectedTab(key.toString())}
            classNames={{
              tabList: `${theme === 'dark' ? 'bg-gray-800/50' : 'bg-gray-100'} p-1 rounded-lg`,
              cursor: `${theme === 'dark' ? 'bg-gray-700' : 'bg-white'}`,
              tab: `${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'} data-[selected=true]:${theme === 'dark' ? 'text-white' : 'text-gray-900'}`,
              tabContent: "group-data-[selected=true]:text-inherit"
            }}
          >
            <Tab 
              key="all" 
              title={
                <div className="flex items-center gap-2">
                  <Book className="w-4 h-4" />
                  <span>All Notes</span>
                </div>
              }
            />
            <Tab 
              key="ai-summaries" 
              title={
                <div className="flex items-center gap-2">
                  <Brain className="w-4 h-4" />
                  <span>AI Summaries</span>
                </div>
              }
            />
            <Tab 
              key="highlights" 
              title={
                <div className="flex items-center gap-2">
                  <Star className="w-4 h-4" />
                  <span>Highlights</span>
                </div>
              }
            />
            <Tab 
              key="topics" 
              title={
                <div className="flex items-center gap-2">
                  <FileText className="w-4 h-4" />
                  <span>Topics</span>
                </div>
              }
            />
            <Tab 
              key="recent" 
              title={
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4" />
                  <span>Recent</span>
                </div>
              }
            />
          </Tabs>

          <div className="mt-6">
            {isLoading ? (
              <div className="flex justify-center py-12">
                <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin" />
              </div>
            ) : error ? (
              <div className="text-center py-12">
                <p className={theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}>
                  {error}
                </p>
              </div>
            ) : selectedTab === 'all' && notes.length === 0 ? (
              <div className="text-center py-12">
                <p className={theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}>
                  No notes found in this category.
                </p>
              </div>
            ) : selectedTab === 'all' && (
              <KnowledgeList notes={notes} />
            )}
            {selectedTab === 'ai-summaries' && (
              <AISummaries summaries={summaries} />
            )}
            {selectedTab === 'highlights' && (
              <Highlights highlights={highlights} />
            )}
            {selectedTab === 'topics' && (
              <TopicInsights topics={topics} />
            )}
            {selectedTab === 'recent' && (
              <div className="text-center py-12">
                <p className={theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}>
                  No recent notes found.
                </p>
              </div>
            )}
          </div>
        </div>

        {showFilters && (
          <div className="w-80">
            <FilterPanel onClose={() => setShowFilters(false)} />
          </div>
        )}
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

export default CategoryPage;