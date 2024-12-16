export const defaultSettings = {
  theme: 'dark' as const,
  colorScheme: '#ff3366',
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
      emailFrequency: 'immediate' as const,
      mobile: false,
      quietHours: {
        enabled: false,
        end: '07:00',
        start: '22:00',
        sound: true
      }
    }
  },
  language: {
    language: 'en',
    region: 'US',
    timeZone: 'auto',
    dateFormat: 'MM/DD/YYYY'
  },
  privacy: {
    show_profile: true,
    allow_listening_activity: false,
    share_library: true,
    allow_friend_requests: true
  }
};