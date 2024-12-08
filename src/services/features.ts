import { 
  collection,
  doc,
  getDoc,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
  query,
  where,
  orderBy,
  increment,
  serverTimestamp,
  Timestamp,
  writeBatch,
  deleteField
} from 'firebase/firestore';
import { db } from '../lib/firebase';

// Types
export interface Feature {
  id: string;
  title: string;
  description: string;
  status: 'planning' | 'development' | 'testing' | 'review' | 'ready';
  stage?: string;
  quarter?: string;
  progress: number;
  expectedDate?: string;
  features: string[];
  votes: {
    up: number;
    down: number;
    users: Record<string, 'up' | 'down'>;
  };
  category: string;
  requestedBy: string;
  requestedDate: Timestamp;
  destination: 'upcoming' | 'suggested' | 'maybe' | 'collecting';
  publishedDate?: Timestamp;
  lastModified: Timestamp;
  modifiedBy: string;
}

// Collection references
const featuresCollection = collection(db, 'features');
const featureHistoryCollection = collection(db, 'featureHistory');
const featureVotesCollection = collection(db, 'featureVotes');
const featureCommentsCollection = collection(db, 'featureComments');

// Fetch features by destination
export const fetchFeatures = async (destination: string): Promise<Feature[]> => {
  try {
    if (!destination) {
      throw new Error('Destination is required');
    }

    const q = query(
      featuresCollection,
      where('destination', '==', destination),
      orderBy('lastModified', 'desc')
    );
    
    const snapshot = await getDocs(q);
    const features = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
      requestedDate: doc.data().requestedDate?.toDate() || new Date(),
      lastModified: doc.data().lastModified?.toDate() || new Date(),
      publishedDate: doc.data().publishedDate?.toDate() || null
    })) as Feature[];
    
    return features;
  } catch (error) {
    console.error('Error fetching features:', error);
    throw error;
  }
};

// Create new feature
export const createFeature = async (feature: Omit<Feature, 'id'>): Promise<string> => {
  try {
    const featureData = {
      ...feature,
      status: feature.destination === 'upcoming' ? 'planning' : 'pending',
      progress: 0,
      features: [],
      votes: { up: 0, down: 0, users: {} },
      destination: feature.destination || 'suggested',
      requestedDate: serverTimestamp(),
      lastModified: serverTimestamp()
    };
    
    const featureRef = await addDoc(featuresCollection, featureData);
    return featureRef.id;
  } catch (error) {
    console.error('Error creating feature:', error);
    throw error;
  }
};

// Update existing feature
export const updateExistingFeature = async (id: string, updates: Partial<Feature>): Promise<void> => {
  const batch = writeBatch(db);
  const featureRef = doc(featuresCollection, id);
  
  // Get original feature for change tracking
  const original = await getDoc(featureRef);
  const changes = Object.entries(updates).map(([field, newValue]) => ({
    field,
    oldValue: original.data()?.[field],
    newValue
  }));
  
  // Update feature
  batch.update(featureRef, {
    ...updates,
    lastModified: serverTimestamp()
  });
  
  // Add history entry
  const historyRef = doc(featureHistoryCollection);
  batch.set(historyRef, {
    featureId: id,
    action: 'updated',
    performedBy: updates.modifiedBy,
    timestamp: serverTimestamp(),
    changes
  });
  
  await batch.commit();
};

// Submit vote
export const submitVote = async (featureId: string, userId: string, voteType: 'up' | 'down'): Promise<void> => {
  const featureRef = doc(featuresCollection, featureId);
  const feature = await getDoc(featureRef);
  const data = feature.data() as Feature;
  
  const batch = writeBatch(db);
  
  // Remove previous vote if exists
  const previousVote = data.votes.users[userId];
  if (previousVote) {
    batch.update(featureRef, {
      [`votes.${previousVote}`]: increment(-1),
      [`votes.users.${userId}`]: deleteField()
    });
  }
  
  // Add new vote
  batch.update(featureRef, {
    [`votes.${voteType}`]: increment(1),
    [`votes.users.${userId}`]: voteType,
    lastModified: serverTimestamp()
  });
  
  await batch.commit();
};

