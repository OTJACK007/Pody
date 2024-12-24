import { useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import { useAuth } from '../contexts/AuthContext';
import { searchCategories, createCategory, updateCategory, deleteCategory } from '../services/knowledge';
import type { KnowledgeCategory } from '../types/knowledge';

export const useKnowledge = () => {
  const { currentUser } = useAuth();
  const [categories, setCategories] = useState<KnowledgeCategory[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const loadCategories = useCallback(async (query: string = '') => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await searchCategories(query);
      setCategories(data);
    } catch (error) {
      console.error('Error loading categories:', error);
      setError('Failed to load categories');
    } finally {
      setIsLoading(false);
    }
  }, []);

  const handleCreateCategory = async (
    name: string,
    description?: string,
    image?: string
  ) => {
    setIsLoading(true);
    setError(null);
    try {
      if (!currentUser?.id) {
        throw new Error('Not authenticated');
      }

      const { data, error } = await supabase
        .from('knowledge_categories')
        .insert([{
          name,
          description,
          image,
          user_id: currentUser?.id,
          notes_count: 0,
          last_updated: new Date().toISOString(),
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        }])
        .select()
        .single();

      if (error) {
        throw new Error(error.message);
      }
      
      if (!data) {
        throw new Error('No data returned from database');
      }

      return data;
    } catch (error) {
      console.error('Error creating category:', error);
      const message = error instanceof Error ? error.message : 'Failed to create category';
      setError(message);
      return null;
    } finally {
      setIsLoading(false);
    }
  };

  const handleUpdateCategory = async (
    id: string,
    updates: Partial<KnowledgeCategory>
  ) => {
    setIsLoading(true);
    setError(null);
    try {
      if (!currentUser?.id) {
        throw new Error('Not authenticated');
      }

      const { data, error } = await supabase
        .from('knowledge_categories')
        .update({
          name: updates.name,
          description: updates.description,
          image: updates.image,
          last_updated: new Date().toISOString()
        })
        .eq('id', id)
        .select()
        .single();

      if (error) {
        throw new Error(error.message);
      }
      
      if (!data) {
        throw new Error('No data returned from database');
      }

      return data;
    } catch (error) {
      console.error('Error updating category:', error);
      const message = error instanceof Error ? error.message : 'Failed to update category';
      setError(message);
      return null;
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteCategory = async (id: string) => {
    setIsLoading(true);
    setError(null);
    try {
      await deleteCategory(id);
      setCategories(prev => prev.filter(cat => cat.id !== id));
      navigate('/dashboard/knowledge');
      return true;
    } catch (error) {
      console.error('Error deleting category:', error);
      setError('Failed to delete category');
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const handleSearch = useCallback(async (query: string) => {
    await loadCategories(query);
  }, [loadCategories]);

  return {
    categories,
    isLoading,
    error,
    loadCategories,
    handleCreateCategory,
    handleUpdateCategory,
    handleDeleteCategory,
    handleSearch
  };
};

export default useKnowledge;