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
    plan: string;
    status: 'active' | 'cancelled' | 'expired';
    nextBillingDate: Date;
    amount: number;
    currency: string;
  };
  paymentMethods: Array<{
    id: string;
    type: string;
    isDefault: boolean;
    details: Record<string, string>;
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
    description: string;
    invoice_url?: string;
  }>;
}

export interface UserSettings {
  appearance: AppearanceSettings;
  notifications: NotificationSettings;
  privacy: PrivacySettings;
  language: LanguageSettings;
  billing: BillingSettings;
}