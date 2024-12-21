import React from 'react';
import { Card, CardBody, Button } from "@nextui-org/react";
import { Download, FileText, Brain, Target, Lightbulb, ArrowRight } from 'lucide-react';
import { useTheme } from '../../../../contexts/ThemeContext';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

interface DetailedPoint {
  title: string;
  content: string;
}

interface FullContentProps {
  content: {
    title: string;
    description: string;
    sections: {
      title: string;
      content: string;
      key_points?: string[];
      detailed_points?: DetailedPoint[];
      takeaways?: string[];
    }[];
  };
}

const FullContent = ({ content }: FullContentProps) => {
  const { theme } = useTheme();

  const handleDownloadPDF = async () => {
    const contentElement = document.getElementById('full-content');
    if (!contentElement) return;

    try {
      const canvas = await html2canvas(contentElement, {
        scale: 2,
        backgroundColor: theme === 'dark' ? '#1A1A1A' : '#FFFFFF',
      });
      
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'px',
        format: [canvas.width, canvas.height]
      });

      pdf.addImage(imgData, 'PNG', 0, 0, canvas.width, canvas.height);
      pdf.save('podcast-content.pdf');
    } catch (error) {
      console.error('Error generating PDF:', error);
    }
  };

  return (
    <div className="space-y-8">
      {/* Header with Download Button */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className={`text-2xl font-bold ${
            theme === 'dark' ? 'text-white' : 'text-gray-900'
          }`}>{content.title}</h2>
          <p className={`mt-2 ${
            theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
          }`}>{content.description}</p>
        </div>
        <Button
          className="bg-primary text-white"
          startContent={<Download className="w-4 h-4" />}
          onClick={handleDownloadPDF}
        >
          Download PDF
        </Button>
      </div>

      {/* Main Content */}
      <div id="full-content" className="space-y-8">
        {content.sections.map((section, index) => (
          <Card key={index} className={`${
            theme === 'dark' 
              ? 'bg-gray-800/50 border-gray-700/50' 
              : 'bg-white border-gray-200'
          } border`}>
            <CardBody className="p-6">
              {/* Section Header */}
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-primary/10 rounded-lg">
                  {index === 0 ? (
                    <FileText className="w-5 h-5 text-primary" />
                  ) : index === 1 ? (
                    <Brain className="w-5 h-5 text-primary" />
                  ) : index === 2 ? (
                    <Target className="w-5 h-5 text-primary" />
                  ) : (
                    <Lightbulb className="w-5 h-5 text-primary" />
                  )}
                </div>
                <h3 className={`text-xl font-semibold ${
                  theme === 'dark' ? 'text-white' : 'text-gray-900'
                }`}>{section.title}</h3>
              </div>

              {/* Section Content */}
              <div className="space-y-4">
                <p className={theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}>
                  {section.content}
                </p>

                {/* Key Points with Detailed Explanations */}
                {section.key_points && (
                  <div className="mt-6 space-y-6">
                    <h4 className={`font-medium mb-3 ${
                      theme === 'dark' ? 'text-white' : 'text-gray-900'
                    }`}>Key Points</h4>
                    <div className="space-y-6">
                      {section.key_points.map((point, i) => (
                        <div key={i} className="space-y-3">
                          <div className="flex items-center gap-2">
                            <ArrowRight className="w-4 h-4 text-primary flex-shrink-0" />
                            <span className={theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}>
                              {point}
                            </span>
                          </div>
                          {section.detailed_points && section.detailed_points[i] && (
                            <div className={`ml-6 p-4 rounded-lg ${
                              theme === 'dark' ? 'bg-gray-700/30' : 'bg-gray-100'
                            }`}>
                              <h5 className={`font-medium mb-2 ${
                                theme === 'dark' ? 'text-white' : 'text-gray-900'
                              }`}>{section.detailed_points[i].title}</h5>
                              <p className={theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}>
                                {section.detailed_points[i].content}
                              </p>
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Key Takeaways */}
                {section.takeaways && (
                  <div className="mt-6">
                    <h4 className={`font-medium mb-3 ${
                      theme === 'dark' ? 'text-white' : 'text-gray-900'
                    }`}>Key Takeaways</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {section.takeaways.map((takeaway, i) => (
                        <div key={i} className="flex items-center gap-2">
                          <div className="w-1.5 h-1.5 rounded-full bg-primary flex-shrink-0" />
                          <span className={theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}>
                            {takeaway}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </CardBody>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default FullContent;