// Move feature to different destination
export const moveFeatureToDestination = async (
  featureId: string, 
  destination: Feature['destination'],
  userId: string
): Promise<void> => {
  const batch = writeBatch(db);
  const featureRef = doc(featuresCollection, featureId);
  
  batch.update(featureRef, {
    destination,
    lastModified: serverTimestamp()
  });
  
  const historyRef = doc(featureHistoryCollection);
  batch.set(historyRef, {
    featureId,
    action: 'moved',
    performedBy: userId,
    timestamp: serverTimestamp(),
    destination
  });
  
  await batch.commit();
};

// Publish feature
export const publishFeatureToProduction = async (featureId: string, userId: string): Promise<void> => {
  const batch = writeBatch(db);
  const featureRef = doc(featuresCollection, featureId);
  
  batch.update(featureRef, {
    publishedDate: serverTimestamp(),
    lastModified: serverTimestamp()
  });
  
  const historyRef = doc(featureHistoryCollection);
  batch.set(historyRef, {
    featureId,
    action: 'published',
    performedBy: userId,
    timestamp: serverTimestamp()
  });
  
  await batch.commit();
};

// Rest of the code remains the same...

// Template data for collections
const templateCollections = {
  // Pod Room Collections
  podcastLibrary: [
    {
      id: 'pod1',
      title: 'Tech Talks Daily',
      description: 'Daily tech news and insights',
      channel: {
        name: 'TechInsights',
        avatar: 'https://images.unsplash.com/photo-1535303311164-664fc9ec6532?w=400',
        verified: true
      },
      thumbnail: 'https://images.unsplash.com/photo-1535303311164-664fc9ec6532?w=800',
      category: 'Technology',
      duration: '45:30',
      views: '125K',
      rating: 4.8,
      progress: 75,
      addedDate: serverTimestamp(),
      lastWatched: serverTimestamp(),
      isFavorite: true,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp()
    }
  ],
  
  podcastEpisodes: [
    {
      id: 'episode1',
      title: 'The Future of AI Technology',
      description: 'An in-depth discussion about artificial intelligence and its impact',
      channel: {
        name: 'TechInsights',
        avatar: 'https://images.unsplash.com/photo-1535303311164-664fc9ec6532?w=400',
        verified: true
      },
      duration: '45:30',
      views: '125K',
      thumbnail: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800',
      videoUrl: 'https://video.wixstatic.com/video/c67dd6_8c436b9b6e42468a9e2b68ea49868528/1080p/mp4/file.mp4',
      topics: ['AI', 'Technology', 'Future', 'Innovation'],
      progress: 75,
      addedDate: serverTimestamp(),
      lastWatched: serverTimestamp(),
      isFavorite: false,
      keyMoments: [
        {
          timestamp: '00:05:30',
          title: 'Introduction to AI Ethics',
          summary: 'Discussion about ethical considerations in AI development',
          insights: [
            'AI systems must be designed with clear ethical guidelines',
            'Transparency is crucial for building trust in AI',
            'Ethics should be considered from the start of development'
          ]
        }
      ],
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp()
    }
  ],
  
  podcastShorts: [
    {
      id: 'short1',
      title: 'Quick AI Tips for Beginners',
      description: 'Essential tips for getting started with AI development',
      channel: {
        name: 'TechBites',
        avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400',
        verified: true
      },
      duration: '1:30',
      views: '1.2M',
      likes: '45K',
      shares: '12K',
      thumbnail: 'https://images.unsplash.com/photo-1555255707-c07966088b7b?w=800',
      videoUrl: 'https://video.wixstatic.com/video/c67dd6_8c436b9b6e42468a9e2b68ea49868528/1080p/mp4/file.mp4',
      insights: [
        'Start with basic ML concepts',
        'Focus on data quality',
        'Use pre-trained models',
        'Practice with real projects'
      ],
      addedDate: serverTimestamp(),
      lastWatched: serverTimestamp(),
      isFavorite: false,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp()
    }
  ],
  
  podcastInsights: [
    {
      id: 'insight1',
      episodeId: 'episode1',
      userId: 'user1',
      title: 'AI Ethics Framework',
      content: 'Key principles for ethical AI development',
      tags: ['AI', 'Ethics', 'Technology'],
      source: {
        type: 'podcast',
        title: 'The Future of AI Technology',
        timestamp: '00:05:30'
      },
      isSaved: true,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp()
    }
  ],
  
  podcastNotes: [
    {
      id: 'note1',
      episodeId: 'episode1',
      userId: 'user1',
      title: 'AI Ethics Notes',
      content: 'Important considerations for AI development...',
      timestamp: '00:05:30',
      tags: ['AI', 'Ethics', 'Development'],
      highlights: [
        {
          text: 'AI systems must be designed with clear ethical guidelines',
          timestamp: '00:06:15'
        }
      ],
      isSaved: true,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp()
    }
  ],
  
  podcastFavorites: [
    {
      id: 'fav1',
      userId: 'user1',
      itemId: 'episode1',
      itemType: 'episode',
      addedDate: serverTimestamp(),
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp()
    },
    {
      id: 'fav2',
      userId: 'user1',
      itemId: 'short1',
      itemType: 'short',
      addedDate: serverTimestamp(),
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp()
    }
  ],

  // Creator Space Collections
  creatorContent: [
    {
      id: 'content1',
      title: 'The Future of AI Technology',
      description: 'An in-depth discussion about artificial intelligence and its impact on various industries',
      duration: '2:45:30',
      views: '125K',
      channel: {
        name: 'TechInsights',
        avatar: 'https://images.unsplash.com/photo-1535303311164-664fc9ec6532?w=400',
        verified: true
      },
      thumbnail: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800',
      progress: 75,
      topics: ['AI', 'Technology', 'Future', 'Innovation'],
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp()
    }
  ],
  
  creatorChannels: [
    {
      id: 'channel1',
      name: 'TechInsights',
      description: 'Daily tech news, insights, and in-depth interviews with industry leaders',
      avatar: 'https://images.unsplash.com/photo-1535303311164-664fc9ec6532?w=400',
      bannerImage: 'https://images.unsplash.com/photo-1517976487492-5750f3195933?w=1200',
      subscribers: '1.2M',
      verified: true,
      stats: {
        totalViews: '25M',
        totalEpisodes: 156,
        avgRating: 4.8
      },
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp()
    }
  ],
  
  creatorAnalytics: [
    {
      id: 'analytics1',
      channelId: 'channel1',
      totalEarnings: '$2.8K',
      thisMonth: '$850',
      pendingPayout: '$450',
      nextPayout: '2024-04-01',
      viewsData: {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
        data: [15, 25, 20, 35, 30, 40]
      },
      revenueData: {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
        data: [1.2, 1.9, 1.6, 2.5, 2.2, 2.8]
      },
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp()
    }
  ],
  
  creatorSubscriptions: [
    {
      id: 'sub1',
      channelId: 'channel1',
      userId: 'user1',
      plan: 'premium',
      price: 5.00,
      status: 'active',
      startDate: serverTimestamp(),
      nextBillingDate: serverTimestamp(),
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp()
    }
  ],
  
  creatorMonetization: [
    {
      id: 'mon1',
      channelId: 'channel1',
      status: 'active',
      earnings: {
        total: 2800,
        thisMonth: 850,
        pending: 450
      },
      nextPayout: serverTimestamp(),
      paymentMethods: [
        {
          type: 'stripe',
          isDefault: true,
          last4: '4242'
        }
      ],
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp()
    }
  ],
  
  creatorSettings: [
    {
      id: 'settings1',
      channelId: 'channel1',
      monetization: {
        enabled: true,
        subscriptionPrice: 5.00,
        features: [
          'Exclusive content access',
          'Early access to new episodes',
          'Ad-free experience',
          'Exclusive community access'
        ]
      },
      branding: {
        colors: {
          primary: '#ff3366',
          secondary: '#2eff94'
        },
        logo: 'https://example.com/logo.png'
      },
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp()
    }
  ],

  // Knowledge Library Collections
  notes: [
    {
      id: 'note1',
      title: 'Building Mental Resilience',
      content: 'Key insights on developing mental toughness and resilience in challenging situations...',
      source: {
        type: 'podcast',
        title: 'Mindset Mastery',
        image: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=400'
      },
      tags: ['Psychology', 'Mental Health', 'Personal Growth'],
      date: serverTimestamp(),
      isFavorite: true,
      userId: 'system',
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp()
    },
    {
      id: 'note2',
      title: 'Future of AI Technology',
      content: 'Discussion on emerging AI trends and their impact on various industries...',
      source: {
        type: 'podcast',
        title: 'Tech Insights',
        image: 'https://images.unsplash.com/photo-1535303311164-664fc9ec6532?w=400'
      },
      tags: ['AI', 'Technology', 'Future'],
      date: serverTimestamp(),
      isFavorite: false,
      userId: 'system',
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp()
    }
  ],
  
  summaries: [
    {
      id: 'summary1',
      title: 'AI Ethics and Society',
      content: 'AI-generated summary of key ethical considerations in artificial intelligence development...',
      source: {
        type: 'podcast',
        title: 'Tech Ethics Today',
        image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=400'
      },
      tags: ['AI', 'Ethics', 'Technology'],
      date: serverTimestamp(),
      isFavorite: true,
      accuracy: 98,
      confidence: 95,
      userId: 'system',
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp()
    }
  ],
  
  highlights: [
    {
      id: 'highlight1',
      quote: "Success is not final, failure is not fatal: it is the courage to continue that counts.",
      context: "Discussion on resilience and perseverance in business...",
      source: {
        type: 'podcast',
        title: 'Success Mindset',
        image: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=400',
        timestamp: '23:45'
      },
      tags: ['Motivation', 'Success', 'Mindset'],
      date: serverTimestamp(),
      isFavorite: true,
      userId: 'system',
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp()
    }
  ],
  
  favorites: [
    {
      id: 'favorite1',
      itemId: 'note1',
      itemType: 'note',
      userId: 'system',
      createdAt: serverTimestamp()
    },
    {
      id: 'favorite2',
      itemId: 'summary1',
      itemType: 'summary',
      userId: 'system',
      createdAt: serverTimestamp()
    }
  ],
  
  categories: [
    {
      id: 'cat1',
      name: 'Technology',
      description: 'Tech-related content and insights',
      createdAt: serverTimestamp()
    },
    {
      id: 'cat2',
      name: 'Personal Growth',
      description: 'Self-improvement and development',
      createdAt: serverTimestamp()
    }
  ],
  
  tags: [
    {
      id: 'tag1',
      name: 'AI',
      count: 2,
      createdAt: serverTimestamp()
    },
    {
      id: 'tag2',
      name: 'Technology',
      count: 3,
      createdAt: serverTimestamp()
    }
  ],
  features: [
    {
      title: 'Custom Podcast Categories',
      description: 'Allow users to create and manage custom podcast categories',
      status: 'pending',
      category: 'Organization',
      requestedBy: 'system',
      destination: 'collecting',
      votes: { up: 325, down: 12, users: {} },
      features: [],
      stage: '',
      quarter: '',
      progress: 0,
      modifiedBy: 'system'
    },
    {
      title: 'Batch Export Summaries',
      description: 'Export multiple podcast summaries at once in various formats',
      status: 'pending',
      category: 'Export',
      requestedBy: 'system',
      destination: 'collecting',
      votes: { up: 287, down: 8, users: {} },
      features: [],
      stage: '',
      quarter: '',
      progress: 0,
      modifiedBy: 'system'
    },
    {
      title: 'AI-Powered Video Summaries',
      description: 'Get instant video summaries with key points and timestamps',
      status: 'development',
      stage: 'development',
      quarter: 'Q2 2024',
      progress: 75,
      category: 'AI',
      requestedBy: 'system',
      destination: 'upcoming',
      features: [
        'Smart content analysis',
        'Automatic chapter detection',
        'Key points extraction',
        'Custom summary length'
      ],
      votes: { up: 245, down: 0, users: {} },
      modifiedBy: 'system'
    },
    {
      title: 'Collaborative Notes',
      description: 'Share and collaborate on podcast notes with your team',
      status: 'planning',
      stage: 'planning',
      quarter: 'Q3 2024',
      progress: 35,
      category: 'Collaboration',
      requestedBy: 'system',
      destination: 'upcoming',
      features: [
        'Real-time collaboration',
        'Comment threads',
        'Version history',
        'Export options'
      ],
      votes: { up: 189, down: 0, users: {} },
      modifiedBy: 'system'
    },
    {
      title: 'AI-Powered Summaries',
      description: 'Get instant, accurate summaries of any podcast episode using advanced AI technology',
      status: 'ready',
      category: 'AI & Machine Learning',
      requestedBy: 'system',
      destination: 'published',
      features: [
        'Smart content analysis',
        'Multi-language support',
        'Key points extraction'
      ],
      votes: { up: 0, down: 0, users: {} },
      stage: '',
      quarter: '',
      progress: 100,
      modifiedBy: 'system'
    },
    {
      title: 'Cross-Platform Sync',
      description: 'Seamlessly sync your content and preferences across all your devices',
      status: 'ready',
      category: 'User Experience',
      requestedBy: 'system',
      destination: 'published',
      features: [
        'Real-time synchronization',
        'Offline support',
        'Cross-device compatibility'
      ],
      votes: { up: 0, down: 0, users: {} },
      stage: '',
      quarter: '',
      progress: 100,
      modifiedBy: 'system'
    }
  ],
  featureVotes: [
    {
      featureId: 'feature1',
      userId: 'user1',
      voteType: 'up',
      timestamp: serverTimestamp()
    }
  ],
  featureComments: [
    {
      featureId: 'feature1',
      userId: 'user1',
      content: 'This would be really useful!',
      timestamp: serverTimestamp()
    }
  ],
  featureHistory: [
    {
      featureId: 'feature1',
      action: 'created',
      performedBy: 'system',
      timestamp: serverTimestamp()
    }
  ]
};

