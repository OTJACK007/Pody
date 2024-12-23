import React, { useState } from 'react';
import { Library, Plus, Edit3, Trash2, Search } from 'lucide-react';
import { Card, CardBody, CardHeader, Button, Input } from "@nextui-org/react";
import { useTheme } from '../../contexts/ThemeContext';
import { useNavigate } from 'react-router-dom';
import CategoryModal from './knowledge/components/CategoryModal';
import KnowledgeStats from './knowledge/components/KnowledgeStats';

const KnowledgeLibrary = () => {
  const { theme } = useTheme();
  const navigate = useNavigate();
  const [showCategoryModal, setShowCategoryModal] = useState(false);
  const [editingCategory, setEditingCategory] = useState<any>(null);
  const [searchQuery, setSearchQuery] = useState('');

  const categories = [
    {
      id: 1,
      name: 'Technology',
      description: 'Tech insights and innovations',
      image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800',
      notesCount: 45,
      lastUpdated: '2 hours ago'
    },
    {
      id: 2,
      name: 'Business',
      description: 'Business strategies and entrepreneurship',
      image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800',
      notesCount: 32,
      lastUpdated: '1 day ago'
    },
    {
      id: 3,
      name: 'Personal Growth',
      description: 'Self-improvement and development',
      image: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=800',
      notesCount: 28,
      lastUpdated: '3 days ago'
    },
    {
      id: 4,
      name: 'Finance',
      description: 'Investment and money management',
      image: 'https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?w=800',
      notesCount: 19,
      lastUpdated: '5 days ago'
    }
  ];

  const stats = {
    totalNotes: 124,
    categories: categories.length,
    tags: 45,
    recentlyAdded: 8
  };

  const handleEditCategory = (category: any) => {
    setEditingCategory(category);
    setShowCategoryModal(true);
  };

  const filteredCategories = categories.filter(category =>
    category.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    category.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-8">
      <div className="flex items-center gap-3">
        <Library className="w-8 h-8 text-primary" />
        <div>
          <h1 className={`text-3xl font-bold ${
            theme === 'dark' ? 'text-white' : 'text-gray-900'
          }`}>Knowledge Library</h1>
          <p className={theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}>
            Organize and access your knowledge base
          </p>
        </div>
      </div>

      <KnowledgeStats stats={stats} />

      <div className="flex items-center justify-between gap-4">
        <div className="flex-1 max-w-xl">
          <Input
            placeholder="Search categories..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            startContent={<Search className="w-4 h-4 text-gray-400" />}
            classNames={{
              input: `${theme === 'dark' ? 'bg-gray-700/50 text-white' : 'bg-gray-100 text-gray-900'}`,
              inputWrapper: `${theme === 'dark' ? 'bg-gray-700/50 border-gray-600' : 'bg-gray-100 border-gray-300'}`
            }}
          />
        </div>
        <Button
          className="bg-primary text-white"
          startContent={<Plus className="w-4 h-4" />}
          onClick={() => {
            setEditingCategory(null);
            setShowCategoryModal(true);
          }}
        >
          Add Category
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredCategories.map((category) => (
          <Card
            key={category.id}
            isPressable
            className={`${
              theme === 'dark'
                ? 'bg-gray-800/50 border-gray-700/50'
                : 'bg-white border-gray-200'
            } border group hover:border-primary transition-all duration-300`}
            onClick={() => navigate(`/dashboard/knowledge/category/${category.id}`)}
          >
            <CardHeader className="absolute z-10 top-1 flex-col items-start">
              <div className="flex items-center justify-between w-full">
                <div>
                  <p className={`text-tiny uppercase font-bold ${
                    theme === 'dark' ? 'text-white/60' : 'text-black/60'
                  }`}>{category.notesCount} Notes</p>
                  <h4 className={`text-xl font-medium ${
                    theme === 'dark' ? 'text-white' : 'text-black'
                  }`}>{category.name}</h4>
                </div>
                <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <Button
                    isIconOnly
                    size="sm"
                    variant="flat"
                    className="bg-white/20 backdrop-blur-sm"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleEditCategory(category);
                    }}
                  >
                    <Edit3 className="w-4 h-4" />
                  </Button>
                  <Button
                    isIconOnly
                    size="sm"
                    variant="flat"
                    className="bg-red-500/20 text-red-500"
                    onClick={(e) => {
                      e.stopPropagation();
                      // Handle delete
                    }}
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </CardHeader>
            <img
              alt={category.name}
              className="z-0 w-full h-full object-cover opacity-80 group-hover:scale-110 transition-transform duration-500"
              src={category.image}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
            <CardBody className="absolute bottom-0 z-10 p-4">
              <p className={`text-sm ${
                theme === 'dark' ? 'text-gray-300' : 'text-gray-100'
              }`}>{category.description}</p>
              <p className={`text-tiny mt-2 ${
                theme === 'dark' ? 'text-gray-400' : 'text-gray-300'
              }`}>Last updated {category.lastUpdated}</p>
            </CardBody>
          </Card>
        ))}
      </div>

      <CategoryModal
        isOpen={showCategoryModal}
        onClose={() => {
          setShowCategoryModal(false);
          setEditingCategory(null);
        }}
        category={editingCategory}
      />
    </div>
  );
};

export default KnowledgeLibrary;