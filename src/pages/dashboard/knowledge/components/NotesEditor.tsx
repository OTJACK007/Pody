import React, { useState } from 'react';
import { Card, CardBody, Button, Input, Textarea } from "@nextui-org/react";
import { Save, Share2, Tag, Plus } from 'lucide-react';
import { useTheme } from '../../../../contexts/ThemeContext';

const NotesEditor = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [tags, setTags] = useState<string[]>([]);
  const [newTag, setNewTag] = useState('');
  const { theme } = useTheme();

  const handleAddTag = () => {
    if (newTag && !tags.includes(newTag)) {
      setTags([...tags, newTag]);
      setNewTag('');
    }
  };

  const handleRemoveTag = (tagToRemove: string) => {
    setTags(tags.filter(tag => tag !== tagToRemove));
  };

  return (
    <div className="space-y-6">
      <Card className={`${
        theme === 'dark' 
          ? 'bg-gray-800/50 border-gray-700/50' 
          : 'bg-white border-gray-200'
      } border`}>
        <CardBody className="p-6">
          <div className="space-y-4">
            <Input
              label="Note Title"
              placeholder="Enter note title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              classNames={{
                input: `${theme === 'dark' ? 'bg-gray-700/50 text-white' : 'bg-gray-100 text-gray-900'}`,
                inputWrapper: `${theme === 'dark' ? 'bg-gray-700/50 border-gray-600' : 'bg-gray-100 border-gray-300'}`
              }}
            />

            <Textarea
              label="Note Content"
              placeholder="Write your notes here..."
              value={content}
              onChange={(e) => setContent(e.target.value)}
              minRows={10}
              classNames={{
                input: `${theme === 'dark' ? 'bg-gray-700/50 text-white' : 'bg-gray-100 text-gray-900'}`,
                inputWrapper: `${theme === 'dark' ? 'bg-gray-700/50 border-gray-600' : 'bg-gray-100 border-gray-300'}`
              }}
            />

            <div className="space-y-2">
              <label className={`block text-sm font-medium ${
                theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
              }`}>Tags</label>
              <div className="flex flex-wrap gap-2">
                {tags.map((tag) => (
                  <span
                    key={tag}
                    className={`inline-flex items-center px-3 py-1 rounded-full text-sm ${
                      theme === 'dark'
                        ? 'bg-gray-700 text-white'
                        : 'bg-gray-200 text-gray-800'
                    }`}
                  >
                    {tag}
                    <button
                      onClick={() => handleRemoveTag(tag)}
                      className="ml-2 text-gray-500 hover:text-gray-700"
                    >
                      ×
                    </button>
                  </span>
                ))}
                <div className="flex items-center gap-2">
                  <Input
                    placeholder="Add tag"
                    value={newTag}
                    onChange={(e) => setNewTag(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleAddTag()}
                    startContent={<Tag className="w-4 h-4 text-gray-400" />}
                    className="w-40"
                    classNames={{
                      input: `${theme === 'dark' ? 'bg-gray-700/50 text-white' : 'bg-gray-100 text-gray-900'}`,
                      inputWrapper: `${theme === 'dark' ? 'bg-gray-700/50 border-gray-600' : 'bg-gray-100 border-gray-300'}`
                    }}
                  />
                  <Button
                    isIconOnly
                    onClick={handleAddTag}
                    className="bg-primary text-white"
                  >
                    <Plus className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </CardBody>
      </Card>

      <div className="flex items-center justify-between">
        <div className="text-sm text-gray-400">
          Last saved 2 minutes ago
        </div>
        <div className="flex items-center gap-3">
          <Button
            startContent={<Share2 className="w-4 h-4" />}
            className={`${
              theme === 'dark'
                ? 'bg-gray-700 text-white hover:bg-gray-600'
                : 'bg-gray-100 text-gray-900 hover:bg-gray-200'
            }`}
          >
            Share
          </Button>
          <Button
            startContent={<Save className="w-4 h-4" />}
            className="bg-primary text-white hover:bg-primary/90"
          >
            Save Notes
          </Button>
        </div>
      </div>
    </div>
  );
};

export default NotesEditor;