// Template data for features
const templateFeatures = {
  requested: [
    {
      title: 'Custom Podcast Categories',
      description: 'Allow users to create and manage custom podcast categories',
      status: 'pending',
      category: 'Organization',
      requestedBy: 'system',
      destination: 'collecting',
      votes: { up: 325, down: 12, users: {} }
    },
    {
      title: 'Batch Export Summaries',
      description: 'Export multiple podcast summaries at once in various formats',
      status: 'pending',
      category: 'Export',
      requestedBy: 'system',
      destination: 'collecting',
      votes: { up: 287, down: 8, users: {} }
    }
  ],
  upcoming: [
    {
      title: 'AI-Powered Video Summaries',
      description: 'Get instant video summaries with key points and timestamps',
      status: 'development',
      stage: 'development',
      quarter: 'Q2 2024',
      progress: 75,
      category: 'AI',
      requestedBy: 'system',
      destination: 'upcoming',
      features: [
        'Smart content analysis',
        'Automatic chapter detection',
        'Key points extraction',
        'Custom summary length'
      ],
      votes: { up: 245, down: 0, users: {} }
    },
    {
      title: 'Collaborative Notes',
      description: 'Share and collaborate on podcast notes with your team',
      status: 'planning',
      stage: 'planning',
      quarter: 'Q3 2024',
      progress: 35,
      category: 'Collaboration',
      requestedBy: 'system',
      destination: 'upcoming',
      features: [
        'Real-time collaboration',
        'Comment threads',
        'Version history',
        'Export options'
      ],
      votes: { up: 189, down: 0, users: {} }
    }
  ],
  published: [
    {
      title: 'AI-Powered Summaries',
      description: 'Get instant, accurate summaries of any podcast episode using advanced AI technology',
      status: 'ready',
      category: 'AI & Machine Learning',
      requestedBy: 'system',
      destination: 'published',
      features: [
        'Smart content analysis',
        'Multi-language support',
        'Key points extraction'
      ],
      votes: { up: 0, down: 0, users: {} }
    },
    {
      title: 'Cross-Platform Sync',
      description: 'Seamlessly sync your content and preferences across all your devices',
      status: 'ready',
      category: 'User Experience',
      requestedBy: 'system',
      destination: 'published',
      features: [
        'Real-time synchronization',
        'Offline support',
        'Cross-device compatibility'
      ],
      votes: { up: 0, down: 0, users: {} }
    }
  ]
};

// Load template features into Firestore
export const loadTemplateFeatures = async () => {
  const batch = writeBatch(db);
  
  // Load Podcast Library collections
  for (const content of templateCollections.podcastLibrary) {
    const docRef = doc(collection(db, 'podcastLibrary'));
    batch.set(docRef, content);
  }

  for (const episode of templateCollections.podcastEpisodes) {
    const docRef = doc(collection(db, 'podcastEpisodes'));
    batch.set(docRef, episode);
  }

  for (const short of templateCollections.podcastShorts) {
    const docRef = doc(collection(db, 'podcastShorts'));
    batch.set(docRef, short);
  }

  for (const insight of templateCollections.podcastInsights) {
    const docRef = doc(collection(db, 'podcastInsights'));
    batch.set(docRef, insight);
  }

  for (const note of templateCollections.podcastNotes) {
    const docRef = doc(collection(db, 'podcastNotes'));
    batch.set(docRef, note);
  }

  for (const favorite of templateCollections.podcastFavorites) {
    const docRef = doc(collection(db, 'podcastFavorites'));
    batch.set(docRef, favorite);
  }

  // Rest of the code remains the same...
  // (Omitted for brevity, but would include loading other collections)

  await batch.commit();
};