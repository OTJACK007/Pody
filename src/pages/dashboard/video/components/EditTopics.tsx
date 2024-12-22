import React from 'react';
import { Card, CardBody, Button, Input, Progress } from "@nextui-org/react";
import { Plus, Trash2, Tag } from 'lucide-react';
import { useTheme } from '../../../../contexts/ThemeContext';
import type { Topic } from '../../../../types/video';

interface EditTopicsProps {
  topics: Topic[];
  onChange: (newTopics: Topic[]) => void;
}

const EditTopics = ({ topics, onChange }: EditTopicsProps) => {
  const { theme } = useTheme();

  const handleAdd = () => {
    onChange([
      ...topics,
      {
        id: crypto.randomUUID(),
        video_id: topics[0]?.video_id || '',
        topic_name: '',
        relevance: 50
      }
    ]);
  };

  const handleRemove = (index: number) => {
    onChange(topics.filter((_, i) => i !== index));
  };

  const handleChange = (index: number, field: keyof Topic, value: string | number) => {
    onChange(
      topics.map((topic, i) => 
        i === index ? {
          ...topic,
          [field]: field === 'relevance' ? Math.min(100, Math.max(0, Number(value))) : value
        } : topic
      )
    );
  };

  return (
    <div className="space-y-6">
      {topics.map((topic, index) => (
        <Card key={topic.id} className={`${
          theme === 'dark' 
            ? 'bg-gray-800/50 border-gray-700/50' 
            : 'bg-white border-gray-200'
        } border`}>
          <CardBody className="p-6 space-y-4">
            <div className="flex items-center gap-4">
              <Input
                label="Topic Name"
                value={topic.topic_name}
                onChange={(e) => handleChange(index, 'topic_name', e.target.value)}
                startContent={<Tag className="w-4 h-4 text-gray-400" />}
                className="flex-grow"
                classNames={{
                  input: `${theme === 'dark' ? 'bg-gray-700/50 text-white' : 'bg-gray-100 text-gray-900'}`,
                  inputWrapper: `${theme === 'dark' ? 'bg-gray-700/50 border-gray-600' : 'bg-gray-100 border-gray-300'}`
                }}
              />
              <Input
                type="number"
                label="Relevance %"
                value={topic.relevance}
                onChange={(e) => handleChange(index, 'relevance', e.target.value)}
                className="w-32"
                classNames={{
                  input: `${theme === 'dark' ? 'bg-gray-700/50 text-white' : 'bg-gray-100 text-gray-900'}`,
                  inputWrapper: `${theme === 'dark' ? 'bg-gray-700/50 border-gray-600' : 'bg-gray-100 border-gray-300'}`
                }}
              />
              <Button
                isIconOnly
                color="danger"
                variant="light"
                onClick={() => handleRemove(index)}
              >
                <Trash2 className="w-4 h-4" />
              </Button>
            </div>

            <div>
              <div className="flex justify-between text-sm mb-2">
                <span className={theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}>
                  Relevance
                </span>
                <span className={theme === 'dark' ? 'text-white' : 'text-gray-900'}>
                  {topic.relevance}%
                </span>
              </div>
              <input
                type="range"
                min="0"
                max="100"
                value={topic.relevance}
                onChange={(e) => handleChange(index, 'relevance', parseInt(e.target.value))}
                className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer"
              />
            </div>
          </CardBody>
        </Card>
      ))}

      <Button
        startContent={<Plus className="w-4 h-4" />}
        className="w-full bg-primary text-white"
        onClick={handleAdd}
      >
        Add Topic
      </Button>
    </div>
  );
};

export default EditTopics;