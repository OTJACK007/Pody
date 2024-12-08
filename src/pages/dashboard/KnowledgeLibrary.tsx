import React, { useState } from 'react';
import { Library, Search, Filter, Grid, List as ListIcon } from 'lucide-react';
import { Button, Input, Tabs, Tab } from "@nextui-org/react";
import { useTheme } from '../../contexts/ThemeContext';
import KnowledgeGrid from './knowledge/components/KnowledgeGrid';
import KnowledgeList from './knowledge/components/KnowledgeList';
import KnowledgeStats from './knowledge/components/KnowledgeStats';
import KnowledgeFilters from './knowledge/components/KnowledgeFilters';
import ConnectNotionModal from './knowledge/components/ConnectNotionModal';
import ImportModal from './knowledge/components/ImportModal';

const KnowledgeLibrary = () => {
  const [showFilters, setShowFilters] = useState(false);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [showNotionModal, setShowNotionModal] = useState(false);
  const [showImportModal, setShowImportModal] = useState(false);
  const { theme } = useTheme();

  const stats = {
    totalNotes: 128,
    categories: 12,
    tags: 45,
    recentlyAdded: 8
  };

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Library className="w-8 h-8 text-primary" />
          <div>
            <h1 className={`text-3xl font-bold ${
              theme === 'dark' ? 'text-white' : 'text-gray-900'
            }`}>Knowledge Library</h1>
            <p className={theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}>
              Your personal knowledge base from podcasts
            </p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <Button
            className="bg-secondary/20 text-secondary border border-secondary hover:bg-secondary/30"
            onClick={() => setShowNotionModal(true)}
            startContent={
              <img 
                src="https://static.wixstatic.com/media/c67dd6_c0f6b842de844dff9ac8e0e71e7e5a18~mv2.png"
                alt="Notion"
                className="w-4 h-4"
              />
            }
          >
            Connect to Notion
          </Button>
          <Button
            className="bg-primary text-white hover:bg-primary/90"
            onClick={() => setShowImportModal(true)}
          >
            Import Notes
          </Button>
        </div>
      </div>

      <KnowledgeStats stats={stats} />

      <div className="flex gap-6">
        <div className="flex-1">
          <div className="flex items-center justify-between mb-6">
            <div className="flex-1 max-w-xl">
              <Input
                placeholder="Search notes, summaries, tags..."
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
              <div className={`flex p-1 rounded-lg ${
                theme === 'dark' ? 'bg-gray-800/50' : 'bg-gray-100'
              }`}>
                <Button
                  isIconOnly
                  className={viewMode === 'grid' ? 
                    theme === 'dark' ? 'bg-gray-700' : 'bg-white' 
                    : 'bg-transparent'
                  }
                  onClick={() => setViewMode('grid')}
                >
                  <Grid className="w-4 h-4" />
                </Button>
                <Button
                  isIconOnly
                  className={viewMode === 'list' ? 
                    theme === 'dark' ? 'bg-gray-700' : 'bg-white' 
                    : 'bg-transparent'
                  }
                  onClick={() => setViewMode('list')}
                >
                  <ListIcon className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>

          <Tabs 
            className="mb-6"
            classNames={{
              tabList: `${theme === 'dark' ? 'bg-gray-800/50' : 'bg-gray-100'} p-1 rounded-lg`,
              cursor: `${theme === 'dark' ? 'bg-gray-700' : 'bg-white'}`,
              tab: `${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'} data-[selected=true]:${theme === 'dark' ? 'text-white' : 'text-gray-900'}`,
              tabContent: "group-data-[selected=true]:text-inherit"
            }}
          >
            <Tab key="all" title="All Notes" />
            <Tab key="podcasts" title="Podcast Notes" />
            <Tab key="summaries" title="AI Summaries" />
            <Tab key="highlights" title="Highlights" />
            <Tab key="favorites" title="Favorites" />
          </Tabs>

          {viewMode === 'grid' ? <KnowledgeGrid /> : <KnowledgeList />}
        </div>

        {showFilters && (
          <div className="w-80">
            <KnowledgeFilters onClose={() => setShowFilters(false)} />
          </div>
        )}
      </div>

      <ConnectNotionModal 
        isOpen={showNotionModal} 
        onClose={() => setShowNotionModal(false)} 
      />

      <ImportModal 
        isOpen={showImportModal} 
        onClose={() => setShowImportModal(false)} 
      />
    </div>
  );
};

export default KnowledgeLibrary;