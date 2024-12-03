import { Platform } from '../types';

export const getPlatformIcon = (platform: Platform): string => {
  switch (platform) {
    case 'YouTube':
      return 'https://static.wixstatic.com/media/c67dd6_aea51bc85e594033b8a29040d67b1d15~mv2.png';
    case 'X/Twitter':
      return 'https://static.wixstatic.com/media/c67dd6_a7b28b585b034f56ad6ab32232e745fc~mv2.webp';
    case 'TikTok':
      return 'https://static.wixstatic.com/media/c67dd6_f4ebb22077d749f8ab5abdb4ae142cae~mv2.png';
    case 'Instagram':
      return 'https://static.wixstatic.com/media/c67dd6_b9fe6adb4004453a9db57fe97cd4d6aa~mv2.png';
    case 'Spotify':
      return 'https://static.wixstatic.com/media/c67dd6_ec71f45884124292ab688e1089e48cb4~mv2.png';
    default:
      return 'https://static.wixstatic.com/media/c67dd6_aea51bc85e594033b8a29040d67b1d15~mv2.png';
  }
};