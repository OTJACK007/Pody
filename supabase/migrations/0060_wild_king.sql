-- Insert test data into podroom_videos
INSERT INTO podroom_videos (
  user_id,
  video_id,
  notes,
  is_favorite
) VALUES
-- For test user
(
  'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11',
  'a1b2c3d4-e5f6-4321-8765-1a2b3c4d5e6f',
  'Great video about AI technology',
  true
),
(
  'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11',
  'b2c3d4e5-f6a1-5432-8765-2b3c4d5e6f1a',
  'Interesting ML concepts',
  false
),
(
  'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11',
  'c3d4e5f6-a1b2-6543-8765-3c4d5e6f1a2b',
  'Quick AI tips to remember',
  true
);

-- Insert test collections
INSERT INTO podroom_collections (
  user_id,
  name,
  description
) VALUES
(
  'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11',
  'AI & Machine Learning',
  'Collection of AI and ML related content'
),
(
  'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11',
  'Tech Tutorials',
  'Helpful tech tutorials and guides'
);

-- Link videos to collections
INSERT INTO podroom_collection_videos (
  collection_id,
  podroom_video_id
)
SELECT 
  pc.id,
  pv.id
FROM podroom_collections pc
CROSS JOIN podroom_videos pv
WHERE pc.name = 'AI & Machine Learning'
AND pv.video_id IN (
  'a1b2c3d4-e5f6-4321-8765-1a2b3c4d5e6f',
  'b2c3d4e5-f6a1-5432-8765-2b3c4d5e6f1a'
);