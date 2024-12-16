export interface SocialAccount {
  id: string;
  platform: string;
  username: string;
  profileUrl: string;
  followers: string;
  isConnected: boolean;
  lastSync: Date;
  accessToken?: string;
  refreshToken?: string;
  tokenExpiry?: Date;
}