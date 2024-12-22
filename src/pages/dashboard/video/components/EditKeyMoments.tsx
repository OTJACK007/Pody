import React from 'react';
import { Card, CardBody, Button, Input, Textarea } from "@nextui-org/react";
import { Plus, Trash2, Clock } from 'lucide-react';
import { useTheme } from '../../../../contexts/ThemeContext';
import type { KeyMoment } from '../../../../types/video';

interface EditKeyMomentsProps {
  keyMoments: KeyMoment[];
  onChange: (newKeyMoments: KeyMoment[]) => void;
}

const EditKeyMoments = ({ keyMoments, onChange }: EditKeyMomentsProps) => {
  const { theme } = useTheme();

  const handleAdd = () => {
    onChange([
      ...keyMoments,
      {
        id: crypto.randomUUID(),
        video_id: keyMoments[0]?.video_id || '',
        timestamp: '00:00:00',
        title: '',
        summary: ''
      }
    ]);
  };

  const handleRemove = (index: number) => {
    onChange(keyMoments.filter((_, i) => i !== index));
  };

  const handleChange = (index: number, field: keyof KeyMoment, value: string) => {
    onChange(
      keyMoments.map((moment, i) => 
        i === index ? { ...moment, [field]: value } : moment
      )
    );
  };

  return (
    <div className="space-y-6">
      {keyMoments.map((moment, index) => (
        <Card key={moment.id} className={`${
          theme === 'dark' 
            ? 'bg-gray-800/50 border-gray-700/50' 
            : 'bg-white border-gray-200'
        } border`}>
          <CardBody className="p-6 space-y-4">
            <div className="flex items-center gap-4">
              <Input
                label="Timestamp"
                value={moment.timestamp}
                onChange={(e) => handleChange(index, 'timestamp', e.target.value)}
                startContent={<Clock className="w-4 h-4 text-gray-400" />}
                className="max-w-[150px]"
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

            <Input
              label="Title"
              value={moment.title}
              onChange={(e) => handleChange(index, 'title', e.target.value)}
              classNames={{
                input: `${theme === 'dark' ? 'bg-gray-700/50 text-white' : 'bg-gray-100 text-gray-900'}`,
                inputWrapper: `${theme === 'dark' ? 'bg-gray-700/50 border-gray-600' : 'bg-gray-100 border-gray-300'}`
              }}
            />

            <Textarea
              label="Summary"
              value={moment.summary || ''}
              onChange={(e) => handleChange(index, 'summary', e.target.value)}
              classNames={{
                input: `${theme === 'dark' ? 'bg-gray-700/50 text-white' : 'bg-gray-100 text-gray-900'}`,
                inputWrapper: `${theme === 'dark' ? 'bg-gray-700/50 border-gray-600' : 'bg-gray-100 border-gray-300'}`
              }}
            />
          </CardBody>
        </Card>
      ))}

      <Button
        startContent={<Plus className="w-4 h-4" />}
        className="w-full bg-primary text-white"
        onClick={handleAdd}
      >
        Add Key Moment
      </Button>
    </div>
  );
};

export default EditKeyMoments;