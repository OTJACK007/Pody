-- Populate features table with initial data
INSERT INTO features (
  title,
  subtitle,
  description,
  requested_at,
  development_progress,
  expected_release,
  subfeatures,
  status,
  votes_up,
  votes_down
) VALUES
-- Collecting Votes Features
(
  'Integrate Zapier',
  'Automate your workflow',
  'Connect your Pody account with thousands of apps through Zapier integration. Automate your content distribution, notifications, and more.',
  NOW(),
  0,
  'Q3 2024',
  ARRAY[
    'Connect with 3000+ apps',
    'Custom automation workflows',
    'Real-time sync',
    'Automated content distribution'
  ],
  'collectingvotes',
  156,
  12
),
(
  'Create a Community',
  'Build and engage with your audience',
  'Create a dedicated space for your audience to connect, share insights, and engage with your content. Foster meaningful discussions and build a loyal community.',
  NOW(),
  0,
  'Q4 2024',
  ARRAY[
    'Discussion forums',
    'Member profiles',
    'Content sharing',
    'Direct messaging',
    'Event organization'
  ],
  'collectingvotes',
  245,
  8
),
(
  'Sell Courses to My Audience',
  'Monetize your expertise',
  'Create and sell online courses directly through your Pody channel. Package your knowledge into structured learning experiences and generate additional revenue.',
  NOW(),
  0,
  'Q4 2024',
  ARRAY[
    'Course creation tools',
    'Student progress tracking',
    'Certificates',
    'Payment processing',
    'Analytics dashboard'
  ],
  'collectingvotes',
  312,
  15
),
-- Upcoming Feature
(
  'Monetize My Channel',
  'Multiple revenue streams for creators',
  'Unlock various monetization options for your channel including subscriptions, pay-per-view content, and merchandise integration.',
  NOW(),
  65,
  'Q2 2024',
  ARRAY[
    'Channel subscriptions',
    'Pay-per-view content',
    'Merchandise integration',
    'Donation/tips system',
    'Revenue analytics'
  ],
  'upcoming',
  428,
  21
);

-- Add some sample votes
INSERT INTO feature_votes (feature_id, user_id, vote_type)
SELECT 
  f.id,
  auth.uid(),
  'up'
FROM features f
WHERE f.title = 'Monetize My Channel'
AND EXISTS (SELECT 1 FROM auth.users WHERE id = auth.uid())
ON CONFLICT (feature_id, user_id) DO NOTHING;