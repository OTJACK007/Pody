import React from 'react';
import { Card, CardBody, Button, Accordion, AccordionItem } from "@nextui-org/react";
import { Download, FileText, Brain, Target, Lightbulb, ArrowRight, NotebookPen } from 'lucide-react';
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
    overview_section: {
      title: string;
      content: string;
      key_points?: string[];
      detailed_points?: DetailedPoint[];
      takeaways?: string[];
    }[];
    deepdive_section: {
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
    
    const margin = 15; // 15mm margins
    const pageWidth = 210; // A4 width in mm
    const pageHeight = 297; // A4 height in mm
    const contentWidth = pageWidth - (margin * 2);

    try {
      const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: 'a4',
        putOnlyUsedFonts: true
      });

      // Helper function to add page if needed
      const checkNewPage = (currentY: number, neededSpace: number = 10) => {
        if (currentY + neededSpace > pageHeight - margin) {
          pdf.addPage();
          return margin;
        }
        return currentY;
      };

      // Set fonts
      pdf.setFont("helvetica", "bold");

      // Add Shogun360 logo
      pdf.addImage(
        "https://static.wixstatic.com/media/c67dd6_b7e5b2d0f9674dca825d7205afa240ae~mv2.png",
        'PNG',
        margin,
        10,
        60,
        25
      );

      // Add header line
      pdf.setDrawColor(230, 230, 230);
      pdf.line(margin, margin + 35, pageWidth - margin, margin + 35);

      // Add title with styling
      pdf.setFontSize(24);
      pdf.setTextColor(255, 51, 102); // Primary color
      let yPos = margin + 45;
      const titleLines = pdf.splitTextToSize(content.title, contentWidth);
      pdf.text(titleLines, margin, yPos);
      yPos += (titleLines.length * 10) + 5;
      
      // Add description
      pdf.setFont("helvetica", "normal");
      pdf.setFontSize(12);
      pdf.setTextColor(102, 102, 102);
      const descLines = pdf.splitTextToSize(content.description || '', contentWidth);
      pdf.text(descLines, margin, yPos);
      yPos += (descLines.length * 7) + 10;
      
      // Add section divider
      pdf.setDrawColor(230, 230, 230);
      pdf.line(margin, yPos, pageWidth - margin, yPos);
      yPos += 10;
      
      // Add Overview Sections
      pdf.setFont("helvetica", "bold");
      pdf.setFontSize(18);
      pdf.setTextColor(255, 51, 102); // Primary color
      pdf.text('Overview', margin, yPos);
      yPos += 10;

      content.overview_section?.forEach((section, index) => {
        yPos = checkNewPage(yPos, 40);

        // Section title with styling
        pdf.setFont("helvetica", "bold");
        pdf.setFontSize(16);
        pdf.setTextColor(255, 51, 102); // Primary color
        pdf.text(section.title, margin, yPos);
        yPos += 8;
        
        // Section content
        pdf.setFont("helvetica", "normal");
        pdf.setFontSize(12);
        pdf.setTextColor(68, 68, 68);
        const contentLines = pdf.splitTextToSize(section.content, contentWidth);
        pdf.text(contentLines, margin, yPos);
        yPos += (contentLines.length * 6) + 5;
        
        // Key points
        if (section.key_points?.length) {
          yPos = checkNewPage(yPos, 20);
          pdf.setFont("helvetica", "bold");
          pdf.setFontSize(14);
          pdf.setTextColor(255, 51, 102); // Primary color
          pdf.text('Key Points:', margin, yPos);
          yPos += 7;
          
          section.key_points.forEach(point => {
            yPos = checkNewPage(yPos, 10);
            pdf.setFont("helvetica", "normal");
            pdf.setFontSize(12);
            pdf.setTextColor(68, 68, 68);
            const bulletPoint = '• ' + point;
            const pointLines = pdf.splitTextToSize(bulletPoint, contentWidth - 5);
            pdf.text(pointLines, margin + 5, yPos);
            yPos += (pointLines.length * 6);
          });
          yPos += 5;
        }
      });
      
      // Add Deep Dive Sections
      yPos = checkNewPage(yPos, 40);
      pdf.setDrawColor(230, 230, 230);
      pdf.line(margin, yPos, pageWidth - margin, yPos);
      yPos += 10;

      pdf.setFont("helvetica", "bold");
      pdf.setFontSize(18);
      pdf.setTextColor(46, 255, 148); // Secondary color
      pdf.text('Deep Dive Analysis', margin, yPos);
      yPos += 10;

      content.deepdive_section?.forEach((section, index) => {
        yPos = checkNewPage(yPos, 40);
        
        // Section title
        pdf.setFont("helvetica", "bold");
        pdf.setFontSize(16);
        pdf.setTextColor(255, 51, 102); // Primary color
        pdf.text(section.title, margin, yPos);
        yPos += 8;
        
        // Section content
        pdf.setFont("helvetica", "normal");
        pdf.setFontSize(12);
        pdf.setTextColor(68, 68, 68);
        const contentLines = pdf.splitTextToSize(section.content, contentWidth);
        pdf.text(contentLines, margin, yPos);
        yPos += (contentLines.length * 6) + 5;
        
        // Key points
        if (section.key_points?.length) {
          yPos = checkNewPage(yPos, 20);
          pdf.setFont("helvetica", "bold");
          pdf.setFontSize(14);
          pdf.setTextColor(46, 255, 148); // Secondary color
          pdf.text('Deep Dive Points:', margin, yPos);
          yPos += 7;
          
          section.key_points.forEach(point => {
            yPos = checkNewPage(yPos, 10);
            pdf.setFont("helvetica", "normal");
            pdf.setFontSize(12);
            pdf.setTextColor(68, 68, 68);
            const bulletPoint = '• ' + point;
            const pointLines = pdf.splitTextToSize(bulletPoint, contentWidth - 5);
            pdf.text(pointLines, margin + 5, yPos);
            yPos += (pointLines.length * 6);
          });
          yPos += 5;
        }
      });

      // Add footer to each page
      const pageCount = pdf.getNumberOfPages();
      for (let i = 1; i <= pageCount; i++) {
        pdf.setPage(i);
        pdf.setFontSize(10);
        pdf.setTextColor(128, 128, 128);
        pdf.text(`Page ${i} of ${pageCount}`, pageWidth/2, pageHeight - 10, { align: 'center' });
      }
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
        {/* Overview Section */}
        {content.overview_section?.map((section, index) => (
          <Card key={index} className={`${
            theme === 'dark' 
              ? 'bg-gray-800/50 border-gray-700/50' 
              : 'bg-white border-gray-200'
          } border`}>
            <CardBody className="p-6">
              {/* Section Header */}
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
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
                <Button
                  startContent={
                    <img 
                      src="https://static.wixstatic.com/media/c67dd6_c0f6b842de844dff9ac8e0e71e7e5a18~mv2.png"
                      alt="Notion"
                      className="w-4 h-4"
                    />
                  }
                  className="bg-primary text-white"
                >
                  Extract to Notion
                </Button>
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
        
        {/* Deep Dive Section */}
        <div className="space-y-4">
          <div className="flex items-center justify-between mb-4">
            <h3 className={`text-xl font-semibold ${
              theme === 'dark' ? 'text-white' : 'text-gray-900'
            }`}>Deep Dive Analysis</h3>
          </div>

          <Accordion>
            {content.deepdive_section?.map((section, index) => (
              <AccordionItem
                key={`deepdive-${index}`}
                aria-label={section.title}
                title={
                  <div className="flex items-center justify-between py-2">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-secondary/10 rounded-lg">
                        <Brain className="w-5 h-5 text-secondary" />
                      </div>
                      <span className={`text-lg font-semibold ${
                        theme === 'dark' ? 'text-white' : 'text-gray-900'
                      }`}>{section.title}</span>
                    </div>
                    <Button
                      size="sm"
                      startContent={
                        <img 
                          src="https://static.wixstatic.com/media/c67dd6_c0f6b842de844dff9ac8e0e71e7e5a18~mv2.png"
                          alt="Notion"
                          className="w-4 h-4"
                        />
                      }
                      className="bg-secondary text-black ml-4"
                      onClick={(e) => {
                        e.stopPropagation();
                        // Handle Notion extraction
                      }}
                    >
                      Extract to Notion
                    </Button>
                  </div>
                }
                classNames={{
                  content: "px-2",
                  title: "font-normal"
                }}
              >
                <Card className={`${
                  theme === 'dark' 
                    ? 'bg-gray-800/50 border-gray-700/50' 
                    : 'bg-white border-gray-200'
                } border`}>
                  <CardBody className="p-6">
                    <div className="space-y-4">
                      <p className={theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}>
                        {section.content}
                      </p>

                      {section.key_points && (
                        <div className="mt-6 space-y-6">
                          <h4 className={`font-medium mb-3 ${
                            theme === 'dark' ? 'text-white' : 'text-gray-900'
                          }`}>Deep Dive Points</h4>
                          <div className="space-y-6">
                            {section.key_points.map((point, i) => (
                              <div key={i} className="space-y-3">
                                <div className="flex items-center gap-2">
                                  <ArrowRight className="w-4 h-4 text-secondary flex-shrink-0" />
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
                    </div>
                  </CardBody>
                </Card>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </div>
  );
};

export default FullContent;