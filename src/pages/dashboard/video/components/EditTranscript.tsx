import React from 'react';
import { Card, CardBody, Button, Input } from "@nextui-org/react";
import { Plus, Trash2, Clock, User } from 'lucide-react';
import { useTheme } from '../../../../contexts/ThemeContext';
import type { Transcript } from '../../../../types/video';

interface EditTranscriptProps {
  transcript: {
    time: string;
    speaker: string;
    text: string;
  }[];
  onChange: (newTranscript: {time: string; speaker: string; text: string}[]) => void;
}

const EditTranscript = ({ transcript, onChange }: EditTranscriptProps) => {
  const { theme } = useTheme();

  const handleAdd = () => {
    onChange([
      ...transcript,
      {  
        time: '00:00:00',
        speaker: '',
        text: ''
      }
    ]);
  };

  const handleRemove = (index: number) => {
    onChange(transcript.filter((_, i) => i !== index));
  };

  const handleChange = (index: number, field: keyof Transcript, value: string) => {
    onChange(
      transcript.map((entry, i) => 
        i === index ? { ...entry, [field]: value } : entry
      )
    );
  };

  return (
    <div className="space-y-6">
      {transcript.map((entry, index) => (
        <Card key={entry.id} className={`${
          theme === 'dark' 
            ? 'bg-gray-800/50 border-gray-700/50' 
            : 'bg-white border-gray-200'
        } border`}>
          <CardBody className="p-6 space-y-4">
            <div className="flex items-center gap-4">
              <Input
                label="Time"
                value={entry.time}
                onChange={(e) => handleChange(index, 'time', e.target.value)}
                startContent={<Clock className="w-4 h-4 text-gray-400" />}
                className="max-w-[150px]"
                classNames={{
                  input: `${theme === 'dark' ? 'bg-gray-700/50 text-white' : 'bg-gray-100 text-gray-900'}`,
                  inputWrapper: `${theme === 'dark' ? 'bg-gray-700/50 border-gray-600' : 'bg-gray-100 border-gray-300'}`
                }}
              />
              <Input
                label="Speaker"
                value={entry.speaker || ''}
                onChange={(e) => handleChange(index, 'speaker', e.target.value)}
                startContent={<User className="w-4 h-4 text-gray-400" />}
                className="max-w-[200px]"
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
              label="Text"
              value={entry.text}
              onChange={(e) => handleChange(index, 'text', e.target.value)}
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
        Add Transcript Entry
      </Button>
    </div>
  );
};

export default EditTranscript;