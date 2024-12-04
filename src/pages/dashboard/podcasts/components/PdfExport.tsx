import React, { useState } from 'react';
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, Checkbox, Progress } from "@nextui-org/react";
import { FileText, Download } from 'lucide-react';
import { useTheme } from '../../../../contexts/ThemeContext';

interface PdfExportProps {
  isOpen: boolean;
  onClose: () => void;
  podcast: {
    title: string;
    description: string;
    keyMoments: Array<{
      title: string;
      summary: string;
      insights: string[];
    }>;
  };
}

const PdfExport = ({ isOpen, onClose, podcast }: PdfExportProps) => {
  const [selectedSections, setSelectedSections] = useState<string[]>([
    'summary',
    'keyMoments',
    'insights',
    'notes'
  ]);
  const [isExporting, setIsExporting] = useState(false);
  const [exportProgress, setExportProgress] = useState(0);
  const { theme } = useTheme();

  const sections = [
    { id: 'summary', label: 'Podcast Summary' },
    { id: 'keyMoments', label: 'Key Moments' },
    { id: 'insights', label: 'AI-Generated Insights' },
    { id: 'notes', label: 'My Notes' },
    { id: 'transcript', label: 'Full Transcript' }
  ];

  const handleExport = async () => {
    setIsExporting(true);
    
    // Simulate export progress
    for (let i = 0; i <= 100; i += 10) {
      await new Promise(resolve => setTimeout(resolve, 200));
      setExportProgress(i);
    }
    
    setIsExporting(false);
    onClose();
  };

  return (
    <Modal 
      isOpen={isOpen} 
      onClose={onClose}
      size="2xl"
      classNames={{
        base: `${theme === 'dark' ? 'bg-gray-800' : 'bg-white'} text-${theme === 'dark' ? 'white' : 'black'}`,
        closeButton: `${theme === 'dark' ? 'text-white hover:bg-gray-700' : 'text-gray-500 hover:bg-gray-100'}`
      }}
    >
      <ModalContent>
        <ModalHeader className="flex flex-col gap-1">
          <h2 className={`text-2xl ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
            Export as PDF
          </h2>
          <p className={theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}>
            Choose the sections you want to include in your PDF
          </p>
        </ModalHeader>
        <ModalBody>
          <div className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              {sections.map((section) => (
                <div
                  key={section.id}
                  className={`p-4 rounded-lg border ${
                    theme === 'dark'
                      ? 'bg-gray-700/30 border-gray-600'
                      : 'bg-gray-50 border-gray-200'
                  }`}
                >
                  <Checkbox
                    value={section.id}
                    isSelected={selectedSections.includes(section.id)}
                    onValueChange={(isSelected) => {
                      if (isSelected) {
                        setSelectedSections([...selectedSections, section.id]);
                      } else {
                        setSelectedSections(selectedSections.filter(id => id !== section.id));
                      }
                    }}
                    classNames={{
                      wrapper: theme === 'dark' ? "before:border-gray-600" : "before:border-gray-300"
                    }}
                  >
                    {section.label}
                  </Checkbox>
                </div>
              ))}
            </div>

            <div className={`p-4 rounded-lg ${
              theme === 'dark' ? 'bg-gray-700/30' : 'bg-gray-50'
            }`}>
              <div className="flex items-center gap-3 mb-4">
                <FileText className="w-5 h-5 text-primary" />
                <h3 className={`font-medium ${
                  theme === 'dark' ? 'text-white' : 'text-gray-900'
                }`}>PDF Preview</h3>
              </div>
              <div className={theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}>
                <p className="mb-2">{podcast.title}</p>
                <p className="text-sm">{podcast.description}</p>
              </div>
            </div>

            {isExporting && (
              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span className={theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}>
                    Generating PDF...
                  </span>
                  <span className={theme === 'dark' ? 'text-white' : 'text-gray-900'}>
                    {exportProgress}%
                  </span>
                </div>
                <Progress 
                  value={exportProgress} 
                  color="primary"
                  className="max-w-full"
                />
              </div>
            )}
          </div>
        </ModalBody>
        <ModalFooter>
          <Button
            color="danger"
            variant="flat"
            onPress={onClose}
          >
            Cancel
          </Button>
          <Button
            color="primary"
            startContent={<Download className="w-4 h-4" />}
            onPress={handleExport}
            isLoading={isExporting}
          >
            Export PDF
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default PdfExport;