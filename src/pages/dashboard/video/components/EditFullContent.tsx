import React from 'react';
import { Card, CardBody, Button, Input, Textarea } from "@nextui-org/react";
import { Plus, Trash2 } from 'lucide-react';
import { useTheme } from '../../../../contexts/ThemeContext';
import type { FullContent } from '../../../../types/video';

interface EditFullContentProps {
  fullContent: {
    title: string;
    description: string;
    overview_section: {
      title: string;
      content: string;
      key_points?: string[];
      detailed_points?: DetailedPoint[];
    }[];
    deepdive_section: {
      title: string;
      content: string;
      key_points?: string[];
      detailed_points?: DetailedPoint[];
    }[];
  };
  onChange: (newFullContent: FullContent) => void;
}

const EditFullContent = ({ fullContent, onChange }: EditFullContentProps) => {
  const { theme } = useTheme();

  const handleAddOverviewSection = () => {
    onChange({
      ...fullContent,
      overview_section: [
        ...fullContent.overview_section,
        {
          title: '',
          content: '',
          key_points: [],
          detailed_points: []
        }
      ]
    });
  };

  const handleAddDeepDiveSection = () => {
    onChange({
      ...fullContent,
      deepdive_section: [
        ...fullContent.deepdive_section,
        {
          title: '',
          content: '',
          key_points: [],
          detailed_points: []
        }
      ]
    });
  };

  const handleRemoveOverviewSection = (index: number) => {
    onChange({
      ...fullContent,
      overview_section: fullContent.overview_section.filter((_, i) => i !== index)
    });
  };

  const handleRemoveDeepDiveSection = (index: number) => {
    onChange({
      ...fullContent,
      deepdive_section: fullContent.deepdive_section.filter((_, i) => i !== index)
    });
  };

  const handleSectionChange = (type: 'overview' | 'deepdive', index: number, field: string, value: any) => {
    const sectionKey = type === 'overview' ? 'overview_section' : 'deepdive_section';
    onChange({
      ...fullContent,
      [sectionKey]: fullContent[sectionKey].map((section, i) => 
        i === index ? { ...section, [field]: value } : section
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

      {/* Overview Sections */}
      <h3 className={`text-xl font-semibold mb-4 ${
        theme === 'dark' ? 'text-white' : 'text-gray-900'
      }`}>Overview Sections</h3>
      
      {fullContent.overview_section.map((section, index) => (
        <Card key={section.id} className={`${
          theme === 'dark' 
            ? 'bg-gray-800/50 border-gray-700/50' 
            : 'bg-white border-gray-200'
        } border`}>
          <CardBody className="p-6 space-y-6">
            <div className="flex items-center gap-4">
              <Input
                label="Section Title"
                value={section.title}
                onChange={(e) => handleSectionChange('overview', index, 'title', e.target.value)}
                classNames={{
                  input: `${theme === 'dark' ? 'bg-gray-700/50 text-white' : 'bg-gray-100 text-gray-900'}`,
                  inputWrapper: `${theme === 'dark' ? 'bg-gray-700/50 border-gray-600' : 'bg-gray-100 border-gray-300'}`
                }}
              />
              <Button
                isIconOnly
                color="danger"
                variant="light"
                onClick={() => handleRemoveOverviewSection(index)}
              >
                <Trash2 className="w-4 h-4" />
              </Button>
            </div>

            <Textarea
              label="Content"
              value={section.content}
              onChange={(e) => handleSectionChange('overview', index, 'content', e.target.value)}
              classNames={{
                input: `${theme === 'dark' ? 'bg-gray-700/50 text-white' : 'bg-gray-100 text-gray-900'}`,
                inputWrapper: `${theme === 'dark' ? 'bg-gray-700/50 border-gray-600' : 'bg-gray-100 border-gray-300'}`
              }}
            />

            <div className="space-y-4">
              <h4 className={`font-medium mb-2 ${
                theme === 'dark' ? 'text-white' : 'text-gray-900'
              }`}>Key Points</h4>
              {section.key_points?.map((point, pointIndex) => (
                <div key={pointIndex} className="flex items-center gap-4">
                  <Input
                    value={point}
                    onChange={(e) => handleSectionChange(
                      'overview',
                      index,
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
                      'overview',
                      index,
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
                onClick={() => handleSectionChange('overview', index, 'key_points', [...(section.key_points || []), ''])}
              >
                Add Key Point
              </Button>
            </div>

            <div className="space-y-4">
              <h4 className={`font-medium mb-2 ${
                theme === 'dark' ? 'text-white' : 'text-gray-900'
              }`}>Detailed Points</h4>
              {section.detailed_points?.map((point, pointIndex) => (
                <div key={pointIndex} className="space-y-4">
                  <div className="flex items-center gap-4">
                    <Input
                      label="Title"
                      value={point.title}
                      onChange={(e) => handleSectionChange(
                        'overview',
                        index,
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
                      onClick={() => handleSectionChange('overview', index,
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
                      'overview',
                      index,
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
                onClick={() => handleSectionChange('overview', index, 'detailed_points', [...(section.detailed_points || []), { title: '', content: '' }])}
              >
                Add Detailed Point
              </Button>
            </div>
          </CardBody>
        </Card>
      ))}

      {/* Add Overview Section Button */}
      <Button
        startContent={<Plus className="w-4 h-4" />}
        className="w-full bg-primary text-white"
        onClick={handleAddOverviewSection}
      >
        Add Overview Section
      </Button>

      {/* Deep Dive Sections */}
      <h3 className={`text-xl font-semibold mt-8 mb-4 ${
        theme === 'dark' ? 'text-white' : 'text-gray-900'
      }`}>Deep Dive Sections</h3>
      
      {fullContent.deepdive_section.map((section, index) => (
        <Card key={`deepdive-${index}`} className={`${
          theme === 'dark' 
            ? 'bg-gray-800/50 border-gray-700/50' 
            : 'bg-white border-gray-200'
        } border`}>
          <CardBody className="p-6 space-y-6">
            <div className="flex items-center gap-4">
              <Input
                label="Section Title"
                value={section.title}
                onChange={(e) => handleSectionChange('deepdive', index, 'title', e.target.value)}
                classNames={{
                  input: `${theme === 'dark' ? 'bg-gray-700/50 text-white' : 'bg-gray-100 text-gray-900'}`,
                  inputWrapper: `${theme === 'dark' ? 'bg-gray-700/50 border-gray-600' : 'bg-gray-100 border-gray-300'}`
                }}
              />
              <Button
                isIconOnly
                color="danger"
                variant="light"
                onClick={() => handleRemoveDeepDiveSection(index)}
              >
                <Trash2 className="w-4 h-4" />
              </Button>
            </div>

            <Textarea
              label="Content"
              value={section.content}
              onChange={(e) => handleSectionChange('deepdive', index, 'content', e.target.value)}
              classNames={{
                input: `${theme === 'dark' ? 'bg-gray-700/50 text-white' : 'bg-gray-100 text-gray-900'}`,
                inputWrapper: `${theme === 'dark' ? 'bg-gray-700/50 border-gray-600' : 'bg-gray-100 border-gray-300'}`
              }}
            />

            <div className="space-y-4">
              <h4 className={`font-medium mb-2 ${
                theme === 'dark' ? 'text-white' : 'text-gray-900'
              }`}>Deep Dive Points</h4>
              {section.key_points?.map((point, pointIndex) => (
                <div key={pointIndex} className="flex items-center gap-4">
                  <Input
                    value={point}
                    onChange={(e) => handleSectionChange(
                      'deepdive',
                      index,
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
                      'deepdive',
                      index,
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
                onClick={() => handleSectionChange('deepdive', index, 'key_points', [...(section.key_points || []), ''])}
              >
                Add Deep Dive Point
              </Button>
            </div>

            <div className="space-y-4">
              <h4 className={`font-medium mb-2 ${
                theme === 'dark' ? 'text-white' : 'text-gray-900'
              }`}>Detailed Analysis</h4>
              {section.detailed_points?.map((point, pointIndex) => (
                <div key={pointIndex} className="space-y-4">
                  <div className="flex items-center gap-4">
                    <Input
                      label="Title"
                      value={point.title}
                      onChange={(e) => handleSectionChange(
                        'deepdive',
                        index,
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
                      onClick={() => handleSectionChange('deepdive', index,
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
                      'deepdive',
                      index,
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
                onClick={() => handleSectionChange('deepdive', index, 'detailed_points', [...(section.detailed_points || []), { title: '', content: '' }])}
              >
                Add Detailed Analysis
              </Button>
            </div>
          </CardBody>
        </Card>
      ))}

      {/* Add Deep Dive Section Button */}
      <Button
        startContent={<Plus className="w-4 h-4" />}
        className="w-full bg-secondary text-black"
        onClick={handleAddDeepDiveSection}
      >
        Add Deep Dive Section
      </Button>
    </div>
  );
};

export default EditFullContent;