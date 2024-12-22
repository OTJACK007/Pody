-- Rename sections column to overview_section
ALTER TABLE full_content 
RENAME COLUMN sections TO overview_section;

-- Add deepdive_section column
ALTER TABLE full_content 
ADD COLUMN deepdive_section jsonb DEFAULT '[]'::jsonb;

-- Update existing data with sample deepdive content
UPDATE full_content
SET deepdive_section = jsonb_build_array(
  jsonb_build_object(
    'title', 'AI Ethics and Society',
    'content', 'Deep analysis of ethical considerations in AI development and societal impact',
    'key_points', ARRAY[
      'Ethical frameworks in AI',
      'Societal implications',
      'Regulatory considerations',
      'Future challenges'
    ],
    'detailed_points', jsonb_build_array(
      jsonb_build_object(
        'title', 'Ethical Frameworks',
        'content', 'Comprehensive analysis of current ethical frameworks guiding AI development'
      ),
      jsonb_build_object(
        'title', 'Societal Impact',
        'content', 'In-depth exploration of how AI is reshaping society and human interactions'
      )
    )
  ),
  jsonb_build_object(
    'title', 'Technical Implementation',
    'content', 'Detailed technical analysis of AI implementation strategies',
    'key_points', ARRAY[
      'Architecture considerations',
      'Scalability challenges',
      'Performance optimization',
      'Security measures'
    ],
    'detailed_points', jsonb_build_array(
      jsonb_build_object(
        'title', 'System Architecture',
        'content', 'Deep dive into optimal architectural patterns for AI systems'
      ),
      jsonb_build_object(
        'title', 'Security Protocols',
        'content', 'Comprehensive security measures for AI implementations'
      )
    )
  )
);