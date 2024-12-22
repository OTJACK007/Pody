import React from 'react';
import { Card, CardBody, Button, Input, Slider } from "@nextui-org/react";
import { Plus, Trash2, Brain } from 'lucide-react';
import { useTheme } from '../../../../contexts/ThemeContext';

interface AIAnalysis {
  key_takeaways: string[];
  content_quality: {
    insightDepth: number;
    actionability: number;
    relevance: number;
    clarity: number;
  };
  recommendations: string[];
}

interface EditAIAnalysisProps {
  analysis: AIAnalysis;
  onChange: (newAnalysis: AIAnalysis) => void;
}

const defaultAnalysis: AIAnalysis = {
  key_takeaways: [],
  content_quality: {
    insightDepth: 0,
    actionability: 0,
    relevance: 0,
    clarity: 0
  },
  recommendations: []
};
const EditAIAnalysis = ({ analysis = defaultAnalysis, onChange }: EditAIAnalysisProps) => {
  const { theme } = useTheme();

  // Ensure we have default values if analysis is null
  const safeAnalysis = analysis || defaultAnalysis;

  const handleAddTakeaway = () => {
    onChange({
      ...safeAnalysis,
      key_takeaways: [...safeAnalysis.key_takeaways, '']
    });
  };

  const handleRemoveTakeaway = (index: number) => {
    onChange({
      ...safeAnalysis,
      key_takeaways: safeAnalysis.key_takeaways.filter((_, i) => i !== index)
    });
  };

  const handleTakeawayChange = (index: number, value: string) => {
    onChange({
      ...safeAnalysis,
      key_takeaways: safeAnalysis.key_takeaways.map((takeaway, i) => 
        i === index ? value : takeaway
      )
    });
  };

  const handleQualityChange = (metric: keyof typeof analysis.content_quality, value: number) => {
    onChange({
      ...safeAnalysis,
      content_quality: {
        ...safeAnalysis.content_quality,
        [metric]: value
      }
    });
  };

  const handleAddRecommendation = () => {
    onChange({
      ...safeAnalysis,
      recommendations: [...safeAnalysis.recommendations, '']
    });
  };

  const handleRemoveRecommendation = (index: number) => {
    onChange({
      ...safeAnalysis,
      recommendations: safeAnalysis.recommendations.filter((_, i) => i !== index)
    });
  };

  const handleRecommendationChange = (index: number, value: string) => {
    onChange({
      ...safeAnalysis,
      recommendations: safeAnalysis.recommendations.map((rec, i) => 
        i === index ? value : rec
      )
    });
  };

  return (
    <div className="space-y-6">
      {/* Key Takeaways */}
      <Card className={`${
        theme === 'dark' 
          ? 'bg-gray-800/50 border-gray-700/50' 
          : 'bg-white border-gray-200'
      } border`}>
        <CardBody className="p-6 space-y-4">
          <h3 className={`text-lg font-semibold ${
            theme === 'dark' ? 'text-white' : 'text-gray-900'
          }`}>Key Takeaways</h3>
          
          {analysis.key_takeaways.map((takeaway, index) => (
            <div key={index} className="flex items-center gap-4">
              <Input
                value={takeaway}
                onChange={(e) => handleTakeawayChange(index, e.target.value)}
                classNames={{
                  input: `${theme === 'dark' ? 'bg-gray-700/50 text-white' : 'bg-gray-100 text-gray-900'}`,
                  inputWrapper: `${theme === 'dark' ? 'bg-gray-700/50 border-gray-600' : 'bg-gray-100 border-gray-300'}`
                }}
              />
              <Button
                isIconOnly
                color="danger"
                variant="light"
                onClick={() => handleRemoveTakeaway(index)}
              >
                <Trash2 className="w-4 h-4" />
              </Button>
            </div>
          ))}

          <Button
            startContent={<Plus className="w-4 h-4" />}
            className="w-full bg-primary/20 text-primary"
            onClick={handleAddTakeaway}
          >
            Add Takeaway
          </Button>
        </CardBody>
      </Card>

      {/* Content Quality */}
      <Card className={`${
        theme === 'dark' 
          ? 'bg-gray-800/50 border-gray-700/50' 
          : 'bg-white border-gray-200'
      } border`}>
        <CardBody className="p-6 space-y-4">
          <h3 className={`text-lg font-semibold ${
            theme === 'dark' ? 'text-white' : 'text-gray-900'
          }`}>Content Quality</h3>

          <div className="space-y-6">
            {Object.entries(analysis.content_quality).map(([metric, value]) => (
              <div key={metric}>
                <div className="flex justify-between text-sm mb-2">
                  <span className={theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}>
                    {metric.charAt(0).toUpperCase() + metric.slice(1)}
                  </span>
                  <span className={theme === 'dark' ? 'text-white' : 'text-gray-900'}>
                    {value}%
                  </span>
                </div>
                <Slider
                  size="sm"
                  step={1}
                  minValue={0}
                  maxValue={100}
                  value={value}
                  onChange={(value) => handleQualityChange(
                    metric as keyof typeof analysis.content_quality,
                    value as number
                  )}
                  className="max-w-full"
                  classNames={{
                    track: theme === 'dark' ? 'bg-gray-700' : 'bg-gray-200',
                    filledTrack: 'bg-primary',
                    thumb: 'bg-primary'
                  }}
                  aria-label={`${metric} quality`}
                />
              </div>
            ))}
          </div>
        </CardBody>
      </Card>

      {/* Recommendations */}
      <Card className={`${
        theme === 'dark' 
          ? 'bg-gray-800/50 border-gray-700/50' 
          : 'bg-white border-gray-200'
      } border`}>
        <CardBody className="p-6 space-y-4">
          <h3 className={`text-lg font-semibold ${
            theme === 'dark' ? 'text-white' : 'text-gray-900'
          }`}>Recommendations</h3>
          
          {analysis.recommendations.map((recommendation, index) => (
            <div key={index} className="flex items-center gap-4">
              <Input
                value={recommendation}
                onChange={(e) => handleRecommendationChange(index, e.target.value)}
                classNames={{
                  input: `${theme === 'dark' ? 'bg-gray-700/50 text-white' : 'bg-gray-100 text-gray-900'}`,
                  inputWrapper: `${theme === 'dark' ? 'bg-gray-700/50 border-gray-600' : 'bg-gray-100 border-gray-300'}`
                }}
              />
              <Button
                isIconOnly
                color="danger"
                variant="light"
                onClick={() => handleRemoveRecommendation(index)}
              >
                <Trash2 className="w-4 h-4" />
              </Button>
            </div>
          ))}

          <Button
            startContent={<Plus className="w-4 h-4" />}
            className="w-full bg-primary/20 text-primary"
            onClick={handleAddRecommendation}
          >
            Add Recommendation
          </Button>
        </CardBody>
      </Card>
    </div>
  );
};

export default EditAIAnalysis;