import React, { useState } from 'react';
import { Card, CardBody, Button, Input } from "@nextui-org/react"; 
import { Search, Tag, Plus, Share2, Trash2 } from 'lucide-react';
import { useTheme } from '../../../../contexts/ThemeContext';
import DeleteNoteModal from '../../../../components/dashboard/modals/DeleteNoteModal';

interface KnowledgeListProps {
  insights?: string[];
}

const KnowledgeList = ({ insights = [] }: KnowledgeListProps) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedNote, setSelectedNote] = useState<string | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);
  const { theme } = useTheme();

  const filteredInsights = insights.filter(insight =>
    insight.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleDelete = async () => {
    if (!selectedNote) return;
    
    setIsDeleting(true);
    try {
      // Add your delete logic here
      console.log('Deleting note:', selectedNote);
      
      // Close modal after successful deletion
      setShowDeleteModal(false);
      setSelectedNote(null);
    } catch (error) {
      console.error('Error deleting note:', error);
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <>
      <div className="space-y-6">
        <div className="flex items-center gap-4">
          <Input
            placeholder="Search insights..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            startContent={<Search className="w-4 h-4" />}
            className="flex-grow"
            classNames={{
              input: `${theme === 'dark' ? 'bg-gray-700/50 text-white' : 'bg-gray-100 text-gray-900'}`,
              inputWrapper: `${theme === 'dark' ? 'bg-gray-700/50 border-gray-600' : 'bg-gray-100 border-gray-300'}`
            }}
          />
          <Button
            isIconOnly
            variant="flat"
            className={theme === 'dark' ? 'bg-gray-700/50 text-white' : 'bg-gray-100 text-gray-900'}
          >
            <Plus className="w-4 h-4" />
          </Button>
        </div>

        {filteredInsights.map((insight, index) => (
          <Card key={index} className={`${
            theme === 'dark' 
              ? 'bg-gray-800/50 border-gray-700/50' 
              : 'bg-white border-gray-200'
          } border`}>
            <CardBody className="p-4">
              <div className="flex items-start justify-between">
                <div className="flex-grow">
                  <p className={`text-base ${
                    theme === 'dark' ? 'text-white' : 'text-gray-900'
                  }`}>
                    {insight}
                  </p>
                </div>
                <div className="flex items-center gap-2 ml-4">
                  <Button
                    isIconOnly
                    size="sm"
                    variant="light"
                    className={theme === 'dark' ? 'text-gray-400 hover:text-white' : 'text-gray-600 hover:text-black'}
                  >
                    <Share2 className="w-4 h-4" />
                  </Button>
                  <Button
                    isIconOnly
                    size="sm"
                    variant="light"
                    className={theme === 'dark' ? 'text-gray-400 hover:text-red-500' : 'text-gray-600 hover:text-red-500'}
                    onClick={() => {
                      setSelectedNote(insight);
                      setShowDeleteModal(true);
                    }}
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
                <div className={`text-sm ${
                  theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                }`}>
                  <Tag className="w-4 h-4 inline-block mr-2" />
                  Personal
                </div>
              </div>
            </CardBody>
          </Card>
        ))}
      </div>
      
      <DeleteNoteModal
        isOpen={showDeleteModal}
        onClose={() => {
          setShowDeleteModal(false);
          setSelectedNote(null);
        }}
        onConfirm={handleDelete}
        title="this insight"
        isLoading={isDeleting}
      />
    </>
  );
};

export default KnowledgeList;