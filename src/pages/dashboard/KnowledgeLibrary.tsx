import React, { useState } from 'react';
import { Library, Search, Filter, Grid, List as ListIcon } from 'lucide-react';
import { Button, Input, Tabs, Tab } from "@nextui-org/react";
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
            <h1 className="text-3xl font-bold text-white">Knowledge Library</h1>
            <p className="text-gray-400 mt-1">Your personal knowledge base from podcasts</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <Button
            className="bg-secondary/20 text-secondary border border-secondary hover:bg-secondary/30"
            onClick={() => setShowNotionModal(true)}
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
                  input: "bg-gray-700/50 text-white",
                  inputWrapper: "bg-gray-700/50 border-gray-600"
                }}
              />
            </div>
            <div className="flex items-center gap-3 ml-4">
              <Button
                startContent={<Filter className="w-4 h-4" />}
                className="bg-gray-700 text-white hover:bg-gray-600"
                onClick={() => setShowFilters(!showFilters)}
              >
                Filters
              </Button>
              <div className="flex bg-gray-800/50 p-1 rounded-lg">
                <Button
                  isIconOnly
                  className={viewMode === 'grid' ? 'bg-gray-700' : 'bg-transparent'}
                  onClick={() => setViewMode('grid')}
                >
                  <Grid className="w-4 h-4" />
                </Button>
                <Button
                  isIconOnly
                  className={viewMode === 'list' ? 'bg-gray-700' : 'bg-transparent'}
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
              tabList: "bg-gray-800/50 p-1 rounded-lg",
              cursor: "bg-gray-700",
              tab: "text-gray-400 data-[selected=true]:text-white",
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