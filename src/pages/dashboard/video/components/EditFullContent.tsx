import React from 'react';
import { Card, CardBody, Button, Input, Textarea } from "@nextui-org/react";
import { Plus, Trash2 } from 'lucide-react';
import { useTheme } from '../../../../contexts/ThemeContext';
import type { FullContent } from '../../../../types/video';

interface EditFullContentProps {
  fullContent: FullContent;
  onChange: (newFullContent: FullContent) => void;
}

const EditFullContent = ({ fullContent, onChange }: EditFullContentProps) => {
  const { theme } = useTheme();

  const handleAddSection = () => {
    onChange({
      ...fullContent,
      sections: [
        ...fullContent.sections,
        {
          title: '',
          content: '',
          key_points: [],
          detailed_points: []
        }
      ]
    });
  };

  const handleRemoveSection = (index: number) => {
    onChange({
      ...fullContent,
      sections: fullContent.sections.filter((_, i) => i !== index)
    });
  };

  const handleSectionChange = (index: number, field: string, value: any) => {
    onChange({
      ...fullContent,
      sections: fullContent.sections.map((section, i) => 
        i === index ? { ...section, [field]: value } : section
      )
    });
  };

  const handleAddKeyPoint = (sectionIndex: number) => {
    onChange({
      ...fullContent,
      sections: fullContent.sections.map((section, i) => 
        i === sectionIndex ? {
          ...section,
          key_points: [...(section.key_points || []), '']
        } : section
      )
    });
  };

  const handleAddDetailedPoint = (sectionIndex: number) => {
    onChange({
      ...fullContent,
      sections: fullContent.sections.map((section, i) => 
        i === sectionIndex ? {
          ...section,
          detailed_points: [...(section.detailed_points || []), { title: '', content: '' }]
        } : section
      )
    });
  };

  return (
    <div className="space-y-6">
      <Card className={`${
        theme === 'dark' 
          ? 'bg-gray-800/50 border-gray-700/50' 
          : 'bg-white border-gray-200'
      } border`}>
        <CardBody className="p-6 space-y-4">
          <Input
            label="Title"
            value={fullContent.title}
            onChange={(e) => onChange({ ...fullContent, title: e.target.value })}
            classNames={{
              input: `${theme === 'dark' ? 'bg-gray-700/50 text-white' : 'bg-gray-100 text-gray-900'}`,
              inputWrapper: `${theme === 'dark' ? 'bg-gray-700/50 border-gray-600' : 'bg-gray-100 border-gray-300'}`
            }}
          />

          <Textarea
            label="Description"
            value={fullContent.description || ''}
            onChange={(e) => onChange({ ...fullContent, description: e.target.value })}
            classNames={{
              input: `${theme === 'dark' ? 'bg-gray-700/50 text-white' : 'bg-gray-100 text-gray-900'}`,
              inputWrapper: `${theme === 'dark' ? 'bg-gray-700/50 border-gray-600' : 'bg-gray-100 border-gray-300'}`
            }}
          />
        </CardBody>
      </Card>

      {fullContent.sections.map((section, sectionIndex) => (
        <Card key={sectionIndex} className={`${
          theme === 'dark' 
            ? 'bg-gray-800/50 border-gray-700/50' 
            : 'bg-white border-gray-200'
        } border`}>
          <CardBody className="p-6 space-y-6">
            <div className="flex items-center gap-4">
              <Input
                label="Section Title"
                value={section.title}
                onChange={(e) => handleSectionChange(sectionIndex, 'title', e.target.value)}
                classNames={{
                  input: `${theme === 'dark' ? 'bg-gray-700/50 text-white' : 'bg-gray-100 text-gray-900'}`,
                  inputWrapper: `${theme === 'dark' ? 'bg-gray-700/50 border-gray-600' : 'bg-gray-100 border-gray-300'}`
                }}
              />
              <Button
                isIconOnly
                color="danger"
                variant="light"
                onClick={() => handleRemoveSection(sectionIndex)}
              >
                <Trash2 className="w-4 h-4" />
              </Button>
            </div>

            <Textarea
              label="Content"
              value={section.content}
              onChange={(e) => handleSectionChange(sectionIndex, 'content', e.target.value)}
              classNames={{
                input: `${theme === 'dark' ? 'bg-gray-700/50 text-white' : 'bg-gray-100 text-gray-900'}`,
                inputWrapper: `${theme === 'dark' ? 'bg-gray-700/50 border-gray-600' : 'bg-gray-100 border-gray-300'}`
              }}
            />

            <div className="space-y-4">
              <h4 className={`font-medium ${
                theme === 'dark' ? 'text-white' : 'text-gray-900'
              }`}>Key Points</h4>
              {section.key_points?.map((point, pointIndex) => (
                <div key={pointIndex} className="flex items-center gap-4">
                  <Input
                    value={point}
                    onChange={(e) => handleSectionChange(
                      sectionIndex,
                      'key_points',
                      section.key_points?.map((p, i) => i === pointIndex ? e.target.value : p)
                    )}
                    classNames={{
                      input: `${theme === 'dark' ? 'bg-gray-700/50 text-white' : 'bg-gray-100 text-gray-900'}`,
                      inputWrapper: `${theme === 'dark' ? 'bg-gray-700/50 border-gray-600' : 'bg-gray-100 border-gray-300'}`
                    }}
                  />
                  <Button
                    isIconOnly
                    color="danger"
                    variant="light"
                    onClick={() => handleSectionChange(
                      sectionIndex,
                      'key_points',
                      section.key_points?.filter((_, i) => i !== pointIndex)
                    )}
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              ))}
              <Button
                startContent={<Plus className="w-4 h-4" />}
                className="w-full bg-primary/20 text-primary"
                onClick={() => handleAddKeyPoint(sectionIndex)}
              >
                Add Key Point
              </Button>
            </div>

            <div className="space-y-4">
              <h4 className={`font-medium ${
                theme === 'dark' ? 'text-white' : 'text-gray-900'
              }`}>Detailed Points</h4>
              {section.detailed_points?.map((point, pointIndex) => (
                <div key={pointIndex} className="space-y-4">
                  <div className="flex items-center gap-4">
                    <Input
                      label="Title"
                      value={point.title}
                      onChange={(e) => handleSectionChange(
                        sectionIndex,
                        'detailed_points',
                        section.detailed_points?.map((p, i) => 
                          i === pointIndex ? { ...p, title: e.target.value } : p
                        )
                      )}
                      classNames={{
                        input: `${theme === 'dark' ? 'bg-gray-700/50 text-white' : 'bg-gray-100 text-gray-900'}`,
                        inputWrapper: `${theme === 'dark' ? 'bg-gray-700/50 border-gray-600' : 'bg-gray-100 border-gray-300'}`
                      }}
                    />
                    <Button
                      isIconOnly
                      color="danger"
                      variant="light"
                      onClick={() => handleSectionChange(
                        sectionIndex,
                        'detailed_points',
                        section.detailed_points?.filter((_, i) => i !== pointIndex)
                      )}
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                  <Textarea
                    label="Content"
                    value={point.content}
                    onChange={(e) => handleSectionChange(
                      sectionIndex,
                      'detailed_points',
                      section.detailed_points?.map((p, i) => 
                        i === pointIndex ? { ...p, content: e.target.value } : p
                      )
                    )}
                    classNames={{
                      input: `${theme === 'dark' ? 'bg-gray-700/50 text-white' : 'bg-gray-100 text-gray-900'}`,
                      inputWrapper: `${theme === 'dark' ? 'bg-gray-700/50 border-gray-600' : 'bg-gray-100 border-gray-300'}`
                    }}
                  />
                </div>
              ))}
              <Button
                startContent={<Plus className="w-4 h-4" />}
                className="w-full bg-primary/20 text-primary"
                onClick={() => handleAddDetailedPoint(sectionIndex)}
              >
                Add Detailed Point
              </Button>
            </div>
          </CardBody>
        </Card>
      ))}

      <Button
        startContent={<Plus className="w-4 h-4" />}
        className="w-full bg-primary text-white"
        onClick={handleAddSection}
      >
        Add Section
      </Button>
    </div>
  );
};

export default EditFullContent;