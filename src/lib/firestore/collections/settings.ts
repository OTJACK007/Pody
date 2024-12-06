import { doc, getDoc, setDoc, updateDoc } from 'firebase/firestore';
import { db } from '../../firebase';

export interface AppearanceSettings {
  theme: 'dark' | 'light';
  colorScheme: string;
}

export interface NotificationSettings {
  browser: boolean;
  categories: Record<string, boolean>;
  content: {
    'new-episodes': boolean;
    recommendations: boolean;
    trending: boolean;
  };
  social: {
    follows: boolean;
    mentions: boolean;
    replies: boolean;
  };
  system: {
    maintenance: boolean;
    security: boolean;
    updates: boolean;
    email: boolean;
    emailFrequency: 'immediate' | 'daily' | 'weekly' | 'never';
    mobile: boolean;
    quietHours: {
      enabled: boolean;
      end: string;
      start: string;
      sound: boolean;
    }
  };
}

export interface PrivacySettings {
  password_authentication: {
    change_password: boolean;
    phone_number_authentication: {
      enabled: boolean;
      phone_number: string;
      verified: boolean;
    };
    authenticator_app: {
      enabled: boolean;
      qr_code_url: string;
      last_used: Date;
    };
  };
  privacy_settings: {
    show_profile: boolean;
    allow_listening_activity: boolean;
    share_library: boolean;
    allow_friend_requests: boolean;
  };
  security_log: Array<{
    event_type: string;
    timestamp: Date;
    location: string;
  }>;
}

export interface LanguageSettings {
  language: string;
  region: string;
  timeZone: string;
  dateFormat: string;
}

export interface BillingSettings {
  subscription: {
    plan: 'basic' | 'credit-starter' | 'pro' | 'elite';
    status: 'active' | 'cancelled' | 'expired';
    nextBillingDate: Date;
    amount: number;
    currency: string;
  };
  paymentMethods: Array<{
    id: string;
    type: 'card' | 'paypal' | 'crypto';
    isDefault: boolean;
    details: {
      last4?: string;
      expiry?: string;
      email?: string;
      name?: string;
    };
    provider: {
      name: string;
      icon: string;
    };
  }>;
  billingHistory: Array<{
    id: string;
    date: Date;
    amount: number;
    currency: string;
    status: 'paid' | 'pending' | 'failed';
    description: string;
    invoice_url?: string;
  }>;
}

export interface UserSettings {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  company: string;
  jobTitle: string;
  location: string;
  website: string;
  profilePicture: string;
  appearance: AppearanceSettings;
  notifications: NotificationSettings;
  privacy: PrivacySettings;
  language: LanguageSettings;
  billing: BillingSettings;
  createdAt: Date;
  updatedAt: Date;
}

export const defaultSettings: Partial<UserSettings> = {
  appearance: {
    theme: 'dark',
    colorScheme: '#ff3366'
  },
  notifications: {
    browser: true,
    categories: {},
    content: {
      'new-episodes': true,
      recommendations: true,
      trending: true
    },
    social: {
      follows: true,
      mentions: true,
      replies: true
    },
    system: {
      maintenance: false,
      security: true,
      updates: true,
      email: true,
      emailFrequency: 'immediate',
      mobile: false,
      quietHours: {
        enabled: false,
        end: '07:00',
        start: '22:00',
        sound: true
      }
    }
  },
  privacy: {
    password_authentication: {
      change_password: true,
      phone_number_authentication: {
        enabled: false,
        phone_number: '',
        verified: false
      },
      authenticator_app: {
        enabled: false,
        qr_code_url: '',
        last_used: new Date()
      }
    },
    privacy_settings: {
      show_profile: true,
      allow_listening_activity: false,
      share_library: true,
      allow_friend_requests: true
    },
    security_log: []
  },
  language: {
    language: 'en',
    region: 'US',
    timeZone: 'auto',
    dateFormat: 'MM/DD/YYYY'
  },
  billing: {
    subscription: {
      plan: 'basic',
      status: 'active',
      nextBillingDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
      amount: 5,
      currency: 'USD'
    },
    paymentMethods: [],
    billingHistory: []
  }
};

export const getUserSettings = async (userId: string): Promise<UserSettings | null> => {
  try {
    const userDoc = await getDoc(doc(db, 'userSettings', userId));
    if (userDoc.exists()) {
      return userDoc.data() as UserSettings;
    }
    return null;
  } catch (error) {
    console.error('Error getting user settings:', error);
    return null;
  }
};

export const createUserSettings = async (userId: string, settings: Partial<UserSettings>) => {
  try {
    const mergedSettings = {
      ...defaultSettings,
      ...settings,
      createdAt: new Date(),
      updatedAt: new Date()
    };
    
    await setDoc(doc(db, 'userSettings', userId), mergedSettings);
  } catch (error) {
    console.error('Error creating user settings:', error);
    throw error;
  }
};

export const updateUserSettings = async (userId: string, settings: Partial<UserSettings>) => {
  try {
    await updateDoc(doc(db, 'userSettings', userId), {
      ...settings,
      updatedAt: new Date()
    });
  } catch (error) {
    console.error('Error updating user settings:', error);
    throw error;
  }
};

export const updateAppearanceSettings = async (userId: string, settings: AppearanceSettings) => {
  try {
    await updateDoc(doc(db, 'userSettings', userId), {
      appearance: settings,
      updatedAt: new Date()
    });
  } catch (error) {
    console.error('Error updating appearance settings:', error);
    throw error;
  }
};

export const updateNotificationSettings = async (userId: string, settings: NotificationSettings) => {
  try {
    await updateDoc(doc(db, 'userSettings', userId), {
      notifications: settings,
      updatedAt: new Date()
    });
  } catch (error) {
    console.error('Error updating notification settings:', error);
    throw error;
  }
};

export const updatePrivacySettings = async (userId: string, settings: PrivacySettings) => {
  try {
    await updateDoc(doc(db, 'userSettings', userId), {
      privacy: settings,
      updatedAt: new Date()
    });
  } catch (error) {
    console.error('Error updating privacy settings:', error);
    throw error;
  }
};

export const updateLanguageSettings = async (userId: string, settings: LanguageSettings) => {
  try {
    await updateDoc(doc(db, 'userSettings', userId), {
      language: settings,
      updatedAt: new Date()
    });
  } catch (error) {
    console.error('Error updating language settings:', error);
    throw error;
  }
};

export const updateBillingSettings = async (userId: string, settings: BillingSettings) => {
  try {
    await updateDoc(doc(db, 'userSettings', userId), {
      billing: settings,
      updatedAt: new Date()
    });
  } catch (error) {
    console.error('Error updating billing settings:', error);
    throw error;
  }
};