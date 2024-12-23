import React, { useState, useEffect } from 'react';
import { X, Upload } from 'lucide-react';
import { useTheme } from '../../../../contexts/ThemeContext';

interface CategoryModalProps {
  isOpen: boolean;
  onClose: () => void;
  category?: {
    id: number;
    name: string;
    description: string;
    image: string;
  } | null;
}

const CategoryModal = ({ isOpen, onClose, category }: CategoryModalProps) => {
  const { theme } = useTheme();
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (category) {
      setName(category.name);
      setDescription(category.description);
      setImage(category.image);
    } else {
      setName('');
      setDescription('');
      setImage('');
    }
  }, [category]);

  const handleSubmit = async () => {
    setIsSubmitting(true);
    try {
      // Handle category creation/update
      onClose();
    } catch (error) {
      console.error('Error saving category:', error);
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
          <div 
            onClick={() => {
              // Handle image upload
            }}
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