import React, { useState, useEffect } from 'react';
import { Select, SelectItem } from "@nextui-org/react";
import { searchCategories, exportVideoToKnowledge } from '../../../../services/knowledge';
import type { KnowledgeCategory } from '../../../../types/knowledge';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '../../../../contexts/ThemeContext';
import { Download, Library, FileText, Brain, MessageSquare, Clock, ArrowRight, X, Lightbulb, FolderPlus } from 'lucide-react';

interface ExportModalProps {
  isOpen: boolean;
  onClose: () => void;
  videoId: string;
}

const ExportModal = ({ isOpen, onClose, videoId }: ExportModalProps) => {
  const [exportType, setExportType] = useState<'library' | 'download' | null>(null);
  const [selectedSections, setSelectedSections] = useState<string[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [categories, setCategories] = useState<KnowledgeCategory[]>([]);
  const [isExporting, setIsExporting] = useState(false);
  const [exportProgress, setExportProgress] = useState(0);
  const navigate = useNavigate();
  const { theme } = useTheme();

  useEffect(() => {
    const loadCategories = async () => {
      const data = await searchCategories('');
      setCategories(data);
    };

    if (exportType === 'library') {
      loadCategories();
    }
  }, [exportType]);

  if (!isOpen) return null;

  const sections = [
    { id: 'key_moments', label: 'Key Moments', icon: <Clock className="w-4 h-4" /> },
    { id: 'ai_analysis', label: 'AI Analysis', icon: <Brain className="w-4 h-4" /> },
    { id: 'insights', label: 'Insights', icon: <Lightbulb className="w-4 h-4" /> },
    { id: 'transcript', label: 'Transcript', icon: <MessageSquare className="w-4 h-4" /> },
    { id: 'full_content', label: 'Full Content', icon: <FileText className="w-4 h-4" /> }
  ];

  const handleExport = async () => {
    if (!exportType || selectedSections.length === 0) return;
    
    // Validate category selection for library export
    if (exportType === 'library' && !selectedCategory) {
      alert('Please select a category');
      return;
    }
    
    // Validate category selection for library export
    if (exportType === 'library' && !selectedCategory) {
      alert('Please select a category');
      return;
    }
    
    setIsExporting(true);
    
    try {
      // Show AI processing message
      setExportProgress(25);
      
      if (exportType === 'library') {
        // Export to knowledge library
        const success = await exportVideoToKnowledge(
          videoId,
          selectedCategory,
          selectedSections
        );

        if (!success) {
          throw new Error('Failed to export content to knowledge library');
        }

        setExportProgress(100);
        await new Promise(resolve => setTimeout(resolve, 500));

        // Show success message with navigation option
        const confirmed = window.confirm(
          'Content exported successfully! Would you like to view it in your Knowledge Library?'
        );
        if (confirmed) {
          navigate('/dashboard/knowledge');
        }
      } else {
        // Handle PDF download
        setExportProgress(100);
        await new Promise(resolve => setTimeout(resolve, 500));
        alert('Content exported successfully!');
      }
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Failed to export content';
      console.error('Export error:', error);
      alert(message);
    } finally {
      setIsExporting(false);
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div 
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />
      
      <div className={`relative w-full max-w-2xl ${
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
          Export Content
        </h2>

        {/* Content */}
        {!exportType ? (
          <div className="grid grid-cols-2 gap-6">
            {/* Knowledge Library Option */}
            <button
              onClick={() => setExportType('library')}
              className={`group p-6 rounded-xl border transition-all ${
                theme === 'dark'
                  ? 'bg-gray-700/50 border-gray-600 hover:bg-gray-700'
                  : 'bg-gray-50 border-gray-200 hover:bg-gray-100'
              }`}
            >
              <div className="flex flex-col items-center text-center">
                <div className="p-4 bg-primary/10 rounded-xl w-16 h-16 mb-4 flex items-center justify-center group-hover:scale-110 transition-transform">
                  <Library className="w-8 h-8 text-primary" />
                </div>
                <h3 className={`text-lg font-semibold mb-2 ${
                  theme === 'dark' ? 'text-white' : 'text-gray-900'
                }`}>Knowledge Library</h3>
                <p className={theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}>
                  Add to your personal knowledge base
                </p>
              </div>
            </button>

            {/* Download Option */}
            <button
              onClick={() => setExportType('download')}
              className={`group p-6 rounded-xl border transition-all ${
                theme === 'dark'
                  ? 'bg-gray-700/50 border-gray-600 hover:bg-gray-700'
                  : 'bg-gray-50 border-gray-200 hover:bg-gray-100'
              }`}
            >
              <div className="flex flex-col items-center text-center">
                <div className="p-4 bg-secondary/10 rounded-xl w-16 h-16 mb-4 flex items-center justify-center group-hover:scale-110 transition-transform">
                  <Download className="w-8 h-8 text-secondary" />
                </div>
                <h3 className={`text-lg font-semibold mb-2 ${
                  theme === 'dark' ? 'text-white' : 'text-gray-900'
                }`}>Download</h3>
                <p className={theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}>
                  Export as PDF or Markdown
                </p>
              </div>
            </button>
          </div>
        ) : (
          <div className="space-y-6">
            {exportType === 'library' && (
              <div className="mb-6">
                <h4 className={`text-sm font-medium mb-3 ${
                  theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
                }`}>Select Category</h4>
                <Select
                  label="Category"
                  placeholder="Select a category"
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  startContent={<FolderPlus className="w-4 h-4 text-gray-400" />}
                  classNames={{
                    trigger: `${theme === 'dark' ? 'bg-gray-700/50 border-gray-600' : 'bg-gray-100 border-gray-300'}`,
                    value: theme === 'dark' ? 'text-white' : 'text-gray-900'
                  }}
                >
                  {categories.map((category) => (
                    <SelectItem key={category.id} value={category.id}>
                      {category.name}
                    </SelectItem>
                  ))}
                </Select>
              </div>
            )}

            {/* Section Selection */}
            <div className="space-y-4">
              {sections.map((section) => (
                <div
                  key={section.id}
                  onClick={() => {
                    setSelectedSections(prev => 
                      prev.includes(section.id)
                        ? prev.filter(id => id !== section.id)
                        : [...prev, section.id]
                    );
                  }}
                  className={`flex items-center gap-4 p-4 rounded-lg cursor-pointer transition-colors ${
                    theme === 'dark'
                      ? 'hover:bg-gray-700/50'
                      : 'hover:bg-gray-100'
                  }`}
                >
                  <div className={`w-5 h-5 rounded-md border-2 flex items-center justify-center transition-colors ${
                    selectedSections.includes(section.id)
                      ? 'bg-primary border-primary'
                      : theme === 'dark'
                        ? 'border-gray-600'
                        : 'border-gray-300'
                  }`}>
                    {selectedSections.includes(section.id) && (
                      <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    )}
                  </div>
                  <div className="flex items-center gap-3">
                    {section.icon}
                    <span className={theme === 'dark' ? 'text-white' : 'text-gray-900'}>
                      {section.label}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            {/* Export Progress */}
            {isExporting && (
              <div className="mt-6">
                <div className="flex justify-between text-sm mb-2">
                  <span className={theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}>
                    {exportProgress < 100 ? 'Cody is processing content...' : 'Export complete!'}
                  </span>
                  <span className={theme === 'dark' ? 'text-white' : 'text-gray-900'}>
                    {exportProgress}%
                  </span>
                </div>
                <div className="h-2 bg-gray-700 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-primary transition-all duration-300"
                    style={{ width: `${exportProgress}%` }}
                  />
                </div>
              </div>
            )}
          </div>
        )}

        {/* Footer */}
        <div className="flex justify-end gap-3 mt-8">
          {exportType && (
            <button
              onClick={() => setExportType(null)}
              className={`px-4 py-2 rounded-lg transition-colors ${
                theme === 'dark'
                  ? 'bg-gray-700 text-white hover:bg-gray-600'
                  : 'bg-gray-200 text-gray-900 hover:bg-gray-300'
              }`}
            >
              Back
            </button>
          )}
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
          {exportType && (
            <button
              onClick={handleExport}
              disabled={selectedSections.length === 0 || isExporting || (exportType === 'library' && !selectedCategory)}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed ${
                exportType === 'library'
                  ? 'bg-primary text-white hover:bg-primary/90'
                  : 'bg-secondary text-black hover:bg-secondary/90'
              }`}
            >
              <span>{exportType === 'library' ? 'Add to Library' : 'Download'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ExportModal;