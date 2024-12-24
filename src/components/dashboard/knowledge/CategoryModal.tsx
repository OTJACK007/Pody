import React, { useState, useEffect, useRef } from 'react';
import { X, Upload } from 'lucide-react';
import { useTheme } from "../../../../contexts/ThemeContext";
import { supabase } from "../../../../lib/supabase";
import { useAuth } from "../../../../contexts/AuthContext";
import type { KnowledgeCategory } from '../../../../types/knowledge';

interface CategoryModalProps {
  isOpen: boolean;
  onClose: () => void;
  category?: {
    id: string;
    name: string;
    description: string;
    image: string;
  } | null;
  onSave: (data: { name: string; description?: string; image?: string }) => Promise<void>;
}

const CategoryModal = ({ isOpen, onClose, category, onSave }: CategoryModalProps) => {
  const { theme } = useTheme();
  const { currentUser } = useAuth();
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState('');
  const [isUploading, setIsUploading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (category) {
      setName(category.name);
      setDescription(category.description);
      setImage(category.image || '');
    } else {
      setName('');
      setDescription('');
      setImage('');
    }
  }, [category]);

  const handleImageUpload = async (file: File) => {
    if (!currentUser?.id) return;
    setIsUploading(true);

    try {
      // Validate file type
      if (!file.type.startsWith('image/')) {
        alert('Please upload an image file');
        setIsUploading(false);
        return;
      }

      // Validate file size (5MB max)
      if (file.size > 5 * 1024 * 1024) {
        alert('File size must be less than 5MB');
        setIsUploading(false);
        return;
      }

      // Upload to Supabase Storage
      const fileExt = file.name.split('.').pop();
      const fileName = `${currentUser.id}/${Date.now()}.${fileExt}`;

      setUploadProgress(30);

      const { error: uploadError, data } = await supabase.storage
        .from('category-images')
        .upload(fileName, file, {
          upsert: true
        });

      if (uploadError) throw uploadError;

      setUploadProgress(60);

      // Get public URL
      const { data: { publicUrl } } = supabase.storage
        .from('category-images')
        .getPublicUrl(fileName);

      setImage(publicUrl);
      setUploadProgress(100);
      setTimeout(() => {
        setIsUploading(false);
        setUploadProgress(0);
      }, 500);
    } catch (error) {
      console.error('Error uploading image:', error);
      alert('Failed to upload image. Please try again.');
      setIsUploading(false);
      setUploadProgress(0);
    }
  };

  const handleSubmit = async () => {
    if (!name) {
      alert('Please enter a category name');
      return;
    }

    setIsSubmitting(true);
    try {
      if (isUploading) {
        alert('Please wait for image upload to complete');
        return;
      }

      await onSave({
        name,
        description,
        image
      });
      onClose();
    } catch (error) {
      console.error('Error saving category:', error);
      alert('Failed to save category. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };


  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div 
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />
      
      <div className={`relative w-full max-w-lg ${
        theme === 'dark' ? 'bg-gray-800' : 'bg-white'
      } rounded-xl shadow-xl p-6 m-4`}>
        {/* Close Button */}
        <button
          onClick={onClose}
          className={`absolute top-4 right-4 p-2 rounded-lg transition-colors ${
            theme === 'dark'
              ? 'hover:bg-gray-700 text-gray-400'
              : 'hover:bg-gray-100 text-gray-600'
          }`}
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <h2 className={`text-2xl font-bold mb-6 ${
          theme === 'dark' ? 'text-white' : 'text-gray-900'
        }`}>
          {category ? 'Edit Category' : 'New Category'}
        </h2>

        {/* Form */}
        <div className="space-y-6">
          {/* Image Upload */}
          <div>
            <label className={`block text-sm font-medium mb-2 ${
              theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
            }`}>Category Image</label>
            <div 
              onClick={() => fileInputRef.current?.click()}
              className={`aspect-video rounded-lg overflow-hidden cursor-pointer group relative ${
                theme === 'dark' ? 'bg-gray-700/50' : 'bg-gray-100'
              }`}
            >
              {image ? (
                <img
                  src={image}
                  alt="Category cover"
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <Upload className={`w-8 h-8 mb-2 ${
                    theme === 'dark' ? 'text-gray-400' : 'text-gray-500'
                  }`} />
                  <p className={theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}>
                    Upload Cover Image
                  </p>
                </div>
              )}
              <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <div className="text-white text-center">
                  <Upload className="w-8 h-8 mx-auto mb-2" />
                  <p>Change Image</p>
                </div>
              </div>
              {isUploading && (
                <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                  <div className="text-center">
                    <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                    <p className="text-white">Uploading... {uploadProgress}%</p>
                  </div>
                </div>
              )}
            </div>
            <input
              type="file"
              ref={fileInputRef}
              className="hidden"
              accept="image/*"
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) handleImageUpload(file);
              }}
            />
          </div>

          {/* Name Input */}
          <div>
            <label className={`block text-sm font-medium mb-2 ${
              theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
            }`}>
              Category Name
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className={`w-full px-4 py-2 rounded-lg focus:ring-2 focus:ring-primary outline-none ${
                theme === 'dark'
                  ? 'bg-gray-700/50 border-gray-600 text-white'
                  : 'bg-gray-100 border-gray-300 text-gray-900'
              } border`}
              placeholder="Enter category name"
            />
          </div>

          {/* Description Input */}
          <div>
            <label className={`block text-sm font-medium mb-2 ${
              theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
            }`}>
              Description
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className={`w-full px-4 py-2 rounded-lg focus:ring-2 focus:ring-primary outline-none ${
                theme === 'dark'
                  ? 'bg-gray-700/50 border-gray-600 text-white'
                  : 'bg-gray-100 border-gray-300 text-gray-900'
              } border`}
              placeholder="Enter category description"
              rows={3}
            />
          </div>
        </div>

        {/* Footer */}
        <div className="flex justify-end gap-3 mt-8">
          <button
            onClick={onClose}
            className={`px-4 py-2 rounded-lg transition-colors ${
              theme === 'dark'
                ? 'bg-red-500/20 text-red-500 hover:bg-red-500/30'
                : 'bg-red-100 text-red-600 hover:bg-red-200'
            }`}
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            disabled={!name || isSubmitting}
            className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting ? 'Saving...' : category ? 'Save Changes' : 'Create Category'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default CategoryModal;