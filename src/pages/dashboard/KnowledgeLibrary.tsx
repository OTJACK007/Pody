import React, { useState, useEffect } from 'react';
import { Library, Plus, Edit3, Trash2, Search } from 'lucide-react';
import { Card, CardBody, CardHeader, Button, Input } from "@nextui-org/react";
import DeleteCategoryModal from '../../components/dashboard/modals/DeleteCategoryModal';
import { useTheme } from '../../contexts/ThemeContext';
import { useAuth } from '../../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { useKnowledge } from '../../hooks/useKnowledge';
import CategoryModal from './knowledge/components/CategoryModal';
import KnowledgeStats from './knowledge/components/KnowledgeStats';
import type { KnowledgeCategory } from '../../types/knowledge';

const KnowledgeLibrary = () => {
  const { theme } = useTheme();
  const { currentUser } = useAuth();
  const navigate = useNavigate();
  const [showCategoryModal, setShowCategoryModal] = useState(false);
  const [editingCategory, setEditingCategory] = useState<KnowledgeCategory | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [categoryToDelete, setCategoryToDelete] = useState<string | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  const {
    categories,
    isLoading,
    error,
    loadCategories,
    handleCreateCategory,
    handleUpdateCategory,
    handleDeleteCategory,
    handleSearch
  } = useKnowledge();

  useEffect(() => {
    loadCategories();
  }, [loadCategories]);

  useEffect(() => {
    const debounceSearch = setTimeout(() => {
      handleSearch(searchQuery);
    }, 300);

    return () => clearTimeout(debounceSearch);
  }, [searchQuery, handleSearch]);

  const handleModalSave = async (data: {
    name: string;
    description?: string;
    image?: string;
  }) => {
    setIsSaving(true);
    try {
      if (!currentUser?.id) {
        throw new Error('You must be logged in to perform this action');
      }

      if (editingCategory) {
        const updatedCategory = await handleUpdateCategory(editingCategory.id, {
          name: data.name,
          description: data.description || '',
          image: data.image || '',
          last_updated: new Date().toISOString(),
          updated_at: new Date().toISOString()
        });
        
        if (!updatedCategory) {
          throw new Error('Failed to update category');
        }

        // Refresh categories after update
        await loadCategories();
      } else {
        const newCategory = await handleCreateCategory(
          data.name,
          data.description,
          data.image
        );
        
        if (!newCategory) {
          throw new Error('Failed to create category');
        }

        // Refresh categories after create
        await loadCategories();
      }

      handleModalClose();
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Failed to save category';
      console.error('Error saving category:', message);
      alert(message);
    } finally {
      setIsSaving(false);
    }
  };

  const stats = {
    totalNotes: categories.reduce((acc, cat) => acc + cat.notes_count, 0),
    categories: categories.length || 0,
    tags: categories.reduce((acc, cat) => acc + (cat.tags?.length || 0), 0),
    recentlyAdded: categories.filter(cat => 
      new Date(cat.last_updated).getTime() > Date.now() - 24 * 60 * 60 * 1000
    ).length
  };

  const handleEditCategory = (category: KnowledgeCategory) => {
    setEditingCategory(category);
    setShowCategoryModal(true);
  };

  const handleDeleteConfirm = async (id: string) => {
    setCategoryToDelete(id);
    setShowDeleteModal(true);
  };

  const handleDelete = async () => {
    if (categoryToDelete) {
      await handleDeleteCategory(categoryToDelete);
      setShowDeleteModal(false);
      setCategoryToDelete(null);
    }
  };

  const handleModalClose = () => {
    setShowCategoryModal(false);
    setEditingCategory(null);
  };

  const handleModalSubmit = async (data: {
    name: string;
    description?: string;
    image?: string;
  }) => {
    if (editingCategory) {
      await handleUpdateCategory(editingCategory.id, data);
    } else {
      await handleCreateCategory(data.name, data.description, data.image);
    }
    handleModalClose();
  };

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
            onChange={(e) => {
              setSearchQuery(e.target.value);
            }}
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

      {error && (
        <div className="bg-red-500/10 border border-red-500/50 text-red-500 p-4 rounded-lg">
          {error}
        </div>
      )}

      {isLoading ? (
        <div className="flex items-center justify-center py-12">
          <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
        </div>
      ) : categories.length === 0 ? (
        <div className="text-center py-12">
          <p className={theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}>
            {searchQuery ? 'No categories found matching your search.' : 'No categories yet. Create your first one!'}
          </p>
        </div>
      ) : (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {categories.map((category) => (
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
                  }`}>{category.notes_count} Notes</p>
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
                      handleDeleteConfirm(category.id);
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
              }`}>Last updated {new Date(category.last_updated).toLocaleDateString()}</p>
            </CardBody>
          </Card>
        ))}
      </div>
      )}

      <CategoryModal
        isOpen={showCategoryModal}
        onClose={handleModalClose}
        category={editingCategory}
        onSave={handleModalSave}
      />
      
      <DeleteCategoryModal
        isOpen={showDeleteModal}
        onClose={() => {
          setShowDeleteModal(false);
          setCategoryToDelete(null);
        }}
        onConfirm={handleDelete}
        isLoading={isLoading}
      />
    </div>
  );
};

export default KnowledgeLibrary;