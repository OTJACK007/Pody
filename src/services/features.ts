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
  
  // Load Knowledge Library collections
  for (const note of templateCollections.notes) {
    const docRef = doc(collection(db, 'notes'));
    batch.set(docRef, note);
  }

  for (const summary of templateCollections.summaries) {
    const docRef = doc(collection(db, 'summaries'));
    batch.set(docRef, summary);
  }

  for (const highlight of templateCollections.highlights) {
    const docRef = doc(collection(db, 'highlights'));
    batch.set(docRef, highlight);
  }

  for (const favorite of templateCollections.favorites) {
    const docRef = doc(collection(db, 'favorites'));
    batch.set(docRef, favorite);
  }

  for (const category of templateCollections.categories) {
    const docRef = doc(collection(db, 'knowledgeCategories'));
    batch.set(docRef, category);
  }

  for (const tag of templateCollections.tags) {
    const docRef = doc(collection(db, 'knowledgeTags'));
    batch.set(docRef, tag);
  }
  // Load features
  for (const feature of templateCollections.features) {
    const docRef = doc(collection(db, 'features'));
    batch.set(docRef, {
      ...feature,
      requestedDate: serverTimestamp(),
      lastModified: serverTimestamp(),
      publishedDate: feature.destination === 'published' ? serverTimestamp() : null
    });
  }

  // Load feature votes
  for (const vote of templateCollections.featureVotes) {
    const docRef = doc(collection(db, 'featureVotes'));
    batch.set(docRef, vote);
  }

  // Load feature comments
  for (const comment of templateCollections.featureComments) {
    const docRef = doc(collection(db, 'featureComments'));
    batch.set(docRef, comment);
  }

  // Load feature history
  for (const history of templateCollections.featureHistory) {
    const docRef = doc(collection(db, 'featureHistory'));
    batch.set(docRef, history);
  }

  await batch.commit();
};